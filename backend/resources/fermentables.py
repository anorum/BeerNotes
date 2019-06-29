from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required
from db import db
from models.fermentables import FermentablesModel
from schemas.fermentables import fermentable_schema, fermentables_schema

ERROR_INSERTING = "An error occurred while inserting the fermentables."
FERMENTABLES_NOT_FOUND = "No fermentables with this names was found."


class Fermentables(Resource):

    @classmethod
    @jwt_required
    def post(cls, name):
        data = request.get_json()
        data["name"] = name
        data["user_id"] = get_jwt_identity()
        fermentables = fermentable_schema.load(data, session=db.session)
        try:
            fermentables.save_to_db()
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500

        return fermentable_schema.dump(fermentables), 201

    @classmethod
    def get(cls, name):
        fermentables = FermentablesModel.find_by_name(name=name)
        if fermentables:
            return fermentables_schema.dump(fermentables)
        return {"message": FERMENTABLES_NOT_FOUND}
