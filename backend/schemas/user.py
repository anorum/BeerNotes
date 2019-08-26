from ma import ma
from marshmallow import pre_dump, fields
from models.user import UserModel
from models.confirmation import ConfirmationModel
from schemas.confirmation import ConfirmationSchema
from schemas.resettokens import ResetTokenSchema


class UserSchema(ma.ModelSchema):

    id = fields.UUID()
    email = fields.String()
    password = fields.String()
    is_admin = fields.Boolean()
    confirmation = fields.Nested(ConfirmationSchema, many=True)
    profile_pic_link = fields.String()
    username = fields.String()
    reset_token = fields.Nested(ResetTokenSchema, many=True)

    class Meta:
        model = UserModel
        load_only = ("password",)
        dump_only = ("id", "is_admin", "confirmation", "reset_token")

class UserRecipeSchema(ma.ModelSchema):
    id = fields.UUID()
    profile_pic_link = fields.String()
    username = fields.String()

    class Meta:
        model = UserModel
        fields= ("id", "profile_pic_link", "username")
        dump_only = ("id", "profile_pic_link", "username")



@pre_dump
def _pre_dump(self, user: UserModel):
    user.confirmation = user.most_recent_confirmation
    print(user.confirmation)
    return user


user_schema = UserSchema()
users_schema = UserSchema(many=True)
