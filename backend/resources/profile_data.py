from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import (jwt_required,
                                jwt_optional,
                                create_access_token,
                                create_refresh_token,
                                get_jwt_claims,
                                fresh_jwt_required,
                                jwt_refresh_token_required,
                                set_access_cookies,
                                set_refresh_cookies,
                                get_jwt_identity)
from models.user import UserModel
from schemas.user import user_schema, users_schema, public_user_schema
from models.recipes import RecipeModel
from models.hops import HopsModel
from models.fermentables import FermentablesModel
from models.yeast import YeastModel
from schemas.recipes import profile_recipe_public, profile_recipe_private


class UserProfile(Resource):
    @classmethod
    @jwt_optional
    def get(cls, username):
        user = UserModel.find_by_username(username)
        current_user = UserModel.find_by_id(get_jwt_identity())
        data = {}
        if user:
            if current_user:
                if current_user.id == user.id:
                    recipes = RecipeModel.query.filter_by(user_id=user.id)
                    hops = HopsModel.query.filter_by(
                        user_id=user.id, custom=True)
                    fermentables = FermentablesModel.query.filter_by(
                        user_id=user.id, custom=True)
                    yeast = YeastModel.query.filter_by(
                        user_id=user.id, custom=True)
                    data['user'] = user
                    data['recipes'] = recipes
                    data['hops'] = hops
                    data['fermentables'] = fermentables
                    data['yeasts'] = yeast
                    return profile_recipe_private.dump(data)
            recipes = RecipeModel.query.filter_by(
                user_id=user.id, private_recipe=False, published=True)
            hops = HopsModel.query.filter_by(user_id=user.id, custom=True)
            fermentables = FermentablesModel.query.filter_by(
                user_id=user.id, custom=True)
            yeast = YeastModel.query.filter_by(
                user_id=user.id, custom=True)
            data['user'] = user
            data['recipes'] = recipes
            data['hops'] = hops
            data['fermentables'] = fermentables
            data['yeasts'] = yeast
            print(data)
            return profile_recipe_public.dump(data)
        else:
            return {"msg": "Username doesn't exists"}
