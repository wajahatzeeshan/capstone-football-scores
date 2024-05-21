import Movie from "../models/movie.js";

async function getAllMovies(req, res, next) {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createMovie(req, res, next) {
  try {
    const newMovie = await Movie.create(req.body);

    return res.status(201).send(newMovie);
  } catch (err) {
    next(err);
  }
}

async function getSingleMovie(req, res, next) {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
}

async function deleteMovie(req, res, next) {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).send({ message: "Movie does not exist" });
    }

    return res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
}

async function updateMovie(req, res, next) {
  const { id } = req.params;
  const { body } = req;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.send({ message: "No movie found" });
    }

    movie.set(body);
    movie.save();

    res.status(200).json(movie);
  } catch (err) {
    next();
  }
}

export default {
  getAllMovies,
  createMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
};
