import { useMemo, useRef, useState, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import { LabFrame, RangeField, StatusChip } from "@/components/ai/range-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  adamUpdate,
  batchNorm,
  classifyF16,
  DTYPE_META,
  fmt,
  gdStep,
  quantizeSymmetric,
  seededWeights,
  softmaxTrace,
  type DType,
  FP16_MAX,
  FP16_MIN_NORMAL,
  FP16_MIN_SUB,
} from "@/lib/ai-track/numeric";
import { BOOKS, EXAM_AI_MAP, type LabId } from "@/lib/ai-track/lessons";
import { cn } from "@/lib/utils";

const LOGIT_PRESETS: { name: string; z: number[] }[] = [
  { name: "正常", z: [1.2, 0.4, -0.3] },
  { name: "FP16 临界", z: [10.5, 11.2, 9.8] },
  { name: "FP32 爆炸", z: [90, 91, 88] },
  { name: "大负数", z: [-40, -38, -45] },
];

export function AiLab({ id }: { id: LabId }) {
  switch (id) {
    case "softmax":
      return <SoftmaxLab />;
    case "condition":
      return <ConditionLab />;
    case "epsilon":
      return <EpsilonLab />;
    case "mixed":
      return <MixedLab />;
    case "quant":
      return <QuantLab />;
    case "map":
      return <ExamMap />;
    default:
      return null;
  }
}

