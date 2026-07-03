from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.auth import get_current_admin
from app.database import get_db

router = APIRouter(prefix="/api/gym-info", tags=["Gym Info"])


@router.get("", response_model=schemas.GymInfoOut)
def read_gym_info(db: Session = Depends(get_db)):
    info = crud.get_gym_info(db)
    if info is None:
        raise HTTPException(status_code=404, detail="Gym info has not been configured yet")
    return info


@router.put("", response_model=schemas.GymInfoOut)
def update_gym_info(
    payload: schemas.GymInfoUpdate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return crud.upsert_gym_info(db, payload)
