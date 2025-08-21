import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const ModernHeader = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        borderRadius: '0 0 24px 24px',
        mb: 4,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Logo size="medium" showText={true} variant="horizontal" />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')} sx={{
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            background: 'rgba(255,255,255,0.04)',
            transition: 'all 0.2s',
            '&:hover': {
              background: '#FFA500',
              color: '#232526',
              boxShadow: '0 2px 12px #FFA50044'
            }
          }}>
            Accueil
          </Button>
          <Button color="inherit" onClick={() => navigate('/projets-publics')} sx={{
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            background: 'rgba(255,255,255,0.04)',
            transition: 'all 0.2s',
            '&:hover': {
              background: '#FFA500',
              color: '#232526',
              boxShadow: '0 2px 12px #FFA50044'
            }
          }}>
            Projets
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')} sx={{
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            background: 'rgba(255,255,255,0.04)',
            transition: 'all 0.2s',
            '&:hover': {
              background: '#FFA500',
              color: '#232526',
              boxShadow: '0 2px 12px #FFA50044'
            }
          }}>
            À propos
          </Button>
          
          {/* Bouton Se connecter */}
          <Button 
            variant="contained"
            onClick={() => navigate('/login')} 
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              py: 1,
              backgroundColor: '#FFA500',
              color: '#232526',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(255, 165, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#E69500',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(255, 165, 0, 0.4)'
              }
            }}
          >
            Se connecter
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ModernHeader;
