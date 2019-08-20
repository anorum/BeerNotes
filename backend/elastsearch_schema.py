from elasticsearch_dsl import Document, InnerDoc, Keyword, Text, Float, Float, Boolean, Integer, Nested, Index


class Fermentable(InnerDoc):
    brand = Keyword()
    name = Keyword()

class Fermentables(InnerDoc):
    fermentable = Nested(Fermentable)
    amount = Float()

class Hop(InnerDoc):
    alpha = Float()
    typical_beer = Keyword()
    name = Keyword()
    hop_type = Keyword()
    brand = Keyword()
    aroma = Text()

class Hops(InnerDoc):
    hop_schedule = Integer()
    amount = Float()
    hop = Nested(Hop)

class Yeast(InnerDoc):
    yeast_format = Keyword()
    min_fermenting_temp = Integer()
    max_fermenting_temp = Integer()
    name = Keyword()
    avg_attenuation = Integer()
    yeast_style = Keyword()
    brand = Keyword()

class Yeasts(InnerDoc):
    pitch_temp = Integer()
    pitch_time = Text()
    yeast = Nested(Yeast)
    
class Grain(InnerDoc):
    brand = Keyword()
    name = Keyword()

class Grains(InnerDoc):
    amount = Float()
    grain = Nested(Grain)

class Recipe(Document):
    name = Text()
    target_og = Float()
    style = Keyword()
    actual_abv = Float()
    target_abv = Float()
    description = Text()
    private = Boolean()
    target_fg = Float()
    SRM = Integer()
    type = Keyword()

    fermentables = Nested(Fermentables)
    hops = Nested(Hops)
    yeasts = Nested(Yeasts)
    grains = Nested(Grains)

    class Index:
        name = 'brewcipes'

