---
pagetitle: "数值分析考试知识点完整讲义"
lang: zh-CN
---

# 数值分析考试知识点完整讲义

张铁、邵新慧主编教材配套复习 · 按你给出的考试标记整理

**范围规则：划叉不考；三角重点考；其余选择性考。** 本讲义将“重点考”和“选择性考”明确标注，公式均配使用条件。没有指定习题题目的部分，不凭题号推测题意。

**辅助理解规则：**重点内容若用到划叉章节中的背景，就在需要的位置括号标注“**（虽不考，但有助于理解……；来源：……）**”，再讲清必要概念、直观过程或简短例子。辅助段落不改变原考试范围，不要求把该划叉章节的整套算法、证明或题型一起复习。某个结论若同时属于重点章节，仍按重点掌握，不能因为它也在划叉章节出现就当作不考。

教材目录与科学出版社2022年第一版、ISBN **9787030718136** 相匹配。出版信息可核对[中国科学院金属研究所教材选用表](https://gs.imr.ac.cn/py/py_jxgl/py_jxgl_tzgg/202312/P020231214536516324926.pdf)；章节对应可核对[福州大学图书馆书目](https://opac.lib.fzu.edu.cn/bookInfo_01h0831365.html)。具体印次尚未由你确认，课后题仍以手中教材原文为准。

这里提供**按目录组织的原创知识讲义**：概念、定理条件、公式、算法、推导与证明套路、例题、易错点。它不是教材逐页摘录；老师课堂另加的结论、指定证明和习题细节仍需与课堂材料核对。

## 考试范围总表

| 章节 | 重点考：三角部分 | 选择性考：未划叉且未标三角 | 明确不考：划叉部分 |
|---|---|---|---|
| 第1章 | 1.3、1.4 | 无 | 1.1、1.2 |
| 第2章 | 2.2.1—2.2.3、2.4、2.5.1 | 无 | 2.1、2.2.4、2.3、2.5.2、2.6 |
| 第3章 | 3.1、3.2、3.3、3.4 | 3.5 | 无 |
| 第4章 | 4.2、4.3 | 无 | 4.1、4.4 |
| 第5章 | 无 | 无 | 全章 |
| 第6章 | 6.1、6.2、6.3、6.4、6.5、6.7 | 6.8.1 | 6.6、6.8.2 |
| 第7章 | 7.1、7.2、7.4 | 无 | 7.3、7.5 |
| 第8章 | 8.1、8.2.1、8.2.2、8.3.1、8.4 | 8.5、8.6、8.7 | 8.2.3、8.3.2 |
| 第9章 | 无 | 无 | 全章 |

边界说明：

- **2.2整体标三角，但2.2.4明确划叉，故追赶法排除。** 理解2.2.1时，可先理解2.1的消去过程；2.2的消去矩阵与三角分解仍按重点掌握。
- **2.6不考，不等于6.7不考。** 2.6超定方程可作背景，6.7的数据拟合及法方程仍是重点；6.8.2仅在辨别离散拟合与连续逼近时作概念对照。
- 第5章不考的是特征值数值计算方法；第3章判断收敛仍需要特征值和谱半径。
- Taylor展开作为误差分析、RK构造的推导工具仍要使用；排除的是8.2.3作为独立数值算法的Taylor展开方法。
- 第9章整章不考。差商构造来自7.5，两处都不列入考试；第8章单步法的相容、稳定、收敛仍按重点掌握。

## 如何使用这份讲义

先掌握重点章节中的公式与成立条件，再练指定习题；选择性考部分也须能识别模型、写出基本算法、判断精度或稳定性。文中“常考题型”指该知识通常可怎样出题，不表示已核实某一道指定习题的内容。

数学记号尽量统一：$\widetilde x$ 为近似值，$\alpha$ 为标量方程根，$e$ 为误差；$\rho(B)$ 为谱半径，$\Vert \cdot\Vert $ 为范数。线性迭代采用 $A=D-L-U$。积分误差原则上采用“真实积分减求积值”；ODE局部误差会明确是否除以步长。

## 第1章　误差、有效数字与数值计算原则

**范围：1.3、1.4。指定习题：3、4、8。**

### 1.3　绝对误差、相对误差与有效数字

**（虽不考，但有助于理解1.3如何度量误差、1.4为何要选择稳定算法；来源：1.2误差来源和分类。）**

“误差从哪里来”和“误差有多大”是两个问题。建模简化、输入测量带来模型或数据误差；用有限过程代替无限过程产生截断误差，例如以有限项近似级数；计算机只能保留有限位数字，产生舍入误差。例如 $e^h$ 用 $1+h$ 代替，即使加法完全准确也有截断误差；再把计算结果保留若干位，还可能引入舍入误差。1.3用绝对误差、相对误差和有效数字度量这些偏差，1.4则研究如何减少计算过程对误差的放大。分类本身作背景理解，后面的误差计算仍是重点。

#### 1．三种量，先分清

设真实值为 $x$，近似值为 $\widetilde x$。本讲义采用有符号误差 $e=\widetilde x-x$；教材或题目若取相反符号，绝对值结论不变。

| 名称 | 定义 | 含义 |
|---|---|---|
| 绝对误差大小 | $\vert e\vert =\vert \widetilde x-x\vert $ | 偏离真实值多少，带原量单位 |
| 绝对误差限 | $\vert e\vert \le\varepsilon$ | 已知可保证的上界，不必等于实际误差 |
| 相对误差大小 | $r=\vert e\vert /\vert x\vert $，$x\ne0$ | 与真实值规模相比的误差 |
| 相对误差估计 | $\widetilde r=\vert e\vert /\vert \widetilde x\vert $，$\widetilde x\ne0$ | 实际计算常用；不能无条件当作 $r$ |

若只知道 $\widetilde x$ 和误差限 $\varepsilon<\vert \widetilde x\vert $，由 $\vert x\vert \ge\vert \widetilde x\vert -\varepsilon$，得到严格保证：

$$
r\le\frac{\varepsilon}{\vert \widetilde x\vert -\varepsilon}.
$$

$x=0$ 时相对误差无定义，应使用绝对误差。真实值非常接近零时，相对误差也可能不适合衡量结果。

#### 2．有效数字：最后一位的半个单位

把非零近似数写成

$$
\widetilde x=\pm a\,10^m,\qquad 1\le a<10.
$$

按通常的“末位半单位”定义，它至少有 $n$ 位有效数字的判据为

$$
\vert \widetilde x-x\vert \le\frac12\,10^{m-n+1}.
$$

若教材写成 $\pm0.a_1a_2\cdots\times10^M$，则 $M=m+1$，判据改写为 $\frac12 10^{M-n}$；两式相同。**不能把两种科学记数法的指数混用。**

做题步骤：

1. 找首个非零数字所在数位，确定 $m$。
2. 求实际绝对误差，或使用题目给的误差限。
3. 解不等式 $\varepsilon\le\frac12 10^{m-n+1}$。
4. 取满足条件的最大整数 $n$。若用的是误差上界，结论是“至少保证 $n$ 位”，不能声称实际恰好只有 $n$ 位。

例如 $\widetilde x=12.340$，已知误差不超过 $0.0005$：此时 $m=1$，$n=5$ 对应 $\frac12 10^{-3}=0.0005$，故保证5位有效数字。$0.003140$ 中前导零不计入有效数字，末尾零表示保留到了该数位，但“写了4位”仍须误差条件才能证明“有4位有效数字”。

与近似值作分母的相对误差之间，有精确换算：

$$
\widetilde r\le\frac{1}{2a}10^{1-n}.
$$

只知道首位数字 $a_1$ 时，可用下列较粗界：至少 $n$ 位有效数字蕴含 $\widetilde r\le\frac{1}{2a_1}10^{1-n}$；而 $\widetilde r\le\frac{1}{2(a_1+1)}10^{1-n}$ 足以保证至少 $n$ 位。注意这里分母是 $\vert \widetilde x\vert $；若题目相对误差以 $\vert x\vert $ 为分母，先回到绝对误差定义核算，别直接套粗界。

**四舍五入与截断：**保留到某数位，正确四舍五入的误差不超过该位半个单位；直接截去后面数字，通常只能保证误差小于该位一个单位。显示小数位数与有效数字位数不同。

#### 3．函数运算中的误差传播

设 $y=f(x)$，近似输入为 $x+\Delta x$。一阶分析为

$$
\Delta y=f'(x)\Delta x+O((\Delta x)^2),\qquad
\vert \Delta y\vert \approx\vert f'(x)\vert \,\vert \Delta x\vert .
$$

严格误差限需要控制整个输入区间：若 $\vert f'(t)\vert \le M$，则由中值定理 $\vert \Delta y\vert \le M\vert \Delta x\vert $。多变量的一阶传播公式为

$$
\Delta y\approx\sum_{i=1}^s\frac{\partial f}{\partial x_i}\Delta x_i,
\qquad
\vert \Delta y\vert \lesssim\sum_{i=1}^s\left\vert \frac{\partial f}{\partial x_i}\right\vert \varepsilon_i.
$$

最后一式是线性化估计；若要严格上界，应把偏导数改为相应区域上的上界。

| 运算 | 一阶误差规律 |
|---|---|
| $z=x\pm y$ | $\vert \Delta z\vert \le\varepsilon_x+\varepsilon_y$，这里绝对误差限是严格的 |
| $z=xy$ | $\Delta z\approx y\Delta x+x\Delta y$；相对误差限约为两输入相对误差限之和 |
| $z=x/y$ | $\Delta z/z\approx\Delta x/x-\Delta y/y$，要求分母远离零 |
| $z=x^p$ | $\Delta z/z\approx p\Delta x/x$ |
| $z=f(x)$ | 相对放大因子 $\kappa_f(x)=\vert xf'(x)/f(x)\vert $，要求 $x,f(x)\ne0$ |

小例：半径 $r$ 的相对误差不超过约 $0.1\%$，球体积 $V=4\pi r^3/3$ 的一阶相对误差限约 $0.3\%$。若要求严格上界，可使用 $(1+0.001)^3-1$，不能把一阶结果称为精确误差。

### 1.4　数值计算中的若干原则

#### 1．避免相近数相减

相减时绝对误差不一定大幅增加，但真实差值很小，**相对误差会被放大，有效数字损失**。常用改写：

$$
\sqrt{x+1}-\sqrt x=\frac1{\sqrt{x+1}+\sqrt x},\quad x\ge0;
$$

$$
1-\cos x=2\sin^2(x/2).
$$

一元二次方程 $ax^2+bx+c=0$，当根公式的分子发生抵消时，可先算

$$
q=-\frac12\bigl(b+\operatorname{sign}(b)\sqrt{b^2-4ac}\bigr),
\qquad x_1=q/a,\quad x_2=c/q.
$$

这里要求实根、$a\ne0$，并在 $b=0$ 时指定符号选择；$q=0$ 的特殊情况应直接由原方程处理。核心是先稳定地计算一根，再用根的乘积求另一根。

#### 2．避免数量级悬殊的数据直接运算

大数与小数相加，小数可能被舍入吞掉。多个同号数相加可按绝对值从小到大累加，或分组相加；有强烈抵消时还应分析误差，不能认为换求和顺序必然解决问题。

防止中间结果溢出或下溢，例如计算 $\sqrt{x^2+y^2}$，可先设 $s=\max(\vert x\vert ,\vert y\vert )$，在 $s\ne0$ 时写成

$$
s\sqrt{(x/s)^2+(y/s)^2}.
$$

它避免先形成过大的平方；若最终结果本身超出表示范围，缩放也无法表示它。

#### 3．减少运算次数：秦九韶算法

对 $p_n(x)=a_nx^n+\cdots+a_1x+a_0$，写成

$$
p_n(x)=(\cdots((a_nx+a_{n-1})x+a_{n-2})x+\cdots)x+a_0.
$$

递推 $b_n=a_n$，$b_k=a_k+xb_{k+1}$，$k=n-1,\ldots,0$，结果 $p_n(x)=b_0$。需要 $n$ 次乘法、$n$ 次加法。能写嵌套式、列递推表、计算操作次数。

#### 4．选择稳定的计算方向

问题的病态性描述“输入微扰导致真实解变多少”；算法稳定性描述“计算过程中误差如何传播”。病态问题使用稳定算法仍可能得不到高相对精度。

原创例：令 $I_n=\int_0^1 x^n/(x+a)\,dx$，$a>1$。由 $x^n=x^{n-1}(x+a)-ax^{n-1}$ 得

$$
I_n=\frac1n-aI_{n-1}.
$$

若只跟踪初始误差，正向满足 $e_n=-ae_{n-1}$，误差被放大 $a$ 倍；反向

$$
I_{n-1}=\frac{1/n-I_n}{a}
$$

则初始误差每步缩小为 $1/a$。这说明代数等价的递推方向，数值表现可能完全不同。

#### 本章应能独立完成

- 从误差限判断有效数字，反求允许误差。
- 从输入精度估计输出精度，区分一阶估计与严格上界。
- 找出抵消、吞没、溢出、误差放大的来源，并写等价稳定公式。
- 用秦九韶算法求多项式值；根据误差递推判断计算方向。

## 第2章　线性方程组的直接解法

本章重点：2.2.1—2.2.3、2.4、2.5.1。2.1、2.2.4、2.3、2.5.2、2.6 不单列为考试内容；理解重点所需的必要背景用括号注明来源，不另扩充追赶法、选主元法或舍入误差分析的完整算法与题型。以下从解线性方程组 $Ax=b$ 出发，默认 $A\in\mathbb R^{n\times n}$。

### 2.2.1　Gauss 消去的矩阵表示

**（虽不考，但有助于理解“消去矩阵”如何产生上三角方程组；来源：2.1 Gauss 消去法。）**

消去的直观过程是：用保持解不变的初等行变换，逐列消掉下面方程中的未知数，得到上三角方程组，再从最后一个方程向前回代。例如

$$\begin{cases}2x_1+x_2=3,\\4x_1+3x_2=7\end{cases}
\quad\xrightarrow{\text{第2行减去第1行的2倍}}\quad
\begin{cases}2x_1+x_2=3,\\x_2=1.\end{cases}$$

先得 $x_2=1$，再回代得 $x_1=1$。这里“2倍”中的 $2$ 就是消去乘子；把它保存下来，就知道如何从消去后的第二行恢复原来的第二行：加回第一行的 $2$ 倍。因此

$$\begin{pmatrix}2&1\\4&3\end{pmatrix}
=\underbrace{\begin{pmatrix}1&0\\2&1\end{pmatrix}}_{L\text{ 保存乘子}}
\underbrace{\begin{pmatrix}2&1\\0&1\end{pmatrix}}_{U\text{ 保存消去结果}}.$$

这就是 $LU$ 分解与消去的联系；保存乘子还能把同一组消去操作用于新的右端 $b$。

**核心关系：消去过程得到 $U$，消去乘子组成 $L$，所以 $A=LU$。**

第 $k$ 步主元为 $a_{kk}^{(k)}\ne0$，消去乘子为

$$m_{ik}=\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}},\qquad i=k+1,\ldots,n.$$

令 $e_i$ 为第 $i$ 个标准单位向量，消去矩阵

$$M_k=I-\sum_{i=k+1}^n m_{ik}e_i e_k^T.$$

左乘 $M_k$ 等价于对每个 $i>k$ 执行“第 $i$ 行减去 $m_{ik}$ 倍第 $k$ 行”。因为相应秩一项两两乘积为零，

$$M_k^{-1}=I+\sum_{i=k+1}^n m_{ik}e_i e_k^T.$$

不交换行时，

$$M_{n-1}\cdots M_2M_1A=U,$$

$$A=LU,\qquad L=M_1^{-1}M_2^{-1}\cdots M_{n-1}^{-1}.$$

$L$ 是单位下三角矩阵，其严格下三角元素就是按消去顺序保存的乘子。右端同样变换：$y=M_{n-1}\cdots M_1b$，因此解题可拆为 $Ly=b$、$Ux=y$。

**成立条件。** 对非奇异矩阵 $A$，不交换行的、$L$ 对角线全为 $1$ 的 $LU$ 分解存在且唯一，当且仅当全部顺序主子式

$$\Delta_k=\det A_{1:k,1:k}\ne0,\qquad k=1,\ldots,n.$$

