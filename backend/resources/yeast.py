from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_optional
from db import db
from models.yeast import YeastModel
from models.user import UserModel
from models.recipes import RecipeModel, RecipeYeasts
from schemas.yeast import yeast_schema, yeasts_schema
from schemas.recipes import recipes_schema
from elasticsearch_dsl import MultiSearch, Q, Search, query

ERROR_INSERTING = "An error occurred while inserting the yeast."
YEAST_NOT_FOUND = "No yeast with this names was found."


class Yeast(Resource):
    @classmethod
    @jwt_optional
    def get(cls, id: str):
        data = {}
        user = UserModel.find_by_id(get_jwt_identity())
        yeast = YeastModel.find_by_id(id)
        all_recipes = RecipeModel.query.filter(RecipeModel.yeasts.any(
            RecipeYeasts.yeast_id == id)).filter(RecipeModel.published == True).filter(RecipeModel.private_recipe == False)
        data["all_recipes"] = recipes_schema.dump(all_recipes)
        data["yeast"] = yeast_schema.dump(yeast)
        if user:
            your_recipes = RecipeModel.query.filter(RecipeModel.yeasts.any(
                RecipeYeasts.yeast_id == id)).filter(RecipeModel.user_id == user.id)
            data["your_recipes"] = recipes_schema.dump(your_recipes)
        return data, 200

class Yeasts(Resource):
    @classmethod
    def get(cls):
        return yeasts_schema.dump(YeastModel.query.all())

class YeastsCreate(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        data = request.get_json()
        data["user_id"] = get_jwt_identity()
        yeasts = yeast_schema.load(data, session=db.session)
        try:
            yeasts.save_to_db()
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500

        return yeast_schema.dump(yeasts), 201


class YeastSearch(Resource):
    @classmethod
    def get(cls):
        q = request.args['q']
        que = Q("multi_match", query=q, fields=['name', 'brand'])
    
        query, total = YeastModel.search(que, 1, 5)
        return yeasts_schema.dump(query.all())
       
