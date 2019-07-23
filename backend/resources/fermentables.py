from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required
from db import db
from models.fermentables import FermentablesModel
from schemas.fermentables import fermentable_schema, fermentables_schema

ERROR_INSERTING = "An error occurred while inserting the fermentables."
FERMENTABLES_NOT_FOUND = "No fermentables was found."


class Fermentables(Resource):

    @classmethod
    def get(cls, fermentableid):
        fermentables = FermentablesModel.find_by_id(fermentableid)
        if fermentables:
            return fermentable_schema.dump(fermentables)
        return {"message": FERMENTABLES_NOT_FOUND}

class FermentablesCreate(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        data = request.get_json()
        data["user_id"] = get_jwt_identity()
        fermentables = fermentable_schema.load(data, session=db.session)
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
            
