import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface OptimizedLoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const OptimizedLoading: React.FC<OptimizedLoadingProps> = ({ 
  message = 'Chargement...', 
  size = 'medium' 
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        gap: 2
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        sx={{
          color: '#C1272D',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: 'center' }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default OptimizedLoading;
