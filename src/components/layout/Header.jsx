import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = ({ title, subtitle }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link 
          component={RouterLink} 
          to="/"
          sx={{ 
            color: '#2E7D32',
            '&:hover': { color: '#1B5E20' }
          }}
          underline="hover"
        >
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography color="text.primary" key={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={routeTo}
              key={name}
              sx={{ 
                color: '#2E7D32',
                '&:hover': { color: '#1B5E20' }
              }}
              underline="hover"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
      
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ color: '#1B5E20', fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="subtitle1" 
          sx={{ color: '#2E7D32' }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Header; 