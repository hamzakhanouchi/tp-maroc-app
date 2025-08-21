import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, MenuItem, Paper, Container } from '@mui/material';
import { projetService, authService, rapportService, reclamationService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TechnicienDashboard = () => {
  const [mesProjets, setMesProjets] = useState<any[]>([]);
  const [openReclamationDialog, setOpenReclamationDialog] = useState(false);
  const [openRapportDialog, setOpenRapportDialog] = useState(false);
  const [selectedProjet, setSelectedProjet] = useState<any>(null);
  const [reclamationForm, setReclamationForm] = useState({
    titre: '',
    description: '',
    priorite: 'normale'
  });
  const [rapportForm, setRapportForm] = useState({
    commentaire: ''
  });
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchMesProjets();
    }
  }, [currentUserId]);

  const getCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response && response.id) {
        setCurrentUserId(response.id);
        console.log('TechnicienDashboard - Utilisateur connecté:', response);
      } else {
        console.log('TechnicienDashboard - Aucun utilisateur connecté');
        // Rediriger vers la page de connexion
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('TechnicienDashboard - Erreur lors de la récupération de l\'utilisateur:', error);
      // Rediriger vers la page de connexion
      window.location.href = '/login';
    }
  };

    const fetchMesProjets = async () => {
    try {
      console.log('fetchMesProjets - Chargement depuis l\'API...');
      
      // Charger tous les projets depuis l'API
      const tousProjets = await projetService.getAll();
      console.log('fetchMesProjets - Tous les projets:', tousProjets);
      
      // Filtrer les projets assignés au technicien connecté
      console.log('fetchMesProjets - Détails des projets pour filtrage:');
      tousProjets.forEach(p => {
        console.log(`  Projet ${p.id}: technicien=${p.technicien?.id ?? 'null'}, technicien_id=${p.technicien_id}`);
      });
      
      const projetsTechnicien = tousProjets.filter(p => p.technicien?.id === currentUserId);
      console.log('fetchMesProjets - Projets du technicien:', projetsTechnicien);
      
      // Récupérer les rapports pour chaque projet
      const projetsAvecRapports = await Promise.all(
        projetsTechnicien.map(async (projet) => {
          try {
            const rapports = await rapportService.getByProjet(projet.id);
            console.log(`Rapports pour le projet ${projet.id}:`, rapports);
            return {
              ...projet,
              rapports: rapports || []
            };
          } catch (error) {
            console.log(`Pas de rapports pour le projet ${projet.id}:`, error);
            return {
              ...projet,
              rapports: []
            };
          }
        })
      );
      
      console.log('Projets avec rapports:', projetsAvecRapports);
      setMesProjets(projetsAvecRapports);
      
    } catch (error) {
      console.error('❌ fetchMesProjets - Erreur lors du chargement:', error);
      // En cas d'erreur, on garde un tableau vide
      setMesProjets([]);
    }
  };

  const handleReclamation = (projet: any) => {
    setSelectedProjet(projet);
    setOpenReclamationDialog(true);
  };

  const handleRapport = (projet: any) => {
    setSelectedProjet(projet);
    setOpenRapportDialog(true);
  };

  const submitReclamation = async () => {
    // Validation côté frontend
    if (!reclamationForm.titre.trim()) {
      alert('Le titre de la réclamation est obligatoire');
      return;
    }
    
    if (!reclamationForm.description.trim()) {
      alert('La description de la réclamation est obligatoire');
      return;
    }
    
    if (!selectedProjet || !selectedProjet.id) {
      alert('Aucun projet sélectionné');
      return;
    }
    
    try {
      // Appeler l'API pour créer la réclamation
      await reclamationService.create({
        projet: selectedProjet.id,
        titre: reclamationForm.titre,
        description: reclamationForm.description,
        priorite: reclamationForm.priorite
      });
      
      // Recharger les projets pour afficher la nouvelle réclamation
      await fetchMesProjets();
      
      setOpenReclamationDialog(false);
      setReclamationForm({ titre: '', description: '', priorite: 'normale' });
      alert('Réclamation envoyée avec succès et sauvegardée en base de données !');
      
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'envoi de la réclamation:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Erreur inconnue';
      alert('Erreur lors de l\'envoi de la réclamation: ' + errorMessage);
    }
  };

  const submitRapport = async () => {
    // Validation côté frontend
    if (!rapportForm.commentaire.trim()) {
      alert('Le commentaire du rapport est obligatoire');
      return;
    }
    
    if (!selectedProjet || !selectedProjet.id) {
      alert('Aucun projet sélectionné');
      return;
    }
    
    try {
      const rapportData = {
        projet: selectedProjet.id,
        commentaire: rapportForm.commentaire,
        pourcentage_avancement: undefined  // Ajouté pour compatibilité backend
      };
      
      await rapportService.create(rapportData);
      
      await fetchMesProjets();
      setOpenRapportDialog(false);
      setRapportForm({ commentaire: '' });
      alert('Rapport ajouté avec succès et sauvegardé en base de données !');
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'ajout du rapport:', error);
      console.error('❌ Détails de l\'erreur:', error.response?.data);
      console.error('❌ Status de l\'erreur:', error.response?.status);
      const errorMessage = error.response?.data?.error || error.message || 'Erreur inconnue';
      alert('Erreur lors de l\'ajout du rapport: ' + errorMessage);
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'en_cours': return '#FFA500';
      case 'termine': return '#4CAF50';
      case 'en_attente': return '#2196F3';
      case 'suspendu': return '#F44336';
      default: return '#666';
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
        Espace Technicien
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
            Suivez et rapportez l'avancement de vos projets assignés.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Statistiques - Style XTRA */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={6}
              sx={{ 
                borderRadius: 2,
                border: '2px solid #FFA500',
                background: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 35px rgba(255, 165, 0, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ color: '#FFA500', fontWeight: 800, mb: 1 }}>
                  {mesProjets.length}
                </Typography>
                <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                  Projets Assignés
      </Typography>
            </CardContent>
          </Card>
        </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={6}
              sx={{ 
                borderRadius: 2,
                border: '2px solid #2d2d2d',
                background: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 35px rgba(45, 45, 45, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ color: '#2d2d2d', fontWeight: 800, mb: 1 }}>
                {mesProjets.filter(p => p.statut === 'en_cours').length}
              </Typography>
                <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                  En Cours
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={6}
              sx={{ 
                borderRadius: 2,
                border: '2px solid #1a1a1a',
                background: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 35px rgba(26, 26, 26, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ color: '#1a1a1a', fontWeight: 800, mb: 1 }}>
                  {mesProjets.filter(p => p.statut === 'termine').length}
                </Typography>
                <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                  Terminés
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={6}
              sx={{ 
                borderRadius: 2,
                border: '2px solid #FFA500',
                background: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 35px rgba(255, 165, 0, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ color: '#FFA500', fontWeight: 800, mb: 1 }}>
                  {mesProjets.filter(p => p.statut === 'en_attente').length}
                </Typography>
                <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                  En Attente
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

        {/* Mes projets - Style XTRA */}
        <Paper 
          elevation={4} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'white'
          }}
        >
          <Typography 
            variant="h3" 
            color="#1a1a1a" 
            fontWeight={700}
            gutterBottom
            sx={{ mb: 4 }}
          >
            Mes Projets Assignés
          </Typography>
          
          {mesProjets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="#666" sx={{ mb: 2 }}>
                Aucun projet assigné pour le moment
              </Typography>
              <Typography variant="body1" color="#999">
                Contactez votre administrateur pour qu'il vous assigne des projets
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
        {mesProjets.map((projet) => (
          <Grid item xs={12} md={6} lg={4} key={projet.id}>
                <Card 
                  elevation={4}
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#FFA500',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 15px 35px rgba(255, 165, 0, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      color="#1a1a1a" 
                      gutterBottom 
                      sx={{ fontWeight: 700, mb: 2 }}
                    >
                      {projet.titre}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="#666" 
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                  {projet.description}
                </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                  <strong>Localisation :</strong> {projet.localisation}
                </Typography>
                    <Box sx={{ mb: 3 }}>
                <Chip 
                  label={projet.statut} 
                        sx={{ 
                          backgroundColor: getStatutColor(projet.statut),
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    
                    {/* Affichage du pourcentage d'avancement */}
                    {projet.rapports && projet.rapports.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ mb: 1, fontWeight: 600, color: '#FFA500' }}
                        >
                          Dernier rapport : {projet.rapports[projet.rapports.length - 1].commentaire}
                        </Typography>
                      </Box>
                    )}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    size="medium"
                    variant="outlined"
                    onClick={() => handleReclamation(projet)}
                        sx={{ 
                          borderColor: '#2d2d2d',
                          color: '#2d2d2d',
                          '&:hover': { 
                            borderColor: '#1a1a1a',
                            backgroundColor: 'rgba(45, 45, 45, 0.1)'
                          }
                        }}
                  >
                    Réclamation
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => handleRapport(projet)}
                        sx={{ 
                          backgroundColor: '#FFA500',
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': { backgroundColor: '#E69500' }
                        }}
                  >
                    Rapport
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
          )}
        </Paper>

        {/* Dialog de réclamation - Style XTRA */}
      <Dialog open={openReclamationDialog} onClose={() => setOpenReclamationDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ 
            backgroundColor: '#1a1a1a', 
            color: 'white', 
            fontWeight: 700 
          }}>
            Envoyer une réclamation
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Projet: <strong>{selectedProjet?.titre}</strong>
          </Typography>
          <TextField
            id="reclamation-titre"
            fullWidth
            label="Titre de la réclamation"
            value={reclamationForm.titre}
            onChange={(e) => setReclamationForm({...reclamationForm, titre: e.target.value})}
            margin="normal"
            required
          />
          <TextField
            id="reclamation-description"
            fullWidth
            label="Description"
            value={reclamationForm.description}
            onChange={(e) => setReclamationForm({...reclamationForm, description: e.target.value})}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            id="reclamation-priorite"
            fullWidth
            select
            label="Priorité"
            value={reclamationForm.priorite}
            onChange={(e) => setReclamationForm({...reclamationForm, priorite: e.target.value})}
            margin="normal"
          >
            <MenuItem value="basse">Basse</MenuItem>
            <MenuItem value="normale">Normale</MenuItem>
            <MenuItem value="haute">Haute</MenuItem>
            <MenuItem value="urgente">Urgente</MenuItem>
          </TextField>
        </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setOpenReclamationDialog(false)}
              sx={{ color: '#666' }}
            >
              Annuler
            </Button>
            <Button 
              onClick={submitReclamation} 
              variant="contained"
              sx={{ 
                backgroundColor: '#FFA500',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#E69500' }
              }}
            >
              Envoyer
            </Button>
        </DialogActions>
      </Dialog>

        {/* Dialog de rapport - Style XTRA */}
      <Dialog open={openRapportDialog} onClose={() => setOpenRapportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          backgroundColor: '#1a1a1a', 
          color: 'white', 
          fontWeight: 700 
        }}>
          Ajouter un rapport
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Projet: <strong>{selectedProjet?.titre}</strong>
          </Typography>
          <TextField
            id="rapport-commentaire"
            fullWidth
            label="Rédigez votre rapport ici"
            value={rapportForm.commentaire}
            onChange={(e) => setRapportForm({ commentaire: e.target.value })}
            margin="normal"
            multiline
            rows={6}
            required
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenRapportDialog(false)} sx={{ color: '#666' }}>
            Annuler
          </Button>
          <Button onClick={submitRapport} variant="contained" sx={{ backgroundColor: '#FFA500', fontWeight: 600, '&:hover': { backgroundColor: '#E69500' } }}>
            Ajouter
          </Button>
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

export default TechnicienDashboard;


