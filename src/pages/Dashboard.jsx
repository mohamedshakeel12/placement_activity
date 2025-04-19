import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Alert,
  Paper,
  Container,
  Tooltip,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Zoom,
  Fade
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgressWithLabel from '../components/dashboard/CircularProgress';
import PlacementStats from '../components/dashboard/PlacementStats';
import PackageDistribution from '../components/dashboard/PackageDistribution';
import UpcomingCompanies from '../components/dashboard/UpcomingCompanies';
import Calendar from '../components/common/Calendar';
import { useDashboard } from '../context/DashboardContext';
import DownloadReport from '../components/common/DownloadReport';
import FilterModal from '../components/common/FilterModal';
import StudentDataPopup from '../components/common/StudentDataPopup';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { stats, loading, error, refreshData } = useDashboard();
  const [modalOpen, setModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeCard, setActiveCard] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [dataPopupOpen, setDataPopupOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const { currentUser, isStudent, isPlacementOfficer } = useAuth();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApplyFilters = (criteria) => {
    setFilterCriteria(criteria);
    fetchFilteredStudentData(criteria);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCardHover = (cardId) => {
    setActiveCard(cardId);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      if (refreshData) refreshData();
      setSnackbarMessage('Dashboard data refreshed!');
      setSnackbarOpen(true);
      setIsRefreshing(false);
    }, 1000);
  };

  const fetchFilteredStudentData = async (criteria) => {
    setDataLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockStudents = [
        { name: 'John Doe', rollNo: '2021001', department: 'CSE', cgpa: 9.2, placementStatus: 'Placed', company: 'Google', package: 25, skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'] },
        { name: 'Jane Smith', rollNo: '2021002', department: 'ECE', cgpa: 8.7, placementStatus: 'Placed', company: 'Microsoft', package: 20, skills: ['C++', 'VLSI', 'Embedded Systems', 'IoT'] },
        { name: 'Robert Johnson', rollNo: '2021003', department: 'CSE', cgpa: 7.9, placementStatus: 'Placed', company: 'Amazon', package: 18, skills: ['Java', 'Spring Boot', 'AWS', 'Docker'] },
        { name: 'Emily Davis', rollNo: '2021004', department: 'EEE', cgpa: 8.1, placementStatus: 'Not Placed', company: null, package: null, skills: ['Power Systems', 'Control Systems', 'MATLAB'] },
        { name: 'Michael Brown', rollNo: '2021005', department: 'MECH', cgpa: 7.5, placementStatus: 'In Process', company: null, package: null, skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics'] },
        { name: 'Sarah Wilson', rollNo: '2021006', department: 'CSE', cgpa: 9.5, placementStatus: 'Placed', company: 'Apple', package: 30, skills: ['iOS Development', 'Swift', 'React Native', 'Firebase'] },
        { name: 'David Miller', rollNo: '2021007', department: 'CIVIL', cgpa: 7.2, placementStatus: 'Not Placed', company: null, package: null, skills: ['AutoCAD', 'Revit', 'Structural Analysis'] },
        { name: 'Jennifer Taylor', rollNo: '2021008', department: 'ECE', cgpa: 8.4, placementStatus: 'Placed', company: 'IBM', package: 15, skills: ['Digital Electronics', 'PCB Design', 'Arduino'] },
        { name: 'James Anderson', rollNo: '2021009', department: 'CSE', cgpa: 8.9, placementStatus: 'Placed', company: 'Facebook', package: 22, skills: ['React', 'GraphQL', 'TypeScript', 'MongoDB'] },
        { name: 'Lisa Thomas', rollNo: '2021010', department: 'EEE', cgpa: 7.8, placementStatus: 'In Process', company: null, package: null, skills: ['PLC', 'SCADA', 'Industrial Automation'] },
        { name: 'Daniel Jackson', rollNo: '2021011', department: 'MECH', cgpa: 8.0, placementStatus: 'Placed', company: 'Tesla', package: 19, skills: ['CAE', 'ANSYS', 'Product Design'] },
        { name: 'Jessica White', rollNo: '2021012', department: 'CSE', cgpa: 9.1, placementStatus: 'Placed', company: 'Netflix', package: 24, skills: ['Full Stack', 'Cloud Computing', 'System Design'] },
        { name: 'Matthew Harris', rollNo: '2021013', department: 'CIVIL', cgpa: 7.4, placementStatus: 'Not Placed', company: null, package: null, skills: ['Construction Management', 'AutoCAD', 'GIS'] },
        { name: 'Amanda Martin', rollNo: '2021014', department: 'ECE', cgpa: 8.6, placementStatus: 'Placed', company: 'Adobe', package: 17, skills: ['Signal Processing', 'Image Processing', 'Python'] },
        { name: 'Christopher Thompson', rollNo: '2021015', department: 'CSE', cgpa: 9.3, placementStatus: 'Placed', company: 'Oracle', package: 21, skills: ['Java', 'Database Design', 'Cloud Architecture'] }
      ];
      
      // Filter the mock data based on criteria
      const filteredData = mockStudents.filter(student => {
        const meetsCgpaCriteria = student.cgpa >= criteria.cgpaMin && student.cgpa <= criteria.cgpaMax;
        const meetsDepartmentCriteria = !criteria.department || student.department === criteria.department;
        const meetsStatusCriteria = !criteria.placementStatus || student.placementStatus === criteria.placementStatus;
        const meetsPackageCriteria = 
          !student.package || 
          (student.package >= criteria.packageMin && student.package <= criteria.packageMax);
        const meetsCompanyCriteria = !criteria.company || 
          (student.company && student.company.toLowerCase().includes(criteria.company.toLowerCase()));
        const meetsSkillCriteria = !criteria.skill || 
          (student.skills && student.skills.some(skill => 
            skill.toLowerCase().includes(criteria.skill.toLowerCase())
          ));
        
        return meetsCgpaCriteria && meetsDepartmentCriteria && meetsStatusCriteria && 
               meetsPackageCriteria && meetsCompanyCriteria && meetsSkillCriteria;
      });
      
      setStudentData(filteredData);
      setDataPopupOpen(true);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setSnackbarMessage('Error fetching student data. Please try again.');
      setSnackbarOpen(true);
      setStudentData([]);
      setDataPopupOpen(true);
    } finally {
      setDataLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (!studentData.length) return;
    
    // Convert the filtered data to CSV
    const headers = Object.keys(studentData[0])
      .filter(key => key !== 'skills') // Remove skills from regular columns
      .concat(['skills']); // Add skills as the last column
    
    const rows = studentData.map(student => {
      const regularData = headers
        .filter(header => header !== 'skills')
        .map(header => {
          const value = student[header];
          // Handle values that might contain commas
          return typeof value === 'string' && value.includes(',') ? 
            `"${value}"` : 
            value === null ? '' : value;
        });
      
      // Add skills as a semicolon-separated list
      const skillsString = student.skills.join(';');
      
      return [...regularData, skillsString].join(',');
    }).join('\n');
    
    const csvData = headers.join(',') + '\n' + rows;
    
    // Create a blob and trigger download
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `student_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    setSnackbarMessage('Report downloaded successfully!');
    setSnackbarOpen(true);
  };
  
  console.log('Dashboard stats:', stats);
  console.log('Upcoming companies:', stats?.upcomingCompanies);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box p={3}>
        <Alert severity="info">No dashboard data available</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        py: 3,
        minHeight: '100vh'
      }}>
        {/* Header */}
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#2E7D32',
              letterSpacing: '-0.5px'
            }}
          >
            Dashboard
          </Typography>
            <Tooltip title="Refresh data" arrow>
              <IconButton 
                onClick={handleRefreshData}
                sx={{ ml: 1, color: '#2E7D32' }}
                className={isRefreshing ? 'spin-animation' : ''}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Download Report" arrow>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<DownloadIcon />}
              onClick={handleOpenModal}
            sx={{
              bgcolor: '#2E7D32',
              borderRadius: 2,
                transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#1B5E20',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transform: 'translateY(-2px)'
              }
            }}
          >
            Download Report
          </Button>
          </Tooltip>
        </Box>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Top Row - Key Metrics */}
          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Paper 
                elevation={1}
              sx={{ 
                height: '100%',
                  bgcolor: activeCard === 'students' ? '#F1F8E9' : '#FFFBEB',
                borderRadius: 2,
                  p: 3,
                display: 'flex',
                  flexDirection: 'column',
                alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    bgcolor: '#F1F8E9'
                  }
                }}
                onMouseEnter={() => handleCardHover('students')}
                onMouseLeave={handleCardLeave}
              >
                <IconButton 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    opacity: activeCard === 'students' ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ 
                    position: 'relative',
                    width: 150,
                    height: 150,
                    margin: '0 auto'
                  }}>
              <CircularProgressWithLabel 
                value={stats.studentsPlaced}
                total={stats.totalStudents}
                    />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#2E7D32',
                      mt: 2,
                      fontWeight: 500
                    }}
                  >
                    Students Placed
                  </Typography>
                </Box>
            </Paper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <Paper 
                elevation={1}
                sx={{ 
                  height: '100%',
                  bgcolor: activeCard === 'stats' ? '#F1F8E9' : '#FFFBEB',
                  borderRadius: 2,
                  p: 3,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    bgcolor: '#F1F8E9'
                  }
                }}
                onMouseEnter={() => handleCardHover('stats')}
                onMouseLeave={handleCardLeave}
              >
                <IconButton 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    opacity: activeCard === 'stats' ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#2E7D32',
                      fontWeight: 500
                    }}
                  >
                    Placement Statistics
                  </Typography>
                  <Tooltip title="View detailed statistics" arrow>
                    <IconButton size="small" sx={{ ml: 1, color: '#2E7D32' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Box sx={{ 
                  height: 200, 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
            <PlacementStats stats={stats} />
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-around', 
                  mt: 3,
                  textAlign: 'center'
                }}>
                  <Box sx={{ 
                    transition: 'all 0.3s ease',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(46, 125, 50, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#2E7D32',
                        fontWeight: 'bold'
                      }}
                    >
                      {stats.companies}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#757575',
                        fontWeight: 500
                      }}
                    >
                      Companies
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    transition: 'all 0.3s ease',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(46, 125, 50, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#43A047',
                        fontWeight: 'bold'
                      }}
                    >
                      {stats.offers}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#757575',
                        fontWeight: 500
                      }}
                    >
                      Offers
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    transition: 'all 0.3s ease',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'rgba(46, 125, 50, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#66BB6A',
                        fontWeight: 'bold'
                      }}
                    >
                      {stats.students}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#757575',
                        fontWeight: 500
                      }}
                    >
                      Students
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Paper 
                elevation={1}
              sx={{ 
                height: '100%',
                  bgcolor: activeCard === 'ctc' ? '#F1F8E9' : '#FFFBEB',
                borderRadius: 2,
                  p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    bgcolor: '#F1F8E9'
                  }
                }}
                onMouseEnter={() => handleCardHover('ctc')}
                onMouseLeave={handleCardLeave}
              >
                <IconButton 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    opacity: activeCard === 'ctc' ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#2E7D32',
                    mb: 1,
                    textAlign: 'center'
                }}
              >
                Average CTC
              </Typography>
              <Typography 
                  variant="h1" 
                sx={{ 
                  color: '#2E7D32',
                  lineHeight: 1,
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                }}
              >
                {stats.averageCTC}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#2E7D32',
                  fontWeight: 500,
                  mt: 1
                }}
              >
                LPA
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#757575',
                    mt: 1,
                    fontWeight: 500,
                    textAlign: 'center'
                }}
              >
                Average package offered
              </Typography>
            </Paper>
            </Zoom>
          </Grid>

          {/* Middle Row - Package Distribution */}
          <Grid item xs={12}>
            <Fade in={true} timeout={1000}>
              <Paper 
                elevation={1}
                sx={{ 
                  p: 3, 
                  bgcolor: '#FFFBEB',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2 
                }}>
                  <TrendingUpIcon sx={{ color: '#2E7D32', mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#2E7D32',
                      fontWeight: 500
                    }}
                  >
                    Package Distribution
                  </Typography>
                  <Tooltip title="View detailed package information" arrow>
                    <IconButton size="small" sx={{ ml: 1, color: '#2E7D32' }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Grid container spacing={2}>
                  {stats.packageDistribution.map((item, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Box sx={{ 
                          bgcolor: '#E8F5E9', 
                          p: 2,
                          borderRadius: 2,
                          textAlign: 'center',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: 1,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                            bgcolor: '#C8E6C9'
                          }
                        }}>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              color: '#2E7D32',
                              fontWeight: 500,
                              lineHeight: 1
                            }}
                          >
                            {item.count}
                          </Typography>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: '#757575',
                              fontWeight: 500
                            }}
                          >
                            {item.range}
                          </Typography>
                        </Box>
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          </Grid>

          {/* Bottom Row - Companies & Calendar */}
          <Grid item xs={12} md={8}>
            <Fade in={true} timeout={1000}>
              <Paper 
                elevation={1}
                sx={{ 
                  p: 3, 
                  bgcolor: '#FFFBEB',
                  borderRadius: 2,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#2E7D32',
                    mb: 2
                  }}
                >
                  Upcoming Companies
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Company</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Package</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">Loading...</TableCell>
                        </TableRow>
                      ) : stats?.upcomingCompanies?.length > 0 ? (
                        stats.upcomingCompanies
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((company) => (
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
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">No upcoming companies</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={stats?.upcomingCompanies?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                      color: '#2E7D32'
                    }
                  }}
                />
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000}>
              <Paper 
                elevation={1}
                sx={{ 
                  p: 3, 
                  bgcolor: '#FFFBEB',
                  borderRadius: 2,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#2E7D32',
                    mb: 2
                  }}
                >
                  Schedule
                </Typography>
            <Calendar />
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        {/* Filter Modal */}
        <FilterModal 
          open={modalOpen} 
          onClose={handleCloseModal} 
          onApply={handleApplyFilters} 
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />

        <StudentDataPopup
          open={dataPopupOpen}
          onClose={() => setDataPopupOpen(false)}
          data={studentData}
          loading={dataLoading}
          onDownload={handleDownloadCSV}
          filterCriteria={filterCriteria}
        />

        {isPlacementOfficer() && (
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={800}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                    Generate Reports
                  </Typography>
                  <Tooltip title="Download placement data reports">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" sx={{ color: '#2E7D32' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  Generate and download reports of student placement data. Apply filters to customize your report.
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleOpenModal}
                  sx={{
                    bgcolor: '#2E7D32',
                    '&:hover': {
                      bgcolor: '#1B5E20'
                    }
                  }}
                >
                  Download Report
                </Button>
              </Paper>
            </Zoom>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard; 