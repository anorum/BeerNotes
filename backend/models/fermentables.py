from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

from db import db
from models.basemodel import BaseModel
from models.searchableMixIn import SearchableMixin

class FermentablesModel(BaseModel, db.Model, SearchableMixin):
    """ holds grain database table """
    __tablename__ = "fermentable"
    __searchable__ = ['id', 'brand', 'name', 'lovibond', 'category', 'ppg']

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    brand = db.Column(db.String(80))
    name = db.Column(db.String(80), nullable=False)
    ppg = db.Column(db.Integer(), nullable=False)
    lovibond = db.Column(db.Float(), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    country = db.Column(db.String(80))
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)
    custom = db.Column(db.Boolean(), default=True)

    user = db.relationship("UserModel")

    @classmethod
    def find_by_ids(cls, ids):
        """ Takes in a list of ids and returns list of Model objects"""
        arr = []
        for id in ids:
            try:
                obj = cls.find_by_id(id)
            except:
                continue
            arr.append(obj)
        return arr
