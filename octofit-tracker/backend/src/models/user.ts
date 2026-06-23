import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
