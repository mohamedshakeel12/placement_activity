import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Clear existing stats
db.placementStats.drop();

// Insert placement stats
db.placementStats.insertMany([
  {
    year: 2024,
    totalStudents: 120,
    placedStudents: 98,
    averagePackage: 850000,
    highestPackage: 2400000,
    totalCompanies: 45,
    packageDistribution: [
      { range: '3-5 LPA', count: 15 },
      { range: '5-8 LPA', count: 35 },
      { range: '8-12 LPA', count: 30 },
      { range: '12+ LPA', count: 18 }
    ],
    branchWisePlacements: [
      { branch: 'Computer Science', placed: 40, total: 45 },
      { branch: 'Information Technology', placed: 35, total: 38 },
      { branch: 'Electronics', placed: 23, total: 37 }
    ],
    monthWiseOffers: [
      { month: 'Jan', offers: 12 },
      { month: 'Feb', offers: 18 },
      { month: 'Mar', offers: 25 },
      { month: 'Apr', offers: 15 },
      { month: 'May', offers: 28 }
    ],
    topCompanies: [
      {
        name: "Tech Solutions Inc",
        studentsHired: 8,
        averagePackage: 1200000
      },
      {
        name: "Global Systems Ltd",
        studentsHired: 6,
        averagePackage: 850000
      }
    ]
  }
]); 