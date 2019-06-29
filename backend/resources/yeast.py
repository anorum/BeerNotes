from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from models.yeast import YeastModel
from schemas.yeast import yeast_schema, yeasts_schema

ERROR_INSERTING = "An error occurred while inserting the yeast."
YEAST_NOT_FOUND = "No yeast with this names was found."


class Yeast(Resource):

    @classmethod
    @jwt_required
    def post(cls, name):
        data = request.get_json()
        data["name"] = name
        data["user_id"] = get_jwt_identity()
        yeast = yeast_schema.load(data, session=db.session)
        try:
            yeast.save_to_db()
        except Exception as e:
            print(e)
            return {"message": ERROR_INSERTING}, 500

        return yeast_schema.dump(yeast), 201

    @classmethod
    def get(cls, name):
        yeast = YeastModel.find_by_name(name=name)
        print(yeast)
        if yeast:
            return yeasts_schema.dump(yeast)
        return {"message": YEAST_NOT_FOUND}
