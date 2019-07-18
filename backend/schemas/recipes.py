from marshmallow import fields
from ma import ma
from models.recipes import (
    RecipeModel, RecipeFermentables, RecipeHops, RecipeGrains, RecipeYeasts)
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
        load_only = ("fermentable_id", "recipe_id")


recipe_fermentable_schema = RecipeFermentablesSchema()
recipe_fermentables_schmea = RecipeFermentablesSchema(many=True)


class RecipeHopsSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    hop_id = fields.UUID()
    hop = fields.Nested(HopsSchema)

    class Meta:
        model = RecipeHops
        fields = ("recipe_id", "hop_id", "amount", "hop_schedule", "hop")
        load_only = ("hop_id", "recipe_id")


recipe_hop_schema = RecipeHopsSchema()
recipe_hops_schema = RecipeHopsSchema(many=True)


class RecipeGrainsSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    grain_id = fields.UUID()
    grain = fields.Nested(GrainsSchema)

    class Meta:
        model = RecipeGrains
        fields = ("recipe_id", "grain_id", "amount", "grain")
        load_only = ("grain_id", "recipe_id")


recipe_grain_schema = RecipeGrainsSchema()
recipe_grains_schema = RecipeGrainsSchema(many=True)


class RecipeYeastsSchema(ma.ModelSchema):
    recipe_id = fields.UUID()
    yeast_id = fields.UUID()
    yeast = fields.Nested(YeastSchema)

    class Meta:
        model = RecipeYeasts
        fields = ("recipe_id", "yeast_id", "yeast", "pitch_temp", "pitch_time")
        load_only = ("yeast_id", "recipe_id")


recipe_yeast_schema = RecipeYeastsSchema()
recipe_yeasts_schema = RecipeYeastsSchema(many=True)


class RecipeSchema(ma.ModelSchema):
    id = fields.UUID()
    user_id = fields.UUID()
    fermentables = fields.Nested(RecipeFermentablesSchema, many=True)
    hops = fields.Nested(RecipeHopsSchema, many=True)
    grains = fields.Nested(RecipeGrainsSchema, many=True)
    yeasts = fields.Nested(RecipeYeastsSchema, many=True)

    class Meta:
        model = RecipeModel
        fields = ("id", "name", "user_id",
                  "target_abv", "fermentables", "hops", "grains", "yeasts")
        include_fk = True




recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)
