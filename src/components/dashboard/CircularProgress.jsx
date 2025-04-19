import React from 'react';
import { Box, Typography } from '@mui/material';

const CircularProgressWithLabel = ({ value, total, label }) => {
  const percentage = (value / total) * 100;
  const strokeWidth = 10;
  const size = 200;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <Box sx={{ 
      position: 'relative', 
      display: 'inline-flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      p: 2,
      bgcolor: '#FFFBEB', // Light cream background
      borderRadius: 2,
      width: '100%'
    }}>
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        <svg viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E8F5E9" // Very light green background
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2E7D32" // Dark green progress
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: 'stroke-dashoffset 0.5s ease'
            }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#2E7D32',
              fontWeight: 500,
              lineHeight: 1
            }}
          >
            {value}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#757575',
              mt: 0.5 
            }}
          >
            of {total}
          </Typography>
        </Box>
      </Box>
      <Typography 
        variant="h6" 
        sx={{ 
          mt: 2,
          color: '#2E7D32',
          fontWeight: 500
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CircularProgressWithLabel; 