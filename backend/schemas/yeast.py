from marshmallow import fields
from ma import ma
from models.yeast import YeastModel


class YeastSchema(ma.ModelSchema):
    id = fields.UUID()
    user_id = fields.UUID()

    class Meta:
        fields = ("id", "brand", "name", "yeast_style", "yeast_format",
                  "avg_attenuation", "min_fermenting_temp", "max_fermenting_temp", "user_id")
        dump_only = ('id',)
        model = YeastModel
        include_fk = True


yeast_schema = YeastSchema()
yeasts_schema = YeastSchema(many=True)
