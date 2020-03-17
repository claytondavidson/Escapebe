import { connect } from 'mongoose';
import { get } from 'config';

export const connectMongo = async () => {
  try {
    await connect(get('mongo'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('connected to mongodb');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
