from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

from db import db
from models.basemodel import BaseModel


class YeastModel(db.Model, BaseModel):
    __tablename__ = "yeast"

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    brand = db.Column(db.String(80))
    name = db.Column(db.String(80), nullable=False)
    yeast_style = db.Column(db.String(120))
    yeast_format = db.Column(db.String(80))
    min_attenuation_temp = db.Column(db.Integer())
    max_attenuation_temp = db.Column(db.Integer())
    min_fermenting_temp = db.Column(db.Integer())
    max_fermenting_temp = db.Column(db.Integer())
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)

    user = db.relationship("UserModel")
