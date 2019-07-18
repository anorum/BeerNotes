from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required
from db import db
from models.recipes import RecipeModel
from models.fermentables import FermentablesModel
from schemas.recipes import recipe_schema, recipes_schema, recipe_fermentable_schema, recipe_fermentables_schmea
from schemas.fermentables import fermentables_schema, fermentable_schema

ERROR_INSERTING = "An error occurred while inserting the recipe."
RECIPE_NOT_FOUND = "No recipes with this name was found."
NO_RECIPES_FOUND = "There are no recipes"


class RecipesByName(Resource):

    @classmethod
    @jwt_required
    def put(cls, name):
        data = request.get_json()
        data["name"] = name
        data["user_id"] = get_jwt_identity()
        recipe = recipe_schema.load(data, session=db.session)
        try:
            recipe.save_to_db()
            
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500
        #current_app.elasticsearch.index(index="recipe", doc_type="recipe", id=recipe.id, body=recipe_schema.dump(recipe))
        return recipe_schema.dump(recipe), 201

    @classmethod
    def get(cls, name):
        recipes = RecipeModel.find_by_name(name=name)

        if recipes:
            return recipes_schema.dump(recipes)
        return {"message": RECIPE_NOT_FOUND}


class Recipes(Resource):
    @classmethod
    def get(cls, page):
        recipes = RecipeModel.query.paginate(page=page, per_page=2)
        print(recipes.next_num)
        if recipes.items:
            return recipes_schema.dump(recipes.items)
        return {"message": NO_RECIPES_FOUND}

class RecipeSearch(Resource):
    @classmethod
    def get(cls):
        q = request.args['q']
        query, total = RecipeModel.search(q, 1, 5)
        return recipes_schema.dump(query.all())
