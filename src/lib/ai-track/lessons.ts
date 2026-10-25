export type ExamLink = {
  chapterId: string;
  sectionId: string;
  label: string;
};

export type Transfer = { scene: string; same: string };
export type Quiz = { q: string; a: string };

export type LabId = "softmax" | "condition" | "epsilon" | "mixed" | "quant" | "map";

export type AiLesson = {
  id: string;
  n: string;
  title: string;
  kicker: string;
  thesis: string;
  minutes: number;
  examLinks: ExamLink[];
  markdown: string;
  afterLab?: string;
  lab?: LabId;
  transfers: Transfer[];
  quizzes: Quiz[];
};

export const AI_LESSONS: AiLesson[] = [
  {
    id: "thesis",
    n: "01",
    title: "先说结论",
    kicker: "为什么要开这一条路径",
    thesis:
      "只要你做的方向碰到优化、训练或数值计算，本科数值分析就能帮你少走非常多弯路。",
    minutes: 4,
    examLinks: [
      { chapterId: "ch1", sectionId: "1.4", label: "1.4 计算原则" },
      { chapterId: "ch2", sectionId: "2.5.1", label: "2.5.1 条件数" },
    ],
    markdown: `做 AI 的人里，有一个很常见的知识盲区：习惯在 PyTorch 里调 API，觉得底层的事框架都搞定了。多数时候这没问题。可一旦你要做点非标准的——自定义 kernel、写 CUDA、改优化器、搞新的 normalization——**数值感觉**会立刻变得极其重要。

现在卷论文，模型架构大家往往差不多。很多时候胜负手在工程细节上，而工程细节里有相当一部分就是数值问题。

下面五件事，是这条路径会反复碰到的同一类坑：

1. **Softmax 不是套公式。** 不做 max-shift，指数直接溢出，输出变成 NaN。这是数值稳定性的基本功。
2. **梯度裁剪、梯度缩放** 背后，是条件数和误差传播。
3. **Adam 的分母为什么加 ε？BatchNorm 为什么有效？** 很多时候本质是在处理病态问题，或避免除以接近零的数。
4. **混合精度** 里 FP16 / FP32 怎么切换，是溢出、下溢和有效数字在打架。
5. **大模型推理的量化方案**，说白了就是在数值分析的基础上，在精度和效率之间找平衡。

### 不用学太深

本科水平的数值分析就够用。真正要盯住的是这几块：

- 误差、有效数字、稳定的等价改写（第 1 章）
- 范数、条件数、扰动放大（第 2 章）
- 迭代法何时收敛、谱半径（第 3 章）
- 插值与逼近是什么意思（第 6 章，建立直觉即可）

线性方程组的 LU 分解属于**数值代数**，训练里你几乎不会手写 Doolittle，但条件数的思想处处都在。数值微分和积分主要是为解微分方程准备的，和深度学习里 autograd 算出的梯度**不是一回事**；线搜索、信赖域知道名字就行，别陷进去。

后面每一节都按同一节奏：**先人话，再动手把数算炸，再对应回考试章节，最后举一反三。**`,
    transfers: [
      {
        scene: "训练曲线突然出现 NaN",
        same: "先问：是溢出、除零，还是病态把误差放大到不可表示？不要先改模型结构。",
      },
      {
        scene: "论文里一个看起来不起眼的 ε、max、clamp",
        same: "多半是数值补丁。能说出它挡住了哪一种误差，你才算看懂了。",
      },
    ],
    quizzes: [
      {
        q: "“框架都处理了底层数值”在什么时候会失效？",
        a: "当你离开标准 API：自己写 kernel、改优化器、换 normalization、做非常规混合精度或量化时。标准 softmax / Adam 的稳定性补丁，框架已经写了；你重写一遍却漏掉 max-shift 或 ε，就会炸。",
      },
    ],
  },
  {
    id: "softmax",
    n: "02",
    title: "Softmax 为什么会炸",
    kicker: "数值稳定性",
    thesis:
      "代数上相等的公式，浮点里可以一个给出概率、一个给出 NaN。Max-shift 就是第 1 章里“先缩放再算”的翻版。",
    minutes: 8,
    examLinks: [
      { chapterId: "ch1", sectionId: "1.4", label: "1.4 避免溢出" },
      { chapterId: "ch1", sectionId: "1.3", label: "1.3 相对误差" },
    ],
    lab: "softmax",
    markdown: `Softmax 的定义是

$$
p_i=\\frac{e^{z_i}}{\\sum_j e^{z_j}}.
$$

在实数里这没问题。在浮点里，$e^{z}$ 增长极快：FP16 大约在 $z\\approx 11$ 就溢出成 $+\infty$，FP32 大约在 $z\\approx 89$。一旦某个 $e^{z_i}=\\infty$，你得到的是 $\\infty/\\infty=\\mathrm{NaN}$。

### 稳定写法：先减最大值

令 $m=\\max_j z_j$，改写为

$$
p_i=\\frac{e^{z_i-m}}{\\sum_j e^{z_j-m}}.
$$

这是**恒等变形**：$e^{-m}$ 从分子分母约掉。数值上，最大的指数变成 $e^{0}=1$，其余都 $\\le 1$，再也不会一起溢出。

这和第 1 章计算 $\\sqrt{x^2+y^2}$ 时先提出 $s=\\max(|x|,|y|)$ 是同一条原则：先把数量级拉回可表示的范围，再运算。

下面这个实验可以切换 FP16 / FP32，对比“直接套公式”和 max-shift。把 logits 拉大，看左侧什么时候变成 NaN。`,
    afterLab: `**为什么减 max 而不是减平均值？** 因为我们要保证至少有一个指数精确等于 $1$。减均值只能缩小整体规模，不能保证不溢出。

**LogSumExp** 是同一个技巧的对数版：

$$
\\log\\sum_i e^{z_i}=m+\\log\\sum_i e^{z_i-m}.
$$

\`log_softmax\` 应直接用它，而不是先 softmax 再 \`log\`——后者会把下溢成 $0$ 的概率送进 $\\log$，得到 $-\\infty$。`,
    transfers: [
      {
        scene: "Transformer 的 attention：score = QKᵀ / √d",
        same: "score 很大时，对最后一维做 softmax 必须先减 max。FlashAttention 把这件事做在 tile 内部，原理不变。",
      },
      {
        scene: "计算 ‖x‖₂ = √(x·x)",
        same: "先平方再求和会溢出。稳定写法是提出最大绝对值，和 hypot、第 1 章的缩放是同一招。",
      },
      {
        scene: "交叉熵：−log softmax",
        same: "用 log_softmax（LogSumExp），不要 softmax 后再 log。否则概率下溢成 0，loss 变 Inf。",
      },
    ],
    quizzes: [
      {
        q: "三个 logits 为 [1000, 1001, 1002]。朴素 softmax 在 FP32 里会怎样？max-shift 之后呢？",
        a: "朴素：e^1000 远超 FP32 上限，得到 Inf/Inf=NaN。max-shift 后变成 [e^{-2}, e^{-1}, e^0]，全部在 (0,1]，结果约 [0.090, 0.245, 0.665]。",
      },
      {
        q: "如果所有 logits 都是很大的负数，比如 [−800, −790]，朴素 softmax 会怎样？max-shift 呢？",
        a: "朴素：指数全部下溢成 0，得到 0/0=NaN。max-shift 后最大项为 e^0=1，仍然正常。所以 max-shift 同时挡住溢出和下溢。",
      },
    ],
  },
  {
    id: "condition",
    n: "03",
    title: "条件数、裁剪与缩放",
    kicker: "病态问题",
    thesis:
      "梯度裁剪管的是“这一步别把误差放太大”，BatchNorm / 预条件管的是“问题本身别那么病态”。两者常被混成一个 trick。",
    minutes: 10,
    examLinks: [
      { chapterId: "ch2", sectionId: "2.5.1", label: "2.5.1 条件数" },
      { chapterId: "ch2", sectionId: "2.4", label: "2.4 范数" },
      { chapterId: "ch3", sectionId: "3.2", label: "3.2 迭代收敛" },
    ],
    lab: "condition",
    markdown: `第 2 章把**问题的病态**和**算法的稳定性**分开了。训练里同样要分开。

二次损失 $f(x)=\\frac12 x^\\top A x$（$A$ 对称正定）的等高线是椭圆。条件数

$$
\\kappa_2(A)=\\frac{\\lambda_{\\max}}{\\lambda_{\\min}}
$$

就是椭圆有多扁。$\\kappa=1$ 时是圆，负梯度直指原点；$\\kappa$ 很大时，负梯度几乎沿着“最陡的短轴”，并不指向谷底。

最速下降 $x\\leftarrow x-\\eta\\nabla f$ 要收敛，学习率必须小到 $\\eta<2/\\lambda_{\\max}$（这和第 3 章“谱半径小于 1”是同一类限制）。扁谷里你只能走小碎步，还一路之字形。

### 两个不同的补丁

| 做法 | 它在管什么 | 对应数值分析 |
|---|---|---|
| 梯度裁剪 $\\mathrm{clip}(g,\\tau)$ | 某一步的更新别爆炸（算法侧） | 限制误差传播，像加了个保险杠 |
| 预条件 / BatchNorm / Adam | 让不同方向的尺度别差太远（问题侧） | 降低有效条件数 |

裁剪**不改变**椭圆有多扁，只是把过长的箭头砍短。预条件相当于在每条轴上除以自己的曲率，椭圆被拉回近圆。

\`clip_grad_norm_\` 用的就是第 2 章的向量 2 范数：先算全局 $\|g\|_2$，超过阈值就整体缩放。`,
    afterLab: `上面可以拖动探点、拉条件数、走几步。条件数一大，普通 GD 开始之字，学习率再大一点就飞出画面——这就是梯度爆炸。点“预条件”后，同一步长会稳稳指向原点：Adam 对角缩放、BatchNorm 把激活方差拉回 $O(1)$，直觉都在这里。

残差连接也有条件数的味道：把映射写成 $x+F(x)$，Jacobian 靠近 $I$，比深层连乘好受得多。这是“改问题”而不是“砍梯度”。`,
    transfers: [
      {
        scene: "学习率 1e-3 在这个层刚好，在那个层却 NaN",
        same: "各层 Hessian 的 λ_max 差了几个数量级。全局一个 η，等价于用同一个步长走完全不同的椭圆。",
      },
      {
        scene: "loss scaling（混合精度）",
        same: "把梯度整体乘上一个系数，避免 FP16 下溢。这是缩放，不是在改善 κ；和裁剪一样属于表示范围的补丁。",
      },
      {
        scene: "K-FAC / Shampoo / SOAP",
        same: "比 Adam 更认真的预条件，用块对角或 Kronecker 近似 Hessian。知道“在降 κ”即可，不必推公式。",
      },
    ],
    quizzes: [
      {
        q: "残差很小、参数却完全不对，训练里有没有对应物？",
        a: "有。条件数大时，残差（或 batch 上的 loss）可以看起来还行，参数误差已经被放大。第 2 章原话：残差小不等于解误差小。这也是为什么只盯 loss、不盯梯度范数和更新比例会误判。",
      },
      {
        q: "梯度裁剪能把病态问题变成良态吗？",
        a: "不能。它只限制单步更新的范数，防止算法侧爆炸。椭圆还是那么扁。要改善病态，需要归一化、更好的参数化、预条件或改结构（比如残差）。",
      },
    ],
  },
  {
    id: "epsilon",
    n: "04",
    title: "Adam 的 ε 与 BatchNorm",
    kicker: "靠近零的除法",
    thesis:
      "分母里那个不起眼的 ε，是在挡“除以接近零的数”。BatchNorm 有效，既有统计上的解释，也有把尺度拉回 O(1)、减轻病态的数值解释。",
    minutes: 8,
    examLinks: [
      { chapterId: "ch1", sectionId: "1.4", label: "1.4 避免除接近零" },
      { chapterId: "ch2", sectionId: "2.5.1", label: "2.5.1 病态" },
    ],
    lab: "epsilon",
    markdown: `Adam 的更新核心是

$$
\\theta\\leftarrow\\theta-\\eta\\frac{\\hat m}{\\sqrt{\\hat v}+\\varepsilon}.
$$

$\\hat v$ 是梯度平方的滑动平均。训练初期、稀疏梯度、或某个坐标长期接近 $0$ 时，$\\hat v\\to 0$。若 $\\varepsilon=0$，更新变成 $g/0$，直接 Inf。

$\\varepsilon$ 通常取 $10^{-8}$ 量级：当 $\\sqrt{\\hat v}\\gg\\varepsilon$ 时它几乎看不见；当 $\\sqrt{\\hat v}\\ll\\varepsilon$ 时，更新被封顶在 $|g|/\\varepsilon$，相当于给除法加了地板。

这是第 1 章的老原则：**不要除以接近零的数。** 不是超参数玄学。

### BatchNorm 的数值一面

BatchNorm：

$$
\\hat x=\\frac{x-\\mu}{\\sqrt{\\sigma^2+\\varepsilon}}.
$$

流行故事是“减轻 internal covariate shift”。从数值看，它做了两件更朴素的事：

1. **方差地板**：某个 batch 里样本几乎相等，$\\sigma\\approx 0$，没有 $\\varepsilon$ 就会除零。
2. **把激活尺度拉回 $O(1)$**：后面一层看到的输入不再差出几个数量级，有效条件数下降。这和第 3 节的预条件是同一幅图。

LayerNorm、RMSNorm 里的 $\\varepsilon$ 完全同构。CUDA 里 \`rsqrt(x)\` 也要先保证 $x$ 不是 $0$ 或负数。`,
    afterLab: `$\\varepsilon$ 不是越大越安全。把它设成 $1$，Adam 就退化成“差不多在做缩放了的 SGD”，自适应能力被关掉。它应该刚好挡住下溢和除零，而不参与正常坐标的更新。

同样，BatchNorm 的 $\\varepsilon$ 太大，等于拒绝真正归一化。默认 $10^{-5}$ 是表示范围和统计稳定性之间的折中。`,
    transfers: [
      {
        scene: "log(p) 或 log(σ)",
        same: "写成 log(p+ε) 或 softplus。和 Adam 的 ε 一样，都是给“不能碰的零”垫一层。",
      },
      {
        scene: "自定义 CUDA kernel 里的 rsqrt",
        same: "先 clamp 再开方倒数。漏了这一步，NaN 会在几个 token 之后才冒出来，极难查。",
      },
      {
        scene: "权重衰减 vs AdamW",
        same: "和 ε 无关，但常被一起调。ε 管除零；weight decay 管参数范数。别把两个旋钮拧成一个。",
      },
    ],
    quizzes: [
      {
        q: "某个参数的梯度长期是 0，Adam 没有 ε 会怎样？有 ε 呢？",
        a: "v 和 m 都是 0，0/0 → NaN，这个坐标被污染，并可能传给其他计算。有 ε 时更新是 0/ε=0，参数留在原地，这正是你想要的。",
      },
      {
        q: "BatchNorm 有效，是不是因为它“减少了 covariate shift”？",
        a: "这是一种说法，实验上并不总站得住。更稳的数值视角：它固定了激活的一、二阶矩，降低了后面层的有效条件数，并避免了 σ=0。当作充分解释就过了；当作唯一解释则不必。",
      },
    ],
  },
  {
    id: "mixed",
    n: "05",
    title: "混合精度：FP16 和 FP32 怎么切换",
    kicker: "表示范围",
    thesis:
      "FP16 不是“差一点的 FP32”。它的动态范围窄得多。混合精度的全部技巧，就是让该细的累加留在 FP32，让该快的乘加跑在 FP16，同时用缩放把梯度抬进可表示的区间。",
    minutes: 8,
    examLinks: [
      { chapterId: "ch1", sectionId: "1.3", label: "1.3 有效数字" },
      { chapterId: "ch1", sectionId: "1.4", label: "1.4 溢出与下溢" },
    ],
    lab: "mixed",
    markdown: `先记三个范围（大约值）：

| 格式 | 最大有限数 | 最小正规数 | 小数位数（大约） |
|---|---|---|---|
| FP32 | $3.4\\times 10^{38}$ | $1.2\\times 10^{-38}$ | $6$–$7$ |
| FP16 | $65504$ | $6.1\\times 10^{-5}$ | $3$–$4$ |
| BF16 | 与 FP32 同阶 | 与 FP32 同阶 | $\\approx 2$–$3$ |

FP16 的指数位只有 5 bit，所以**动态范围**才是瓶颈：梯度 $10^{-8}$ 在 FP16 里会变成 $0$（下溢），激活 $10^5$ 会变成 Inf（溢出）。有效数字少，是第二件事。

### 常见切换方式

1. **Master weights 留在 FP32。** 每次更新量可能小于 FP16 的 ulp，若权重本身也是 FP16，加了等于没加（第 1 章：大小悬殊的数相加，小数被吞掉）。
2. **Matmul 用 FP16/TF32，累加用 FP32。** 大量小项求和，必须用更高精度的累加器，否则误差按 $\\sqrt n$ 甚至更差地长。
3. **Loss scaling。** 前向 loss 乘 $S$（如 $2^{10}$），反传梯度整体变大，挤进 FP16 正规数范围；更新前再除以 $S$。动态 loss scaling 会在出现 Inf 时把 $S$ 调小。

BF16 的指数和 FP32 一样宽，所以几乎不需要 loss scaling；它牺牲的是尾数，也就是有效数字。选 FP16 还是 BF16，是在**范围**和**精度**之间做第 1 章早就讲过的取舍。`,
    afterLab: `上图把一个梯度放在对数轴上。拖动它的数量级，再打开 loss scale，看它能不能从“FP16 下溢带”走进“正规数带”。

溢出和吞没可以同时发生：激活太大 Inf，梯度太小变 0。这就是为什么要 **FP32 的主权重 + 缩放后的 FP16 梯度 + FP32 累加**，而不是“全部改成半精度”。`,
    transfers: [
      {
        scene: "FlashAttention 的累加",
        same: "online softmax 的统计量（m 和 l）通常用 FP32 维护，tile 内的 matmul 才走 Tensor Core。又是“乘加用窄类型，归约用宽类型”。",
      },
      {
        scene: "梯度检查点 / 重计算",
        same: "省的是激活内存，不是数值精度。不要和混合精度混成一个开关。",
      },
      {
        scene: "为什么 embedding 有时保持 FP32",
        same: "词表行更新稀疏、步长很小，最容易被 FP16 吞掉。这是“大数加小数”的直接例子。",
      },
    ],
    quizzes: [
      {
        q: "权重是 1.0，更新量是 10⁻⁵。全部用 FP16 会怎样？",
        a: "FP16 在 1.0 附近的 ulp 约为 2⁻¹⁰≈10⁻³。10⁻⁵ 比一个 ulp 还小两个数量级，加完还是 1.0。所以 master weights 要在 FP32 里做加法。",
      },
      {
        q: "BF16 为什么通常不需要 loss scaling？",
        a: "BF16 指数位 8 bit，和 FP32 一样，动态范围相当。小梯度不会仅仅因为格式就下溢。它更容易丢的是尾数精度，不是范围。",
      },
    ],
  },
  {
    id: "quant",
    n: "06",
    title: "量化：精度和效率的平衡",
    kicker: "有效数字",
    thesis:
      "量化不是新魔法。它就是把每个数的有效数字从约 7 位砍到 2–3 位（INT8）甚至更少，然后用缩放因子把能表示的格子对准数据真正所在的区间。",
    minutes: 8,
    examLinks: [
      { chapterId: "ch1", sectionId: "1.3", label: "1.3 有效数字" },
      { chapterId: "ch6", sectionId: "6.7", label: "6.7 数据拟合" },
    ],
    lab: "quant",
    markdown: `对称均匀量化（INT $b$ 位）可以写成

$$
\\hat w=s\\cdot\\mathrm{clip}\\left(\\mathrm{round}\\frac{w}{s},-Q,Q\\right),\\qquad
s=\\frac{\\max|w|}{Q},\\quad Q=2^{b-1}-1.
$$

这就是第 1 章的“先定小数点位置（$s$），再保留 $b$ 位”。$s$ 选错，要么格子太稀（大误差），要么动态范围被一两个离群点占满（大多数权重挤在 0 附近）。

粗对照：

| 格式 | 大约有效十进制位 |
|---|---|
| FP32 | $6$–$7$ |
| FP16 | $3$–$4$ |
| INT8 | $2$–$3$ |
| INT4 | $\\approx 1$ |

LLM 推理里的 GPTQ / AWQ / SmoothQuant，争的不是“要不要量化”，而是**离群通道把 $s$ 撑爆之后怎么办**：有的保护重要权重，有的把尺度挪到激活上，有的按通道分别量化。全部是在第 1 章的误差限里做分配。`,
    afterLab: `拖动位数，看同一组权重被贴到多粗的格子上。INT8 往往还能认得出形状；INT4 就开始“台阶化”。SNR 掉下去的时候，对应的就是有效数字不够。

KV cache 量化通常比权重量化更敏感：权重可以离线校准，cache 是动态的、含注意力分数，误差会沿序列传播——又是误差传播，不是新问题。`,
    transfers: [
      {
        scene: "AWQ：激活大的通道，权重少量化一点",
        same: "误差传播：∂loss/∂w 大的位置，同样的 Δw 会被放大。保护这些通道 = 把误差预算花在条件数大的方向上。",
      },
      {
        scene: "Per-token / per-channel 量化",
        same: "一组数共用一个 s，就是假设它们数量级相近。第 1 章：数量级悬殊的数不要直接放在同一次运算里。",
      },
      {
        scene: "QAT（量化感知训练）",
        same: "前向用阶梯函数，反向用 STE 假装梯度是 1。这是在用逼近代替不可微映射，属于第 6 章“用简单对象逼近复杂对象”的工程版，不必上升到证明。",
      },
    ],
    quizzes: [
      {
        q: "一组权重里有一个 100，其余都在 ±0.1。对称 INT8 会怎样？",
        a: "s ≈ 100/127 ≈ 0.79。±0.1 的权重全部 round 成 0。离群点吞掉了动态范围。这就是 LLM 量化要处理激活/权重 outlier 的原因。",
      },
      {
        q: "INT8 大约对应多少位有效数字？能不能靠它表示 1+10⁻⁶？",
        a: "大约 2–3 位十进制。1+10⁻⁶ 的相对变化是 10⁻⁶，远小于 INT8 在 1 附近能表示的最小相对步长（约 1/127≈0.008）。加了等于没加。",
      },
    ],
  },
  {
    id: "map",
    n: "07",
    title: "考试章节怎么用到训练里",
    kicker: "对照表",
    thesis:
      "不是每一章都要在训练里用一遍。有的是基本功，有的知道思想即可，有的了解边界就该停。",
    minutes: 6,
    examLinks: [
      { chapterId: "intro", sectionId: "scope", label: "考试范围总表" },
    ],
    lab: "map",
    markdown: `下面按“对做 AI 的优先级”重新排过，不是按考试分数。考试该背的公式继续在讲义里背；这里只标：**它在工程里对应什么，以及该挖多深。**

线性方程组的具体算法（LU、追赶法、Cholesky 手算）是数值代数的训练，帮你理解分解和条件数；训练循环里你几乎不会去分解一个 Hessian。数值微分 / 积分主要是为微分方程服务的，**不要把它和反向传播画等号**。Newton 法后面的线搜索、信赖域，知道是“二阶方法用来管步长的工具”就够了。`,
    transfers: [
      {
        scene: "想用数值微分核对 autograd",
        same: "可以当调试工具（有限差分），但误差阶、步长选取是第 7 章的内容；它不是训练用的梯度。核对完就回来用反向传播。",
      },
      {
        scene: "看到论文把 ResNet 写成 ODE",
        same: "这是第 8 章离散化的比喻，能帮你理解深度和步长。真要做 Neural ODE 再补，否则到此为止。",
      },
    ],
    quizzes: [
      {
        q: "为了把模型训好，需要把 LU 分解练到能手算 4×4 吗？",
        a: "考试需要。做 AI 不需要。你要留下的是：分解把问题变成容易解的三角系统、条件数决定扰动有多放大、残差小不等于解准。手算流程可以留给试卷。",
      },
    ],
  },
  {
    id: "howfar",
    n: "08",
    title: "学到什么程度，读什么",
    kicker: "边界",
    thesis:
      "本科数值分析够用。Trefethen 全家桶能把你送到“可以做一维问题的正经研究”；再往多维、再往优化理论，不是这条路径的目标。",
    minutes: 5,
    examLinks: [
      { chapterId: "ch1", sectionId: "1.4", label: "1.4" },
      { chapterId: "ch2", sectionId: "2.5.1", label: "2.5.1" },
      { chapterId: "ch3", sectionId: "3.2", label: "3.2" },
    ],
    markdown: `### 建议顺序（做 AI 的人）

1. 第 1 章 1.3–1.4：误差、有效数字、书上的五条计算原则（含 I_n 正推不稳定、倒推稳定）。对应 softmax、混合精度、量化。
2. 第 2 章 2.4–2.5.1：范数、条件数、残差 vs 误差。对应裁剪、病态、Adam / BN 的直觉。
3. 第 3 章 3.2–3.3：谱半径与收敛。对应学习率为何不能太大。
4. 其余章节：考试该怎么复习怎么复习；迁移到 AI 时，用上一节的对照表决定停在哪。

### 书

写得比较像人话的，优先这几本：

- **Trefethen, Bau《Numerical Linear Algebra》(1997)**  
  经典。矩阵、条件数、SVD、迭代法。看不下去再换下一本，不是看不下去就放弃这一科。
- **李庆扬等《数值分析》**  
  国内教材有时写得干，但例子多，和课堂、和这份讲义更贴。
- **Higham《Accuracy and Stability of Numerical Algorithms》**  
  当工具书翻，不要当教材从头读。遇到一个具体的稳定改写，来这里查。

如果真要按 Trefethen 全家桶往下走：

- *Numerical Linear Algebra*（1997）
- *Approximation Theory and Approximation Practice*（2013）
- *Spectral Methods in MATLAB*（2000）

看完这三本，**一维问题**可以做正经研究。要往多维走，再补其他内容——那已经超出“帮你把训练里的 NaN 和 ε 看懂”这个目标。

### 明确不要陷进去的

- 手写 LU / 选主元的全部变体（考试除外）
- 数值微分、Romberg、各种求积规则的推导（知道误差阶即可）
- 线搜索、信赖域、KKT（那是最优化课）
- 把反向传播理解成“数值微分的高精度版”（它不是）

数值分析给你的是**语感**：什么时候该缩放、什么时候该加 ε、什么时候该怀疑条件数、什么时候该把累加精度留高一档。语感有了，再去读 CUDA kernel 或量化论文，会顺得多。`,
    transfers: [
      {
        scene: "读一篇量化 / 混合精度论文，公式很吓人",
        same: "先标出：它改的是范围、有效数字、误差传播，还是条件数？能归到这四类之一，公式只是实现细节。",
      },
      {
        scene: "想“系统补数学”",
        same: "先把第 1–3 章的重点节吃透，再决定要不要 Trefethen。不要从实分析或凸优化包抄，那是另一条山。",
      },
    ],
    quizzes: [
      {
        q: "这条路径的成功标准是什么？",
        a: "看到 NaN / 裁剪 / ε / FP16 / INT8，能说出它对应误差、稳定性、条件数、表示范围里的哪一条，并且能举出一个同构的别的例子。不是能把 Trefethen 习题做完。",
      },
    ],
  },
];

