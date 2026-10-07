# AI Code Doctor Dashboard

A production-grade, fully self-contained single-page web application that simulates an **enterprise multi-agent LLM pipeline** for diagnosing, auditing, self-healing, and refactoring code.

> Zero API keys. Zero live endpoints. Instant response. Built for interview demos and guaranteed uptime.

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

## The Agentic State Pipeline

The core engine runs a 4-step asynchronous pipeline when the user clicks **Execute Agentic Healing Pipeline**:

### Step 1 — AST Parsing Agent (green)
1. `Initializing Static Code Analysis...`
2. `Parsing Abstract Syntax Tree...`
3. `Structural Node Verification: Done.`

### Step 2 — Security Auditor Agent (amber)
1. `Scanning code blocks for OWASP Top 10 vulnerabilities...`
2. `Detecting edge-case exceptions...`
3. **Conditional:** If input contains `password`, `eval`, `sql`, or `error` → logs `CRITICAL: Potential vulnerability/runtime threat found!`

### Step 3 — Self-Healing Dynamic Loop (rose)
- **If** input contains `error`, `bug`, `except`, or `fail`:
  1. `Compilation Mock Error: Execution failed on test block #2.` (red)
  2. `Triggering Self-Healing Loop Phase 1...` (red)
  3. `Feeding compiler traceback context back into Coder LLM...`
  4. `Re-running validation tests... Success!`
- **Else:** smooth transition with `No runtime anomalies detected — skipping self-healing loop.`

### Step 4 — Final Synthesizer Agent (cyan)
1. `Refactoring code blocks...`
2. `Optimizing time complexity...`
3. `Injecting comprehensive docstrings...`
4. `Pipeline Complete!`

After completion, the synthesizer produces a **refactored, type-hinted, documented** version of the user's code.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Pipeline | Native Promises + setTimeout (mock) |

## Project Structure

```
src/
├── App.tsx                    # Main app: layout + state wiring
├── index.css                  # Tailwind + custom animations/scrollbars
├── types.ts                   # Shared TypeScript types
├── lib/
│   ├── agents.ts              # Agent metadata (names, colors, IDs)
│   ├── pipeline.ts            # Pipeline step builder + log factory
│   └── codegen.ts             # Response injection mock code generator
├── hooks/
│   └── usePipeline.ts         # Async pipeline orchestration hook
└── components/
    ├── Header.tsx             # Nav bar with "Agents Online" badge
    ├── CodeEditor.tsx         # Line-numbered monospace editor + execute button
    ├── TerminalLog.tsx        # Real-time scrolling colored agent terminal
    ├── OutputBlock.tsx        # Refactored code output + copy button
    └── AgentTrack.tsx         # Agent progress indicators with spinners
```

## Getting Started

```bash
npm install
npm run dev
```

The app runs entirely in the browser with no backend, no API keys, and no network calls.

## Try It

The editor loads with a sample buggy Python function containing `error` and `None` checks — this triggers both the **vulnerability warning** (Step 2) and the **self-healing loop** (Step 3). Click **Execute** and watch the full pipeline run.

To see the clean path (no healing loop), remove words like `error`, `bug`, `except`, or `fail` from your input before executing.
