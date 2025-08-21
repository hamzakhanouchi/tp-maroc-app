from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Projet, Rapport, Reclamation, Role

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']
    
    def get_role(self, obj):
        try:
            role_obj = Role.objects.get(user=obj)
            return role_obj.role
        except Role.DoesNotExist:
            return 'admin' if obj.is_superuser else 'technicien'

class RapportSerializer(serializers.ModelSerializer):
    technicien = UserSerializer(read_only=True)
    
    class Meta:
        model = Rapport
        fields = ['id', 'projet', 'technicien', 'pourcentage_avancement', 'commentaire', 'date_rapport']

class ProjetSerializer(serializers.ModelSerializer):
    technicien = UserSerializer(read_only=True)
    technicien_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),  # Permettre tous les utilisateurs
        source='technicien', write_only=True, required=False
    )
    rapports = RapportSerializer(many=True, read_only=True)
    
    class Meta:
        model = Projet
        fields = [
            'id', 'titre', 'description', 'date_debut', 'date_fin_prevue', 
            'statut', 'localisation', 'budget', 'avancement', 'technicien', 
            'technicien_id', 'date_creation', 'date_modification', 'rapports'
        ]

class ReclamationSerializer(serializers.ModelSerializer):
    technicien = UserSerializer(read_only=True)
    projet = ProjetSerializer(read_only=True)
    
    class Meta:
        model = Reclamation
        fields = ['id', 'projet', 'technicien', 'titre', 'description', 'priorite', 'date_reclamation']
        read_only_fields = ['technicien', 'date_reclamation']
    
    def create(self, validated_data):
        """Créer une réclamation avec gestion du projet"""
        # Extraire l'ID du projet du contexte
        request = self.context.get('request')
        if request and 'projet' in request.data:
            try:
                projet_id = int(request.data['projet'])
                projet = Projet.objects.get(id=projet_id)
                validated_data['projet'] = projet
            except (ValueError, Projet.DoesNotExist):
                raise serializers.ValidationError({
                    'projet': f"Projet avec l'ID {request.data['projet']} n'existe pas"
                })
        
        return super().create(validated_data)
