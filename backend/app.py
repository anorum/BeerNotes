import os
import uuid
from flask import Flask, jsonify, json
from flask_restful import Api
from marshmallow import ValidationError
from flask_uploads import configure_uploads, patch_request_class

from flask_jwt_extended import (JWTManager, get_jwt_claims, verify_jwt_in_request,
                                jwt_refresh_token_required, get_jwt_identity, create_access_token)

from ma import ma
from db import db
from mail import mail
from resources.user import UserRegister, UsersList, UserLogin, UserDelete
from resources.hops import Hop
from resources.yeast import Yeast
from resources.grains import Grains
from resources.fermentables import Fermentables
from resources.confirmation import Confirmation, ConfirmationByUser
from resources.image import AvatarUpload, Avatar
from resources.recipes import Recipes
from models.user import UserModel
from libs.image_helper import IMAGE_SET

### This code loads the .env file using dotenv python package ###
from os.path import join, dirname
from dotenv import load_dotenv

# Create .env file path.
dotenv_path = join(dirname(__file__), '.env')

# Load file from the path.
load_dotenv(dotenv_path)

########### End of .env config ###########


class CustomJSONEncoder(json.JSONEncoder):
    """
    Override Flask's JSONEncoder with the single method `default`, which 
    is called when the encoder doesn't know how to encode a specific type.
    """

    def default(self, obj):
        if type(obj) is uuid.UUID:
            return str(obj)
        else:
            # raises TypeError: obj not JSON serializable
            return json.JSONEncoder.default(self, obj)


### Flask Application Conifguration ###
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
# restrict max upload image size to 10MB
patch_request_class(app, 10 * 1024 * 1024)
configure_uploads(app, IMAGE_SET)
#app.json_encoder = CustomJSONEncoder

api = Api(app)
jwt = JWTManager(app)

########### End of Configurations ###########


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {
        "is_admin": UserModel.user_is_admin(identity)
    }


### Resources and end points ###
api.add_resource(UserRegister, '/register')
api.add_resource(UsersList, '/users')
api.add_resource(UserLogin, '/login')
api.add_resource(UserDelete, '/deregister')
api.add_resource(Hop, '/hop/<string:name>')
api.add_resource(Yeast, '/yeast/<string:name>')
api.add_resource(Grains, '/grains/<string:name>')
api.add_resource(Fermentables, '/fermentables/<string:name>')
api.add_resource(Confirmation, '/confirm/<string:confirmation_id>')
api.add_resource(ConfirmationByUser, '/confirmation/user/<string:user_id>')
api.add_resource(AvatarUpload, "/upload/profilepicture")
api.add_resource(Avatar, "/avatar/<string:user_id>")
api.add_resource(Recipes, "/recipes/<string:name>")
# Refresh token endpoint. This will generate a new access token from
# the refresh token, but will mark that access token as non-fresh,
# as we do not actually verify a password in this endpoint.
@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user, fresh=False)
    ret = {'access_token': new_token}
    return jsonify(ret), 200
########### End of Resources ###########


""" @app.before_first_request
def create_tables():
    db.create_all() """


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400


if __name__ == "__main__":
    db.init_app(app)
    ma.init_app(app)
    mail.init_app(app)
    app.run(port=1050)
