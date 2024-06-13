from django.contrib import admin
from django.urls import path, include  
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('recettes.urls')),  # Routes pour l'application recettes
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Route pour obtenir le token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Route pour rafraîchir le token
]
