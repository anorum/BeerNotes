from time import time

from flask import make_response, render_template
from flask_restful import Resource

from models.confirmation import ConfirmationModel
from models.user import UserModel
from schemas.confirmation import confirmation_schema, confirmations_schema

CONFIRMATION_NOT_FOUND = "The confirmation link is not valid."
CONFIRMATION_EXPIRED = "This confirmation link has been expired."
CONFIRMATION_ALREADY_CONFIRMED = "This user has already been confirmed"
CONFIRMATION_RESEND_SUCCESSFUL = "Confirmation resent successful."
USER_NOT_FOUND = "This user was not found"


class Confirmation(Resource):
    @classmethod
    def get(cls, confirmation_id: str):
        """Return confirmation HTML page."""
        confirmation = ConfirmationModel.find_by_id(confirmation_id)
        if not confirmation:
            return {"message": CONFIRMATION_NOT_FOUND}, 404
        if confirmation.expired:
            return {"message": CONFIRMATION_EXPIRED}, 400
        if confirmation.confirmed:
            return {"message": CONFIRMATION_ALREADY_CONFIRMED}, 400

        confirmation.confirmed = True
        confirmation.save_to_db()

        headers = {"Content-Type": "text/html"}
        return make_response(render_template("confirmation_path.html", email=confirmation.user.email), 200, headers)


class ConfirmationByUser(Resource):
    @classmethod
    def get(self, user_id: str):
        """Returns confirmation for a given user, used for testing."""
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404
        return (
            {
                "current_time": int(time()),
                "confirmation": [
                    confirmations_schema.dump(each)
                    for each in [user.confirmation.order_by(ConfirmationModel.expire_at)]
                ][0]
            }
        )

    @classmethod
    def post(self, user_id: str):
        """Resend Confirmation Email"""
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": USER_NOT_FOUND}, 404
        try:
            confirmation = user.most_recent_confirmation
            if confirmation:
                if confirmation.confirmed:
                    return {"message": CONFIRMATION_ALREADY_CONFIRMED}
                confirmation.force_to_expire()
            new_confirmation = ConfirmationModel(user_id)
            new_confirmation.save_to_db()
            user.send_confirmation_email()
            return {"message": CONFIRMATION_RESEND_SUCCESSFUL}, 201
        except Exception as e:
            return {"message": str(e)}, 500
