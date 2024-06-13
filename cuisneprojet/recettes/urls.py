from django.urls import path
from .views import get_recipes, get_ingredients, CreateUserView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('recipes/', get_recipes, name='get_recipes'),
    path('recipes/<str:category>/', get_recipes, name='get_recipes_by_category'),
    path('ingredients/', get_ingredients, name='get_ingredients'),
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
