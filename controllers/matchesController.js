import { query } from "express";
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

async function filterMatch(req, res, next) {
  const { team } = req.query;
  console.log("team:" + team)

  try {
    const match = await Match.find({team: team});

    if (!match) {
      return res.status(404).send({ message: "The match does not exist" });
    }

    return res.status(200).json(match);
  } catch (err) {
    next(err);
  }
}

async function getMatchStats(req, res, next) {
  const { category } = req.query;

  try {
    const datastats = await Match.aggregate().sortByCount(category);
    res.status(200).send(datastats);
  } catch (err) {
    next(err);
  }
}

// async function getAvailableBooks(req, res, next) {
//   try {
//     const availableBooks = await Book.find({ currentlyBorrowed: false });
//     return res.status(200).json(availableBooks)
//   } catch (err) {
//     next(err)
//   }
// }


export default {
  getAllScores,
  createScore,
  getSingleScore,
  updateScore,
  deleteScore,
  filterMatch,
  getMatchStats
};
