// ============================================================
// CUHK AI 交互式学习平台 - 应用逻辑
// ============================================================

const STORAGE_KEY = 'cuhk_ai_platform_v1';
let progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
let currentLessonId = null;
let pyodide = null;
let pyodideLoading = false;

// ===== 进度 =====
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  updateProgressBar();
}
function updateProgressBar() {
  const all = COURSE.flatMap(s => s.lessons);
  const done = all.filter(l => progress[l.id]).length;
  const pct = all.length ? (done / all.length * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = done + '/' + all.length;
}

// ===== 侧边栏导航 =====
function renderSidebar() {
  const sb = document.getElementById('sidebar');
  let html = '';
  COURSE.forEach(stage => {
    html += `<div class="stage-label">${stage.title}</div>`;
    stage.lessons.forEach(l => {
      const icon = l.type === 'demo' ? '🎨' : l.type === 'project' ? '🏆' : l.type === 'quiz' ? '📝' : '📖';
      const done = progress[l.id] ? 'done' : '';
      const active = l.id === currentLessonId ? 'active' : '';
      const typeLabel = l.type === 'demo' ? '演示' : l.type === 'project' ? '项目' : l.type === 'quiz' ? '测验' : '';
      html += `<div class="nav-item ${done} ${active}" onclick="openLesson('${l.id}')">
        <span class="n-ico">${icon}</span>
        <span>${l.title}</span>
        ${typeLabel ? `<span class="n-type">${typeLabel}</span>` : ''}
        <span class="n-check">✓</span>
      </div>`;
    });
  });
  sb.innerHTML = html;
}

// ===== 打开课程 =====
function openLesson(id) {
  currentLessonId = id;
  const lesson = findLesson(id);
  if (!lesson) return;
  renderSidebar();
  renderLesson(lesson);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.innerWidth <= 860) toggleSidebar(false);
}

function findLesson(id) {
  for (const stage of COURSE) {
    for (const l of stage.lessons) {
      if (l.id === id) return l;
    }
  }
  return null;
}

function getLessonIndex(id) {
  const all = COURSE.flatMap(s => s.lessons);
  return all.findIndex(l => l.id === id);
}

// ===== 渲染课程主体 =====
function renderLesson(lesson) {
  const main = document.getElementById('main');
  const stage = COURSE.find(s => s.lessons.some(l => l.id === lesson.id));

  const badgeClass = lesson.type === 'demo' ? 'demo' : lesson.type === 'project' ? 'project' : lesson.type === 'quiz' ? 'quiz' : 'lesson';
  const badgeText = lesson.badge || (lesson.type === 'lesson' ? '课程' : '');

  let codeHtml = '';
  if (lesson.code) {
    codeHtml = `
    <div class="code-lab" id="codeLab">
      <div class="lab-head">
        <span class="lab-title">💻 ${lesson.code.title}</span>
        <span class="status"><span class="spinner"></span><span class="status-text">${pyodide ? '就绪' : '点击运行加载 Python'}</span></span>
      </div>
      <textarea id="codeEditor" spellcheck="false">${escapeHtml(lesson.code.initial)}</textarea>
      <div class="lab-foot">
        <button class="btn-run" id="runBtn" onclick="runCode()">▶ 运行</button>
        <button class="btn-reset" onclick="resetCode()">↺ 重置</button>
      </div>
      <div class="output" id="codeOutput">点击「运行」查看结果（首次加载 Python 环境需几秒）</div>
      ${lesson.code.hint ? `<div class="hint">💡 ${lesson.code.hint}</div>` : ''}
    </div>`;
  }

  let vizHtml = '';
  if (lesson.viz) {
    vizHtml = `<div class="viz-box" id="vizBox"></div>`;
  }

  let quizHtml = '';
  if (lesson.quiz) {
    quizHtml = renderQuizHtml(lesson);
  }

  const idx = getLessonIndex(lesson.id);
  const all = COURSE.flatMap(s => s.lessons);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  main.innerHTML = `
    <div class="lesson-head">
      <div class="crumbs">${stage.title} · ${idx + 1}/${all.length}</div>
      ${badgeText ? `<span class="lesson-badge ${badgeClass}">${badgeText}</span>` : ''}
      <h1>${lesson.title}</h1>
      ${lesson.duration ? `<div class="sub">⏱ 预计 ${lesson.duration}</div>` : ''}
    </div>
    ${lesson.content || ''}
    ${codeHtml}
    ${vizHtml}
    ${quizHtml}
    <div class="lesson-nav">
      <button onclick="${prev ? `openLesson('${prev.id}')` : ''}" ${prev ? '' : 'disabled'}>← 上一课</button>
      <button class="primary" onclick="completeLesson()">${progress[lesson.id] ? '已学完 ✓' : '标记为已学完'}</button>
      <button onclick="${next ? `openLesson('${next.id}')` : ''}" ${next ? '' : 'disabled'}>下一课 →</button>
    </div>
  `;

  // 渲染可视化
  if (lesson.viz) {
    renderViz(lesson.viz.type, document.getElementById('vizBox'));
  }

  // 渲染内容里内嵌的可视化容器
  const inlineScope = document.getElementById('aiScope');
  if (inlineScope) renderAIScope(inlineScope);
  const inlineAtt = document.getElementById('attentionViz');
  if (inlineAtt) renderAttentionSvg(inlineAtt);
}

