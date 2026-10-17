# AI Interactive Learning Platform

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://imyuniverse.github.io/learn-ai-from-zero/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/English-中文-bilingual-orange)](#)
[![Made with Pyodide](https://img.shields.io/badge/Python-Pyodide-3776AB)](https://pyodide.org/)

> An interactive AI / CS learning platform — from zero to mastery, running entirely in your browser.

**Audience**: Newcomers to AI — anyone curious about how modern AI actually works, whether you're a student, a self-learner, or a developer from another field.

🔗 **Live demo**: <https://imyuniverse.github.io/learn-ai-from-zero/>

---

## ✨ Features

- **🌓 Dark mode by default** — Dark/light theme toggle, preference remembered across visits.
- **🏠 Hero landing page** — A polished welcome screen with learning-path overview (bento cards) and stats.
- **🔍 Global search** — Instantly find lessons by keyword (matches titles and summaries in both languages).
- **🌐 Bilingual (English / 中文)** — One-click language toggle; the entire UI and all course content switch instantly. English is the default.
- **💻 Run Python in-browser** — Powered by [Pyodide](https://pyodide.org/), so learners write and execute real Python with zero installation.
- **🎨 Interactive visualizations** — Linear regression, neural-network training, and the attention mechanism, all driven by sliders and buttons so concepts click intuitively.
- **📝 Quizzes** — Each stage ends with a quiz; passing unlocks the next stage.
- **🏆 Hands-on projects** — One full project per stage (linear model → handwritten-digit classifier → RAG assistant).
- **★ Key takeaways** — Every lesson ends with a one-line summary to consolidate what you learned.
- **📊 Progress tracking** — Learning progress is saved in `localStorage` and survives page refreshes.

## 🗺️ Learning Path

| Stage | Content | Project |
| --- | --- | --- |
| ① Foundation | Python + machine-learning intuition | Linear-regression price predictor |
| ② Neural Networks | Building a neural network from scratch + PyTorch | Handwritten-digit recognizer |
| ③ Modern AI | Transformers + LLMs + Agents | RAG course assistant |

## 🚀 Run Locally

This is a pure static site — no build tools required. The three files must sit in the same directory:

```bash
git clone https://github.com/imyuniverse/learn-ai-from-zero.git
cd learn-ai-from-zero
# Serve with any static server, e.g.:
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

> Note: Double-clicking `index.html` also works, but some browsers restrict local `file://` access. Using a local server is recommended.

## 📁 Project Structure

```
learn-ai-from-zero/
├── index.html        # Main page (UI framework, styles, language toggle)
├── course-data.js    # Course data (3 stages, 21 lessons, bilingual)
├── app.js            # App logic (navigation / Pyodide / visualizations / quizzes / i18n)
├── LICENSE           # MIT license
└── README.md         # This file
```

## 🛠️ Tech Stack

- **Vanilla HTML / CSS / JavaScript** — No framework, no build step; works out of the box.
- **[Pyodide](https://pyodide.org/)** — A Python runtime in the browser (loaded via CDN).
- **[GitHub Pages](https://pages.github.com/)** — Free static hosting.

## 🤝 Contributing

Issues and pull requests are welcome!

- **Adding a lesson**: Follow the existing structure in `course-data.js` (always provide both `zh` and `en` content).
- **Improving a visualization**: The logic lives in the `renderViz`-related functions in `app.js`.
- **Fixing a bug**: Open a PR directly.

## 📄 License

This project is licensed under the [MIT License](LICENSE). The course content and code samples may be freely studied, modified, and distributed, but please retain the original attribution.

---

<sub>Built with ❤️ for anyone learning AI from scratch.</sub>
