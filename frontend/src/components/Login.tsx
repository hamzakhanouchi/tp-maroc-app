import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, MenuItem, Grid, Alert, Container } from '@mui/material';
import { authService } from '../services/api';

const Login = ({ setUser }: { setUser: (user: any) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Utilisateurs de test pour chaque rôle
  const testUsers = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    technicien: { username: 'tech1', password: 'test123', role: 'technicien' }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Essayer la connexion avec l'API
      const userData = await authService.login(username, password);
      
      // Vérifier que le rôle de l'API correspond au rôle sélectionné
      if (userData.role !== role) {
        setError(`Rôle incorrect. Vous avez sélectionné "${role}" mais l'utilisateur a le rôle "${userData.role}".`);
        setLoading(false);
        return;
      }
      
      // Sauvegarder l'utilisateur dans localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      
      // Rediriger selon le rôle
      switch (userData.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'technicien':
          navigate('/technicien');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      console.error('Erreur de connexion API:', error);
      
      // Fallback : vérifier avec les utilisateurs de test locaux
      // Vérifier d'abord si l'utilisateur existe avec le rôle sélectionné
      const selectedRoleUser = testUsers[role as keyof typeof testUsers];
      
      if (selectedRoleUser && username === selectedRoleUser.username && password === selectedRoleUser.password) {
        // Créer un objet utilisateur simulé
        const userData = {
          id: 1,
          username: selectedRoleUser.username,
          role: selectedRoleUser.role,
          email: `${selectedRoleUser.username}@example.com`
        };
        
        // Sauvegarder l'utilisateur dans localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
        
        // Rediriger selon le rôle
        switch (selectedRoleUser.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'technicien':
            navigate('/technicien');
            break;
          default:
            navigate('/');
        }
      } else {
        // Vérifier si l'utilisateur existe mais avec un rôle différent
        let foundUser = null;
        for (const [, testUser] of Object.entries(testUsers)) {
          if (username === testUser.username && password === testUser.password) {
            foundUser = testUser;
            break;
          }
        }
        
        if (foundUser) {
          setError(`Rôle incorrect. Vous avez sélectionné "${role}" mais l'utilisateur "${username}" a le rôle "${foundUser.role}". Veuillez sélectionner le bon rôle.`);
        } else {
          setError('Identifiants incorrects. Utilisez les comptes de démonstration fournis.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Section Art Marocain */}
      <Box sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        py: 8,
        position: 'relative',
        zIndex: 3
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

      {/* Overlay pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}>
          {/* Formulaire de connexion - Style XTRA */}
          <Paper 
            elevation={12} 
            sx={{ 
              p: 6,
              width: '100%',
              maxWidth: 500,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 165, 0, 0.3)',
              position: 'relative',
              zIndex: 3
            }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                color: '#1a1a1a',
                fontWeight: 800,
                textAlign: 'center',
                mb: 1
              }}
            >
              Connexion
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666',
                textAlign: 'center',
                mb: 4,
                fontWeight: 400
              }}
            >
              Accédez à votre compte
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 4,
                  borderRadius: 2,
                  '& .MuiAlert-icon': { color: '#F44336' }
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Rôle"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    variant="outlined"
                    required
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFA500',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFA500',
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FFA500'
                      }
                    }}
                  >
                    <MenuItem value="admin">Administrateur</MenuItem>
                    <MenuItem value="technicien">Technicien</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    required
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFA500',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFA500',
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FFA500'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    required
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFA500',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFA500',
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FFA500'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ 
                      py: 2, 
                      fontSize: '1.1rem', 
                      fontWeight: 700,
                      borderRadius: 2,
                      backgroundColor: '#FFA500',
                      color: 'white',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        backgroundColor: '#E69500',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 25px rgba(255, 165, 0, 0.3)'
                      },
                      '&:disabled': {
                        backgroundColor: '#ccc',
                        color: '#666'
                      }
                    }}
                  >
                    {loading ? 'Connexion...' : 'SE CONNECTER'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            {/* Section d'aide avec les comptes de test */}
            <Paper 
              elevation={8} 
              sx={{ 
                mt: 3, 
                p: 3, 
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
                border: '2px solid rgba(255, 165, 0, 0.3)'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#1a1a1a', 
                  fontWeight: 700, 
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                Comptes de démonstration - Rôle : {role === 'admin' ? 'Administrateur' : 'Technicien'}
              </Typography>
              
              <Box sx={{ 
                background: role === 'admin' ? 'rgba(255, 165, 0, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                p: 2,
                borderRadius: 2,
                border: `2px solid ${role === 'admin' ? 'rgba(255, 165, 0, 0.3)' : 'rgba(33, 150, 243, 0.3)'}`
              }}>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                  <strong>Nom d'utilisateur :</strong> {role === 'admin' ? 'admin' : 'tech1'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                  <strong>Mot de passe :</strong> {role === 'admin' ? 'admin123' : 'test123'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic' }}>
                  Assurez-vous de sélectionner le bon rôle avant de vous connecter !
                </Typography>
              </Box>
            </Paper>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;