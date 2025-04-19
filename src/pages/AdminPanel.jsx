import { Box, Typography } from '@mui/material';

const AdminPanel = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="body1">
        Welcome to the admin dashboard. This area is restricted to administrators only.
      </Typography>
    </Box>
  );
};

export default AdminPanel; 