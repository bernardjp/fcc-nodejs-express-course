import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean
  },
  company: {
    type: String
  },
  rating: {
    type: Number
  }
});

export const productModel = mongoose.model('product', ProductSchema);
