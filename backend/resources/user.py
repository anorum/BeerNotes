import traceback

from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import (jwt_required,
                                jwt_optional,
                                create_access_token,
                                create_refresh_token,
                                get_jwt_claims,
                                fresh_jwt_required,
                                jwt_refresh_token_required,
                                set_access_cookies,
                                set_refresh_cookies,
                                get_jwt_identity)

from models.user import UserModel
from models.confirmation import ConfirmationModel
from schemas.user import user_schema, users_schema, public_user_schema

USER_ALREADY_EXISTS = "Account with this email already exists."
USER_REGISTERED = "Account successfully created."
INVALID_PASSWORD = "Password provided is incorrect."
USER_DOES_NOT_EXIST = "A user with email {} does not exist."
USER_DELETED = "User for email {} successfully deleted"
USER_FAILED_TO_CREATE = "An error occurred during creation of account."
USER_NOT_CONFIRMED = "This user is not confirmed. Please confirm your account by clicking on the confirm link in the email sent."
INVALID_LOGIN = "Account with this email does not exists."
USER_PASSWORD_UPDATED = "Your password has been changed."
USERNAME_ALREADY_EXISTS = "Account with this username already exists."


class UserRegister(Resource):
    """Register a new user for the beer app"""
    @classmethod
    def post(cls):
        user = user_schema.load(request.get_json())
        EmailExist = UserModel.find_by_email(user.email.lower())
        UsernameExist = UserModel.find_by_username(user.username.lower())
        print(EmailExist)
        if EmailExist and UsernameExist:
            return {"message": "Email and username already exists."}, 400
        elif EmailExist:
            return {"message": USER_ALREADY_EXISTS}, 400
        elif UsernameExist:
            return {"message": USERNAME_ALREADY_EXISTS}, 400

        try:
            user.set_password(user.password)
            user.save_to_db()
            confirmation = ConfirmationModel(user.id)
            confirmation.save_to_db()
            user.send_confirmation_email()

            return {"message": USER_REGISTERED}, 201
        except:
            user.delete_from_db()
            return {"message": USER_FAILED_TO_CREATE}, 405


class GetUser(Resource):
    @classmethod
    @jwt_required
    def get(cls):
        user_id = get_jwt_identity()
        if user_id:
            user = UserModel.find_by_id(user_id)
            confirmation = user.most_recent_confirmation
            if user:
                if confirmation and confirmation.confirmed:
                    return user_schema.dump(user), 200
                else:
                    return {"message": "Please confirm your user account."}, 400
            else:
                return None, 400

    @classmethod
    @jwt_refresh_token_required
    def post(cls):
        user_id = get_jwt_identity()
        if user_id:
            new_token = create_access_token(identity=user_id, fresh=False)
            user = UserModel.find_by_id(user_id)
            ret = jsonify(user_schema.dump(user))
            set_access_cookies(ret, new_token)
            ret.status_code = 200
            return ret




class UserDelete(Resource):
    @classmethod
    @fresh_jwt_required
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
        if user.password and user.check_password(data.password):
            confirmation = user.most_recent_confirmation
            if confirmation and confirmation.confirmed:
                access_token = create_access_token(
                    identity=user.id, fresh=True)
                refresh_token = create_refresh_token(identity=user.id)

                resp = jsonify({"access_token": access_token,
                                "refresh_token": refresh_token})

                set_access_cookies(resp, access_token)
                set_refresh_cookies(resp, refresh_token)
                resp.status_code = 200
                return resp
            else:
                return {"message": USER_NOT_CONFIRMED}, 401
        return {"message": INVALID_PASSWORD}, 401


class UsersList(Resource):
    @classmethod
    @jwt_required
    def get(cls):
        users = UserModel.find_all_users()
        return users_schema.dump(users)


class SetPassword(Resource):
    @classmethod
    @fresh_jwt_required
    def post(cls):
        user = get_jwt_identity()
        user = UserModel.find_by_id(user)
        if not user:
            return {"message": USER_DOES_NOT_EXIST.format(user)}, 400
        print(user)
        user_passwords = request.get_json()
        print(user_passwords['password'])
        if not user.check_password(user_passwords['password']):
            return {"message": INVALID_PASSWORD}
        user.set_password(user_passwords['newpassword'])
        user.save_to_db()

        # TODO SEND AN EMAIL TO USER THAT THEIR PASSWORD CHANGED.

        return {"message": USER_PASSWORD_UPDATED}, 201

