import mongoose from 'mongoose';

const { Schema } = mongoose;

const Notificacao = new Schema(
  {
    id_user: 
      {
        type: String
      },
    type: 
      {
        type: String
      },
    content: 
      {
        type: String
      },
    read: 
      {
        type: Boolean,
        default: false,
      },
  }, 
  { 
    timestamps: 
      { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
      } 
  });

export default mongoose.model('Notificacao', Notificacao);