// ===== 测验 =====
function renderQuizHtml(lesson) {
  let qs = lesson.quiz.map((q, qi) => `
    <div class="q" data-q="${qi}">
      <div class="q-title"><span class="q-num">${qi + 1}</span>${q.q}</div>
      ${q.opts.map((opt, oi) => `
        <div class="opt" data-opt="${oi}" onclick="selectOption(${qi}, ${oi}, ${q.ans})">
          <span class="radio">✓</span>${opt}
        </div>`).join('')}
      <div class="explain">${q.explain}</div>
    </div>`).join('');

  return `
    <div class="quiz" id="quizBox">
      <h2 style="font-size:20px;font-weight:800;margin-bottom:8px">📝 小测验</h2>
      ${qs}
      <button class="btn-run" style="margin-top:8px" onclick="checkQuiz()">提交答案</button>
      <div class="quiz-result" id="quizResult"></div>
    </div>`;
}

let quizAnswers = {};
function selectOption(qi, oi, ans) {
  const quizBox = document.getElementById('quizBox');
  const qEl = quizBox.querySelector(`.q[data-q="${qi}"]`);
  // 如果已经答过，不允许改（除非重做）
  if (qEl.classList.contains('answered')) return;

  qEl.querySelectorAll('.opt').forEach(opt => opt.classList.remove('selected'));
  const selected = qEl.querySelector(`.opt[data-opt="${oi}"]`);
  selected.classList.add('selected');
  quizAnswers[qi] = { oi, ans };
}

function checkQuiz() {
  const quizBox = document.getElementById('quizBox');
  const qs = quizBox.querySelectorAll('.q');
  let correct = 0;

  qs.forEach((qEl, qi) => {
    const answer = quizAnswers[qi];
    if (answer === undefined) {
      // 未作答
      return;
    }
    qEl.classList.add('answered');
    qEl.querySelectorAll('.opt').forEach(opt => {
      const oi = parseInt(opt.dataset.opt);
      if (oi === answer.ans) opt.classList.add('correct');
      else if (oi === answer.oi) opt.classList.add('wrong');
    });
    qEl.querySelector('.explain').classList.add('show');
    if (answer.oi === answer.ans) correct++;
  });

  const total = qs.length;
  const result = document.getElementById('quizResult');
  result.style.display = 'block';
  if (correct === total) {
    result.className = 'quiz-result pass';
    result.textContent = `🎉 满分通过！答对 ${correct}/${total} 题`;
    // 自动标记完成
    progress[currentLessonId] = true;
    saveProgress();
    renderSidebar();
  } else {
    result.className = 'quiz-result fail';
    result.textContent = `答对 ${correct}/${total} 题，再试一次吧！`;
  }
}