已知 $A$ 非奇异时，$\Delta_n\ne0$ 已满足，只需另查前 $n-1$ 个。主元满足 $u_{kk}=\Delta_k/\Delta_{k-1}$，约定 $\Delta_0=1$。非奇异不等于可以直接不换行消去，例如 $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ 非奇异但首主元为零。此处条件针对非奇异情形，不能原样推广为所有奇异矩阵的存在性判据。[LU 存在性与唯一性核查：CME 302 讲义](https://ericdarve.github.io/NLA/content/existence_lu.html)。

**（虽不考，但有助于理解“不换行”的限定以及主元条件；来源：2.1 Gauss 消去法的主元与换行背景。）**

主元为零时不能据它计算消去乘子；主元相对同列其他候选元素很小时，可能产生很大的乘子，使舍入误差更易放大。因此“主元非零”保证代数步骤可执行，并不自动保证浮点计算表现良好。交换方程顺序可更换主元；用置换矩阵 $P$ 记录行交换时，通常写成 $PA=LU$，求解相应改为 $Ly=Pb$、$Ux=y$。这解释了为何某些非奇异 $A$ 不满足不换行分解的条件，却能通过换行完成分解；此处只理解其作用，不另学习被排除的选主元算法。

**证明套路。** 必要性：取 $A=LU$ 的左上角 $k$ 阶块，行列式等于 $u_{11}\cdots u_{kk}$。充分性：用 $u_{kk}=\Delta_k/\Delta_{k-1}\ne0$ 保证消去逐步完成。唯一性：若 $LU=\widetilde L\widetilde U$，则 $\widetilde L^{-1}L=\widetilde U U^{-1}$ 同时为单位下三角和上三角，故等于 $I$。

### 2.2.2　直接三角分解法

**Doolittle 分解：$L$ 为单位下三角，$U$ 为一般上三角。** 按“先算 $U$ 的第 $k$ 行，再算 $L$ 的第 $k$ 列”递推：

$$u_{kj}=a_{kj}-\sum_{s=1}^{k-1}l_{ks}u_{sj},\qquad j=k,\ldots,n,$$

$$l_{ik}=\frac{a_{ik}-\sum_{s=1}^{k-1}l_{is}u_{sk}}{u_{kk}},\qquad i=k+1,\ldots,n,\qquad l_{kk}=1.$$

求解步骤：

1. 检查分解能否进行；算出 $L,U$。
2. 前代：$y_i=b_i-\sum_{j=1}^{i-1}l_{ij}y_j$，从 $i=1$ 到 $n$。
3. 回代：$x_i=(y_i-\sum_{j=i+1}^n u_{ij}x_j)/u_{ii}$，从 $i=n$ 到 $1$。
4. 验算 $LU=A$ 或代回 $Ax=b$。

**Crout 分解：$U$ 为单位上三角，$L$ 为一般下三角。** 此时应改为“先算 $L$ 第 $k$ 列，再算 $U$ 第 $k$ 行”：

$$l_{ik}=a_{ik}-\sum_{s=1}^{k-1}l_{is}u_{sk},\quad i=k,\ldots,n,$$

$$u_{kj}=\frac{a_{kj}-\sum_{s=1}^{k-1}l_{ks}u_{sj}}{l_{kk}},\quad j=k+1,\ldots,n,\qquad u_{kk}=1.$$

公式直接由 $a_{ij}=\sum_s l_{is}u_{sj}$ 按三角结构截断得到。不能把两种分解的单位对角线、除数或前后代公式混用。统一理解：一般三角系统求未知分量时，都要除以对应对角元；对角元为 $1$ 才能省去。

分解一次约需 $\frac23n^3$ 次浮点运算，随后每个右端的两次代入约需 $2n^2$ 次。多个右端共用 $A$ 时，复用分解即可；解方程通常无需先显式求 $A^{-1}$。

**原创例1：分解与前后代。**

$$A=\begin{pmatrix}2&1&1\\4&3&3\\8&7&9\end{pmatrix},\qquad b=\begin{pmatrix}4\\10\\24\end{pmatrix}.$$

依次得到 $l_{21}=2,l_{31}=4,l_{32}=3$，于是

$$L=\begin{pmatrix}1&0&0\\2&1&0\\4&3&1\end{pmatrix},\qquad U=\begin{pmatrix}2&1&1\\0&1&1\\0&0&2\end{pmatrix}.$$

前代得 $y=(4,2,2)^T$；回代得 $x=(1,1,1)^T$。顺序主子式为 $2,2,4$，与主元 $2,1,2$ 的累乘一致。

### 2.2.3　平方根法与改进平方根法

**对称正定定义：** $A=A^T$ 且任意非零 $z$ 满足 $z^TAz>0$。实对称矩阵正定的等价条件包括：全部特征值为正；全部顺序主子式为正。只有对称矩阵才能直接使用这些等价判据。

**平方根法（Cholesky）：** 对实对称正定矩阵，存在唯一对角元为正的下三角矩阵 $C$，使

$$A=CC^T.$$

递推公式为

$$c_{jj}=\sqrt{a_{jj}-\sum_{k=1}^{j-1}c_{jk}^2},$$

$$c_{ij}=\frac{a_{ij}-\sum_{k=1}^{j-1}c_{ik}c_{jk}}{c_{jj}},\qquad i=j+1,\ldots,n.$$

求解 $Cy=b$ 后，再解 $C^Tx=y$。正定性保证根号内严格为正。若教材用上三角形式 $A=R^TR$，取 $R=C^T$ 即可。分解计算量约为 $\frac13n^3$，约为一般 $LU$ 的一半。

**改进平方根法：** 写成

$$A=L\Lambda L^T,\qquad l_{ii}=1,\qquad\Lambda=\operatorname{diag}(d_1,\ldots,d_n),$$

其中

$$d_j=a_{jj}-\sum_{k=1}^{j-1}l_{jk}^2d_k,$$

$$l_{ij}=\frac{a_{ij}-\sum_{k=1}^{j-1}l_{ik}l_{jk}d_k}{d_j},\qquad i>j.$$

不需要开方。求解顺序为 $Ly=b$、$\Lambda z=y$、$L^Tx=z$。正定时全部 $d_j>0$，且 $C=L\Lambda^{1/2}$。对称但不正定的矩阵，在全部顺序主子式非零时仍可作这种标量对角形式的分解，但 $d_j$ 可能为负；仅有“对称且非奇异”不能保证不用换位的这一递推可行。

**原创例2：两种平方根分解。**

$$A=\begin{pmatrix}4&2\\2&5\end{pmatrix}
=\begin{pmatrix}2&0\\1&2\end{pmatrix}\begin{pmatrix}2&1\\0&2\end{pmatrix}
=\begin{pmatrix}1&0\\\frac12&1\end{pmatrix}\begin{pmatrix}4&0\\0&4\end{pmatrix}\begin{pmatrix}1&\frac12\\0&1\end{pmatrix}.$$

两顺序主子式 $4,16$ 均正。若 $b=(6,7)^T$，平方根法先得 $y=(3,2)^T$，再得 $x=(1,1)^T$。

**本节易错：** 对称不等于正定；$A=LL^T$ 中 $L$ 通常不是单位下三角；$LDL^T$ 中的单位下三角因子与 Cholesky 因子不同；转置后的回代方向不能写反。

### 2.4　向量范数、矩阵范数与谱半径

**向量范数的三条性质：** 非负且仅零向量范数为零；$\Vert \alpha x\Vert =\vert \alpha\vert \Vert x\Vert $；$\Vert x+y\Vert \le\Vert x\Vert +\Vert y\Vert $。常用范数为

$$\Vert x\Vert _1=\sum_i\vert x_i\vert ,\qquad\Vert x\Vert _2=\sqrt{\sum_i\vert x_i\vert ^2},\qquad\Vert x\Vert _\infty=\max_i\vert x_i\vert .$$

有限维空间中范数等价，常用定量关系：

$$\Vert x\Vert _\infty\le\Vert x\Vert _2\le\Vert x\Vert _1,$$

$$\Vert x\Vert _1\le\sqrt n\Vert x\Vert _2,\qquad\Vert x\Vert _2\le\sqrt n\Vert x\Vert _\infty,\qquad\Vert x\Vert _1\le n\Vert x\Vert _\infty.$$

**诱导矩阵范数：** 给定向量范数，定义

$$\Vert A\Vert =\max_{x\ne0}\frac{\Vert Ax\Vert }{\Vert x\Vert }=\max_{\Vert x\Vert =1}\Vert Ax\Vert .$$

它满足 $\Vert Ax\Vert \le\Vert A\Vert \Vert x\Vert $、$\Vert AB\Vert \le\Vert A\Vert \Vert B\Vert $ 和 $\Vert I\Vert =1$。常用公式：

| 范数 | 计算公式 | 手算记忆 |
|---|---|---|
| $\Vert A\Vert _1$ | $\max_j\sum_i\vert a_{ij}\vert $ | 最大绝对列和 |
| $\Vert A\Vert _\infty$ | $\max_i\sum_j\vert a_{ij}\vert $ | 最大绝对行和 |
| $\Vert A\Vert _2$ | $\sqrt{\lambda_{\max}(A^TA)}$ | 最大奇异值 |
| $\Vert A\Vert _F$ | $\sqrt{\sum_{i,j}\vert a_{ij}\vert ^2}$ | 全部元素平方和开根号 |

Frobenius 范数是常用矩阵范数，也满足次乘性及 $\Vert Ax\Vert _2\le\Vert A\Vert _F\Vert x\Vert _2$，但 $n>1$ 时不是由向量范数诱导的范数，因为 $\Vert I\Vert _F=\sqrt n\ne1$。另有 $\Vert A\Vert _2\le\Vert A\Vert _F$、$\Vert A\Vert _2\le\sqrt{\Vert A\Vert _1\Vert A\Vert _\infty}$。

**特征值与谱半径：** 若存在非零向量 $v$ 使 $Av=\lambda v$，则 $\lambda$ 是 $A$ 的特征值，$v$ 是对应特征向量；特征值可以为复数。谱半径定义为 $\rho(A)=\max_i\vert \lambda_i(A)\vert $。这些定义属于本章应掌握的知识；被排除的是第5章数值求特征值的算法。

任一诱导矩阵范数满足 $\rho(A)\le\Vert A\Vert $。实对称矩阵满足 $\Vert A\Vert _2=\rho(A)$；一般矩阵不能这样写。三角矩阵的谱半径为对角元素绝对值的最大值，但其范数通常还受非对角元素影响。谱半径本身不是矩阵范数：非零幂零矩阵可以有 $\rho(A)=0$。

**证明题套路。** 证明 $1$ 范数公式：先由三角不等式得 $\Vert Ax\Vert _1\le(\max_j\sum_i\vert a_{ij}\vert )\Vert x\Vert _1$，再取达到最大列和的单位向量使等号成立。证明无穷范数公式：先给上界，再按达到最大行和那一行各元素的符号选 $x_j$。证明 $2$ 范数公式：将 $\Vert Ax\Vert _2^2/\Vert x\Vert _2^2$ 写成 $A^TA$ 的 Rayleigh 商。

**原创例3：四种矩阵范数。** 对 $A=\begin{pmatrix}1&-2\\3&4\end{pmatrix}$，

$$\Vert A\Vert _1=6,\quad\Vert A\Vert _\infty=7,\quad\Vert A\Vert _F=\sqrt{30},\quad\Vert A\Vert _2=\sqrt{15+5\sqrt5}.$$

最后一式来自 $A^TA=\begin{pmatrix}10&10\\10&20\end{pmatrix}$。矩阵 $2$ 范数不能直接把原矩阵元素平方相加。

### 2.5.1　固有性态、条件数与扰动

**固有性态关注“问题对数据扰动有多敏感”。** 数据小改动引起解大改动，称病态；这是方程组自身的性质。条件良好也不能保证任意算法都可靠。

非奇异 $A$ 在指定诱导范数下的条件数为

$$\kappa(A)=\Vert A\Vert \Vert A^{-1}\Vert \ge1.$$

奇异矩阵通常记条件数为无穷大。性质：$\kappa(\alpha A)=\kappa(A)$（$\alpha\ne0$）；$\kappa(A^{-1})=\kappa(A)$；$\kappa(AB)\le\kappa(A)\kappa(B)$。$2$ 范数下

$$\kappa_2(A)=\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}.$$

若 $A$ 实对称正定，则 $\kappa_2(A)=\lambda_{\max}(A)/\lambda_{\min}(A)$；正交矩阵的 $\kappa_2$ 为 $1$。一般矩阵不能用最大、最小特征值绝对值的比代替奇异值比。

**仅右端扰动。** 若 $Ax=b$、$A(x+\delta x)=b+\delta b$，且 $b\ne0$，则

$$\delta x=A^{-1}\delta b,\qquad\frac{\Vert \delta x\Vert }{\Vert x\Vert }\le\kappa(A)\frac{\Vert \delta b\Vert }{\Vert b\Vert }.$$

推导只需 $\Vert \delta x\Vert \le\Vert A^{-1}\Vert \Vert \delta b\Vert $ 与 $\Vert b\Vert \le\Vert A\Vert \Vert x\Vert $。条件数给的是最坏情形上界；一次具体扰动不一定达到这个放大倍数。

**系数与右端同时扰动。** 若

$$(A+\delta A)(x+\delta x)=b+\delta b,$$

令 $\eta_A=\Vert \delta A\Vert /\Vert A\Vert $、$\eta_b=\Vert \delta b\Vert /\Vert b\Vert $。当 $\kappa(A)\eta_A<1$ 时，$A+\delta A$ 仍非奇异，且

$$\frac{\Vert \delta x\Vert }{\Vert x\Vert }\le\frac{\kappa(A)}{1-\kappa(A)\eta_A}(\eta_A+\eta_b).$$

只扰动 $A$ 时令 $\eta_b=0$。证明从 $\delta x=A^{-1}\delta b-A^{-1}\delta A(x+\delta x)$ 出发，取范数，把含 $\Vert \delta x\Vert $ 的项移到左边。分母为正的条件不能省略；小扰动时才可近似为 $\kappa(A)(\eta_A+\eta_b)$。

**残差与真实误差。** 近似解 $\widehat x$ 的残差 $r=b-A\widehat x$，满足 $x-\widehat x=A^{-1}r$。当 $b\ne0$ 时，

$$\frac1{\kappa(A)}\frac{\Vert r\Vert }{\Vert b\Vert }\le\frac{\Vert x-\widehat x\Vert }{\Vert x\Vert }\le\kappa(A)\frac{\Vert r\Vert }{\Vert b\Vert }.$$

因此残差小不自动意味着解误差小，还需考虑条件数。相对误差公式要求分母非零，齐次系统应改看绝对误差。

**原创例4：千倍放大。** 取 $A=\operatorname{diag}(1,10^{-3})$、$b=(1,10^{-3})^T$，则 $x=(1,1)^T$，$\kappa_\infty(A)=10^3$。令 $\delta b=(0,10^{-3})^T$，有 $\delta x=(0,1)^T$。右端相对误差为 $10^{-3}$，解相对误差为 $1$，恰好放大千倍。

**判断题陷阱。** 行列式小不等于病态，例如 $10^{-10}I$ 的行列式很小而条件数为 $1$；行列式不小也不排除病态。比较条件数必须说明范数，不能用 $\Vert A\Vert _1\Vert A^{-1}\Vert _\infty$ 冒充某个指定范数的条件数。

**指定习题清单：第2章 3、5、11、12、14、16、17、20。** 未取得题目原文，不按题号猜内容；复习时逐题核对属于分解、范数还是条件数问题。

## 第3章　线性方程组的迭代解法

3.1—3.4 均为重点；3.5 未划叉、未标三角，按选择性考复习。全章统一采用

$$A=D-L-U,$$

其中 $D=\operatorname{diag}(a_{11},\ldots,a_{nn})$，$L,U$ 分别为 $A$ 严格下三角、严格上三角部分的相反数。以下 Jacobi、Gauss–Seidel、SOR 均要求 $a_{ii}\ne0$。

### 3.1　Jacobi 与 Gauss–Seidel 迭代

**Jacobi（J）法：一轮内全部使用上一轮分量。**

$$x_i^{(k+1)}=\frac1{a_{ii}}\left(b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}\right),$$

$$x^{(k+1)}=B_Jx^{(k)}+f_J,\qquad B_J=D^{-1}(L+U)=I-D^{-1}A,\qquad f_J=D^{-1}b.$$

**Gauss–Seidel（GS）法：已算出的新分量立即使用。**

$$x_i^{(k+1)}=\frac1{a_{ii}}\left(b_i-\sum_{j<i}a_{ij}x_j^{(k+1)}-\sum_{j>i}a_{ij}x_j^{(k)}\right),$$

$$x^{(k+1)}=B_{GS}x^{(k)}+f_{GS},\qquad B_{GS}=(D-L)^{-1}U,\qquad f_{GS}=(D-L)^{-1}b.$$

计算时不用显式求逆，直接按分量公式更新。J 法应保留旧向量；GS 法可原位置更新。重排方程或未知量会改变具体迭代过程，尤其不能默认 GS 的收敛速度与排列无关。

**手算步骤：** 写清迭代公式及初值；每轮逐个分量更新；完整保留一轮结果；按题目要求算步数或检查停止条件。中间尽量保留分数或较多位数字，最后统一舍入。

**原创例5：两轮计算与收敛速度。**

$$A=\begin{pmatrix}4&1\\2&3\end{pmatrix},\quad b=\begin{pmatrix}1\\2\end{pmatrix},\quad x^{(0)}=0,\quad x^*=\begin{pmatrix}1/10\\3/5\end{pmatrix}.$$

J 法为 $x_1^{(k+1)}=(1-x_2^{(k)})/4$、$x_2^{(k+1)}=(2-2x_1^{(k)})/3$，因此

$$x_J^{(1)}=(1/4,2/3)^T,\qquad x_J^{(2)}=(1/12,1/2)^T.$$

GS 法只需将第二式中的 $x_1^{(k)}$ 换为 $x_1^{(k+1)}$，因此

$$x_{GS}^{(1)}=(1/4,1/2)^T,\qquad x_{GS}^{(2)}=(1/8,7/12)^T.$$

对应

$$B_J=\begin{pmatrix}0&-1/4\\-2/3&0\end{pmatrix},\qquad B_{GS}=\begin{pmatrix}0&-1/4\\0&1/6\end{pmatrix}.$$

$\rho(B_J)=1/\sqrt6$，$\rho(B_{GS})=1/6$，本例 GS 渐近更快。不能把本例关系推广成“所有矩阵均有 $\rho(B_{GS})=\rho(B_J)^2$”。

### 3.2　一般线性迭代、收敛性与误差估计

矩阵分裂 $A=M-N$，$M$ 非奇异，可构造

$$Mx^{(k+1)}=Nx^{(k)}+b,\qquad x^{(k+1)}=Bx^{(k)}+f,$$

$$B=M^{-1}N,\qquad f=M^{-1}b.$$

若 $x^*$ 为准确解，定义 $e^{(k)}=x^{(k)}-x^*$，则

$$e^{(k+1)}=Be^{(k)},\qquad e^{(k)}=B^ke^{(0)}.$$

**最重要的必要充分条件：** 对任意初始向量都收敛到唯一不动点，当且仅当

$$B^k\longrightarrow0\quad\Longleftrightarrow\quad\rho(B)<1.$$

这时 $I-B$ 非奇异，$x^*=(I-B)^{-1}f$，且 $(I-B)^{-1}=\sum_{j=0}^{\infty}B^j$。判断“迭代法收敛”通常指任意初值；某个特殊初值恰好收敛不能推出方法收敛。

**证明套路。** 误差恒等式把问题化为 $B^k\to0$。必要性：沿特征向量的误差含 $\lambda^k$，故所有 $\vert \lambda\vert <1$。充分性：用 Jordan 分解，Jordan 块幂中的各项是多项式乘 $\lambda^k$，当 $\vert \lambda\vert <1$ 时仍趋零。不能仅在可对角化假设下证明后，就声称已涵盖全部矩阵。

**易算的充分条件：** 若某个诱导范数满足 $\Vert B\Vert =q<1$，则迭代收敛。但某个范数 $\Vert B\Vert \ge1$ 不能推出发散，例如

$$B=\begin{pmatrix}0&2\\0&0\end{pmatrix},\qquad\Vert B\Vert _\infty=2,\quad\rho(B)=0,\quad B^2=0.$$

相应误差两步即归零。判据层级要分清：谱半径判据必要充分，某个给定范数小于 $1$ 只是充分条件。

当 $0<q=\Vert B\Vert <1$，有三种常用误差界：

$$\Vert e^{(k)}\Vert \le q^k\Vert e^{(0)}\Vert ,$$

$$\Vert x^{(k)}-x^*\Vert \le\frac{q^k}{1-q}\Vert x^{(1)}-x^{(0)}\Vert \quad\text{（先验）},$$

$$\Vert x^{(k)}-x^*\Vert \le\frac{q}{1-q}\Vert x^{(k)}-x^{(k-1)}\Vert ,\quad k\ge1\quad\text{（后验）}.$$

先验界用于估计需要几步；后验界用于检验当前结果。推导：令 $d^{(k)}=x^{(k)}-x^{(k-1)}$，有 $d^{(k+1)}=Bd^{(k)}$；将 $x^*-x^{(k)}=\sum_{j=k+1}^{\infty}d^{(j)}$ 取范数并求几何级数。

要保证误差不超过 $\varepsilon$，可令 $\Vert x^{(k)}-x^{(k-1)}\Vert \le(1-q)\varepsilon/q$。仅写相邻两次差小于 $\varepsilon$ 不自动提供同样大小的真实误差保证。残差停止准则可结合第2章条件数分析使用。

**收敛速度。** 当 $0<\rho(B)<1$，常用渐近收敛速度 $R(B)=-\ln\rho(B)$：谱半径越小，最坏情形的渐近指数衰减越快。非正规矩阵可能先暂时放大误差；不能据此断言每一步误差都按 $\rho(B)$ 缩小。$\rho(B)=0$ 时矩阵幂最终为零，属于有限步终止情形。

### 3.3　Jacobi 与 Gauss–Seidel 的收敛判据

**严格行对角占优：** 若每行都满足

$$\vert a_{ii}\vert >\sum_{j\ne i}\vert a_{ij}\vert ,$$

则 J、GS 均收敛。J 法直接有 $\Vert B_J\Vert _\infty=\max_i\sum_{j\ne i}\vert a_{ij}\vert /\vert a_{ii}\vert <1$。GS 的证明必须考虑新旧分量混合，不能照抄 J 的迭代矩阵。

