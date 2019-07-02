import os
from flask import g, request, url_for
from flask_restful import Resource
from oa import github
from flask_jwt_extended import create_access_token, create_refresh_token
from models.user import UserModel
from models.confirmation import ConfirmationModel
from libs.password_generator import randomStringwithDigitsAndSymbols

USER_REGISTERED = "Account has been created using your {} account. Please check the email address associated with this account to confirm."
USER_ALREADY_EXISTS = "An account for the email address associated with this {} account already exists. Please login."

class GithubLogin(Resource):
    @classmethod
    def get(cls):
        return github.authorize(callback=url_for("github.authorize", _external=True))


class GithubAuthorize(Resource):
    @classmethod
    def get(cls):
        resp = github.authorized_response()

        if resp is None or resp.get('access_token') is None:
            error_resposne = {
                "error": request.args["error"],
                "error_description": request.args["error_description"]
            }

        g.access_token = resp['access_token']
        github_user = github.get('user/emails')
        github_email = github_user.data[0]["email"]

        user = UserModel.find_by_email(github_email)

        if not user:
            password = randomStringwithDigitsAndSymbols(24)
            print(password)
            user = UserModel(email=github_email, password=password)
            user.set_password(user.password)
            user.save_to_db()
            confirmation = ConfirmationModel(user.id)
            confirmation.save_to_db()
            user.send_confirmation_email()

            return {"message": USER_REGISTERED.format("Github")}, 201
        
        access_token = create_access_token(identity=user.id, fresh=True)
        refresh_token = create_refresh_token(identity=user.id)

        return {"access_token": access_token, "refresh_token": refresh_token}