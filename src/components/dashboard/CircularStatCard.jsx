import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const CircularStatCard = ({ title, current, total, color = 'success' }) => {
  const percentage = (current / total) * 100;

  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: '#FFF8E1',
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={140}
          thickness={4}
          sx={{ color: `${color}.light` }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={140}
          thickness={4}
          sx={{
            color: `${color}.main`,
            position: 'absolute',
            left: 0,
            '& circle': {
              strokeLinecap: 'round'
            }
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h3" color={`${color}.dark`} fontWeight="bold">
            {current}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            of {total}
          </Typography>
        </Box>
      </Box>
      <Typography 
        variant="h6" 
        color={`${color}.dark`}
        sx={{ 
          fontWeight: 500,
          textAlign: 'center' 
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default CircularStatCard; 