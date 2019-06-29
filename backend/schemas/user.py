from ma import ma
from marshmallow import pre_dump, fields
from models.user import UserModel
from models.confirmation import ConfirmationModel
from schemas.confirmation import ConfirmationSchema


class UserSchema(ma.ModelSchema):

    id = fields.UUID()
    email = fields.String()
    password = fields.String()
    is_admin = fields.Boolean()
    confirmation = fields.Nested(ConfirmationSchema, many=True)
    profile_pic_link = fields.String()

    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id", "is_admin", "confirmation")


@pre_dump
def _pre_dump(self, user: UserModel):
    user.confirmation = user.most_recent_confirmation
    print(user.confirmation)
    return user


user_schema = UserSchema()
users_schema = UserSchema(many=True)
