import requests
from bs4 import BeautifulSoup


#pagination
url = 'https://www.cuisineaz.com/categories/bases-cat48653'
page = requests.get(url)

soup = BeautifulSoup(page.content, 'html.parser')

pagination = soup.find_all('a', class_='lienPagination')
print(len(pagination))

for i in range(len(pagination)+1):
    url = f'https://www.cuisineaz.com/categories/bases-cat48653?page={i}'
    page = requests.get(url)

    soup = BeautifulSoup(page.content, 'html.parser')

    # find all the recipes
    recipes = soup.find_all('a', class_='tile_title txt-black fs18 dblock mb5 txt-normal')
    for recipe in recipes:
        # print(recipe.text)
        # print(recipe['href'])
        # print()
        url = 'https://www.cuisineaz.com' + recipe['href']
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')
        ingredients = soup.find_all('span', class_='ingredient_label')
        quantity = soup.find_all('span', class_='js-ingredient-qte ingredient_qte')
        title = soup.find('h1', class_='recipe-title').text
        print(title)
        for i in range(len(ingredients)):
            print(quantity[i].text, ingredients[i].text)
        print("-----------------")
    print("==========================================")
    i+=1


