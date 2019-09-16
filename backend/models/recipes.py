from uuid import uuid4
import datetime
from db import db
from models.basemodel import BaseModel
from models.fermentables import FermentablesModel
from models.hops import HopsModel
from models.grains import GrainsModel
from models.yeast import YeastModel
from models.searchableMixIn import SearchableMixin
from sqlalchemy.dialects.postgresql import UUID, ARRAY


class RecipeFermentables(db.Model, BaseModel):
    __tablename__ = "recipes_fermentables"
    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'))
    fermentable_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'fermentable.id'))
    amount = db.Column(db.Float(), nullable=False)
    fermentable = db.relationship("FermentablesModel")


# TODO Check to make the primary key the combination of recipe,
# hops, and hop_schedule so that you can add same hop on different schedule.
class RecipeHops(db.Model, BaseModel):
    __tablename__ = "recipes_hops"
    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'))
    hop_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'hop.id'))
    amount = db.Column(db.Float(), nullable=False)
    hop_schedule = db.Column(db.Integer(), nullable=False)
    hop = db.relationship("HopsModel")


class RecipeGrains(db.Model, BaseModel):
    __tablename__ = "recipes_grains"
    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'))
    grain_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'grain.id'))
    amount = db.Column(db.Float(), nullable=False)
    grain = db.relationship("GrainsModel")


class RecipeYeasts(db.Model, BaseModel):
    __tablename__ = "recipes_yeasts"
    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'))
    yeast_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'yeast.id'))
    pitch_temp = db.Column(db.Integer(), nullable=False)
    pitch_time = db.Column(db.String(128))
    attenuation = db.Column(db.Integer(), nullable=False)
    yeast = db.relationship("YeastModel")


class RecipeMashSteps(db.Model, BaseModel):
    __tablename__ = "recipes_mash"
    id = db.Column(UUID(as_uuid=True), nullable=False,
                   primary_key=True, default=uuid4)
    step = db.Column(db.Integer())
    recipe_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'recipe.id'))
    amount = db.Column(db.Float())
    notes = db.Column(db.String(240), nullable=False)
    mash_type = db.Column(db.String(80), nullable=False)
    temperature = db.Column(db.Integer(), nullable=False)
    time = db.Column(db.Integer(), nullable=False)


class RecipeModel(db.Model, BaseModel, SearchableMixin):
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
    batch_size = db.Column(db.Float(precision=1))
    boil_time = db.Column(db.Integer())
    efficiency = db.Column(db.Integer())
    IBU = db.Column(db.Integer())
    SRM = db.Column(db.Float(precision=3))
    hex_color = db.Column(db.String(10))
    description = db.Column(db.UnicodeText())
    style = db.Column(db.String(240), nullable=False)
    method = db.Column(db.String(240), nullable=False)
    instructions = db.Column(ARRAY(db.String(1200)))
    private_recipe = db.Column(db.Boolean(), default=False)
    published = db.Column(db.Boolean(), default=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    icon = db.Column(db.String(40), nullable=False)
    finished = db.Column(db.Boolean(), default=False)
    priming_level = db.Column(db.Float(), nullable=False)

    user = db.relationship("UserModel")
    fermentables = db.relationship(
        "RecipeFermentables", cascade="all, delete-orphan")
    hops = db.relationship("RecipeHops", cascade="all, delete-orphan")
    grains = db.relationship("RecipeGrains", cascade="all, delete-orphan")
    yeasts = db.relationship("RecipeYeasts", cascade="all, delete-orphan")
    mash_steps = db.relationship("RecipeMashSteps", cascade="all, delete-orphan")
