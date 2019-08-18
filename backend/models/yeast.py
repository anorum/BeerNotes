from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

from db import db
from models.basemodel import BaseModel
from models.searchableMixIn import SearchableMixin


class YeastModel(db.Model, BaseModel, SearchableMixin):
    __tablename__ = "yeast"
    __searchable__ = ['brand', 'name', 'yeast_style', 'yeast_format',
                      'avg_attenuation',
                      'min_fermenting_temp', 'max_fermenting_temp']

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    brand = db.Column(db.String(80))
    name = db.Column(db.String(80), nullable=False)
    yeast_style = db.Column(db.String(120))
    yeast_format = db.Column(db.String(80))
    avg_attenuation = db.Column(db.Integer())
    min_fermenting_temp = db.Column(db.Integer())
    max_fermenting_temp = db.Column(db.Integer())
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)

    user = db.relationship("UserModel")
