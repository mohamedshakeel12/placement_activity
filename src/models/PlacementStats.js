import mongoose from 'mongoose';

const placementStatsSchema = new mongoose.Schema({
  year: Number,
  totalStudents: {
    type: Number,
    default: 800 // Total available students
  },
  studentsPlaced: {
    type: Number,
    default: 450 // Currently placed students
  },
  companies: {
    type: Number,
    default: 85
  },
  offers: {
    type: Number,
    default: 520
  },
  students: {
    type: Number,
    default: 500
  },
  averageCTC: {
    type: Number,
    default: 8.5 // in LPA
  },
  packageDistribution: [{
    count: Number,
    range: String,
    package: String
  }],
  upcomingCompanies: [{
    date: Date,
    company: String,
    role: String,
    position: String,
    status: String
  }]
}, { timestamps: true });

export default mongoose.model('PlacementStats', placementStatsSchema); 