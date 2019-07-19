from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from models.searchableMixIn import SearchableMixin
from db import db
from models.basemodel import BaseModel



class GrainsModel(BaseModel, db.Model, SearchableMixin):
    """ holds grain database table """
    __tablename__ = "grain"
    __searchable__ = ['brand', 'name']

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    brand = db.Column(db.String(80))
    name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)

    user = db.relationship("UserModel")
