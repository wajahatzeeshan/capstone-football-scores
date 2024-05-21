import Match from "../models/match.js";

async function getAllScores(req, res, next) {
  try {
    const matches = await Match.find();
    return res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createScore(req, res, next) {
  try {
    const formattedDate = new Date(req.body.matchDate)
    req.body.matchDate = formattedDate;

    const newMatch = await Match.create(req.body);

    return res.status(201).send(newMatch);
  } catch (err) {
    next(err);
  }
}

async function getSingleScore(req, res, next) {
  const { id } = req.params;

  try {
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).send({ message: "Match does not exist" });
    }
    res.status(200).send(match);
  } catch (err) {
    next(err);
  }
}

async function deleteScore(req, res, next) {
  const { id } = req.params;

  try {
    const match = await Match.findByIdAndDelete(id);

    if (!match) {
      return res.status(404).send({ message: "Match does not exist" });
    }

    return res.status(200).json(match);
  } catch (err) {
    next(err);
  }
}

async function updateScore(req, res, next) {
  const { id } = req.params;
  const { body } = req;

  try {
    const match = await Match.findById(id);

    if (!match) {
      return res.send({ message: "No Match found" });
    }

    match.set(body);
    match.save();

    res.status(200).json(match);
  } catch (err) {
    next();
  }
}

export default {
  getAllScores,
  createScore,
  getSingleScore,
  updateScore,
  deleteScore,
};
