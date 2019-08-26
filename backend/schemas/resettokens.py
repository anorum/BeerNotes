from ma import ma
from marshmallow import fields, pre_dump
from models.resettokens import ResetTokenModel

class ResetTokenSchema(ma.ModelSchema):

    id = fields.UUID()
    expire_at = fields.Integer()
    used = fields.Boolean()
    user_id = fields.UUID()

    class Meta:
        model = ResetTokenModel
        load_only = ("user",)
        dump_only = ("id", "expire_at", "confirmed")
        include_fk = True

reset_token_schema = ResetTokenSchema()