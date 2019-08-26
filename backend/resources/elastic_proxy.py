from flask import request, current_app
from flask_restful import Resource

class ElasticProxy(Resource):
    @classmethod
    def post(cls, path):
        data = request.get_data(as_text=True)
        res = current_app.elasticsearch.msearch(body = data)
        return res, 200
