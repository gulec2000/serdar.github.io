# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository shape
- Monorepo-style layout with two primary apps:
  - `frontend/`: Vite + React portfolio UI.
  - `backend/`: FastAPI service with MongoDB (Motor) and a small status API.
- Root-level `README.md` currently has no operational setup details, so rely on commands below and app-specific files.

## Common development commands

### Frontend (`frontend/`)
- Install dependencies:
  - `npm install`
- Start local dev server:
  - `npm run dev`
- Build production bundle:
  - `npm run build`
- Preview production build:
  - `npm run preview`
- Type check / lint (configured as TypeScript no-emit check):
  - `npm run lint`
- Clean build output:
  - `npm run clean`

### Backend (`backend/`)
- Create and activate a virtual environment (example):
  - `python3 -m venv .venv`
  - `source .venv/bin/activate`
- Install dependencies:
  - `pip install -r requirements.txt`
- Run API locally (from `backend/`):
  - `uvicorn server:app --reload --host 0.0.0.0 --port 8000`
- Run all tests (from repo root or `backend/`):
  - `pytest`
- Run a single test:
  - `pytest path/to/test_file.py::test_name -q`
- Formatting/lint/type-check tools available from requirements:
  - `black .`
  - `isort .`
  - `flake8 .`
  - `mypy .`

## Environment and configuration
- Frontend expects `GEMINI_API_KEY` in `frontend/.env.local` (`frontend/README.md`).
- Backend requires `MONGO_URL` and `DB_NAME` in `backend/.env` (read in `backend/server.py`).
- CORS origins are read from `CORS_ORIGINS` (comma-separated), defaulting to `*`.

## High-level architecture

### Frontend architecture (Vite React app)
- Active app entrypoint is `frontend/src/main.js`, which mounts `App`.
- `App` composes the page as section-driven layout:
  - fixed/navigation shell via `components/Sidebar.js`
  - content sections (`Hero`, `Experience`, `Projects`, `SkillsBento`, `Blog`, `Contact`)
- Global language state is provided by `context/LanguageContext.js`:
  - EN/DE toggle in sidebar switches the translation dictionary from `data/translations.js`
  - Most user-facing copy is centrally sourced from `translations.js`
- Visitor analytics features are Firebase/Firestore-based:
  - `components/VisitorCounter.js` records unique-per-session visits, increments `stats/global`, and renders live total.
  - `components/RecentVisitors.js` and `components/VisitorMap.js` subscribe to `visitors` collection for real-time location activity UI.
- Contact form is client-side and posts directly to Formspree (`components/Contact.js`), independent of backend API.
- Vite config (`frontend/vite.config.ts`) sets alias `@ -> src`, supports JSX in `.js` files, and injects `process.env.GEMINI_API_KEY`.

### Backend architecture (single FastAPI module)
- Entire backend lives in `backend/server.py`.
- On startup:
  - loads env from `backend/.env`
  - creates async Mongo client via Motor
  - selects database from `DB_NAME`
- API routes are mounted under `/api`:
  - `GET /api/` health-style hello route
  - `POST /api/status` inserts a status record
  - `GET /api/status` lists recent status records (without Mongo `_id`)
- Data model uses Pydantic (`StatusCheck`, `StatusCheckCreate`) and stores timestamps as ISO strings in Mongo, converting back on read.

## Project-specific implementation constraints
- `design_guidelines.json` captures the intended visual/system design direction and should guide UI changes.
- Interactive elements are expected to keep `data-testid` attributes (also specified in `design_guidelines.json`).
- There are legacy/alternate files present (for example `src/index.js`, `craco.config.js`, and both `firebaseConfig.js` + `firebaseConfig.ts`); prefer following the active Vite path (`src/main.js`, `vite.config.ts`) unless deliberately refactoring.
