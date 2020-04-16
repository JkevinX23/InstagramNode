import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comentarios = new Schema(
  {
    iduser: String,
    idpublic: String,
    content: String,
  },
  {
    timestamps:
      {
        delete_at: 'delete_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
  },
);


export default mongoose.model('Comentarios', Comentarios);
