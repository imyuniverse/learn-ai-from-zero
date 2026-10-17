// ============================================================
// CUHK AI 交互式学习平台 - 课程数据
// 结构：stages -> lessons
// lesson 类型: lesson(讲解+代码练习) / demo(可视化演示) / project(项目) / quiz(测验)
// ============================================================

const COURSE = [
  {
    id: "stage1",
    title: "第一阶段 · 打好地基",
    subtitle: "Python 编程 + 机器学习直觉",
    lessons: [
      // ---------- 1.1 ----------
      {
        id: "s1-l1",
        type: "lesson",
        title: "认识 AI 与学习路线",
        duration: "10 分钟",
        badge: "课程",
        content: `
<div class="block">
  <h2>🤖 什么是人工智能、机器学习和深度学习？</h2>
  <p>这三个词经常混在一起，但它们其实是<strong>层层包含</strong>的关系：</p>
  <div class="viz-box" id="aiScope"></div>
  <p><strong>人工智能（AI）</strong>是最大的圈：让机器表现出智能。从下棋到自动驾驶都算。</p>
  <p><strong>机器学习（ML）</strong>是 AI 的一种实现方式：不靠人写死规则，而是<strong>让机器从数据里自己学规律</strong>。比如你不告诉程序"垃圾邮件长什么样"，而是给它一万封标注好的邮件，它自己总结出规律。</p>
  <p><strong>深度学习（DL）</strong>是 ML 的一种：用<strong>多层的神经网络</strong>来学习。它擅长处理图片、语音、文字这类"人靠直觉"的复杂数据。</p>
  <div class="callout tip"><h4>💡 一句话记住</h4>AI 是目标，ML 是方法，DL 是 ML 里最火的一支。你现在要学的，就是从 ML 一路走到 DL，再到 2026 年的大模型。</div>
</div>
<div class="block">
  <h2>🗺️ 你的学习路线</h2>
  <p>这个平台按下面这条路线安排，<strong>每个阶段学完都有动手项目</strong>：</p>
  <table>
    <tr><th>阶段</th><th>学什么</th><th>能做什么</th></tr>
    <tr><td>① 打地基</td><td>Python + 机器学习直觉</td><td>用代码做线性回归预测</td></tr>
    <tr><td>② 神经网络</td><td>从零实现神经网络 + PyTorch</td><td>训练手写数字识别器</td></tr>
    <tr><td>③ 现代 AI</td><td>Transformer + 大模型 + Agent</td><td>调用大模型做小应用</td></tr>
  </table>
  <div class="callout"><h4>📌 学习建议</h4>不要跳阶段。每课结尾的练习和测验，<strong>做完再往下走</strong>。卡住了就回来问，慢就是快。</div>
</div>`,
        code: null
      },

      // ---------- 1.2 ----------
      {
        id: "s1-l2",
        type: "lesson",
        title: "Python 上手：变量与运算",
        duration: "15 分钟",
        badge: "课程",
        content: `
<div class="block">
  <h2>🐍 你的第一段 Python</h2>
  <p>Python 是目前 AI 领域<strong>最主流</strong>的语言。它的语法接近英文，非常适合新手。</p>
  <p>下面这个编辑器可以直接运行 Python（用 Pyodide 在浏览器里跑，<strong>第一次点运行需要几秒加载</strong>）。试着点「运行」看看结果：</p>
</div>`,
        code: {
          title: "试试运行你的第一段代码",
          initial: `# 这是注释，用 # 开头
name = "CUHK"
year = 2026

print("你好，", name)
print("现在是", year, "年")

# 变量可以参与运算
a = 10
b = 3
print("加法:", a + b)
print("乘法:", a * b)
print("除法:", a / b)
print("整除:", a // b)
print("取余:", a % b)
print("幂:", a ** b)`,
          hint: "点击「运行」按钮，观察每一行输出的结果。变量 = 一个有名字的盒子，用来装数据。"
        }
      },

      // ---------- 1.3 ----------
      {
        id: "s1-l3",
        type: "lesson",
        title: "列表、循环与条件",
        duration: "20 分钟",
        badge: "课程",
        content: `
<div class="block">
  <h2>📚 列表（List）：装一组数据</h2>
  <p>列表用方括号 <code>[]</code> 表示，可以装很多数据，还能增删改查。</p>
</div>`,
        code: {
          title: "列表基础操作",
          initial: `# 一个成绩列表
scores = [85, 92, 78, 90, 88]

print("全班成绩:", scores)
print("第1个:", scores[0])    # 下标从0开始！
print("最后1个:", scores[-1])
print("最高分:", max(scores))
print("平均分:", sum(scores) / len(scores))

# 循环：逐个处理
total = 0
for s in scores:
    total += s
print("用循环算出的总分:", total)

# 条件判断
if max(scores) >= 90:
    print("班里有同学考了90分以上！")
else:
    print("大家继续加油")`,
          hint: "注意下标从 0 开始。for 循环会逐个取出列表里的元素。"
        }
      },

      // ---------- 1.4 ----------
      {
        id: "s1-l4",
        type: "lesson",
        title: "函数：把代码打包复用",
        duration: "15 分钟",
        badge: "课程",
        content: `
<div class="block">
  <h2>🔧 函数 = 可以反复调用的代码块</h2>
  <p>函数用 <code>def</code> 定义，把一段逻辑封装起来，传入参数、返回结果。这是编程最重要的抽象之一。</p>
</div>`,
        code: {
          title: "定义并使用函数",
          initial: `def predict_price(area):
    """根据面积预测房价（一个最简单的"模型"）"""
    price_per_sqm = 50000   # 每平米5万
    return area * price_per_sqm

# 调用函数
p1 = predict_price(50)
p2 = predict_price(80)
print("50平米的房子:", p1, "元")
print("80平米的房子:", p2, "元")

# 函数可以组合
def total_price(areas):
    total = 0
    for a in areas:
        total += predict_price(a)
    return total

print("3套房子总价:", total_price([50, 80, 100]))`,
          hint: "函数里的 return 是返回结果。注意 predict_price 其实就是一个最简单的「预测模型」——输入面积，输出价格。"
        }
      },

      // ---------- 1.5 机器学习入门 ----------
      {
        id: "s1-l5",
        type: "lesson",
        title: "机器学习的核心思想",
        duration: "20 分钟",
        badge: "课程",
        content: `
<div class="block">
  <h2>🎯 机器学习到底在学什么？</h2>
  <p>机器学习的核心，是让计算机<strong>从数据里自动找出规律</strong>。看一个最经典的例子——<strong>线性回归</strong>：根据房子面积预测房价。</p>
  <p>假设我们有一些已知数据（面积 → 价格）：</p>
  <table>
    <tr><th>面积（㎡）</th><td>40</td><td>60</td><td>80</td><td>100</td><td>120</td></tr>
    <tr><th>价格（万）</th><td>250</td><td>350</td><td>430</td><td>520</td><td>610</td></tr>
  </table>
  <p>我们的目标是找一条<strong>直线 y = w·x + b</strong>，让它尽量贴合这些点。<strong>w 是斜率，b 是截距</strong>——这两个数就是"模型"。找到它们，就能预测任意面积的房价。</p>
  <div class="callout tip"><h4>💡 关键概念</h4><strong>模型</strong> = 那条直线；<strong>训练</strong> = 调整 w 和 b 让直线贴合数据的过程；<strong>预测</strong> = 用训练好的 w、b 算新输入的结果。</div>
</div>`,
        code: {
          title: "手写一个最简单的线性模型",
          initial: `# 已知数据
areas = [40, 60, 80, 100, 120]
prices = [250, 350, 430, 520, 610]

# 我们的模型：y = w * x + b
w = 5.0   # 斜率（每平米涨多少钱）
b = 50.0  # 截距（基础价）

def predict(x):
    return w * x + b

# 看看这个模型预测得准不准
print("面积 | 真实价 | 预测价")
for a, p in zip(areas, prices):
    pred = predict(a)
    print(f"{a:4d} | {p:5d} | {pred:5.0f}")

# 试着改上面的 w 和 b，让预测价尽量接近真实价！
# 这个"调整参数让预测更准"的过程，就是机器学习！`,
          hint: "动手改一改 w 和 b 的值，再点运行，看看预测价如何变化。你能找到让误差最小的 w、b 吗？这就是「训练」的本质。"
        }
      },

      // ---------- 1.6 线性回归可视化演示 ----------
      {
        id: "s1-l6",
        type: "demo",
        title: "可视化：看懂线性回归",
        duration: "10 分钟",
        badge: "演示",
        content: `
<div class="block">
  <h2>📈 拖动滑块，直观理解"训练"</h2>
  <p>下面是上节课的房价数据。用滑块调整 <strong>斜率 w</strong> 和 <strong>截距 b</strong>，红线是你当前的模型，蓝点是真实数据。观察红线怎么变化、误差怎么变化。</p>
  <p>然后点「自动拟合」，看算法怎么一步步把线调到最佳位置——这就是<strong>梯度下降</strong>在做的事。</p>
</div>`,
        code: null,
        viz: {
          type: "linear-regression"
        }
      },

      // ---------- 1.7 第一阶段测验 ----------
      {
        id: "s1-l7",
        type: "quiz",
        title: "第一阶段测验",
        duration: "5 分钟",
        badge: "测验",
        content: `
<div class="block">
  <h2>📝 检验一下你学到了什么</h2>
  <p>做完下面的题，全部答对就能解锁下一阶段。别担心，答错会显示解释，可以重试。</p>
</div>`,
        quiz: [
          {
            q: "机器学习和传统编程最大的区别是什么？",
            opts: ["机器学习不需要数据", "机器学习让机器从数据中自动学规律，而不是人写死规则", "机器学习只能处理图片", "机器学习不需要电脑"],
            ans: 1,
            explain: "传统编程是人写规则，机器学习是让机器从数据里自己找规律。"
          },
          {
            q: "在线性回归 y = w·x + b 中，'训练'指的是什么？",
            opts: ["把数据画成图", "调整 w 和 b 让预测尽量准确", "增加更多数据", "把程序写得更长"],
            ans: 1,
            explain: "训练就是调整模型参数（w 和 b），让预测结果尽量贴近真实数据。"
          },
          {
            q: "下面哪个是 Python 中正确的列表定义？",
            opts: ["scores = (85, 92, 78)", "scores = [85, 92, 78]", "scores = {85, 92, 78}", "scores = <85, 92, 78>"],
            ans: 1,
            explain: "列表用方括号 [] 定义。圆括号是元组，花括号是集合/字典。"
          },
          {
            q: "AI、机器学习、深度学习的关系是？",
            opts: ["三者完全一样", "深度学习包含机器学习包含AI", "AI包含机器学习，机器学习包含深度学习", "机器学习包含AI包含深度学习"],
            ans: 2,
            explain: "AI 是最大的圈，ML 是 AI 的一种方法，DL 是 ML 的一种（多层神经网络）。"
          }
        ]
      }
    ]
  }
];

