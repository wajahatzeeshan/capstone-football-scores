import mongoose from "mongoose";

export function connectDb() {
  return mongoose.connect(process.env.DB_URI);
}
