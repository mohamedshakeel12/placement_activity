import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  CircularProgress
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

const StudentDataPopup = ({ open, onClose, data, loading, onDownload, filterCriteria }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!data || data.length === 0) {
    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Filtered Student Data</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography align="center" p={3}>
              No student data found matching the filter criteria.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Filtered Student Data</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>Applied Filters:</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {Object.entries(filterCriteria).map(([key, value]) => 
              value && (
                <Chip 
                  key={key} 
                  label={`${key}: ${Array.isArray(value) ? value.join(', ') : value}`} 
                  color="primary" 
                  size="small" 
                  sx={{ bgcolor: '#2E7D32' }}
                />
              )
            )}
          </Box>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>CGPA</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Package (LPA)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow key={student.rollNo}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {student.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            bgcolor: '#E8F5E9',
                            color: '#2E7D32',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={student.placementStatus}
                      size="small"
                      sx={{
                        bgcolor: student.placementStatus === 'Placed' ? '#E8F5E9' :
                                student.placementStatus === 'Not Placed' ? '#FFEBEE' :
                                '#FFF3E0',
                        color: student.placementStatus === 'Placed' ? '#2E7D32' :
                               student.placementStatus === 'Not Placed' ? '#C62828' :
                               '#EF6C00'
                      }}
                    />
                  </TableCell>
                  <TableCell>{student.company || '-'}</TableCell>
                  <TableCell>{student.package || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          onClick={onDownload}
          startIcon={<DownloadIcon />}
          variant="contained"
          sx={{
            bgcolor: '#2E7D32',
            '&:hover': {
              bgcolor: '#1B5E20'
            }
          }}
        >
          Download CSV
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDataPopup; 