import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  industry: String,
  website: String,
  contactInfo: {
    name: String,
    email: {
      type: String,
      required: true
    },
    phone: String,
    designation: String
  },
  placementHistory: [{
    year: Number,
    studentsHired: Number,
    averagePackage: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add indexes for frequently queried fields
companySchema.index({ name: 1 });
companySchema.index({ 'contactInfo.email': 1 });
companySchema.index({ isActive: 1 });

export default mongoose.model('Company', companySchema); 