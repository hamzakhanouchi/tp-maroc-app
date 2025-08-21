from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjetViewSet, RapportViewSet, ReclamationViewSet, UserViewSet,
    login_view, logout_view, current_user, projets_publics
)

router = DefaultRouter()
router.register(r'projets', ProjetViewSet)
router.register(r'rapports', RapportViewSet)
router.register(r'reclamations', ReclamationViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/user/', current_user, name='current_user'),
    # Endpoint public pour les projets
    path('projets-publics/', projets_publics, name='projets_publics'),
]
