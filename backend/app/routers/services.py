from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin
from app.database import get_db

router = APIRouter(prefix="/api/services", tags=["Services"])


@router.get("", response_model=list[schemas.ServiceOut])
def read_services(db: Session = Depends(get_db)):
    return crud.list_services(db)


@router.post("", response_model=schemas.ServiceOut, status_code=201)
def create_service(
    payload: schemas.ServiceCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return crud.create_service(db, payload)
