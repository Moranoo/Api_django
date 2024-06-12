# cuisneprojet/recettes/urls.py

from django.urls import path
from .views import get_recipes, get_ingredients, CreateUserView, TokenObtainPairView

urlpatterns = [
    path('recipes/', get_recipes, name='get_recipes'),
    path('recipes/<str:category>/', get_recipes, name='get_recipes_by_category'),
    path('ingredients/', get_ingredients, name='get_ingredients'),
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
]
