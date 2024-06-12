from django.contrib import admin
from django.urls import path, include
from recettes.views import get_recipes, get_ingredients  # Importer les vues depuis l'application `recettes`

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/recipes/', get_recipes, name='get_recipes'),
    path('api/recipes/<str:category>', get_recipes, name='get_recipes_by_category'),
    path('api/ingredients/', get_ingredients, name='get_ingredients'),
]
