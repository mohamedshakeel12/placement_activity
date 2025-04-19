import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Chip,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useAuth } from '../context/AuthContext';

// Edit Academic Info Dialog Component
const EditAcademicInfoDialog = ({ open, onClose, academicInfo, onSave }) => {
  const [editedInfo, setEditedInfo] = useState(academicInfo);
  const [error, setError] = useState('');

  const handleSave = () => {
    // Validate CGPA
    const cgpa = parseFloat(editedInfo.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      setError('CGPA must be between 0 and 10');
      return;
    }

    // Validate Current Year
    const year = parseInt(editedInfo.currentYear);
    if (isNaN(year) || year < 1 || year > 5) {
      setError('Current Year must be between 1 and 5');
      return;
    }

    // Validate Active Backlogs
    const backlogs = parseInt(editedInfo.activeBacklogs);
    if (isNaN(backlogs) || backlogs < 0) {
      setError('Active Backlogs cannot be negative');
      return;
    }

    onSave(editedInfo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Academic Information</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="CGPA"
            type="number"
            value={editedInfo.cgpa}
            onChange={(e) => setEditedInfo({ ...editedInfo, cgpa: e.target.value })}
            inputProps={{ step: 0.01, min: 0, max: 10 }}
            fullWidth
            required
          />
          <TextField
            label="Current Year"
            type="number"
            value={editedInfo.currentYear}
            onChange={(e) => setEditedInfo({ ...editedInfo, currentYear: e.target.value })}
            inputProps={{ min: 1, max: 5 }}
            fullWidth
            required
          />
          <TextField
            label="Active Backlogs"
            type="number"
            value={editedInfo.activeBacklogs}
            onChange={(e) => setEditedInfo({ ...editedInfo, activeBacklogs: e.target.value })}
            inputProps={{ min: 0 }}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave}
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
  );
};

