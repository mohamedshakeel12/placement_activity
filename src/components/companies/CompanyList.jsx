import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Input,
  Grid,
  Typography,
  Container,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CompanyCard from './CompanyCard';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCompanies = async (query = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/companies/search?query=${query}`);
      setCompanies(response.data);
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

  const handleCompanyClick = (companyId) => {
    navigate(`/companies/${companyId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Companies
        </Typography>
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
          sx={{ mb: 4 }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company._id} onClick={() => handleCompanyClick(company._id)}>
              <CompanyCard company={company} />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && companies.length === 0 && (
        <Typography textAlign="center" color="text.secondary">
          No companies found matching your search criteria.
        </Typography>
      )}
    </Container>
  );
};

export default CompanyList; 