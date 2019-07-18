from uuid import uuid4
from db import db
from models.basemodel import BaseModel
from models.fermentables import FermentablesModel
from models.searchableMixIn import SearchableMixin
from sqlalchemy.dialects.postgresql import UUID


class RecipeFermentables(db.Model, BaseModel):
    __tablename__ = "recipes_fermentables"
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'), primary_key=True)
    fermentable_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'fermentable.id'), primary_key=True)
    amount = db.Column(db.Float(), nullable=False)
    fermentable = db.relationship("FermentablesModel")


class RecipeHops(db.Model, BaseModel):
    __tablename__ = "recipes_hops"
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'), primary_key=True)
    hop_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'hop.id'), primary_key=True)
    amount = db.Column(db.Float(), nullable=False)
    hop_schedule = db.Column(db.Integer())
    hop = db.relationship("HopsModel")


class RecipeGrains(db.Model, BaseModel):
    __tablename__ = "recipes_grains"
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'), primary_key=True)
    grain_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'grain.id'), primary_key=True)
    amount = db.Column(db.Float(), nullable=False)
    grain = db.relationship("GrainsModel")


class RecipeYeasts(db.Model, BaseModel):
    __tablename__ = "recipes_yeasts"
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'), primary_key=True)
    yeast_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'yeast.id'), primary_key=True)
    pitch_temp = db.Column(db.Integer())
    pitch_time = db.Column(db.String(128))


class RecipeModel(db.Model, BaseModel):
    __tablename__ = "recipe"

    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        "user.id"), nullable=False)
    name = db.Column(db.String(240), nullable=False)
    target_abv = db.Column(db.Float(precision=3))
    actual_abv = db.Column(db.Float(precision=3))
    target_og = db.Column(db.Float(precision=3))
    actual_og = db.Column(db.Float(precision=3))
    target_fg = db.Column(db.Float(precision=3))
    actual_fg = db.Column(db.Float(precision=3))
    IBU = db.Column(db.Integer())
    SRM = db.Column(db.Integer())
    description = db.Column(db.UnicodeText())
    method = db.Column(db.String(240))
    instructions = db.Column(db.UnicodeText())
    private = db.Column(db.Boolean(), nullable=False, default=False)

    user = db.relationship("UserModel")
    fermentables = db.relationship("RecipeFermentables")
    hops = db.relationship("RecipeHops")
    grains = db.relationship("RecipeGrains")
    yeasts = db.relationship("RecipeYeasts")
