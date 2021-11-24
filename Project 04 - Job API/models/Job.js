import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    maxlength: [50, 'Company name is longer than the maximum allowed length (50)']
  },
  position: {
    type: String,
    required: [true, 'Please provide a position description'],
    maxlength: [255, 'Position name is longer than the maximum allowed length (255)']
  },
  status: {
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user']
  }
}, { timestamps: true });

const JobModel = mongoose.model('Job', jobSchema);

export default JobModel;
