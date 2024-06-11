from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Recipe
from .serializers import RecipeSerializer

class RecipePagination(PageNumberPagination):
    page_size = 10

@api_view(['GET'])
def get_recipes(request):
    recipes = Recipe.objects.all()
    paginator = RecipePagination()
    result_page = paginator.paginate_queryset(recipes, request)
    serializer = RecipeSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_ingredients(request):
    ingredients = Ingredient.objects.all()
    serializer = IngredientSerializer(ingredients, many=True)
    return Response(serializer.data)
