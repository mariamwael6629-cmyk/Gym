from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class GymInfo(Base):
    __tablename__ = "gym_info"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name_en: Mapped[str] = mapped_column(String(120), nullable=False)
    name_ar: Mapped[str] = mapped_column(String(120), nullable=False)
    tagline_en: Mapped[str] = mapped_column(String(255), default="")
    tagline_ar: Mapped[str] = mapped_column(String(255), default="")
    phone: Mapped[str] = mapped_column(String(40), default="")
    email: Mapped[str] = mapped_column(String(120), default="")
    address_en: Mapped[str] = mapped_column(String(255), default="")
    address_ar: Mapped[str] = mapped_column(String(255), default="")
    working_hours_en: Mapped[str] = mapped_column(String(120), default="")
    working_hours_ar: Mapped[str] = mapped_column(String(120), default="")
    facebook_url: Mapped[str] = mapped_column(String(255), default="#")
    instagram_url: Mapped[str] = mapped_column(String(255), default="#")
    whatsapp_url: Mapped[str] = mapped_column(String(255), default="#")
    tiktok_url: Mapped[str] = mapped_column(String(255), default="#")


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    order: Mapped[int] = mapped_column(Integer, default=0)
    title_en: Mapped[str] = mapped_column(String(120), nullable=False)
    title_ar: Mapped[str] = mapped_column(String(120), nullable=False)
    description_en: Mapped[str] = mapped_column(Text, default="")
    description_ar: Mapped[str] = mapped_column(Text, default="")
    image_url: Mapped[str] = mapped_column(String(500), default="")


class Testimonial(Base):
    __tablename__ = "testimonials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    reviewer_name: Mapped[str] = mapped_column(String(120), nullable=False)
    text_en: Mapped[str] = mapped_column(Text, nullable=False)
    text_ar: Mapped[str] = mapped_column(Text, default="")
    rating: Mapped[int] = mapped_column(Integer, default=5)
    is_approved: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(40), default="")
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)


class AdminUser(Base):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
