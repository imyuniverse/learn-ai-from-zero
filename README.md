# AI Interactive Learning Platform

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://imyuniverse.github.io/learn-ai-from-zero/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Language](https://img.shields.io/badge/中文-EN-bilingual-orange)](#)

> 从零到精通的 AI / CS 交互式学习平台 · An interactive AI / CS learning platform, from zero to mastery.

**面向人群 / Audience**：大学新生（尤其想学 CS / AI 的学生）· First-year university students (especially those wanting to learn CS / AI).

🔗 **在线体验 / Live demo**：<https://imyuniverse.github.io/learn-ai-from-zero/>

---

## ✨ 特性 / Features

- **🌐 中英双语 / Bilingual** — 一键切换中文 / English，界面与全部课程内容同步切换
- **💻 浏览器内运行 Python / Run Python in-browser** — 基于 [Pyodide](https://pyodide.org/)，无需安装任何环境
- **🎨 可视化演示 / Interactive visualizations** — 线性回归、神经网络训练、注意力机制，拖滑块 / 点按钮直观理解
- **📝 测验系统 / Quizzes** — 每个阶段结束有测验，答对解锁下一阶段
- **🏆 动手项目 / Hands-on projects** — 每阶段一个完整项目（线性模型 → 手写数字识别 → RAG 助手）
- **📊 进度追踪 / Progress tracking** — localStorage 记录学习进度，刷新不丢失

## 🗺️ 学习路线 / Learning Path

| 阶段 Stage | 内容 Content | 项目 Project |
| --- | --- | --- |
| ① 打地基 Foundation | Python + 机器学习直觉 | 线性回归预测 |
| ② 神经网络 Neural Networks | 从零实现神经网络 + PyTorch | 手写数字识别器 |
| ③ 现代 AI Modern AI | Transformer + LLM + Agent | RAG 课程助手 |

## 🚀 本地运行 / Run Locally

这是纯静态网站，无需构建工具。三个文件必须放在同一目录：

```bash
git clone https://github.com/imyuniverse/learn-ai-from-zero.git
cd learn-ai-from-zero
# 用任意静态服务器打开，例如：
python3 -m http.server 8000
# 然后浏览器访问 http://localhost:8000
```

> 注意：直接双击 `index.html` 也能用，但部分浏览器对本地 `file://` 有跨域限制，建议用本地服务器。

## 📁 项目结构 / Structure

```
learn-ai-from-zero/
├── index.html        # 主页面（UI 框架 + 样式 + 语言切换按钮）
├── course-data.js    # 课程数据（3 阶段 21 课，中英双语）
├── app.js            # 应用逻辑（导航 / Pyodide / 可视化 / 测验 / i18n）
├── LICENSE           # MIT 协议
└── README.md         # 本文件
```

## 🛠️ 技术栈 / Tech Stack

- **原生 HTML / CSS / JavaScript** — 无框架、无构建，单文件即用
- **[Pyodide](https://pyodide.org/)** — 浏览器里的 Python 运行时（通过 CDN 加载）
- **[GitHub Pages](https://pages.github.com/)** — 免费静态托管

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

- 想**增加课程**：在 `course-data.js` 中按现有结构添加 lesson（务必同时提供 `zh` 和 `en` 两套内容）
- 想**改进可视化**：可视化逻辑在 `app.js` 的 `renderViz` 相关函数中
- 想**修 bug**：直接提 PR

## 📄 许可证 / License

本项目采用 [MIT License](LICENSE)。课程内容与代码示例可自由学习、修改、分发，但请保留原作者署名。

---

<sub>Built with ❤️ for CUHK students learning AI · 为想学 AI 的 CUHK 学生打造</sub>
