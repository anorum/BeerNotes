from ma import ma
from marshmallow import fields, pre_dump
from models.confirmation import ConfirmationModel


class ConfirmationSchema(ma.ModelSchema):

    id = fields.UUID()
    expire_at = fields.Integer()
    confirmed = fields.Boolean()
    user_id = fields.UUID()

    class Meta:
        model = ConfirmationModel
        load_only = ("user",)
        dump_only = ("id", "expired_at", "confirmed")
        include_fk = True


confirmation_schema = ConfirmationSchema()
confirmations_schema = ConfirmationSchema(many=True)
