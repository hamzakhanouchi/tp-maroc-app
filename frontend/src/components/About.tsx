import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent
} from '@mui/material';
import './About.css';

const About = () => {
  const features = [
    {
      title: 'Gestion Technique',
      subtitle: 'Expertise Professionnelle',
      description: 'Nos techniciens qualifiés assurent un suivi professionnel et précis de tous vos projets d\'infrastructure.'
    },
    {
      title: 'Transparence Totale',
      subtitle: 'Visibilité Complète',
      description: 'Accès transparent aux informations sur l\'avancement des projets d\'infrastructure dans votre région.'
    },
    {
      title: 'Administration Centralisée',
      subtitle: 'Gestion Sécurisée',
      description: 'Système centralisé et sécurisé pour la gestion complète des projets et des utilisateurs.'
    }
  ];

  const stats = [
    { number: '150+', label: 'Projets Gérés' },
    { number: '45+', label: 'Villes Couvertes' },
    { number: '1200+', label: 'Utilisateurs Actifs' },
    { number: '890+', label: 'Rapports Générés' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
      {/* Hero Section moderne */}
      <Box sx={{
        background: 'linear-gradient(135deg, #232526 0%, #FFA50022 100%)',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="lg">
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
            À propos de la plateforme
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
            Plateforme moderne de gestion des projets d'infrastructure au Maroc, pour la transparence et l'efficacité.
              </Typography>
        </Container>
      </Box>

      {/* Section Art Marocain */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        py: 10,
        position: 'relative'
      }}>
        <Container maxWidth="lg">
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

      {/* Section stats moderne */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 50%, #FFA500 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3rem' },
            textShadow: '0 4px 8px rgba(0,0,0,0.1)',
            letterSpacing: '-0.02em'
          }}
        >
          📊 Chiffres Clés
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
                  boxShadow: '0 32px 64px rgba(255, 165, 0, 0.2), 0 16px 32px rgba(0,0,0,0.1)',
                  '& .stat-circle': {
                    transform: 'scale(1.1) rotate(5deg)',
                    boxShadow: '0 16px 48px rgba(255, 165, 0, 0.6)'
                  }
                }
              }}>
                <Box 
                  className="stat-circle"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 4,
                    color: 'white',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    boxShadow: '0 12px 40px rgba(255, 165, 0, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                    border: '4px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2,1)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-8px',
                      left: '-8px',
                      right: '-8px',
                      bottom: '-8px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFA500 0%, transparent 70%)',
                      opacity: 0.2,
                      zIndex: -1
                    }
                  }}
                >
                  {stat.number}
                </Box>
                <Typography variant="h5" sx={{ 
                  color: '#1e293b',
                  fontWeight: 700,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #FFA500 0%, #1e293b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Section fonctionnalités moderne */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
                        sx={{ 
            textAlign: 'center',
            mb: 8,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FFA500 0%, #232526 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3rem' }
          }}
        >
          Nos Valeurs & Fonctionnalités
                      </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={6}
                      sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: '#FFA500',
                    boxShadow: '0 20px 40px rgba(255, 165, 0, 0.2)'
                  }
                }}
              >
                <CardContent sx={{ p: 5, textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={700} color="#1a1a1a" gutterBottom sx={{ mb: 2 }}>{feature.title}</Typography>
                  <Typography variant="h6" color="#FFA500" fontWeight={600} sx={{ mb: 3 }}>{feature.subtitle}</Typography>
                  <Typography variant="body1" color="#666" lineHeight={1.7} sx={{ fontSize: '1.1rem' }}>{feature.description}</Typography>
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

export default About;

