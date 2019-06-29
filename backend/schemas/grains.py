from marshmallow import fields
from ma import ma
from models.grains import GrainsModel


class GrainsSchema(ma.ModelSchema):
    id = fields.UUID()
    user_id = fields.UUID()

    class Meta:
        model = GrainsModel
        fields = ("id", "name", "brand", "user_id")
        dump_only = ("id",)
        include_fk = True


grain_schema = GrainsSchema()
grains_schema = GrainsSchema(many=True)
