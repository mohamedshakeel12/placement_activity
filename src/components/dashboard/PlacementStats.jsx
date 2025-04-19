import React from 'react';
import { Box } from '@mui/material';
import StatsBarChart from './StatsBarChart';

const PlacementStats = ({ stats }) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <StatsBarChart data={stats} />
    </Box>
  );
};

export default PlacementStats; 