export function getAiLesson(id: string): AiLesson | undefined {
  return AI_LESSONS.find((l) => l.id === id);
}

export function aiNeighbors(id: string) {
  const i = AI_LESSONS.findIndex((l) => l.id === id);
  return {
    prev: i > 0 ? AI_LESSONS[i - 1] : null,
    next: i >= 0 && i < AI_LESSONS.length - 1 ? AI_LESSONS[i + 1] : null,
    index: i,
    total: AI_LESSONS.length,
  };
}

export function searchAi(query: string, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: {
    lessonId: string;
    title: string;
    snippet: string;
  }[] = [];
  for (const l of AI_LESSONS) {
    const text = `${l.title}\n${l.kicker}\n${l.thesis}\n${l.markdown}\n${l.afterLab ?? ""}`.toLowerCase();
    const idx = text.indexOf(q);
    if (idx === -1) continue;
    const start = Math.max(0, idx - 18);
    const raw = text.slice(start, start + 90).replace(/\s+/g, " ");
    hits.push({
      lessonId: l.id,
      title: `AI · ${l.title}`,
      snippet: (start > 0 ? "…" : "") + raw,
    });
    if (hits.length >= limit) break;
  }
  return hits;
}

export type MapRow = {
  chapterId: string;
  sectionId: string;
  exam: string;
  ai: string;
  take: string;
  depth: "必懂" | "值得知道" | "了解即可";
};

