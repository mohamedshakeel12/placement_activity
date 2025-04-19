import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'interviewed', 'selected', 'rejected'],
    default: 'applied'
  },
  interviewSchedule: {
    date: Date,
    time: String,
    location: String,
    type: {
      type: String,
      enum: ['online', 'offline']
    }
  },
  feedback: String,
  package: {
    ctc: Number,
    breakup: String
  }
}, {
  timestamps: true
});

// Add compound index to prevent multiple applications
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ status: 1 });

// Add methods for status transitions
applicationSchema.methods.updateStatus = async function(newStatus) {
  const validTransitions = {
    applied: ['shortlisted', 'rejected'],
    shortlisted: ['interviewed', 'rejected'],
    interviewed: ['selected', 'rejected'],
    selected: [],
    rejected: []
  };

  if (!validTransitions[this.status].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
  }

  this.status = newStatus;
  return this.save();
};

export default mongoose.model('Application', applicationSchema); 