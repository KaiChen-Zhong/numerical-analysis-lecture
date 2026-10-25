import type { ExerciseItem } from "./types";

export const EXERCISES: ExerciseItem[] = [
  {
    id: "e1",
    chapter: "第1章",
    chapterId: "ch1",
    numbers: "1-3、1-4、1-8",
    goal: "按书上的有效数字定义（式 1.1）取位数；稳定地求二次方程的根；注意 1-8 的星号和 §1.3 相反。",
    problems: [
      {
        no: "1-3",
        markdown:
          "为了使 $\\sqrt{10}$ 的近似值的相对误差小于 $0.01\\%$，应取几位有效数字？",
      },
      {
        no: "1-4",
        markdown:
          "求方程 $x^2-56x+1=0$ 的两个根，使它们至少具有 4 位有效数字（$\\sqrt{3132}\\approx 55.964$）。相近根公式会抵消，先稳定地算出一根，再用两根之积求另一根。这个改写不在 §1.4 正文里。",
      },
      {
        no: "1-8",
        markdown:
          "**星号和 §1.3 相反：** 本题里 $x_1^*,x_2^*$ 分别是 $x_1,x_2$ 的近似值。证明乘积 $x_1^*x_2^*$ 的绝对误差与相对误差有近似式\n\n$$\ne(x_1^*x_2^*)\\approx x_2^*\\,e(x_1^*)+x_1^*\\,e(x_2^*),\\qquad e_r(x_1^*x_2^*)\\approx e_r(x_1^*)+e_r(x_2^*).\n$$",
      },
    ],
  },
  {
    id: "e2",
    chapter: "第2章",
    chapterId: "ch2",
    numbers: "2-3、2-5、2-11、2-12、2-14、2-16、2-17、2-20",
    goal: "LU、LDLᵀ 与平方根分解；证明范数；四种范数和条件数；正交与正定的 Cond₂。",
    problems: [
      {
        no: "2-3",
        markdown:
          "对下列矩阵 $A$ 进行 $LU$ 分解，并求解 $Ax=b$。\n\n(1) $A=\\begin{bmatrix}2&1&1\\\\1&3&2\\\\1&2&2\\end{bmatrix}$，$b=(4,6,5)^T$。\n\n(2) $A=\\begin{bmatrix}12&-3&3\\\\-18&3&-1\\\\1&1&1\\end{bmatrix}$，$b=(15,-15,6)^T$。",
      },
      {
        no: "2-5",
        markdown:
          "对 $A=\\begin{bmatrix}16&4&8\\\\4&5&-4\\\\8&-4&22\\end{bmatrix}$，$b=(1,2,3)^T$ 作 $LDL^T$ 分解和 $GG^T$ 分解，并求解 $Ax=b$。",
      },
      {
        no: "2-11",
        markdown:
          "设 $\\|\\cdot\\|$ 为一向量范数，$P$ 非奇异。定义 $\\|x\\|_P=\\|Px\\|$。证明 $\\|\\cdot\\|_P$ 也是向量范数。",
      },
      {
        no: "2-12",
        markdown:
          "设 $A$ 对称正定，定义 $\\|x\\|_A=\\sqrt{x^T Ax}$。证明 $\\|\\cdot\\|_A$ 是向量范数。",
      },
      {
        no: "2-14",
        markdown:
          "设 $A=\\begin{bmatrix}0.6&0.5\\\\0.1&0.3\\end{bmatrix}$。计算 $1$-范数、$2$-范数、$\\infty$-范数、$F$-范数及相应的条件数 $\\mathrm{Cond}(A)$。",
      },
      {
        no: "2-16",
        markdown:
          "对任意矩阵范数证明：(1) $\\|I\\|\\ge 1$；(2) $\\|A^{-1}\\|\\ge 1/\\|A\\|$；(3) $\\|A^{-1}-B^{-1}\\|\\le\\|A^{-1}\\|\\,\\|B^{-1}\\|\\,\\|A-B\\|$。",
      },
      {
        no: "2-17",
        markdown:
          "(1) $A$ 正交则 $\\mathrm{Cond}_2(A)=1$。(2) $A$ 对称正定则 $\\mathrm{Cond}_2(A)=\\lambda_1/\\lambda_n$，$\\lambda_1,\\lambda_n$ 为最大、最小特征值。",
      },
      {
        no: "2-20",
        markdown: "设 $A,B$ 为 $n$ 阶矩阵。证明 $\\mathrm{Cond}(AB)\\le\\mathrm{Cond}(A)\\,\\mathrm{Cond}(B)$。",
      },
    ],
  },
  {
    id: "e3",
    chapter: "第3章",
    chapterId: "ch3",
    numbers: "3-1、3-8、3-9、3-12、3-16",
    goal: "判断 J / GS 是否收敛并手算到误差限；SOR 对三对角的收敛范围；自己构造收敛迭代；正定矩阵上的参数范围。",
    problems: [
      {
        no: "3-1",
        markdown:
          "方程组 $8x_1-x_2+x_3=1$，$2x_1+10x_2-x_3=4$，$x_1+x_2-5x_3=3$。\n\n(1) 分析 J 与 GS 的收敛性。\n\n(2) 分别用两种方法迭代，要求 $\\|x^{(k+1)}-x^{(k)}\\|_\\infty\\le 10^{-3}$，取 $x^{(0)}=0$。",
      },
      {
        no: "3-8",
        markdown:
          "判定 SOR 求解下列方程组的收敛性：四阶三对角，主对角为 $-2$，次对角为 $1$，右端 $(1,0,0,0)^T$。",
      },
      {
        no: "3-9",
        markdown:
          "方程组 $2x_1+x_2+4x_3=6$，$x_1+4x_2+x_3=3$，$3x_1+x_2+x_3=2$。建立一个收敛的迭代方法，并说明理由。",
      },
      {
        no: "3-12",
        markdown:
          "设 $A$ 对称正定，$x^{(k+1)}=(I-\\alpha A)x^{(k)}+\\alpha b$。证明当 $0<\\alpha<2/\\lambda_1$ 时收敛，$\\lambda_1$ 是 $A$ 的最大特征值。",
      },
      {
        no: "3-16",
        markdown:
          "设 $A$ 对称正定，\n\n$$\nx^{(k+1)}=x^{(k)}-\\omega\\Bigl[A\\Bigl(\\frac{x^{(k+1)}+x^{(k)}}{2}\\Bigr)-b\\Bigr],\\quad \\omega>0.\n$$\n\n证明：对任意 $x^{(0)}$ 序列收敛，且极限是 $Ax=b$ 的解。",
      },
    ],
  },
  {
    id: "e4",
    chapter: "第4章",
    chapterId: "ch4",
    numbers: "4-4、4-5、4-6、4-7、4-8、4-13、4-17",
    goal: "构造在整个区间上收敛的简单迭代并说明阶；Newton 型求根公式的阶。",
    problems: [
      {
        no: "4-4",
        markdown:
          "设 $\\varphi(x)=\\cos x$。证明：任取 $x_0$，$x_{k+1}=\\varphi(x_k)$ 都收敛到 $x=\\varphi(x)$ 的根。",
      },
      {
        no: "4-5",
        markdown:
          "验证 $[0,2]$ 是 $x^3+2x-5=0$ 的有根区间。建立一个简单迭代，使任意 $x_0\\in[0,2]$ 都收敛，并说明理由和收敛阶。",
      },
      {
        no: "4-6",
        markdown:
          "求 $e^{-x}-\\sin(\\pi x/2)=0$ 在 $[0,1]$ 内的根，精确到小数点后六位。",
      },
      {
        no: "4-7",
        markdown:
          "设对一切 $x$，$0<m\\le f'(x)\\le M$。证明：对任意 $\\lambda\\in(0,2/M)$，$x_{k+1}=x_k-\\lambda f(x_k)$ 都收敛到 $f(x)=0$ 的根。",
      },
      {
        no: "4-8",
        markdown:
          "已知 $x=\\varphi(x)$ 在 $[a,b]$ 内只有一个根，且 $|\\varphi'(x)|\\ge k>1$。问如何改成收敛的迭代？用于 $x=\\tan x$，求 $4.5$ 附近的根，精确到四位小数。",
      },
      {
        no: "4-13",
        markdown:
          "证明 $x_{k+1}=x_k(x_k^2+3a)/(3x_k^2+a)$ 是求 $\\sqrt a$（$a>0$）的三阶方法。",
      },
      {
        no: "4-17",
        markdown:
          "确定 $p,q,r$，使 $x_{k+1}=p x_k+q a/x_k^2+r a^2/x_k^5$ 收敛到 $\\sqrt[3]{a}$，且阶尽可能高。",
      },
    ],
  },
  {
    id: "e6",
    chapter: "第6章",
    chapterId: "ch6",
    numbers: "6-2、6-3、6-4、6-8、6-9、6-10、6-12、6-16、6-17、6-18、6-26",
    goal: "Lagrange 基与余项、差商表与 Newton、分段三次 Hermite、最小二乘拟合。6-26 属于选择性的 6.8.1。",
    problems: [
      {
        no: "6-2",
        markdown:
          "用 $f(x)=\\sqrt x$ 在 $x=100,121,144$ 的值插值求 $\\sqrt{115}$，由误差公式给误差界，并与实际误差比较。",
      },
      {
        no: "6-3",
        markdown:
          "设 $l_2(x)$ 是节点 $x_k=x_0+kh$（$k=0,1,2,3$）上的三次 Lagrange 基函数。求 $\\max_{x_0\\le x\\le x_3}|l_2(x)|$。",
      },
      {
        no: "6-4",
        markdown:
          "设 $l_0,\\ldots,l_n$ 是节点 $x_0,\\ldots,x_n$ 上的 $n$ 次 Lagrange 基。证明 (1) $\\sum_j x_j^k l_j(x)=x^k$（$k=0,\\ldots,n$）；(2) $\\sum_j (x_j-x)^k l_j(x)=0$（$k=1,\\ldots,n$）。",
      },
      {
        no: "6-8",
        markdown:
          "设 $f(x)=3x^5+2x^3+x+1$。求差商 $f[2^0,2^1,\\ldots,2^5]$ 和 $f[2^0,2^1,\\ldots,2^6]$。",
      },
      {
        no: "6-9",
        markdown:
          "设 $f(x)=x^5+x^3+1$，节点 $x_0=-1,\\,x_1=-0.8,\\,x_2=0,\\,x_3=0.5,\\,x_4=1$。作出关于 $x_0,\\ldots,x_4$ 的差商表，建立关于节点 $x_0,x_1,x_2,x_3$ 的 Newton 插值多项式，并给出插值误差。",
      },
      {
        no: "6-10",
        markdown:
          "已知 $f$ 是多项式，函数表为 $(x,f)$：$(0,-7),(1,-4),(2,5),(3,26),(4,65),(5,128)$。求次数及最高次项系数。",
      },
      {
        no: "6-12",
        markdown:
          "设 $f(x)=x^4+2x^3+5$，节点 $x_0=-3,x_1=-1,x_2=1,x_3=2$。求 $[-3,2]$ 上的分段三次 Hermite 插值多项式及其余项。",
      },
      {
        no: "6-16",
        markdown:
          "数据 $(x,y)$：$(-1,0.220),(-0.5,0.800),(0,2.000),(0.25,2.500),(0.75,3.800),(1,4.200)$。分别作线性、二次拟合，并给出均方误差。",
      },
      {
        no: "6-17",
        markdown:
          "用最小二乘求形如 $y=a+bx^2$ 的经验公式，数据 $(x,y)$：$(19,19.0),(25,32.2),(31,49.0),(33,73.3),(44,97.8)$，并计算均方误差。",
      },
      {
        no: "6-18",
        markdown:
          "数据 $(x,y)$：$(1,16.4),(2,27.2),(3,44.5),(4,73.5),(5,120.4)$。求形如 $y=ae^{bx}$ 的拟合曲线。",
      },
      {
        no: "6-26",
        markdown:
          "判定 $1,\\,x,\\,x^2-1/3$ 在 $[-1,1]$ 上两两正交，并求一个三次多项式，使它在 $[-1,1]$ 上与这三个函数两两正交。本题对应选择性的 6.8.1。",
      },
    ],
  },
  {
    id: "e7",
    chapter: "第7章",
    chapterId: "ch7",
    numbers: "7-1、7-2、7-3、7-4、7-7、7-8、7-10、7-13、7-14",
    goal: "矩形与梯形的余项、代数精度、复化误差定 $n$、Gauss 节点与换元。7-10、7-13、7-14 用到书上标为选学的 Gauss 公式，考试范围仍按你标的 7.4 重点。",
    problems: [
      {
        no: "7-1",
        markdown: "建立右矩形和左矩形求积公式，并导出误差表达式。",
      },
      {
        no: "7-2",
        markdown:
          "说明中矩形公式的几何意义，并证明\n\n$$\n\\int_a^b f(x)\\,dx=(b-a)\\,f\\Bigl(\\frac{a+b}{2}\\Bigr)-\\frac{(b-a)^3}{24}f''(\\eta),\\quad \\eta\\in(a,b).\n$$",
      },
      {
        no: "7-3",
        markdown:
          "设 $f''(x)>0$。证明用梯形公式计算 $\\int_a^b f(x)\\,dx$ 的结果比准确值大，并说明几何意义。",
      },
      {
        no: "7-4",
        markdown:
          "确定待定系数，使代数精度尽可能高，并说明是多少次。\n\n(1) $\\int_{-h}^{h}f\\approx A_1 f(-h)+A_2 f(0)+A_3 f(h)$。\n\n(2) $\\int_{-1}^{1}f\\approx\\frac13\\bigl[f(-1)+2f(x_1)+3f(x_2)\\bigr]$。\n\n(3) $\\int_0^{h}f\\approx\\frac h2\\bigl[f(0)+f(h)\\bigr]+\\alpha h^2\\bigl[f'(0)-f'(h)\\bigr]$。\n\n(4) $\\int_0^{1}f\\approx A_1 f(0)+\\frac13 f(x_1)+A_2 f'(0)$。\n\n(5) $\\int_1^{3}f\\approx A_1 f\\bigl(2-\\sqrt{3/5}\\bigr)+A_2 f(2)+A_3 f\\bigl(2+\\sqrt{3/5}\\bigr)$。\n\n(6) $\\int_{-1}^{2} x^2 f(x)\\,dx\\approx A_1 f(-1)+A_2 f(0)+A_3 f(2)$。",
      },
      {
        no: "7-7",
        markdown:
          "分别用梯形、Simpson 和 Cotes 公式计算 $I=\\int_1^2\\ln x\\,dx$，并给出误差界。",
      },
      {
        no: "7-8",
        markdown:
          "设 $I=\\int_1^2\\ln x\\,dx$，$\\varepsilon=10^{-3}$。分别求 $n$，使复化梯形 $T_n$ 与复化 Simpson $S_n$ 满足 $|I-T_n|<\\varepsilon$、$|I-S_n|<\\varepsilon$，并计算 $S_n$。",
      },
      {
        no: "7-10",
        markdown:
          "分别用 Romberg、三点及五点 Gauss 公式计算 $I=\\int_1^3 x^{-1}\\,dx$，并与 $1.09861$ 比较。Romberg 在考试范围里是 7.3 不考；Gauss 按你的标记仍是 7.4 重点。",
      },
      {
        no: "7-13",
        markdown:
          "求 $\\int_0^1 \\sqrt x\\, f(x)\\,dx\\approx A_0 f(x_0)+A_1 f(x_1)$ 的系数与节点。",
      },
      {
        no: "7-14",
        markdown:
          "已知三点 Gauss 公式\n\n$$\n\\int_{-1}^{1}f(x)\\,dx\\approx\\frac59 f(\\sqrt{0.6})+\\frac89 f(0)+\\frac59 f(-\\sqrt{0.6}).\n$$\n\n用它计算 $\\int_{0.5}^{1}\\sqrt x\\,dx$。",
      },
    ],
  },
  {
    id: "e8",
    chapter: "第8章",
    chapterId: "ch8",
    numbers: "8-3、8-7、8-11",
    goal: "Euler 的整体误差、二阶 RK 的参数、改进 Euler 与经典四阶 RK 的绝对稳定条件。",
    problems: [
      {
        no: "8-3",
        markdown:
          "初值问题 $y'=ax+b$，$y(0)=0$。设 $x_n=nh$，$y_n$ 是 Euler 方法在 $x_n$ 的近似值。证明 $y(x_n)-y_n=\\tfrac12 a h x_n$。",
      },
      {
        no: "8-7",
        markdown:
          "证明下面的 R-K 方法对任何参数 $t$ 都是二阶方法：\n\n$$\n\\begin{aligned}\ny_{n+1}&=y_n+\\tfrac h2(K_2+K_3),\\\\\nK_1&=f(x_n,y_n),\\\\\nK_2&=f(x_n+th,\\,y_n+th K_1),\\\\\nK_3&=f\\bigl(x_n+(1-t)h,\\,y_n+(1-t)h K_1\\bigr).\n\\end{aligned}\n$$",
      },
      {
        no: "8-11",
        markdown:
          "对试验方程 $y'=-\\lambda y$（$\\lambda>0$），证明绝对稳定条件：\n\n(1) 改进的 Euler：$\\bigl|1-\\lambda h+\\tfrac12\\lambda^2 h^2\\bigr|<1$。\n\n(2) 四阶标准 R-K：$\\bigl|1-\\lambda h+\\tfrac1{2!}\\lambda^2 h^2-\\tfrac1{3!}\\lambda^3 h^3+\\tfrac1{4!}\\lambda^4 h^4\\bigr|<1$。",
      },
    ],
  },
];

export const EXERCISE_NOTES =
  "题面按张铁、邵新慧《数值分析》（科学出版社 2022）指定题整理，只给题目、不给解答。1-8 的星号标在近似值上，和 §1.3 相反。第 5、9 章没有指定题。";