// Sample profile data
const SAMPLE_PROFILE_DATA = {
  personalInfo: {
    name: "John Doe",
    dateOfBirth: "1999-05-15",
    gender: "Male",
    contactNumber: "+91 9876543210",
    address: "123 College Street, Chennai"
  },
  academicInfo: {
    branch: "Computer Science",
    currentYear: 4,
    cgpa: 8.7,
    activeBacklogs: 0,
    batch: "2020-2024"
  },
  skills: ["React", "JavaScript", "Node.js", "Python", "Java"],
  registeredJobs: 6,
  pendingApplications: 3,
  missedOpportunities: 1,
  appliedCompanies: [
    { name: "Google", status: "Applied" },
    { name: "Microsoft", status: "Shortlisted" },
    { name: "Amazon", status: "Rejected" },
    { name: "Meta", status: "Applied" },
    { name: "Apple", status: "Shortlisted" }
  ],
  resumeUrl: null,
  certifications: [],
  offerLetterUrl: null
};

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(SAMPLE_PROFILE_DATA);
  const [skills, setSkills] = useState([]);
  const [newSkillDialogOpen, setNewSkillDialogOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skillError, setSkillError] = useState('');
  const [editAcademicDialogOpen, setEditAcademicDialogOpen] = useState(false);
  
  // Explicitly define all three document types
  const documentTypes = [
    {
      type: 'resume',
      title: 'RESUME',
      description: 'Upload your latest resume (PDF only, max 5MB)'
    },
    {
      type: 'certificate',
      title: 'CERTIFICATES',
      description: 'Upload your certificates in PDF format (max 5MB)'
    },
    {
      type: 'offerLetter',
      title: 'OFFER LETTER',
      description: 'Upload your offer letter in PDF format (max 5MB)'
    }
  ];

  // Initialize upload status with all document types
  const [uploadStatus, setUploadStatus] = useState({
    resume: { 
      file: null, 
      uploading: false, 
      error: null, 
      success: null 
    },
    certificate: { 
      file: null, 
      uploading: false, 
      error: null, 
      success: null 
    },
    offerLetter: { 
      file: null, 
      uploading: false, 
      error: null, 
      success: null 
    }
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Current user:', currentUser);
        console.log('Initial upload status:', uploadStatus);
        
        if (!currentUser) {
          throw new Error('No user data available');
        }

        // Merge current user data with sample data
        const mergedData = {
          ...SAMPLE_PROFILE_DATA,
          personalInfo: {
            ...SAMPLE_PROFILE_DATA.personalInfo,
            name: currentUser.name,
          },
          academicInfo: {
            ...SAMPLE_PROFILE_DATA.academicInfo,
            branch: currentUser.department,
            cgpa: currentUser.cgpa || SAMPLE_PROFILE_DATA.academicInfo.cgpa,
          },
          skills: currentUser.skills || [],
        };

        console.log('Merged profile data:', mergedData);
        
        setProfileData(mergedData);
        setSkills(currentUser.skills || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  const handleFileUpload = (type) => (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    console.log(`Uploading ${type} file:`, file);

    if (file.type !== 'application/pdf') {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { 
          ...prev[type],
          error: 'Only PDF files are allowed',
          uploading: false,
          success: null
        }
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { 
          ...prev[type],
          error: 'File size should be less than 5MB',
          uploading: false,
          success: null
        }
      }));
      return;
    }

    setUploadStatus(prev => ({
      ...prev,
      [type]: { 
        ...prev[type], 
        uploading: true, 
        error: null,
        success: null 
      }
    }));

    // Simulate upload
    setTimeout(() => {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { 
          file, 
          uploading: false, 
          error: null,
          success: 'File uploaded successfully!' 
        }
      }));

      // Update profile data
      setProfileData(prev => ({
        ...prev,
        [`${type}Url`]: URL.createObjectURL(file)
      }));

      console.log(`Upload completed for ${type}:`, file.name);
    }, 1500);
  };

  const handleRemoveFile = (type) => {
    setUploadStatus(prev => ({
      ...prev,
      [type]: { 
        ...prev[type], 
        uploading: true,
        success: null,
        error: null 
      }
    }));

    // Simulate removal
    setTimeout(() => {
      setUploadStatus(prev => ({
        ...prev,
        [type]: { 
          file: null, 
          uploading: false, 
          error: null,
          success: 'File removed successfully!' 
        }
      }));

      // Update profile data
      setProfileData(prev => ({
        ...prev,
        [`${type}Url`]: null
      }));
    }, 1000);
  };

  const handleAddSkill = () => {
    const skillToAdd = newSkillInput.trim();
    
    // Validate skill input
    if (!skillToAdd) {
      setSkillError('Skill cannot be empty');
      return;
    }

    if (skillToAdd.length < 2) {
      setSkillError('Skill must be at least 2 characters long');
      return;
    }

    if (skills.includes(skillToAdd)) {
      setSkillError('This skill already exists');
      return;
    }

    // Add the new skill
    setSkills(prevSkills => [...prevSkills, skillToAdd]);
    
    // Update profile data
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, skillToAdd]
    }));

    // Reset the form
    setNewSkillInput('');
    setSkillError('');
    setNewSkillDialogOpen(false);
  };

  const handleRemoveSkill = (skillToRemove) => {
    // Remove the skill
    setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove));
    
    // Update profile data
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillDialogClose = () => {
      setNewSkillInput('');
    setSkillError('');
      setNewSkillDialogOpen(false);
  };

  const handleSaveAcademicInfo = async (updatedInfo) => {
    try {
      // In a real app, this would be an API call
      setProfileData({
        ...profileData,
        academicInfo: updatedInfo
      });
      // Show success message or handle response
    } catch (error) {
      console.error('Error updating academic info:', error);
      // Show error message
    }
  };

  const renderUploadSection = (type, title, description) => {
    console.log('Rendering upload section:', { type, title, description });
    
    const status = uploadStatus[type]; // Use the type directly without toLowerCase()
    console.log('Upload status for', type, ':', status);

    if (!status) {
      console.error('No upload status found for type:', type);
      return null;
    }

    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            {title}
          </Typography>
          
          {status.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {status.error}
            </Alert>
          )}

          {status.success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {status.success}
            </Alert>
          )}

          <Paper 
            sx={{ 
              p: 3,
              border: '2px dashed #ccc',
              textAlign: 'center',
              cursor: status.uploading ? 'not-allowed' : 'pointer',
              bgcolor: status.file ? 'rgba(46, 125, 50, 0.04)' : 'rgba(0, 0, 0, 0.02)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: status.uploading ? '#ccc' : '#2E7D32',
                bgcolor: status.uploading ? 'rgba(0, 0, 0, 0.02)' : 'rgba(46, 125, 50, 0.04)'
              }
            }}
            component="label"
          >
            {status.uploading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress size={40} sx={{ color: '#2E7D32', mb: 2 }} />
                <Typography>Uploading...</Typography>
              </Box>
            ) : status.file ? (
              <>
                <PictureAsPdfIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
                <Typography sx={{ mt: 2, fontWeight: 'medium' }}>
                  {status.file.name}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveFile(type);
                    }}
                    color="error"
                    disabled={status.uploading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={handleFileUpload(type)}
                  disabled={status.uploading}
                />
                <CloudUploadIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
                <Typography sx={{ mt: 2, mb: 1, fontWeight: 'medium' }}>
                  Drop your {title.toLowerCase()} here
                </Typography>
                <Typography variant="caption" color="text.secondary" align="center">
                  {description}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={status.uploading}
                  sx={{ 
                    mt: 2,
                    color: '#2E7D32',
                    borderColor: '#2E7D32',
                    '&:hover': {
                      borderColor: '#1B5E20',
                      bgcolor: 'rgba(46, 125, 50, 0.08)'
                    }
                  }}
                >
                  Browse Files
                </Button>
              </>
            )}
          </Paper>

          {status.file && profileData[`${type}Url`] && (
            <Button
              variant="text"
              size="small"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => window.open(profileData[`${type}Url`], '_blank')}
              sx={{ mt: 2, color: '#2E7D32' }}
            >
              Preview Document
            </Button>
          )}
        </Paper>
      </Box>
    );
  };

  // Document upload section component
  const DocumentUploads = () => {
    console.log('Document types:', documentTypes);
    
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Document Uploads
        </Typography>
        <Grid container spacing={3}>
          {documentTypes.map(({ type, title, description }) => (
            <Grid item xs={12} md={4} key={type}>
              {renderUploadSection(type, title, description)}
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  // Show empty state if no profile data
  if (!profileData) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 4 }}>
          No profile data available. Please try logging in again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Typography color="text.primary">Profile</Typography>
          </Breadcrumbs>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            View and manage your profile information
          </Typography>
        </Box>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: '#2E7D32',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    mr: 2
                  }}
                >
                  {profileData.personalInfo.name[0]}
                </Box>
                <Box>
                  <Typography variant="h5">
                    {profileData.personalInfo.name}
                  </Typography>
            <Typography color="text.secondary">
                    {profileData.academicInfo.branch} • {profileData.academicInfo.batch}
            </Typography>
                </Box>
              </Box>

              {/* Academic Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Academic Information
                  </Typography>
                  <IconButton 
                    onClick={() => setEditAcademicDialogOpen(true)}
                    sx={{ 
                      color: '#2E7D32',
                      '&:hover': {
                        bgcolor: 'rgba(46, 125, 50, 0.1)'
                      }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      CGPA
                    </Typography>
                    <Typography variant="body1">
                      {profileData.academicInfo.cgpa}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Current Year
                    </Typography>
                    <Typography variant="body1">
                      {profileData.academicInfo.currentYear}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Active Backlogs
                    </Typography>
                    <Typography variant="body1">
                      {profileData.academicInfo.activeBacklogs}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Edit Academic Info Dialog */}
              <EditAcademicInfoDialog
                open={editAcademicDialogOpen}
                onClose={() => setEditAcademicDialogOpen(false)}
                academicInfo={profileData.academicInfo}
                onSave={handleSaveAcademicInfo}
              />

              {/* Skills */}
              <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                  Skills
            </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {skills.map((skill, index) => (
              <Chip
                    key={index}
                label={skill}
                    size="small"
                      onDelete={() => handleRemoveSkill(skill)}
                      sx={{ 
                        bgcolor: 'rgba(46, 125, 50, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(46, 125, 50, 0.2)'
                        }
                      }}
              />
            ))}
                <Chip
                  icon={<AddIcon />}
                    label="Add Skill"
                  size="small"
                  variant="outlined"
                    onClick={() => setNewSkillDialogOpen(true)}
                    sx={{ 
                      cursor: 'pointer',
                      borderColor: '#2E7D32',
                      color: '#2E7D32',
                      '&:hover': {
                        bgcolor: 'rgba(46, 125, 50, 0.1)',
                        borderColor: '#1B5E20'
                      }
                    }}
                  />
                </Box>
        </Box>
      </Paper>

            {/* Companies Applied */}
        <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Companies Applied
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {profileData.appliedCompanies.map((company, index) => (
                  <Paper 
                    key={index} 
              variant="outlined" 
                    sx={{ 
                      p: 2,
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography>{company.name}</Typography>
                    <Chip
                      label={company.status}
                      color={
                        company.status === 'Applied' ? 'primary' :
                        company.status === 'Shortlisted' ? 'success' : 'error'
                      }
              size="small"
                      sx={{
                        bgcolor: company.status === 'Applied' ? 'rgba(46, 125, 50, 0.1)' :
                                company.status === 'Shortlisted' ? 'rgba(46, 125, 50, 0.1)' :
                                'rgba(244, 67, 54, 0.1)',
                        color: company.status === 'Applied' ? '#2E7D32' :
                               company.status === 'Shortlisted' ? '#2E7D32' :
                               '#F44336'
                      }}
                    />
                  </Paper>
                ))}
          </Box>
        </Paper>
      </Grid>

          {/* Right Column - Stats and Documents */}
          <Grid item xs={12} md={8}>
            {/* Statistics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    bgcolor: 'rgba(46, 125, 50, 0.1)', 
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 40, color: '#2E7D32', mb: 1 }} />
                  <Typography variant="h3" gutterBottom>
                    {profileData.registeredJobs}
                  </Typography>
                  <Typography>Registered</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    bgcolor: 'rgba(255, 152, 0, 0.1)', 
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <PendingIcon sx={{ fontSize: 40, color: '#FF9800', mb: 1 }} />
                  <Typography variant="h3" gutterBottom>
                    {profileData.pendingApplications}
                  </Typography>
                  <Typography>Pending</Typography>
        </Paper>
      </Grid>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    bgcolor: 'rgba(244, 67, 54, 0.1)', 
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  <CancelIcon sx={{ fontSize: 40, color: '#F44336', mb: 1 }} />
                  <Typography variant="h3" gutterBottom>
                    {profileData.missedOpportunities}
                  </Typography>
                  <Typography>Missed</Typography>
        </Paper>
              </Grid>
      </Grid>

            {/* Document Uploads */}
            <DocumentUploads />
          </Grid>
      </Grid>
    </Box>

      {/* Add Skill Dialog */}
      <Dialog 
        open={newSkillDialogOpen} 
        onClose={handleSkillDialogClose}
        PaperProps={{
          sx: { minWidth: '300px' }
        }}
      >
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Skill"
            fullWidth
            value={newSkillInput}
            onChange={(e) => {
              setNewSkillInput(e.target.value);
              setSkillError(''); // Clear error when user types
            }}
            error={!!skillError}
            helperText={skillError}
            sx={{ mt: 2 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleSkillDialogClose}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddSkill}
            variant="contained"
            sx={{ 
              bgcolor: '#2E7D32', 
              '&:hover': { 
                bgcolor: '#1B5E20' 
              } 
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 