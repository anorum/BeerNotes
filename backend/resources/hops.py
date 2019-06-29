from flask import request
from flask_restful import Resource
from flask_jwt_extended import (jwt_required,
                                create_access_token,
                                create_refresh_token,
                                get_jwt_claims,
                                fresh_jwt_required,
                                get_jwt_identity)

from schemas.hops import hop_schema, hops_schema
from models.hops import HopsModel
from db import db

ERROR_INSERTING = "An error occurred while inserting the hop."
HOPS_NOT_FOUND = "No hops with this name was found."


class Hop(Resource):
    """ Resource for Hops endpoint. POST, GET, and PATCH. /hop """

    @classmethod
    @jwt_required
    def post(cls, name: str):
        data = request.get_json()
        data["name"] = name
        data["user_id"] = get_jwt_identity()
        hop = hop_schema.load(data)
        print(data)

        try:
            hop.save_to_db()
        except:
            return {"message": ERROR_INSERTING}, 500

        return hop_schema.dump(hop), 201

    @classmethod
    def get(cls, name: str):
        args = request.args
        print(args)
        hops = HopsModel.find_by_name(name)
        if hops:
            return hops_schema.dump(hops), 200
        return {"message": HOPS_NOT_FOUND}, 404
