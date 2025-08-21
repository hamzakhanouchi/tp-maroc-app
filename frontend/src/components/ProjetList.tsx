import { Box, Card, CardContent, Typography, Button, Grid, Chip, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type ProjetListProps = {
  projets: any[];
  setProjets: (projets: any[]) => void;
  deleteProjet?: (id: number) => void;
  updateProjet?: (id: number, updates: any) => void;
};

const ProjetList = ({ projets, setProjets, deleteProjet, updateProjet }: ProjetListProps) => {
  const navigate = useNavigate();

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'en_cours': return '#FFA500';
      case 'termine': return '#4CAF50';
      case 'en_attente': return '#2196F3';
      case 'suspendu': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
      {/* Header Section moderne */}
      <Box sx={{
        background: 'linear-gradient(135deg, #232526 0%, #FFA50022 100%)',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="xl">
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
            Liste des Projets
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#f3f4f6',
              mb: 4,
              maxWidth: '900px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Découvrez tous les projets d'infrastructure du Maroc.
      </Typography>
          

        </Container>
      </Box>

      {/* Section Art Marocain */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        py: 10,
        position: 'relative'
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300
          }}>
            {/* Première image */}
            <Box sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 400,
              height: 300,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '3px solid rgba(255, 165, 0, 0.2)',
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
                borderColor: 'rgba(255, 165, 0, 0.4)'
              }
            }}>
              <img 
                src="/art.jpg" 
                alt="Art et Culture Marocaine 1" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            {/* Deuxième image */}
            <Box sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 400,
              height: 300,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '3px solid rgba(255, 165, 0, 0.2)',
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
                borderColor: 'rgba(255, 165, 0, 0.4)'
              }
            }}>
              <img 
                src="/art.jpg" 
                alt="Art et Culture Marocaine 2" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            {/* Troisième image */}
            <Box sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 400,
              height: 300,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '3px solid rgba(255, 165, 0, 0.2)',
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
                borderColor: 'rgba(255, 165, 0, 0.4)'
              }
            }}>
              <img 
                src="/art.jpg" 
                alt="Art et Culture Marocaine 3" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Statistiques moderne */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              textAlign: 'center',
              p: 5,
              borderRadius: '24px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '24px',
                padding: '2px',
                background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0.3
              },
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 32px 64px rgba(255, 165, 0, 0.2), 0 16px 32px rgba(0,0,0,0.1)'
              }
            }}>
              <Typography variant="h2" sx={{ 
                color: '#FFA500', 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3rem' },
                textShadow: '0 2px 8px rgba(255, 165, 0, 0.3)'
              }}>
                {projets.length}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#1e293b',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Total Projets
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              textAlign: 'center',
              p: 5,
              borderRadius: '24px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '24px',
                padding: '2px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0.3
              },
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 32px 64px rgba(76, 175, 80, 0.2), 0 16px 32px rgba(0,0,0,0.1)'
              }
            }}>
              <Typography variant="h2" sx={{ 
                color: '#4CAF50', 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3rem' },
                textShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
              }}>
                {projets.filter(p => p.statut === 'termine').length}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#1e293b',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Terminés
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              textAlign: 'center',
              p: 5,
              borderRadius: '24px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '24px',
                padding: '2px',
                background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0.3
              },
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 32px 64px rgba(255, 165, 0, 0.2), 0 16px 32px rgba(0,0,0,0.1)'
              }
            }}>
              <Typography variant="h2" sx={{ 
                color: '#FFA500', 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3rem' },
                textShadow: '0 2px 8px rgba(255, 165, 0, 0.3)'
              }}>
                {projets.filter(p => p.statut === 'en_cours').length}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#1e293b',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                En Cours
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              textAlign: 'center',
              p: 5,
              borderRadius: '24px',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '24px',
                padding: '2px',
                background: 'linear-gradient(135deg, #2196F3 0%, #1976d2 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0.3
              },
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 32px 64px rgba(33, 150, 243, 0.2), 0 16px 32px rgba(0,0,0,0.1)'
              }
            }}>
              <Typography variant="h2" sx={{ 
                color: '#2196F3', 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3rem' },
                textShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
              }}>
                {projets.filter(p => p.statut === 'en_attente').length}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: '#1e293b',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                En Attente
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Liste des projets moderne */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
        {(Array.isArray(projets) ? projets : []).map((projet: any) => (
          <Grid item xs={12} sm={6} md={4} key={projet.id}>
              <Card
                elevation={6}
                sx={{
                  borderRadius: '20px',
                  height: '100%',
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
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: '#1a1a1a', mb: 2 }}
                  >
                  {projet.titre}
                </Typography>
                  <Typography
                    variant="body2"
                    color="#666"
                    gutterBottom
                    sx={{ mb: 2, lineHeight: 1.6 }}
                  >
                  {projet.description}
                </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={projet.statut}
                      sx={{
                        backgroundColor: getStatutColor(projet.statut),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                      size="medium"
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                      <strong>Localisation :</strong> {projet.localisation}
                </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                      <strong>📅 Début :</strong> {projet.date_debut}
                </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                      <strong>Fin prévue :</strong> {projet.date_fin_prevue}
                </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                      mt: 2,
                      borderColor: '#FFA500',
                      color: '#FFA500',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#E69500',
                        backgroundColor: 'rgba(255, 165, 0, 0.1)'
                      }
                    }}
                    onClick={() => navigate(`/projets/${projet.id}/rapports`)}
                    fullWidth
                  >
                  Voir les rapports
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
            © 2024 Ministère de l'Intérieur - Royaume du Maroc. Tous droits réservés.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ProjetList;
