import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import ProjetList from './components/ProjetList';
import AddProjet from './components/AddProjet';
import AddRapport from './components/AddRapport';

import ModernHome from './components/ModernHomeNew';
import About from './components/About';
import AdminDashboard from './components/AdminDashboard';
import TechnicienDashboard from './components/TechnicienDashboard';

import ProjetRapportsCitoyen from './components/ProjetRapportsCitoyen';
import { authService, projetService, rapportService } from './services/api';

import './App.css';

import ModernHeader from './components/ModernHeader';

// Données de projets par défaut
const defaultProjets = [
  {
    id: 1,
    titre: 'Rénovation Route Principale',
    description: 'Rénovation complète de la route principale du centre-ville',
    localisation: 'Centre-ville',
    statut: 'en_cours',
    avancement: 65,
    date_debut: '2024-01-15',
    date_fin_prevue: '2024-06-30',
    budget: 2500000,
    date_creation: '2024-01-10',
    date_modification: '2024-03-15'
  },
  {
    id: 2,
    titre: 'Construction Pont',
    description: 'Construction d\'un nouveau pont sur la rivière',
    localisation: 'Quartier Nord',
    statut: 'en_attente',
    avancement: 0,
    date_debut: '2024-07-01',
    date_fin_prevue: '2025-03-31',
    budget: 5000000,
    date_creation: '2024-02-20',
    date_modification: '2024-02-20'
  },
  {
    id: 3,
    titre: 'Éclairage Public',
    description: 'Installation de nouveaux lampadaires LED',
    localisation: 'Toute la ville',
    statut: 'termine',
    avancement: 100,
    date_debut: '2023-09-01',
    date_fin_prevue: '2024-01-31',
    budget: 800000,
    date_creation: '2023-08-15',
    date_modification: '2024-01-31'
  }
];

