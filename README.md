# AI Code Doctor Dashboard

A production-grade, fully self-contained single-page web application that simulates an **enterprise multi-agent LLM pipeline** for diagnosing, auditing, self-healing, and refactoring code.

## Features
- **Ultra-modern dark developer theme** — Slate/Zinc palette with ambient glows and smooth transitions
- **Split-screen workspace** — code editor on the left, agentic terminal + refactored output on the right
- **Simulated line-numbered code editor** — monospace textarea with tab support and traffic-light chrome
- **Real-time scrolling agent terminal** — color-coded logs per agent (green AST, amber Security, rose Healing, cyan Synthesizer)
- **Asynchronous agentic pipeline** — 4-agent sequence with realistic 700–1200ms delays using Promises and `setTimeout`
- **Self-healing dynamic loop** — intentionally fails, feeds traceback back into the "Coder LLM", and re-validates
- **Copy-to-clipboard output** — refactored, type-hinted, documented code with "Copied!" state feedback
- **Agent progress track** — live spinner/checkmark indicators showing which agent is active
- **Responsive design** — works from mobile to desktop
## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Pipeline | Native Promises + setTimeout (mock) |
