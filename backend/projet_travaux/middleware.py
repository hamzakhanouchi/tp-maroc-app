from django.utils.deprecation import MiddlewareMixin

class DisableCSRFMiddleware(MiddlewareMixin):
    """Middleware pour désactiver CSRF sur les vues API"""
    
    def process_request(self, request):
        # Désactiver CSRF pour toutes les requêtes API
        if request.path.startswith('/api/'):
            setattr(request, '_dont_enforce_csrf_checks', True)
        return None
