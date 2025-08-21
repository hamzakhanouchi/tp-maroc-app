import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  LinearProgress,
  Container,
  Paper,
  Alert
} from '@mui/material';
import { projetService } from '../services/api';

interface Projet {
  id: number;
  titre: string;
  description: string;
  localisation: string;
  statut: string;
  avancement?: number;
  date_debut?: string;
  date_fin_prevue?: string;
  budget?: number;
  date_creation?: string;
  date_modification?: string;
}

const CitoyenProjets = () => {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    try {
      setLoading(true);
      setError(null);
      // Utiliser le service API pour récupérer les projets publics
      const projetsData = await projetService.getProjetsPublics();
      
      setProjets(projetsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      setError('Impossible de récupérer les projets. Veuillez réessayer plus tard.');
      setProjets([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'termine':
        return '#4CAF50';
      case 'en_cours':
        return '#FFA500';
      case 'en_attente':
        return '#2196F3';
      case 'suspendu':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'termine':
        return 'Terminé';
      case 'en_cours':
        return 'En cours';
      case 'en_attente':
        return 'En attente';
      case 'suspendu':
        return 'Suspendu';
      default:
        return statut;
    }
  };

  const formatBudget = (budget?: number) => {
    if (!budget) return 'Non spécifié';
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD'
    }).format(budget);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non spécifiée';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        minHeight: '100vh',
        py: 4
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <LinearProgress sx={{ width: '50%', height: 8, borderRadius: 4 }} />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        minHeight: '100vh',
        py: 4
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Impossible de charger les projets
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Veuillez vérifier votre connexion et réessayer
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header Section - Style XTRA */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          borderRadius: 3,
          p: 4,
          mb: 4,
          color: 'white'
        }}>
          <Typography 
            variant="h2" 
            fontWeight={800}
            gutterBottom
            align="center"
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.1
            }}
          >
            Projets de
            <br />
            <span style={{ color: '#FFA500' }}>Travaux Publics</span>
          </Typography>
          <Typography 
            variant="h5" 
            align="center"
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300
            }}
          >
            Suivez l'avancement des projets d'infrastructure dans votre région
          </Typography>
        </Box>

        {/* Statistiques générales - Style XTRA */}
        <Box sx={{ mb: 4 }}>
          <Paper 
            elevation={4} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              background: 'white',
              border: '2px solid rgba(255, 165, 0, 0.2)'
            }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#FFA500', fontWeight: 800 }}>
                    {projets.length}
                  </Typography>
                  <Typography variant="body2" color="#666">Total Projets</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#4CAF50', fontWeight: 800 }}>
                    {projets.filter(p => p.statut === 'termine').length}
                  </Typography>
                  <Typography variant="body2" color="#666">Terminés</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#FFA500', fontWeight: 800 }}>
                    {projets.filter(p => p.statut === 'en_cours').length}
                  </Typography>
                  <Typography variant="body2" color="#666">En Cours</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: '#2196F3', fontWeight: 800 }}>
                    {projets.filter(p => p.statut === 'en_attente').length}
                  </Typography>
                  <Typography variant="body2" color="#666">En Attente</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Liste des projets - Style XTRA */}
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 3, 
            color: '#1a1a1a', 
            fontWeight: 700,
            textAlign: 'center'
          }}
        >
          Liste des Projets
        </Typography>

        <Grid container spacing={3}>
          {projets.map((projet) => (
            <Grid item xs={12} md={6} lg={4} key={projet.id}>
              <Card 
                elevation={6} 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  background: 'white',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#FFA500',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 15px 35px rgba(255, 165, 0, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* En-tête de la carte */}
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#1a1a1a',
                        mb: 2
                      }}
                    >
                      {projet.titre}
                    </Typography>
                    <Chip 
                      label={getStatutLabel(projet.statut)}
                      sx={{ 
                        backgroundColor: getStatutColor(projet.statut),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                      size="medium"
                    />
                  </Box>

                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    color="#666" 
                    sx={{ 
                      mb: 3, 
                      flexGrow: 1,
                      lineHeight: 1.6
                    }}
                  >
                    {projet.description}
                  </Typography>

                  {/* Informations du projet */}
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Localisation :</strong> {projet.localisation}
                    </Typography>
                    
                    {projet.budget && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>💰 Budget :</strong> {formatBudget(projet.budget)}
                      </Typography>
                    )}

                    {projet.date_debut && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>📅 Début :</strong> {formatDate(projet.date_debut)}
                      </Typography>
                    )}

                    {projet.date_fin_prevue && (
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>🏁 Fin prévue :</strong> {formatDate(projet.date_fin_prevue)}
                      </Typography>
                    )}

                    
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Message si aucun projet */}
        {projets.length === 0 && (
          <Paper 
            elevation={4} 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              mt: 4,
              background: 'white',
              borderRadius: 3,
              border: '2px solid rgba(255, 165, 0, 0.2)'
            }}
          >
            <Typography variant="h6" color="#1a1a1a" sx={{ fontWeight: 600 }}>
              Aucun projet disponible pour le moment
            </Typography>
            <Typography variant="body2" color="#666" sx={{ mt: 1 }}>
              Les projets seront affichés ici dès qu'ils seront créés par l'administration
            </Typography>
          </Paper>
        )}

        {/* Pied de page informatif - Style XTRA */}
        <Paper 
          elevation={2} 
          sx={{ 
            mt: 4, 
            p: 3, 
            background: 'rgba(26, 26, 26, 0.05)',
            borderRadius: 3,
            border: '1px solid rgba(255, 165, 0, 0.2)'
          }}
        >
          <Typography variant="body2" color="#666" align="center">
            Cette page présente tous les projets de travaux publics en cours et planifiés.
            Les informations sont mises à jour régulièrement par les services municipaux.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default CitoyenProjets;
