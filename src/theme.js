import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
    },
    caption: {
      fontFamily: 'Inter, sans-serif',
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#2E7D32',
      dark: '#1B5E20',
    },
    text: {
      primary: '#2E7D32',
      secondary: '#757575',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
}); 