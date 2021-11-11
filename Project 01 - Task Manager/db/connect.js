import mongoose from 'mongoose';

export const connectDB = (dbURL) => {
  const optionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

  return mongoose.connect(dbURL,optionConfig);
}
