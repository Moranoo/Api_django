from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Q
from .models import Recipe, Ingredient
from .serializers import RecipeSerializer
from .serializers import IngredientSerializer

class RecipePagination(PageNumberPagination):
    page_size = 10

@api_view(['GET'])
def get_recipes(request):
    category = request.query_params.get('category')
    ingredients = request.query_params.getlist('ingredients')

    # Filtrage initial par catégorie
    recipes = Recipe.objects.all()
    if category:
        recipes = recipes.filter(category=category)

    # Filtrage par ingrédients
    if ingredients:
        ingredient_ids = Ingredient.objects.filter(name__in=ingredients).values_list('id', flat=True)
        for ingredient_id in ingredient_ids:
            recipes = recipes.filter(ingredients__id=ingredient_id)
        # S'assurer que les recettes ont tous les ingrédients sélectionnés
        recipes = recipes.annotate(num_ingredients=Count('ingredients')).filter(num_ingredients__gte=len(ingredient_ids)).distinct()

    paginator = RecipePagination()
    result_page = paginator.paginate_queryset(recipes, request)
    serializer = RecipeSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_ingredients(request):
    ingredients = Ingredient.objects.all()
    serializer = IngredientSerializer(ingredients, many=True)
    return Response(serializer.data)