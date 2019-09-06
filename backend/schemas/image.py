from marshmallow import Schema, fields
from werkzeug.datastructures import FileStorage


class FileStorageField(fields.Field):
    default_error_messages = {
        "invalid": "Not a valid image."
    }

    def _deserialize(self, value, attr, data) -> FileStorage:
        if value is None:
            return None
        if not isinstance(value, FileStorage):
            self.fail("invalid")

        return value


class ImageSchema(Schema):
    image = FileStorageField(required=True)

class ProfileUpdate(Schema):
    image = FileStorageField()
    description = fields.String()


image_schema = ImageSchema()
images_schema = ImageSchema(many=True)
profile_update_schema = ProfileUpdate()
