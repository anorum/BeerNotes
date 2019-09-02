from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy.dialects.postgresql import UUID
from flask import request, url_for
from flask_mail import Message

from db import db
from mail import mail
from models.basemodel import BaseModel
from models.confirmation import ConfirmationModel
from models.resettokens import ResetTokenModel


class UserModel(db.Model, BaseModel):
    __tablename__ = "user"

    id = db.Column(UUID(as_uuid=True), unique=True,
                   nullable=False, primary_key=True, default=uuid4)
    email = db.Column(db.String(80), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    profile_pic_link = db.Column(db.String(120))
    description = db.Column(db.String(1000))

    confirmation = db.relationship(
        "ConfirmationModel", lazy="dynamic", cascade="all, delete-orphan")

    reset_token = db.relationship(
        "ResetTokenModel", lazy="dynamic", cascade="all, delete-orphan"
    )

    @property
    def most_recent_confirmation(self) -> "ConfirmationModel":
        return self.confirmation.order_by(db.desc(ConfirmationModel.expire_at)).first()
    
    @property
    def most_recent_reset(self) -> "ResetTokenModel":
        return self.reset_token.order_by(db.desc(ResetTokenModel.expire_at)).first()

    @classmethod
    def find_by_email(cls, email: str) -> "UserModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_username(cls, username: str) -> "UserModel":
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, id: int) -> "UserModel":
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_all_users(cls):
        return cls.query.all()

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    @classmethod
    def user_is_admin(cls, id):
        user = cls.find_by_id(id)
        return user.is_admin

    def send_confirmation_email(self):
        subject = "Welcome to Brewcipes! Please confirm your email."
        link = request.url_root[:-1] + url_for(
            "confirmation", confirmation_id=self.most_recent_confirmation.id)
        link = "alex.norum.com"

        text = f"Please click the link to confirm your registration: {link}"
        html = f"<html>Please click the link to confirm your registration: <a href={link}>link</a></html>"
        msg = Message(subject=subject,
                      recipients=[self.email], body=text, html=html, sender="welcome-no-reply@brewcipes.com")
        mail.send(msg)

    def send_reset_email(self):
        subject = "Reset your password for Brewcipes"
        link = request.url_root[:-1] + url_for(
            "resettoken", reset_id=self.most_recent_reset.id)
        link = "alexnorum.com"

        text = f"Please click this link to reset your password: {link}"
        html = f"<html>Please click the link to reset your password: <a href={link}>link</a></html>"
        msg = Message(subject=subject,
                      recipients=[self.email], body=text, html=html, sender="reset-no-reply@brewcipes.com")
        mail.send(msg)
