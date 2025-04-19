import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingState = ({ message = 'Loading...' }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography color="textSecondary">{message}</Typography>
    </Box>
  );
};

export default LoadingState; 