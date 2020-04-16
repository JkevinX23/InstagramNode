import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const User = new Schema(
  {

    flowabble:
  {
    type: Boolean,
    default: true,
  },

    name:
  {
    type: String,
    required: true,
  },

    email:
  {
    type: String,
    required: true,
    unique: true,
  },

    username:
  {
    type: String,
    required: true,
    unique: true,
  },

    password:
  {
    type: String,
    required: true,
  },

    nascimento:
  {
    type: Date,
    required: true,
  },

    bio:
  {
    type: String,
  },

    profilephoto:
  {
    type: String,
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

User.pre('save', async function (next) {
  const senhaHash = await bcrypt.hash(this.password, 8);
  this.password = senhaHash;
  next();
});

export default mongoose.model('User', User);
