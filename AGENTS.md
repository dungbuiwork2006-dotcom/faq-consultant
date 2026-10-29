\# AGENTS.md — Project Rules



\## Project

FAQ Chatbot \& Consultation Booking — Assignment 4.



\## Tech stack

\- Front-end: React + Vite.

\- Back-end: Node.js + Express.

\- AI: Gemini API, called only from the back-end.

\- Demo appointment storage: browser localStorage.

\- Version control: Git and GitHub.



\## General rules

1\. Read this file and README.md before making changes.

2\. Inspect existing files before creating, replacing, or deleting files.

3\. Do not rewrite the entire project to implement one feature.

4\. Do not modify another member's owned files without agreement.

5\. Never expose API keys, passwords, or `.env` contents.

6\. Never invent FAQ facts or present unsupported information as confirmed.

7\. If the knowledge base does not support an answer, explain the limitation and offer a consultation when appropriate.

8\. Validate appointment inputs before saving.

9\. Preserve existing working features.

10\. Do not claim tests passed unless they were actually run.



\## Front-end ownership

Developer A owns:

\- `frontend/src/components/`

\- `frontend/src/pages/`

\- `frontend/src/styles/`

\- `frontend/src/services/`

\- `frontend/src/utils/`

\- `frontend/src/App.jsx`



\## Back-end ownership

Developer B owns:

\- `backend/src/`

\- `backend/.env.example`

\- `backend/package.json`



\## Shared interface contract

\- `GET /api/health` returns `{ "status": "ok" }`.

\- `POST /api/chat` accepts `{ "message": "..." }`.

\- Chat response contains `answer`, `suggestions`, and `needsBooking`.

\- `suggestions` contains three related questions.

\- Appointment records use `id`, `name`, `phone`, `date`, `time`, and `status`.



\## Before finishing a task

\- List files changed.

\- Explain what changed and why.

\- State how to test the feature.

\- Report known limitations.

\- Keep changes limited to the assigned task.



