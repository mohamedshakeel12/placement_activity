import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useCallback } from 'react';

const DragDropUpload = ({ title, onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  }, [onFileUpload]);

  return (
    <Box
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? '#4CAF50' : '#ccc',
        borderRadius: 1,
        p: 3,
        textAlign: 'center',
        transition: 'border-color 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#4CAF50'
        }
      }}
    >
      <CloudUploadIcon sx={{ fontSize: 40, color: isDragging ? '#4CAF50' : '#666', mb: 1 }} />
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography color="textSecondary">
        Drag and drop your file here or click to browse
      </Typography>
    </Box>
  );
};

export default DragDropUpload; 