from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    """Page d'accueil de l'API"""
    return JsonResponse({
        'message': 'API Système de Suivi des Travaux Publics',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'auth': '/api/auth/',
            'projets': '/api/projets/',
            'rapports': '/api/rapports/',
            'reclamations': '/api/reclamations/',
            'users': '/api/users/'
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),  # Page d'accueil
    path('admin/', admin.site.urls),
    path('api/', include('projet_travaux.urls')),
    path('api-auth/', include('rest_framework.urls')),
]