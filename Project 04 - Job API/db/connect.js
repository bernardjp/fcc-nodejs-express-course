import mongoose from 'mongoose';

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // options not supported on versions 6.0+
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
}

export default connectDB;
