import mongoose from "mongoose";

class serverDatabase {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb+srv://kevin:123@instabackcluster-xgsvg.gcp.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("RODOU");
  }
}

export default new serverDatabase();
