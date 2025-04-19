import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    name: { type: String, required: true },
    dateOfBirth: Date,
    gender: String,
    contactNumber: String,
    address: String
  },
  academicInfo: {
    branch: { type: String, required: true },
    currentYear: Number,
    cgpa: Number,
    activeBacklogs: { type: Number, default: 0 },
    batch: String
  },
  skills: [String],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    credentialUrl: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    url: String
  }],
  resumeUrl: String,
  isPlaced: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model('StudentProfile', studentProfileSchema); 