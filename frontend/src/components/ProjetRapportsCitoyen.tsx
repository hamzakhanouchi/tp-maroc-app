import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rapportService, projetService } from '../services/api';
import { Box, Container, Typography, Card, CardContent, Button, Paper, CircularProgress } from '@mui/material';

const ProjetRapportsCitoyen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rapports, setRapports] = useState<any[]>([]);
  const [projet, setProjet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const projetData = await projetService.getById(Number(id));
        setProjet(projetData);
        const rapportsData = await rapportService.getByProjet(Number(id));
        setRapports(rapportsData);
      } catch (err) {
        setError('Impossible de charger les rapports pour ce projet.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, borderRadius: 3, background: 'white', minWidth: 320 }}>
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>{error}</Typography>
          <Button variant="contained" onClick={() => navigate('/projets-publics')}>Retour à la liste des projets</Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, background: 'white', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#FFA500', mb: 2, textAlign: 'center' }}>
            Rapports du projet
          </Typography>
          {projet && (
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>{projet.titre}</Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 1 }}>{projet.description}</Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                Localisation : {projet.localisation} | Début : {projet.date_debut} | Fin prévue : {projet.date_fin_prevue}
              </Typography>
            </Box>
          )}
          {rapports.length === 0 ? (
            <Typography variant="body1" color="#666" align="center" sx={{ mt: 6 }}>
              Aucun rapport n'a encore été rédigé pour ce projet.
            </Typography>
          ) : (
            <Box sx={{ mt: 4 }}>
              {rapports.map((rapport) => (
                <Card key={rapport.id} elevation={3} sx={{ mb: 4, borderRadius: 3, background: '#f8f9fa' }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ color: '#1a1a1a', fontWeight: 600, mb: 2 }}>
                      {rapport.commentaire}
                    </Typography>
                    <Typography variant="caption" color="#999">
                      Rédigé le {rapport.date_rapport ? new Date(rapport.date_rapport).toLocaleDateString('fr-FR') : ''}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
          <Button variant="outlined" sx={{ mt: 4 }} onClick={() => navigate('/projets-publics')}>
            Retour à la liste des projets
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProjetRapportsCitoyen;


