import axios from 'axios';

// Configuration de base d'Axios
const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Pour inclure les cookies de session
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types TypeScript
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Projet {
  id: number;
  titre: string;
  description: string;
  date_debut?: string;
  date_fin_prevue?: string;
  statut: string;
  localisation: string;
  budget?: number;
  avancement: number;
  technicien?: User;
  technicien_id?: number;
  date_creation?: string;
  date_modification?: string;
}

export interface Rapport {
  id: number;
  projet: number;
  technicien: User;
  pourcentage_avancement?: number;  // Rendu optionnel
  commentaire: string;
  date_rapport: string;
}

export interface Reclamation {
  id: number;
  projet: number;
  technicien: User;
  titre: string;
  description: string;
  priorite: string;
  date_reclamation: string;
}

// Services d'authentification
export const authService = {
  async login(username: string, password: string): Promise<User> {
    const response = await api.post('/auth/login/', { username, password });
    return response.data.user;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout/');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/user/');
    return response.data.user;
  },
};

// Services pour les projets
export const projetService = {
  async getAll(): Promise<Projet[]> {
    const response = await api.get('/projets/');
    return response.data;
  },

  async getById(id: number): Promise<Projet> {
    const response = await api.get(`/projets/${id}/`);
    return response.data;
  },

  async create(projet: Partial<Projet>): Promise<Projet> {
    const response = await api.post('/projets/', projet);
    return response.data;
  },

  async update(id: number, projet: Partial<Projet>): Promise<Projet> {
    const response = await api.put(`/projets/${id}/`, projet);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/projets/${id}/`);
  },

  async assignTechnicien(projetId: number, technicienId: number): Promise<void> {
    await api.post(`/projets/${projetId}/assign_technicien/`, {
      technicien_id: technicienId,
    });
  },

  async getMesProjets(): Promise<Projet[]> {
    const response = await api.get('/projets/mes_projets/');
    return response.data;
  },

  // NOUVEAU: Service pour les projets publics (sans authentification)
  async getProjetsPublics(): Promise<Projet[]> {
    try {
      const response = await api.get('/projets-publics/');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets publics:', error);
      throw error;
    }
  },
};

// Services pour les rapports
export const rapportService = {
  async getAll(): Promise<Rapport[]> {
    const response = await api.get('/rapports/');
    return response.data;
  },

  async create(rapport: Partial<Rapport>): Promise<Rapport> {
    const response = await api.post('/rapports/', rapport);
    return response.data;
  },

  async getByProjet(projetId: number): Promise<Rapport[]> {
    const response = await api.get(`/rapports/?projet=${projetId}`);
    return response.data;
  },
};

// Services pour les réclamations
export const reclamationService = {
  async getAll(): Promise<Reclamation[]> {
    const response = await api.get('/reclamations/');
    return response.data;
  },

  async create(reclamation: Partial<Reclamation>): Promise<Reclamation> {
    const response = await api.post('/reclamations/', reclamation);
    return response.data;
  },

  async getByProjet(projetId: number): Promise<Reclamation[]> {
    const response = await api.get(`/reclamations/?projet=${projetId}`);
    return response.data;
  },

  async delete(reclamationId: number): Promise<void> {
    await api.delete(`/reclamations/${reclamationId}/`);
  },
};

// Services pour les utilisateurs
export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get('/users/');
    return response.data;
  },

  async getTechniciens(): Promise<User[]> {
    try {
      // Récupérer tous les utilisateurs et filtrer côté frontend
      const response = await api.get('/users/');
      const allUsers = response.data;
      
      // Filtrer pour ne garder que les techniciens
      const techniciens = allUsers.filter((user: User) => user.role === 'technicien');
      

      
      return techniciens;
    } catch (error) {
      console.error('Erreur getTechniciens:', error);
      throw error;
    }
  },

  async createTechnicien(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const response = await api.post('/users/create_technicien/', userData);
    return response.data;
  },

  async deleteTechnicien(userId: number): Promise<void> {
    await api.delete(`/users/${userId}/`);
  },
};
