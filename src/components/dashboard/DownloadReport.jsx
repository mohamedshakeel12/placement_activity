import { Box, Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const DownloadReport = () => {
  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading report...');
  };

  return (
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      sx={{
        bgcolor: 'success.main',
        color: 'white',
        borderRadius: 2,
        px: 3,
        py: 1,
        textTransform: 'none',
        fontWeight: 500,
        '&:hover': {
          bgcolor: 'success.dark',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        },
        transition: 'all 0.3s ease'
      }}
    >
      Download Report
    </Button>
  );
};

export default DownloadReport; 