import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Button, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid,
  Slider,
  Divider,
  Chip,
  Autocomplete
} from '@mui/material';

const FilterModal = ({ open, onClose, onApply }) => {
  const [cgpaRange, setCgpaRange] = useState([6.0, 10.0]);
  const [department, setDepartment] = useState('');
  const [placementStatus, setPlacementStatus] = useState('');
  const [packageRange, setPackageRange] = useState([0, 30]);
  const [company, setCompany] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Sample skills list - you can replace this with actual skills from your backend
  const skillsList = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
    'Angular', 'Vue.js', 'SQL', 'MongoDB', 'AWS', 'Docker',
    'Kubernetes', 'Machine Learning', 'Data Science', 'DevOps',
    'Cloud Computing', 'Artificial Intelligence', 'Blockchain',
    'Cybersecurity'
  ];

  const handleApply = () => {
    const filterCriteria = {
      cgpaMin: cgpaRange[0],
      cgpaMax: cgpaRange[1],
      department: department || null,
      placementStatus: placementStatus || null,
      packageMin: packageRange[0],
      packageMax: packageRange[1],
      company: company || null,
      skills: selectedSkills.length > 0 ? selectedSkills : null
    };
    onApply(filterCriteria);
    onClose();
  };

  const handleReset = () => {
    setCgpaRange([6.0, 10.0]);
    setDepartment('');
    setPlacementStatus('');
    setPackageRange([0, 30]);
    setCompany('');
    setSelectedSkills([]);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        bgcolor: 'white', 
        padding: 4, 
        borderRadius: 2, 
        width: 600, 
        maxWidth: '90%',
        margin: 'auto', 
        mt: '10%', 
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: 24 
      }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32', mb: 3 }}>
          Filter Student Data
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom>CGPA Range</Typography>
            <Slider
              value={cgpaRange}
              onChange={(e, newValue) => setCgpaRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={0.1}
              sx={{ 
                color: '#2E7D32',
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#2E7D32'
                }
              }}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">Min: {cgpaRange[0]}</Typography>
              <Typography variant="caption">Max: {cgpaRange[1]}</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="">All Departments</MenuItem>
                <MenuItem value="CSE">Computer Science</MenuItem>
                <MenuItem value="ECE">Electronics</MenuItem>
                <MenuItem value="EEE">Electrical</MenuItem>
                <MenuItem value="MECH">Mechanical</MenuItem>
                <MenuItem value="CIVIL">Civil</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Placement Status</InputLabel>
              <Select
                value={placementStatus}
                label="Placement Status"
                onChange={(e) => setPlacementStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Placed">Placed</MenuItem>
                <MenuItem value="Not Placed">Not Placed</MenuItem>
                <MenuItem value="In Process">In Process</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Typography gutterBottom>Package Range (LPA)</Typography>
            <Slider
              value={packageRange}
              onChange={(e, newValue) => setPackageRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={50}
              step={1}
              sx={{ 
                color: '#2E7D32',
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#2E7D32'
                }
              }}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">Min: {packageRange[0]} LPA</Typography>
              <Typography variant="caption">Max: {packageRange[1]} LPA</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Filter by company name"
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={skillsList}
              value={selectedSkills}
              onChange={(event, newValue) => setSelectedSkills(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  placeholder="Select skills"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{
                      bgcolor: '#2E7D32',
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white'
                      }
                    }}
                  />
                ))
              }
            />
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleReset}
            sx={{ color: '#2E7D32', borderColor: '#2E7D32' }}
          >
            Reset Filters
          </Button>
          <Box>
            <Button 
              variant="outlined" 
              onClick={onClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleApply}
              sx={{ 
                bgcolor: '#2E7D32',
                '&:hover': {
                  bgcolor: '#1B5E20'
                }
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal; 