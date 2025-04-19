import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  requirements: [String],
  eligibilityCriteria: {
    minimumCgpa: {
      type: Number,
      required: true
    },
    allowedBranches: {
      type: [String],
      required: true
    },
    maximumBacklogs: {
      type: Number,
      default: 0
    },
    batch: String
  },
  package: {
    ctc: {
      type: Number,
      required: true
    },
    breakup: String
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'upcoming'],
    default: 'upcoming'
  },
  maxPositions: {
    type: Number,
    required: true
  },
  filledPositions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add indexes
jobSchema.index({ companyId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ 'eligibilityCriteria.minimumCgpa': 1 });

export default mongoose.model('Job', jobSchema); 