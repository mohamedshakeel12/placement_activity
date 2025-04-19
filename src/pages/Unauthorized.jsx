import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          <BlockIcon
            sx={{
              fontSize: 80,
              color: '#d32f2f',
              mb: 2,
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard')}
            sx={{
              mt: 2,
              bgcolor: '#2E7D32',
              '&:hover': {
                bgcolor: '#1B5E20',
              },
            }}
          >
            Go to Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized; 