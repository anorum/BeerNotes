from marshmallow import fields
from ma import ma
from models.recipes import (
    RecipeModel, RecipeFermentables, RecipeHops, RecipeGrains, RecipeYeasts)
from schemas.user import UserRecipeSchema, UserSchema, UserPrivate
from schemas.fermentables import FermentablesSchema
from schemas.hops import HopsSchema
from schemas.grains import GrainsSchema
from schemas.yeast import YeastSchema


class RecipeFermentablesSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    fermentable_id = fields.UUID()
    fermentable = fields.Nested(FermentablesSchema)

    class Meta:
        model = RecipeFermentables
        fields = ("recipe_id", "fermentable_id", "amount", "fermentable")
        dump_only = ("fermentable",)
        load_only = ("recipe_id",)


recipe_fermentable_schema = RecipeFermentablesSchema()
recipe_fermentables_schmea = RecipeFermentablesSchema(many=True)


class RecipeHopsSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    hop_id = fields.UUID()
    hop = fields.Nested(HopsSchema)

    class Meta:
        model = RecipeHops
        fields = ("recipe_id", "hop_id", "amount", "hop_schedule", "hop")
        dump_only = ("hop",)
        load_only = ("recipe_id",)


recipe_hop_schema = RecipeHopsSchema()
recipe_hops_schema = RecipeHopsSchema(many=True)


class RecipeGrainsSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    grain_id = fields.UUID()
    grain = fields.Nested(GrainsSchema)

    class Meta:
        model = RecipeGrains
        fields = ("recipe_id", "grain_id", "amount", "grain")
        dump_only = ("grain",)
        load_only = ("recipe_id",)


recipe_grain_schema = RecipeGrainsSchema()
recipe_grains_schema = RecipeGrainsSchema(many=True)


class RecipeYeastsSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    yeast_id = fields.UUID()
    yeast = fields.Nested(YeastSchema)

    class Meta:
        model = RecipeYeasts
        fields = ("recipe_id", "yeast_id", "yeast",
                  "pitch_temp", "pitch_time", "attenuation")
        dump_only = ("yeast",)
        load_only = ("recipe_id",)


recipe_yeast_schema = RecipeYeastsSchema()
recipe_yeasts_schema = RecipeYeastsSchema(many=True)


class RecipeSchema(ma.ModelSchema):
    id = fields.UUID()
    user_id = fields.UUID()
    fermentables = fields.Nested(RecipeFermentablesSchema, many=True)
    hops = fields.Nested(RecipeHopsSchema, many=True)
    grains = fields.Nested(RecipeGrainsSchema, many=True)
    yeasts = fields.Nested(RecipeYeastsSchema, many=True)
    user = fields.Nested(UserRecipeSchema)

    class Meta:
        model = RecipeModel
        fields = ("id", "name", "user_id", "user",
                  "target_abv", "fermentables",
                  "hops", "grains", "yeasts", "batch_size",
                  "efficiency", "boil_time",
                  "target_abv", "actual_abv", "target_og",
                  "actual_og", "target_fg", "actual_fg", "IBU", "SRM",
                  "description", "method", "instructions", "private_recipe", "style", "published", "icon"
                  )
        dump_only = ("user",)
        include_fk = True


class ProfileSchemaPublic(ma.Schema):
    recipes = fields.Nested(RecipeSchema, many=True)
    user = fields.Nested(UserRecipeSchema)
    hops = fields.Nested(HopsSchema, many=True)
    fermentables = fields.Nested(FermentablesSchema, many=True)
    yeasts = fields.Nested(YeastSchema, many=True)

    class Meta:
        include_fk = True


class ProfileSchemaPrivate(ma.Schema):
    recipes = fields.Nested(RecipeSchema, many=True)
    user = fields.Nested(UserPrivate)
    hops = fields.Nested(HopsSchema, many=True)
    fermentables = fields.Nested(FermentablesSchema, many=True)
    yeasts = fields.Nested(YeastSchema, many=True)

    class Meta:
        include_fk = True


recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)

profile_recipe_public = ProfileSchemaPublic()
profile_recipe_private = ProfileSchemaPrivate()
