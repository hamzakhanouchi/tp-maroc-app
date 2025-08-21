import React, { useState } from 'react';
import { AppBar, Toolbar, Drawer, Button, Box, Typography, IconButton, List, ListItem, ListItemText, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

const ModernNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          borderBottom: '3px solid',
          borderImage: 'linear-gradient(90deg, transparent, #ffa500, #ffd700, #ffa500, transparent) 1',
          boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 8px 24px rgba(255, 165, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255, 165, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.06) 0%, transparent 50%)',
            pointerEvents: 'none'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 165, 0, 0.1), transparent)',
            animation: 'shimmer 3s infinite'
          }
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 1, md: 0 } }}>
            {/* Logo et titre */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                flexGrow: 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.02)' }
              }}
              onClick={() => handleNavigation('/')}
            >
              <Logo 
                size="large" 
                showText={true} 
                variant="horizontal" 
              />
            </Box>

            {/* Bouton menu mobile */}
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)',
                borderRadius: '16px',
                p: 2,
                color: 'white',
                boxShadow: '0 6px 24px rgba(255, 165, 0, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
                  transform: 'scale(1.1) rotate(5deg)',
                  boxShadow: '0 8px 32px rgba(255, 165, 0, 0.6)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Box sx={{ 
                width: 20, 
                height: 2, 
                background: 'white', 
                borderRadius: 1,
                position: 'relative',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'white',
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out'
                },
                '&::before': { top: -6 },
                '&::after': { top: 6 }
              }} />
            </IconButton>

            {/* Navigation desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/')}
                sx={{ 
                  background: isActive('/') ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  px: 5,
                  py: 2.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  border: isActive('/') ? '3px solid rgba(255, 165, 0, 0.7)' : '2px solid rgba(255, 255, 255, 0.15)',
                  color: isActive('/') ? '#ffa500' : 'white',
                  backdropFilter: 'blur(15px) saturate(180%)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isActive('/') ? '0 8px 32px rgba(255, 165, 0, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)' : '0 4px 16px rgba(0,0,0,0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 165, 0, 0.15), transparent)',
                    transition: 'left 0.6s ease-in-out'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '0%',
                    height: '0%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.4s ease-in-out'
                  },
                  '&:hover': { 
                    background: 'rgba(255, 165, 0, 0.15)',
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: '0 12px 40px rgba(255, 165, 0, 0.4), 0 6px 20px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
                    '&::before': { left: '100%' },
                    '&::after': { width: '200%', height: '200%' }
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Accueil
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/projets-publics')}
                sx={{ 
                  background: isActive('/projets-publics') ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  border: isActive('/projets-publics') ? '1px solid rgba(255, 165, 0, 0.5)' : '1px solid transparent',
                  color: isActive('/projets-publics') ? '#ffa500' : 'white',
                  '&:hover': { 
                    background: 'rgba(255, 165, 0, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(255, 165, 0, 0.2)'
                  },
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                Projets
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/about')}
                sx={{ 
                  background: isActive('/about') ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  border: isActive('/about') ? '1px solid rgba(255, 165, 0, 0.5)' : '1px solid transparent',
                  color: isActive('/about') ? '#ffa500' : 'white',
                  '&:hover': { 
                    background: 'rgba(255, 165, 0, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(255, 165, 0, 0.2)'
                  },
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                À propos
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/login')}
                sx={{ 
                  background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 30%, #ffd700 70%, #ffa500 100%)',
                  borderRadius: '25px',
                  px: 6,
                  py: 3,
                  fontWeight: 800,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(255, 165, 0, 0.5), inset 0 3px 6px rgba(255,255,255,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.8s ease-in-out'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '0%',
                    height: '0%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.5s ease-in-out'
                  },
                  '&:hover': { 
                    background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 30%, #ffd700 70%, #ff8c00 100%)',
                    transform: 'translateY(-6px) scale(1.08) rotate(2deg)',
                    boxShadow: '0 20px 60px rgba(255, 165, 0, 0.8), inset 0 4px 8px rgba(255,255,255,0.5), 0 0 0 2px rgba(255,255,255,0.2)',
                    '&::before': { left: '100%' },
                    '&::after': { width: '300%', height: '300%' }
                  },
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Se connecter
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ 
          '& .MuiDrawer-paper': { 
            width: 320,
            background: '#1e293b',
            borderLeft: '1px solid rgba(255, 165, 0, 0.3)',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.3)'
          } 
        }}
      >
        <Box sx={{ 
          p: 3,
          background: 'linear-gradient(135deg, #ffa500 0%, #ff8c00 100%)',
          color: 'white',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 800, textAlign: 'center' }}>
            Menu Navigation
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.9 }}>
            TP MAROC
          </Typography>
        </Box>
        
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              color: '#ffa500', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              '&::after': {
                content: '""',
                flex: 1,
                height: '2px',
                background: '#ffa500',
                ml: 2,
                borderRadius: '1px'
              }
            }}>
              NAVIGATION
            </Typography>
            
            <List sx={{ pt: 0 }}>
              <ListItem 
                button 
                onClick={() => handleNavigation('/')}
                sx={{ 
                  borderRadius: '12px',
                  mb: 1,
                  background: isActive('/') ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 165, 0, 0.2)',
                  '&:hover': { 
                    background: 'rgba(255, 165, 0, 0.1)',
                    transform: 'translateX(5px)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemText 
                  primary="Accueil" 
                  sx={{ 
                    color: isActive('/') ? '#ffa500' : 'white',
                    fontWeight: isActive('/') ? 700 : 500,
                    '& .MuiTypography-root': { fontSize: '1.1rem' }
                  }}
                />
              </ListItem>
              
              <ListItem 
                button 
                onClick={() => handleNavigation('/projets-publics')}
                sx={{ 
                  borderRadius: '12px',
                  mb: 1,
                  background: isActive('/projets-publics') ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 165, 0, 0.2)',
                  '&:hover': { 
                    background: 'rgba(255, 165, 0, 0.1)',
                    transform: 'translateX(5px)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemText 
                  primary="Projets" 
                  sx={{ 
                    color: isActive('/projets-publics') ? '#ffa500' : 'white',
                    fontWeight: isActive('/projets-publics') ? 700 : 500,
                    '& .MuiTypography-root': { fontSize: '1.1rem' }
                  }}
                />
              </ListItem>
              
              <ListItem 
                button 
                onClick={() => handleNavigation('/about')}
                sx={{ 
                  borderRadius: '12px',
                  mb: 1,
                  background: isActive('/about') ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 165, 0, 0.2)',
                  '&:hover': { 
                    background: 'rgba(255, 165, 0, 0.1)',
                    transform: 'translateX(5px)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemText 
                  primary="À propos" 
                  sx={{ 
                    color: isActive('/about') ? '#ffa500' : 'white',
                    fontWeight: isActive('/about') ? 700 : 500,
                    '& .MuiTypography-root': { fontSize: '1.1rem' }
                  }}
                />
              </ListItem>
            </List>
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              color: '#ffa500', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              '&::after': {
                content: '""',
                flex: 1,
                height: '2px',
                background: '#ffa500',
                ml: 2,
                borderRadius: '1px'
              }
            }}>
              CONNEXION
            </Typography>
            
            <Button 
              fullWidth
              onClick={() => handleNavigation('/login')}
              sx={{ 
                background: '#ffa500',
                borderRadius: '12px',
                py: 2,
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                textTransform: 'none',
                border: '2px solid #ffa500',
                '&:hover': { 
                  background: '#ff8c00',
                  borderColor: '#ff8c00',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(255, 165, 0, 0.4)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ModernNavigation;