**常用补充判据。** 若矩阵不可约、每行弱对角占优且至少一行严格占优，J、GS 也收敛。不可约可通过有向图理解：边 $i\to j$ 对应 $a_{ij}\ne0$，图需强连通。仅有弱对角占优不够。

GS 还可用 Sassenfeld 判据：递推

$$\beta_i=\frac{\sum_{j<i}\vert a_{ij}\vert \beta_j+\sum_{j>i}\vert a_{ij}\vert }{\vert a_{ii}\vert }.$$

若 $\max_i\beta_i<1$，则 GS 收敛。证明按 $i$ 归纳得到 $\vert e_i^{(k+1)}\vert \le\beta_i\Vert e^{(k)}\Vert _\infty$。这是充分条件，未满足时仍应继续检查谱半径；不能直接判发散。

**实对称正定：GS 必收敛，J 不一定。** 对正定 $A$，令 $H=D^{-1/2}AD^{-1/2}$。$B_J$ 与 $I-H$ 相似，因此

$$\rho(B_J)<1\quad\Longleftrightarrow\quad\lambda_{\max}(H)<2\quad\Longleftrightarrow\quad2D-A\text{ 正定}.$$

这里已使用 $A$ 正定，从而 $H$ 全部特征值为正。正定条件下 J 与 GS 的区别可参照 [Cornell 矩阵计算讲义](https://www.cs.cornell.edu/courses/cs6210/2025fa/lec/2025-11-10.html)。

**原创反例：**

$$A=\begin{pmatrix}1&0.9&0.9\\0.9&1&0.9\\0.9&0.9&1\end{pmatrix}.$$

$A$ 特征值为 $2.8,0.1,0.1$，所以正定；但 $B_J=I-A$ 特征值为 $-1.8,0.9,0.9$，$\rho(B_J)=1.8>1$，故 J 法不对所有初值收敛，GS 法则收敛。

**判收敛的答题顺序：** 先写准确迭代矩阵；检查严格对角占优或正定等现成条件；低阶矩阵直接算特征值；充分条件不满足时，不能提前停止判断。比较速度要比较迭代矩阵的谱半径，不能比较 $A$ 的谱半径。

### 3.4　逐次超松弛法 SOR

SOR 在每个分量的 GS 更新中加入松弛参数：

$$x_i^{(k+1)}=(1-\omega)x_i^{(k)}+\frac{\omega}{a_{ii}}\left(b_i-\sum_{j<i}a_{ij}x_j^{(k+1)}-\sum_{j>i}a_{ij}x_j^{(k)}\right).$$

矩阵形式为

$$(D-\omega L)x^{(k+1)}=[(1-\omega)D+\omega U]x^{(k)}+\omega b,$$

$$B_\omega=(D-\omega L)^{-1}[(1-\omega)D+\omega U],\qquad f_\omega=\omega(D-\omega L)^{-1}b.$$

$\omega=1$ 为 GS；$0<\omega<1$ 为欠松弛；$1<\omega<2$ 为通常讨论的超松弛。注意新分量 $x_j^{(k+1)}$ 已经包含松弛，不能先独立算完整一轮普通 GS，再统一将两个整向量加权；那通常得到另一个迭代法。

**必要条件：** 若实参数 SOR 对所有初值收敛，则 $0<\omega<2$。因为分子、分母均为三角矩阵，

$$\det B_\omega=(1-\omega)^n,$$

收敛要求全部特征值模小于 $1$，从而 $\vert 1-\omega\vert ^n<1$。一般矩阵只有这个区间还不够，例如 $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$，$\omega=1$ 时 GS 谱半径为 $4$。

**正定情形的充要条件：** 若 $A$ 实对称正定，则 SOR 收敛当且仅当 $0<\omega<2$。特别地，取 $\omega=1$ 得 GS 收敛。[SOR 参数与正定条件核查：Netlib Templates](https://www.netlib.org/linalg/html_templates/node16.html)。

**正定情形证明套路。** 写 $B_\omega=I-M^{-1}A$，其中 $M=D/\omega-L$。对称性给出

$$M+M^T-A=(2/\omega-1)D.$$

当 $0<\omega<2$ 时右侧正定。设 $B_\omega z=\lambda z$，则 $Az=(1-\lambda)Mz$；$\lambda=1$ 将与 $A$ 非奇异矛盾。对非零复特征向量取共轭内积，可得

$$z^*(M+M^T-A)z=\frac{1-\vert \lambda\vert ^2}{\vert 1-\lambda\vert ^2}z^*Az.$$

等式两侧的正定二次型为正，故 $\vert \lambda\vert <1$。这同时证明 GS 的正定收敛结论。

**最优参数不能无条件套用。** 在标准一致排序条件成立、J 迭代矩阵特征值均为实数且 $\rho(B_J)<1$ 的相应 Young 定理适用情形下，常见公式为

$$\omega_{\mathrm{opt}}=\frac{2}{1+\sqrt{1-\rho(B_J)^2}},\qquad\rho(B_{\omega_{\mathrm{opt}}})=\omega_{\mathrm{opt}}-1.$$

这里一致排序可用如下谱条件表述：$\alpha D^{-1}L+\alpha^{-1}D^{-1}U$ 的特征值与非零实参数 $\alpha$ 无关。这是矩阵结构条件，不能只凭“正定”或“J 收敛”代替；题目未给适用条件时，应计算 $\rho(B_\omega)$ 或使用已证明的具体矩阵结论。[条件及应用示例：香港中文大学 MATH3310](https://www.math.cuhk.edu.hk/course_builder/1718/math3310/hw4sol.html)。

**原创例6：超松弛也可能比 GS 慢。** 沿用例5，取 $\omega=6/5$，可算得

$$B_{6/5}=\begin{pmatrix}-1/5&-3/10\\4/25&1/25\end{pmatrix},\qquad f_{6/5}=\begin{pmatrix}3/10\\14/25\end{pmatrix}.$$

从零初值一轮得 $(3/10,14/25)^T$。$B_{6/5}$ 的迹为 $-4/25$、行列式为 $1/25$，两个特征值共轭且模均为 $1/5$，所以收敛；但 $1/5>1/6=\rho(B_{GS})$，渐近速度比本例 GS 慢。不能把“超松弛”理解为任取 $\omega>1$ 都加速。

**指定习题清单：第3章 1、8、9、12、16。** 应逐题核对原题，完成迭代公式、具体迭代、收敛性、误差界或参数范围所要求的步骤；本讲义原创例题不代表这些题号的原题。

### 3.5　最速下降法与共轭梯度法【选择性考，未标三角】

**共同前提：$A$ 实对称正定。** 求解 $Ax=b$ 等价于最小化严格凸二次函数

$$\phi(x)=\tfrac12x^TAx-b^Tx.$$

因为 $\nabla\phi(x)=Ax-b$，且对准确解 $x^*=A^{-1}b$ 有

$$\phi(x)-\phi(x^*)=\tfrac12(x-x^*)^TA(x-x^*)=\tfrac12\Vert x-x^*\Vert _A^2,$$

其中能量范数 $\Vert v\Vert _A=\sqrt{v^TAv}$。因此最小化二次函数也就是最小化解误差的能量范数。残差 $r=b-Ax$ 是负梯度。

**沿方向精确搜索。** 设方向 $p\ne0$，令 $x_{\mathrm{new}}=x+\alpha p$。对 $\phi(x+\alpha p)$ 关于 $\alpha$ 求导得

$$\alpha=\frac{p^Tr}{p^TAp}.$$

正定性保证分母为正。新残差满足 $p^Tr_{\mathrm{new}}=0$，即已搜索方向与新梯度正交。

**最速下降（SD）：每次沿负梯度走。** 给定 $x_0$，每轮先算 $r_k=b-Ax_k$；若 $r_k=0$ 则停止，否则

$$\alpha_k=\frac{r_k^Tr_k}{r_k^TAr_k},\qquad x_{k+1}=x_k+\alpha_kr_k,\qquad r_{k+1}=r_k-\alpha_kAr_k.$$

精确算术下 $r_{k+1}^Tr_k=0$，但不能据此声称所有不同轮次残差均正交，也不能说各搜索方向两两 $A$ 共轭。条件数较大时，二次函数等值线狭长，最速下降可能反复折返，收敛较慢。

**正交与共轭的区别。** 普通正交为 $p_i^Tp_j=0$；$A$ 共轭为 $p_i^TAp_j=0$，也就是在内积 $\langle u,v\rangle_A=u^TAv$ 下正交。对正定 $A$，非零且两两 $A$ 共轭的向量线性无关，因此最多有 $n$ 个。

**共轭梯度（CG）：构造互相 $A$ 共轭的搜索方向。** 先算 $r_0=b-Ax_0$，若已为零就结束，否则取 $p_0=r_0$。每轮按顺序计算

$$\alpha_k=\frac{r_k^Tr_k}{p_k^TAp_k},\quad x_{k+1}=x_k+\alpha_kp_k,\quad r_{k+1}=r_k-\alpha_kAp_k.$$

若 $r_{k+1}=0$ 则停止；否则继续

$$\beta_k=\frac{r_{k+1}^Tr_{k+1}}{r_k^Tr_k},\qquad p_{k+1}=r_{k+1}+\beta_kp_k.$$

不能把新旧残差在 $\beta_k$ 中写反。对精确算术下尚未终止的迭代，$r_i^Tr_j=0$、$p_i^TAp_j=0$（$i\ne j$）；CG 至多 $n$ 步得到准确解。更细地，若 $A$ 只有 $m$ 个不同特征值，则至多 $m$ 步终止。浮点计算会损失正交性，不保证恰在这些步数内得到精确解。

CG 还有最优化解释：令

$$\mathcal K_k(A,r_0)=\operatorname{span}\{r_0,Ar_0,\ldots,A^{k-1}r_0\},$$

则 $x_k$ 在 $x_0+\mathcal K_k(A,r_0)$ 上使 $\phi$ 最小，即使误差的能量范数最小。$\Vert x_k-x^*\Vert _A$ 因此不增；不能直接断言普通 $2$ 范数残差每步都下降。

**条件数与收敛界。** 设 $\kappa=\kappa_2(A)=\lambda_{\max}/\lambda_{\min}$，$e_k=x_k-x^*$。精确算术下，最速下降满足

$$\Vert e_k\Vert _A\le\left(\frac{\kappa-1}{\kappa+1}\right)^k\Vert e_0\Vert _A,$$

CG 满足

$$\Vert e_k\Vert _A\le2\left(\frac{\sqrt\kappa-1}{\sqrt\kappa+1}\right)^k\Vert e_0\Vert _A.$$

上述按 $k\ge1$ 理解；$\kappa=1$ 时两法均可一步达到准确解。CG 式是相对于初始误差的整体上界，不能将根式中的比值误称为每一步必然发生的收缩倍数；实际速度还受特征值分布影响。[两种误差界核查：Dartmouth 数值计算讲义](https://math.dartmouth.edu/~m56w25/labs/lab3.html)。

**证明套路。** 最速下降先展开

$$\Vert e_{k+1}\Vert _A^2=\Vert e_k\Vert _A^2-\frac{(r_k^Tr_k)^2}{r_k^TAr_k},\qquad\Vert e_k\Vert _A^2=r_k^TA^{-1}r_k,$$

再用正定矩阵的 Kantorovich 不等式控制两项比例。CG 则把误差写为 $p_k(A)e_0$，其中 $p_k$ 为次数不超过 $k$、满足 $p_k(0)=1$ 的多项式；利用能量范数最优性，再用 Chebyshev 多项式在特征值区间上给出上界。考试若只要求计算迭代，无需完整重证多项式误差界。

**原创例7：两步 CG 与共轭检查。** 取 $A=\operatorname{diag}(1,2)$、$b=(1,2)^T$、$x_0=0$。有

$$r_0=p_0=(1,2)^T,\quad\alpha_0=5/9,\quad x_1=(5/9,10/9)^T,\quad r_1=(4/9,-2/9)^T.$$

随后 $\beta_0=4/81$，$p_1=(40/81,-10/81)^T$，$\alpha_1=9/10$，从而 $x_2=(1,1)^T$、$r_2=0$。可直接验算 $r_0^Tr_1=0$、$p_0^TAp_1=0$；一个是普通正交，另一个是 $A$ 共轭。

**本节易错：** 不省略正定前提；不把最速下降相邻残差正交说成全部两两正交；不把 $A$ 共轭写成普通正交；不将精确算术有限步结论无条件用于浮点数；不要混淆能量范数误差与普通残差。

## 第4章　非线性方程求根

**范围：4.2、4.3。指定习题：4、5、6、7、8、13、17。4.1二分法仅作确定根区间的辅助背景；4.4非线性方程组不单列讲解。**

### 4.2　简单迭代法

#### 1．迭代格式与不动点

把 $f(x)=0$ 等价改写成 $x=\varphi(x)$，构造

$$
x_{k+1}=\varphi(x_k),\qquad k=0,1,\ldots.
$$

必须先检查改写是否改变定义域、丢根或引入伪根。如果 $x_k\to\alpha$ 且 $\varphi$ 在 $\alpha$ 连续，则 $\alpha=\varphi(\alpha)$；这是“若收敛，极限满足方程”，不是收敛证明。

#### 2．区间收敛：自映射与压缩缺一不可

**（虽不考，但有助于理解4.2为什么先选区间、4.3如何选根附近的初值；来源：4.1二分法。）**

先回顾连续函数的变号原理：$f(a)f(b)<0$ 保证 $[a,b]$ 内至少有一个根，不能单凭变号保证唯一。二分法的直观过程是取中点，再保留两端函数值异号的半区间。例如 $f(x)=x^2-3$ 在 $[1,2]$ 变号，中点 $1.5$ 处仍为负，因此根在 $[1.5,2]$；在这个正区间内，$f'>0$ 又保证根唯一。这个例子帮助理解“先定位，再迭代”；真正证明简单迭代收敛，还要检查下面的自映射与压缩，证明Newton收敛也仍需它自己的条件。二分次数和完整二分算法不作为新增考点。

在闭区间 $[a,b]$ 上，若

$$
\varphi([a,b])\subseteq[a,b],\qquad
\vert \varphi(x)-\varphi(y)\vert \le q\vert x-y\vert ,\quad0\le q<1,
$$

则存在唯一不动点 $\alpha\in[a,b]$，且任意 $x_0\in[a,b]$ 的迭代都收敛。常用充分条件为 $\max_{[a,b]}\vert \varphi'(x)\vert \le q<1$。

证明套路：自映射保证每一步留在区间；压缩保证差值按几何速度缩小，从而序列为Cauchy列；闭性与连续性给出不动点。唯一性来自

$$
\vert \alpha-\beta\vert =\vert \varphi(\alpha)-\varphi(\beta)\vert \le q\vert \alpha-\beta\vert ,
$$

因 $q<1$，只能有 $\alpha=\beta$。也可先用介值定理证明存在，再利用误差递推证明收敛。

#### 3．三种误差估计，分清下标

$$
\vert x_k-\alpha\vert \le q^k\vert x_0-\alpha\vert ;
$$

$$
\vert x_k-\alpha\vert \le\frac{q^k}{1-q}\vert x_1-x_0\vert 
\qquad\text{（先验估计）};
$$

$$
\vert x_k-\alpha\vert \le\frac q{1-q}\vert x_k-x_{k-1}\vert ,\quad k\ge1
\qquad\text{（后验估计）}.
$$

若算到了 $x_{k+1}$，则 $\vert x_k-\alpha\vert \le \vert x_{k+1}-x_k\vert /(1-q)$。因此停止准则应对应准备输出的那个近似值。只要求 $\vert x_k-x_{k-1}\vert <\varepsilon$，一般不能直接保证真实误差小于 $\varepsilon$。

反求次数时，从 $q^k\vert x_1-x_0\vert /(1-q)\le\varepsilon$ 解出整数 $k$；$0<q<1$ 时 $\log q<0$，除法会改变不等号方向。$q=0$ 另行处理。

#### 4．局部收敛与收敛阶

若 $\varphi(\alpha)=\alpha$ 且 $\varphi'$ 在根附近连续：

| 条件 | 结论 |
|---|---|
| $\vert \varphi'(\alpha)\vert <1$ | 根附近初值局部收敛 |
| $\vert \varphi'(\alpha)\vert >1$ | 根为排斥不动点；足够近的非根起点一般不能持续趋向它 |
| $\vert \varphi'(\alpha)\vert =1$ | 此判据不能决定，须看高阶项或其他性质 |

例如 $\varphi(x)=x-x^3$ 在0处导数为1，但足够小的非零初值仍趋向0；$\varphi(x)=x+x^3$ 则远离0。

设 $e_k=x_k-\alpha$。若

$$
\lim_{k\to\infty}\frac{\vert e_{k+1}\vert }{\vert e_k\vert ^p}=C,\qquad0<C<\infty,
$$

则称为 $p$ 阶收敛；$p=1$ 且 $0<C<1$ 为线性收敛，$p=2$ 为平方收敛。若 $\vert e_{k+1}\vert /\vert e_k\vert \to0$，称超线性收敛。

若 $\varphi$ 足够光滑，并满足

$$
\varphi'(\alpha)=\cdots=\varphi^{(p-1)}(\alpha)=0,
\quad\varphi^{(p)}(\alpha)\ne0,
$$

则在迭代收敛且未有限步到根时

$$
e_{k+1}=\frac{\varphi^{(p)}(\alpha)}{p!}e_k^p+o(e_k^p),
\qquad C=\frac{\vert \varphi^{(p)}(\alpha)\vert }{p!}.
$$

**求阶模板：**找不动点 → 验证局部收敛 → 计算迭代函数在根处的导数 → 找第一个非零导数 → 写阶数和误差常数。若前几阶导数全零，只能先说“至少某阶”，不能把零误差常数当作恰好该阶。

#### 5．构造更好的迭代格式

常用形式 $\varphi(x)=x-\lambda f(x)$。若 $0<m\le f'(x)\le M$，选 $0<\lambda<2/M$ 可使导数模的上界小于1，但仍须检查区间自映射。使 $\max_{t\in[m,M]}\vert 1-\lambda t\vert $ 最小的参数为

$$
\lambda_* =\frac2{m+M},\qquad q_* =\frac{M-m}{M+m}.
$$

这来自把端点处的正负误差因子配平。不同等价改写的根相同，收敛速度可完全不同。

**原创例：**求 $x^2=3$ 的正根。$\varphi_1(x)=3/x$ 在根处导数为 $-1$，一般产生两点循环：$x_2=x_0$。改为 $\varphi_2(x)=(x+3/x)/2$，根处一阶导数为0，达到平方收敛。

**加速补充：**若课堂在4.2中讲过 Aitken 与 Steffensen，可连同这一小段复习；它们未在已核对的二级目录中单列，不能据此断言必考。对连续三次近似 $x_k,x_{k+1},x_{k+2}$，Aitken公式为

$$
\widehat x_k=x_k-\frac{(x_{k+1}-x_k)^2}{x_{k+2}-2x_{k+1}+x_k}.
$$

Steffensen每一轮从当前 $x$ 计算 $y=\varphi(x)$、$z=\varphi(y)$，再更新 $x\leftarrow x-(y-x)^2/(z-2y+x)$。分母须非零；在通常光滑条件及 $\varphi'(\alpha)\ne1$ 下，局部至少平方收敛。它不需要显式求导，但每轮要计算两次 $\varphi$。

### 4.3　Newton迭代法

#### 1．公式、几何意义与推导

把 $f$ 在当前点线性化：

$$
f(x)\approx f(x_k)+f'(x_k)(x-x_k).
$$

令右端为零，得到切线与横轴交点：

$$
x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}.
$$

每一步要求 $f'(x_k)\ne0$。算法步骤：确定初值 → 计算函数和导数 → 更新 → 检验停止条件 → 未达标继续。不可先把中间值过度四舍五入。

#### 2．简单根：局部至少平方收敛

若 $f\in C^2$ 于 $\alpha$ 邻域，$f(\alpha)=0$、$f'(\alpha)\ne0$，且初值充分接近根，则Newton迭代局部至少平方收敛。常用定理与重根修正可对照[电子科技大学邓良剑讲义](https://liangjiandeng.github.io/teaching/Numer_Analy/Chap4.pdf)。

证明可用迭代函数 $\varphi(x)=x-f(x)/f'(x)$，它满足

$$
\varphi'(x)=\frac{f(x)f''(x)}{[f'(x)]^2},\qquad\varphi'(\alpha)=0.
$$

也可将 $f(\alpha)=0$ 在 $x_k$ 展开，直接得

$$
e_{k+1}=\frac{f''(\xi_k)}{2f'(x_k)}e_k^2,
\quad
\lim\frac{e_{k+1}}{e_k^2}=\frac{f''(\alpha)}{2f'(\alpha)}.
$$

当 $f''(\alpha)\ne0$ 时恰为二阶；若等于零，可能更高阶，也可能有限步精确到根。

#### 3．可检查的单调收敛条件

一个常用充分条件是：$f\in C^2[a,b]$，$f(a)f(b)<0$，$f'$ 始终非零，$f''$ 始终严格同号；选择 $x_0\in[a,b]$ 且满足 $f(x_0)f''(x_0)>0$。此时切线迭代留在根的同一侧并单调趋于唯一根。

这是充分条件，不是所有收敛Newton迭代必须满足的条件。若 $f''$ 有零点或改变符号，需要采用其他论证，不能仅凭此条件不成立就判发散。Newton法也不保证任意初值收敛。

#### 4．重根与修正

若 $\alpha$ 是 $m$ 重根，写 $f(x)=(x-\alpha)^m g(x)$，$g(\alpha)\ne0$。普通Newton法满足

$$
e_{k+1}=\frac{m-1}{m}e_k+O(e_k^2),
$$

故 $m>1$ 时通常只有线性收敛，因子为 $(m-1)/m$。

已知重数 $m$ 时，修正为

$$
x_{k+1}=x_k-m\frac{f(x_k)}{f'(x_k)},
$$

在相应光滑条件下恢复至少平方收敛。不知道 $m$ 时，把 $u(x)=f(x)/f'(x)$ 连续延拓到根处，再对 $u=0$ 用Newton法，可得

$$
x_{k+1}=x_k-
\frac{f(x_k)f'(x_k)}{[f'(x_k)]^2-f(x_k)f''(x_k)}.
$$

该式使用二阶导数，要求更新时分母非零；已到根时应停止，不再计算 $0/0$。

#### 5．常见变形，按需要减少导数或改善初值表现

| 方法 | 更新式或规则 | 关键性质与限制 |
|---|---|---|
| 简化Newton | $x_{k+1}=x_k-f(x_k)/f'(x_0)$ | 固定导数；若 $\vert 1-f'(\alpha)/f'(x_0)\vert <1$ 则局部收敛，通常线性 |
| 阻尼／Newton下山 | $x_{k+1}=x_k-\lambda_k f(x_k)/f'(x_k)$，$0<\lambda_k\le1$ | 常从1逐次减半，使 $\vert f(x_{k+1})\vert <\vert f(x_k)\vert $；残差下降本身不构成无条件全局收敛证明 |
| 弦截／割线 | $x_{k+1}=x_k-f(x_k)(x_k-x_{k-1})/[f(x_k)-f(x_{k-1})]$ | 两个初值，不求导；$f\in C^2$、$f'(\alpha)\ne0$、$f''(\alpha)\ne0$，初值足够近且未有限步终止时，恰为 $(1+\sqrt5)/2$ 阶 |

**（虽不考，但有助于理解4.3弦截法为何能省去求导；来源：7.5数值微分。）**

导数是割线斜率的极限。用两个已有点的差商 $[f(x_k)-f(x_{k-1})]/(x_k-x_{k-1})$ 近似 $f'(x_k)$，代入Newton公式，就得到上表的弦截式；几何上是用割线代替切线。这里只借用差商近似导数的想法；4.3中的弦截更新与收敛性质仍按重点掌握，7.5的系统数值微分公式不因此加入考试范围。

弦截法典型误差关系为 $e_{k+1}\approx C e_ke_{k-1}$。结合假设 $e_k$ 约为 $e_{k-1}^p$，得到 $p^2=p+1$。两函数值相等时不能执行更新，初值也不要求一定夹住根。

#### 6．残差与停止准则

若已知包含 $x_k$ 与 $\alpha$ 的区间内 $\vert f'(x)\vert \ge m>0$，则

$$
\vert x_k-\alpha\vert \le\frac{\vert f(x_k)\vert }{m}.
$$

所以只有带导数下界的残差判据，才直接给出误差保证。$\vert f(x_k)\vert $ 很小但导数也很小时，根误差仍可能较大。

#### 原创计算例

求 $\sqrt3$，取 $x_0=2$：

$$
x_{k+1}=\frac12\left(x_k+\frac3{x_k}\right),\quad
x_1=\frac74=1.75,\quad x_2=\frac{97}{56}\approx1.732142857.
$$

其精确误差关系为

$$
x_{k+1}-\sqrt3=\frac{(x_k-\sqrt3)^2}{2x_k},
$$

从而误差常数为 $1/(2\sqrt3)$。另取 $f(x)=(x-2)^3$：普通Newton误差每次乘 $2/3$；重数修正式直接一步到2。这也说明“至少平方收敛”允许出现有限步终止。

#### 本章应能独立完成

- 构造迭代函数，证明区间自映射和压缩，给出误差限及迭代次数。
- 用导数或误差递推判收敛阶，并写明局部条件。
- 写出Newton、重根修正、简化Newton、下山、弦截格式并手算。
- 识别“导数模等于1仍未定”“Newton不是任意初值收敛”“重根降低阶数”等判断题陷阱。

## 第6章　函数插值与数据拟合

**考试范围：**重点为6.1、6.2、6.3、6.4、6.5、6.7。6.6三次样条、6.8.2最佳均方逼近不在考试范围，仅保留帮助理解考点的必要背景，并单独标注。6.8.1正交多项式未标三角，属于选择性考内容，也是第7章Gauss求积的前置知识。

本章主线：已知若干数据，构造容易计算的函数。插值要求逐点满足数据；最小二乘拟合要求总体平方误差最小。做题先判断题目给的是函数值、导数值，还是带误差的测量数据，再选方法。

### 6.1　多项式插值问题【重点】

#### 1. 定义、存在唯一性

给定互异节点 $x_0,\ldots,x_n$ 及数据 $y_i$，在次数不超过 $n$ 的多项式空间 $\mathcal P_n$ 中求 $P_n$，使

$$
P_n(x_i)=y_i,\qquad i=0,\ldots,n.
$$

$x_i$ 是插值节点，$P_n$ 是插值多项式，$P_n(x_i)=y_i$ 是插值条件。若 $y_i=f(x_i)$，则 $R_n(x)=f(x)-P_n(x)$ 为插值余项。

**结论：**互异的 $n+1$ 个节点决定唯一的次数不超过 $n$ 的插值多项式。不能把“不超过”写成“恰好”；数据来自直线时，增加节点仍可能得到一次多项式。

**证明套路一：**Lagrange公式直接构造，说明存在。若 $P,Q\in\mathcal P_n$ 均满足插值条件，则 $P-Q$ 有 $n+1$ 个互异零点，而次数不超过 $n$，故 $P-Q\equiv0$。

**证明套路二：**令 $P_n(x)=a_0+a_1x+\cdots+a_nx^n$，得到Vandermonde方程组，其行列式

$$
\det V=\prod_{0\le i<j\le n}(x_j-x_i)\ne0.
$$

直接解幂基系数方程适合节点很少的题；一般手算优先用Lagrange或Newton。

#### 2. 必须区分的情况

- 节点重复而给定函数值不同：条件矛盾，无解。
- 节点重复且函数值相同：只是重复约束，不能当作额外独立条件。
- 同节点还给导数：属于Hermite插值。
- 插值点位于节点覆盖区间内部，称内插；外部称外推。余项公式可用于外推，但导数界必须覆盖节点与求值点，通常误差风险更大。
- 同组节点数据的Lagrange式、Newton式即使外观不同，也表示同一个多项式。

### 6.2　Lagrange插值【重点】

#### 1. 基函数、线性与二次插值

定义Lagrange基函数

$$
\ell_i(x)=\prod_{\substack{0\le j\le n\\j\ne i}}
\frac{x-x_j}{x_i-x_j},\qquad
\ell_i(x_j)=\delta_{ij}.
$$

于是

$$
\boxed{P_n(x)=\sum_{i=0}^ny_i\ell_i(x)}.
$$

记忆法：第 $i$ 项分子删去 $(x-x_i)$；分母把剩余分子的 $x$ 全换成 $x_i$。

两点线性插值：

$$
P_1(x)=y_0\frac{x_1-x}{x_1-x_0}
+y_1\frac{x-x_0}{x_1-x_0}.
$$

三点二次插值：

$$
P_2(x)=y_0\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}
+y_1\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}
+y_2\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}.
$$

