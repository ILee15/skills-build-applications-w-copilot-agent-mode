/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create users
  const users = await User.create([
    { name: 'Ava Thompson', email: 'ava@example.com', passwordHash: 'hash1', role: 'user' },
    { name: 'Noah Patel', email: 'noah@example.com', passwordHash: 'hash2', role: 'user' },
    { name: 'Liam Johnson', email: 'liam@example.com', passwordHash: 'hash3', role: 'user' },
    { name: 'Sophia Martinez', email: 'sophia@example.com', passwordHash: 'hash4', role: 'admin' },
    { name: 'Mia Chen', email: 'mia@example.com', passwordHash: 'hash5', role: 'user' },
  ]);

  // Create teams
  const teamAlpha = await Team.create({ name: 'Alpha Runners', description: 'Morning runners', members: [users[0]._id, users[1]._id] });
  const teamBeta = await Team.create({ name: 'Beta Lifters', description: 'Evening strength sessions', members: [users[2]._id, users[4]._id] });

  // Associate users with teams
  await User.updateOne({ _id: users[0]._id }, { team: teamAlpha._id });
  await User.updateOne({ _id: users[1]._id }, { team: teamAlpha._id });
  await User.updateOne({ _id: users[2]._id }, { team: teamBeta._id });
  await User.updateOne({ _id: users[4]._id }, { team: teamBeta._id });

  // Create activities
  const now = new Date();
  await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 35, distanceKm: 8.2, calories: 410, date: new Date(now.getTime() - 1000 * 60 * 60 * 24) },
    { user: users[1]._id, type: 'cycle', durationMinutes: 50, distanceKm: 20.5, calories: 650, date: new Date(now.getTime() - 1000 * 60 * 60 * 48) },
    { user: users[2]._id, type: 'swim', durationMinutes: 30, distanceKm: 1.2, calories: 300, date: new Date(now.getTime() - 1000 * 60 * 60 * 72) },
  ]);

  // Create workouts
  await Workout.create([
    {
      name: 'Full Body HIIT',
      description: 'Short high intensity circuit',
      exercises: [
        { name: 'Burpees', sets: 5, reps: 12 },
        { name: 'Jump Squats', sets: 5, reps: 15 },
      ],
      durationMinutes: 25,
      difficulty: 'hard',
      createdBy: users[3]._id,
    },
    {
      name: 'Morning Run Plan',
      description: 'Progressive run',
      exercises: [{ name: 'Easy Run', durationSec: 1800 }],
      durationMinutes: 30,
      difficulty: 'medium',
      createdBy: users[0]._id,
    },
  ]);

  // Create leaderboard entries
  await Leaderboard.create([
    { user: users[0]._id, score: 1240, period: 'weekly', rank: 1 },
    { user: users[1]._id, score: 980, period: 'weekly', rank: 2 },
    { user: users[2]._id, score: 760, period: 'weekly', rank: 3 },
  ]);

  // Report counts
  const [uCount, tCount, aCount, wCount, lCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    Leaderboard.countDocuments(),
  ]);

  console.log('Seed complete:');
  console.log({ users: uCount, teams: tCount, activities: aCount, workouts: wCount, leaderboard: lCount });

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  });
