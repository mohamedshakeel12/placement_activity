import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const UpcomingCompanies = ({ companies }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        borderRadius: 2,
        bgcolor: '#FFFBEB'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <EventIcon 
          sx={{ 
            color: '#2E7D32',
            mr: 1,
            fontSize: 28
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2E7D32',
            fontWeight: 500
          }}
        >
          Upcoming Companies
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  fontWeight: 500,
                  color: '#2E7D32',
                  borderBottom: '2px solid #E8F5E9'
                }}
              >
                Date
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 500,
                  color: '#2E7D32',
                  borderBottom: '2px solid #E8F5E9'
                }}
              >
                Company
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 500,
                  color: '#2E7D32',
                  borderBottom: '2px solid #E8F5E9'
                }}
              >
                Role
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 500,
                  color: '#2E7D32',
                  borderBottom: '2px solid #E8F5E9'
                }}
              >
                Package
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 500,
                  color: '#2E7D32',
                  borderBottom: '2px solid #E8F5E9'
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow 
                key={company.id}
                sx={{
                  '&:nth-of-type(odd)': {
                    bgcolor: '#F9FBF9'
                  },
                  '& td': {
                    color: '#757575',
                    borderBottom: 'none'
                  }
                }}
              >
                <TableCell>
                  {new Date(company.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.role}</TableCell>
                <TableCell>{company.package}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                      bgcolor: '#2E7D32',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#1B5E20'
                      }
                    }}
                  >
                    Apply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UpcomingCompanies; 