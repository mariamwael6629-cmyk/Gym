from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.database import Base, SessionLocal, engine
from app.routers import auth, contact, gym_info, services, testimonials
from app import models
from app.auth import hash_password

app = FastAPI(
    title="Gym Management API",
    description="Backend API powering the gym website: gym info, services, testimonials and contact leads.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gym_info.router)
app.include_router(services.router)
app.include_router(testimonials.router)
app.include_router(contact.router)
app.include_router(auth.router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Validation error", "errors": exc.errors()},
    )


@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "ok"}


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if not db.query(models.AdminUser).filter(models.AdminUser.username == settings.admin_username).first():
            db.add(
                models.AdminUser(
                    username=settings.admin_username,
                    hashed_password=hash_password(settings.admin_password),
                )
            )
            db.commit()
    finally:
        db.close()