// ===== 完成课程 =====
function completeLesson() {
  progress[currentLessonId] = !progress[currentLessonId];
  saveProgress();
  renderSidebar();
  renderLesson(findLesson(currentLessonId));
}

// ===== Pyodide 代码执行 =====
// 注意：不能命名为 loadPyodide —— 会覆盖 Pyodide 库的全局函数导致死锁
async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (pyodideLoading) {
    // 等待加载完成
    while (pyodideLoading) {
      await new Promise(r => setTimeout(r, 200));
    }
    return pyodide;
  }
  pyodideLoading = true;
  const status = document.querySelector('#codeLab .status-text');
  if (status) status.textContent = '正在加载 Python 环境...';
  try {
    // 调用 pyodide.js 提供的全局 loadPyodide
    pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
    if (status) status.textContent = '就绪';
  } catch (e) {
    if (status) status.textContent = '加载失败：' + e.message;
    throw e;
  } finally {
    pyodideLoading = false;
  }
  return pyodide;
}

async function runCode() {
  const output = document.getElementById('codeOutput');
  const btn = document.getElementById('runBtn');
  const lab = document.getElementById('codeLab');
  const code = document.getElementById('codeEditor').value;

  btn.disabled = true;
  btn.textContent = '⏳ 运行中...';
  lab.classList.add('loading');
  output.classList.remove('err');
  output.textContent = '';

  try {
    const py = await ensurePyodide();
    // 捕获 stdout
    py.runPython(`
import sys, io
_stdout = io.StringIO()
sys.stdout = _stdout
sys.stderr = _stdout
`);
    await py.runPythonAsync(code);
    const result = py.runPython('_stdout.getvalue()');
    output.textContent = result || '(无输出，代码运行成功)';
  } catch (e) {
    output.classList.add('err');
    output.textContent = '❌ 错误：\n' + e.message;
  } finally {
    btn.disabled = false;
    btn.textContent = '▶ 运行';
    lab.classList.remove('loading');
  }
}

function resetCode() {
  const lesson = findLesson(currentLessonId);
  if (lesson && lesson.code) {
    document.getElementById('codeEditor').value = lesson.code.initial;
    document.getElementById('codeOutput').textContent = '已重置，点击「运行」查看结果';
    document.getElementById('codeOutput').classList.remove('err');
  }
}

// ===== 可视化演示 =====
function renderViz(type, container) {
  if (type === 'linear-regression') renderLinearRegression(container);
  else if (type === 'nn-train') renderNNTrain(container);
  else if (type === 'attention') renderAttention(container);
  else if (type === 'aiScope') renderAIScope(container);
}

// --- AI 范围同心圆 ---
function renderAIScope(container) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 500 320');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '280');
  const circles = [
    { r: 140, color: '#2563eb', label: '人工智能 AI', sub: '让机器智能', y: 130 },
    { r: 100, color: '#7c3aed', label: '机器学习 ML', sub: '从数据中学', y: 165 },
    { r: 60, color: '#ec4899', label: '深度学习 DL', sub: '多层神经网络', y: 200 },
  ];
  let svgInner = '';
  circles.forEach(c => {
    svgInner += `<circle cx="250" cy="150" r="${c.r}" fill="none" stroke="${c.color}" stroke-width="3" opacity="0.7"/>`;
    svgInner += `<text x="250" y="${150 - c.r + 30}" text-anchor="middle" font-size="15" font-weight="700" fill="${c.color}">${c.label}</text>`;
    svgInner += `<text x="250" y="${150 - c.r + 48}" text-anchor="middle" font-size="11" fill="#6b7280">${c.sub}</text>`;
  });
  svgInner += `<text x="250" y="305" text-anchor="middle" font-size="11" fill="#6b7280">包含关系：AI ⊃ ML ⊃ DL</text>`;
  svg.innerHTML = svgInner;
  container.innerHTML = '';
  container.appendChild(svg);
}

