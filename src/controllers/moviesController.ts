import { Request, Response } from "express";
import { Movie } from "../models/Movie.ts";
import {
  checkMovieMakers,
  createNewMovie,
  getMovieDetails,
  checkMovieById,
  addGenres,
  addCoverTrailer,
  deleteCoverTrailer,
  editMovie,
  getSearchedMovies,
} from "../services/movieServices.ts";
import { checkAdmin } from "../services/userServices.ts";

const movieModel = new Movie();

const getMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id as unknown as number;
    const userId = req.payload?.userId;
    const movie = await getMovieDetails(movieId, userId ?? undefined);
    res.status(200).json(movie);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getMovies = async (req: Request, res: Response) => {
  try {
    const { skip, limit, sort, genre, country, language } = req.query;
    res.status(200).json("TODO: Return movies here");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id as unknown as number;
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    await checkMovieById(movieId);
    await movieModel.destroy(movieId);
    res.status(204).json("Movie deleted successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const createMovie = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    await checkMovieMakers(req.body);
    const movieId = await createNewMovie(req.body);
    res.status(200).json(movieId);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const addMovieGenres = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    await checkMovieById(req.body.movieId);
    await addGenres(req.body.movieId, req.body.genres);
    res.status(200).json("Movie genres added successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const addMovieCoverTrailer = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.id;
    const type = req.body.type;
    await checkAdmin(userId);
    const movie = await checkMovieById(movieId);
    await addCoverTrailer(movie, type, req.files);
    res
      .status(200)
      .json(
        type == "cover"
          ? "Movie cover added successfully!"
          : "Movie trailer added successfully!"
      );
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteMovieCoverTrailer = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.id;
    const type = req.body.type;
    await checkAdmin(userId);
    const movie = await checkMovieById(movieId);
    await deleteCoverTrailer(movie, type);
    res
      .status(200)
      .json(
        type == "cover"
          ? "Movie cover deleted successfully!"
          : "Movie trailer deleted successfully!"
      );
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.id;
    await checkAdmin(userId);
    const movie = await checkMovieById(movieId);
    await editMovie(movie, req.body);
    res.status(200).json("Movie updated successfully");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const updateAward = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const { movieId, type } = req.body;
    await checkAdmin(userId);
    await checkMovieById(movieId);
    await movieModel.setAward(type, movieId);
    res.status(200).json("Award granted successfully");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const removeAward = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId;
    await checkAdmin(userId);
    await checkMovieById(movieId);
    await movieModel.deleteAward(movieId);
    res.status(204).json("Award removed successfully");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const searchMovies = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const searchQuery = req.query.query as unknown as string;
    const skip = req.query.skip as unknown as number;
    const limit = req.query.limit as unknown as number;
    const movies = await getSearchedMovies(userId, searchQuery, skip, limit);
    res.status(200).json(movies);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  getMovie,
  getMovies,
  createMovie,
  updateAward,
  removeAward,
  addMovieGenres,
  addMovieCoverTrailer,
  deleteMovieCoverTrailer,
  updateMovie,
  deleteMovie,
  searchMovies,
};
