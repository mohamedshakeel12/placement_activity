import React, { useState } from 'react';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterModal from './FilterModal';

const DownloadReport = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleDownload = async (filterCriteria) => {
    try {
      // Fetch student data from your API
      const response = await fetch('/api/students');
      let students = await response.json();

      // Apply filters
      if (filterCriteria) {
        students = students.filter(student => {
          let meetsFilter = true;

          // CGPA filter
          if (filterCriteria.cgpaMin !== undefined && filterCriteria.cgpaMax !== undefined) {
            meetsFilter = meetsFilter && 
              student.cgpa >= filterCriteria.cgpaMin && 
              student.cgpa <= filterCriteria.cgpaMax;
          }

          // Department filter
          if (filterCriteria.department) {
            meetsFilter = meetsFilter && student.department === filterCriteria.department;
          }

          // Placement status filter
          if (filterCriteria.placementStatus) {
            meetsFilter = meetsFilter && student.placementStatus === filterCriteria.placementStatus;
          }

          // Package range filter
          if (filterCriteria.packageMin !== undefined && filterCriteria.packageMax !== undefined && student.package) {
            meetsFilter = meetsFilter && 
              student.package >= filterCriteria.packageMin && 
              student.package <= filterCriteria.packageMax;
          }

          // Company filter
          if (filterCriteria.company) {
            meetsFilter = meetsFilter && 
              (student.placedCompany?.toLowerCase().includes(filterCriteria.company.toLowerCase()) ||
               student.appliedCompanies?.some(company => 
                 company.toLowerCase().includes(filterCriteria.company.toLowerCase())
               ));
          }

          // Skills filter
          if (filterCriteria.skills && filterCriteria.skills.length > 0) {
            meetsFilter = meetsFilter && 
              filterCriteria.skills.every(skill => 
                student.skills?.includes(skill)
              );
          }

          return meetsFilter;
        });
      }

      // Convert filtered data to CSV
      const headers = [
        'Name',
        'Email',
        'Department',
        'CGPA',
        'Skills',
        'Placement Status',
        'Package (LPA)',
        'Placed Company',
        'Applied Companies'
      ];

      const csvData = [
        headers.join(','),
        ...students.map(student => [
          student.name || '',
          student.email || '',
          student.department || '',
          student.cgpa || '',
          (student.skills || []).join(';'),
          student.placementStatus || '',
          student.package || '',
          student.placedCompany || '',
          (student.appliedCompanies || []).join(';')
        ].join(','))
      ].join('\n');

      // Create and download CSV file
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `student_report_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error downloading report:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FileDownloadIcon />}
        onClick={() => setIsFilterModalOpen(true)}
        sx={{
          bgcolor: '#2E7D32',
          '&:hover': {
            bgcolor: '#1B5E20'
          }
        }}
      >
        Download Report
      </Button>

      <FilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(filterCriteria) => {
          handleDownload(filterCriteria);
          setIsFilterModalOpen(false);
        }}
      />
    </>
  );
};

export default DownloadReport; 