求一个函数近似值时，可直接代入目标点计算，不必把整个多项式展开。

#### 2. 基函数恒等式：证明题常用

因为插值对 $\mathcal P_n$ 中的多项式精确，有

$$
\sum_{i=0}^n\ell_i(x)=1,\qquad
\sum_{i=0}^nx_i^k\ell_i(x)=x^k\quad(0\le k\le n).
$$

证明不用繁琐通分：两边次数均不超过 $n$，在全部节点相等，利用唯一性即可。

#### 3. 插值余项与误差估计

令

$$
\omega_{n+1}(x)=\prod_{i=0}^n(x-x_i).
$$

若 $f\in C^{n+1}(I)$，区间 $I$ 包含所有节点与求值点 $x$，则对非节点 $x$，存在其间某个 $\xi$，使

$$
\boxed{R_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega_{n+1}(x)}.
$$

节点处余项直接为零。若 $\vert f^{(n+1)}(t)\vert \le M_{n+1}$，则

$$
\vert R_n(x)\vert \le\frac{M_{n+1}}{(n+1)!}\vert \omega_{n+1}(x)\vert .
$$

**证明模板：**固定非节点 $x$，设 $K=R_n(x)/\omega_{n+1}(x)$，构造 $F(t)=f(t)-P_n(t)-K\omega_{n+1}(t)$。它在 $n+1$ 个节点和 $x$ 共 $n+2$ 处为零。反复用Rolle定理，得到 $F^{(n+1)}(\xi)=0$；再用 $P_n^{(n+1)}=0$ 和 $\omega_{n+1}^{(n+1)}=(n+1)!$ 解出 $K$。

**手算步骤：**确定阶数 $n$ → 写节点乘积 → 求 $f^{(n+1)}$ 及其上界 → 代入指定点或求乘积在指定区间的最大值。若问误差符号，还要分析导数符号和节点乘积符号。

**易错：**$n+1$ 个节点对应 $n+1$ 阶导数；阶乘不能漏；$\xi$ 一般随 $x$ 变化，不能当常数对余项式直接求导；增加等距节点、提高整体插值次数，不保证误差递减。

若输入值有误差 $\widetilde y_i=y_i+\delta y_i$，还存在数据传播误差：$\widetilde P_n(x)-P_n(x)=\sum_i\delta y_i\ell_i(x)$。当 $\vert \delta y_i\vert \le\varepsilon$ 时，其绝对值不超过 $\varepsilon\sum_i\vert \ell_i(x)\vert $。这是数据误差的放大，与假定精确数据时的插值余项是两个来源；总误差可分别估计后相加。基函数之和为1，并不表示基函数绝对值之和也为1。

**原创例：**在 $[0,1]$ 上用端点对 $f(x)=e^x$ 作线性插值，得 $P_1(x)=1+(e-1)x$。由于 $f''>0$ 且 $x(x-1)\le0$，故 $f(x)\le P_1(x)$；又 $\vert x(x-1)\vert \le1/4$，所以全区间误差不超过 $e/8$。这里 $e/8$ 是上界，不是实际最大误差。

### 6.3　Newton插值与差商【重点】

#### 1. 差商定义

$$
f[x_i]=f(x_i),\qquad
f[x_i,x_j]=\frac{f(x_j)-f(x_i)}{x_j-x_i},
$$

$$
f[x_0,\ldots,x_k]=
\frac{f[x_1,\ldots,x_k]-f[x_0,\ldots,x_{k-1}]}{x_k-x_0}.
$$

差商表逐列计算：函数值 → 一阶差商 → 二阶差商……。每次分母是该差商涉及的最右节点减最左节点，不能固定除以一个步长。

#### 2. 差商性质

1. **线性：**$(af+bg)[x_0,\ldots,x_k]=a f[x_0,\ldots,x_k]+b g[x_0,\ldots,x_k]$。
2. **对称：**节点互异时，交换节点次序不改变同一组节点的差商。
3. **显式式：**$f[x_0,\ldots,x_k]=\displaystyle\sum_{i=0}^k\frac{f(x_i)}{\prod_{j\ne i}(x_i-x_j)}$，它等于相应 $k$ 次插值式的最高次项系数。
4. **多项式性质：**若 $p$ 次数为 $m$，则高于 $m$ 阶差商为零，$m$ 阶差商等于 $p$ 的最高次项系数。
5. **导数关系：**若 $f\in C^k(I)$，节点互异，则 $f[x_0,\ldots,x_k]=f^{(k)}(\xi)/k!$。不能误写为没有 $k!$ 的形式。
6. **重节点极限：**在足够光滑条件下，$f[\underbrace{x,\ldots,x}_{k+1}]=f^{(k)}(x)/k!$，用于Hermite插值。

#### 3. Newton公式、余项与追加节点

$$
\boxed{P_n(x)=f[x_0]+\sum_{k=1}^nf[x_0,\ldots,x_k]
\prod_{j=0}^{k-1}(x-x_j)}.
$$

从差商表中读取含固定起点 $x_0$ 的各阶差商，即 $f[x_0]$、$f[x_0,x_1]$、$f[x_0,x_1,x_2]$ 等，不能混取其他位置的数。

增加一个新节点，只需增加一项：

$$
P_{n+1}(x)=P_n(x)+f[x_0,\ldots,x_{n+1}]\omega_{n+1}(x).
$$

余项可写为

$$
f(x)-P_n(x)=f[x_0,\ldots,x_n,x]\omega_{n+1}(x)
=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega_{n+1}(x).
$$

首式用于 $x$ 不与已有节点重合的情况；节点处直接利用插值条件。Newton与Lagrange的余项完全相同，因为它们代表同一个插值多项式。

**推导套路：**由 $f(x)=f[x_0]+(x-x_0)f[x_0,x]$ 出发，反复展开最后一个差商；或给 $P_{k-1}$ 加上 $c_k\prod_{j<k}(x-x_j)$，使已有节点条件保持不变，再由新节点条件确定 $c_k$。

**计算优化：**记 $a_k=f[x_0,\ldots,x_k]$，可按嵌套式计算

$$
P_n(x)=a_0+(x-x_0)\{a_1+(x-x_1)[a_2+\cdots+(x-x_{n-1})a_n]\}.
$$

**原创例：**数据 $(0,1),(1,3),(2,2)$，一阶差商依次为 $2,-1$，二阶差商为 $(-1-2)/(2-0)=-3/2$。故

$$
P_2(x)=1+2x-\frac32x(x-1),\qquad P_2(1/2)=\frac{19}{8}.
$$

最后代回三个节点核对。若节点为等距 $x_i=x_0+ih$，可利用 $f[x_0,\ldots,x_k]=\Delta^k f(x_0)/(k!h^k)$；差分 $\Delta$ 与差商不是同一个量。

### 6.4　Hermite插值【重点】

#### 1. 条件数决定次数上限

若在 $n+1$ 个互异节点同时指定函数值和一阶导数

$$
H(x_i)=y_i,\qquad H'(x_i)=d_i,
$$

共有 $2n+2$ 个条件，存在唯一 $H\in\mathcal P_{2n+1}$。证明唯一性时，两个解的差在每个节点都有二重零点，总重数至少 $2n+2$，只能恒零。

更一般地，在节点 $x_i$ 给出从零阶到 $m_i-1$ 阶导数，共 $M=\sum_i m_i$ 个条件，得到唯一的次数不超过 $M-1$ 的Hermite多项式。这里要求每个节点的导数条件从零阶连续给出；任意缺项的导数约束不能仅凭“条件数”断言唯一。

#### 2. 基函数公式

用相同节点的Lagrange基函数 $\ell_i$ 定义

