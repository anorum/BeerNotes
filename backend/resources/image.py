from flask_restful import Resource
from flask_uploads import UploadNotAllowed
from flask import request, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import traceback
import boto3


from libs import image_helper
from schemas.image import image_schema, images_schema, profile_update_schema
from models.user import UserModel


IMAGE_UPLOADED = "{} has been uploaded successfully."
IMAGE_ILLEGAL_EXTENSION = "{} files are not allowed."
IMAGE_ILLEGAL_FILE_NAME = "{} is not a valid file name."
IMAGE_NOT_FOUND = "{} was not found."
IMAGE_DELETED = "{} has been deleted"
IMAGE_DELETE_FAILED = "Failed to delete image {}"
AVATAR_DELETE_FAILED = "Failed to delete profile picture."
AVATAR_UPLOADED = "Profile picture uploaded."
AVATAR_NOT_FOUND = "No Profile Image"

s3 = boto3.client('s3')
bucket_name = 'brewcipes'
allowed_extensions = [".jpg", ".png", ".jpeg"]


class ImageUpload(Resource):
    @jwt_required
    def post(self):
        """
        Used to upload an image file.
        It uses JWT to retrieve user information and then saves the image to the users folder.
        If there is a filename conflict,it appends a number at the end
        """
        data = image_schema.load(request.files)
        user_id = get_jwt_identity()
        folder = f"user_{user_id}"
        try:
            image_path = image_helper.save_image(data["image"], folder=folder)
            basename = image_helper.get_basename(image_path)
            return {"message": IMAGE_UPLOADED.format(basename)}, 201
        except UploadNotAllowed:
            extension = image_helper.get_extension(data["image"])
            return {"message": IMAGE_ILLEGAL_EXTENSION.format(extension)}, 400


class Image(Resource):
    @jwt_required
    def get(self, filename: str):
        """
        Returns the requested image if it exists, looks up in the loggedin users folder
        """
        user_id = get_jwt_identity()
        folder = f"user_{user_id}"
        if not image_helper.is_filename_safe(filename):
            return {"message": IMAGE_ILLEGAL_FILE_NAME.format(filename)}, 400
        try:
            return send_file(image_helper.get_path(filename, folder=folder))
        except FileNotFoundError:
            return {"message": IMAGE_NOT_FOUND.format(filename)}, 404

    @jwt_required
    def delete(self, filename: str):
        user_id = get_jwt_identity()
        folder = f"user_{user_id}"

        if not image_helper.is_filename_safe(filename):
            return {"message": IMAGE_ILLEGAL_FILE_NAME.format(filename)}, 400

        try:
            os.remove(image_helper.get_path(filename, folder=folder))
            return {"message": IMAGE_DELETED.format(filename)}, 200
        except FileNotFoundError:
            return {"message": IMAGE_NOT_FOUND.format(filename)}, 404
        except:
            return {"message": IMAGE_DELETE_FAILED.format(filename)}, 500


class AvatarUpload(Resource):
    @jwt_required
    def put(self):
        """ This endpoint is used to upload user_avatars. 
        All avatars are named after the User's ID.
        """
        data = profile_update_schema.load(request.files)
        description = request.form["description"]
        filename = f"user_{get_jwt_identity()}"
        user = UserModel.find_by_id(get_jwt_identity())
        if description:
            try:
                user.description = description
                user.save_to_db()
            except:
                return {"message": "There was an issue updating your profile."}
        if "image" in data.keys():
            try:
                if not image_helper.is_filename_safe(data["image"].filename):
                    return {"message": "Your file name is invalid."}, 401
                ext = image_helper.get_extension(data["image"].filename)
                if ext not in allowed_extensions:
                    return {"message": "Please Only Upload .jpg, .png, or .jpeg files."}, 401
                for ext in allowed_extensions:
                    try:
                        if s3.get_object(Bucket="brewcipes", Key="profile_pics/"+filename+ext):
                            s3.delete_object(
                                Bucket="brewcipes", Key="profile_pics/"+filename+ext)
                            user.profile_pic_link = None
                            user.save_to_db()
                        break
                    except:
                        continue

                avatar = filename + ext
                s3.upload_fileobj(
                    data["image"], bucket_name, "profile_pics/"+avatar)
                user.profile_pic_link = "https://brewcipes.s3-us-west-2.amazonaws.com/profile_pics/{}".format(
                    avatar)
                user.save_to_db()
            except UploadNotAllowed:
                extension = image_helper.get_extension(data["image"])
                return {"message": IMAGE_ILLEGAL_EXTENSION.format(extension)}, 400
        return {"message": "Profile successfully updated."}, 200

    @jwt_required
    def delete(self):
        user = UserModel.find_by_id(get_jwt_identity())
        filename = user.profile_pic_link[user.profile_pic_link.rindex("/")+1:]
        try:
            if s3.get_object(Bucket="brewcipes", Key="profile_pics/"+filename):
                s3.delete_object(
                    Bucket="brewcipes", Key="profile_pics/"+filename)
                user.profile_pic_link = None
                user.save_to_db()
                return {"message": "Your profile picture has been deleted."}
        except:
            return {"message": "An Error occurred while deleting profile picture."}


class Avatar(Resource):
    @classmethod
    def get(cls, user_id: int):
        """
        This endpoint returns the avatar of the user specified by user_id.
        """
        folder = "avatars"
        filename = f"user_{user_id}"
        avatar = image_helper.find_image_any_format(filename, folder)
        if avatar:
            return send_file(avatar)
        return {"message": AVATAR_NOT_FOUND}, 404


class RecipeUploads(Resource):
    @jwt_required
    def post(self, recipe_id: int):
        """
        Used to upload an image file.
        It uses JWT to retrieve user information and then saves the image to the users folder.
        If there is a filename conflict,it appends a number at the end
        """
        data = image_schema.load(request.files)
        # TODO ADD THE RECIPE_ID MODEL
        folder = f"beer_{recipe_id}"
        try:
            image_path = image_helper.save_image(data["image"], folder=folder)
            basename = image_helper.get_basename(image_path)
            return {"message": IMAGE_UPLOADED.format(basename)}, 201
        except UploadNotAllowed:
            extension = image_helper.get_extension(data["image"])
            return {"message": IMAGE_ILLEGAL_EXTENSION.format(extension)}, 400
