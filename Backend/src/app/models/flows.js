import mongoose from 'mongoose';

const { Schema } = mongoose;

const Flow = new Schema({
  user_id: String,
  flowed_id: String,
  active: Boolean,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', delete_at: 'delete_at'} });


export default mongoose.model('Flows', Flow);