function App() {
  const [, setUser] = useState<any>(null);
  const [projets, setProjets] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Charger les projets depuis l'API au démarrage
  useEffect(() => {
    loadProjetsFromAPI();
  }, []);

  // Fonction pour charger les projets depuis l'API
  const loadProjetsFromAPI = async () => {
    try {
      setIsLoading(true);
      // Essayer de charger depuis l'API
      const projetsFromAPI = await projetService.getAll();
      
      if (projetsFromAPI && Array.isArray(projetsFromAPI) && projetsFromAPI.length > 0) {
        setProjets(projetsFromAPI);
        // Sauvegarder dans le localStorage comme cache
        localStorage.setItem('projets', JSON.stringify(projetsFromAPI));
      } else {
        // Si l'API ne retourne rien, essayer le localStorage
        const savedProjets = localStorage.getItem('projets');
        if (savedProjets) {
          try {
            const parsedProjets = JSON.parse(savedProjets);
            setProjets(parsedProjets);

          } catch (error) {
            console.error('Erreur lors du parsing du localStorage:', error);
            setProjets(defaultProjets);
          }
        } else {
          setProjets(defaultProjets);

        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement depuis l\'API:', error);
      
      // Fallback vers le localStorage
      const savedProjets = localStorage.getItem('projets');
      if (savedProjets) {
        try {
          const parsedProjets = JSON.parse(savedProjets);
          setProjets(parsedProjets);

        } catch (error) {
          console.error('Erreur lors du parsing du localStorage:', error);
          setProjets(defaultProjets);
        }
      } else {
        setProjets(defaultProjets);

      }
    } finally {
      setIsLoading(false);
    }
  };

  // Sauvegarder les projets dans le localStorage à chaque modification
  useEffect(() => {
    if (projets.length > 0) {
      localStorage.setItem('projets', JSON.stringify(projets));
    }
  }, [projets]);

  // Fonctions de gestion des projets avec synchronisation API
  const addProjet = async (nouveauProjet: any) => {
    try {
      // Ajouter via l'API
      const projetCree = await projetService.create(nouveauProjet);
      
      // Mettre à jour l'état local
      setProjets(prev => [...prev, projetCree]);
      
      return projetCree;
    } catch (error) {
      console.error('Erreur lors de la création via l\'API:', error);
      
      // Fallback local
      const projetAvecId = {
        ...nouveauProjet,
        id: Date.now(),
        date_creation: new Date().toISOString().split('T')[0],
        date_modification: new Date().toISOString().split('T')[0]
      };
      
      setProjets(prev => [...prev, projetAvecId]);
      
      return projetAvecId;
    }
  };

  const updateProjet = async (id: number, updates: any) => {
    try {
      // Mettre à jour via l'API
      const projetMisAJour = await projetService.update(id, updates);
      
      // Mettre à jour l'état local
      setProjets(prev => prev.map(projet => 
        projet.id === id ? projetMisAJour : projet
      ));
      
      return projetMisAJour;
    } catch (error) {
      console.error('Erreur lors de la mise à jour via l\'API:', error);
      
      // Fallback local
      const projetMisAJour = {
        ...updates,
        id,
        date_modification: new Date().toISOString().split('T')[0]
      };
      
      setProjets(prev => prev.map(projet => 
        projet.id === id ? { ...projet, ...projetMisAJour } : projet
      ));
      
      return projetMisAJour;
    }
  };

  const deleteProjet = async (id: number) => {
    try {
      // Supprimer via l'API
      await projetService.delete(id);
      
      // Mettre à jour l'état local
      setProjets(prev => prev.filter(projet => projet.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression via l\'API:', error);
      
      // Fallback local
      setProjets(prev => prev.filter(projet => projet.id !== id));
    }
  };

  const addRapport = async (projetId: number, rapport: any) => {
    try {
      // Ajouter le rapport via l'API
      const rapportCree = await rapportService.create({
        ...rapport,
        projet: projetId
      });
      
      // Mettre à jour le projet avec le nouveau rapport
      setProjets(prev => prev.map(projet => {
        if (projet.id === projetId) {
          const rapports = projet.rapports || [];
          return {
            ...projet,
            rapports: [...rapports, rapportCree],
            date_modification: new Date().toISOString().split('T')[0]
          };
        }
        return projet;
      }));
      
      return rapportCree;
    } catch (error) {
      console.error('Erreur lors de la création du rapport via l\'API:', error);
      
      // Fallback local
      const rapportAvecId = {
        ...rapport,
        id: Date.now(),
        projet: projetId,
        date_rapport: new Date().toISOString().split('T')[0]
      };
      
      setProjets(prev => prev.map(projet => {
        if (projet.id === projetId) {
          const rapports = projet.rapports || [];
          return {
            ...projet,
            rapports: [...rapports, rapportAvecId],
            date_modification: new Date().toISOString().split('T')[0]
          };
        }
        return projet;
      }));
      
      return rapportAvecId;
    }
  };



  useEffect(() => {
    // Vérifier si l'utilisateur est connecté via l'API
    const checkAuthStatus = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response && response.id) {
          setUser(response);
        } else {
          // Nettoyer le localStorage si l'utilisateur n'est pas valide
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      } catch (error) {

        // Nettoyer le localStorage si l'API n'est pas disponible
        localStorage.removeItem('currentUser');
        setUser(null);
        // Ne pas rediriger automatiquement, laisser l'utilisateur sur la page d'accueil
      }
    };

    // Vérifier l'authentification au chargement
    checkAuthStatus();
  }, []);









  if (isLoading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Chargement des projets...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <ModernHeader />



      <main className="main-content">
        <Routes>
          <Route path="/" element={<ModernHome projets={projets} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/technicien" element={<TechnicienDashboard />} />
          <Route path="/projets-publics" element={
            <ProjetList 
              projets={projets}
              setProjets={setProjets}
              deleteProjet={deleteProjet}
              updateProjet={updateProjet}
            />
          } />
          <Route path="/projets/add" element={
            <AddProjet 
              addProjet={addProjet}
              navigate={navigate}
            />
          } />
          <Route path="/rapports/add" element={
            <AddRapport 
              projets={projets}
              addRapport={addRapport}
              navigate={navigate}
            />
          } />
          <Route path="/projets/:id/rapports" element={<ProjetRapportsCitoyen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
