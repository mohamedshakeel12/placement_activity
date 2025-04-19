import { Box, Typography, Paper } from '@mui/material';

const StatCard = ({ title, value, type = 'default', color = '#4CAF50' }) => {
  if (type === 'circular') {
    return (
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box
          sx={{
            position: 'relative',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `4px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h4">{value}</Typography>
          {title && <Typography variant="caption">{title}</Typography>}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{value}</Typography>
      <Typography color="textSecondary">{title}</Typography>
    </Box>
  );
};

export default StatCard; 