from ma import ma
from marshmallow import Schema, fields
from models.hops import HopsModel


class HopsSchema(ma.ModelSchema):
    id = fields.UUID()
    brand = fields.String()
    name = fields.String()
    alpha = fields.Float()
    aroma = fields.String()
    typical_beer = fields.String()
    hop_type = fields.String()
    user_id = fields.UUID()

    class Meta:
        model = HopsModel
        fields = ("id", "brand", "name", "alpha", "aroma",
                  "typical_beer", "hop_type", "user_id")
        include_fk = True
        dump_only = ('id',)


hop_schema = HopsSchema()
hops_schema = HopsSchema(many=True)
