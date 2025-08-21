import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container, Grid, MenuItem } from '@mui/material';

const AddProjet = ({ addProjet, navigate }: { addProjet: (projet: any) => void, navigate: any }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    localisation: '',
    statut: 'en_attente',
    date_debut: '',
    date_fin_prevue: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const projetData = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
    };
    
    addProjet(projetData);
    
    // Rediriger vers le dashboard admin
    navigate('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="md">
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
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.1
            }}
          >
            Ajouter un
            <br />
            <span style={{ color: '#FFA500' }}>Projet</span>
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300
            }}
          >
            Créez un nouveau projet de travaux publics
        </Typography>
        </Box>

        {/* Formulaire - Style XTRA */}
        <Paper 
          elevation={8} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'white',
            border: '2px solid rgba(255, 165, 0, 0.2)'
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Titre du projet"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                  variant="outlined"
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
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Localisation"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleChange}
                  required
                  variant="outlined"
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  required
                  variant="outlined"
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
                  <MenuItem value="en_attente">En attente</MenuItem>
            <MenuItem value="en_cours">En cours</MenuItem>
            <MenuItem value="termine">Terminé</MenuItem>
                  <MenuItem value="suspendu">Suspendu</MenuItem>
          </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date de début"
                  name="date_debut"
                  type="date"
                  value={formData.date_debut}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date de fin prévue"
                  name="date_fin_prevue"
                  type="date"
                  value={formData.date_fin_prevue}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget (MAD)"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  variant="outlined"
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
                    }
                  }}
                >
                  AJOUTER LE PROJET
          </Button>
              </Grid>
            </Grid>
          </Box>
      </Paper>
      </Container>
    </Box>
  );
};

export default AddProjet;
