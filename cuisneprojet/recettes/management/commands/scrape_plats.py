# scrape_plats.py
import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from recettes.models import Recipe, Ingredient, RecipeIngredient

class Command(BaseCommand):
    help = 'Scrape main course recipes from CuisineAZ'

    def handle(self, *args, **kwargs):
        base_url = 'https://www.cuisineaz.com/categories/plats-cat48816'
        page = requests.get(base_url)
        soup = BeautifulSoup(page.content, 'html.parser')

        pagination = soup.find_all('a', class_='lienPagination')
        total_pages = len(pagination) + 1

        for i in range(1, total_pages + 1):
            url = f'{base_url}?page={i}'
            page = requests.get(url)
            soup = BeautifulSoup(page.content, 'html.parser')

            recipes = soup.find_all('a', class_='tile_title txt-black fs18 dblock mb5 txt-normal')
            for recipe in recipes:
                recipe_url = 'https://www.cuisineaz.com' + recipe['href']
                recipe_page = requests.get(recipe_url)
                recipe_soup = BeautifulSoup(recipe_page.content, 'html.parser')

                title = recipe_soup.find('h1', class_='recipe-title').text.strip()
                image_tag = recipe_soup.find('img', class_='imgRecipe')
                image_url = image_tag['src'] if image_tag else ''

                ingredients_tags = recipe_soup.find_all('span', class_='ingredient_label')
                quantity_tags = recipe_soup.find_all('span', class_='js-ingredient-qte ingredient_qte')

                # Vérifier si la recette existe déjà
                recipe_obj, created = Recipe.objects.get_or_create(
                    title=title,
                    recipe_url=recipe_url,
                    image_url=image_url,  # Ajout de l'URL de l'image
                    category='plat'
                )

                if created:
                    for idx in range(len(ingredients_tags)):
                        ingredient_name = ingredients_tags[idx].text.strip()
                        quantity = quantity_tags[idx].text.strip()

                        ingredient_obj, _ = Ingredient.objects.get_or_create(name=ingredient_name)

                        RecipeIngredient.objects.create(
                            recipe=recipe_obj,
                            ingredient=ingredient_obj,
                            quantity=quantity
                        )

                    self.stdout.write(self.style.SUCCESS(f'Recipe "{title}" scraped successfully!'))
                else:
                    self.stdout.write(self.style.WARNING(f'Recipe "{title}" already exists, skipping.'))
