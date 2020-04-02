import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import keys from '../../keys';

const { Schema } = mongoose;
const User = new Schema(
{
  publicId: 
  {
    type: String,
    unique: true
  },
  
  flowTableID: 
  {
    type: String, 
    unique: true
  },
  
  notificationTableId: 
  {
    type: String
  },

  flowAbble: 
  {
    type: Boolean, 
    default: true
  },

  name: 
  {
    type: String,
    required: true
  },

  email:
  {
    type: String,
    required: true, 
    unique: true
  },

  username: 
  {
    type: String,
    required: true, 
    unique: true
  },

  senha: 
  {
    type: String,
    required: true
  },

  nascimento: 
  {
    type: Date,
    required: true
  },

  bio: 
  {
    type: String
  },

  profilePhoto: 
  {
    type: String
  }
},
{
  timestamps : 
    { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at',
      delete_at: 'delete_at'
    }
  }
);

User.pre('save', async function (next) 
  {
    const senhaHash = await bcrypt.hash(this.senha, 8);
    this.senha = senhaHash;
    this.publicId = keys.publicId();
    this.flowTableID = keys.flowTableID();
    this.notificationTableId = keys.notificationTableId();

    next();
  }
);

export default mongoose.model('User', User);
