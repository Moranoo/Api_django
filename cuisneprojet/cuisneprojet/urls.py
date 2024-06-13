from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation for your project",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('recettes.urls')),  # Routes pour l'application recettes
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Route pour obtenir le token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Route pour rafraîchir le token
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
# pour le projet on n'a pas Protéger les Points de Terminaison Swagger
# mais voci le code pour le faire http://localhost:8000/swagger/
# schema_view = get_schema_view(
#     openapi.Info(
#         title="API Documentation",
#         default_version='v1',
#         description="API documentation for your project",
#         terms_of_service="https://www.google.com/policies/terms/",
#         contact=openapi.Contact(email="contact@example.com"),
#         license=openapi.License(name="BSD License"),
#     ),
#     public=True,
#     permission_classes=(permissions.IsAuthenticated,),
# )
