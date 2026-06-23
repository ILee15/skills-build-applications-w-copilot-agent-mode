import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  period: string;
  rank?: number;
}

const LeaderboardSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    period: { type: String, required: true },
    rank: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
