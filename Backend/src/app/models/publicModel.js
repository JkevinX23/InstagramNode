import mongoose from 'mongoose';

const Publicacao = new mongoose.Schema(
  {
    path: {
      type: String,
      unique: true,
    },

    iduser: {
      type: String,
      required: true,
    },

    descricao: {
      type: String,
      required: false,
      default: ' ',
    },
  },
  {
    timestamps:
      {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        delete_at: 'delete_at',
      },
  },
);

export default mongoose.model('Publicacoes', Publicacao);
