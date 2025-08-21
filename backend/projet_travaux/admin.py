from django.contrib import admin
from .models import Role, Projet, Rapport, Reclamation
from django.contrib.auth.models import User

# Enregistrer les modèles dans l'interface d'administration
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')
    list_filter = ('role',)
    search_fields = ('user__username',)

@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ('titre', 'statut', 'localisation', 'technicien', 'avancement', 'date_creation')
    list_filter = ('statut', 'technicien')
    search_fields = ('titre', 'localisation')
    date_hierarchy = 'date_creation'

@admin.register(Rapport)
class RapportAdmin(admin.ModelAdmin):
    list_display = ('projet', 'technicien', 'pourcentage_avancement', 'date_rapport')
    list_filter = ('technicien', 'date_rapport')
    search_fields = ('projet__titre',)

@admin.register(Reclamation)
class ReclamationAdmin(admin.ModelAdmin):
    list_display = ('titre', 'projet', 'technicien', 'priorite', 'date_reclamation')
    list_filter = ('priorite', 'technicien')
    search_fields = ('titre', 'description')
