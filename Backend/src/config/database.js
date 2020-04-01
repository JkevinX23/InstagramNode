import mongoose from 'mongoose';
import uriConnection from '../keys';

class ServerDatabase {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      uriConnection.URI,
      { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true },
    );
    console.log('RODOU');
  }
}

export default new ServerDatabase();
