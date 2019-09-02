from marshmallow import fields
from ma import ma
from models.fermentables import FermentablesModel


class FermentablesSchema(ma.ModelSchema):
    id = fields.UUID()
    user_id = fields.UUID()

    class Meta:
        model = FermentablesModel
        fields = ("id", "name", "brand", "ppg", "lovibond", "category", "user_id", "custom")
        dump_only = ("id",)
        include_fk = True


fermentable_schema = FermentablesSchema()
fermentables_schema = FermentablesSchema(many=True)
