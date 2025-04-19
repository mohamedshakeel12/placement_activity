import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Link,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CompanySearch from '../components/companies/CompanySearch';

const Company = () => {
  const companyDetails = {
    name: 'XYZ',
    type: 'Core/IT',
    description: 'Company description goes here...',
    website: 'https://xyz.com',
    rounds: [
      { name: 'Technical', status: 'Completed' },
      { name: 'HR', status: 'Pending' }
    ],
    eligibility: {
      cgpa: '7.0',
      branches: ['CSE', 'IT', 'ECE'],
      backlog: 'No active backlog'
    },
    roles: [
      {
        title: 'Developer',
        type: 'Core',
        package: '8-12 LPA'
      }
    ],
    previousYears: ['2023', '2022', '2021']
  };

  const upcomingDrives = [
    { 
      date: '2/1/25',
      company: 'XYZ',
      role: 'core',
      position: 'developer',
      status: 'Apply'
    },
    { 
      date: '2/1/25',
      company: 'XYZ',
      role: 'IT',
      position: 'developer',
      status: 'Apply'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Company Placements
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Search and explore companies visiting for campus placements. View their details, requirements, and placement history.
          </Typography>
        </Paper>
        
        <CompanySearch />
      </Box>
    </Container>
  );
};

export default Company; 