export const EXAM_AI_MAP: MapRow[] = [
  {
    chapterId: "ch1",
    sectionId: "1.3",
    exam: "1.3 误差与有效数字",
    ai: "量化位数、FP16 尾数、INT8 大约 2–3 位有效数字",
    take: "先问“还能信几位”，再谈压缩比。",
    depth: "必懂",
  },
  {
    chapterId: "ch1",
    sectionId: "1.4",
    exam: "1.4 计算原则：溢出、抵消、缩放、稳定方向",
    ai: "softmax max-shift、log-sum-exp、hypot、loss scaling",
    take: "代数等价的写法可以一个稳、一个炸。",
    depth: "必懂",
  },
  {
    chapterId: "ch2",
    sectionId: "2.4",
    exam: "2.4 向量 / 矩阵范数",
    ai: "clip_grad_norm_ 按全局 2 范数裁剪",
    take: "范数是“有多长”的尺子，裁剪是在这把尺子上设上限。",
    depth: "必懂",
  },
  {
    chapterId: "ch2",
    sectionId: "2.5.1",
    exam: "2.5.1 条件数、病态、残差 vs 误差",
    ai: "扁损失谷、Adam / BN / 残差连接、学习率为何一层合适一层爆炸",
    take: "病态是问题的性质，裁剪是算法的保险杠，两者不要混。",
    depth: "必懂",
  },
  {
    chapterId: "ch2",
    sectionId: "2.2.1",
    exam: "2.2 LU / 三角分解",
    ai: "几乎不会在训练循环里手写 LU；Hessian / Gram 矩阵的分解偶尔出现在二阶方法里",
    take: "留下“分解把难问题变成容易解的三角系统”。手算流程留给试卷。",
    depth: "了解即可",
  },
  {
    chapterId: "ch3",
    sectionId: "3.2",
    exam: "3.2 迭代收敛与谱半径",
    ai: "GD 学习率上限约 2/λ_max；动量是另一种迭代矩阵",
    take: "任意初值都收敛 ⇔ 谱半径 < 1。η 太大就是 ρ>1。",
    depth: "必懂",
  },
  {
    chapterId: "ch3",
    sectionId: "3.5",
    exam: "3.5 最速下降与共轭梯度",
    ai: "SGD 是带噪声的最速下降；共轭梯度的思想出现在部分二阶 / Krylov 方法里",
    take: "知道扁谷里最速下降会之字。不必推 CG 的全部证明。",
    depth: "值得知道",
  },
  {
    chapterId: "ch4",
    sectionId: "4.3",
    exam: "4.3 Newton 法",
    ai: "Gauss-Newton、自然梯度、部分二阶优化器",
    take: "知道 Newton 用了二阶信息、对初值敏感。线搜索和信赖域到此为止。",
    depth: "了解即可",
  },
  {
    chapterId: "ch6",
    sectionId: "6.1",
    exam: "第 6 章 插值与逼近",
    ai: "神经网络是函数逼近器；多项式插值不是 Transformer",
    take: "建立“用简单对象逼近复杂对象、并控制误差”的直觉即可。",
    depth: "值得知道",
  },
  {
    chapterId: "ch7",
    sectionId: "intro",
    exam: "第 7 章 数值积分与微分",
    ai: "有限差分可以核对 autograd；训练用的梯度不是这么来的",
    take: "这章主要为微分方程服务。不要把数值微分当成反向传播。",
    depth: "了解即可",
  },
  {
    chapterId: "ch8",
    sectionId: "intro",
    exam: "第 8 章 常微分方程数值解",
    ai: "ResNet ≈ Euler 离散；Neural ODE 把深度看成连续时间",
    take: "比喻有用。真要做连续深度再补，否则停。",
    depth: "了解即可",
  },
];

