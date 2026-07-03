from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# ---------- Gym Info ----------
class GymInfoBase(BaseModel):
    name_en: str = Field(..., min_length=1, max_length=120)
    name_ar: str = Field(..., min_length=1, max_length=120)
    tagline_en: str = Field("", max_length=255)
    tagline_ar: str = Field("", max_length=255)
    phone: str = Field("", max_length=40)
    email: str = Field("", max_length=120)
    address_en: str = Field("", max_length=255)
    address_ar: str = Field("", max_length=255)
    working_hours_en: str = Field("", max_length=120)
    working_hours_ar: str = Field("", max_length=120)
    facebook_url: str = "#"
    instagram_url: str = "#"
    whatsapp_url: str = "#"
    tiktok_url: str = "#"


class GymInfoUpdate(GymInfoBase):
    pass


class GymInfoOut(GymInfoBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Services ----------
class ServiceBase(BaseModel):
    order: int = 0
    title_en: str = Field(..., min_length=1, max_length=120)
    title_ar: str = Field(..., min_length=1, max_length=120)
    description_en: str = ""
    description_ar: str = ""
    image_url: str = ""


class ServiceCreate(ServiceBase):
    pass


class ServiceOut(ServiceBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Testimonials ----------
class TestimonialBase(BaseModel):
    reviewer_name: str = Field(..., min_length=1, max_length=120)
    text_en: str = Field(..., min_length=1)
    text_ar: str = ""
    rating: int = Field(5, ge=1, le=5)


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialOut(TestimonialBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    is_approved: bool
    created_at: datetime


# ---------- Contact ----------
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field("", max_length=40)
    message: str = Field(..., min_length=1, max_length=2000)


class ContactMessageOut(ContactMessageCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime
    is_read: bool


# ---------- Auth ----------
class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
