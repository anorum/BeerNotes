from ma import ma
from marshmallow import Schema, fields
from models.hops import HopsModel


class HopsSchema(ma.ModelSchema):
    id = fields.UUID()
    name = fields.String()
    hop_type = fields.String()
    user_id = fields.UUID()

    class Meta:
        model = HopsModel
        fields = ("id", "brand", "name", "alpha", "aroma",
                  "typical_beer", "hop_type", "user_id", "custom")
        include_fk = True
        dump_only = ('id',)


hop_schema = HopsSchema()
hops_schema = HopsSchema(many=True)