export const BOOKS = [
  {
    title: "Numerical Linear Algebra",
    authors: "Lloyd N. Trefethen, David Bau III",
    year: "1997",
    how: "主读",
    why: "矩阵计算讲得像人话。条件数、SVD、迭代法看完，就能把训练里的病态对上号。",
  },
  {
    title: "数值分析",
    authors: "李庆扬 等",
    year: "国内教材",
    how: "主读",
    why: "有时写得干，但例子多，和课堂、和这份讲义更贴。Trefethen 看不下去时先看它。",
  },
  {
    title: "Accuracy and Stability of Numerical Algorithms",
    authors: "Nicholas J. Higham",
    year: "工具书",
    how: "查阅",
    why: "不要从头读。遇到具体的稳定改写（从 log-sum-exp 到最小二乘）来这里翻。",
  },
  {
    title: "Approximation Theory and Approximation Practice",
    authors: "Lloyd N. Trefethen",
    year: "2013",
    how: "进阶",
    why: "插值与逼近。想理解“用多项式/有理函数逼近”时再看，不作为 AI 入门。",
  },
  {
    title: "Spectral Methods in MATLAB",
    authors: "Lloyd N. Trefethen",
    year: "2000",
    how: "进阶",
    why: "全家桶的第三本。看完可以做一维问题的正经研究；与训练工程无直接关系。",
  },
];
