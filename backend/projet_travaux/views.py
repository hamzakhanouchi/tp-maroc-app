from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils import timezone
from .models import Projet, Rapport, Reclamation, Role
from .serializers import ProjetSerializer, RapportSerializer, ReclamationSerializer, UserSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_superuser:
            return True
        if view.action in ['list', 'retrieve']:
            return True
        return False

@method_decorator(csrf_exempt, name='dispatch')
class ProjetViewSet(viewsets.ModelViewSet):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer
    permission_classes = [permissions.AllowAny]  # Permettre l'accès public

    def get_permissions(self):
        """Permissions spécifiques selon l'action"""
        if self.action in ['list', 'retrieve']:
            # Lecture publique pour tous (citoyens, techniciens, admins)
            return [permissions.AllowAny()]
        elif self.action in ['destroy', 'update', 'partial_update']:
            # Seuls les admins peuvent modifier/supprimer
            return [permissions.IsAdminUser()]
        elif self.action in ['create', 'assign_technicien']:
            # Seuls les admins peuvent créer/assigner
            return [permissions.IsAdminUser()]
        else:
            # Par défaut, authentification requise
            return [permissions.IsAuthenticated()]

    def get_queryset(self):
        """Retourner tous les projets pour les admins, projets de l'utilisateur pour les techniciens"""
        if self.request.user.is_authenticated:
            # Vérifier le rôle de l'utilisateur
            try:
                role = Role.objects.get(user=self.request.user)
                if role.role == 'admin':
                    # Admin voit tous les projets
                    return Projet.objects.all()
                elif role.role == 'technicien':
                    # Technicien voit ses projets assignés
                    return Projet.objects.filter(technicien=self.request.user)
                else:
                    # Autres utilisateurs voient tous les projets
                    return Projet.objects.all()
            except Role.DoesNotExist:
                # Utilisateur sans rôle, voir tous les projets
                return Projet.objects.all()
        else:
            # Citoyens non connectés voient tous les projets
            return Projet.objects.all()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def assign_technicien(self, request, pk=None):
        """Assigner un technicien à un projet"""
        try:
            projet = self.get_object()
            technicien_id = request.data.get('technicien_id')
            
            if not technicien_id:
                return Response({'error': 'ID du technicien requis'}, status=400)
            
            # Vérifier que le technicien existe et a le bon rôle
            try:
                technicien = User.objects.get(pk=technicien_id)
                role = Role.objects.get(user=technicien)
                if role.role != 'technicien':
                    return Response({'error': 'L\'utilisateur doit être un technicien'}, status=400)
            except User.DoesNotExist:
                return Response({'error': 'Technicien non trouvé'}, status=400)
            except Role.DoesNotExist:
                return Response({'error': 'Rôle non défini pour ce technicien'}, status=400)
            
            # Assigner le technicien au projet
            projet.technicien = technicien
            projet.save()
            
            return Response({
                'status': 'success',
                'message': f'Technicien {technicien.username} assigné au projet {projet.titre}',
                'projet_id': projet.id,
                'technicien_id': technicien.id
            })
            
        except Exception as e:
            return Response({'error': f'Erreur lors de l\'assignation: {str(e)}'}, status=500)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def mes_projets(self, request):
        """Projets assignés au technicien connecté"""
        if request.user.is_authenticated:
            try:
                role = Role.objects.get(user=request.user)
                if role.role == 'technicien':
                    projets = Projet.objects.filter(technicien=request.user)
                    serializer = self.get_serializer(projets, many=True)
                    return Response(serializer.data)
            except Role.DoesNotExist:
                pass
        return Response([])

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def tous_projets(self, request):
        """Action pour récupérer tous les projets (admin uniquement)"""
        try:
            role = Role.objects.get(user=request.user)
            if role.role == 'admin':
                projets = Projet.objects.all()
                serializer = self.get_serializer(projets, many=True)
                return Response(serializer.data)
            else:
                return Response({'error': 'Accès non autorisé'}, status=403)
        except Role.DoesNotExist:
            return Response({'error': 'Rôle non défini'}, status=400)

    def create(self, request, *args, **kwargs):
        """Créer un nouveau projet avec validation"""
        try:
            # Vérifier que l'utilisateur est admin
            if not request.user.is_authenticated:
                return Response({'error': 'Authentification requise'}, status=401)
            
            try:
                role = Role.objects.get(user=request.user)
                if role.role != 'admin':
                    return Response({'error': 'Seuls les administrateurs peuvent créer des projets'}, status=403)
            except Role.DoesNotExist:
                if not request.user.is_superuser:
                    return Response({'error': 'Rôle non défini'}, status=403)
            
            # Valider les données
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # Ajouter les dates automatiquement
                projet = serializer.save(
                    date_creation=timezone.now(),
                    date_modification=timezone.now()
                )
                return Response(serializer.data, status=201)
            else:
                return Response({
                    'error': 'Données invalides',
                    'details': serializer.errors
                }, status=400)
                
        except Exception as e:
            return Response({
                'error': f'Erreur lors de la création: {str(e)}'
            }, status=500)

    def perform_destroy(self, instance):
        """Logique personnalisée pour la suppression"""
        try:
            # Vérifier que l'utilisateur est admin
            if not self.request.user.is_superuser:
                role = Role.objects.get(user=self.request.user)
                if role.role != 'admin':
                    raise PermissionError("Seuls les administrateurs peuvent supprimer des projets")
            
            # Supprimer le projet
            instance.delete()
        except Role.DoesNotExist:
            raise PermissionError("Rôle non défini")
        except Exception as e:
            raise Exception(f"Erreur lors de la suppression: {str(e)}")

