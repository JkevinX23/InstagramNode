import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const User = new Schema({
  name: String,
  email: String,
  username: String,
  senha: String,
  nascimento: Date,
});

User.pre('save', async function (next) {
  if (this.senha) {
    const senhaHash = await bcrypt.hash(this.senha, 8);
    this.senha = senhaHash;
    next();
  }
});
export default mongoose.model('User', User);
