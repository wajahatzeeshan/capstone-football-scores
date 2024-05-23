import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  team: { required: true, type: String },
  division: String ,
  opponent: { required: true, type: String },
  season: { required: true, type: String },
  matchDate: { required: true, type: Date }, // this expects a string formatted exactly like this "2002-12-09T00:00"
  for: { required: true, type: Number },
  against: { required: true, type: Number },
  // currentlyBorrowed: { required: true, type: Boolean },
});

const Match = mongoose.model("match", matchSchema);

export default Match;
