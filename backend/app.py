import os
import re
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
from requests_aws4auth import AWS4Auth
import boto3
from elasticsearch import Elasticsearch, RequestsHttpConnection
from elasticsearch_dsl import connections
from elastsearch_schema import Recipe
# Create .env file path.
dotenv_path = join(dirname(__file__), '.env')

# Load file from the path.
load_dotenv(dotenv_path)

from ma import ma
from db import db
from mail import mail
from oa import oauth
from resources.user import UserRegister, UsersList, UserLogin, UserDelete, SetPassword, GetUser
from resources.profile_data import  UserProfile
from resources.grains import Grains
from resources.fermentables import Fermentable, Fermentables, FermentablesCreate, FermentablesByID
from resources.hops import Hop, HopsSearch, Hops, HopsCreate
from resources.yeast import Yeast, YeastSearch, Yeasts, YeastsCreate
from resources.confirmation import Confirmation, ConfirmationByUser
from resources.image import AvatarUpload, Avatar
from resources.recipes import RecipesByID, Recipes, RecipeSearch, RecipeCreate, MyRecipes
from resources.github_login import GithubLogin, GithubAuthorize
from resources.reset_password import ResetToken, SendResetToken
from models.user import UserModel
from models.recipes import RecipeModel, RecipeYeasts, RecipeGrains, RecipeHops, RecipeFermentables
from schemas.recipes import recipes_schema
from libs.image_helper import IMAGE_SET
from resources.elastic_proxy import ElasticProxy




### Flask Application Conifguration ###
app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
print("Running in " + os.environ['APP_SETTINGS'])
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
# restrict max upload image size to 10MB
patch_request_class(app, 10 * 1024 * 1024)
configure_uploads(app, IMAGE_SET)

""" APPBASE SETUP"""

""" appbase = os.environ['APPBASE_URL']
auth = os.environ['APPBASE_API_ADMIN'].split(':')
host = "https://" + os.environ['APPBASE_API_ADMIN'] + "@" + appbase

print(host)
# Connect to cluster over SSL using auth for best security:
es_header = [{
 'host': host,
 'port': 443,
 #'use_ssl': True,
 #'http_auth': (auth[0],auth[1])
}]

# Instantiate the new Elasticsearch connection:
app.elasticsearch = Elasticsearch(host)
connections.create_connection(hosts=[host]) """


""" Bonsai Setup """

bonsai = os.environ['BONSAI_URL']
auth = re.search('https\:\/\/(.*)\@', bonsai).group(1).split(':')
host = bonsai.replace('https://%s:%s@' % (auth[0], auth[1]), '')

# Connect to cluster over SSL using auth for best security:
es_header = [{
 'host': host,
 'port': 443,
 #'use_ssl': True,
 'http_auth': (auth[0],auth[1])
}]

# Instantiate the new Elasticsearch connection:
app.elasticsearch = Elasticsearch(bonsai)
connections.create_connection(hosts=[bonsai])

""" AWS SETUP START """

""" host = os.environ['AWS_ES_HOST']
region = os.environ['AWS_REGION']

service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service)


app.elasticsearch = Elasticsearch(
    hosts = [{'host': host, 'port': 443}],
    http_auth = awsauth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection
)
connections.create_connection(hosts = [{'host': host, 'port': 443}],
    http_auth = awsauth,
    use_ssl = True,
    verify_certs = True,
    connection_class = RequestsHttpConnection) """

""" AWS SETUP END """

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
api.add_resource(Hop, '/hop/<string:id>')
api.add_resource(Hops, '/hops/')
api.add_resource(HopsCreate, '/hops/create')
api.add_resource(HopsSearch, '/hop/search')
api.add_resource(Yeast, '/yeast/<string:id>')
api.add_resource(YeastSearch, '/yeast/search')
api.add_resource(Yeasts, '/yeasts/')
api.add_resource(YeastsCreate, '/yeasts/create')
api.add_resource(Grains, '/grains/<string:name>')
api.add_resource(Fermentable, '/fermentable/<string:id>')
api.add_resource(Fermentables, '/fermentables/')
api.add_resource(FermentablesCreate, '/fermentables/create')
api.add_resource(FermentablesByID, '/fermentables/<string:fermentableid>')
api.add_resource(Confirmation, '/confirm/<string:confirmation_id>')
api.add_resource(ConfirmationByUser, '/confirm/resend')
api.add_resource(AvatarUpload, "/user/update")
api.add_resource(Avatar, "/avatar/<string:user_id>")
api.add_resource(RecipesByID, "/recipe/<string:recipeid>")
api.add_resource(RecipeCreate, "/recipe/create")
api.add_resource(Recipes, "/recipes/<int:page>")
api.add_resource(MyRecipes, "/myrecipes/<int:page>")
api.add_resource(RecipeSearch, "/recipes/search")
api.add_resource(GithubLogin, "/login/github")
api.add_resource(GithubAuthorize, "/login/github/authorized", endpoint="github.authorize")
api.add_resource(ElasticProxy, "/elastic/<path:path>", defaults={'path': ''})
api.add_resource(ResetToken, "/reset/<string:reset_id>")
api.add_resource(SendResetToken, "/resetpassword")
api.add_resource(UserProfile, "/user/<string:username>")

# Refresh token endpoint. This will generate a new access token from
# the refresh token, but will mark that access token as non-fresh,
# as we do not actually verify a password in this endpoint.
@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user, fresh=False)
    ret = jsonify({'user': current_user})
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
    Recipe.init()
    app.run(port=1050)
