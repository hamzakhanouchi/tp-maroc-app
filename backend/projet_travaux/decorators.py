from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View

def csrf_exempt_api(view_class):
    """Décorateur pour désactiver CSRF sur les vues API"""
    return method_decorator(csrf_exempt, name='dispatch')(view_class)
