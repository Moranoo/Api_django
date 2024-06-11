import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from recettes.models import Recipe

class Command(BaseCommand):
    help = 'Scrape base recipes from CuisineAZ'

    def handle(self, *args, **kwargs):
        base_url = 'https://www.cuisineaz.com/categories/bases-cat48653'
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
                ingredients_tags = recipe_soup.find_all('span', class_='ingredient_label')
                quantity_tags = recipe_soup.find_all('span', class_='js-ingredient-qte ingredient_qte')

                ingredients_list = []
                for idx in range(len(ingredients_tags)):
                    quantity = quantity_tags[idx].text.strip()
                    ingredient = ingredients_tags[idx].text.strip()
                    ingredients_list.append(f'{quantity} {ingredient}')

                ingredients = ', '.join(ingredients_list)

                # Enregistrer la recette dans la base de données avec la catégorie 'base'
                Recipe.objects.create(
                    title=title,
                    ingredients=ingredients,
                    recipe_url=recipe_url,
                    category='base'
                )

                self.stdout.write(self.style.SUCCESS(f'Recipe "{title}" scraped successfully!'))
