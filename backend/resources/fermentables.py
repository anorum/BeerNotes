from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required, jwt_optional
from db import db
from models.fermentables import FermentablesModel
from models.recipes import RecipeFermentables, RecipeModel
from models.user import UserModel
from schemas.fermentables import fermentable_schema, fermentables_schema
from schemas.recipes import recipes_schema

ERROR_INSERTING = "An error occurred while inserting the fermentables."
FERMENTABLES_NOT_FOUND = "No fermentables was found."


class Fermentable(Resource):

    @classmethod
    @jwt_optional
    def get(cls, id: str):
        data = {}
        user = UserModel.find_by_id(get_jwt_identity())
        fermentable = FermentablesModel.find_by_id(id)
        all_recipes = RecipeModel.query.filter(RecipeModel.fermentables.any(
            RecipeFermentables.fermentable_id == id)).filter(RecipeModel.published == True).filter(RecipeModel.private_recipe == False)
        data["all_recipes"] = recipes_schema.dump(all_recipes)
        data["fermentable"] = fermentable_schema.dump(fermentable)
        if user:
            your_recipes = RecipeModel.query.filter(RecipeModel.fermentables.any(
                RecipeFermentables.fermentable_id == id)).filter(RecipeModel.user_id == user.id)
            data["your_recipes"] = recipes_schema.dump(your_recipes)
        return data, 200


class Fermentables(Resource):

    @classmethod
    def get(cls):
        return fermentables_schema.dump(FermentablesModel.query.all())


class FermentablesCreate(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        data = request.get_json()
        data["user_id"] = get_jwt_identity()
        fermentables = fermentable_schema.load(data, session=db.session)
        fermentables.custom = True
        try:
            fermentables.save_to_db()
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500

        return fermentable_schema.dump(fermentables), 201


class FermentablesByID(Resource):
    @classmethod
    @jwt_required
    def put(cls, fermentableid):
        fermentable = FermentablesModel.find_by_id(fermentableid)
        if not fermentable:
            return {"msg": FERMENTABLES_NOT_FOUND}, 404
        data = request.get_json()
        loaded_data = fermentable_schema.load(data, instance=fermentable)
        try:
            loaded_data.save_to_db()
        except Exception as e:
            return {"message": ERROR_INSERTING}, 500
        return fermentable_schema.dump(loaded_data), 201
