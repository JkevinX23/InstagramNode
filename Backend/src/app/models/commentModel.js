import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const Comentarios = new Schema({
  id: String,
  id_user: String,
  id_publicacao: String,
  create_in: Date,
  update_in: String,
  exclude_in: String,
});


export default mongoose.model('Comentarios'.concat(this.id_publicacao), Comentarios);