// --- 线性回归可视化 ---
function renderLinearRegression(container) {
  const data = [
    [40, 250], [60, 350], [80, 430], [100, 520], [120, 610]
  ];
  let w = 5.0, b = 50.0;
  const W = 600, H = 360, pad = 50;

  container.innerHTML = `
    <h3 style="font-size:15px;font-weight:700;margin-bottom:8px">房价预测：y = w·x + b</h3>
    <canvas id="lrCanvas" width="${W}" height="${H}" style="width:100%;height:auto"></canvas>
    <div style="margin:12px 0;font-size:13px">
      <div style="display:flex;align-items:center;gap:10px;margin:8px 0">
        <span style="width:80px">斜率 w = <b id="lrW">${w.toFixed(1)}</b></span>
        <input type="range" id="lrWSlider" min="0" max="10" step="0.1" value="${w}" style="flex:1" oninput="lrUpdate()">
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin:8px 0">
        <span style="width:80px">截距 b = <b id="lrB">${b.toFixed(0)}</b></span>
        <input type="range" id="lrBSlider" min="-100" max="300" step="5" value="${b}" style="flex:1" oninput="lrUpdate()">
      </div>
      <div style="font-size:13px;color:#6b7280;margin-top:6px" id="lrError">误差（MSE）：计算中...</div>
    </div>
    <div class="viz-controls">
      <button onclick="lrAutoFit()" id="lrAutoBtn">✨ 自动拟合（梯度下降）</button>
      <button onclick="lrReset()">↺ 重置</button>
    </div>`;

  window.lrData = data;
  window.lrW = w;
  window.lrB = b;
  drawLR();
}

