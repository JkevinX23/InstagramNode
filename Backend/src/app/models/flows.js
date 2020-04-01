import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const Flow = new Schema({
  id: String,
  active:Boolean,
  create_in: Date,
  id_user: String,
});


export default mongoose.model('Flow'.concat(this.id), Flow);
