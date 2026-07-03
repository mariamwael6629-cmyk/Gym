# 🏋️‍♂️ Gym Website — Full-Stack Project

A premium, bilingual (**English / Arabic**) gym landing page powered by a high-performance **FastAPI** REST API and a lightweight, fast **Vanilla JavaScript** frontend.

---

## 🚀 Features

* **🌐 Full Bilingual Support:** Complete English and Arabic toggle with seamless Right-to-Left (RTL) layout switching using native CSS.
* **⚡ Ultra-Fast Frontend:** Built with pure Vanilla JS and modern CSS (Grid/Flexbox) for instant loading, keeping deployment dead-simple.
* **📊 Dynamic Content Management:** Gym information, available services, and user testimonials are fetched dynamically from the database via REST endpoints.
* **🛡️ Secure Admin Panel:** Protected write/update endpoints secured via JWT (JSON Web Tokens) with password hashing.
* **📩 Integrated Contact Form:** User inquiries are captured, stored securely in the database, and accessible via admin endpoints.
* **📱 Fully Responsive:** Mobile-first design architecture featuring fluid grids and a responsive burger menu.
* **📝 Self-Documenting API:** Interactive Swagger UI automatically generated and available out-of-the-box.

---

## 📂 Project Structure

```text
Gym/
├── frontend/
│   ├── index.html          # Main single-page site
│   ├── css/
│   │   └── style.css       # Clean, modern UI & responsive styles
│   └── js/
│       ├── config.js       # API base URL configuration
│       └── app.js          # Language toggle, API fetches, & form handling
│
└── backend/
    ├── app/
    │   ├── main.py         # FastAPI application entry point, CORS, & startup seeding
    │   ├── config.py       # Environment variable & settings management
    │   ├── database.py     # SQLAlchemy engine setup & session management
    │   ├── models.py       # SQLAlchemy ORM models
    │   ├── schemas.py      # Pydantic v2 data validation schemas
    │   ├── auth.py         # JWT authentication & password hashing logic
    │   ├── crud.py         # Centralized business logic & database service layer
    │   └── routers/
    │       ├── gym_info.py     # Gym details endpoints
    │       ├── services.py     # Gym services endpoints
    │       ├── testimonials.py # Testimonial management (Public submission & Admin approval)
    │       ├── contact.py      # Contact messages handler
    │       └── auth.py         # Admin authentication router
    ├── seed.py             # Database seeder utility with mock gym data
    ├── requirements.txt    # Python dependencies list
    ├── .env.example        # Environment template file
    └── README.md           # Backend-specific documentation

```

---

## 🛠️ Tech Stack

### Frontend

* **Core:** HTML5, CSS3 (Custom Properties, CSS Grid, Flexbox)
* **Scripting:** Vanilla JavaScript (ES2020) for optimal performance and no bundle overhead
* **Typography:** Google Fonts (*Bebas Neue* for headings, *Barlow* for English prose, *Cairo* for Arabic layout)

### Backend

* **Framework:** Python 3.11+, FastAPI
* **Database & ORM:** SQLAlchemy 2.0, SQLite (Default development database)
* **Validation:** Pydantic v2
* **Security:** `python-jose` (JWT tokens), `passlib` with `bcrypt` (Secure hashing)

---

## ⚙️ Quick Start

### 1. Backend Setup

Navigate to the backend directory, initialize your virtual environment, and fire up the server:

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env            # Ensure to update SECRET_KEY and ADMIN_PASSWORD in your .env

# Seed database with mock data
python seed.py                  

# Start the live-reloading development server
uvicorn app.main:app --reload --port 8000

```

> 💡 **API Documentation:** Once the server is running, you can explore and test the endpoints interactively via Swagger UI at: `http://localhost:8000/docs`

### 2. Frontend Setup

Since the frontend is built entirely using vanilla web technologies, you can serve it using any simple static HTTP server:

```bash
cd frontend

# Using Python's built-in HTTP server
python -m http.server 5500

```

Now open your browser and visit: `http://localhost:5500`

> ⚠️ **Configuration Note:** The frontend references `window.API_BASE_URL` defined in `frontend/js/config.js` (defaults to `http://localhost:8000`). Make sure to modify this file if your backend is running on a different port or host.

---

## 📋 API Reference

### Public Endpoints

| Method | Path | Description |
| --- | --- | --- |
| **GET** | `/api/health` | Service health status check |
| **GET** | `/api/gym-info` | Fetch public gym details (Address, contact, metadata) |
| **GET** | `/api/services` | Retrieve a list of gym classes/services |
| **GET** | `/api/testimonials` | Retrieve approved client testimonials |
| **POST** | `/api/testimonials` | Submit a public client testimonial (defaults to *pending*) |
| **POST** | `/api/contact` | Submit a message through the contact form |
| **POST** | `/api/auth/login` | Exchange admin credentials for a JWT Access Token |

### Admin Endpoints (Requires Authentication)

| Method | Path | Description |
| --- | --- | --- |
| **PUT** | `/api/gym-info` | Update primary gym metadata |
| **POST** | `/api/services` | Add a new gym class or service |
| **GET** | `/api/testimonials/admin/all` | Fetch all testimonials (Both approved and pending) |
| **PATCH** | `/api/testimonials/admin/{id}/approve` | Approve a pending testimonial by ID |
| **GET** | `/api/contact/admin/all` | View all submitted user contact messages |

> 🔒 **Authentication:** Protected endpoints expect an `Authorization` header containing the JWT token format: `Bearer <your_jwt_token>`.

---

## 🔐 Environment Configurations

Ensure your `backend/.env` file contains valid entries for the following variables:

| Variable | Default Value | Description |
| --- | --- | --- |
| `DATABASE_URL` | `sqlite:///./gym.db` | SQLAlchemy connection string |
| `SECRET_KEY` | *[Change Me]* | High-entropy string used to sign JWT tokens |
| `ALGORITHM` | `HS256` | Hashing algorithm for token encryption |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | Lifespan of a generated admin token |
| `ADMIN_USERNAME` | `admin` | Initial access username for the administration portal |
| `ADMIN_PASSWORD` | *[Change Me]* | Strong secure password for initial admin access |
| `CORS_ORIGINS` | `http://localhost:5500` | Allowed client origins for safe cross-origin resource sharing |

---

## 🌐 Deployment Guidelines

1. **Production Database:** Replace the local SQLite string (`sqlite:///./gym.db`) with an enterprise-ready database connection instance (such as **PostgreSQL**).
2. **Key Security:** Generate a highly secure random cryptographically backed `SECRET_KEY` via terminal command:
```bash
openssl rand -hex 32

```


3. **CORS Hardening:** Update `CORS_ORIGINS` inside production environment parameters to whitelist only your explicit public frontend URL domain.
4. **Endpoint URL Syncing:** Change `API_BASE_URL` inside `frontend/js/config.js` to point directly to your deployed backend API URL endpoint.
5. **Static Hosting:** The static `frontend/` folder can be optimally hosted for free via platforms like **GitHub Pages**, **Vercel**, or served through a reverse proxy server like **Nginx**.

```