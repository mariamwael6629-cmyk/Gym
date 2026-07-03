from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin
from app.database import get_db

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=schemas.ContactMessageOut, status_code=201)
def submit_contact_message(payload: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    return crud.create_contact_message(db, payload)


@router.get("/admin/all", response_model=list[schemas.ContactMessageOut])
def read_contact_messages(db: Session = Depends(get_db), _admin=Depends(get_current_admin)):
    return crud.list_contact_messages(db)
