import mongoose from 'mongoose';

const like = new mongoose.Schema({
  iduser: {
    type: String,
    required: true,
  },
  idpublic: {
    type: String,
    required: true,
  },
},
{
  timestamps:
      {
        createdAt: 'created_at',
        delete_at: 'delete_at',
      },
});

export default mongoose.model('likes', like);
