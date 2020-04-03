import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comentarios = new Schema({
  id: String,
  id_user: String,
  id_publicacao: String,
  exclude_in: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


export default mongoose.model('Comentarios'.concat(this.id), Comentarios);
