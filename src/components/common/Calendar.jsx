import React from 'react';
import { Box, Typography, Grid, IconButton, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Calendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const DayCell = ({ day, isToday, hasEvent }) => (
    <Box
      sx={{
        width: 35,
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        cursor: 'pointer',
        position: 'relative',
        bgcolor: isToday ? '#2e7d32' : 'transparent',
        color: isToday ? 'white' : 'inherit',
        '&:hover': {
          bgcolor: isToday ? '#2e7d32' : 'rgba(46, 125, 50, 0.08)'
        }
      }}
    >
      {day}
      {hasEvent && (
        <Box
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: isToday ? 'white' : '#2e7d32',
            position: 'absolute',
            bottom: 2
          }}
        />
      )}
    </Box>
  );

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        borderRadius: 2,
        bgcolor: '#FFFBEB'
      }}
    >
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <IconButton size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 500 }}>
            {currentMonth} {currentYear}
          </Typography>
          <IconButton size="small">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>

        <Grid container spacing={1}>
          {days.map(day => (
            <Grid item key={day} xs={12/7}>
              <Typography 
                align="center" 
                variant="caption" 
                sx={{ 
                  fontWeight: 500,
                  color: 'text.secondary'
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <Grid item key={i} xs={12/7}>
              <DayCell 
                day={i + 1} 
                isToday={i + 1 === currentDate.getDate()}
                hasEvent={[4, 15, 25].includes(i + 1)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Calendar; 