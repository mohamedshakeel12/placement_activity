import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth } from '../context/AuthContext';

// Update the MOCK_COMPANIES array
const MOCK_COMPANIES = [
  {
    id: 1,
    name: 'Google',
    type: 'Core/IT',
    description: 'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and artificial intelligence.',
    website: 'https://careers.google.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
    eligibility: {
      cgpa: '8.0',
      branches: ['CSE', 'IT', 'ECE'],
      backlog: 'No active backlog'
    },
    role: {
      position: 'Software Engineer',
      type: 'Core',
      package: '25-30 LPA'
    },
    rounds: [
      { name: 'Online Assessment', status: 'Completed' },
      { name: 'Technical Interview', status: 'Completed' },
      { name: 'HR Interview', status: 'Pending' }
    ],
    applicationStatus: ['Applied', 'Shortlisted']
  },
  {
    id: 2,
    name: 'Microsoft',
    type: 'Core/IT',
    description: 'Microsoft Corporation is an American multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.',
    website: 'https://careers.microsoft.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
    eligibility: {
      cgpa: '7.5',
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      backlog: 'No active backlog'
    },
    role: {
      position: 'Software Development Engineer',
      type: 'Core',
      package: '20-25 LPA'
    },
    rounds: [
      { name: 'Online Assessment', status: 'Completed' },
      { name: 'Technical Interview', status: 'Pending' },
      { name: 'HR Interview', status: 'Pending' }
    ],
    applicationStatus: ['Applied']
  },
  {
    id: 3,
    name: 'Amazon',
    type: 'Core/IT',
    description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    website: 'https://amazon.jobs',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    eligibility: {
      cgpa: '7.0',
      branches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
      backlog: 'Maximum 1 active backlog'
    },
    role: {
      position: 'SDE',
      type: 'Core',
      package: '18-22 LPA'
    },
    rounds: [
      { name: 'Online Assessment', status: 'Pending' },
      { name: 'Technical Interviews', status: 'Pending' },
      { name: 'Bar Raiser', status: 'Pending' }
    ],
    applicationStatus: ['Applied']
  },
  {
    id: 4,
    name: 'Apple',
    type: 'Core/IT',
    description: 'Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.',
    website: 'https://apple.com/careers',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    eligibility: {
      cgpa: '8.5',
      branches: ['CSE', 'IT', 'ECE'],
      backlog: 'No backlog allowed'
    },
    role: {
      position: 'Software Engineer',
      type: 'Core',
      package: '30-35 LPA'
    },
    rounds: [
      { name: 'Technical Assessment', status: 'Pending' },
      { name: 'System Design', status: 'Pending' },
      { name: 'Culture Fit', status: 'Pending' }
    ],
    applicationStatus: ['Not Applied']
  },
  {
    id: 5,
    name: 'Meta',
    type: 'Core/IT',
    description: 'Meta Platforms, Inc. (formerly Facebook) is a leading technology company focused on building technologies that help people connect, find communities, and grow businesses. Meta is moving beyond 2D screens and into immersive experiences like augmented and virtual reality.',
    website: 'https://careers.meta.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
    eligibility: {
      cgpa: '8.0',
      branches: ['CSE', 'IT', 'ECE'],
      backlog: 'No backlog allowed'
    },
    role: {
      position: 'Software Engineer',
      type: 'Core',
      package: '45-50 LPA'
    },
    rounds: [
      { name: 'Online Coding Round', status: 'Pending' },
      { name: 'Technical Interviews (2)', status: 'Pending' },
      { name: 'System Design', status: 'Pending' },
      { name: 'Behavioral Interview', status: 'Pending' }
    ],
    applicationStatus: ['Not Applied']
  },
  {
    id: 6,
    name: 'Netflix',
    type: 'Core/IT',
    description: 'Netflix is a streaming service and production company, leading the entertainment industry in innovative technology and content creation. Known for its strong engineering culture and cutting-edge technology stack.',
    website: 'https://jobs.netflix.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
    eligibility: {
      cgpa: '8.5',
      branches: ['CSE', 'IT'],
      backlog: 'No backlog allowed'
    },
    role: {
      position: 'Software Engineer',
      type: 'Core',
      package: '40-45 LPA'
    },
    rounds: [
      { name: 'Coding Challenge', status: 'Pending' },
      { name: 'Technical Screening', status: 'Pending' },
      { name: 'System Design', status: 'Pending' },
      { name: 'Culture Fit', status: 'Pending' }
    ],
    applicationStatus: ['Not Applied']
  }
];

