from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required
from db import db
from elasticsearch_dsl import Q

from models.recipes import RecipeModel
from models.fermentables import FermentablesModel
from schemas.recipes import recipe_schema, recipes_schema, recipe_fermentable_schema, recipe_fermentables_schmea
from schemas.fermentables import fermentables_schema, fermentable_schema
from libs.clean_recipe_elastic import clean_recipe_elastic


ERROR_INSERTING = "An error occurred while inserting the recipe."
RECIPE_NOT_FOUND = "Uh Oh. This recipe was not found."
NO_RECIPES_FOUND = "There are no recipes"


class RecipesByID(Resource):

    @classmethod
    @jwt_required
    def put(cls, recipeid):
        recipe = RecipeModel.find_by_id(recipeid)
        if not recipe:
            return {"msg": RECIPE_NOT_FOUND}, 404

        data = request.get_json()
        loaded_data = recipe_schema.load(data, instance=recipe)

        try:
            loaded_data.save_to_db()
        except Exception as e:
            return {"message": ERROR_INSERTING}, 500
        if loaded_data.private:
            if len(RecipeModel.elastic_find_by_id(recipe.id)) > 0:
                current_app.elasticsearch.delete(index="brewcipes", id=loaded_data.id)
        else:
            current_app.elasticsearch.index(index="brewcipes", type="recipe", \
                id=loaded_data.id, body=clean_recipe_elastic(recipe_schema.dump(loaded_data)))

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
        if recipes.items:
            return recipes_schema.dump(recipes.items)
        return {"message": NO_RECIPES_FOUND}

class MyRecipes(Resource):
    @classmethod
    @jwt_required
    def get(cls, page):
        user_id = get_jwt_identity()
        recipes = RecipeModel.query.filter_by(user_id=user_id).paginate(page=page, per_page=40)
        if recipes.items:
            return recipes_schema.dump(recipes.items)
        return {"message": NO_RECIPES_FOUND}

class RecipeSearch(Resource):
    @classmethod
    def get(cls):
        q = request.args['q']
        query, total = RecipeModel.search(q, 1, 5)
        return recipes_schema.dump(query.all())

class RecipeCreate(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        data = request.get_json()
        data["user_id"] = get_jwt_identity()
        recipe = recipe_schema.load(data, session=db.session)
        try:
            recipe.save_to_db()
        except Exception as e:
            return {"message": ERROR_INSERTING}, 500
        if not recipe.private:
            current_app.elasticsearch.index(index="brewcipes", type="recipe", \
                id=recipe.id, body=clean_recipe_elastic(recipe_schema.dump(recipe)))
        return recipe_schema.dump(recipe), 201