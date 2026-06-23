import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise {
  name: string;
  sets?: number;
  reps?: number;
  durationSec?: number;
}

export interface IWorkout extends Document {
  name: string;
  description?: string;
  exercises: IExercise[];
  durationMinutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  createdBy?: mongoose.Types.ObjectId;
}

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  sets: { type: Number },
  reps: { type: Number },
  durationSec: { type: Number },
});

const WorkoutSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    exercises: { type: [ExerciseSchema], default: [] },
    durationMinutes: { type: Number },
    difficulty: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
