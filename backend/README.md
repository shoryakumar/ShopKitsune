# ShopKitsune Backend

This is the backend for ShopKitsune, built with FastAPI and PostgreSQL.

## Setup

1. Create and activate the virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart aiofiles sqlalchemy asyncpg
   ```
3. (Optional) Set up PostgreSQL and update the database URL in `.env`.

## Running the Server

```bash
uvicorn main:app --reload
```

## API Overview
- `/profile/style` — Style profiling (image/text analysis)
- `/recommendations` — AI-driven recommendations
- `/virtual-tryon` — Virtual try-on endpoints
- `/chatbot` — Chatbot (Rasa integration)
- `/loyalty` — Loyalty program management

---

This backend is designed to power the Next.js frontend in the root directory. 