import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const Flow = new Schema({
  id: String,
  active:Boolean,
  id_user: String,
},{timestamps : { createdAt: 'created_at', updatedAt: 'updated_at' }});


export default mongoose.model('Flow'.concat(this.id), Flow);
