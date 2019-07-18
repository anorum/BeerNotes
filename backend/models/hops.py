from uuid import uuid4
from db import db
from models.basemodel import BaseModel
from models.searchableMixIn import SearchableMixin
from sqlalchemy.dialects.postgresql import UUID


class HopsModel(db.Model, BaseModel, SearchableMixin):
    __tablename__ = "hop"
    __searchable__ = ['brand', 'name','alpha', 'aroma', 'typical_beer', 'hop_type']

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    brand = db.Column(db.String(80))
    name = db.Column(db.String(80))
    alpha = db.Column(db.Float(precision=1))
    aroma = db.Column(db.String(240))
    typical_beer = db.Column(db.String(240))
    hop_type = db.Column(db.String(80))

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)

    user = db.relationship("UserModel")
