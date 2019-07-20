from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required
from db import db
from models.recipes import RecipeModel
from models.fermentables import FermentablesModel
from schemas.recipes import recipe_schema, recipes_schema, recipe_fermentable_schema, recipe_fermentables_schmea
from schemas.fermentables import fermentables_schema, fermentable_schema
from libs.clean_recipe_elastic import clean_recipe_elastic



ERROR_INSERTING = "An error occurred while inserting the recipe."
RECIPE_NOT_FOUND = "Recipe was not found."
NO_RECIPES_FOUND = "There are no recipes"


class RecipesByID(Resource):

    @classmethod
    @jwt_required
    def put(cls, recipeid):
        recipe = RecipeModel.find_by_id(recipeid)
        if not recipe:
            return {"msg": RECIPE_NOT_FOUND}, 404
        data = request.get_json()

        recipe = recipe_schema.load(data, instance=recipe)

        try:
            recipe.save_to_db()
        except Exception as e:
            return {"message": ERROR_INSERTING}, 500
        current_app.elasticsearch.index(index="brewcipes", \
            id=recipe.id, body=clean_recipe_elastic(recipe_schema.dump(recipe)))
        return recipe_schema.dump(recipe), 201

    @classmethod
    def get(cls, recipeid):
        recipes = RecipeModel.find_by_id(recipeid)

        if recipes:
            return recipe_schema.dump(recipes)
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
