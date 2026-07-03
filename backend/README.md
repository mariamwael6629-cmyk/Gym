# Gym Backend API

FastAPI backend for the gym website (gym info, services, testimonials, contact leads, admin auth).

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # edit values as needed
python seed.py             # creates DB + dummy gym data
uvicorn app.main:app --reload --port 8000
```

## API documentation

Once running, interactive docs are available at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | none | Health check |
| GET | `/api/gym-info` | none | Public gym info (name, phone, address, hours, socials) |
| PUT | `/api/gym-info` | admin | Update gym info |
| GET | `/api/services` | none | List services |
| POST | `/api/services` | admin | Create a service |
| GET | `/api/testimonials` | none | List approved testimonials |
| POST | `/api/testimonials` | none | Submit a testimonial (stored unapproved) |
| GET | `/api/testimonials/admin/all` | admin | List all testimonials |
| PATCH | `/api/testimonials/admin/{id}/approve` | admin | Approve a testimonial |
| POST | `/api/contact` | none | Submit a contact/lead message |
| GET | `/api/contact/admin/all` | admin | List contact messages |
| POST | `/api/auth/login` | none | Admin login, returns a JWT bearer token |

Admin endpoints require an `Authorization: Bearer <token>` header obtained from `/api/auth/login`
using the credentials in `.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).

## Notes

- Default DB is SQLite (`gym.db`), configurable via `DATABASE_URL` in `.env`.
- CORS origins are configurable via `CORS_ORIGINS` in `.env`.
- All gym contact details seeded by `seed.py` are placeholder/dummy data.
