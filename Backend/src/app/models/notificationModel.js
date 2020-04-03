import mongoose from 'mongoose';

const { Schema } = mongoose;

const Notificacao = new Schema({
  id: String,
  type: String,
  Description: String,
  Read: Boolean,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


export default mongoose.model('Notificacao'.concat(this.id), Notificacao);
