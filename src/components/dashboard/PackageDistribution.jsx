import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PackageBox = ({ count, range }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Box sx={{ 
      bgcolor: '#E8F5E9', // Light green background
      p: 2,
      borderRadius: 2,
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 1
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          color: '#2E7D32',
          fontWeight: 500,
          lineHeight: 1
        }}
      >
        {count}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#757575',
          fontWeight: 500
        }}
      >
        {range}
      </Typography>
    </Box>
  </Grid>
);

const PackageDistribution = ({ distribution }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        borderRadius: 2,
        bgcolor: '#FFFBEB' // Light cream background
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <TrendingUpIcon 
          sx={{ 
            color: '#2E7D32',
            mr: 1,
            fontSize: 28
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2E7D32',
            fontWeight: 500
          }}
        >
          Package Distribution
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {distribution.map((item, index) => (
          <PackageBox 
            key={index}
            count={item.count}
            range={item.range}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default PackageDistribution; 