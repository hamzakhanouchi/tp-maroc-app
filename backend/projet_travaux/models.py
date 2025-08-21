from django.db import models
from django.contrib.auth.models import User

class Role(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Administrateur'),
        ('technicien', 'Technicien'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Projet(models.Model):
    STATUT_CHOICES = [
        ('en_cours', 'En cours'),
        ('planifie', 'Planifié'),
        ('termine', 'Terminé'),
        ('suspendu', 'Suspendu'),
    ]
    
    titre = models.CharField(max_length=200)
    description = models.TextField()
    date_debut = models.DateField(null=True, blank=True)
    date_fin_prevue = models.DateField(null=True, blank=True)
    statut = models.CharField(max_length=50, choices=STATUT_CHOICES, default='en_cours')
    localisation = models.CharField(max_length=200)
    budget = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    avancement = models.PositiveIntegerField(default=0)  # Pourcentage d'avancement
    technicien = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='projets_assignes')
    date_creation = models.DateTimeField(null=True, blank=True)
    date_modification = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.titre

class Rapport(models.Model):
    projet = models.ForeignKey(Projet, on_delete=models.CASCADE, related_name='rapports')
    technicien = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rapports')
    pourcentage_avancement = models.PositiveIntegerField(null=True, blank=True)  # Rendu optionnel
    commentaire = models.TextField()
    date_rapport = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rapport {self.id} - {self.projet.titre}"

class Reclamation(models.Model):
    PRIORITE_CHOICES = [
        ('basse', 'Basse'),
        ('normale', 'Normale'),
        ('haute', 'Haute'),
        ('urgente', 'Urgente'),
    ]
    projet = models.ForeignKey(Projet, on_delete=models.CASCADE, related_name='reclamations')
    technicien = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reclamations')
    titre = models.CharField(max_length=200)
    description = models.TextField()
    priorite = models.CharField(max_length=20, choices=PRIORITE_CHOICES, default='normale')
    date_reclamation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reclamation {self.titre} - {self.projet.titre}"