// 后续阶段在后面追加（stage2, stage3）

// ---------- 第二阶段 ----------
COURSE.push({
  id: "stage2",
  title: "第二阶段 · 神经网络",
  subtitle: "从零理解并实现深度学习",
  lessons: [
    {
      id: "s2-l1",
      type: "lesson",
      title: "神经元与感知机",
      duration: "20 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>🧠 从大脑到神经元</h2>
  <p>神经网络受大脑启发：大脑由无数<strong>神经元</strong>连接而成，每个神经元接收信号、处理后决定是否"激活"并传出信号。</p>
  <p>计算机里的神经元更简单——它做三件事：</p>
  <ol>
    <li><strong>加权求和</strong>：把每个输入 xᵢ 乘以权重 wᵢ，再加起来，加上偏置 b</li>
    <li><strong>激活函数</strong>：对结果做一个非线性变换（比如"大于0才输出"）</li>
    <li><strong>输出</strong>：把结果传给下一个神经元</li>
  </ol>
  <p>单个神经元叫<strong>感知机（Perceptron）</strong>。它本质上就是线性回归 + 一个激活函数。</p>
  <div class="callout tip"><h4>💡 关键洞察</h4>一个神经元只能解决<strong>线性可分</strong>的问题。但把很多神经元<strong>叠成多层</strong>，就能逼近任意复杂的函数——这就是深度学习能这么强大的根本原因。</div>
</div>`,
      code: {
        title: "实现一个感知机（逻辑与运算）",
        initial: `import math

def sigmoid(x):
    """S型激活函数，把任意数压缩到(0,1)"""
    return 1 / (1 + math.exp(-x))

def perceptron(x1, x2, w1, w2, b):
    """一个感知机：加权求和 + sigmoid激活"""
    z = w1 * x1 + w2 * x2 + b
    return sigmoid(z)

# 用感知机实现"逻辑与" AND
# 目标是: (1,1)->1, (0,1)->0, (1,0)->0, (0,0)->0
# 尝试: w1=w2=10, b=-15
w1, w2, b = 10, 10, -15

print("输入 | 输出")
for x1 in [0, 1]:
    for x2 in [0, 1]:
        out = perceptron(x1, x2, w1, w2, b)
        # 大于0.5就认为是1
        result = 1 if out > 0.5 else 0
        print(f"({x1},{x2}) | {result}")

print()
print("(1,1)的原始输出:", perceptron(1, 1, w1, w2, b))`,
        hint: "这个感知机学会了「逻辑与」。注意权重 w 和偏置 b 是「学」出来的参数，这里我们手动给了合理值——训练的过程就是自动找到它们。"
      }
    },
    {
      id: "s2-l2",
      type: "lesson",
      title: "激活函数：神经网络的灵魂",
      duration: "15 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>⚡ 为什么需要激活函数？</h2>
  <p>如果神经元只是"加权求和"，那么<strong>无论叠多少层，整体还是一个线性函数</strong>——叠了也白叠。</p>
  <p>激活函数加入<strong>非线性</strong>，让网络能表达复杂的关系。最常用的几个：</p>
  <table>
    <tr><th>函数</th><th>公式</th><th>特点</th></tr>
    <tr><td>Sigmoid</td><td>1/(1+e⁻ˣ)</td><td>输出(0,1)，适合二分类，但易饱和</td></tr>
    <tr><td>ReLU</td><td>max(0,x)</td><td>简单高效，深度学习默认首选</td></tr>
    <tr><td>Softmax</td><td>归一化指数</td><td>输出和为1，适合多分类</td></tr>
  </table>
  <div class="callout"><h4>📌 记忆点</h4>ReLU 因为计算简单、不易梯度消失，是隐藏层的默认选择；Sigmoid/Softmax 常用在输出层做概率。</div>
</div>`,
      code: {
        title: "对比不同的激活函数",
        initial: `import math

def sigmoid(x): return 1/(1+math.exp(-x))
def relu(x): return max(0, x)
def softmax(xs):
    exps = [math.exp(x) for x in xs]
    s = sum(exps)
    return [e/s for e in exps]

print("x  | sigmoid | relu")
for x in [-3, -1, 0, 1, 3]:
    print(f"{x:2d} | {sigmoid(x):.3f}   | {relu(x)}")

print()
print("softmax([2.0, 1.0, 0.1]) =", [round(v,3) for v in softmax([2.0, 1.0, 0.1])])
print("注意：softmax输出之和 =", round(sum(softmax([2.0,1.0,0.1])),3))`,
        hint: "观察 sigmoid 把任意值压到(0,1)，relu 把负数变0。softmax 把多个数变成和为1的概率分布。"
      }
    },
    {
      id: "s2-l3",
      type: "lesson",
      title: "多层网络与反向传播",
      duration: "25 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>🔁 神经网络怎么"学习"？</h2>
  <p>训练神经网络分三步，反复循环：</p>
  <ol>
    <li><strong>前向传播</strong>：输入数据从输入层流到输出层，算出预测值</li>
    <li><strong>计算损失</strong>：比较预测值和真实值，算误差（损失函数）</li>
    <li><strong>反向传播</strong>：把误差从输出层往回传，用<strong>梯度下降</strong>更新每个权重</li>
  </ol>
  <p><strong>反向传播（Backpropagation）</strong>是深度学习的核心算法，它用<strong>链式法则</strong>（微积分）算出每个权重对误差的"贡献"，然后往减小误差的方向调整。</p>
  <div class="callout tip"><h4>💡 类比理解</h4>就像投飞镖：先扔一次（前向），看偏了多远（损失），然后根据偏差调整手腕角度（反向传播更新权重），再扔。反复多次，越来越准。</div>
</div>`,
      code: {
        title: "从零手写一个能训练的神经网络",
        initial: `import math, random

# 训练一个网络学习"异或" XOR（这是单层感知机解决不了的！）
# XOR: (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0

def sigmoid(x): return 1/(1+math.exp(-x))

# 一个简单的 2-4-1 神经网络
random.seed(42)
# 权重初始化（小随机数）
w1 = [[random.uniform(-1,1) for _ in range(4)] for _ in range(2)]
b1 = [random.uniform(-1,1) for _ in range(4)]
w2 = [random.uniform(-1,1) for _ in range(4)]
b2 = random.uniform(-1,1)

def forward(x):
    # 输入层 -> 隐藏层
    h = [sigmoid(w1[0][i]*x[0] + w1[1][i]*x[1] + b1[i]) for i in range(4)]
    # 隐藏层 -> 输出层
    out = sigmoid(sum(w2[i]*h[i] for i in range(4)) + b2)
    return out, h

# 训练数据
data = [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],0)]

lr = 0.5  # 学习率
for epoch in range(10000):
    total_loss = 0
    for x, y in data:
        out, h = forward(x)
        loss = (out - y)**2
        total_loss += loss
        # 反向传播（简化的梯度下降）
        d_out = 2*(out - y) * out * (1-out)
        for i in range(4):
            w2[i] -= lr * d_out * h[i]
        b2 -= lr * d_out
        for i in range(4):
            for j in range(2):
                w1[j][i] -= lr * d_out * w2[i] * h[i]*(1-h[i]) * x[j]
            b1[i] -= lr * d_out * w2[i] * h[i]*(1-h[i])
    if epoch % 2000 == 0:
        print(f"第{epoch}轮, 损失={total_loss:.5f}")

print()
print("训练完成！测试 XOR：")
for x, y in data:
    out, _ = forward(x)
    print(f"{x} -> {out:.4f} (真实:{y})")`,
        hint: "这是完整的反向传播！XOR 是单层感知机无法解决的问题（非线性可分），但多层网络就能学会。观察损失如何从大变小。"
      }
    },
    {
      id: "s2-l4",
      type: "demo",
      title: "可视化：神经网络如何学习",
      duration: "10 分钟",
      badge: "演示",
      content: `
<div class="block">
  <h2>🎨 看神经网络一步步学会分类</h2>
  <p>下图是一个 <strong>2 输入 → 4 隐藏 → 2 输出</strong> 的小网络，任务是学会区分两类点（把右上角的一类圈出来）。点「开始训练」，看它怎么从乱猜逐渐学会。</p>
  <p>每帧画出的曲线是<strong>决策边界</strong>——网络"学会"的分界线。</p>
</div>`,
      code: null,
      viz: { type: "nn-train" }
    },
    {
      id: "s2-l5",
      type: "lesson",
      title: "PyTorch：工业级深度学习框架",
      duration: "25 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>🔥 PyTorch 是什么？</h2>
  <p>手写反向传播很好，但真实项目都用框架。<strong>PyTorch</strong> 是 2026 年 AI 研究和工业界的<strong>事实标准</strong>（由 Meta 开发，OpenAI、DeepMind 等都在用）。</p>
  <p>它最强大的特性是<strong>自动求导</strong>：你只需要写前向传播，它会自动帮你算梯度、更新参数，再也不用手推反向传播。</p>
  <div class="callout warn"><h4>⚠️ 关于运行环境</h4>PyTorch 体积较大，浏览器里的 Pyodide 加载它需要一点时间。为了流畅，下面这段代码用 <strong>NumPy 模拟 PyTorch 的核心思想</strong>，让你理解"自动求导 + 优化器"是怎么回事。真正跑 PyTorch 时，建议在你自己的电脑上 pip install torch。</div>
</div>`,
      code: {
        title: "模拟 PyTorch 的训练循环（NumPy 版）",
        initial: `# 用 NumPy 理解 PyTorch 的核心：自动求导 + 优化
import random
random.seed(0)

# 生成一些带噪声的线性数据
true_w, true_b = 2.0, 5.0
xs = [random.uniform(0, 10) for _ in range(50)]
ys = [true_w * x + true_b + random.uniform(-3, 3) for x in xs]

# "模型参数"（随机初始化，和 PyTorch 的 nn.Parameter 类似）
w, b = 0.0, 0.0
lr = 0.001

# 训练循环（和 PyTorch 的写法几乎一样）
for epoch in range(1000):
    # 前向传播
    preds = [w * x + b for x in xs]
    # 损失：均方误差
    loss = sum((p - y)**2 for p, y in zip(preds, ys)) / len(xs)
    # 反向传播（PyTorch 自动做，这里手算梯度）
    grad_w = sum(2*(w*x+b-y)*x for x, y in zip(xs, ys)) / len(xs)
    grad_b = sum(2*(w*x+b-y) for x, y in zip(xs, ys)) / len(xs)
    # 更新参数
    w -= lr * grad_w
    b -= lr * grad_b
    if epoch % 200 == 0:
        print(f"第{epoch}轮: 损失={loss:.2f}, w={w:.3f}, b={b:.3f}")

print()
print(f"真实值: w={true_w}, b={true_b}")
print(f"学到的: w={w:.3f}, b={b:.3f}")`,
        hint: "观察 w 和 b 如何从 0 逐渐逼近真实值 2 和 5。这就是梯度下降，也是 PyTorch 自动帮你做的事。"
      }
    },
    {
      id: "s2-l6",
      type: "project",
      title: "项目：手写数字识别器",
      duration: "30 分钟",
      badge: "项目",
      content: `
<div class="block">
  <h2>🏆 阶段项目：训练一个能认数字的神经网络</h2>
  <p>这是深度学习的"Hello World"——<strong>MNIST 手写数字识别</strong>。我们用一个小型神经网络，从零训练它识别 0-9 的手写数字。</p>
  <p>因为浏览器环境加载完整 MNIST（7万张图）太慢，这里用<strong>简化版数据</strong>：每个数字是一个 5×5 像素的图案，训练网络学会区分。</p>
  <p>运行下面的代码，观察训练过程，最后看看准确率。</p>
  <div class="callout"><h4>📌 这个项目练什么</h4>完整走一遍「数据 → 模型 → 训练 → 评估」的流程，这是所有深度学习项目的通用框架。</div>
</div>`,
      code: {
        title: "完整训练一个数字分类器",
        initial: `import math, random
random.seed(1)

def sigmoid(x): return 1/(1+math.exp(-x))

# 简化版数字图案（5x5 像素，1=亮 0=暗）
# 每个数字用一个特征向量表示
digits = {
    0: [1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1],
    1: [0,0,1,0,0, 0,1,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 1,1,1,1,1],
    2: [1,1,1,1,1, 0,0,0,0,1, 1,1,1,1,1, 1,0,0,0,0, 1,1,1,1,1],
    3: [1,1,1,1,1, 0,0,0,0,1, 0,1,1,1,1, 0,0,0,0,1, 1,1,1,1,1],
}

# 构建训练数据：每个数字的输入 -> one-hot 输出
train = []
for label, pattern in digits.items():
    onehot = [1 if i == label else 0 for i in range(10)]
    train.append((pattern, onehot))

# 神经网络：25 输入 -> 10 隐藏 -> 10 输出
H = 10
random.seed(1)
w1 = [[random.uniform(-0.5,0.5) for _ in range(H)] for _ in range(25)]
b1 = [random.uniform(-0.5,0.5) for _ in range(H)]
w2 = [[random.uniform(-0.5,0.5) for _ in range(10)] for _ in range(H)]
b2 = [random.uniform(-0.5,0.5) for _ in range(10)]

def forward(x):
    h = [sigmoid(sum(w1[j][i]*x[j] for j in range(25)) + b1[i]) for i in range(H)]
    out = [sigmoid(sum(w2[i][k]*h[i] for i in range(H)) + b2[k]) for k in range(10)]
    return out, h

lr = 0.8
for epoch in range(2000):
    loss_total = 0
    for x, y in train:
        out, h = forward(x)
        loss_total += sum((o-yi)**2 for o, yi in zip(out, y))
        # 反向传播
        do = [2*(out[k]-y[k])*out[k]*(1-out[k]) for k in range(10)]
        for i in range(H):
            for k in range(10):
                w2[i][k] -= lr * do[k] * h[i]
        for k in range(10):
            b2[k] -= lr * do[k]
        dh = [sum(do[k]*w2[i][k] for k in range(10)) * h[i]*(1-h[i]) for i in range(H)]
        for j in range(25):
            for i in range(H):
                w1[j][i] -= lr * dh[i] * x[j]
        for i in range(H):
            b1[i] -= lr * dh[i]
    if epoch % 500 == 0:
        print(f"第{epoch}轮, 损失={loss_total:.4f}")

# 测试
print()
print("测试结果：")
correct = 0
for label, pattern in digits.items():
    out, _ = forward(pattern)
    pred = out.index(max(out))
    ok = "✓" if pred == label else "✗"
    if pred == label: correct += 1
    print(f"  真实{label} -> 预测{pred} {ok}")

print(f"\\n准确率: {correct}/{len(digits)} = {correct/len(digits)*100:.0f}%")`,
        hint: "这是一个真正的多分类神经网络！训练完成后应该能达到100%准确率。试着增加训练轮数或调整学习率观察变化。"
      }
    },
    {
      id: "s2-l7",
      type: "quiz",
      title: "第二阶段测验",
      duration: "5 分钟",
      badge: "测验",
      content: `<div class="block"><h2>📝 检验神经网络部分</h2><p>答对全部题目即可解锁第三阶段。</p></div>`,
      quiz: [
        {
          q: "神经网络中，激活函数的主要作用是什么？",
          opts: ["让计算更快", "引入非线性，让网络能表达复杂关系", "减少数据量", "美化代码"],
          ans: 1,
          explain: "没有激活函数，多层网络叠加后仍是线性的。非线性让网络能拟合复杂函数。"
        },
        {
          q: "反向传播的作用是什么？",
          opts: ["把数据反转", "把误差从输出层往回传，计算梯度更新权重", "反向存储数据", "防止过拟合"],
          ans: 1,
          explain: "反向传播用链式法则把误差回传，算出每个权重的梯度，从而更新参数。"
        },
        {
          q: "XOR 异或问题为什么单层感知机解决不了？",
          opts: ["因为它需要非线性（数据线性不可分）", "因为数据太多", "因为计算太慢", "因为它不是分类问题"],
          ans: 0,
          explain: "XOR 是线性不可分的经典例子，必须有多层网络（含非线性激活）才能解决。"
        },
        {
          q: "PyTorch 相比手写反向传播最大的优势是？",
          opts: ["运行速度一定更快", "自动求导，无需手推梯度", "只能跑在手机上", "免费"],
          ans: 1,
          explain: "PyTorch 的自动求导（autograd）让你只需写前向传播，梯度计算和参数更新自动完成。"
        }
      ]
    }
  ]
});

