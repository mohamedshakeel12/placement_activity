import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const CompanyDetail = ({ company, onClose }) => {
  const upcomingDrives = [
    { 
      date: '2/1/25',
      company: company.name,
      role: 'core',
      position: 'developer',
      status: 'Apply'
    },
    { 
      date: '2/1/25',
      company: company.name,
      role: 'IT',
      position: 'developer',
      status: 'Apply'
    }
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Company Profile */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Avatar 
                variant="square" 
                sx={{ width: 80, height: 80, bgcolor: '#eee' }}
              >
                {company.name[0]}
              </Avatar>
              <Box>
                <Typography variant="h5">{company.name}</Typography>
                <Chip 
                  icon={<BusinessIcon />}
                  label={company.industry} 
                  size="small" 
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>

            <Typography variant="body2" paragraph>
              {company.description}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Website: <Link href={company.website} target="_blank" color="primary">
                {company.website}
              </Link>
            </Typography>

            {/* Rounds Details */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Rounds detail:</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  label="Technical - Completed"
                  color="success"
                />
                <Chip 
                  label="HR - Pending"
                />
              </Box>
            </Box>

            {/* Application Status */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Chip label="Applied" variant="outlined" />
              <Chip label="Shortlisted" variant="outlined" />
              <Chip label="Selected" variant="outlined" />
            </Box>
          </Paper>
        </Grid>

        {/* Right Side Panels */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Eligibility Criteria */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Eligibility criteria:
                </Typography>
                <Typography>CGPA: 7.0</Typography>
                <Typography>Branches: CSE, IT, ECE</Typography>
                <Typography>Backlog: No active backlog</Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                >
                  Apply
                </Button>
              </Paper>
            </Grid>

            {/* Role Details */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Role details:
                </Typography>
                <Typography>Position: Developer</Typography>
                <Typography>Type: Core</Typography>
                <Typography>Package: 8-12 LPA</Typography>
              </Paper>
            </Grid>

            {/* Previous Years */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Previous year interview exp
                </Typography>
                {['2023', '2022', '2021'].map((year) => (
                  <Button 
                    key={year}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    {year}
                  </Button>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Upcoming Drives Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming companies
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingDrives.map((drive, index) => (
                    <TableRow key={index}>
                      <TableCell>{drive.date}</TableCell>
                      <TableCell>{drive.company}</TableCell>
                      <TableCell>{drive.role}</TableCell>
                      <TableCell>{drive.position}</TableCell>
                      <TableCell>
                        <Button 
                          variant="contained"
                          size="small"
                          sx={{ bgcolor: '#4CAF50' }}
                        >
                          {drive.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDetail; 