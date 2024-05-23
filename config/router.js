import express from "express";
import matchesController from "../controllers/matchesController.js";

const Router = express.Router();

Router.route("/match")
  .get(matchesController.getAllScores)
  .post(matchesController.createScore);

Router.route("/match/:id")
  .get(matchesController.getSingleScore)
  .put(matchesController.updateScore)
  .delete(matchesController.deleteScore);

Router.route("/matchfilter")
  .get(matchesController.filterMatch);

Router.route("/matchstats")
  .get(matchesController.getMatchStats);

  // Router.route("/match/available")
  // .get(matchesController.getAvailableBooks);

export default Router;
