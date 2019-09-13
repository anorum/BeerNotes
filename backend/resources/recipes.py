from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required
from db import db
from elasticsearch_dsl import Q

from models.recipes import RecipeModel
from models.fermentables import FermentablesModel
from models.user import UserModel
from schemas.recipes import recipe_schema, recipes_schema, recipe_fermentable_schema, recipe_fermentables_schmea
from schemas.fermentables import fermentables_schema, fermentable_schema
from libs.clean_recipe_elastic import clean_recipe_elastic
from libs.recipe_calculations import targetGravity, finalGravity, ABV, IBU, SRM


ERROR_INSERTING = "An error occurred while inserting the recipe."
RECIPE_NOT_FOUND = "Uh Oh. This recipe was not found."
NO_RECIPES_FOUND = "There are no recipes"


class RecipesByID(Resource):

    @classmethod
    def get(cls, recipeid):
        recipes = RecipeModel.find_by_id(recipeid)

        if recipes:
            return recipe_schema.dump(recipes), 200
        return {"message": RECIPE_NOT_FOUND}, 404


class Recipes(Resource):
    @classmethod
    def get(cls, page):
        recipes = RecipeModel.query.paginate(page=page, per_page=2)
        if recipes.items:
            return recipes_schema.dump(recipes.items)
        return {"message": NO_RECIPES_FOUND}, 404


class MyRecipes(Resource):
    @classmethod
    @jwt_required
    def get(cls, page):
        user_id = get_jwt_identity()
        recipes = RecipeModel.query.filter_by(
            user_id=user_id).paginate(page=page, per_page=20)
        if recipes.items:
            return recipes_schema.dump(recipes.items)
        return {"message": "No Recipes Created Yet! Get started homebrewing with the Add Recipe button."}, 404


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
            print(e)
            return {"message": ERROR_INSERTING}, 500
        if not recipe.private_recipe and recipe.published:
            clean_recipe = recipe_schema.dump(recipe)
            clean_recipe["type"] = "recipe"
            current_app.elasticsearch.index(index="brewcipes",
                                            id=recipe.id, body=clean_recipe)
            print("Published to Elastic")
        return recipe_schema.dump(recipe), 201

    @classmethod
    @jwt_required
    def put(cls):
        # TODO MAKE A FINISHED COLUMN SO WHEN A RECIPE HAS ALL IT NEEDS TO BE BREWED MARK IT AS FINISHED
        data = request.get_json()
        data["user_id"] = get_jwt_identity()
        current_user = UserModel.find_by_id(get_jwt_identity())
        try:
            recipeid = data['id']
        except:
            recipeid = None
        recipe = RecipeModel.find_by_id(recipeid)
        if not recipe:
            data.pop('id', None)
            loaded_data = recipe_schema.load(data, session=db.session)
        else:
<<<<<<< HEAD
            loaded_data = recipe_schema.load(data, instance=recipe)
=======
            loaded_data = recipe_schema.load(data, instance=recipe, session=db.session)
>>>>>>> mash
            if loaded_data.user_id != current_user.id:
                return {"message": "You can not edit other users recipes"}, 403
        santized_recipe = recipe_schema.dump(loaded_data)
        loaded_data.target_og = targetGravity(santized_recipe)
        loaded_data.target_fg = finalGravity(santized_recipe)
        loaded_data.target_abv = ABV(santized_recipe)
        loaded_data.IBU = IBU(santized_recipe)
        loaded_data.SRM = SRM(santized_recipe)
<<<<<<< HEAD
=======
        if (len(santized_recipe['fermentables']) > 0 and len(santized_recipe['yeasts']) > 0 and santized_recipe['boil_time']):
            loaded_data.brewable = True
        else:
            loaded_data.published = False
            loaded_data.brewable = False
>>>>>>> mash
        try:
            loaded_data.save_to_db()
        except Exception as e:
            return e, 500
        if loaded_data.private_recipe or (not loaded_data.published):
            if len(RecipeModel.elastic_find_by_id(loaded_data.id)) > 0:
                current_app.elasticsearch.delete(
                    index="brewcipes", id=loaded_data.id)
        else:
            clean_recipe = recipe_schema.dump(recipe)
            clean_recipe["type"] = "recipe"
            current_app.elasticsearch.index(index="brewcipes",
                                            id=loaded_data.id, body=clean_recipe)

        return recipe_schema.dump(loaded_data), 201


class RecipeDelete(Resource):
    @classmethod
    @jwt_required
    def delete(cls, recipeid):
        current_user = UserModel.find_by_id(get_jwt_identity())
        recipe = RecipeModel.find_by_id(recipeid)
        if recipe:
            if recipe.user_id == current_user.id:
                try:
                    recipe.delete_from_db()
                    current_app.elasticsearch.delete(
                        index="brewcipes", id=loaded_data.id)
                    return {"message": "Recipe has been deleted."}, 201
                except:
                    return {"message": "Something went wrong deleting the recipe! Please try again shortly."}
            else:
                return {"message": "You can not delete someones else's recipe!"}, 403
        else:
            return {"message": "This Recipe does not exist."}, 404

