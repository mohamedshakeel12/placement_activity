import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography
} from '@mui/material';
import DownloadReport from '../common/DownloadReport';

const UpcomingCompaniesTable = ({ companies }) => {
  if (!companies?.length) {
    return (
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography color="textSecondary">
          No upcoming companies at the moment
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h6" sx={{ color: '#2E7D32' }}>
          Upcoming Companies
        </Typography>
        <DownloadReport />
      </Box>
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Package</TableCell>
              <TableCell sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow 
                key={company.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(46, 125, 50, 0.04)'
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
                      '&:hover': { bgcolor: '#1B5E20' }
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
    </Box>
  );
};

export default UpcomingCompaniesTable; 