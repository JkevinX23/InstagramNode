import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const Publicacao = new Schema({
  id: String,
  path: String,
  create_in: Date,
  exclude_in: String,
  update_in: String,
  id_user: String,
  id_table_like: String,
  id_table_comment: String
});



export default mongoose.model('Publicacao'.concat(this.id_user), Publicacao);
