import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../context/AuthContext';

// Mock company data
const MOCK_COMPANIES = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
    industry: 'Technology',
    package: '25-30 LPA',
    eligibility: 'CGPA 8.0+',
    status: 'Open',
    deadline: '2023-12-15',
    description: 'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and artificial intelligence.'
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
    industry: 'Technology',
    package: '20-25 LPA',
    eligibility: 'CGPA 7.5+',
    status: 'Open',
    deadline: '2023-12-20',
    description: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.'
  },
  {
    id: 3,
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    industry: 'E-commerce, Technology',
    package: '18-22 LPA',
    eligibility: 'CGPA 7.0+',
    status: 'Open',
    deadline: '2023-12-25',
    description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.'
  },
  {
    id: 4,
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
    industry: 'Technology',
    package: '30-35 LPA',
    eligibility: 'CGPA 8.5+',
    status: 'Closed',
    deadline: '2023-11-30',
    description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services.'
  },
  {
    id: 5,
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
    industry: 'Entertainment, Technology',
    package: '24-28 LPA',
    eligibility: 'CGPA 8.0+',
    status: 'Upcoming',
    deadline: '2024-01-15',
    description: 'Netflix, Inc. is an American subscription streaming service and production company.'
  },
  {
    id: 6,
    name: 'Facebook (Meta)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png',
    industry: 'Technology, Social Media',
    package: '22-26 LPA',
    eligibility: 'CGPA 7.5+',
    status: 'Upcoming',
    deadline: '2024-01-10',
    description: 'Meta Platforms, Inc., doing business as Meta and formerly known as Facebook, Inc., is an American multinational technology conglomerate.'
  }
];

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [editCompanyOpen, setEditCompanyOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    package: '',
    eligibility: '',
    status: 'Upcoming',
    deadline: '',
    description: ''
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  
  const navigate = useNavigate();
  const { isPlacementOfficer } = useAuth();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCompanies(MOCK_COMPANIES);
      setFilteredCompanies(MOCK_COMPANIES);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, statusFilter, companies]);

  const filterCompanies = () => {
    let filtered = companies;
    
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter(company => company.status === statusFilter);
    }
    
    setFilteredCompanies(filtered);
  };

  const handleAddCompany = () => {
    // In a real app, this would be an API call
    const newId = Math.max(...companies.map(c => c.id), 0) + 1;
    const companyWithId = {
      ...newCompany,
      id: newId,
      logo: 'https://via.placeholder.com/150'
    };
    
    setCompanies([...companies, companyWithId]);
    setAddCompanyOpen(false);
    setNewCompany({
      name: '',
      industry: '',
      package: '',
      eligibility: '',
      status: 'Upcoming',
      deadline: '',
      description: ''
    });
  };

  const handleEditCompany = () => {
    // In a real app, this would be an API call
    const updatedCompanies = companies.map(company => 
      company.id === currentCompany.id ? currentCompany : company
    );
    
    setCompanies(updatedCompanies);
    setEditCompanyOpen(false);
    setCurrentCompany(null);
  };

  const handleDeleteCompany = () => {
    // In a real app, this would be an API call
    const updatedCompanies = companies.filter(company => 
      company.id !== companyToDelete.id
    );
    
    setCompanies(updatedCompanies);
    setDeleteConfirmOpen(false);
    setCompanyToDelete(null);
  };

  const openEditDialog = (company) => {
    setCurrentCompany(company);
    setEditCompanyOpen(true);
  };

  const openDeleteConfirm = (company) => {
    setCompanyToDelete(company);
    setDeleteConfirmOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'success';
      case 'Closed':
        return 'error';
      case 'Upcoming':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleSaveCompanyChanges = (updatedCompany) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
    setEditCompanyOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#2E7D32' }}>
              Companies
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Browse and apply to companies visiting campus
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            {isPlacementOfficer() && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setAddCompanyOpen(true)}
                sx={{
                  bgcolor: '#2E7D32',
                  '&:hover': {
                    bgcolor: '#1B5E20'
                  },
                  mr: 2
                }}
              >
                Add Company
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{
                color: '#2E7D32',
                borderColor: '#2E7D32',
                '&:hover': {
                  borderColor: '#1B5E20'
                }
              }}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search companies by name or industry..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Chip
              label="All"
              clickable
              color={statusFilter === '' ? 'success' : 'default'}
              onClick={() => setStatusFilter('')}
              sx={{ fontWeight: statusFilter === '' ? 'bold' : 'normal' }}
            />
          </Grid>
          <Grid item>
            <Chip
              label="Open"
              clickable
              color={statusFilter === 'Open' ? 'success' : 'default'}
              onClick={() => setStatusFilter('Open')}
              sx={{ fontWeight: statusFilter === 'Open' ? 'bold' : 'normal' }}
            />
          </Grid>
          <Grid item>
            <Chip
              label="Upcoming"
              clickable
              color={statusFilter === 'Upcoming' ? 'success' : 'default'}
              onClick={() => setStatusFilter('Upcoming')}
              sx={{ fontWeight: statusFilter === 'Upcoming' ? 'bold' : 'normal' }}
            />
          </Grid>
          <Grid item>
            <Chip
              label="Closed"
              clickable
              color={statusFilter === 'Closed' ? 'success' : 'default'}
              onClick={() => setStatusFilter('Closed')}
              sx={{ fontWeight: statusFilter === 'Closed' ? 'bold' : 'normal' }}
            />
          </Grid>
        </Grid>
      </Box>

      {filteredCompanies.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="textSecondary">
            No companies found matching your criteria
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredCompanies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Fade in={true} timeout={500}>
                <Card 
                  onClick={() => navigate(`/companies/${company.id}`)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' }
                  }}
                >
                  <CardActionArea 
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
                      <CardMedia
                        component="img"
                        image={company.logo}
                        alt={company.name}
                        sx={{ 
                          height: 80, 
                          width: 'auto', 
                          objectFit: 'contain',
                          maxWidth: '80%'
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {company.name}
                        </Typography>
                        <Chip 
                          label={company.status} 
                          size="small" 
                          color={getStatusColor(company.status)}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {company.industry}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Chip 
                          label={company.package} 
                          size="small" 
                          variant="outlined"
                          sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)' }}
                        />
                        <Chip 
                          label={company.eligibility} 
                          size="small" 
                          variant="outlined"
                          sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {company.description.length > 100 
                          ? `${company.description.substring(0, 100)}...` 
                          : company.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  
                  {isPlacementOfficer() && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(company);
                          }}
                          sx={{ color: '#2E7D32' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteConfirm(company);
                          }}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Company Dialog */}
      <Dialog open={addCompanyOpen} onClose={() => setAddCompanyOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                fullWidth
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Industry"
                fullWidth
                value={newCompany.industry}
                onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package (e.g. 15-20 LPA)"
                fullWidth
                value={newCompany.package}
                onChange={(e) => setNewCompany({...newCompany, package: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Eligibility (e.g. CGPA 7.5+)"
                fullWidth
                value={newCompany.eligibility}
                onChange={(e) => setNewCompany({...newCompany, eligibility: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newCompany.status}
                  label="Status"
                  onChange={(e) => setNewCompany({...newCompany, status: e.target.value})}
                >
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Application Deadline"
                type="date"
                fullWidth
                value={newCompany.deadline}
                onChange={(e) => setNewCompany({...newCompany, deadline: e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={newCompany.description}
                onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCompanyOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddCompany} 
            variant="contained"
            sx={{
              bgcolor: '#2E7D32',
              '&:hover': {
                bgcolor: '#1B5E20'
              }
            }}
          >
            Add Company
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Company Dialog */}
      <Dialog open={editCompanyOpen} onClose={() => setEditCompanyOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          {currentCompany && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  fullWidth
                  value={currentCompany.name}
                  onChange={(e) => setCurrentCompany({...currentCompany, name: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Industry"
                  fullWidth
                  value={currentCompany.industry}
                  onChange={(e) => setCurrentCompany({...currentCompany, industry: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Package (e.g. 15-20 LPA)"
                  fullWidth
                  value={currentCompany.package}
                  onChange={(e) => setCurrentCompany({...currentCompany, package: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Eligibility (e.g. CGPA 7.5+)"
                  fullWidth
                  value={currentCompany.eligibility}
                  onChange={(e) => setCurrentCompany({...currentCompany, eligibility: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={currentCompany.status}
                    label="Status"
                    onChange={(e) => setCurrentCompany({...currentCompany, status: e.target.value})}
                  >
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Application Deadline"
                  type="date"
                  fullWidth
                  value={currentCompany.deadline}
                  onChange={(e) => setCurrentCompany({...currentCompany, deadline: e.target.value})}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={currentCompany.description}
                  onChange={(e) => setCurrentCompany({...currentCompany, description: e.target.value})}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCompanyOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleEditCompany} 
            variant="contained"
            sx={{
              bgcolor: '#2E7D32',
              '&:hover': {
                bgcolor: '#1B5E20'
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {companyToDelete?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteCompany} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Companies; 