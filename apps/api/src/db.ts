import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/storybird_clone";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGODB_URI);
  return mongoose.connection;
}
