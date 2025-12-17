#  Application de Gestion des Travaux Publics

Application web moderne pour la gestion des projets de travaux publics au Maroc.

##  Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Material-UI** pour l'interface
- **Vite** pour le build
- **React Router** pour la navigation

### Backend
- **Django 5.2** avec Python 3.13
- **Django REST Framework** pour l'API
- **SQLite** pour la base de données
- **CORS** configuré pour le développement

##  Fonctionnalités

###  Gestion des Utilisateurs
- **Administrateurs** : Création et gestion des projets, assignation des techniciens
- **Techniciens** : Création de rapports et réclamations, suivi des projets assignés
- **Citoyens** : Consultation publique des projets et rapports

###  Gestion des Projets
- Création et modification de projets
- Suivi de l'avancement
- Gestion des budgets et échéances
- Assignation de techniciens

###  Rapports et Réclamations
- Système de rapports d'avancement
- Gestion des réclamations techniques
- Historique complet des interventions

##  Installation et Démarrage

### Prérequis
- Python 3.13+
- Node.js 18+
- npm ou yarn

### Backend (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

##  Accès

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:8000/api
- **Admin Django** : http://localhost:8000/admin

##  Comptes de Test

- **Admin** : `admin` / `admin123`
- **Technicien** : `tech1` / `tech123`

##  Interface

Interface moderne et responsive inspirée du design industriel, optimisée pour tous les appareils.

##  Développement

Application en développement actif. Toutes les fonctionnalités principales sont opérationnelles.

---

© 2024 Ministère des Travaux Publics - Royaume du Maroc