$$
\alpha_i(x)=[1-2(x-x_i)\ell_i'(x_i)]\ell_i(x)^2,
\qquad \beta_i(x)=(x-x_i)\ell_i(x)^2.
$$

则

$$
\boxed{H_{2n+1}(x)=\sum_{i=0}^n[y_i\alpha_i(x)+d_i\beta_i(x)]}.
$$

其关键性质：$\alpha_i(x_j)=\delta_{ij}$、$\alpha_i'(x_j)=0$；$\beta_i(x_j)=0$、$\beta_i'(x_j)=\delta_{ij}$。证明公式时逐项检查这四组条件，再用唯一性。计算时可用 $\ell_i'(x_i)=\sum_{j\ne i}(x_i-x_j)^{-1}$。

#### 3. 重节点Newton法与待定系数法

重节点Newton法：将每个有一阶导数的节点重复一次，写成 $x_0,x_0,x_1,x_1,\ldots$；函数值重复填入；相同节点的一阶差商填 $f[x_i,x_i]=d_i$，其余按差商递推。有二阶导数时，三重相同节点差商为 $f''(x_i)/2!$。节点相同时不能套普通差商公式造成 $0/0$。

条件少时直接设待定系数。已知某节点值和导数，优先用围绕该点展开的幂基，减少未知数。例如已知 $H(0)=1,H'(0)=2$，设 $H(x)=1+2x+ax^2+bx^3$，再代入其他条件。

#### 4. 余项

若 $f\in C^{2n+2}(I)$，且节点值、导数均来自真实 $f$，则

$$
\boxed{f(x)-H_{2n+1}(x)=
\frac{f^{(2n+2)}(\xi)}{(2n+2)!}\prod_{i=0}^n(x-x_i)^2}.
$$

一般连续重数条件的余项为 $f^{(M)}(\xi)\prod_i(x-x_i)^{m_i}/M!$。证明沿用Lagrange余项的辅助函数法，零点按重数计。重节点公式及双重Hermite余项可核对[伯克利大学数值分析讲义](https://math.berkeley.edu/~mgu/MA128ASpring2017/MA128ALectureWeek5.pdf)。

**原创例：**给定 $H(0)=1,H'(0)=2,H(1)=2,H'(1)=-1$。设 $H=1+2x+ax^2+bx^3$，得到 $a+b=-1$、$2a+3b=-3$，故 $a=0,b=-1$，即 $H(x)=1+2x-x^3$，$H(1/2)=15/8$。验算必须同时检查函数值与导数。

### 6.5　分段插值【重点】

#### 1. 分段Lagrange：局部低次代替整体高次

把区间分成 $x_0<x_1<\cdots<x_N$，每小段仅使用附近少数节点构造低次多项式。分段方法的“次数”指各段次数，不是把全部节点放入一个高次多项式。它可避免因整体次数过高产生的剧烈振荡；高次等距插值可能出现Runge现象。

最常考分段线性：在 $[x_i,x_{i+1}]$ 上

$$
I_hf(x)=f(x_i)\frac{x_{i+1}-x}{h_i}
+f(x_{i+1})\frac{x-x_i}{h_i},\qquad h_i=x_{i+1}-x_i.
$$

整体连续，但节点处左右导数通常不同。若 $f\in C^2[a,b]$，$h=\max h_i$，$M_2=\max\vert f''\vert $，则

$$
\vert f(x)-I_hf(x)\vert \le\frac{M_2h_i^2}{8},\qquad
\Vert f-I_hf\Vert _\infty\le\frac{M_2h^2}{8}=O(h^2).
$$

因为在长度 $h_i$ 的区间上，$\max\vert (x-x_i)(x-x_{i+1})\vert =h_i^2/4$，再乘余项中的 $1/2!$。若要求误差 $\le\varepsilon$，$M_2>0$ 时可令 $h\le\sqrt{8\varepsilon/M_2}$。均匀划分时取 $N\ge(b-a)\sqrt{M_2/(8\varepsilon)}$ 并向上取整；$N$ 是小区间数，节点数为 $N+1$。

分段二次或其他低次Lagrange，同样先指定每段使用的局部节点，再套该次数的Lagrange式与局部余项。相邻段共享端点值可保证函数连续，但不会自动保证导数连续。

#### 2. 分段三次Hermite

已知每个节点的函数值 $y_i$ 和斜率 $d_i$。对区间 $[x_i,x_{i+1}]$，令 $t=(x-x_i)/h_i$，则

$$
\boxed{\begin{aligned}
H_i(x)={}&(2t^3-3t^2+1)y_i+(-2t^3+3t^2)y_{i+1}\\
&+h_i(t^3-2t^2+t)d_i+h_i(t^3-t^2)d_{i+1}.
\end{aligned}}
$$

四个条件是两端函数值、两端对 $x$ 的导数。斜率项前必须乘 $h_i$，因为 $d/dx=(1/h_i)d/dt$。所有小段共用同一个节点斜率，所以拼成 $C^1$ 函数；一般不能保证 $C^2$。

若 $d_i=f'(x_i)$ 精确且 $f\in C^4[a,b]$，则

$$
f(x)-H_i(x)=\frac{f^{(4)}(\xi)}{4!}(x-x_i)^2(x-x_{i+1})^2,
$$

$$
\Vert f-H\Vert _\infty\le\frac{M_4h^4}{384}=O(h^4),
\qquad M_4=\max\vert f^{(4)}\vert .
$$

常数来源：节点乘积平方最大为 $h_i^4/16$，再除以 $4!=24$。如果斜率由差分估计，还须加上斜率误差影响，不能直接宣称四阶。具体而言，若节点值精确、斜率最大误差为 $\delta$，新增函数误差在每段不超过 $h_i\delta/4$；保证斜率误差为 $O(h^3)$，即可保留上述四阶上界。

**原创例：**用分段线性插值近似 $x^2$，要求在 $[0,1]$ 上误差不超过 $10^{-3}$。$M_2=2$，故 $h^2/4\le10^{-3}$。均匀划分需 $N\ge\sqrt{250}$，取 $N=16$，需要17个节点。

**（虽不考，但有助于理解分段Hermite的光滑性；来源：6.6 三次样条。）**

三次样条在每段使用次数不超过3的多项式，并要求内节点处函数、一阶导数和二阶导数连续，即整体属于 $C^2$。分段Hermite通过共享节点值和斜率保证 $C^1$，但独立指定的节点斜率通常不能使相邻段二阶导数也相等。要使它成为三次样条，须再用左右二阶导数相等的联立条件约束节点斜率，并配合恰当端点条件（如指定端点斜率或端点二阶导数），所以斜率一般不能任意给定。

### 6.7　数据拟合的最小二乘法【重点】

**（虽不考，但有助于理解拟合为何需要最小二乘；来源：2.6 超定方程。）**

当数据点数 $m$ 多于未知参数数目 $r+1$ 时，要求模型逐点通过全部数据会形成超定方程组 $Aa=y$：方程多于未知数。它通常没有精确解，但若数据恰好落在模型上，也可能有解；一般改求 $Aa\approx y$，即最小化残差平方和，有权情形最小化加权平方和。本段仅补充2.6的背景；下面6.7的目标函数及法方程推导仍是重点。

#### 1. 模型与目标函数

给定 $m$ 组数据 $(x_i,y_i)$，选择模型

$$
s(x)=\sum_{j=0}^{r}a_j\varphi_j(x),\qquad
J(a)=\sum_{i=1}^{m}w_i[s(x_i)-y_i]^2,\quad w_i>0.
$$

求使 $J$ 最小的系数。无权情形取 $w_i=1$。它允许各点残差不为零，以适合有测量误差或过多数据的情形。“线性最小二乘”指对未知参数 $a_j$ 线性，基函数可以是 $1,x,x^2,\sin x,e^x$ 等。

#### 2. 法方程：推导与唯一性

分别令 $\partial J/\partial a_k=0$，得

$$
\boxed{\sum_{j=0}^{r}\left[\sum_{i=1}^{m}w_i\varphi_k(x_i)\varphi_j(x_i)\right]a_j
=\sum_{i=1}^{m}w_i\varphi_k(x_i)y_i,\quad k=0,\ldots,r.}
$$

定义设计矩阵 $A_{ij}=\varphi_j(x_i)$、$W=\operatorname{diag}(w_i)$，则

$$
A^TWAa=A^TWy.
$$

当 $A$ 列满秩时，$G=A^TWA$ 对称正定，最小二乘解唯一。仅说“基函数作为函数线性无关”还不够，必须在给定采样节点形成的矩阵上列满秩。$r$ 次多项式拟合若至少有 $r+1$ 个互异横坐标，则满足该条件。列不满秩时最小值仍存在，但参数可能不唯一。

**为什么是最小值：**设 $a_*$ 满足法方程，则对任意 $v$，

$$
J(a_*+v)=J(a_*)+v^TA^TWAv.
$$

交叉项由法方程为零；正定时 $v\ne0$ 导致严格增大。

#### 3. 拟合直线、拟合二次曲线

直线 $s(x)=a+bx$ 的无权法方程：

$$
\begin{cases}
ma+b\sum x_i=\sum y_i,\\
a\sum x_i+b\sum x_i^2=\sum x_iy_i.
\end{cases}
$$

若横坐标不全相同，

$$
b=\frac{m\sum x_iy_i-(\sum x_i)(\sum y_i)}
{m\sum x_i^2-(\sum x_i)^2},\qquad a=\bar y-b\bar x.
$$

因此无权最小二乘直线经过 $(\bar x,\bar y)$。常数拟合是特殊情形，$s=\bar y$；有权常数拟合为 $s=\sum w_i y_i/\sum w_i$。

二次模型 $s=a_0+a_1x+a_2x^2$：

$$
\begin{pmatrix}
m&\sum x_i&\sum x_i^2\\
\sum x_i&\sum x_i^2&\sum x_i^3\\
\sum x_i^2&\sum x_i^3&\sum x_i^4
\end{pmatrix}
\begin{pmatrix}a_0\\a_1\\a_2\end{pmatrix}
=
\begin{pmatrix}\sum y_i\\\sum x_iy_i\\\sum x_i^2y_i\end{pmatrix}.
$$

**手算顺序：**先写模型 → 列辅助表并求各项和 → 写法方程 → 解系数 → 写拟合函数 → 按题意计算预测值、残差或残差平方和。节点关于原点对称时，奇次幂之和可能为零，可直接简化方程。

#### 4. 残差检验与常见变换

记 $r_i=y_i-s(x_i)$，则 $A^TWr=0$，即残差与每个基函数的数据列加权正交。模型含常数项时 $\sum w_ir_i=0$；还含 $x$ 时 $\sum w_ix_ir_i=0$。这两个等式可快速查错，但不代表每个残差都为零。

求得法方程解 $a_*$ 后，最小残差平方和也可用 $J_{\min}=y^TWy-a_*^TA^TWy$ 计算；手算用逐点残差平方求和更便于检查。若使用 $m$ 个互异横坐标、模型允许次数不超过 $m-1$，则最小二乘可精确通过所有数据，此时与插值一致。一般拟合次数较低，不能要求它通过所有点；升高次数可使样本上的最小平方和不增，但不保证对新数据预测更准。

非线性形式常通过变换化为线性：$y=ae^{bx}$ 在 $y>0,a>0$ 时变为 $\ln y=\ln a+bx$；$y=ax^b$ 在 $x,y,a>0$ 时变为 $\ln y=\ln a+b\ln x$。**变换后最小化的是对数尺度残差平方和，通常不等价于原始 $y$ 尺度的最小二乘。**若题目明确要求原尺度最优，不能擅自用取对数代替。

法方程适合考试手算；实际计算中它可能放大条件数，需稳定求解时采用QR分解。无须通过显式求逆计算系数。

**原创例：**用直线拟合 $(0,1),(1,2),(2,2)$。有 $m=3,\sum x_i=3,\sum x_i^2=5,\sum y_i=5,\sum x_iy_i=6$，故

$$
3a+3b=5,\qquad3a+5b=6,
\quad s(x)=\frac76+\frac12x.
$$

残差为 $(-1/6,1/3,-1/6)$，满足 $\sum r_i=0$、$\sum x_ir_i=0$；残差平方和为 $1/6$。均方残差为 $(1/6)/3=1/18$，不要把平方和、均方值、均方根混为一个量。

### 6.8.1　正交多项式【选择性考；未标三角】

按“未划叉选择性考、三角重点考”的规则，本节需要复习，但优先级低于本章三角内容；6.8.2不在考试范围，仅在标注的背景段说明其误差目标。

#### 1. 内积、正交与构造

连续加权内积为 $(u,v)=\int_a^b\rho(x)u(x)v(x)\,dx$。要求权函数非负、所需积分存在，并使非零多项式的平方积分为正，例如 $\rho$ 在区间内几乎处处为正。离散内积为 $(u,v)_d=\sum_iw_iu(x_i)v(x_i)$，正定性限于采样映射无零空间的所用多项式空间。

若 $\deg p_k=k$ 且 $(p_j,p_k)=0$ 对 $j\ne k$ 成立，称正交多项式序列。正交不等于正交归一；后者还要求 $(p_k,p_k)=1$。把 $p_k$ 除以 $\sqrt{(p_k,p_k)}$ 即可归一化。

由于 $p_0,\ldots,p_{n-1}$ 构成 $\mathcal P_{n-1}$ 的一组基，$n$ 次正交多项式与**任意**次数小于 $n$ 的多项式都正交。反之，只要验证 $(p_n,x^j)=0$，$j=0,\ldots,n-1$，便验证了这一性质。它是构造多项式和证明Gauss求积精度的核心。

对 $1,x,x^2,\ldots$ 用Gram–Schmidt构造首一多项式：

$$
p_0=1,\qquad
p_k=x^k-\sum_{j=0}^{k-1}\frac{(x^k,p_j)}{(p_j,p_j)}p_j.
$$

首一序列也满足三项递推：

$$
p_1=x-\alpha_0,\qquad
p_{k+1}=(x-\alpha_k)p_k-\beta_kp_{k-1}\quad(k\ge1),
$$

$$
\alpha_k=\frac{(xp_k,p_k)}{(p_k,p_k)},\qquad
\beta_k=\frac{(p_k,p_k)}{(p_{k-1},p_{k-1})}>0.
$$

首一归一化和任意归一化的递推系数不同。一般正交理论及首一递推可核对[NIST DLMF §18.2](https://dlmf.nist.gov/18.2)。

**三项递推证明套路：**把 $xp_k$ 用 $p_0,\ldots,p_{k+1}$ 展开。对 $j\le k-2$，$(xp_k,p_j)=(p_k,xp_j)=0$，因为 $\deg(xp_j)\le k-1$；因此只剩相邻三个次数。首一条件使 $p_{k+1}$ 的系数为1，分别与 $p_k,p_{k-1}$ 取内积，就得到上述系数。

**存在与唯一：**Gram–Schmidt给出存在；指定首项系数后唯一。若两个首一的 $n$ 次多项式都正交于 $\mathcal P_{n-1}$，其差 $q$ 次数至多 $n-1$，且 $(q,q)=0$，故 $q\equiv0$。乘上非零常数只改变归一化，不改变正交性或零点。

#### 2. 两类常见多项式

**Legendre：**区间 $[-1,1]$，权为1，标准归一化 $P_n(1)=1$。

$$
P_0=1,\quad P_1=x,\quad P_2=\frac{3x^2-1}{2},\quad
P_3=\frac{5x^3-3x}{2},
$$

$$
(n+1)P_{n+1}=(2n+1)xP_n-nP_{n-1}\quad(n\ge1),\qquad
\int_{-1}^1P_n^2(x)\,dx=\frac{2}{2n+1}.
$$

还应认识Rodrigues公式及奇偶性：

$$
P_n(x)=\frac{1}{2^nn!}\frac{d^n}{dx^n}(x^2-1)^n,
\qquad P_n(-x)=(-1)^nP_n(x).
$$

证明 $P_n$ 与任意 $\deg q<n$ 的多项式正交，可用Rodrigues公式对 $\int_{-1}^1q(x)P_n(x)\,dx$ 分部积分 $n$ 次；边界项因 $(x^2-1)^n$ 在端点有 $n$ 重零点消失，最后因 $q^{(n)}=0$ 得零。$P_n(-1)=(-1)^n$，但标准 $P_n$ 一般不是首一多项式。

**第一类Chebyshev：**区间 $[-1,1]$，权 $\rho(x)=1/\sqrt{1-x^2}$。

$$
T_n(x)=\cos(n\arccos x),\quad T_0=1,\quad T_1=x,
\quad T_{n+1}=2xT_n-T_{n-1}.
$$

前几项为 $T_2=2x^2-1,T_3=4x^3-3x$；$n\ge1$ 时，最高次项系数为 $2^{n-1}$，零点为 $x_k=\cos\frac{(2k-1)\pi}{2n}$，$k=1,\ldots,n$。标准定义、权函数及递推分别见[NIST DLMF §18.3](https://dlmf.nist.gov/18.3)、[§18.9](https://dlmf.nist.gov/18.9)。

令 $x=\cos\theta$，可把加权内积化为 $\int_0^\pi\cos(m\theta)\cos(n\theta)\,d\theta$，从而得到

$$
\int_{-1}^1\frac{T_m(x)T_n(x)}{\sqrt{1-x^2}}\,dx
=\begin{cases}0,&m\ne n,\\\pi,&m=n=0,\\\pi/2,&m=n\ge1.\end{cases}
$$

$T_n$ 的奇偶性为 $T_n(-x)=(-1)^nT_n(x)$；在 $x=\cos(k\pi/n)$，$k=0,\ldots,n$，取交替值 $(-1)^k$。因此 $\Vert T_n\Vert _\infty=1$，且首一多项式 $2^{1-n}T_n$ 在所有首一 $n$ 次多项式中具有最小的区间最大绝对值 $2^{1-n}$。简证：若另一个首一多项式最大值更小，它与 $2^{1-n}T_n$ 之差将在这 $n+1$ 个交替点间至少变号 $n$ 次，但该差次数至多 $n-1$，矛盾。

这一性质解释了插值中使用Chebyshev零点：$n+1$ 个节点对应 $T_{n+1}$ 的零点，使 $[-1,1]$ 上首一节点乘积的最大绝对值达到 $2^{-n}$。它优化的是节点乘积因子；具体插值误差还取决于高阶导数，不能据此断言任何函数都必然快速收敛。一般区间节点可由 $x=(a+b)/2+(b-a)t/2$ 变换得到。

**原创构造例：**$[-1,1]$ 上权为1，$p_0=1$。由奇函数积分为零得 $p_1=x$；又 $(x^2,1)/(1,1)=(2/3)/2=1/3$，所以首一二次正交多项式 $p_2=x^2-1/3=(2/3)P_2$。两者只差非零常数倍，零点相同。

#### 3. 零点性质与前后章节的联系

在有限区间正权的常规条件下，$n$ 次正交多项式有 $n$ 个互异实零点，全部在 $(a,b)$ 内。证明时设区间内变号零点只有 $r<n$ 个，用这些一次因子的乘积构造 $q$；则 $p_nq$ 在区间内不变号且不恒零，故加权积分非零，但 $\deg q<n$ 又要求积分为零，矛盾。于是变号零点已有 $n$ 个，只能全部为单零点。相邻两阶正交多项式的零点还具有交错性质。

离散拟合若选用离散正交基，法方程变为对角形式，各系数可分别计算：$a_k=(y,p_k)_d/(p_k,p_k)_d$。不能把连续积分正交自动当成给定离散节点上的正交。

Gauss求积的节点来自对应权函数的正交多项式零点：$n$ 个适当节点可达到 $2n-1$ 次代数精度。关键理由是将次数不超过 $2n-1$ 的多项式除以 $n$ 次正交多项式，写成 $q p_n+r$；$\deg q,\deg r\le n-1$，正交性使第一部分的积分为零，节点取 $p_n$ 的零点使第一部分的求积值也为零。不要把Legendre与Chebyshev的权函数、节点混用。

**（虽不考，但有助于理解连续逼近与离散拟合的区别；来源：6.8.2 最佳均方逼近。）**

连续最佳均方逼近的目标是在选定函数空间内最小化 $\int_a^b\rho(x)[f(x)-s(x)]^2\,dx$；6.7离散拟合的目标则是最小化 $\sum_iw_i[y_i-s(x_i)]^2$。前者衡量整个区间上的积分平方误差，后者衡量有限数据点上的加权平方误差，分别对应连续内积和离散内积；不要把两种目标或两种正交条件混用。

### 本章考前自检与习题清单

应能独立完成：证明插值唯一性；写Lagrange式并估计余项；计算差商表及Newton式；利用多项式唯一性证明恒等式；由值和导数构造Hermite式并验算；写分段线性/三次Hermite式，区别二阶与四阶误差；由数据推导并求解法方程；检查残差正交条件。选择性考部分应会Gram–Schmidt构造低阶正交多项式，识别Legendre与Chebyshev的权、递推、归一化和零点，并说明它们与Gauss求积的联系。

用户指定课后题：**第6章2、3、4、8、9、10、12、16、17、18、26。**未获得题目原文，不能把题号擅自对应到某一公式或编造题干、答案。以上原创例用于覆盖解题方法，不充当教材习题答案。

## 第7章　数值积分

**范围：7.1、7.2、7.4为重点；7.3 Romberg积分、7.5数值微分不展开。** 本章统一用“误差＝精确积分－求积值”，记为 $R(f)=I(f)-Q(f)$。求积公式的代数精度与复化公式的误差阶不是同一个概念。

### 7.1　基本概念、插值型求积与 Newton–Cotes 公式

#### 1．数值求积与代数精度

用有限个函数值近似积分：

$$
I(f)=\int_a^b\rho(x)f(x)\,dx
\approx Q(f)=\sum_{i=0}^{n}A_i f(x_i),\qquad \rho(x)\ge0.
$$

$x_i$为求积节点，$A_i$为求积系数；不带权积分取 $\rho\equiv1$。节点与系数应独立于待积函数 $f$。若对所有次数不超过 $m$ 的多项式都精确，而对某个 $m+1$ 次多项式不精确，则代数精度恰为 $m$。

**判定法：逐个代入 $1,x,x^2,\ldots$**，检验矩条件

$$
\sum_iA_i x_i^k=\mu_k,\qquad
\mu_k=\int_a^b\rho(x)x^k\,dx.
$$

等式对 $k=0,\ldots,m$ 成立、对 $k=m+1$ 失败，才可写“代数精度为 $m$”。只证明前面成立，只能写“至少为 $m$”。普通积分的第一条检查是 $\sum_iA_i=b-a$；对称区间、偶权函数与对称节点及系数，可自动满足全部奇次矩条件。

#### 2．插值型求积公式

对互异节点 $x_0,\ldots,x_n$，取 Lagrange 插值多项式

$$
L_n(x)=\sum_{i=0}^n f(x_i)\ell_i(x),\qquad
\ell_i(x)=\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}.
$$

积分得到

$$
A_i=\int_a^b\rho(x)\ell_i(x)\,dx.
$$

**定理：$n+1$ 个互异固定节点的求积公式为插值型，当且仅当其代数精度至少为 $n$。** 固定节点后，这组系数唯一。

证明思路：正向用“插值对 $n$ 次以内多项式精确”；反向令 $f=\ell_i$，立即得到上式。节点在区间内、$f\in C^{n+1}$ 时，也可将插值余项积分：

$$
R(f)=\frac1{(n+1)!}\int_a^b\rho(x)f^{(n+1)}(\xi_x)
\omega_{n+1}(x)\,dx,\qquad
\omega_{n+1}(x)=\prod_{i=0}^n(x-x_i).
$$

注意 $\xi_x$ 随 $x$ 变化；若被乘因子变号，不能直接把导数提到积分号外。通用安全上界为

$$
\vert R(f)\vert \le\frac{\Vert f^{(n+1)}\Vert _\infty}{(n+1)!}
\int_a^b\rho(x)\vert \omega_{n+1}(x)\vert \,dx.
$$

#### 3．闭型 Newton–Cotes 公式

节点等距且包含两端点：$x_i=a+ih$，$h=(b-a)/n$，$i=0,\ldots,n$。这里 $n$ 是小区间数，节点数为 $n+1$。

$$
Q_n=(b-a)\sum_{i=0}^nC_i^{(n)}f(x_i),\qquad
C_i^{(n)}=\frac1n\int_0^n
\prod_{j\ne i}\frac{t-j}{i-j}\,dt.
$$

系数与 $a,b,f$ 无关，满足 $C_i^{(n)}=C_{n-i}^{(n)}$、$\sum_iC_i^{(n)}=1$。闭型公式的代数精度：$n$ 为奇数时为 $n$；$n$ 为偶数时为 $n+1$。偶数情形多出的一阶来自对称性：关于区间中点的奇次多项式，积分与求积和均为零。

以下表格中的 $h$ 始终为相邻节点间距，$f_i=f(a+ih)$，余项需要所示阶导数连续。

| 公式 | 求积值 | 代数精度 | $R=I-Q$ |
|---|---|---:|---|
| 梯形，$n=1$ | $\frac h2(f_0+f_1)$ | 1 | $-\frac{h^3}{12}f''(\xi)$ |
| Simpson，$n=2$ | $\frac h3(f_0+4f_1+f_2)$ | 3 | $-\frac{h^5}{90}f^{(4)}(\xi)$ |
| Simpson $3/8$，$n=3$ | $\frac{3h}{8}(f_0+3f_1+3f_2+f_3)$ | 3 | $-\frac{3h^5}{80}f^{(4)}(\xi)$ |
| Cotes／Boole，$n=4$ | $\frac{2h}{45}(7f_0+32f_1+12f_2+32f_3+7f_4)$ | 5 | $-\frac{8h^7}{945}f^{(6)}(\xi)$ |

另一个常用公式为中点公式：

$$
M=(b-a)f\!\left(\frac{a+b}{2}\right),\qquad
I-M=\frac{(b-a)^3}{24}f''(\xi),
$$

代数精度为1。它不是上述包含端点的闭型公式。

**易错点：** 单区间 Simpson 若把 $H=b-a$ 记作步长，则其误差为 $-H^5f^{(4)}(\xi)/2880$；这与表中的 $-h^5/90$ 完全一致，因为 $H=2h$。低阶公式误差常数可用首个不精确单项式核对，例如在 $[-1,1]$ 对 $x^4$，Simpson 给出 $2/3$，精确值为 $2/5$，误差为 $-4/15$。梯形、Simpson 及其复化余项的步长约定可核对 [NIST DLMF §3.5](https://dlmf.nist.gov/3.5)。

高次等距插值未必更好；部分高阶 Newton–Cotes 公式出现负权，数据误差可能被放大。实际提高精度通常采用低阶公式复化。

#### 4．待定系数题的完整做法

设要求构造
$$
\int_{-1}^1f(x)dx\approx Af(-1)+Bf(0)+Cf(1).
$$

依次代入 $1,x,x^2$，得到 $A+B+C=2$、$-A+C=0$、$A+C=2/3$，解得 $A=C=1/3,B=4/3$。再检验 $x^3$，两边均为零；检验 $x^4$，积分 $2/5$ 不等于求积和 $2/3$，所以代数精度恰为3。不能仅凭“三个节点”断定精度为2；三个节点给出的只是插值型公式至少二次精确。

若题目增加一个未知参数，例如节点位置或导数项系数，应把它也加入矩方程。未知量个数可以帮助预计需要多少方程，但不能代替最后的精度检验；对称性可能令某些方程自动成立，也可能存在无解或多组候选值。

### 7.2　复化求积公式

#### 1．复化梯形与复化中点

令 $x_i=a+ih$，$h=(b-a)/N$，将每个小区间的公式相加：

$$
T_N=h\left[\frac{f(a)+f(b)}2+\sum_{i=1}^{N-1}f(x_i)\right],
\qquad I-T_N=-\frac{b-a}{12}h^2f''(\xi).
$$

$$
M_N=h\sum_{i=0}^{N-1}f(x_i+h/2),
\qquad I-M_N=\frac{b-a}{24}h^2f''(\xi).
$$

两者全区间误差均为 $O(h^2)$。每块误差 $O(h^3)$，块数为 $O(1/h)$，总误差降一阶。导数有界且连续时，把各块余项相加，再用连续性合并为某个 $f''(\xi)$。

#### 2．复化 Simpson

若 $N$ 为偶数，$h=(b-a)/N$ 为相邻节点间距，每两个小区间组成一块：

$$
S_N=\frac h3\left[f_0+f_N
+4\sum_{\substack{i=1\\i\text{为奇数}}}^{N-1}f_i
+2\sum_{\substack{i=2\\i\text{为偶数}}}^{N-2}f_i\right],
$$

$$
I-S_N=-\frac{b-a}{180}h^4f^{(4)}(\xi)=O(h^4).
$$

另一种记法把区间分为 $m$ 个长度 $H=(b-a)/m$ 的大块，每块另取中点：

$$
S=\frac H6\sum_{j=0}^{m-1}
\left[f(x_j)+4f(x_j+H/2)+f(x_{j+1})\right],
\qquad I-S=-\frac{b-a}{2880}H^4f^{(4)}(\xi).
$$

先写清 $h$ 或 $H$ 的含义，再代误差公式。不能把“块长”代入“相邻节点间距”的公式。

#### 3．按误差限选分段数

若 $\Vert f''\Vert _\infty\le M_2$、$\Vert f^{(4)}\Vert _\infty\le M_4$，要求绝对误差不超过 $\varepsilon$，可用充分条件：

$$
N_T\ge\sqrt{\frac{(b-a)^3M_2}{12\varepsilon}},\qquad
N_M\ge\sqrt{\frac{(b-a)^3M_2}{24\varepsilon}},\qquad
N_S\ge\left(\frac{(b-a)^5M_4}{180\varepsilon}\right)^{1/4}.
$$

向上取整，Simpson 再向上取偶数。这是保证精度的充分分段数，不一定是实际最小值。误差已处于主项控制区间时，步长减半，梯形误差约变为原来的 $1/4$，Simpson 约为 $1/16$。

**手算例：** 求 $\int_0^1x^2dx$，取 $N=2$、$h=1/2$。复化梯形 $T_2=3/8$，误差 $1/3-3/8=-1/24$，与 $-h^2\cdot2/12$ 一致；Simpson 对二次多项式精确，得到 $1/3$。

**误差限例：** 对 $\int_0^1x^4dx$ 用复化 Simpson，要求误差不超过 $10^{-4}$。因四阶导数恒为24，需 $24/(180N^4)\le10^{-4}$，即 $N\ge(4000/3)^{1/4}\approx6.043$，再取偶数，得到 $N=8$。此例导数恒定，上界就是实际误差绝对值；$N=6$ 的误差约为 $1.029\times10^{-4}$，确实不够。

证明复化余项时，先写出每一块的误差，再数清块数。复化 Simpson 一块覆盖两个小区间，块数是 $N/2$，所以 $(N/2)\cdot h^5/90=(b-a)h^4/180$。这种推导比孤立背诵分母更可靠。若导数在端点无界、函数不满足相应光滑性，不能直接套上述导数上界；需要先检查公式的适用前提。

### 7.4　Gauss 求积公式

#### 1．最高代数精度与节点构造

设用 $m$ 个自由节点：

$$
\int_a^b\rho(x)f(x)\,dx\approx\sum_{i=1}^mA_i f(x_i).
$$

在非负权函数满足通常可积性、正定性条件时，$m$ 节点公式最高代数精度为 $2m-1$。达到此精度的公式称 Gauss 公式；节点为关于权函数 $\rho$ 的 $m$ 次正交多项式的 $m$ 个零点，系数仍由积分 Lagrange 基函数得到。

**三条证明套路：**

1. 证明不可能精确到 $2m$ 次：取 $p(x)=\prod_i(x-x_i)^2$。求积和为零，带权积分严格为正。
2. 证明正交节点足够：任取 $\deg p\le2m-1$，除以节点多项式 $\pi_m$，写 $p=q\pi_m+r$，其中 $\deg q,\deg r\le m-1$。正交性使第一项积分为零；节点处第一项也为零；插值型公式对 $r$ 精确。
3. 证明权重为正：对 Lagrange 基函数平方 $\ell_i^2$ 使用精确性，得到 $A_i=\int_a^b\rho\ell_i^2dx>0$。因此若各函数值误差不超过 $\delta$，求积值误差不超过 $\delta\int_a^b\rho dx$。

若在有限区间内 $f\in C^{2m}$，用首一节点多项式 $\pi_m(x)=\prod_i(x-x_i)$，则

$$
R(f)=\frac{f^{(2m)}(\xi)}{(2m)!}\int_a^b\rho(x)\pi_m(x)^2dx.
$$

此处平方非负，故能得到单一 $\xi$ 的余项；可由在每个节点同时匹配函数值和一阶导数的 Hermite 插值推出。

#### 2．Gauss–Legendre：$[-1,1]$，权函数1

节点为 Legendre 多项式 $P_m$ 的零点，取标准归一化 $P_m(1)=1$：

$$
A_i=\frac{2}{(1-x_i^2)[P_m'(x_i)]^2}.
$$

| 点数 | 节点 | 对应权重 | 代数精度 |
|---:|---|---|---:|
| 1 | $0$ | $2$ | 1 |
| 2 | $-1/\sqrt3,\ 1/\sqrt3$ | $1,1$ | 3 |
| 3 | $-\sqrt{3/5},0,\sqrt{3/5}$ | $5/9,8/9,5/9$ | 5 |

普通区间先换元：

$$
x=\frac{a+b}2+\frac{b-a}2t,\qquad
\int_a^bf(x)dx\approx\frac{b-a}2
\sum_iA_i f\!\left(\frac{a+b}2+\frac{b-a}2t_i\right).
$$

两点公式可写成 $(b-a)[f(c-d/\sqrt3)+f(c+d/\sqrt3)]/2$，其中 $c=(a+b)/2$、$d=(b-a)/2$。常见失误是漏掉外面的 Jacobian 因子 $(b-a)/2$。

在 $[-1,1]$ 上，一般误差常数为

$$
R_m(f)=\frac{2^{2m+1}(m!)^4}{(2m+1)[(2m)!]^3}f^{(2m)}(\xi).
$$

例如两点公式误差为 $f^{(4)}(\xi)/135$。原创核对：对 $x^4$，两点公式给 $2/9$，积分为 $2/5$，误差 $8/45=24/135$；对三次以下多项式则精确。

**两点公式的手工构造：** 利用对称性，设 $Q=A[f(-t)+f(t)]$。常数精确要求 $2A=2$，二次项精确要求 $2At^2=2/3$，故 $A=1,t=1/\sqrt3$；一次和三次项因对称性自动精确。最后用四次项证明精度不能继续提高。

**换元计算例：** 对 $\int_0^2(x^3+1)dx$，变换后两节点为 $1\pm1/\sqrt3$，外部因子为1。代入得 $(1-t)^3+(1+t)^3+2=4+6t^2=6$，与精确积分相同。原因是仿射变换不改变多项式次数，三次多项式仍在两点 Gauss 的精度范围内。

#### 3．其他常见 Gauss 公式

| 类型 | 区间及权函数 | 节点与权重 |
|---|---|---|
| 第一类 Gauss–Chebyshev | $[-1,1]$，$\rho=(1-x^2)^{-1/2}$ | $x_i=\cos\frac{(2i-1)\pi}{2m}$，$A_i=\pi/m$ |
| 第二类 Gauss–Chebyshev | $[-1,1]$，$\rho=\sqrt{1-x^2}$ | $x_i=\cos\frac{i\pi}{m+1}$，$A_i=\frac\pi{m+1}\sin^2\frac{i\pi}{m+1}$ |
| Gauss–Laguerre | $[0,\infty$)，$\rho=e^{-x}$ | 节点为标准 Laguerre 多项式 $L_m$ 的零点；$A_i=\frac{x_i}{(m+1)^2[L_{m+1}(x_i)]^2}$ |
| Gauss–Hermite | $(-\infty,\infty)$，$\rho=e^{-x^2}$ | 节点为物理学型 Hermite 多项式 $H_m$ 的零点；$A_i=\frac{2^{m-1}m!\sqrt\pi}{m^2[H_{m-1}(x_i)]^2}$ |

各式 $i=1,\ldots,m$，代数精度均针对去掉权函数后的 $f$，为 $2m-1$。例如 Chebyshev 公式近似 $\int_{-1}^1f(x)/\sqrt{1-x^2}\,dx$，节点上代入 $f(x_i)$，不能再除一次平方根。Laguerre 与 Hermite 的无穷积分还需检查被积函数可积。不同 Hermite 归一化对应不同节点尺度，不能混用。常见 Gauss 权函数、正交节点与权重可核对 [NIST DLMF Gauss 求积部分](https://dlmf.nist.gov/3.5#v)。

**本章答题顺序：** 给公式求代数精度，用矩条件；给节点求系数，用插值基积分或矩条件；要求最高精度并且节点可选，用正交多项式；给定误差限，用导数上界选分段数；计算非标准区间的 Gauss 积分，先换元。

## 第8章　常微分方程的数值解法

**重点：8.1、8.2.1、8.2.2、8.3.1、8.4。排除：8.2.3 Taylor展开方法、8.3.2变步长 Runge–Kutta 方法。** 下文 Taylor 展开只用于推导和误差分析，不把被排除的 Taylor 法另列为考试算法。

### 8.1　初值问题、网格与差分构造

考虑

$$
y'=f(x,y),\quad y(a)=y_0,\qquad
x_n=a+nh,\quad y_n\approx y(x_n).
$$

典型充分条件：$f$ 连续，且对 $y$ 满足 Lipschitz 条件

$$
\vert f(x,u)-f(x,v)\vert \le L\vert u-v\vert .
$$

在相应存在区间内，可保证初值问题解的唯一性；若 $f_y$ 连续且有界，可用 $\sup\vert f_y\vert $ 作为 $L$。仅有连续性通常不够保证唯一解。

两种构造入口：用差商近似 $y'$，或用积分恒等式

$$
y(x_{n+1})=y(x_n)+\int_{x_n}^{x_{n+1}}f(x,y(x))dx.
$$

对积分用左矩形得到显式 Euler；用右矩形得到隐式 Euler；用梯形得到隐式梯形法。单步法只依赖当前近似值 $y_n$ 构造下一步；多步法还用更早的近似值。显式法直接计算下一步，隐式法通常需要解代数方程。

**（虽不考，但有助于理解8.1中Euler公式怎样从导数变成递推；来源：7.5数值微分。）**

前向差商把导数近似为 $[y(x+h)-y(x)]/h$。把这个差商代入 $y'=f(x,y)$，移项就得到 $y_{n+1}=y_n+hf(x_n,y_n)$。精确解的Taylor展开说明，差商与导数之间是 $O(h)$ 的偏差；乘回步长后，一步函数值的偏差便是 $O(h^2)$。这帮助理解8.2.2“Euler局部二阶、全局一阶”的来源。7.5的其他微分公式不需在此展开，Euler及其误差分析本身仍是重点。

### 8.2.1　Euler、改进 Euler 与梯形法

#### 1．三种必须区分的格式

显式 Euler：

$$
y_{n+1}=y_n+h f(x_n,y_n).
$$

隐式 Euler：

$$
y_{n+1}=y_n+h f(x_{n+1},y_{n+1}).
$$

隐式梯形法：

$$
y_{n+1}=y_n+\frac h2
[f(x_n,y_n)+f(x_{n+1},y_{n+1})].
$$

**改进 Euler／Heun／显式梯形法：先预测，再校正一次。**

$$
\widetilde y_{n+1}=y_n+h f(x_n,y_n),
\qquad
y_{n+1}=y_n+\frac h2
[f(x_n,y_n)+f(x_{n+1},\widetilde y_{n+1})].
$$

Heun 法是显式二阶法。它与隐式梯形法右端代入的量不同，稳定函数也不同，不能因同为二阶而混同。

有些资料把显式中点法也称“改进 Euler”，故答题以公式为准：

$$
y_{n+1}=y_n+h f\!\left(x_n+\frac h2,
y_n+\frac h2f(x_n,y_n)\right).
$$

若对隐式梯形方程反复迭代，可取

$$
z^{(0)}=y_n+hf_n,\qquad
z^{(k+1)}=y_n+\frac h2[f_n+f(x_{n+1},z^{(k)})].
$$

在映射保持迭代区域且 $hL/2<1$ 时，迭代为压缩映射并收敛。仅做一次校正得到 Heun；迭代收敛后才得到隐式梯形法的解。

**手算例：** $y'=x+y, y(0)=1, h=0.1$。显式 Euler 得 $y_1=1.1$。Heun 先得预测值 $1.1$，再计算 $y_1=1+0.05(1+1.2)=1.11$。隐式梯形则解 $y_1=1+0.05(1+0.1+y_1)$，得 $y_1=1.055/0.95\approx1.1105263$。三者不能互相代替。

### 8.2.2　局部误差、全局误差与误差阶

#### 1．先分清两种“局部截断误差”记号

对单步法 $y_{n+1}=y_n+h\Phi(x_n,y_n,h)$，从精确起点走一步，定义未除以步长的局部误差

$$
d_{n+1}=y(x_{n+1})-y(x_n)-h\Phi(x_n,y(x_n),h).
$$

若教材定义截断误差为 $\tau_{n+1}=d_{n+1}/h$，则 $p$ 阶方法满足

$$
d_{n+1}=O(h^{p+1}),\qquad
\tau_{n+1}=O(h^p).
$$

全局误差为 $e_n=y(x_n)-y_n$。在稳定、足够光滑、初值准确等条件下，固定区间内 $e_n=O(h^p)$。局部误差假设上一步精确，全局误差包含此前所有步骤传播来的误差。

| 方法 | 未除 $h$ 的局部误差 | 全局误差阶 |
|---|---|---|
| 显式／隐式 Euler | $O(h^2)$ | 1 |
| Heun、显式中点、隐式梯形 | $O(h^3)$ | 2 |
| 三阶 RK | $O(h^4)$ | 3 |
| 经典四阶 RK | $O(h^5)$ | 4 |

对隐式格式，把真解代入原方程得到的残差，和解出隐式一步映射后定义的局部误差，具体表达式可能不同；在步方程适定条件下阶数一致。

#### 2．如何判断阶数

沿精确解展开：

$$
y(x+h)=y+h f+\frac{h^2}{2}(f_x+f_yf)+O(h^3).
$$

再将数值格式展开到同样阶数，比较系数。若到 $h^p$ 均匹配，首次不匹配在 $h^{p+1}$，则方法为 $p$ 阶。一般方程需要比较 $f_x,f_yf,\ldots$ 等独立项；只对 $y'=\lambda y$ 检验，通常不足以证明一般非线性问题的阶数。

显式 Euler 的局部误差为 $h^2y''(\xi_n)/2$。若 $\Vert y''\Vert _\infty\le M_2$、初始误差为零，则

$$
\vert e_n\vert \le\frac{M_2h}{2L}
\bigl(e^{L(x_n-a)}-1\bigr),\qquad L>0.
$$

$L=0$ 时取极限，右端为 $M_2h(x_n-a)/2$。这同时说明“局部二阶、全局一阶”的原因：固定区间需要约 $1/h$ 步，局部误差累积并传播。

**Heun 二阶的证明：** 从精确值 $y=y(x_n)$ 出发，记 $f=f(x_n,y)$。第二次斜率计算满足
$$
f(x_n+h,y+hf)=f+h(f_x+f_yf)+O(h^2).
$$
代回平均斜率，数值一步为 $y+hf+h^2(f_x+f_yf)/2+O(h^3)$，与精确解的展开匹配至二次项，故未除步长的局部误差为三阶。这个推导也解释了为什么只多算一次右端函数，就能提高一阶，而不必显式计算偏导数。

阶数描述的是步长趋零时的规律。若一阶法的主误差常数较小、二阶法的主误差常数较大，在某个粗网格上也可能出现一阶法更准；这不推翻阶数结论。比较实际精度时应同时考虑误差常数、稳定性和函数计算次数。

### 8.3.1　Runge–Kutta 方法的构造

**（虽不考，但有助于理解8.3.1为什么通过匹配Taylor系数来构造高阶RK；来源：8.2.3 Taylor展开方法。）**

Taylor方法的直观做法是直接使用 $y',y'',\ldots$ 构造高阶一步近似；例如二阶项需要 $y''=f_x+f_yf$。问题是高阶导数越来越难算。RK改为在若干临时位置计算 $f$，再加权组合斜率，让所得展开与精确解的Taylor展开匹配到要求的阶数，从而避免显式计算这些高阶导数。因此，本处只理解Taylor方法提供了“要匹配哪些项”的参照；不要求另行背诵或实施被划叉的Taylor数值算法。Taylor展开及RK阶条件作为本节推导工具仍须掌握。

#### 1．一般显式 RK 格式

$$
k_i=f\!\left(x_n+c_i h,
y_n+h\sum_{j=1}^{i-1}a_{ij}k_j\right),\quad i=1,\ldots,s,
\qquad y_{n+1}=y_n+h\sum_{i=1}^sb_i k_i.
$$

这里 $k_i$ 是斜率，没有预先乘 $h$；另一些教材把 $h f$ 定义为 $K_i$，对应最终加权和就不再乘一次 $h$。必须统一一种记法。$s$ 为级数，即每步函数计算次数；级数不等于阶数。

采用通常的内部一致性 $c_i=\sum_j a_{ij}$，记 $c=A\mathbf1$。常用阶条件为：

$$
\begin{array}{ll}
\text{一阶：}&\displaystyle\sum_i b_i=1;\\
\text{二阶增加：}&\displaystyle\sum_i b_i c_i=\frac12;\\
\text{三阶增加：}&\displaystyle\sum_i b_i c_i^2=\frac13,
\qquad\sum_{i,j}b_i a_{ij}c_j=\frac16.
\end{array}
$$

每个高阶条件集合都包含前面低阶条件。需要检查四阶时，再增加

$$
\sum_i b_ic_i^3=\frac14,\quad
\sum_{i,j}b_ic_i a_{ij}c_j=\frac18,\quad
\sum_{i,j}b_i a_{ij}c_j^2=\frac1{12},\quad
\sum_{i,j,k}b_i a_{ij}a_{jk}c_k=\frac1{24}.
$$

待定系数题先列出每一级的 $a_{ij},c_i,b_i$，再按目标阶数列条件，最后代回检验。三级方法满足前三阶条件只说明至少三阶；要证明恰为三阶，可检验某条四阶条件失败，或给出一个导致四阶局部项非零的光滑方程。对一般非线性方程，四阶需要四条新增条件；只匹配指数函数 $e^z$ 的四阶系数，会漏掉描述非线性耦合的条件。

#### 2．二级二阶 RK 的一般形式

设

$$
k_1=f(x_n,y_n),\qquad
k_2=f(x_n+\alpha h,y_n+\beta h k_1),\qquad
y_{n+1}=y_n+h(b_1k_1+b_2k_2).
$$

对一般非自治方程，二阶条件为

$$
b_1+b_2=1,\qquad b_2\alpha=\frac12,\qquad b_2\beta=\frac12.
$$

因此 $\alpha=\beta\ne0$，$b_2=1/(2\alpha)$，$b_1=1-1/(2\alpha)$。取 $\alpha=1$ 得 Heun；取 $\alpha=1/2$ 得显式中点；取 $\alpha=2/3$ 得 $b_1=1/4,b_2=3/4$。

二级显式 RK 一般不能达到三阶：其 $\sum_{i,j}b_i a_{ij}c_j=0$，无法等于 $1/6$。

#### 3．代表性的三阶与经典四阶格式

三级三阶 Kutta 法：

$$
\begin{aligned}
k_1&=f(x_n,y_n),\\
k_2&=f(x_n+h/2,y_n+hk_1/2),\\
k_3&=f(x_n+h,y_n-hk_1+2hk_2),\\
y_{n+1}&=y_n+\frac h6(k_1+4k_2+k_3).
\end{aligned}
$$

经典四级四阶 RK：

$$
\begin{aligned}
k_1&=f(x_n,y_n),\\
k_2&=f(x_n+h/2,y_n+hk_1/2),\\
k_3&=f(x_n+h/2,y_n+hk_2/2),\\
k_4&=f(x_n+h,y_n+hk_3),\\
y_{n+1}&=y_n+\frac h6(k_1+2k_2+2k_3+k_4).
\end{aligned}
$$

手算时按 $k_1\to k_2\to k_3\to k_4$ 顺序计算，每一级都从 $y_n$ 构造，不把上一级临时状态直接当新的初值。对 $y'=y, y_0=1, h=0.1$，一级四个斜率分别为 $1,1.05,1.0525,1.10525$，得到 $y_1=1.1051708333$。

### 8.4　单步法的相容性、收敛性与稳定性

#### 1．三个概念

相容性：当 $h\to0$，截断误差趋于零；对连续的单步增量函数，常写 $\Phi(x,y,0)=f(x,y)$。

收敛性：固定有限区间上，当网格变细时，$\max_n\vert y(x_n)-y_n\vert \to0$。

稳定性：初始值、每步数据等微小扰动不会在固定区间上被无界放大。它与下面检验长期衰减行为的“绝对稳定性”有关，但概念不能直接等同。

若 $\Phi$ 对第二变量满足与小步长无关的 Lipschitz 条件，常数为 $L_\Phi$，且 $d_{n+1}=O(h^{p+1})$，则

$$
\vert e_{n+1}\vert \le(1+hL_\Phi)\vert e_n\vert +C h^{p+1}.
$$

迭代得

$$
\vert e_n\vert \le e^{L_\Phi(x_n-a)}\vert e_0\vert 
+\frac C{L_\Phi}\bigl(e^{L_\Phi(x_n-a)}-1\bigr)h^p.
$$

因此在准确或 $p$ 阶准确的初值下得到 $p$ 阶收敛；$L_\Phi=0$ 时按极限解释。证明题核心是“写误差递推—Lipschitz 控制—求几何和”，不能只写一句“局部误差加起来”。

#### 2．绝对稳定域

把格式用于检验方程

$$
y'=\lambda y,\qquad \operatorname{Re}\lambda<0,\qquad z=h\lambda,
$$

得到 $y_{n+1}=R(z)y_n$。$R$ 为稳定函数；

$$
\vert R(z)\vert <1
$$

保证数值解随步数增加趋于零。有的教材把边界也纳入稳定域，写成 $\mathcal S=\{z:\vert R(z)\vert \le1\}$；边界上通常只有不增长，不能保证衰减。题目出现“渐近稳定”时，应注意严格不等号。这个边界约定及 Euler 稳定圆可核对 [NTNU 单步法稳定性讲义](https://www.math.ntnu.no/emner/TMA4130/2022h/html_notes/NumODE_part2.html)。

| 方法 | 稳定函数 $R(z)$ | 负实轴上的衰减条件 |
|---|---|---|
| 显式 Euler | $1+z$ | $-2<z<0$ |
| Heun／显式中点 | $1+z+z^2/2$ | $-2<z<0$ |
| 隐式 Euler | $1/(1-z)$ | 全部 $z<0$ |
| 隐式梯形 | $(1+z/2)/(1-z/2)$ | 全部 $z<0$ |
| 经典 RK4 | $1+z+z^2/2+z^3/6+z^4/24$ | 约 $-2.7853<z<0$ |

显式 Euler 的稳定域为复平面中圆心 $-1$、半径1的圆盘；隐式 Euler 的稳定域满足 $\vert 1-z\vert \ge1$；隐式梯形的闭稳定域为左半平面。复数 $\lambda$ 必须检验整个复平面条件，不能只套负实轴区间。

**A稳定：** 稳定域包含整个左半平面。隐式 Euler、隐式梯形均 A 稳定；显式 Euler、Heun、经典 RK4 均非 A 稳定。显式 RK 的稳定函数是非常数多项式，沿负实轴趋于无穷时不可能始终有界，故不可能 A 稳定。

高阶不意味着允许任意大步长。例：$y'=-10y$，显式 Euler 的衰减要求 $0<h<0.2$；$h=0.25$ 时放大因子为 $-1.5$，数值解交替发散，尽管精确解衰减。隐式梯形虽 A 稳定，当 $z\to-\infty$ 时 $R(z)\to-1$，可能出现缓慢衰减的交替振荡；隐式 Euler 则 $R(z)\to0$。因此“稳定”也不等于“结果已经准确”。

## 第8章选择性考部分（未标三角）

**8.5、8.6、8.7未标三角，也未划叉，按用户澄清列为选择性考。**

### 8.5　线性多步法

一般 $k$ 步法：

$$
\sum_{j=0}^k\alpha_jy_{n+j}
=h\sum_{j=0}^k\beta_j f_{n+j},\qquad \alpha_k\ne0.
$$

$\beta_k=0$ 为显式；否则通常为隐式。需要 $k$ 个起步值，可用 RK 法启动。

两个二阶实例：Adams–Bashforth 两步法

$$
y_{n+1}=y_n+\frac h2(3f_n-f_{n-1});
$$

Adams–Moulton 二阶法即隐式梯形法。常见更高阶 Adams 格式为

$$
\begin{aligned}
\text{AB3: }y_{n+1}&=y_n+\frac h{12}(23f_n-16f_{n-1}+5f_{n-2}),\\
\text{AB4: }y_{n+1}&=y_n+\frac h{24}(55f_n-59f_{n-1}+37f_{n-2}-9f_{n-3}),\\
\text{AM3: }y_{n+1}&=y_n+\frac h{12}(5f_{n+1}+8f_n-f_{n-1}),\\
\text{AM4: }y_{n+1}&=y_n+\frac h{24}(9f_{n+1}+19f_n-5f_{n-1}+f_{n-2}).
\end{aligned}
$$

这里 AB3／AM3 中的3指阶数，不能一概当作所需历史步数。构造思路：对 $f(x,y(x))$ 用过去节点或包括未来节点的插值多项式代替，再积分。

以 AB2 为例，令 $t=(x-x_n)/h$，在 $t=0,-1$ 上线性插值右端函数，得到 $p(t)=(1+t)f_n-tf_{n-1}$。在 $t\in[0,1]$ 上积分，两个权重分别为 $3/2,-1/2$，即得到 AB2。一般 Adams 待定权重 $\gamma_j$ 也可通过 $\sum_j\gamma_jt_j^\ell=1/(\ell+1)$ 求得，右端是 $\int_0^1t^\ell dt$。

预测—校正做法先用显式公式预测未来值，再把预测值代入隐式公式的未来斜率。做有限次校正得到的是特定预测—校正算法，其稳定性需分析实际执行的组合；不能直接照搬完全解出隐式公式时的稳定结论。起步值精度也应与目标全局阶数相配，否则可能由起步误差主导最终结果。

设 $\rho(\zeta)=\sum\alpha_j\zeta^j$、$\sigma(\zeta)=\sum\beta_j\zeta^j$。相容条件为 $\rho(1)=0$、$\rho'(1)=\sigma(1)$；等价于

$$
\sum_j\alpha_j=0,\qquad\sum_jj\alpha_j=\sum_j\beta_j.
$$

达到至少 $p$ 阶还需对 $\ell=1,\ldots,p$ 满足

$$
\sum_j\alpha_jj^\ell=\ell\sum_j\beta_jj^{\ell-1}.
$$

零稳定根条件：$\rho$ 的全部根满足 $\vert \zeta\vert \le1$，且单位圆上的根必须为单根。在适当光滑性及起步值收敛等条件下，线性多步法收敛当且仅当相容且零稳定。绝对稳定需进一步检查 $\rho(\zeta)-z\sigma(\zeta)=0$ 的根；不要只检验 $\rho$。

### 8.6　方程组与高阶方程

对 $\mathbf y'=\mathbf f(x,\mathbf y)$，Euler 和 RK 公式直接向量化，每级同时计算全部分量。求某一级时，所有分量都应使用同一级状态。

对 $y^{(m)}=F(x,y,y',\ldots,y^{(m-1)})$，令

$$
u_1=y, u_2=y',\ldots,u_m=y^{(m-1)},
\quad u_1'=u_2,\ldots,u_{m-1}'=u_m,\quad
u_m'=F(x,u_1,\ldots,u_m).
$$

初值也必须转为 $m$ 个分量。例：$y''+y=0$ 化为 $u_1'=u_2, u_2'=-u_1$。

### 8.7　两点边值问题：打靶与差分

对 $y''=F(x,y,y')$、$y(a)=\alpha,y(b)=\beta$，打靶法把未知初始斜率设为 $s$，解初值问题 $y(a)=\alpha,y'(a)=s$，再解标量方程 $G(s)=y(b;s)-\beta=0$。可用割线法：

$$
s_{k+1}=s_k-G(s_k)\frac{s_k-s_{k-1}}{G(s_k)-G(s_{k-1})}.
$$

每次算 $G$ 都要积分一次初值问题；分母为零不能继续套式。端点失配既含打靶迭代误差，也含初值积分误差；长区间或敏感问题可能放大斜率扰动。

线性方程 $y''=p(x)y'+q(x)y+r(x)$ 可用线性打靶减少重复积分：分别解非齐次问题 $u(a)=\alpha,u'(a)=0$ 和齐次问题 $v(a)=0,v'(a)=1$，则 $y=u+sv$。当 $v(b)\ne0$ 时，直接取 $s=[\beta-u(b)]/v(b)$。若 $v(b)=0$，须检查边界条件是否导致无解或非唯一解，不能除以零。

对线性边值问题 $-y''+p(x)y'+q(x)y=r(x)$，中心差分给

$$
\left(-\frac1{h^2}-\frac{p_i}{2h}\right)y_{i-1}
+\left(\frac2{h^2}+q_i\right)y_i
+\left(-\frac1{h^2}+\frac{p_i}{2h}\right)y_{i+1}=r_i.
$$

将两端已知边界值移到右端，得到三对角线性方程组。解足够光滑且离散问题稳定时，全局误差通常为 $O(h^2)$。只有截断误差二阶，尚不足以单独证明收敛二阶；还需稳定性或逆矩阵的一致估计。

**最小差分例：** $-y''=2,\ y(0)=y(1)=0$，只取一个内点 $x_1=1/2$。步长 $h=1/2$，方程为 $2y_1/h^2=2$，故 $y_1=1/4$。精确解为 $y=x(1-x)$，内点值相同；因为中心二阶差分对二次多项式的二阶导数恰好精确。一般函数无此精确性，应按二阶误差估计。
### 第7、8章习题训练入口

用户指定：第7章1、2、3、4、7、8、10、13、14题；第8章3、7、11题。尚未拿到对应版次题面，不能把题号擅自匹配到具体知识点，也不编写所谓原题答案。

逐题复习时，求积题记录“节点／权函数／代数精度／误差常数／步长含义”；ODE题记录“格式／每级斜率／局部误差定义／全局阶数／稳定函数”。这两张记录框架覆盖本章计算题、证明题的主要检查项。

## 第9章　偏微分方程差分方法【不考】

**本章明确不考。** 无指定习题。以下内容只作背景。 以下按9.1—9.3组织基础知识。格式的精度依赖解的光滑性，稳定性结论也须结合边界条件；不能脱离模型直接搬用。

### 共同基础：建立格式、截断误差、稳定、收敛

取空间步长 $h$、时间步长 $\tau$，$x_i=ih$，$t_n=n\tau$，$U_i^n\approx u(x_i,t_n)$。求解顺序是：划分网格 → 用差商替代导数 → 写初值、边值 → 求解代数方程或按时间推进 → 分析误差与稳定性。

常用替代式：

$$
u_t(x_i,t_n)=\frac{u_i^{n+1}-u_i^n}{\tau}+O(\tau),
\qquad
u_x(x_i,t_n)=\frac{u_{i+1}^n-u_{i-1}^n}{2h}+O(h^2),
$$

$$
u_{xx}(x_i,t_n)=\frac{u_{i-1}^n-2u_i^n+u_{i+1}^n}{h^2}+O(h^2).
$$

**（虽不考，但有助于理解本章如何把PDE变成网格上的代数方程；来源：7.5数值微分。）** 上述差商用相邻点的函数值近似导数，余项说明近似会随网格细化而改善。差商构造来自7.5，第9章本身也不考。相容、稳定、收敛的考试版本在第8章单步法。

- **相容性：**把精确解代入离散方程，所得截断误差随步长趋零而趋零。
- **稳定性：**初始、边界及计算误差的传播受到与网格无关的适当界控制。
- **收敛性：**数值解趋近精确解。对适定线性初值问题和相容线性差分格式，在适当范数及一致性假设下，Lax等价定理联系稳定与收敛；不能把它无条件推广到任意非线性问题。
- **Fourier／von Neumann分析：**在线性常系数、无限或周期网格上代入 $E_i^n=G(\theta)^ne^{\mathrm i i\theta}$，求放大因子。常见收缩型判据是所有波数均满足 $\vert G(\theta)\vert \le1$；一般有限时间稳定性可允许 $\vert G\vert \le1+C\tau$。有限区间还要检查边界处理。

### 9.1　椭圆型边值问题

#### 9.1.1　五点差分与矩阵方程

以矩形区域上

$$
-\Delta u=f,\qquad u\vert _{\partial\Omega}=g
$$

为例。等距方格内部点满足五点格式

$$
4U_{ij}-U_{i-1,j}-U_{i+1,j}-U_{i,j-1}-U_{i,j+1}=h^2f_{ij}.
$$

若题目写 $\Delta u=f$，右端符号相反。$x,y$ 方向不同步长时，分别用 $1/h_x^2$、$1/h_y^2$ 加权，不能套等权五点式。

把内部节点按固定次序编号后写成 $AU=b$。已知边界值移到右端；内部未知数才进入矩阵。对标准Dirichlet问题，$-\Delta_h$ 对应对称正定稀疏矩阵。解足够光滑、边界处理匹配时，五点格式整体通常为二阶精度。

手算例：单位正方形只留中心一个内部点，$h=1/2$，$-\Delta u=1$、边界为零。离散方程 $4U=h^2=1/4$，所以 $U=1/16$。它是离散近似值，不能称为中心处解析解。

#### 9.1.2　一般区域的边界处理

矩形规则网格可直接设置边界节点；曲边可能在相邻网格点之间截断网格线。这时应用实际交点距离构造单边／非等距差分或插值边界值。

若某方向左右距离为 $h_-,h_+$，三点二阶导近似为

$$
u''(x_i)\approx\frac2{h_-+h_+}
\left(\frac{U_{i+1}-U_i}{h_+}-\frac{U_i-U_{i-1}}{h_-}\right).
$$

等距时退化为标准中心差分。一般非等距下，其局部误差含与 $h_+-h_-$ 有关的一阶项，不能默认仍为二阶；整体误差要结合边界格式判断。

Dirichlet条件给函数值；Neumann条件给法向导数；Robin条件给二者线性组合。导数边界可用单边差分或虚拟节点，再由边界关系消去额外未知量。纯Neumann Poisson问题需要相容条件，且解只确定到一个加法常数；应补充均值等归一化条件。具体地，对 $-\Delta u=f$、外法向导数 $\partial_nu=g$，由散度定理要求 $\int_\Omega f\,dx+\int_{\partial\Omega}g\,ds=0$。

#### 9.1.3　存在唯一性、最大值原理与迭代求解

对标准连通网格，若 $\Delta_hV\ge0$，离散最大值受边界最大值控制。思路：内部严格最大值不可能同时满足其值不超过邻点平均；若相等，最大值向相邻节点传播，最终到达边界。该原理可用于唯一性和最大模误差估计，见[加州大学欧文分校陈龙的Poisson差分讲义](https://www.math.uci.edu/~chenlong/226/FDM.pdf)。

若两个离散解具有相同方程及边值，相减得齐次方程和零边界，最大值原理推出差为零；有限维方阵因唯一性而可逆，从而存在唯一解。

Jacobi更新为

$$
U_{ij}^{(k+1)}=\frac14\left(U_{i-1,j}^{(k)}+U_{i+1,j}^{(k)}+U_{i,j-1}^{(k)}+U_{i,j+1}^{(k)}+h^2f_{ij}\right).
$$

Gauss–Seidel按扫描顺序使用已更新的邻点；SOR在旧值与GS候选值之间加松弛。标准Dirichlet五点矩阵可用其结构证明Jacobi和GS收敛，SOR还要求 $0<\omega<2$；不能仅用“矩阵SPD”就推断任意Jacobi都收敛。

### 9.2　抛物型方程

#### 9.2.1　一维热方程的三种基本格式

模型为 $u_t=\kappa u_{xx}+s(x,t)$，$\kappa>0$。设 $r=\kappa\tau/h^2$。

**显式格式：**

$$
U_i^{n+1}=rU_{i-1}^n+(1-2r)U_i^n+rU_{i+1}^n+\tau s_i^n.
$$

局部微分方程残差为 $O(\tau+h^2)$；光滑且稳定时整体也通常为 $O(\tau+h^2)$。经典一维稳定条件 $0\le r\le1/2$。

**全隐式格式：**

$$
-rU_{i-1}^{n+1}+(1+2r)U_i^{n+1}-rU_{i+1}^{n+1}
=U_i^n+\tau s_i^{n+1}.
$$

时间一阶、空间二阶；标准热方程下无条件稳定，每一步解线性方程组。

**Crank–Nicolson格式：**

$$
-\frac r2U_{i-1}^{n+1}+(1+r)U_i^{n+1}-\frac r2U_{i+1}^{n+1}
=\frac r2U_{i-1}^n+(1-r)U_i^n+\frac r2U_{i+1}^n
+\frac\tau2(s_i^{n+1}+s_i^n).
$$

时间二阶、空间二阶；标准热方程下无条件稳定，但大步长可能导致高频分量正负振荡。稳定不代表单调、不振荡或误差小。

#### 9.2.2　放大因子与稳定条件的推导

忽略源项，代入Fourier误差模态：

| 格式 | 放大因子 $G(\theta)$ | 条件 |
|---|---|---|
| 显式 | $1-4r\sin^2(\theta/2)$ | $r\le1/2$ |
| 全隐式 | $1/[1+4r\sin^2(\theta/2)]$ | 任意 $r\ge0$ |
| CN | $[1-2r\sin^2(\theta/2)]/[1+2r\sin^2(\theta/2)]$ | 任意 $r\ge0$ |

显式推导只需要求 $-1\le1-4r\sin^2(\theta/2)\le1$，最危险波数满足 $\sin^2(\theta/2)=1$。

统一的加权格式为

$$
\frac{U^{n+1}-U^n}{\tau}
=\kappa[\vartheta\delta_{xx}U^{n+1}+(1-\vartheta)\delta_{xx}U^n],\quad0\le\vartheta\le1.
$$

其放大因子是

$$
G=\frac{1-4(1-\vartheta)r\sin^2(\theta/2)}
{1+4\vartheta r\sin^2(\theta/2)}.
$$

$\vartheta\ge1/2$ 时无条件稳定；$0\le\vartheta<1/2$ 时要求 $r\le1/[2(1-2\vartheta)]$。$\vartheta=1/2$ 时间二阶，其余固定权重一般时间一阶。

算例：$\kappa=1$、$h=0.1$，显式热方程格式要求 $\tau\le0.005$。空间步长减半，允许时间步长变为原来的四分之一。

#### 9.2.3　高维问题

二维 $u_t=\kappa(u_{xx}+u_{yy})$，显式格式中设 $r_x=\kappa\tau/h_x^2$、$r_y=\kappa\tau/h_y^2$，中心点系数为 $1-2r_x-2r_y$。标准稳定条件为

$$
r_x+r_y\le\frac12.
$$

等距二维要求 $r\le1/4$，等距三维要求 $r\le1/6$。全隐式及CN可按矩阵形式推广，但每步线性系统更大。

交替方向隐式法ADI的基本想法：将多维隐式计算拆成若干一维隐式计算。例如令 $A_x=\kappa\delta_{xx}$、$A_y=\kappa\delta_{yy}$，二维齐次问题的Peaceman–Rachford形式为

$$
(I-\tfrac\tau2A_x)U^{n+1/2}=(I+\tfrac\tau2A_y)U^n,
$$

$$
(I-\tfrac\tau2A_y)U^{n+1}=(I+\tfrac\tau2A_x)U^{n+1/2}.
$$

标准矩形常系数且边界处理合适时，可获得时间二阶和无条件稳定；复杂非齐次边界或变系数情形需另行分析。应掌握分方向思想，具体教材采用的分裂格式按课堂记号代入。

### 9.3　双曲型方程

#### 9.3.1　一阶输运方程

模型 $u_t+cu_x=0$ 的精确信息沿 $x-ct=\text{常数}$ 传播。记Courant数 $\nu=c\tau/h$。边界数据应给在流入端：$c>0$ 给左端，$c<0$ 给右端，不能任意给两端条件。

**迎风格式：**$c>0$ 时

$$
U_i^{n+1}=U_i^n-\nu(U_i^n-U_{i-1}^n).
$$

$c<0$ 时使用前向空间差分 $U_{i+1}^n-U_i^n$。它沿信息来源取值，通常为时间一阶、空间一阶；稳定条件 $\vert \nu\vert \le1$。可用 $c^+=\max(c,0)$、$c^-=\min(c,0)$ 写成

$$
U_i^{n+1}=U_i^n-\frac\tau h
[c^+(U_i^n-U_{i-1}^n)+c^-(U_{i+1}^n-U_i^n)].
$$

**前向时间＋中心空间FTCS：**

$$
U_i^{n+1}=U_i^n-\frac\nu2(U_{i+1}^n-U_{i-1}^n).
$$

放大因子 $G=1-\mathrm i\nu\sin\theta$，所以 $\vert G\vert ^2=1+\nu^2\sin^2\theta$。固定非零Courant数下存在不断放大的模态，此常用推进方式不稳定；不能因空间中心差分有二阶精度而采用它。若采用更强的 $\tau=O(h^2)$ 限制，可讨论有限时间意义下的有界增长，这不是通常固定CFL比例的结论。

**Lax–Friedrichs：**

$$
U_i^{n+1}=\frac12(U_{i-1}^n+U_{i+1}^n)
-\frac\nu2(U_{i+1}^n-U_{i-1}^n).
$$

以相邻平均替代中心旧值，增添数值耗散。固定CFL比例下通常一阶，稳定条件 $\vert \nu\vert \le1$。一般精度分析还会出现 $h^2/\tau$ 项，不能认为任意独立缩小 $h,\tau$ 都保持相容。

**Lax–Wendroff：**
$$
U_i^{n+1}=U_i^n-\frac\nu2(U_{i+1}^n-U_{i-1}^n)
+\frac{\nu^2}2(U_{i+1}^n-2U_i^n+U_{i-1}^n).
$$

由时间二阶展开及方程 $u_t=-cu_x$、$u_{tt}=c^2u_{xx}$ 构造。对光滑解为二阶，标准稳定条件 $\vert \nu\vert \le1$；陡峭梯度附近可能产生振荡。

**蛙跳格式：**$U_i^{n+1}=U_i^{n-1}-\nu(U_{i+1}^n-U_{i-1}^n)$，时间、空间二阶，但需要另一个格式启动，并含计算模态。通常取严格 $\vert \nu\vert <1$ 以避免极端波数处的重复根退化。

CFL必要条件的含义是：数值依赖域必须包含真实依赖域。**满足CFL并不自动充分保证稳定**，还要检查具体格式；迎风和Lax–Wendroff在标准模型下才有上述充分结论。输运方程的典型格式及Fourier放大因子可对照[MIT 18.086课程程序说明](https://math.mit.edu/classes/18.086/2007/)。

#### 9.3.2　一阶双曲型方程组

对 $\boldsymbol u_t+A\boldsymbol u_x=0$，若常矩阵 $A=R\Lambda R^{-1}$ 具有实特征值且可对角化，令 $\boldsymbol w=R^{-1}\boldsymbol u$，得各特征分量

$$
(w_j)_t+\lambda_j(w_j)_x=0.
$$

按各 $\lambda_j$ 的正负选择迎风方向，推进后乘 $R$ 变回原变量。矩阵形式为

$$
\boldsymbol U_i^{n+1}=\boldsymbol U_i^n-\frac\tau h
[A^+(\boldsymbol U_i^n-\boldsymbol U_{i-1}^n)+A^-(\boldsymbol U_{i+1}^n-\boldsymbol U_i^n)],
$$

其中 $A^\pm=R\operatorname{diag}(\lambda_j^\pm)R^{-1}$。标准CFL限制为 $\tau\max_j\vert \lambda_j\vert /h\le1$。边界条件数量也应与进入计算区域的特征分量数匹配。

#### 9.3.3　二阶波动方程

模型 $u_{tt}=c^2u_{xx}$，需要位移初值 $u(x,0)=g(x)$ 和速度初值 $u_t(x,0)=v(x)$。中心格式为

$$
U_i^{n+1}=2U_i^n-U_i^{n-1}
+\nu^2(U_{i-1}^n-2U_i^n+U_{i+1}^n),\qquad\nu=c\tau/h.
$$

光滑解下时间、空间均二阶；经典CFL限制 $\vert \nu\vert \le1$，实际分析及选步长通常留严格余量 $\vert \nu\vert <1$。稳定性须连同首层构造和所用能量范数理解。

不能凭空给出 $U^1$。二阶首层可由

$$
U_i^0=g_i,\qquad
U_i^1=g_i+\tau v_i+\frac{\nu^2}2(g_{i-1}-2g_i+g_{i+1})
$$

构造；若方程有源项，还需加相应的 $\tau^2s_i^0/2$。随后才能使用三层递推。

#### 本章应能独立完成

- 对给定PDE与网格构造差分格式，标出模板，正确处理初值和边值。
- 对Poisson问题写出矩阵与右端，说明唯一性、正定性或最大值原理。
- 将精确解代回格式并Taylor展开，判断时间、空间误差阶。
- 用Fourier模态求放大因子，解稳定性不等式；热方程记住 $\tau/h^2$，输运与波动方程记住 $\tau/h$。
- 区分无条件稳定、CFL限制、相容性及收敛性，识别边界条件和初始层遗漏。

## 指定课后习题：46题复习清单

**题号完整保留。题目原文尚未提供，本讲义不声称包含46题逐题解答，也不虚构“第几题对应哪个知识点”。** 下面“训练目标”针对整章，完成具体题目时再按实际题意归类。文中算例均为另行编写的例题。

| 章节 | 你指定的题号 | 本章训练目标 |
|---|---|---|
| 第一章：3题 | 3、4、8 | 有效数字、误差传播、计算公式稳定改写 |
| 第二章：8题 | 3、5、11、12、14、16、17、20 | 三角分解、平方根法、范数、条件数与扰动 |
| 第三章：5题 | 1、8、9、12、16 | 写迭代矩阵、求收敛参数范围、误差估计、SOR |
| 第四章：7题 | 4、5、6、7、8、13、17 | 迭代收敛证明、收敛阶、Newton及变形 |
| 第六章：11题 | 2、3、4、8、9、10、12、16、17、18、26 | Lagrange、Newton、Hermite、分段插值、最小二乘 |
| 第七章：9题 | 1、2、3、4、7、8、10、13、14 | 代数精度、求积系数、复化误差与分段数、Gauss |
| 第八章：3题 | 3、7、11 | Euler与RK计算、局部误差、全局阶数、稳定区 |

每题检查四项：能否不翻书写出方法；是否满足定理条件；计算及误差估计是否正确；改变参数后是否仍成立。第3章3.5、第6章6.8.1、第8章8.5—8.7即使没有单列指定题，也不能因“选择性考”而直接删去。第9章整章不考。

## 易混结论总检查

| 容易混淆 | 正确区分 |
|---|---|
| 写出几位数字＝几位有效数字 | 有效数字由误差与数位共同决定 |
| 数值小＝相对误差小 | 相对误差还要除以真实值规模 |
| 病态＝算法不稳定 | 病态是问题对输入敏感；不稳定是算法放大计算误差 |
| $\det A\ne0$ 就能不换行做LU | 还要满足适当顺序主子式非零条件 |
| 矩阵2范数＝最大特征值模 | 一般是最大奇异值；对称／正规等特殊情形才等于谱半径 |
| $\Vert B\Vert \ge1$ 就发散 | 单个范数判据失效；仍应检查 $\rho(B)$ |
| 对任意初值收敛条件是 $\rho(B)\le1$ | 正确条件是严格 $\rho(B)<1$ |
| SPD保证Jacobi收敛 | 不成立；SPD保证GS，以及 $0<\omega<2$ 时的SOR收敛 |
| SOR参数在 $(0,2)$ 对任意矩阵都足够 | 对SPD矩阵是充分条件；一般矩阵中只是必要条件之一 |
| $\vert \varphi'(\alpha)\vert =1$ 就发散 | 一阶导数判据不能决定 |
| Newton法总是二阶 | 简单根且初值足够近时至少二阶；重根一般降为线性 |
| 插值多项式一定恰为 $n$ 次 | $n+1$ 个互异节点对应次数不超过 $n$ 的唯一多项式 |
| 插值次数越高越准确 | 不保证；节点选择、光滑性和Runge现象都影响结果 |
| Hermite与三次样条一样 | 前者可使用给定导数；一般分段三次Hermite为 $C^1$，样条另有 $C^2$ 条件 |
| 最小二乘曲线必须过每个点 | 只最小化残差平方和，一般不逐点通过 |
| $m$个Gauss节点的代数精度是 $2m$ | 在正权等标准条件下最高为 $2m-1$ |
| Simpson的 $h$ 可随意代入 | 先明确 $h$ 是半面板宽还是小区间宽，误差常数随定义变化 |
| 改进Euler就是隐式梯形 | 一次Euler预测再校正是显式二阶法；真正梯形要解隐式方程 |
| 局部 $O(h^{p+1})$ 意味全局同阶 | 在稳定等条件下，全局通常为 $O(h^p)$ |
| 无条件稳定＝任意步长都准确 | 稳定控制扰动，步长仍影响截断误差及振荡 |
| 热方程与波动方程的步长限制一样 | 显式热方程通常约束 $\tau/h^2$；波动、输运约束 $\tau/h$ |

## 闭卷前应能重建的证明与推导

1. 用矩阵乘积逐行逐列比较，推出LU或Cholesky递推。
2. 从 $A\Delta x=\Delta b$ 推出条件数误差界；从残差推出解误差界。
3. 从 $e^{(k+1)}=Be^{(k)}$ 推出线性迭代收敛的谱半径条件及范数误差界。
4. 从压缩映射推出不动点存在唯一、先验和后验估计。
5. 用Taylor展开找第一个非零误差项，推出迭代阶；解释Newton重根降阶。
6. 用“多项式零点数不超过次数”证明插值唯一性与基函数恒等式。
7. 用辅助函数与Rolle定理推导Lagrange／Hermite余项。
8. 对残差平方和求偏导，得到法方程；由列满秩推出唯一性。
9. 用单项式 $1,x,x^2,\ldots$ 比较矩条件，求代数精度和待定求积系数。
10. 用节点多项式平方证明Gauss代数精度上界，用正交性证明达到上界。
11. 对单步法展开并比较系数，判定局部误差阶；累积误差递推得到全局阶。
12. 代入 $y'=\lambda y$ 求ODE稳定函数；代入Fourier模态求PDE放大因子。

这些是复习动作，不是新增考试范围。优先重建三角部分的推导，再处理选择性考部分。遇到括号标记的“虽不考，但有助于理解”段落，掌握它如何帮助当前考点即可；不能把其中的划叉来源另列为必背算法，也不能反过来把当前重点章节的公式当作不考。
