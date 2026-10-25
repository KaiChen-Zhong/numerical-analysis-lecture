/** Round a JS number to IEEE-754 binary16. */
export function toF16(x: number): number {
  if (Number.isNaN(x)) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  const sign = x < 0 || Object.is(x, -0) ? -1 : 1;
  const a = Math.abs(x);
  if (a > 65504) return sign * Infinity;
  if (a < 2 ** -25) return 0 * sign;
  if (a < 2 ** -14) {
    const q = 2 ** -24;
    return sign * Math.round(a / q) * q;
  }
  const exp = Math.floor(Math.log2(a));
  const scale = 2 ** (exp - 10);
  const rounded = Math.round(a / scale) * scale;
  if (rounded > 65504) return sign * Infinity;
  return sign * rounded;
}

export type DType = "f64" | "f32" | "f16";

export const DTYPE_META: Record<
  DType,
  { label: string; expOverflow: number; max: number }
> = {
  f64: { label: "FP64（JS 默认）", expOverflow: 709, max: Number.MAX_VALUE },
  f32: { label: "FP32", expOverflow: Math.log(3.402823466e38), max: 3.402823466e38 },
  f16: { label: "FP16", expOverflow: Math.log(65504), max: 65504 },
};

function roundTo(mode: DType, x: number): number {
  if (mode === "f64") return x;
  if (mode === "f32") return Math.fround(x);
  return toF16(x);
}

function expTyped(z: number, mode: DType): number {
  if (z > DTYPE_META[mode].expOverflow) return Infinity;
  if (z < -DTYPE_META[mode].expOverflow) return 0;
  return roundTo(mode, Math.exp(z));
}

export type SoftmaxTrace = {
  shifted: boolean;
  max: number;
  zUsed: number[];
  exp: number[];
  sum: number;
  p: number[];
  ok: boolean;
  status: "ok" | "overflow" | "nan" | "underflow";
};

export function softmaxTrace(
  z: number[],
  mode: DType,
  shift: boolean,
): SoftmaxTrace {
  const max = Math.max(...z);
  const zUsed = shift ? z.map((zi) => zi - max) : z.slice();
  const e = zUsed.map((zi) => expTyped(zi, mode));
  const sum = e.reduce((a, b) => a + b, 0);
  const p = e.map((ei) => ei / sum);
  const anyInf = e.some((ei) => ei === Infinity);
  const anyNan = p.some((pi) => Number.isNaN(pi));
  const allZero = e.every((ei) => ei === 0);
  let status: SoftmaxTrace["status"] = "ok";
  if (anyNan) status = "nan";
  else if (anyInf || !Number.isFinite(sum)) status = "overflow";
  else if (allZero) status = "underflow";
  return {
    shifted: shift,
    max,
    zUsed,
    exp: e,
    sum,
    p,
    ok: status === "ok",
    status,
  };
}

export function fmt(x: number, digits = 4): string {
  if (Number.isNaN(x)) return "NaN";
  if (x === Infinity) return "+∞";
  if (x === -Infinity) return "−∞";
  if (x === 0) return Object.is(x, -0) ? "−0" : "0";
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-3) return x.toExponential(2);
  return x.toPrecision(digits);
}

export function adamUpdate(g: number, v: number, eps: number): number {
  return g / (Math.sqrt(Math.max(v, 0)) + eps);
}

export function batchNorm(x: number, mean: number, var_: number, eps: number): number {
  return (x - mean) / Math.sqrt(var_ + eps);
}

export type F16Status = "ok" | "overflow" | "underflow" | "subnormal";

export function classifyF16(x: number): { value: number; status: F16Status } {
  const value = toF16(x);
  const a = Math.abs(x);
  if (!Number.isFinite(value) || a > 65504) return { value, status: "overflow" };
  if (a > 0 && a < 2 ** -24) return { value: 0, status: "underflow" };
  if (a > 0 && a < 2 ** -14) return { value, status: "subnormal" };
  return { value, status: "ok" };
}

export function quantizeSymmetric(w: number[], bits: number) {
  const qmax = 2 ** (bits - 1) - 1;
  const absMax = Math.max(...w.map((x) => Math.abs(x)), 1e-12);
  const scale = absMax / qmax;
  const q = w.map((x) => {
    const n = Math.max(-qmax, Math.min(qmax, Math.round(x / scale)));
    return n * scale;
  });
  const mse = q.reduce((s, qi, i) => s + (qi - w[i]) ** 2, 0) / w.length;
  const rms = Math.sqrt(w.reduce((s, x) => s + x * x, 0) / w.length);
  const snr = rms === 0 ? Infinity : 10 * Math.log10((rms * rms) / Math.max(mse, 1e-18));
  const digits = Math.max(0, Math.floor(bits * Math.log10(2)));
  return { q, scale, mse, snr, qmax, digits };
}

export function seededWeights(n = 24, seed = 7): number[] {
  let s = seed >>> 0;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const u = s / 4294967296;
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const v = s / 4294967296;
    const mag = Math.sqrt(-2 * Math.log(Math.max(u, 1e-12)));
    const ang = 2 * Math.PI * v;
    out.push(0.35 * mag * Math.cos(ang));
  }
  return out;
}

export function gdStep(
  x: number,
  y: number,
  kappa: number,
  lr: number,
  precond: boolean,
): { x: number; y: number; gx: number; gy: number } {
  const gx = kappa * x;
  const gy = y;
  if (precond) {
    return { x: x - lr * x, y: y - lr * y, gx, gy };
  }
  return { x: x - lr * gx, y: y - lr * gy, gx, gy };
}

export const FP16_MAX = 65504;
export const FP16_MIN_NORMAL = 2 ** -14;
export const FP16_MIN_SUB = 2 ** -24;
export const FP32_MAX = 3.402823466e38;
