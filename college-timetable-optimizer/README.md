# SnapSchedule AI — College Timetable CSP Optimizer (Qualcomm AI)

A full-stack **College Timetable Conflict Detection & Optimization System** combining a deterministic **Constraint Satisfaction Problem (CSP) & Graph Coloring Solver** with **Qualcomm AI Inference Suite (`Llama-3.1-8B-Instruct` / Cloud AI 100 / Snapdragon Genie NPU)** integration.

---

## Architecture & Directory Structure

```text
college-timetable-optimizer/
├── backend/
│   ├── src/
│   │   ├── config/env.js              # Safe .env & runtime Qualcomm API key configuration
│   │   ├── data/seedData.js           # Faculty, Classrooms, Student Batches, Courses & Presets
│   │   ├── engine/
│   │   │   ├── conflictDetector.js    # Real-time Faculty, Classroom & Batch conflict detector
│   │   │   └── cspSolver.js           # MRV Backtracking + Graph Coloring timetable optimizer
│   │   ├── services/
│   │   │   └── qualcommAiService.js   # Qualcomm AI Inference Suite LLM client + Hybrid synthesizer
│   │   └── server.js                  # HTTP/REST API server + Static SPA host
│   └── tests/
│       └── engine.test.js             # Automated Node.js test suite
├── frontend/
│   ├── index.html                     # Interactive Dashboard, Matrix, Conflict Radar & Modals
│   ├── styles.css                     # Responsive dark-mode UI design system
│   └── app.js                         # Frontend state, SVG Conflict Graph & Qualcomm Copilot client
├── .env.example                       # Environment template for QUALCOMM_API_KEY
└── package.json
```

---

## Quick Start

1. **Run Automated Tests:**
   ```bash
   node --test backend/tests/engine.test.js
   ```

2. **Start the Full-Stack Server:**
   ```bash
   node backend/src/server.js
   ```
   Open **`http://localhost:4000`** in your browser.

3. **Configure Your Qualcomm API Key:**
   - **Option A (In-App UI):** Click the **"Configure Qualcomm Key"** button in the top navigation bar and paste your `QUALCOMM_API_KEY`, endpoint URL, and target model (`Llama-3.1-8B-Instruct`, `Llama-3.3-70B-Instruct`, or local Snapdragon Genie endpoint).
   - **Option B (`.env` File):** Copy `.env.example` to `.env` (or `~/.env`) and set `QUALCOMM_API_KEY`.
   - *Note:* When no live API key is configured, the backend automatically uses its **Neuro-Symbolic Hybrid Synthesizer** so all conflict analysis and Copilot features work out-of-the-box.
