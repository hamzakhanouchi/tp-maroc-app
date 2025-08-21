import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  variant?: 'horizontal' | 'vertical';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'horizontal' 
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { logo: 32, text: '0.9rem' };
      case 'large':
        return { logo: 64, text: '1.5rem' };
      default:
        return { logo: 48, text: '1.2rem' };
    }
  };

  const { logo } = getSize();

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      flexDirection: variant === 'vertical' ? 'column' : 'row'
    }}>
      {/* Logo avec style moderne compatible */}
      <Box sx={{ 
        width: logo, 
        height: logo, 
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(255, 165, 0, 0.15), 0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid rgba(255, 165, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '12px',
          padding: '2px',
          background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.3
        },
        '&:hover': {
          transform: 'translateY(-2px) scale(1.02)',
          boxShadow: '0 8px 30px rgba(255, 165, 0, 0.25), 0 4px 16px rgba(0,0,0,0.12)',
          border: '2px solid rgba(255, 165, 0, 0.2)'
        }
      }}>
        <img 
          src="/logo22.png" 
          alt="Logo Ministère de l'Intérieur" 
          style={{ 
            width: '80%', 
            height: '80%', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 8px rgba(255, 165, 0, 0.2))',
            transition: 'all 0.3s ease'
          }} 
        />
      </Box>

      {/* Texte TP MAROC avec style moderne */}
      {showText && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: variant === 'vertical' ? 'center' : 'flex-start'
        }}>
          <Typography
            variant={size === 'large' ? 'h4' : size === 'small' ? 'h6' : 'h5'}
            sx={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              mb: variant === 'vertical' ? 0.5 : 0,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            TP
          </Typography>
          <Typography
            variant={size === 'large' ? 'h5' : size === 'small' ? 'body1' : 'h6'}
            sx={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.01em',
              lineHeight: 1,
              textShadow: '0 2px 4px rgba(255, 165, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            MAROC
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Logo;