function SoftmaxLab() {
  const [z, setZ] = useState([1.2, 0.4, -0.3]);
  const [mode, setMode] = useState<DType>("f16");
  const naive = softmaxTrace(z, mode, false);
  const stable = softmaxTrace(z, mode, true);
  const labels = ["z₁", "z₂", "z₃"];

  return (
    <LabFrame
      title="动手：朴素 softmax vs max-shift"
      hint="先选格式，再把 logits 拉大，或点右侧预设。左侧是直接套公式，右侧先减去最大值。"
    >
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(DTYPE_META) as DType[]).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setMode(d)}
            className={cn(
              "h-10 rounded-md px-3 text-sm",
              mode === d ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
            )}
          >
            {DTYPE_META[d].label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-subtle">
        {mode.toUpperCase()} 下 e<sup>z</sup> 大约在 z ≈ {DTYPE_META[mode].expOverflow.toFixed(1)} 溢出
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-3">
          {z.map((zi, i) => (
            <RangeField
              key={i}
              label={labels[i]}
              value={zi}
              min={-50}
              max={100}
              step={0.1}
              onChange={(v) => setZ((prev) => prev.map((x, j) => (j === i ? v : x)))}
              format={(v) => v.toFixed(1)}
            />
          ))}
          <div className="flex flex-wrap gap-1.5">
            {LOGIT_PRESETS.map((p) => (
              <Button key={p.name} type="button" variant="outline" size="sm" onClick={() => setZ(p.z)}>
                {p.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <SoftmaxPanel title="朴素公式" trace={naive} />
          <SoftmaxPanel title="max-shift" trace={stable} />
        </div>
      </div>
    </LabFrame>
  );
}

function SoftmaxPanel({
  title,
  trace,
}: {
  title: string;
  trace: ReturnType<typeof softmaxTrace>;
}) {
  const statusLabel =
    trace.status === "ok"
      ? "正常"
      : trace.status === "overflow"
        ? "溢出"
        : trace.status === "underflow"
          ? "下溢"
          : "NaN";
  return (
    <div className="rounded-lg bg-sunken p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{title}</p>
        <StatusChip ok={trace.ok} label={statusLabel} />
      </div>
      {trace.shifted ? (
        <p className="mt-1 font-mono text-[0.6875rem] text-subtle">max = {fmt(trace.max)}</p>
      ) : null}
      <ul className="mt-2 space-y-1 font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
        {trace.exp.map((e, i) => (
          <li key={i}>
            e[{i}] = {fmt(e)}
          </li>
        ))}
        <li>sum = {fmt(trace.sum)}</li>
      </ul>
      <div className="mt-3 flex flex-col gap-1.5">
        {trace.p.map((pi, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-8 shrink-0 font-mono text-[0.6875rem] text-subtle">p{i + 1}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-card">
              <div
                className={cn("h-full rounded-full", trace.ok ? "bg-primary" : "bg-cinnabar")}
                style={{ width: `${trace.ok ? Math.max(0, Math.min(100, pi * 100)) : 0}%` }}
              />
            </div>
            <span className="w-16 shrink-0 text-right font-mono text-[0.6875rem] tabular-nums">
              {fmt(pi, 3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConditionLab() {
  const [kappa, setKappa] = useState(25);
  const [lr, setLr] = useState(0.08);
  const [pos, setPos] = useState({ x: 0.85, y: 1.45 });
  const [pathGd, setPathGd] = useState<{ x: number; y: number }[]>([{ x: 0.85, y: 1.45 }]);
  const [pathPc, setPathPc] = useState<{ x: number; y: number }[]>([{ x: 0.85, y: 1.45 }]);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const gx = kappa * pos.x;
  const gy = pos.y;
  const gnorm = Math.hypot(gx, gy);
  const lrMax = 2 / kappa;
  const diverged = pathGd.some((p) => Math.hypot(p.x, p.y) > 6);

  function resetTo(x: number, y: number) {
    const p = { x, y };
    setPos(p);
    setPathGd([p]);
    setPathPc([p]);
  }

  function clientToMath(e: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return pos;
    const rect = svg.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 4.8 - 2.4;
    const ny = 2.4 - ((e.clientY - rect.top) / rect.height) * 4.8;
    return {
      x: Math.max(-2.2, Math.min(2.2, nx)),
      y: Math.max(-2.2, Math.min(2.2, ny)),
    };
  }

  function onPointerDown(e: PointerEvent<SVGSVGElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = clientToMath(e);
    resetTo(p.x, p.y);
  }
  function onPointerMove(e: PointerEvent<SVGSVGElement>) {
    if (!dragging.current) return;
    const p = clientToMath(e);
    resetTo(p.x, p.y);
  }

  function stepBoth() {
    setPathGd((prev) => {
      const last = prev[prev.length - 1];
      const n = gdStep(last.x, last.y, kappa, lr, false);
      return [...prev, { x: n.x, y: n.y }].slice(-40);
    });
    setPathPc((prev) => {
      const last = prev[prev.length - 1];
      const n = gdStep(last.x, last.y, kappa, lr, true);
      return [...prev, { x: n.x, y: n.y }].slice(-40);
    });
    setPos((p) => {
      const n = gdStep(p.x, p.y, kappa, lr, false);
      return { x: n.x, y: n.y };
    });
  }

  const levels = [0.15, 0.4, 0.8, 1.4, 2.2];

  return (
    <LabFrame
      title="动手：扁谷里的梯度"
      hint="拖动探点。κ 越大椭圆越扁，负梯度越不指向原点。走几步看普通 GD 和预条件的差别。"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="overflow-hidden rounded-lg bg-sunken">
          <svg
            ref={svgRef}
            viewBox="-2.4 -2.4 4.8 4.8"
            className="aspect-square w-full touch-none cursor-crosshair"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          >
            <rect x="-2.4" y="-2.4" width="4.8" height="4.8" className="fill-sunken" />
            <line x1="-2.4" y1="0" x2="2.4" y2="0" className="stroke-border" strokeWidth="0.02" />
            <line x1="0" y1="-2.4" x2="0" y2="2.4" className="stroke-border" strokeWidth="0.02" />
            {levels.map((c) => {
              const rx = Math.sqrt((2 * c) / kappa);
              const ry = Math.sqrt(2 * c);
              return (
                <ellipse
                  key={c}
                  cx="0"
                  cy="0"
                  rx={rx}
                  ry={ry}
                  className="fill-none stroke-primary/35"
                  strokeWidth="0.025"
                />
              );
            })}
            <polyline
              points={pathPc.map((p) => `${p.x},${-p.y}`).join(" ")}
              className="fill-none stroke-pine"
              strokeWidth="0.04"
              strokeLinejoin="round"
            />
            <polyline
              points={pathGd.map((p) => `${p.x},${-p.y}`).join(" ")}
              className="fill-none stroke-cinnabar"
              strokeWidth="0.04"
              strokeLinejoin="round"
            />
            {gnorm > 1e-9 ? (
              <line
                x1={pos.x}
                y1={-pos.y}
                x2={pos.x - (0.55 * gx) / gnorm}
                y2={-(pos.y - (0.55 * gy) / gnorm)}
                className="stroke-cinnabar"
                strokeWidth="0.045"
                markerEnd="url(#arrow-cinnabar)"
              />
            ) : null}
            <line
              x1={pos.x}
              y1={-pos.y}
              x2={0}
              y2={0}
              className="stroke-primary"
              strokeWidth="0.02"
              strokeDasharray="0.06 0.05"
            />
            <circle cx={pos.x} cy={-pos.y} r="0.07" className="fill-foreground" />
            <circle cx="0" cy="0" r="0.05" className="fill-pine" />
            <defs>
              <marker id="arrow-cinnabar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" className="fill-cinnabar" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <RangeField
            label="条件数 κ"
            value={kappa}
            min={1}
            max={80}
            step={1}
            onChange={(v) => {
              setKappa(v);
              resetTo(pos.x, pos.y);
            }}
            format={(v) => v.toFixed(0)}
          />
          <RangeField
            label="学习率 η"
            value={lr}
            min={0.01}
            max={0.4}
            step={0.01}
            onChange={(v) => {
              setLr(v);
              resetTo(pos.x, pos.y);
            }}
            format={(v) => v.toFixed(2)}
          />
          <p className="text-xs text-muted-foreground">
            GD 收敛需要 η {"<"} 2/λ<sub>max</sub> ≈ {lrMax.toFixed(3)}。当前 η {lr > lrMax ? "已经越界" : "在界内"}。
          </p>
          <div className="flex flex-wrap gap-1.5 text-[0.6875rem]">
            <LegendDot className="bg-cinnabar" label="GD 轨迹 / 负梯度" />
            <LegendDot className="bg-pine" label="预条件轨迹" />
            <LegendDot className="bg-primary" label="指向原点" dashed />
          </div>
          <div className="flex gap-2">
            <Button type="button" onClick={stepBoth}>
              走 1 步
            </Button>
            <Button type="button" variant="outline" onClick={() => resetTo(0.85, 1.45)}>
              重置
            </Button>
          </div>
          {diverged ? (
            <p className="text-sm text-cinnabar">普通 GD 已经发散。把学习率降到虚线阈值以下，或改用预条件。</p>
          ) : null}
          <p className="font-mono text-[0.6875rem] tabular-nums text-subtle">
            ∇f = ({fmt(gx, 3)}, {fmt(gy, 3)}) · ‖∇f‖ = {fmt(gnorm, 3)}
          </p>
        </div>
      </div>
    </LabFrame>
  );
}

function LegendDot({
  className,
  label,
  dashed,
}: {
  className: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className={cn("size-2 rounded-full", className, dashed && "opacity-70")} />
      {label}
    </span>
  );
}

function EpsilonLab() {
  const [logV, setLogV] = useState(-8);
  const [logEps, setLogEps] = useState(-8);
  const [g, setG] = useState(0.2);
  const v = 10 ** logV;
  const eps = 10 ** logEps;
  const withEps = adamUpdate(g, v, eps);
  const without = v === 0 ? Infinity : adamUpdate(g, v, 0);
  const bnVar = v;
  const bn = batchNorm(1, 0, bnVar, eps);
  const bn0 = batchNorm(1, 0, bnVar, 0);

  const curve = useMemo(() => {
    const pts: { x: number; y0: number; y1: number }[] = [];
    for (let i = 0; i <= 48; i++) {
      const lv = -12 + (i / 48) * 12;
      const vv = 10 ** lv;
      pts.push({
        x: i / 48,
        y0: Math.min(40, Math.abs(adamUpdate(g, vv, 0))),
        y1: Math.min(40, Math.abs(adamUpdate(g, vv, eps))),
      });
    }
    return pts;
  }, [g, eps]);

  const yMax = 8;
  function pathOf(key: "y0" | "y1") {
    return curve
      .map((p, i) => {
        const x = 8 + p.x * 220;
        const y = 88 - (Math.min(yMax, p[key]) / yMax) * 76;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <LabFrame
      title="动手：分母里的 ε"
      hint="横轴是 v（梯度平方的滑动平均），对数坐标。没有 ε 时，v → 0 更新爆炸；有 ε 时被封顶。"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <RangeField
            label="梯度 g"
            value={g}
            min={-1}
            max={1}
            step={0.01}
            onChange={setG}
            format={(v) => v.toFixed(2)}
          />
          <RangeField
            label="v（二阶矩）"
            value={logV}
            min={-12}
            max={0}
            step={0.1}
            onChange={setLogV}
            format={() => fmt(v)}
          />
          <RangeField
            label="ε"
            value={logEps}
            min={-12}
            max={-2}
            step={0.1}
            onChange={setLogEps}
            format={() => fmt(eps)}
          />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Stat label="Adam 无 ε" value={fmt(without)} danger={!Number.isFinite(without) || Math.abs(without) > 50} />
            <Stat label="Adam 有 ε" value={fmt(withEps)} />
            <Stat label="BN 无 ε" value={fmt(bn0)} danger={!Number.isFinite(bn0)} />
            <Stat label="BN 有 ε" value={fmt(bn)} />
          </div>
        </div>
        <div className="rounded-lg bg-sunken p-3">
          <svg viewBox="0 0 240 100" className="w-full">
            <path d={pathOf("y0")} className="fill-none stroke-cinnabar" strokeWidth="1.6" />
            <path d={pathOf("y1")} className="fill-none stroke-pine" strokeWidth="1.6" />
            <text x="8" y="12" className="fill-muted-foreground" fontSize="8">
              |g| / (√v + ε)
            </text>
            <text x="8" y="98" className="fill-subtle" fontSize="7">
              v = 10⁻¹²
            </text>
            <text x="200" y="98" className="fill-subtle" fontSize="7">
              v = 1
            </text>
          </svg>
          <div className="mt-1 flex gap-3 text-[0.6875rem] text-muted-foreground">
            <LegendDot className="bg-cinnabar" label="ε = 0" />
            <LegendDot className="bg-pine" label="当前 ε" />
          </div>
        </div>
      </div>
    </LabFrame>
  );
}

function Stat({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-md bg-sunken px-3 py-2">
      <p className="text-[0.6875rem] text-subtle">{label}</p>
      <p className={cn("font-mono text-sm tabular-nums", danger && "text-cinnabar")}>{value}</p>
    </div>
  );
}

function MixedLab() {
  const [logG, setLogG] = useState(-6);
  const [logS, setLogS] = useState(10);
  const g = 10 ** logG;
  const S = 2 ** logS;
  const scaled = g * S;
  const raw = classifyF16(g);
  const lifted = classifyF16(scaled);
  const recovered = lifted.status === "overflow" ? Infinity : lifted.value / S;
  const lost = recovered === 0 && g !== 0;

  function xOf(value: number) {
    const log = Math.log10(Math.max(value, 1e-12));
    return ((log - -12) / (6 - -12)) * 100;
  }

  return (
    <LabFrame
      title="动手：一张对数轴上的 FP16"
      hint="拖动梯度的数量级和 loss scale。目标是让缩放后的值落进 FP16 正规数带，再除回去。"
    >
      <RangeField
        label="梯度 |g|"
        value={logG}
        min={-12}
        max={2}
        step={0.05}
        onChange={setLogG}
        format={() => fmt(g)}
      />
      <RangeField
        label="loss scale S = 2^k"
        value={logS}
        min={0}
        max={16}
        step={1}
        onChange={setLogS}
        format={() => `2^${logS.toFixed(0)} = ${fmt(S)}`}
      />

      <div className="relative mt-5 h-16">
        <div className="absolute inset-x-0 top-6 h-2 overflow-hidden rounded-full bg-sunken">
          <div
            className="absolute inset-y-0 bg-cinnabar/40"
            style={{ left: "0%", width: `${xOf(FP16_MIN_SUB)}%` }}
          />
          <div
            className="absolute inset-y-0 bg-cinnabar/20"
            style={{
              left: `${xOf(FP16_MIN_SUB)}%`,
              width: `${xOf(FP16_MIN_NORMAL) - xOf(FP16_MIN_SUB)}%`,
            }}
          />
          <div
            className="absolute inset-y-0 bg-pine/35"
            style={{
              left: `${xOf(FP16_MIN_NORMAL)}%`,
              width: `${xOf(FP16_MAX) - xOf(FP16_MIN_NORMAL)}%`,
            }}
          />
        </div>
        <Marker left={xOf(g)} label="g" tone="cinnabar" />
        <Marker left={xOf(scaled)} label="S·g" tone="pine" />
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-[0.6875rem] text-muted-foreground">
        <span>下溢 →0</span>
        <span>亚正规</span>
        <span className="text-pine">FP16 正规数</span>
        <span>溢出 → Inf</span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Stat label="直接存成 FP16" value={`${fmt(raw.value)} · ${raw.status}`} danger={raw.status !== "ok"} />
        <Stat
          label="缩放后的 FP16"
          value={`${fmt(lifted.value)} · ${lifted.status}`}
          danger={lifted.status === "overflow"}
        />
        <Stat label="除 S 之后" value={fmt(recovered)} danger={lost || !Number.isFinite(recovered)} />
      </div>
      {lost ? (
        <p className="mt-3 text-sm text-cinnabar">缩放仍不够，梯度回读成 0。继续增大 S，或换 BF16。</p>
      ) : lifted.status === "overflow" ? (
        <p className="mt-3 text-sm text-cinnabar">S 太大，缩放后溢出。动态 loss scaling 这时会把 S 调小。</p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          缩放后落在正规数带，除回去还能看到这个梯度。Master weights 的加法仍建议在 FP32 里做。
        </p>
      )}
    </LabFrame>
  );
}

function Marker({
  left,
  label,
  tone,
}: {
  left: number;
  label: string;
  tone: "cinnabar" | "pine";
}) {
  const clamped = Math.max(0, Math.min(100, left));
  return (
    <div
      className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
      style={{ left: `${clamped}%` }}
    >
      <span className={cn("text-[0.6875rem] font-medium", tone === "pine" ? "text-pine" : "text-cinnabar")}>
        {label}
      </span>
      <span className={cn("mt-1 h-8 w-px", tone === "pine" ? "bg-pine" : "bg-cinnabar")} />
    </div>
  );
}

function QuantLab() {
  const w = useMemo(() => seededWeights(24, 11), []);
  const [bits, setBits] = useState(8);
  const { q, scale, mse, snr, qmax, digits } = quantizeSymmetric(w, bits);
  const maxAbs = Math.max(...w.map((x) => Math.abs(x)));

  return (
    <LabFrame
      title="动手：同一组权重，越来越粗的格子"
      hint="对称均匀量化。位数下降时，离 0 远的值还在，靠近 0 的细节先被 round 掉。"
    >
      <RangeField
        label="位宽"
        value={bits}
        min={2}
        max={8}
        step={1}
        onChange={setBits}
        format={(v) => `INT${v}`}
      />
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tabular-nums text-muted-foreground">
        <span>s = {fmt(scale)}</span>
        <span>Q = {qmax}</span>
        <span>MSE = {fmt(mse)}</span>
        <span>SNR = {fmt(snr)} dB</span>
        <span>约 {digits} 位有效数字</span>
      </div>
      <div className="mt-4 flex h-40 items-end gap-0.5 rounded-lg bg-sunken px-2 pb-2 pt-4">
        {w.map((wi, i) => {
          const h = (Math.abs(wi) / maxAbs) * 100;
          const hq = (Math.abs(q[i]) / maxAbs) * 100;
          return (
            <div key={i} className="relative flex h-full min-w-0 flex-1 items-end justify-center">
              <span
                className="absolute bottom-0 w-[70%] rounded-sm bg-primary/25"
                style={{ height: `${h}%` }}
              />
              <span
                className="absolute bottom-0 w-[40%] rounded-sm bg-cinnabar"
                style={{ height: `${hq}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-3 text-[0.6875rem] text-muted-foreground">
        <LegendDot className="bg-primary/40" label="原权重 |w|" />
        <LegendDot className="bg-cinnabar" label="量化后 |ŵ|" />
      </div>
    </LabFrame>
  );
}

function ExamMap() {
  return (
    <div className="flex flex-col gap-3">
      {EXAM_AI_MAP.map((row) => (
        <article key={`${row.chapterId}-${row.sectionId}`} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                row.depth === "必懂" ? "focus" : row.depth === "值得知道" ? "optional" : "guide"
              }
            >
              {row.depth}
            </Badge>
            <h3 className="font-display text-base font-semibold">{row.exam}</h3>
          </div>
          <p className="mt-2 text-sm">
            <span className="text-subtle">AI 里：</span>
            {row.ai}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{row.take}</p>
          <Link
            to="/read/$chapterId"
            params={{ chapterId: row.chapterId }}
            search={{ s: row.sectionId }}
            className="mt-2 inline-flex h-10 items-center text-sm text-primary"
          >
            打开对应讲义
          </Link>
        </article>
      ))}
    </div>
  );
}

export function BooksList() {
  return (
    <div className="flex flex-col gap-3">
      {BOOKS.map((b) => (
        <article key={b.title} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={b.how === "主读" ? "focus" : b.how === "查阅" ? "optional" : "guide"}>
              {b.how}
            </Badge>
            <h3 className="font-display text-base font-semibold">{b.title}</h3>
          </div>
          <p className="mt-1 text-xs text-subtle">
            {b.authors} · {b.year}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{b.why}</p>
        </article>
      ))}
    </div>
  );
}
