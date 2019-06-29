import traceback

from flask_restful import Resource
from flask import request
from flask_jwt_extended import (jwt_required,
                                create_access_token,
                                create_refresh_token,
                                get_jwt_claims,
                                fresh_jwt_required)

from models.user import UserModel
from models.confirmation import ConfirmationModel
from schemas.user import user_schema, users_schema

USER_ALREADY_EXISTS = "Account with this email already exists."
USER_REGISTERED = "Account successfully created."
INVALID_PASSWORD = "Password provided is incorrect."
USER_DOES_NOT_EXIST = "A user with email {} does not exist."
USER_DELETED = "User for email {} successfully deleted"
USER_FAILED_TO_CREATE = "An error occurred during creation of account."
USER_NOT_CONFIRMED = "This user is not confirmed. Please confirm"
INVALID_LOGIN = "The username or password is incorrect."


class UserRegister(Resource):
    """Register a new user for the beer app"""
    @classmethod
    def post(cls):
        user = user_schema.load(request.get_json())
        if UserModel.find_by_email(user.email.lower()):
            return {"message": USER_ALREADY_EXISTS}, 400

        try:
            user.set_password(user.password)
            user.save_to_db()
            confirmation = ConfirmationModel(user.id)
            confirmation.save_to_db()
            user.send_confirmation_email()

            return {"message": USER_REGISTERED}, 201
        except:
            user.delete_from_db()
            return {"message": USER_FAILED_TO_CREATE}


class UserDelete(Resource):
    @classmethod
    def delete(cls):
        data = request.get_json()
        user = UserModel.find_by_email(data["email"].lower())
        if not user:
            return {"message": USER_DOES_NOT_EXIST.format(data["email"].lower())}, 404
        user.delete_from_db()
        return {"message": USER_DELETED.format(user.email)}, 201


class UserLogin(Resource):
    """ Login a valid user """
    @classmethod
    def post(cls):
        data = user_schema.load(request.get_json())
        user = UserModel.find_by_email(data.email)
        if not user:
            return {"message": INVALID_LOGIN}, 401
        if user.check_password(data.password):
            confirmation = user.most_recent_confirmation
            if confirmation and confirmation.confirmed:
                access_token = create_access_token(
                    identity=user.id, fresh=True)
                refresh_token = create_refresh_token(identity=user.id)

                return {"access token": access_token, "refresh_token": refresh_token}, 200
            else:
                return {"message": USER_NOT_CONFIRMED}
        return {"message": INVALID_PASSWORD}, 401


class UsersList(Resource):

    @classmethod
    def get(cls):
        users = UserModel.find_all_users()
        return users_schema.dump(users)
