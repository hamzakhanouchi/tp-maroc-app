import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ModernHome = ({ projets }: { projets: any[] }) => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Projets Actifs', value: projets.filter(p => p.statut === 'en_cours').length, color: '#10b981' },
    { label: 'Projets Terminés', value: projets.filter(p => p.statut === 'termine').length, color: '#2563eb' },
    { label: 'Projets Planifiés', value: projets.filter(p => p.statut === 'planifie').length, color: '#f59e0b' },
    { label: 'Total Projets', value: projets.length, color: '#8b5cf6' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
      
      {/* Section Art Marocain entre Header et Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        py: 8,
        position: 'relative'
      }}>
        <Container maxWidth="xl">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 250
          }}>
            {/* Première image */}
            <Box sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 400,
              height: 250,
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
              height: 250,
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
              height: 250,
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

      {/* Hero Section moderne */}
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
            TP MAROC
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
            Découvrez les projets d'infrastructure qui transforment le Royaume du Maroc en une nation moderne et connectée
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            mb: 2
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/projets-publics')}
              sx={{
                background: 'linear-gradient(135deg, #FFA500 0%, #232526 100%)',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: '16px',
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(255, 165, 0, 0.3)',
                border: '2px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #232526 0%, #FFA500 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(255, 165, 0, 0.4)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Voir les Projets
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                border: '3px solid #FFA500',
                color: '#FFA500',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: '16px',
                textTransform: 'none',
                background: 'rgba(255, 165, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                '&:hover': { 
                  background: 'rgba(255, 165, 0, 0.1)',
                  borderColor: '#232526',
                  color: '#232526',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(255, 165, 0, 0.2)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Se connecter
            </Button>
          </Box>
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

      {/* Stats Section moderne */}
       <Container maxWidth="xl" sx={{ py: 8 }}>
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
                   background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                   WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                   WebkitMaskComposite: 'xor',
                   maskComposite: 'exclude',
                   opacity: 0.3
                 },
                 '&:hover': {
                   transform: 'translateY(-12px) scale(1.02)',
                   boxShadow: `0 32px 64px ${stat.color}20, 0 16px 32px rgba(0,0,0,0.1)`,
                   '& .stat-circle': {
                     transform: 'scale(1.1) rotate(5deg)',
                     boxShadow: `0 16px 48px ${stat.color}60`
                   }
                 }
               }}>
                 <Box 
                   className="stat-circle"
                   sx={{
                     width: 100,
                     height: 100,
                     borderRadius: '50%',
                     background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     mx: 'auto',
                     mb: 4,
                     color: 'white',
                     fontSize: '2.5rem',
                     fontWeight: 'bold',
                     boxShadow: `0 12px 40px ${stat.color}40, inset 0 2px 4px rgba(255,255,255,0.3)`,
                     border: '4px solid rgba(255,255,255,0.2)',
                     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                     position: 'relative',
                     '&::after': {
                       content: '""',
                       position: 'absolute',
                       top: '-8px',
                       left: '-8px',
                       right: '-8px',
                       bottom: '-8px',
                       borderRadius: '50%',
                       background: `linear-gradient(135deg, ${stat.color} 0%, transparent 70%)`,
                       opacity: 0.2,
                       zIndex: -1
                     }
                   }}
                 >
                   {stat.value}
                 </Box>
                 <Typography variant="h6" sx={{ 
                   color: '#1e293b',
                   fontWeight: 700,
                   fontSize: { xs: '1.1rem', md: '1.2rem' },
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px',
                   background: `linear-gradient(135deg, ${stat.color} 0%, #1e293b 100%)`,
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

      {/* Section Services et Avantages */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
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
          Nos Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{
              background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
              height: '100%',
              borderRadius: '20px',
              border: '1px solid #FFA50033',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px #FFA50022',
                borderColor: '#FFA500'
              }
            }}>
              <Box sx={{
                height: 120,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🏗️
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  color: '#1e293b',
                  mb: 3
                }}>
                  Infrastructure Routière
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#64748b', 
                  lineHeight: 1.6,
                  mb: 3
                }}>
                  Construction et rénovation des routes, autoroutes et ponts pour connecter le Maroc.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#10b981',
                  fontWeight: 600
                }}>
                  ✓ Projets en cours
                  <Box sx={{ ml: 'auto', fontSize: '0.9rem', opacity: 0.7 }}>
                    {projets.filter(p => p.statut === 'en_cours').length} actifs
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{
              background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
              height: '100%',
              borderRadius: '20px',
              border: '1px solid #FFA50033',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px #FFA50022',
                borderColor: '#FFA500'
              }
            }}>
              <Box sx={{
                height: 120,
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🚇
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  color: '#1e293b',
                  mb: 3
                }}>
                  Transport Public
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#64748b', 
                  lineHeight: 1.6,
                  mb: 3
                }}>
                  Développement des réseaux de transport en commun et des infrastructures urbaines.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#2563eb',
                  fontWeight: 600
                }}>
                  ✓ Planification avancée
                  <Box sx={{ ml: 'auto', fontSize: '0.9rem', opacity: 0.7 }}>
                    {projets.filter(p => p.statut === 'planifie').length} prévus
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{
              background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
              height: '100%',
              borderRadius: '20px',
              border: '1px solid #FFA50033',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px #FFA50022',
                borderColor: '#FFA500'
              }
            }}>
              <Box sx={{
                height: 120,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🌉
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  color: '#1e293b',
                  mb: 3
                }}>
                  Ouvrages d'Art
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#64748b', 
                  lineHeight: 1.6,
                  mb: 3
                }}>
                  Construction de ponts, tunnels et structures complexes pour moderniser le pays.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#f59e0b',
                  fontWeight: 600
                }}>
                  ✓ Expertise technique
                  <Box sx={{ ml: 'auto', fontSize: '0.9rem', opacity: 0.7 }}>
                    {projets.filter(p => p.statut === 'termine').length} terminés
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Section Engagement et Transparence */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '24px',
          p: 6,
          border: '2px solid #FFA50033',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
            borderRadius: '50%',
            opacity: 0.1
          }} />
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ 
                fontWeight: 800,
                color: '#1e293b',
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
                Engagement pour l'Excellence
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#475569', 
                lineHeight: 1.7,
                mb: 4,
                fontSize: '1.1rem'
              }}>
                                 Le Ministère de l'Intérieur s'engage à maintenir les plus hauts standards de qualité, 
                de sécurité et de durabilité dans tous nos projets d'infrastructure.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="Qualité Premium" sx={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  fontWeight: 600
                }} />
                <Chip label="Sécurité Maximale" sx={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  fontWeight: 600
                }} />
                <Chip label="Développement Durable" sx={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  fontWeight: 600
                }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
                borderRadius: '20px',
                p: 4,
                color: 'white',
                textAlign: 'center'
              }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  color: '#FFA500'
                }}>
                  Notre Mission
                </Typography>
                <Typography variant="body1" sx={{ 
                  opacity: 0.9,
                  lineHeight: 1.6,
                  mb: 3
                }}>
                  Transformer le Maroc en une nation moderne et connectée grâce à des infrastructures 
                  de classe mondiale qui améliorent la qualité de vie de tous les citoyens.
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  mt: 4
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 700 }}>
                      {projets.length}
                    </Typography>
                    <Typography variant="caption">Projets Total</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 700 }}>
                      {projets.filter(p => p.statut === 'en_cours').length}
                    </Typography>
                    <Typography variant="caption">En Cours</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#2563eb', fontWeight: 700 }}>
                      {projets.filter(p => p.statut === 'termine').length}
                    </Typography>
                    <Typography variant="caption">Terminés</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Footer moderne et complet */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        mt: 8
      }}>
        {/* Éléments décoratifs */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FFA500 0%, #FFD700 50%, #FFA500 100%)'
        }} />
        
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Grid container spacing={6}>
            {/* Logo et description */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 4 }}>
                                 <Typography variant="h4" sx={{ 
                   fontWeight: 800,
                   background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                   backgroundClip: 'text',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   mb: 2
                 }}>
                   🏗️ TP MAROC
                 </Typography>
                                 <Typography variant="body1" sx={{ 
                   color: '#b0b0b0',
                   lineHeight: 1.6,
                   mb: 3
                 }}>
                   Ministère de l'Intérieur du Royaume du Maroc. 
                   Nous construisons l'avenir du Maroc avec des infrastructures modernes et durables.
                 </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}>
                    📧
                  </Box>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}>
                    📱
                  </Box>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' }
                  }}>
                    🌐
                  </Box>
                </Box>
              </Box>
            </Grid>

            

            {/* Informations */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                color: '#FFA500',
                mb: 3
              }}>
                Informations
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#FFA500' }
                }}>
                  Actualités
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#FFA500' }
                }}>
                  Communiqués
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#FFA500' }
                }}>
                  Publications
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#FFA500' }
                }}>
                  Rapports
                </Typography>
              </Box>
            </Grid>

            {/* Contact */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                color: '#FFA500',
                mb: 3
              }}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  📍 Rabat, Maroc
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  📧 contact@mtp.gov.ma
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  📱 +212 5 37 76 00 00
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#b0b0b0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  🕒 Lun-Ven: 8h-18h
                </Typography>
              </Box>
            </Grid>

                         {/* Statistiques */}
             <Grid item xs={12} sm={6} md={2}>
               <Typography variant="h6" sx={{ 
                 fontWeight: 700,
                 color: '#FFA500',
                 mb: 3
               }}>
                 Statistiques
               </Typography>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                 <Box sx={{ textAlign: 'center' }}>
                   <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 700 }}>
                     {projets.length}
                   </Typography>
                   <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                     Projets Total
                   </Typography>
                 </Box>
                 <Box sx={{ textAlign: 'center' }}>
                   <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 700 }}>
                     {projets.filter(p => p.statut === 'en_cours').length}
                   </Typography>
                   <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                     En Cours
                   </Typography>
                 </Box>
                 <Box sx={{ textAlign: 'center' }}>
                   <Typography variant="h5" sx={{ color: '#2563eb', fontWeight: 700 }}>
                     {projets.filter(p => p.statut === 'termine').length}
                   </Typography>
                   <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                     Terminés
                   </Typography>
                 </Box>
               </Box>
             </Grid>
          </Grid>

          {/* Séparateur */}
          <Box sx={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #FFA500 50%, transparent 100%)',
            my: 6
          }} />

          {/* Copyright et liens légaux */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" sx={{ 
              color: '#b0b0b0',
              textAlign: { xs: 'center', md: 'left' }
            }}>
                             © 2024 Ministère de l'Intérieur - Royaume du Maroc. Tous droits réservés.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ 
                color: '#b0b0b0',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#FFA500' }
              }}>
                Politique de confidentialité
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#b0b0b0',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#FFA500' }
              }}>
                Conditions d'utilisation
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#b0b0b0',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': { color: '#FFA500' }
              }}>
                Plan du site
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ModernHome;
