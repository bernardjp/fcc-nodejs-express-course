import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Name must be provided'],
    trim: true,
    maxlength: [ 20, 'Name can not have more than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Task', TaskSchema);
