from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models.grains import GrainsModel
from schemas.grains import grain_schema, grains_schema

ERROR_INSERTING = "An error occurred while inserting the grains."
GRAINS_NOT_FOUND = "No grains with this names was found."


class Grains(Resource):

    @classmethod
    @jwt_required
    def post(cls, name):
        data = request.get_json()
        data["name"] = name
        data["user_id"] = get_jwt_identity()
        grains = grain_schema.load(data, session=db.session)
        try:
            grains.save_to_db()
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500

        return grain_schema.dump(grains), 201

    @classmethod
    def get(cls, name):
        grains = GrainsModel.find_by_name(name=name)
        if grains:
            return grains_schema.dump(grains)
        return {"message": GRAINS_NOT_FOUND}
