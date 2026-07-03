from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin
from app.database import get_db

router = APIRouter(prefix="/api/testimonials", tags=["Testimonials"])


@router.get("", response_model=list[schemas.TestimonialOut])
def read_testimonials(db: Session = Depends(get_db)):
    """Public: only approved testimonials are returned."""
    return crud.list_approved_testimonials(db)


@router.post("", response_model=schemas.TestimonialOut, status_code=201)
def submit_testimonial(payload: schemas.TestimonialCreate, db: Session = Depends(get_db)):
    """Public submission; stored unapproved until an admin approves it."""
    return crud.create_testimonial(db, payload, approved=False)


@router.get("/admin/all", response_model=list[schemas.TestimonialOut])
def read_all_testimonials(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return crud.list_all_testimonials(db)


@router.patch("/admin/{testimonial_id}/approve", response_model=schemas.TestimonialOut)
def approve_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    testimonial = crud.set_testimonial_approval(db, testimonial_id, approved=True)
    if testimonial is None:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial
