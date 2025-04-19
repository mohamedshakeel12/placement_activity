import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Input,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  Divider,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CompanyCard from './CompanyCard';
import CompanyDetail from './CompanyDetail';

const CompanySearch = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    averagePackage: 0,
    totalPlacements: 0
  });
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanies = async (query = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/companies/search?query=${query}`);
      setCompanies(response.data);
      
      // Calculate stats from companies
      if (response.data.length > 0) {
        const totalPlacements = response.data.reduce((sum, company) => 
          sum + (company.placementHistory[0]?.studentsHired || 0), 0);
        
        const totalPackages = response.data.reduce((sum, company) => 
          sum + (company.placementHistory[0]?.averagePackage || 0), 0);
        
        setStats({
          totalCompanies: response.data.length,
          averagePackage: totalPackages / response.data.length,
          totalPlacements: totalPlacements
        });
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchCompanies(query);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  if (selectedCompany) {
    return (
      <Box>
        <Button 
          variant="outlined" 
          onClick={() => setSelectedCompany(null)}
          sx={{ mb: 3 }}
        >
          Back to Companies
        </Button>
        <CompanyDetail 
          company={selectedCompany} 
          onClose={() => setSelectedCompany(null)} 
        />
      </Box>
    );
  }

  return (
    <Box>
      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Companies</Typography>
            <Typography variant="h4">{stats.totalCompanies}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Average Package</Typography>
            <Typography variant="h4">₹{(stats.averagePackage/100000).toFixed(1)}L</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Placements</Typography>
            <Typography variant="h4">{stats.totalPlacements}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Input
          fullWidth
          placeholder="Search companies by name, industry, or description..."
          value={searchQuery}
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Paper>

      {/* Results Section */}
      {loading ? (
        <Box display="flex" justifyContent="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company._id}>
              <CompanyCard 
                company={company} 
                onClick={() => handleCompanyClick(company)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && companies.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No companies found matching your search criteria.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CompanySearch; 