function drawLR() {
  const canvas = document.getElementById('lrCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, pad = 50;
  const data = window.lrData;
  const w = window.lrW, b = window.lrB;

  ctx.clearRect(0, 0, W, H);

  // 坐标范围
  const xMin = 0, xMax = 140, yMin = 0, yMax = 700;
  const toX = x => pad + (x - xMin) / (xMax - xMin) * (W - 2 * pad);
  const toY = y => H - pad - (y - yMin) / (yMax - yMin) * (H - 2 * pad);

  // 网格和轴
  ctx.strokeStyle = '#e5e7eb';
  ctx.fillStyle = '#6b7280';
  ctx.font = '11px sans-serif';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 140; x += 20) {
    ctx.beginPath(); ctx.moveTo(toX(x), pad); ctx.lineTo(toX(x), H - pad); ctx.stroke();
    ctx.fillText(x, toX(x) - 5, H - pad + 16);
  }
  for (let y = 0; y <= 700; y += 100) {
    ctx.beginPath(); ctx.moveTo(pad, toY(y)); ctx.lineTo(W - pad, toY(y)); ctx.stroke();
    ctx.fillText(y, 8, toY(y) + 4);
  }
  ctx.fillText('面积 (㎡)', W / 2, H - 10);
  ctx.save();
  ctx.translate(12, H / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('价格 (万)', 0, 0);
  ctx.restore();

  // 拟合线
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(w * 0 + b));
  ctx.lineTo(toX(140), toY(w * 140 + b));
  ctx.stroke();

  // 数据点
  let mse = 0;
  data.forEach(([x, y]) => {
    const pred = w * x + b;
    mse += (pred - y) ** 2;
    // 误差线
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(toX(x), toY(y));
    ctx.lineTo(toX(x), toY(pred));
    ctx.stroke();
    // 点
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(toX(x), toY(y), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  mse /= data.length;

  const errEl = document.getElementById('lrError');
  if (errEl) errEl.textContent = `误差（MSE）：${mse.toFixed(0)}（红色虚线越短，误差越小）`;
}

function lrUpdate() {
  window.lrW = parseFloat(document.getElementById('lrWSlider').value);
  window.lrB = parseFloat(document.getElementById('lrBSlider').value);
  document.getElementById('lrW').textContent = window.lrW.toFixed(1);
  document.getElementById('lrB').textContent = window.lrB.toFixed(0);
  drawLR();
}

function lrReset() {
  window.lrW = 5.0;
  window.lrB = 50.0;
  document.getElementById('lrWSlider').value = 5.0;
  document.getElementById('lrBSlider').value = 50.0;
  document.getElementById('lrW').textContent = '5.0';
  document.getElementById('lrB').textContent = '50';
  drawLR();
}

async function lrAutoFit() {
  const btn = document.getElementById('lrAutoBtn');
  btn.disabled = true;
  btn.textContent = '⏳ 训练中...';
  const data = window.lrData;
  // 在归一化空间训练（x' = x/100），收敛更快更稳；显示时转回原空间
  let w = 0, b = 0;   // y = w*x' + b
  const lr = 0.5;
  const epochs = 3000;
  for (let epoch = 0; epoch < epochs; epoch++) {
    let gw = 0, gb = 0;
    for (const [x0, y] of data) {
      const x = x0 / 100;
      const pred = w * x + b;
      gw += 2 * (pred - y) * x;
      gb += 2 * (pred - y);
    }
    w -= lr * gw / data.length;
    b -= lr * gb / data.length;
    if (epoch % 300 === 0) {
      // 转回原空间显示: y = (w/100)*x_orig + b
      const wShow = w / 100, bShow = b;
      window.lrW = wShow; window.lrB = bShow;
      document.getElementById('lrWSlider').value = Math.max(0, Math.min(10, wShow));
      document.getElementById('lrBSlider').value = Math.max(-100, Math.min(300, bShow));
      document.getElementById('lrW').textContent = wShow.toFixed(1);
      document.getElementById('lrB').textContent = bShow.toFixed(0);
      drawLR();
      await new Promise(r => setTimeout(r, 30));
    }
  }
  btn.disabled = false;
  btn.textContent = '✨ 自动拟合（梯度下降）';
}

// --- 神经网络训练可视化 ---
function renderNNTrain(container) {
  container.innerHTML = `
    <canvas id="nnCanvas" width="500" height="400" style="width:100%;max-width:500px;height:auto"></canvas>
    <div class="viz-controls">
      <button id="nnTrainBtn" onclick="nnTrain()">▶ 开始训练</button>
      <button onclick="nnReset()">↺ 重置</button>
    </div>
    <div style="text-align:center;font-size:13px;color:#6b7280;margin-top:10px" id="nnStatus">点击「开始训练」</div>`;

  window.nnData = {
    points: [],
    trained: false
  };
  // 生成数据：右上角一类，左下角一类（螺旋状）
  const pts = [];
  for (let i = 0; i < 40; i++) {
    // 类0：围绕左上
    const a0 = Math.random() * Math.PI;
    const r0 = Math.random() * 0.8;
    pts.push({ x: 0.2 + Math.cos(a0) * r0 * 0.5, y: 0.2 + Math.sin(a0) * r0 * 0.5, label: 0 });
    // 类1：围绕右下
    const a1 = Math.random() * Math.PI;
    const r1 = Math.random() * 0.8;
    pts.push({ x: 0.8 + Math.cos(a1) * r1 * 0.5, y: 0.8 + Math.sin(a1) * r1 * 0.5, label: 1 });
  }
  window.nnData.points = pts;
  drawNN(pts, null);
}

function drawNN(points, net) {
  const canvas = document.getElementById('nnCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // 决策边界（如果网络已训练）
  if (net) {
    const img = ctx.createImageData(W, H);
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const x = px / W, y = py / H;
        const pred = netForward(net, [x, y]);
        const idx = (py * W + px) * 4;
        if (pred > 0.5) {
          img.data[idx] = 239; img.data[idx + 1] = 68; img.data[idx + 2] = 68; img.data[idx + 3] = 40;
        } else {
          img.data[idx] = 37; img.data[idx + 1] = 99; img.data[idx + 2] = 235; img.data[idx + 3] = 40;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // 数据点
  points.forEach(p => {
    ctx.fillStyle = p.label === 0 ? '#2563eb' : '#ef4444';
    ctx.beginPath();
    ctx.arc(p.x * W, p.y * H, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // 图例
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(10, 10, 12, 12);
  ctx.fillStyle = '#1f2937';
  ctx.font = '12px sans-serif';
  ctx.fillText('类别 0', 28, 21);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(10, 30, 12, 12);
  ctx.fillText('类别 1', 28, 41);
}

// 小型神经网络
function makeNet() {
  const H = 6;
  const rand = () => Math.random() * 2 - 1;
  return {
    w1: Array.from({ length: 2 }, () => Array.from({ length: H }, rand)),
    b1: Array.from({ length: H }, rand),
    w2: Array.from({ length: H }, rand),
    b2: rand()
  };
}
function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
function netForward(net, x) {
  const h = net.w1[0].map((_, i) => sigmoid(net.w1[0][i] * x[0] + net.w1[1][i] * x[1] + net.b1[i]));
  let out = net.b2;
  for (let i = 0; i < h.length; i++) out += net.w2[i] * h[i];
  return sigmoid(out);
}
function trainStep(net, points, lr) {
  let totalLoss = 0;
  points.forEach(p => {
    const x = [p.x, p.y];
    const out = netForward(net, x);
    const y = p.label;
    totalLoss += (out - y) ** 2;
    const dOut = 2 * (out - y) * out * (1 - out);
    const h = net.w1[0].map((_, i) => sigmoid(net.w1[0][i] * x[0] + net.w1[1][i] * x[1] + net.b1[i]));
    for (let i = 0; i < net.w2.length; i++) net.w2[i] -= lr * dOut * h[i];
    net.b2 -= lr * dOut;
    for (let i = 0; i < net.w1[0].length; i++) {
      for (let j = 0; j < 2; j++) net.w1[j][i] -= lr * dOut * net.w2[i] * h[i] * (1 - h[i]) * x[j];
      net.b1[i] -= lr * dOut * net.w2[i] * h[i] * (1 - h[i]);
    }
  });
  return totalLoss / points.length;
}

async function nnTrain() {
  const btn = document.getElementById('nnTrainBtn');
  const status = document.getElementById('nnStatus');
  btn.disabled = true;
  const net = makeNet();
  const points = window.nnData.points;
  const lr = 1.5;

  for (let epoch = 0; epoch < 4000; epoch++) {
    const loss = trainStep(net, points, lr);
    if (epoch % 200 === 0) {
      drawNN(points, net);
      status.textContent = `训练中... 第 ${epoch} 轮，损失 ${loss.toFixed(4)}`;
      await new Promise(r => setTimeout(r, 10));
    }
  }
  drawNN(points, net);
  status.textContent = '✅ 训练完成！红色/蓝色区域就是网络学到的决策边界';
  btn.disabled = false;
}

function nnReset() {
  const net = null;
  window.nnData.trained = false;
  drawNN(window.nnData.points, null);
  document.getElementById('nnStatus').textContent = '点击「开始训练」';
}

// --- 注意力可视化 ---
// 内嵌简化版（SVG 静态示意图，用于课程内容中）
function renderAttentionSvg(container) {
  // 示意：句子中"它"→"动物"的注意力连线
  const words = ['动物', '没', '过', '马路', '因为', '它', '累'];
  const n = words.length;
  const W = 500, H = 150;
  let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="150">`;
  const xs = i => 40 + i * (W - 80) / (n - 1);
  // 连线："它"(idx5) 关注 "动物"(idx0) 粗线；"累"(idx6) 关注 "它"(idx5)
  const links = [
    { from: 5, to: 0, w: 0.9, color: '#2563eb' },
    { from: 6, to: 5, w: 0.7, color: '#7c3aed' },
    { from: 3, to: 3, w: 0.15, color: '#9ca3af' },
    { from: 5, to: 2, w: 0.15, color: '#9ca3af' },
  ];
  links.forEach(l => {
    const x1 = xs(l.from), y1 = 45;
    const x2 = xs(l.to), y2 = 105;
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${l.color}" stroke-width="${l.w * 6}" opacity="${Math.min(l.w + 0.2, 1)}" stroke-linecap="round"/>`;
  });
  words.forEach((word, i) => {
    const x = xs(i);
    const isKey = i === 5;
    svg += `<rect x="${x - 26}" y="27" width="52" height="34" rx="17" fill="${isKey ? '#2563eb' : '#f3f4f6'}" stroke="${isKey ? '#2563eb' : '#e5e7eb'}"/>`;
    svg += `<text x="${x}" y="49" text-anchor="middle" font-size="13" font-weight="${isKey ? '700' : '400'}" fill="${isKey ? '#fff' : '#1f2937'}">${word}</text>`;
  });
  svg += `<text x="${W / 2}" y="140" text-anchor="middle" font-size="11" fill="#6b7280">「它」最关注「动物」——这就是注意力机制学会的关联</text>`;
  svg += '</svg>';
  container.innerHTML = svg;
}

function renderAttention(container) {
  container.innerHTML = `
    <canvas id="attCanvas" width="600" height="300" style="width:100%;height:auto"></canvas>
    <div style="text-align:center;font-size:13px;color:#6b7280;margin-top:8px">点击句子里的词，看它"关注"哪些词（连线越粗越关注）</div>`;

  const sentence = ['动物', '没', '过', '马路', '，', '因为', '它', '太', '累', '了'];
  // 注意力矩阵（简化）："它"主要关注"动物"，"因为"连接前后
  const attention = {};
  sentence.forEach((w, i) => {
    attention[i] = new Array(sentence.length).fill(0.05);
    // 默认关注自己
    attention[i][i] = 1.0;
  });
  // 手动设置关键注意力
  // "它"(index 6) 关注 "动物"(0)
  attention[6][0] = 0.85;
  attention[6][6] = 0.3;
  // "因为"(5) 连接前后
  attention[5][6] = 0.5;
  attention[5][0] = 0.4;
  // "累"(8) 关注 "它"(6)
  attention[8][6] = 0.7;

  window.attData = { sentence, attention };
  window.attSelected = 6; // 默认选中"它"

  drawAttention(container);
}

function drawAttention(container) {
  const canvas = document.getElementById('attCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const { sentence, attention } = window.attData;
  const selected = window.attSelected;

  ctx.clearRect(0, 0, W, H);

  const n = sentence.length;
  const positions = [];
  const topY = 70, botY = 230;
  for (let i = 0; i < n; i++) {
    positions.push({
      x: 30 + i * (W - 60) / (n - 1),
      y: i === selected ? topY : botY
    });
  }

  // 连线（从选中的词到其他词）
  const from = positions[selected];
  for (let i = 0; i < n; i++) {
    if (i === selected) continue;
    const w = attention[selected][i];
    const to = positions[i];
    ctx.strokeStyle = `rgba(37, 99, 235, ${w})`;
    ctx.lineWidth = w * 6;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  // 画词
  sentence.forEach((word, i) => {
    const p = positions[i];
    const isSel = i === selected;
    const width = ctx.measureText(word).width + 24;
    ctx.fillStyle = isSel ? '#2563eb' : '#f3f4f6';
    ctx.strokeStyle = isSel ? '#2563eb' : '#e5e7eb';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(p.x - width / 2, p.y - 18, width, 36, 18) : ctx.rect(p.x - width / 2, p.y - 18, width, 36);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = isSel ? '#fff' : '#1f2937';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, p.x, p.y);
  });

  // 点击交互
  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * (H / rect.height);
    for (let i = 0; i < n; i++) {
      const p = positions[i];
      const width = ctx.measureText(sentence[i]).width + 24;
      if (Math.abs(mx - p.x) < width / 2 && Math.abs(my - p.y) < 18) {
        window.attSelected = i;
        drawAttention(container);
        return;
      }
    }
  };
}

// ===== 工具函数 =====
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toggleSidebar(force) {
  const sb = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const open = force !== undefined ? force : !sb.classList.contains('open');
  if (window.innerWidth > 860) return;
  if (open) {
    sb.classList.add('open');
    overlay.classList.add('show');
  } else {
    sb.classList.remove('open');
    overlay.classList.remove('show');
  }
}

// ===== 初始化 =====
function init() {
  renderSidebar();
  updateProgressBar();
  // 打开第一课（或恢复上次进度）
  const all = COURSE.flatMap(s => s.lessons);
  const saved = all.find(l => progress[l.id]) && all.find(l => !progress[l.id]);
  const first = saved || all[0];
  openLesson(first.id);
}

document.addEventListener('DOMContentLoaded', init);
