from uuid import uuid4
from time import time

from sqlalchemy.dialects.postgresql import UUID

from db import db
from models.basemodel import BaseModel

# Number of seconds to expire confimration mail
RESET_EXPIRATION_DELTA = 1800


class ResetTokenModel(db.Model, BaseModel):
    __tablename__ = "resettoken"

    id = db.Column(UUID(as_uuid=True), unique=True,
                   primary_key=True, default=uuid4)
    expire_at = db.Column(db.Integer, nullable=False, default=int(
        time()) + RESET_EXPIRATION_DELTA)
    used = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)
    user = db.relationship("UserModel")

    def __init__(self, user_id: int, **kwargs):
        super().__init__(**kwargs)
        self.user_id = user_id

    @classmethod
    def find_by_id(cls, _id: str) -> "ResetTokenModel":
        return cls.query.filter_by(id=_id).first()

    @property
    def expired(self) -> bool:
        return time() > self.expire_at

    def force_to_expire(self) -> None:
        if not self.expired:
            self.expire_at = int(time())
            self.save_to_db()
