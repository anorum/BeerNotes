import os
import uuid
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, jsonify, json
from flask_restful import Api
from marshmallow import ValidationError
from flask_uploads import configure_uploads, patch_request_class

from flask_jwt_extended import (JWTManager, get_jwt_claims, verify_jwt_in_request,
                                jwt_refresh_token_required, get_jwt_identity, create_access_token, 
                                set_access_cookies, unset_jwt_cookies)
from flask_cors import CORS
from elasticsearch import Elasticsearch
from elasticsearch_dsl import connections

# Create .env file path.
dotenv_path = join(dirname(__file__), '.env')

# Load file from the path.
load_dotenv(dotenv_path)

from ma import ma
from db import db
from mail import mail
from oa import oauth
from resources.user import UserRegister, UsersList, UserLogin, UserDelete, SetPassword, GetUser
from resources.grains import Grains
from resources.fermentables import Fermentables, FermentablesCreate, FermentablesByID
from resources.hops import Hop, HopsSearch
from resources.yeast import Yeast, YeastSearch
from resources.confirmation import Confirmation, ConfirmationByUser
from resources.image import AvatarUpload, Avatar
from resources.recipes import RecipesByID, Recipes, RecipeSearch, RecipeCreate
from resources.github_login import GithubLogin, GithubAuthorize
from models.user import UserModel
from models.recipes import RecipeModel, RecipeYeasts, RecipeGrains, RecipeHops, RecipeFermentables
from schemas.recipes import recipes_schema
from libs.image_helper import IMAGE_SET




### Flask Application Conifguration ###
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
print("Running in " + os.environ['APP_SETTINGS'])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
# restrict max upload image size to 10MB
patch_request_class(app, 10 * 1024 * 1024)
configure_uploads(app, IMAGE_SET)


app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']], http_auth=os.environ['APPBASE_API_ADMIN']) \
#        if app.config['ELASTICSEARCH_URL'] else None



api = Api(app)
jwt = JWTManager(app)
cors = CORS(app, resources={r"*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)
########### End of Configurations ###########


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {
        "is_admin": UserModel.user_is_admin(identity)
    }


### Resources and end points ###
api.add_resource(UserRegister, '/register')
api.add_resource(UsersList, '/users')
api.add_resource(GetUser, '/user')
api.add_resource(UserLogin, '/login')
api.add_resource(UserDelete, '/deregister')
api.add_resource(SetPassword, '/user/resetpassword')
api.add_resource(Hop, '/hop/<string:name>')
api.add_resource(HopsSearch, '/hop/search')
api.add_resource(Yeast, '/yeast/<string:name>')
api.add_resource(YeastSearch, '/yeast/search')
api.add_resource(Grains, '/grains/<string:name>')
api.add_resource(Fermentables, '/fermentables/<string:fermentableid>')
api.add_resource(FermentablesCreate, '/fermentables/create')
api.add_resource(FermentablesByID, '/fermentables/<string:fermentableid>')
api.add_resource(Confirmation, '/confirm/<string:confirmation_id>')
api.add_resource(ConfirmationByUser, '/confirmation/user/<string:user_id>')
api.add_resource(AvatarUpload, "/upload/profilepicture")
api.add_resource(Avatar, "/avatar/<string:user_id>")
api.add_resource(RecipesByID, "/recipe/<string:recipeid>")
api.add_resource(RecipeCreate, "/recipe/create")
api.add_resource(Recipes, "/recipes/<int:page>")
api.add_resource(RecipeSearch, "/recipes/search")
api.add_resource(GithubLogin, "/login/github")
api.add_resource(GithubAuthorize, "/login/github/authorized", endpoint="github.authorize")
# Refresh token endpoint. This will generate a new access token from
# the refresh token, but will mark that access token as non-fresh,
# as we do not actually verify a password in this endpoint.
@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user, fresh=False)
    ret = jsonify({'access_token': new_token})
    set_access_cookies(ret, new_token)
    ret.status_code = 200


    return ret

@app.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'message': "You have been logged out."})
    unset_jwt_cookies(resp)
    resp.status_code = 200
    return resp
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
    oauth.init_app(app)
    app.run(port=1050)
