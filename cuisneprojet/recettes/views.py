from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Q
from .models import Recipe, Ingredient
from .serializers import RecipeSerializer,IngredientSerializer
from django.contrib.auth.models import User
from rest_framework import permissions, status, views
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer


class RecipePagination(PageNumberPagination):
    page_size = 12

@api_view(['GET'])
def get_recipes(request):
    category = request.query_params.get('category')
    ingredients = request.query_params.getlist('ingredients')
    title = request.query_params.get('title')

    recipes = Recipe.objects.all()

    if title:
        recipes = recipes.filter(title__icontains=title)

    if category:
        recipes = recipes.filter(category=category)

    if ingredients:
        ingredient_ids = Ingredient.objects.filter(name__in=ingredients).values_list('id', flat=True)
        recipes = recipes.filter(ingredients__id__in=ingredient_ids)
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

class CreateUserView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenObtainPairView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(status=status.HTTP_401_UNAUTHORIZED)