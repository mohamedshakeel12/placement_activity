import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      dark: '#1B5E20',
      light: '#4CAF50',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#2E7D32',
      light: '#E8F5E9',
      dark: '#1B5E20',
    },
    warning: {
      main: '#ED6C02',
      light: '#FFF3E0',
      dark: '#E65100',
    },
    error: {
      main: '#D32F2F',
      light: '#FFEAEA',
      dark: '#C62828',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#1B5E20',
    },
    h5: {
      fontWeight: 600,
      color: '#2E7D32',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
}); 