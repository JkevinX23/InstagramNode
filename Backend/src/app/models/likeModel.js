import mongoose from 'mongoose';

const like = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  public_id: {
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
