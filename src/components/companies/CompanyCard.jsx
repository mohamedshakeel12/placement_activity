import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Link,
  Divider
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CompanyCard = ({ company, onClick }) => {
  return (
    <Card 
      elevation={3}
      onClick={onClick}
      sx={{ 
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {company.name}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            icon={<BusinessIcon />} 
            label={company.industry} 
            size="small" 
            sx={{ mr: 1 }} 
          />
          {company.placementHistory && company.placementHistory.length > 0 && (
            <Chip 
              icon={<WorkIcon />}
              label={`${company.placementHistory[0].studentsHired} Hired`}
              size="small"
              color="primary"
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {company.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonIcon sx={{ mr: 1, fontSize: 'small' }} />
            {company.contactInfo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.contactInfo.designation}
          </Typography>
          <Link 
            href={company.website} 
            target="_blank" 
            rel="noopener"
            sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
          >
            <LanguageIcon sx={{ mr: 1, fontSize: 'small' }} />
            Company Website
          </Link>
        </Box>

        {company.placementHistory && company.placementHistory.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ mr: 1, fontSize: 'small' }} />
                Placement History ({company.placementHistory[0].year})
              </Typography>
              <Typography variant="body2">
                Students Hired: {company.placementHistory[0].studentsHired}
              </Typography>
              <Typography variant="body2">
                Average Package: ₹{(company.placementHistory[0].averagePackage/100000).toFixed(1)}L
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyCard; 