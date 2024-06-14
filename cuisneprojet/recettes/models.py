from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    recipe = models.ManyToManyField('Recipe', related_name='recipe', through='RecipeIngredient')

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.quantity} {self.ingredient.name}'


class Recipe(models.Model):
    CATEGORY_CHOICES = [
        ('base', 'Plats de Base'),
        ('dessert', 'Desserts'),
        ('plat', 'Plats'),
    ]

    title = models.CharField(max_length=255)
    ingredients = models.ManyToManyField(Ingredient, related_name='ingredient', through='RecipeIngredient')  # Pour stocker les ingrédients et quantités en texte
    recipe_url = models.URLField()
    image_url = models.URLField(blank=True)  # Ajout de l'URL de l'image
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)  # Augmenté pour éviter les erreurs
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class FavoriteRecipes(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.recipe.title}'
