from uuid import uuid4
import datetime
from db import db
from models.basemodel import BaseModel
from sqlalchemy.dialects.postgresql import UUID, ARRAY


class BrewSession(db.Model, BaseModel):
    __tablename__ = "brewsessions"

    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'), nullable=False)
    brew_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    status = db.Column(db.String(80), nullable=False)
    brew_amount = db.Column(db.Float(), nullable=False)
    
