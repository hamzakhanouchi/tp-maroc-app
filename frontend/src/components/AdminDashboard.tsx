import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Paper, Chip, Container } from '@mui/material';
import { userService, projetService, reclamationService, authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [projets, setProjets] = useState<any[]>([]);
  const [techniciens, setTechniciens] = useState<any[]>([]);
  const [reclamations, setReclamations] = useState<any[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openAddTechnicienDialog, setOpenAddTechnicienDialog] = useState(false);
  const [openAddProjetDialog, setOpenAddProjetDialog] = useState(false);
  const [selectedProjet, setSelectedProjet] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    titre: '',
    description: '',
    localisation: '',
    statut: 'en_cours'
  });
  const [newProjetForm, setNewProjetForm] = useState({
    titre: '',
    description: '',
    localisation: '',
    statut: 'en_cours',
    budget: '',
    date_debut: '',
    date_fin_prevue: ''
  });
  const [technicienForm, setTechnicienForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projetsData, techniciensData, reclamationsData] = await Promise.all([
        projetService.getAll(),
        userService.getTechniciens(),
        reclamationService.getAll()
      ]);
      
      setProjets(projetsData);
      setTechniciens(techniciensData);
      setReclamations(reclamationsData);
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setProjets([]);
      setTechniciens([]);
      setReclamations([]);
    }
  };

  const handleEdit = (projet: any) => {
    setSelectedProjet(projet);
    setEditForm({
      titre: projet.titre,
      description: projet.description,
      localisation: projet.localisation,
      statut: projet.statut
    });
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      await projetService.update(selectedProjet.id, editForm);
      await fetchData();
    setOpenEditDialog(false);
    alert('Projet modifié avec succès !');
      } catch (error: any) {
      alert(`Erreur lors de la modification: ${error.message || 'Erreur inconnue'}`);
    }
  };

  const handleDelete = async (projetId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await projetService.delete(projetId);
        await fetchData();
        alert('Projet supprimé avec succès !');
      } catch (error: any) {
        alert(`Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`);
      }
    }
  };

  const handleAssignTechnicien = async (technicienId: number) => {
    try {
      await projetService.assignTechnicien(selectedProjet.id, technicienId);
      await fetchData();
      setOpenAssignDialog(false);
      alert('Technicien assigné avec succès !');
    } catch (error: any) {
      alert(`Erreur lors de l'assignation: ${error.message || 'Erreur inconnue'}`);
    }
  };

  const handleAddProjet = async () => {
    try {
      const projetToCreate = {
        ...newProjetForm,
        budget: newProjetForm.budget ? Number(newProjetForm.budget) : undefined
      };
      await projetService.create(projetToCreate);
        await fetchData();
      setOpenAddProjetDialog(false);
        setNewProjetForm({
          titre: '',
          description: '',
          localisation: '',
          statut: 'en_cours',
          budget: '',
          date_debut: '',
          date_fin_prevue: ''
        });
      alert('Projet créé avec succès !');
    } catch (error: any) {
      alert(`Erreur lors de la création: ${error.message || 'Erreur inconnue'}`);
    }
  };

  const handleAddTechnicien = async () => {
    try {
      // Validation côté frontend
      if (!technicienForm.username || !technicienForm.email || !technicienForm.password) {
        alert('Tous les champs sont obligatoires');
        return;
      }
      
      if (technicienForm.username.length < 3) {
        alert('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        return;
      }
      
      if (technicienForm.password.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      
      await userService.createTechnicien(technicienForm);
      await fetchData();
      setOpenAddTechnicienDialog(false);
      setTechnicienForm({ username: '', email: '', password: '' });
      alert('Technicien créé avec succès !');
    } catch (error: any) {
      console.error('Erreur lors de la création du technicien:', error);
      
      // Afficher le message d'erreur du serveur si disponible
      if (error.response?.data?.error) {
        alert(`Erreur: ${error.response.data.error}`);
      } else if (error.response?.status === 403) {
        alert('Erreur: Vous n\'avez pas les permissions pour créer un technicien');
      } else if (error.response?.status === 400) {
        alert('Erreur: Données invalides. Vérifiez les informations saisies.');
      } else {
        alert('Erreur lors de la création du technicien. Vérifiez votre connexion.');
      }
    }
  };

  const handleDeleteTechnicien = async (technicienId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce technicien ?')) {
      try {
        await userService.deleteTechnicien(technicienId);
        await fetchData();
        alert('Technicien supprimé avec succès !');
      } catch (error: any) {
        alert(`Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`);
      }
    }
  };

  const handleDeleteReclamation = async (reclamationId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) {
      try {
        await reclamationService.delete(reclamationId);
        await fetchData();
        alert('Réclamation supprimée avec succès !');
      } catch (error: any) {
        alert(`Erreur lors de la suppression: ${error.message || 'Erreur inconnue'}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('currentUser');
      navigate('/login');
    } catch (error) {
      alert('Erreur lors de la déconnexion');
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_cours': return '#FFA500';
      case 'termine': return '#4CAF50';
      case 'planifie': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #232526 0%, #FFA50022 100%)',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="xl">
          {/* Header avec titre et bouton de déconnexion */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box sx={{ flex: 1 }} />
            <Button
              variant="contained"
              color="error"
              sx={{ 
                fontWeight: 700, 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem', 
                borderRadius: 3, 
                boxShadow: '0 4px 16px rgba(193, 39, 45, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(193, 39, 45, 0.4)'
                }
              }}
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
                    </Box>
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem', lg: '4.5rem' },
              fontWeight: 900,
              background: 'linear-gradient(135deg, #FFA500 0%, #232526 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              textShadow: '0 4px 8px rgba(0,0,0,0.1)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            Espace Administrateur
      </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#f3f4f6',
              mb: 6,
              maxWidth: '900px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Gérez tous les projets, techniciens et réclamations du Maroc.
      </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Statistiques rapides */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="#C1272D">{reclamations.length}</Typography>
            <Typography variant="body2">Réclamations</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="#006233">{projets.length}</Typography>
            <Typography variant="body2">Projets</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="#FFA500">{techniciens.length}</Typography>
            <Typography variant="body2">Techniciens</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="#8b5cf6">{projets.filter(p => p.statut === 'en_cours').length}</Typography>
            <Typography variant="body2">En Cours</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Réclamations */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#1a1a1a' }}>
          Réclamations ({reclamations.length})
        </Typography>
        
        {reclamations.length === 0 ? (
          <Typography color="#666" sx={{ textAlign: 'center', py: 4 }}>
            Aucune réclamation pour le moment
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {reclamations.map((reclamation) => (
              <Grid item xs={12} md={6} lg={4} key={reclamation.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {reclamation.titre}
                    </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 2 }}>
                      {reclamation.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={reclamation.priorite || 'normale'}
                        size="small"
                        sx={{ 
                          backgroundColor: reclamation.priorite === 'haute' ? '#F44336' : 
                                         reclamation.priorite === 'moyenne' ? '#FFA500' : '#4CAF50',
                          color: 'white'
                        }}
                      />
                      <Typography variant="caption" color="#666">
                        {reclamation.date_creation ? new Date(reclamation.date_creation).toLocaleDateString('fr-FR') : 'N/A'}
                      </Typography>
                    </Box>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="error" 
                      fullWidth
                      onClick={() => handleDeleteReclamation(reclamation.id)}
                    >
                      Supprimer
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Techniciens */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" color="#1a1a1a">
            Techniciens ({techniciens.length})
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpenAddTechnicienDialog(true)}
            sx={{ backgroundColor: '#C1272D' }}
        >
            + Ajouter
        </Button>
      </Box>

        {techniciens.length === 0 ? (
          <Typography color="#666" sx={{ textAlign: 'center', py: 4 }}>
            Aucun technicien pour le moment
          </Typography>
        ) : (
          <Grid container spacing={2}>
        {techniciens.map((technicien) => (
              <Grid item xs={12} sm={6} md={4} key={technicien?.id}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {technicien?.username}
                </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                      {technicien?.email}
                </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 2 }}>
                      Projets: {projets.filter(p => (p.technicien?.id === technicien?.id || p.technicien_id === technicien?.id)).length}
                </Typography>
                <Button 
                      size="small" 
                  variant="outlined" 
                  color="error" 
                  fullWidth
                      onClick={() => handleDeleteTechnicien(technicien?.id)}
                >
                      Supprimer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
        )}
      </Paper>

      {/* Projets */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" color="#1a1a1a">
            Projets ({projets.length})
          </Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpenAddProjetDialog(true)}
            sx={{ backgroundColor: '#006233' }}
        >
            + Ajouter
        </Button>
      </Box>
        
        {projets.length === 0 ? (
          <Typography color="#666" sx={{ textAlign: 'center', py: 4 }}>
            Aucun projet pour le moment
          </Typography>
        ) : (
      <Grid container spacing={2}>
        {projets.map((projet) => (
          <Grid item xs={12} md={6} lg={4} key={projet.id}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {projet.titre}
                    </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 2 }}>
                  {projet.description}
                </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Localisation: {projet.localisation}
                </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={projet.statut}
                        sx={{ 
                          backgroundColor: getStatusColor(projet.statut),
                          color: 'white'
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => handleEdit(projet)}
                      >
                    Modifier
                  </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => {
                          setSelectedProjet(projet);
                          setOpenAssignDialog(true);
                        }}
                      >
                    Assigner
                  </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error" 
                        onClick={() => handleDelete(projet.id)}
                      >
                    Supprimer
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
        )}
      </Paper>

      {/* Dialogs simplifiés */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier le projet</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titre"
            value={editForm.titre}
            onChange={(e) => setEditForm({...editForm, titre: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={editForm.description}
            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Localisation"
            value={editForm.localisation}
            onChange={(e) => setEditForm({...editForm, localisation: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Statut"
            value={editForm.statut}
            onChange={(e) => setEditForm({...editForm, statut: e.target.value})}
            margin="normal"
          >
            <MenuItem value="planifie">Planifié</MenuItem>
            <MenuItem value="en_cours">En cours</MenuItem>
            <MenuItem value="termine">Terminé</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Annuler</Button>
          <Button onClick={handleSaveEdit} variant="contained">Sauvegarder</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assigner un technicien</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Sélectionnez un technicien pour le projet: {selectedProjet?.titre}
          </Typography>
          <Grid container spacing={2}>
          {techniciens.map((technicien) => (
              <Grid item xs={12} sm={6} key={technicien?.id}>
            <Button
                  fullWidth
              variant="outlined"
                  onClick={() => handleAssignTechnicien(technicien?.id)}
                  sx={{ p: 2, textAlign: 'left' }}
                >
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {technicien?.username}
                    </Typography>
                    <Typography variant="caption" color="#666">
                      {technicien?.email}
                    </Typography>
                  </Box>
            </Button>
              </Grid>
          ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddTechnicienDialog} onClose={() => setOpenAddTechnicienDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un technicien</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="username-field"
            name="username"
            label="Nom d'utilisateur"
            value={technicienForm.username}
            onChange={(e) => setTechnicienForm({...technicienForm, username: e.target.value})}
            margin="normal"
            required
            autoComplete="username"
            error={technicienForm.username.length > 0 && technicienForm.username.length < 3}
            helperText={technicienForm.username.length > 0 && technicienForm.username.length < 3 ? 'Minimum 3 caractères' : ''}
          />
          <TextField
            fullWidth
            id="email-field"
            name="email"
            label="Email"
            type="email"
            value={technicienForm.email}
            onChange={(e) => setTechnicienForm({...technicienForm, email: e.target.value})}
            margin="normal"
            required
            autoComplete="email"
            error={technicienForm.email.length > 0 && !/\S+@\S+\.\S+/.test(technicienForm.email)}
            helperText={technicienForm.email.length > 0 && !/\S+@\S+\.\S+/.test(technicienForm.email) ? 'Email invalide' : ''}
          />
          <TextField
            fullWidth
            id="password-field"
            name="password"
            label="Mot de passe"
            type="password"
            value={technicienForm.password}
            onChange={(e) => setTechnicienForm({...technicienForm, password: e.target.value})}
            margin="normal"
            required
            autoComplete="new-password"
            error={technicienForm.password.length > 0 && technicienForm.password.length < 6}
            helperText={technicienForm.password.length > 0 && technicienForm.password.length < 6 ? 'Minimum 6 caractères' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTechnicienDialog(false)}>Annuler</Button>
          <Button onClick={handleAddTechnicien} variant="contained">Créer</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddProjetDialog} onClose={() => setOpenAddProjetDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter un projet</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre"
                value={newProjetForm.titre}
                onChange={(e) => setNewProjetForm({...newProjetForm, titre: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={newProjetForm.description}
                onChange={(e) => setNewProjetForm({...newProjetForm, description: e.target.value})}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Localisation"
                value={newProjetForm.localisation}
                onChange={(e) => setNewProjetForm({...newProjetForm, localisation: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Statut"
                value={newProjetForm.statut}
                onChange={(e) => setNewProjetForm({...newProjetForm, statut: e.target.value})}
                margin="normal"
              >
                <MenuItem value="planifie">Planifié</MenuItem>
                <MenuItem value="en_cours">En cours</MenuItem>
                <MenuItem value="termine">Terminé</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget (MAD)"
                type="number"
                value={newProjetForm.budget}
                onChange={(e) => setNewProjetForm({...newProjetForm, budget: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de début"
                type="date"
                value={newProjetForm.date_debut}
                onChange={(e) => setNewProjetForm({...newProjetForm, date_debut: e.target.value})}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de fin prévue"
                type="date"
                value={newProjetForm.date_fin_prevue}
                onChange={(e) => setNewProjetForm({...newProjetForm, date_fin_prevue: e.target.value})}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddProjetDialog(false)}>Annuler</Button>
          <Button onClick={handleAddProjet} variant="contained">Créer</Button>
        </DialogActions>
      </Dialog>
      </Container>
      {/* Footer moderne */}
      <Box sx={{
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        py: 6,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        mt: 8
      }}>
        <Container maxWidth="xl">
          <Typography variant="body1" align="center" sx={{ fontWeight: 500, opacity: 0.8 }}>
            © 2024 Ministère des Travaux Publics - Royaume du Maroc. Tous droits réservés.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
