import { Paper, Typography } from '@mui/material';

const PackageRangeCard = ({ range, count }) => {
  return (
    <Paper 
      sx={{ 
        p: 2, 
        textAlign: 'center', 
        bgcolor: '#90b879',
        transition: 'transform 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Typography>{range}</Typography>
      <Typography variant="h6">{count}</Typography>
    </Paper>
  );
};

export default PackageRangeCard; 