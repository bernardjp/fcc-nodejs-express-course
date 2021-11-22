import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  }
});

// Model middleware
userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance methods
userSchema.methods.createJWT = function() {
  return jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
