import mongoose from "mongoose";

const { Schema } = mongoose;

const userTest = new Schema({
  name: String,
  email: String,
  username: String,
  senha: String,
  nascimento: Date,
});

export default mongoose.model("userTest", userTest);