@method_decorator(csrf_exempt, name='dispatch')
class RapportViewSet(viewsets.ModelViewSet):
    queryset = Rapport.objects.all()
    serializer_class = RapportSerializer
    permission_classes = [permissions.AllowAny]  # Permettre l'accès public

    def get_permissions(self):
        """Permissions spécifiques selon l'action"""
        if self.action in ['list', 'retrieve']:
            # Lecture publique pour tous
            return [permissions.AllowAny()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Seuls les techniciens connectés peuvent créer/modifier
            return [permissions.IsAuthenticated()]
        else:
            return [permissions.IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        """Liste des rapports avec filtrage par projet"""
        queryset = self.get_queryset()
        
        # Filtrer par projet si le paramètre est fourni
        projet_id = request.query_params.get('projet')
        if projet_id:
            try:
                projet_id = int(projet_id)
                queryset = queryset.filter(projet_id=projet_id)
            except (ValueError, TypeError):
                return Response(
                    {'error': 'ID du projet doit être un nombre entier valide'}, 
                    status=400
                )
        
        # Filtrer par technicien si le paramètre est fourni
        technicien_id = request.query_params.get('technicien')
        if technicien_id:
            try:
                technicien_id = int(technicien_id)
                queryset = queryset.filter(technicien_id=technicien_id)
            except (ValueError, TypeError):
                return Response(
                    {'error': 'ID du technicien doit être un nombre entier valide'}, 
                    status=400
                )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """Récupérer un rapport spécifique par ID"""
        try:
            rapport = self.get_object()
            serializer = self.get_serializer(rapport)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': f'Rapport non trouvé: {str(e)}'}, 
                status=404
            )

    def create(self, request, *args, **kwargs):
        """Créer un nouveau rapport avec validation"""
        try:
            # Vérifier que l'utilisateur est connecté
            if not request.user.is_authenticated:
                return Response({'error': 'Authentification requise'}, status=401)
            
            # Vérifier que l'utilisateur est un technicien
            try:
                role = Role.objects.get(user=request.user)
                if role.role != 'technicien':
                    return Response({'error': 'Seuls les techniciens peuvent créer des rapports'}, status=403)
            except Role.DoesNotExist:
                return Response({'error': 'Rôle non défini'}, status=400)
            
            # Valider les données
            serializer = self.get_serializer(data=request.data)
            
            if serializer.is_valid():
                # Créer le rapport avec le technicien connecté
                rapport = serializer.save(technicien=request.user)
                return Response(serializer.data, status=201)
            else:
                return Response({
                    'error': 'Données invalides',
                    'details': serializer.errors
                }, status=400)
                
        except Exception as e:
            return Response({
                'error': f'Erreur lors de la création: {str(e)}'
            }, status=500)

    def perform_create(self, serializer):
        serializer.save(technicien=self.request.user)

@method_decorator(csrf_exempt, name='dispatch')
class ReclamationViewSet(viewsets.ModelViewSet):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Créer une nouvelle réclamation avec validation"""
        try:
            # Vérifier que l'utilisateur est connecté
            if not request.user.is_authenticated:
                return Response({'error': 'Authentification requise'}, status=401)
            
            # Vérifier que l'utilisateur est un technicien
            try:
                role = Role.objects.get(user=request.user)
                if role.role != 'technicien':
                    return Response({'error': 'Seuls les techniciens peuvent créer des réclamations'}, status=403)
            except Role.DoesNotExist:
                return Response({'error': 'Rôle non défini'}, status=400)
            
            # Debug: Afficher les données reçues
            print(f"Données reçues: {request.data}")
            print(f"Utilisateur connecté: {request.user.username}")
            
            # Utiliser la méthode standard de DRF
            return super().create(request, *args, **kwargs)
                
        except Exception as e:
            return Response({
                'error': f'Erreur lors de la création: {str(e)}'
            }, status=500)

    def perform_create(self, serializer):
        serializer.save(technicien=self.request.user)

    def perform_destroy(self, instance):
        """Logique personnalisée pour la suppression de réclamation"""
        try:
            # Vérifier que l'utilisateur est admin
            if not self.request.user.is_superuser:
                role = Role.objects.get(user=self.request.user)
                if role.role != 'admin':
                    raise PermissionError("Seuls les administrateurs peuvent supprimer des réclamations")
            
            # Supprimer la réclamation
            instance.delete()
        except Role.DoesNotExist:
            raise PermissionError("Rôle non défini")
        except Exception as e:
            raise Exception(f"Erreur lors de la suppression: {str(e)}")

@method_decorator(csrf_exempt, name='dispatch')
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        """Permissions spécifiques selon l'action"""
        if self.action in ['destroy', 'update', 'partial_update']:
            # Seuls les admins peuvent modifier/supprimer
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        role = self.request.query_params.get('role')
        if role == 'technicien':
            return User.objects.filter(groups__name='technicien')
        return super().get_queryset()
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def create_technicien(self, request):
        """Créer un nouveau compte technicien - Seuls les admins peuvent créer des techniciens"""
        # Vérifier que l'utilisateur est admin
        try:
            if not request.user.is_superuser:
                role = Role.objects.get(user=request.user)
                if role.role != 'admin':
                    return Response({'error': 'Seuls les administrateurs peuvent créer des techniciens'}, status=403)
        except Role.DoesNotExist:
            return Response({'error': 'Rôle non défini'}, status=403)
        
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not username or not email or not password:
            return Response({'error': 'Tous les champs sont requis'}, status=400)
        
        # Validation des données
        if len(username) < 3:
            return Response({'error': 'Le nom d\'utilisateur doit contenir au moins 3 caractères'}, status=400)
        
        if len(password) < 6:
            return Response({'error': 'Le mot de passe doit contenir au moins 6 caractères'}, status=400)
        
        try:
            # Vérifier si l'utilisateur existe déjà
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Ce nom d\'utilisateur existe déjà'}, status=400)
            
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Cet email existe déjà'}, status=400)
            
            # Créer l'utilisateur
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            
            # Créer le rôle
            Role.objects.create(user=user, role='technicien')
            
            serializer = UserSerializer(user)
            return Response({
                'message': 'Technicien créé avec succès',
                'user': serializer.data
            }, status=201)
        except Exception as e:
            return Response({'error': f'Erreur lors de la création: {str(e)}'}, status=400)
    


    def perform_destroy(self, instance):
        """Logique personnalisée pour la suppression d'utilisateur"""
        try:
            # Vérifier que l'utilisateur est admin
            if not self.request.user.is_superuser:
                role = Role.objects.get(user=self.request.user)
                if role.role != 'admin':
                    raise PermissionError("Seuls les administrateurs peuvent supprimer des utilisateurs")
            
            # Supprimer l'utilisateur
            instance.delete()
        except Role.DoesNotExist:
            raise PermissionError("Rôle non défini")
        except Exception as e:
            raise Exception(f"Erreur lors de la suppression: {str(e)}")

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@csrf_exempt
def login_view(request):
    """Vue pour l'authentification"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username et password requis'}, status=400)
    
    # Essayer d'abord avec le nom d'utilisateur
    user = authenticate(username=username, password=password)
    
    # Si échec, essayer avec l'email comme nom d'utilisateur
    if not user and '@' in username:
        try:
            user_by_email = User.objects.get(email=username)
            user = authenticate(username=user_by_email.username, password=password)
        except User.DoesNotExist:
            pass
    
    if user:
        login(request, user)
        
        # Récupérer le rôle de l'utilisateur
        try:
            role_obj = Role.objects.get(user=user)
            role = role_obj.role
        except Role.DoesNotExist:
            role = 'admin' if user.is_superuser else 'technicien'
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': role
            }
        })
    else:
        return Response({'error': 'Identifiants invalides'}, status=401)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
@csrf_exempt
def logout_view(request):
    """Vue pour la déconnexion"""
    logout(request)
    return Response({'message': 'Déconnexion réussie'})

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def current_user(request):
    """Récupérer les informations de l'utilisateur actuel"""
    if not request.user.is_authenticated:
        # Utilisateur non connecté (citoyen)
        return Response({
            'user': None,
            'message': 'Utilisateur non connecté'
        })
    
    try:
        role_obj = Role.objects.get(user=request.user)
        role = role_obj.role
    except Role.DoesNotExist:
        role = 'admin' if request.user.is_superuser else 'technicien'
    
    return Response({
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'role': role
        }
    })

# NOUVELLE VUE PUBLIQUE POUR LES PROJETS
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def projets_publics(request):
    """Vue publique pour récupérer tous les projets sans authentification"""
    try:
        projets = Projet.objects.all().order_by('-date_creation')
        serializer = ProjetSerializer(projets, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)