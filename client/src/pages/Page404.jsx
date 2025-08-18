import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          px: 3,
        }}
      >
        <ErrorOutlineIcon 
          sx={{ 
            fontSize: 120, 
            color: 'error.main',
            mb: 3,
            opacity: 0.8,
          }} 
        />
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary" 
          paragraph
          sx={{ mb: 4, maxWidth: 600 }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.4)',
            },
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default Page404;