// ---------- 第三阶段 ----------
COURSE.push({
  id: "stage3",
  title: "第三阶段 · 现代 AI",
  subtitle: "Transformer、大模型与 Agent",
  lessons: [
    {
      id: "s3-l1",
      type: "lesson",
      title: "Transformer：现代 AI 的基石",
      duration: "30 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>🚀 为什么 Transformer 改变了世界？</h2>
  <p>2017 年 Google 提出 Transformer，论文标题《Attention Is All You Need》。它取代了之前的 RNN/LSTM，成为<strong>所有大语言模型（GPT、DeepSeek、Claude 等）的底层架构</strong>。</p>
  <p>它的核心是<strong>自注意力机制（Self-Attention）</strong>：让模型在处理每个词时，能"关注"到句子里的其他相关词。</p>
  <div class="viz-box" id="attentionViz"></div>
  <div class="callout tip"><h4>💡 用一句话理解注意力</h4>比如句子「动物没在过马路，因为它太累了」——"它"指的是"动物"而不是"马路"。注意力机制让模型自动学会这种关联。</div>
</div>`,
      code: {
        title: "手动计算一个简化的注意力分数",
        initial: `import math

# 注意力机制的简化版：
# 对每个词，算它和其他词的"相关度"，然后加权求和

# 假设三个词向量（简化，2维）
words = {"猫": [1.0, 0.0], "追": [0.5, 0.5], "老鼠": [0.0, 1.0]}

def dot(a, b):
    return sum(x*y for x, y in zip(a, b))

# 计算"追"对所有词的注意力权重
query = words["追"]
scores = {w: dot(query, v) for w, v in words.items()}

# softmax 归一化
exps = {w: math.exp(s) for w, s in scores.items()}
total = sum(exps.values())
weights = {w: e/total for w, e in exps.items()}

print("原始相关度分数:", scores)
print()
print("注意力权重（softmax后）:")
for w, wt in weights.items():
    print(f"  '{w}' -> {wt:.3f}")

print()
print("注意：权重和为", round(sum(weights.values()), 3))
print("模型会按这些权重，把相关词的信息聚合起来")`,
        hint: "这就是注意力的核心：算相关度 → softmax 归一化 → 加权聚合。真实 Transformer 会并行算所有词对的关系。"
      }
    },
    {
      id: "s3-l2",
      type: "lesson",
      title: "大语言模型 LLM 是怎么工作的",
      duration: "25 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>💬 LLM 本质上在做一件事：预测下一个词</h2>
  <p>GPT、DeepSeek 等大语言模型的核心任务极其简单：<strong>给定前面所有文字，预测下一个最可能的词</strong>。不断重复这个过程，就能生成整段文字。</p>
  <p>它们之所以强大，是因为：</p>
  <ol>
    <li><strong>海量训练数据</strong>：几乎读完了互联网上所有文字</li>
    <li><strong>巨大参数量</strong>：数十亿到数万亿个参数</li>
    <li><strong>Transformer 架构</strong>：能捕捉长距离依赖</li>
  </ol>
  <p>训练分三个阶段：<strong>预训练</strong>（学语言本身）→ <strong>指令微调</strong>（学听人话）→ <strong>人类反馈对齐 RLHF</strong>（学做好助手）。</p>
  <div class="callout"><h4>📌 2026 年的关键趋势</h4>混合专家（MoE）架构让模型"又大又快"——DeepSeek-V3 就用了 MoE；「推理模型」（如 o1、DeepSeek-R1）会在回答前"思考"，擅长数学和编程。</div>
</div>`,
      code: {
        title: "做一个极简的「下一个词预测器」",
        initial: `# 用统计方法做一个极简版"预测下一个词"
# 原理：统计训练文本里每个词后面跟哪些词

# "训练语料"（简化）
corpus = "我 爱 吃 苹果 。 我 爱 吃 香蕉 。 你 爱 吃 苹果 。".split()

# 统计每个词后面跟什么词
from collections import defaultdict
next_words = defaultdict(list)
for i in range(len(corpus) - 1):
    next_words[corpus[i]].append(corpus[i+1])

print("每个词后面可能跟的词：")
for w, ns in next_words.items():
    print(f"  '{w}' -> {ns}")

print()
# 生成一句话：从"我"开始
import random
random.seed(0)
current = "我"
sentence = [current]
for _ in range(4):
    candidates = next_words.get(current, ["。"])
    current = random.choice(candidates)
    sentence.append(current)
    if current == "。": break

print("生成:", " ".join(sentence))`,
        hint: "这就是语言模型的最基本原理！真实 LLM 不是简单统计，而是用神经网络预测概率分布，但「预测下一个词」这个核心任务是一样的。"
      }
    },
    {
      id: "s3-l3",
      type: "lesson",
      title: "Prompt 工程与 RAG",
      duration: "25 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>🎯 如何用好大模型？</h2>
  <p>和 LLM 打交道的两个核心技能：</p>
  <h3>1. Prompt 工程（提示词工程）</h3>
  <p>同样的问题，不同的问法，效果天差地别。好的 Prompt 通常包含：<strong>角色 + 任务 + 约束 + 示例</strong>。</p>
  <h3>2. RAG（检索增强生成）</h3>
  <p>LLM 的知识有截止日期，也不知道你的私有数据。<strong>RAG</strong> 的思路是：先从知识库检索相关内容，再把内容塞进 Prompt 一起给模型，让它"照着资料回答"。</p>
  <div class="callout tip"><h4>💡 Prompt 对比</h4>❌「帮我写点东西」<br>✅「你是一位 AI 课程助教，请用通俗语言向大一新生解释什么是注意力机制，要求 100 字以内，举一个生活例子」</div>
</div>`,
      code: {
        title: "理解 RAG 的核心思路（模拟）",
        initial: `# 模拟 RAG（检索增强生成）的流程
# 核心：先检索相关资料，再让模型"照着资料回答"

# 模拟一个知识库
knowledge_base = [
    {"topic": "注意力机制", "text": "注意力机制让模型关注输入中重要的部分，核心是Query-Key-Value。"},
    {"topic": "梯度下降", "text": "梯度下降是沿着损失函数梯度方向更新参数来最小化损失。"},
    {"topic": "过拟合", "text": "过拟合指模型在训练集表现好但测试集差，泛化能力弱。"},
]

def retrieve(question):
    """简单检索：找包含关键词的资料"""
    results = []
    for doc in knowledge_base:
        # 简单关键词匹配（真实RAG用向量相似度）
        if any(kw in question for kw in doc["topic"].split()):
            results.append(doc["text"])
    return results

def answer(question):
    """RAG 生成：检索 + 基于资料回答"""
    docs = retrieve(question)
    if docs:
        # 真实场景：把这些资料拼进 prompt 给 LLM
        return f"根据资料回答：{docs[0]}"
    return "知识库中没有相关资料"

print(answer("什么是注意力机制？"))
print(answer("怎么理解梯度下降？"))
print(answer("什么是过拟合？"))
print(answer("什么是量子计算？"))`,
        hint: "RAG 的本质就是「检索 + 生成」。先找到相关资料，再让模型基于资料回答，这样能回答私有数据和最新知识。"
      }
    },
    {
      id: "s3-l4",
      type: "lesson",
      title: "AI Agent 智能体",
      duration: "25 分钟",
      badge: "课程",
      content: `
<div class="block">
  <h2>🤖 从"聊天"到"干活"：AI Agent</h2>
  <p>普通 LLM 只会"说"，<strong>Agent（智能体）会"做"</strong>。Agent = 大模型 + <strong>工具调用</strong> + <strong>自主规划</strong>。</p>
  <p>一个 Agent 的工作循环：</p>
  <ol>
    <li><strong>理解任务</strong>：拆解目标</li>
    <li><strong>选择工具</strong>：比如调用搜索、代码执行、数据库</li>
    <li><strong>执行并观察</strong>：拿到结果</li>
    <li><strong>判断是否完成</strong>：没完成就继续循环</li>
  </ol>
  <p>2026 年的趋势是<strong>多 Agent 协作</strong>：多个专业 Agent 分工合作，像一个小团队。</p>
</div>`,
      code: {
        title: "模拟一个 Agent 的决策循环",
        initial: `# 模拟 Agent 的核心：工具调用 + 循环决策
import math

# Agent 可用的"工具"
def calculator(expr):
    try:
        return eval(expr)
    except:
        return "无法计算"

def search(query):
    # 模拟搜索工具
    facts = {"香港大学": "CUHK是香港中文大学", "面积": "圆面积=πr²"}
    return facts.get(query, "未找到")

# Agent 的"大脑"（简化逻辑）
def agent(task):
    print(f"任务: {task}")
    steps = []
    if "计算" in task:
        # 提取表达式（简化）
        result = calculator("3 * 7 + 2")
        steps.append(f"调用计算器: 3*7+2 = {result}")
    if "搜索" in task or "查询" in task:
        result = search("香港大学")
        steps.append(f"调用搜索: {result}")
    print("Agent 执行步骤:")
    for s in steps:
        print(f"  → {s}")
    print("Agent 回答: 任务完成！\\n")

# 测试不同的任务
agent("帮我计算 3*7+2")
agent("帮我查询香港大学是什么")`,
        hint: "Agent 的核心是把「思考→选工具→执行→再思考」做成循环。真实 Agent 用 LLM 做决策，这里用 if 简化了。"
      }
    },
    {
      id: "s3-l5",
      type: "demo",
      title: "可视化：注意力如何工作",
      duration: "10 分钟",
      badge: "演示",
      content: `
<div class="block">
  <h2>👀 看看注意力在"看"什么</h2>
  <p>下面模拟一个句子，每个词对其他词的关注程度用连线的粗细表示。点不同的词，看它最"关注"哪些词。</p>
  <p>这解释了为什么 Transformer 能理解「它」到底指代谁。</p>
</div>`,
      code: null,
      viz: { type: "attention" }
    },
    {
      id: "s3-l6",
      type: "project",
      title: "项目：调用大模型做小助手",
      duration: "20 分钟",
      badge: "项目",
      content: `
<div class="block">
  <h2>🎉 最终项目：做一个 AI 助手</h2>
  <p>到这个阶段，你已经理解了 AI 的完整脉络。最后一个项目，用<strong>规则 + 检索</strong>做一个能回答 CUHK 学生常见问题的"课程助手"。</p>
  <p>这模拟了真实 RAG 应用的结构：知识库 → 检索 → 回答。你以后接入真实 LLM API 时，逻辑完全一样。</p>
</div>`,
      code: {
        title: "做一个课程知识助手",
        initial: `# 一个简单的 CUHK AI 课程助手
# 结构：知识库 + 检索 + 回答（模拟 RAG）

kb = {
    "什么是机器学习": "机器学习是让计算机从数据中自动学习规律，而不是由人写死规则。",
    "什么是深度学习": "深度学习是用多层神经网络进行机器学习，擅长处理图像、语音、文本。",
    "什么是神经网络": "神经网络由多层神经元组成，每个神经元做加权求和并经过激活函数。",
    "什么是反向传播": "反向传播是把误差从输出层回传，用链式法则计算梯度来更新权重。",
    "什么是注意力机制": "注意力机制让模型关注输入中重要的部分，是 Transformer 的核心。",
    "什么是过拟合": "过拟合是模型在训练集表现好但在新数据上表现差，说明泛化能力弱。",
    "怎么学AI": "建议路线：Python基础→机器学习→神经网络→PyTorch→Transformer→大模型，每阶段都要动手做项目。",
}

def ask(question):
    # 简单关键词匹配（真实RAG用向量检索）
    for key, answer in kb.items():
        # 提取问题里的关键词
        if key.replace("什么是","") in question or key in question:
            return answer
    return "抱歉，我还没学到这个问题。试着问「什么是机器学习」「怎么学AI」等。"

print("🤖 CUHK AI 课程助手（输入 exit 退出）")
print("=" * 40)
test_questions = ["什么是机器学习", "什么是注意力机制", "怎么学AI", "今天天气如何"]
for q in test_questions:
    print(f"\\n你: {q}")
    print(f"助手: {ask(q)}")`,
        hint: "这是一个迷你 RAG 系统！你可以改 kb 字典添加更多知识。接入真实 LLM 时，只需把 ask 函数改成调用 API 即可。"
      }
    },
    {
      id: "s3-l7",
      type: "quiz",
      title: "第三阶段测验（结业）",
      duration: "5 分钟",
      badge: "测验",
      content: `<div class="block"><h2>🎓 最终测验</h2><p>恭喜走到最后！完成这份测验，你就完成了整个学习旅程。</p></div>`,
      quiz: [
        {
          q: "Transformer 的核心机制是什么？",
          opts: ["卷积操作", "自注意力机制", "循环连接", "池化"],
          ans: 1,
          explain: "Transformer 的核心是自注意力（Self-Attention），论文标题就是《Attention Is All You Need》。"
        },
        {
          q: "大语言模型本质上在做的最核心任务是？",
          opts: ["翻译", "预测下一个词", "识别图片", "下棋"],
          ans: 1,
          explain: "LLM 的核心是「给定上文预测下一个词」，反复迭代生成整段文字。"
        },
        {
          q: "RAG（检索增强生成）解决的核心问题是？",
          opts: ["让模型更快", "让模型能基于外部知识库/最新资料回答", "让模型更小", "让模型免费"],
          ans: 1,
          explain: "RAG 先检索相关资料，再让模型基于资料回答，解决知识过时和私有数据问题。"
        },
        {
          q: "AI Agent 相比普通聊天机器人最大的区别是？",
          opts: ["能调用工具并自主完成多步任务", "回答更长", "更便宜", "只能聊天"],
          ans: 0,
          explain: "Agent = LLM + 工具调用 + 自主规划，能从「说」进化到「做」。"
        }
      ]
    }
  ]
});