// Add these dialogs and edit functionality
const EditEligibilityDialog = ({ open, onClose, eligibility, onSave }) => {
  const [editedEligibility, setEditedEligibility] = useState(eligibility);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Eligibility Criteria</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="CGPA"
            type="number"
            value={editedEligibility.cgpa}
            onChange={(e) => setEditedEligibility({...editedEligibility, cgpa: e.target.value})}
            inputProps={{ step: 0.1, min: 0, max: 10 }}
            fullWidth
          />
          <TextField
            label="Backlog"
            value={editedEligibility.backlog}
            onChange={(e) => setEditedEligibility({...editedEligibility, backlog: e.target.value})}
            fullWidth
          />
          <TextField
            label="Branches"
            value={editedEligibility.branches.join(', ')}
            onChange={(e) => setEditedEligibility({
              ...editedEligibility, 
              branches: e.target.value.split(',').map(b => b.trim())
            })}
            helperText="Enter branches separated by commas"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={() => onSave(editedEligibility)}
          variant="contained"
          sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EditRoleDialog = ({ open, onClose, role, onSave }) => {
  const [editedRole, setEditedRole] = useState(role);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Role Details</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Position"
            value={editedRole.position}
            onChange={(e) => setEditedRole({...editedRole, position: e.target.value})}
            fullWidth
          />
          <TextField
            label="Type"
            value={editedRole.type}
            onChange={(e) => setEditedRole({...editedRole, type: e.target.value})}
            fullWidth
          />
          <TextField
            label="Package"
            value={editedRole.package}
            onChange={(e) => setEditedRole({...editedRole, package: e.target.value})}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={() => onSave(editedRole)}
          variant="contained"
          sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Add EditRoundsDialog component
const EditRoundsDialog = ({ open, onClose, rounds, onSave }) => {
  const [editedRounds, setEditedRounds] = useState(rounds);

  const handleStatusChange = (index, newStatus) => {
    const updatedRounds = [...editedRounds];
    updatedRounds[index] = {
      ...updatedRounds[index],
      status: newStatus
    };
    setEditedRounds(updatedRounds);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Rounds Status</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {editedRounds.map((round, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ minWidth: 200 }}>{round.name}</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={round.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={() => onSave(editedRounds)}
          variant="contained"
          sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isStudent, isPlacementOfficer } = useAuth();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eligibilityDialogOpen, setEligibilityDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [roundsDialogOpen, setRoundsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Simulate API call to fetch company details
    setLoading(true);
    setTimeout(() => {
      const foundCompany = MOCK_COMPANIES.find(c => c.id === parseInt(id));
      if (foundCompany) {
        setCompany(foundCompany);
      } else {
        setError('Company not found');
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      setSelectedFile(file);
    }
  };

  // Add save handlers
  const handleSaveEligibility = (newEligibility) => {
    setCompany(prev => ({
      ...prev,
      eligibility: newEligibility
    }));
    setSaveMessage({ text: 'Eligibility criteria updated successfully!', type: 'success' });
    setEligibilityDialogOpen(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSaveMessage({ text: '', type: '' });
    }, 3000);
  };

  const handleSaveRole = (newRole) => {
    setCompany(prev => ({
      ...prev,
      role: newRole
    }));
    setSaveMessage({ text: 'Role details updated successfully!', type: 'success' });
    setRoleDialogOpen(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSaveMessage({ text: '', type: '' });
    }, 3000);
  };

  const handleSaveRounds = (newRounds) => {
    setCompany(prev => ({
      ...prev,
      rounds: newRounds
    }));
    setSaveMessage({ text: 'Rounds status updated successfully!', type: 'success' });
    setRoundsDialogOpen(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSaveMessage({ text: '', type: '' });
    }, 3000);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !company) {
    return (
      <Box p={3}>
        <Typography color="error">{error || 'Company not found'}</Typography>
        <Button onClick={() => navigate('/companies')} startIcon={<ArrowBackIcon />}>
          Back to Companies
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <IconButton 
        onClick={() => navigate('/companies')} 
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Company Details */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            component="img"
            src={company.logo}
            alt={company.name}
            sx={{ width: 100, height: 100, mr: 2, objectFit: 'contain' }}
          />
          <Box>
            <Typography variant="h5" component="h1">
              {company.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {company.type}
            </Typography>
          </Box>
        </Box>

        <Typography paragraph>
          {company.description}
        </Typography>

        <Typography>
          Website: <a href={company.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2E7D32' }}>{company.website}</a>
        </Typography>

        {/* Success/Error Message */}
        {saveMessage.text && (
          <Alert 
            severity={saveMessage.type} 
            sx={{ mb: 2 }}
            onClose={() => setSaveMessage({ text: '', type: '' })}
          >
            {saveMessage.text}
          </Alert>
        )}

        {/* Rounds Detail */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Rounds detail:
            </Typography>
            {isPlacementOfficer() && (
              <IconButton 
                onClick={() => setRoundsDialogOpen(true)}
                sx={{ color: '#2E7D32' }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {company.rounds.map((round, index) => (
              <Chip
                key={index}
                label={`${round.name} - ${round.status}`}
                color={
                  round.status === 'Completed' ? 'success' :
                  round.status === 'In Progress' ? 'warning' : 'default'
                }
                variant={round.status === 'Pending' ? 'outlined' : 'filled'}
              />
            ))}
          </Box>
        </Box>

        {/* Application Status */}
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          {company.applicationStatus.map((status, index) => (
            <Chip
              key={index}
              label={status}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      </Paper>

      {/* Eligibility and Role Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Eligibility Criteria</Typography>
              {isPlacementOfficer() && (
                <IconButton 
                  onClick={() => setEligibilityDialogOpen(true)}
                  sx={{ color: '#2E7D32' }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Typography>CGPA: {company.eligibility.cgpa}</Typography>
            <Typography>Branches: {company.eligibility.branches.join(', ')}</Typography>
            <Typography>Backlog: {company.eligibility.backlog}</Typography>
            {isStudent() && (
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: '#2E7D32',
                  '&:hover': { bgcolor: '#1B5E20' }
                }}
              >
                Apply
              </Button>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Role Details</Typography>
              {isPlacementOfficer() && (
                <IconButton 
                  onClick={() => setRoleDialogOpen(true)}
                  sx={{ color: '#2E7D32' }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Typography>Position: {company.role.position}</Typography>
            <Typography>Type: {company.role.type}</Typography>
            <Typography>Package: {company.role.package}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Previous Year Interview Experience */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Previous year interview exp
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[2023, 2022, 2021].map(year => (
            <Button
              key={year}
              variant="outlined"
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                color: '#2E7D32',
                borderColor: '#2E7D32'
              }}
            >
              {year}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Previous Year Experience Section */}
      {isPlacementOfficer() && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Upload Interview Experience</Typography>
          <Box
            component="label"
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              display: 'block',
              '&:hover': {
                borderColor: '#2E7D32',
                bgcolor: 'rgba(46, 125, 50, 0.04)'
              }
            }}
          >
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={handleFileUpload}
            />
            <CloudUploadIcon sx={{ fontSize: 40, color: '#2E7D32', mb: 1 }} />
            <Typography>
              Drop PDF file here or click to browse
            </Typography>
            {selectedFile && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: '#2E7D32',
              '&:hover': { bgcolor: '#1B5E20' }
            }}
            disabled={!selectedFile}
          >
            Upload Experience
          </Button>
        </Paper>
      )}

      {/* Edit Dialogs */}
      <EditEligibilityDialog
        open={eligibilityDialogOpen}
        onClose={() => setEligibilityDialogOpen(false)}
        eligibility={company.eligibility}
        onSave={handleSaveEligibility}
      />

      <EditRoleDialog
        open={roleDialogOpen}
        onClose={() => setRoleDialogOpen(false)}
        role={company.role}
        onSave={handleSaveRole}
      />

      <EditRoundsDialog
        open={roundsDialogOpen}
        onClose={() => setRoundsDialogOpen(false)}
        rounds={company.rounds}
        onSave={handleSaveRounds}
      />
    </Box>
  );
};

export default CompanyDetails; 