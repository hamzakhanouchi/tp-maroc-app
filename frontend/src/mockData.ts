// Données simulées pour les tests
export const mockProjets = [
  {
    id: '1',
    titre: 'Réfection de la Route Nationale 1',
    description: 'Travaux de rénovation complète de la RN1 sur 50km',
    localisation: 'Casablanca - Rabat',
    statut: 'en_cours',
    technicien_id: '2',
    date_creation: '2024-01-15'
  },
  {
    id: '2',
    titre: 'Construction du Pont Hassan II',
    description: 'Nouveau pont pour désengorger le trafic urbain',
    localisation: 'Casablanca Centre',
    statut: 'en_cours',
    technicien_id: '2',
    date_creation: '2024-02-01'
  },
  {
    id: '3',
    titre: 'Aménagement Place Mohammed V',
    description: 'Rénovation et modernisation de la place centrale',
    localisation: 'Rabat',
    statut: 'terminé',
    technicien_id: '3',
    date_creation: '2024-01-01'
  },
  {
    id: '4',
    titre: 'Extension du Réseau Tramway',
    description: 'Nouvelle ligne de tramway vers la périphérie',
    localisation: 'Casablanca',
    statut: 'en_attente',
    technicien_id: null,
    date_creation: '2024-03-10'
  }
];

export const mockTechniciens = [
  {
    id: '2',
    username: 'technicien',
    email: 'technicien@example.com',
    role: 'technicien'
  },
  {
    id: '3',
    username: 'tech2',
    email: 'tech2@example.com',
    role: 'technicien'
  }
];

export const mockRapports = [
  {
    id: '1',
    projet_id: '1',
    pourcentage_avancement: 35,
    commentaire: 'Début des travaux de terrassement. Équipes mobilisées.',
    date_rapport: '2024-01-20',
    technicien_id: '2'
  },
  {
    id: '2',
    projet_id: '1',
    pourcentage_avancement: 50,
    commentaire: 'Pose de la couche de base terminée. Prochaine étape: asphalte.',
    date_rapport: '2024-02-15',
    technicien_id: '2'
  },
  {
    id: '3',
    projet_id: '2',
    pourcentage_avancement: 25,
    commentaire: 'Fondations en cours. Météo favorable.',
    date_rapport: '2024-02-10',
    technicien_id: '2'
  },
  {
    id: '4',
    projet_id: '3',
    pourcentage_avancement: 100,
    commentaire: 'Projet terminé avec succès. Inauguration prévue.',
    date_rapport: '2024-03-01',
    technicien_id: '3'
  }
];

export const mockReclamations = [
  {
    id: '1',
    projet_id: '1',
    titre: 'Retard dans la livraison des matériaux',
    description: 'Les matériaux de construction sont en retard de 3 jours',
    priorite: 'haute',
    statut: 'en_cours',
    date_creation: '2024-02-20',
    technicien_id: '2'
  },
  {
    id: '2',
    projet_id: '2',
    titre: 'Problème de coordination avec les services municipaux',
    description: 'Difficultés pour obtenir les autorisations de fermeture de voies',
    priorite: 'normale',
    statut: 'résolue',
    date_creation: '2024-02-15',
    technicien_id: '2'
  }
];
