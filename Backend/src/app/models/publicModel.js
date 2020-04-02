import mongoose from 'mongoose';
import keys from '../../keys';

const Publicacao = new mongoose.Schema(
  {
    path: { 
      type: String,
      unique: true,
    },

    id_user: { 
      type: String,
      required: true,
    },

    tb_like: { 
      type: String,
      unique: true,
    },

    tb_comment: { 
      type: String,
      unique: true,
    },

    descricao: { 
      type: String,
      required: false,
    },
  },
  {
    timestamps : 
      { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at',
        delete_at: 'delete_at'
      }
  });

Publicacao
  .pre('save', function (next)
    {
      this.tb_comment = keys.idCommentTable();
      this.tb_like = keys.idTableLike();
      next();
    }
  );

export default mongoose.model('Publicacoes', Publicacao);
