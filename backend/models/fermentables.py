from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

from db import db
from models.basemodel import BaseModel


class FermentablesModel(BaseModel, db.Model):
    """ holds grain database table """
    __tablename__ = "fermentable"

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    brand = db.Column(db.String(80))
    name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)

    user = db.relationship("UserModel")

    @classmethod
    def find_by_ids(cls, ids):
        """ Takes in a list of ids and returns list of Model objects"""
        arr = []
        for id in ids:
            try:
                obj = cls.find_by_id(id)[0]
            except:
                continue
            arr.append(obj)
        return arr
