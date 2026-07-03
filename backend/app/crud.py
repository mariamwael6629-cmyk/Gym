"""Service/controller layer: business logic that sits between routers and the DB."""
from sqlalchemy.orm import Session

from app import models, schemas


def get_gym_info(db: Session) -> models.GymInfo | None:
    return db.query(models.GymInfo).first()


def upsert_gym_info(db: Session, data: schemas.GymInfoUpdate) -> models.GymInfo:
    info = get_gym_info(db)
    if info is None:
        info = models.GymInfo(**data.model_dump())
        db.add(info)
    else:
        for field, value in data.model_dump().items():
            setattr(info, field, value)
    db.commit()
    db.refresh(info)
    return info


def list_services(db: Session) -> list[models.Service]:
    return db.query(models.Service).order_by(models.Service.order.asc()).all()


def create_service(db: Session, data: schemas.ServiceCreate) -> models.Service:
    service = models.Service(**data.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def list_approved_testimonials(db: Session) -> list[models.Testimonial]:
    return (
        db.query(models.Testimonial)
        .filter(models.Testimonial.is_approved.is_(True))
        .order_by(models.Testimonial.created_at.desc())
        .all()
    )


def list_all_testimonials(db: Session) -> list[models.Testimonial]:
    return db.query(models.Testimonial).order_by(models.Testimonial.created_at.desc()).all()


def create_testimonial(db: Session, data: schemas.TestimonialCreate, approved: bool = False) -> models.Testimonial:
    testimonial = models.Testimonial(**data.model_dump(), is_approved=approved)
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


def set_testimonial_approval(db: Session, testimonial_id: int, approved: bool) -> models.Testimonial | None:
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if testimonial is None:
        return None
    testimonial.is_approved = approved
    db.commit()
    db.refresh(testimonial)
    return testimonial


def create_contact_message(db: Session, data: schemas.ContactMessageCreate) -> models.ContactMessage:
    message = models.ContactMessage(**data.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def list_contact_messages(db: Session) -> list[models.ContactMessage]:
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()
