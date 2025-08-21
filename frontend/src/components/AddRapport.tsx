import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container, Grid, MenuItem } from '@mui/material';

const AddRapport = ({ projets, addRapport, navigate }: { projets: any[], addRapport: (projetId: number, rapport: any) => void, navigate: any }) => {
  const [formData, setFormData] = useState({
    projet: '',
    pourcentage_avancement: '',
    commentaire: '',
    date_rapport: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.projet) {
      alert('Veuillez sélectionner un projet');
      return;
    }
    
    const rapportData = {
      pourcentage_avancement: parseInt(formData.pourcentage_avancement),
      commentaire: formData.commentaire
    };
    
    addRapport(parseInt(formData.projet), rapportData);
    
    // Rediriger vers le dashboard approprié
    navigate('/technicien');
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
            <span style={{ color: '#FFA500' }}>Rapport</span>
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300
            }}
          >
            Créez un rapport d'avancement pour un projet
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
                  select
                  label="Projet"
                  name="projet"
                  value={formData.projet}
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
                  {projets.map((projet) => (
                    <MenuItem key={projet.id} value={projet.id}>
                      {projet.titre} - {projet.localisation}
                    </MenuItem>
            ))}
          </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pourcentage d'avancement (%)"
                  name="pourcentage_avancement"
                  type="number"
                  value={formData.pourcentage_avancement}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  inputProps={{ min: 0, max: 100 }}
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
                  label="Date du rapport"
                  name="date_rapport"
                  type="date"
                  value={formData.date_rapport}
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
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Commentaire"
                  name="commentaire"
                  value={formData.commentaire}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Décrivez l'avancement du projet, les difficultés rencontrées, les prochaines étapes..."
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
                  AJOUTER LE RAPPORT
          </Button>
              </Grid>
            </Grid>
          </Box>
      </Paper>
      </Container>
    </Box>
  );
};

export default AddRapport;
