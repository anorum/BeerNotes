
def flatten_recipe_ingredient(ingredient_list, name):
    clean_ingredient_list = []
    for ingredient in ingredient_list:
        if ingredient[name]:
            clean_ingredient_list.append(ingredient[name]['id'])
    return clean_ingredient_list


def clean_recipe_elastic(recipe):
    ingredients_to_add = ['grains', 'hops', 'fermentables', 'yeasts']
    clean_recipe = recipe
    for ingredient in ingredients_to_add:
        clean_recipe[ingredient] = flatten_recipe_ingredient(recipe[ingredient], ingredient[:-1])
    clean_recipe["type"] = "recipe"
    return clean_recipe