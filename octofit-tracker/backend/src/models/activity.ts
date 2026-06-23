import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  calories?: number;
  date: Date;
  metadata?: Record<string, any>;
}

const ActivitySchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    calories: { type: Number },
    date: { type: Date, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
