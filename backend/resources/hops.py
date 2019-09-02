from flask import request
from flask_restful import Resource
from flask_jwt_extended import (jwt_required,
                                create_access_token,
                                create_refresh_token,
                                get_jwt_claims,
                                fresh_jwt_required,
                                get_jwt_identity,
                                jwt_optional)
from sqlalchemy.dialects.postgresql import Any
from schemas.hops import hop_schema, hops_schema
from models.hops import HopsModel
from models.recipes import RecipeModel, RecipeHops
from models.user import UserModel
from schemas.recipes import profile_recipe_private, recipes_schema
from db import db

ERROR_INSERTING = "An error occurred while inserting the hop."
HOPS_NOT_FOUND = "No hops with this name was found."


class Hop(Resource):
    """ Resource for Hops endpoint. POST, GET, and PATCH. /hop """

    @classmethod
    @jwt_required
    def post(cls, name: str):
        data = request.get_json()
        data["name"] = name
        data["user_id"] = get_jwt_identity()
        hop = hop_schema.load(data)
        print(data)

        try:
            hop.save_to_db()
        except:
            return {"message": ERROR_INSERTING}, 500

        return hop_schema.dump(hop), 201

    @classmethod
    @jwt_optional
    def get(cls, id: str):
        data = {}
        user = UserModel.find_by_id(get_jwt_identity())
        hop = HopsModel.find_by_id(id)
        all_recipes = RecipeModel.query.filter(RecipeModel.hops.any(
            RecipeHops.hop_id == id)).filter(RecipeModel.published == True).filter(RecipeModel.private_recipe == False)
        data["all_recipes"] = recipes_schema.dump(all_recipes)
        data["hop"] = hop_schema.dump(hop)
        if user:
            your_recipes = RecipeModel.query.filter(RecipeModel.hops.any(
                RecipeHops.hop_id == id)).filter(RecipeModel.user_id == user.id)
            data["your_recipes"] = recipes_schema.dump(your_recipes)
        return data, 200


class Hops(Resource):
    @classmethod
    def get(cls):
        return hops_schema.dump(HopsModel.query.all())


class HopsCreate(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        data = request.get_json()
        data["user_id"] = get_jwt_identity()
        hops = hop_schema.load(data, session=db.session)
        try:
            hops.save_to_db()
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500

        return hop_schema.dump(hops), 201


class HopsSearch(Resource):
    @classmethod
    def get(cls):
        q = request.args['q']
        query, total = HopsModel.search(q, 1, 5)
        return hops_schema.dump(query.all())
