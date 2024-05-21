import express from "express";
import moviesController from "../controllers/matchesController.js";

const Router = express.Router();

Router.route("/match")
  .get(moviesController.getAllScores)
  .post(moviesController.createScore);

Router.route("/match/:id")
  .get(moviesController.getSingleScore)
  .put(moviesController.updateScore)
  .delete(moviesController.deleteScore);

export default Router;
