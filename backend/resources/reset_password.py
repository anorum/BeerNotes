from time import time

from flask import request
from flask_restful import Resource

from models.resettokens import ResetTokenModel
from models.user import UserModel
from schemas.resettokens import reset_token_schema

RESET_TOKEN_INVALID = "This is not a valid reset link."
RESET_SUCCESS = "Your password has been successfully reset."
USER_NOT_FOUND = "This user was not found"
RESET_EMAIL_SENT = "A email to reset your password has been sent"

class ResetToken(Resource):
    @classmethod
    def get(cls, reset_id: str):
        """ Checks if reset token is valid or not"""
        reset_token = ResetTokenModel.find_by_id(reset_id)
        if not reset_token:
            return {"message": RESET_TOKEN_INVALID}, 401
        if reset_token.expired:
            return {"message": "This reset link has expired."}, 400
        if reset_token.used:
            return {"message": "You have already used this reset token"}, 400
        
        return {"message": "You can reset your password below"}, 200

    def post(cls, reset_id: str):
        """ Resets the password if given a valid reset_id"""
        reset_token = ResetTokenModel.find_by_id(reset_id)
        if not reset_token:
            return {"message": RESET_TOKEN_INVALID}, 401
        if reset_token.expired:
            return {"message": "This reset link has expired."}, 400
        if reset_token.used:
            return {"message": "You have already used this reset token"}, 400
        
        user_id = reset_token.user_id
        user = UserModel.find_by_id(user_id)
        data = request.get_json()

        if user:
            try:
                user.set_password(data['password'])
                reset_token.used = True
                user.save_to_db()
                reset_token.save_to_db()
            except Exception as e:
                return {"message": str(e)}, 500

            return {"message": "Your password has been reset."}
        return {"message": "Whoa something went wrong"}, 500

class SendResetToken(Resource):
    @classmethod
    def post(cls):
        data = request.get_json()
        email = data['email']
        user = UserModel.find_by_email(email)
        if not user:
            return {"message": USER_NOT_FOUND}, 404
        try:
            user_id = user.id
            reset_token = user.most_recent_reset
            if reset_token:
                if not reset_token.used:
                    reset_token.force_to_expire()
            new_token = ResetTokenModel(user_id)
            new_token.save_to_db()
            user.send_reset_email()
            return {"message": RESET_EMAIL_SENT}, 200
        except Exception as e:
            return {"message": str(e)}, 500
