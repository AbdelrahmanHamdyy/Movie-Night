import { Request, Response } from "express";
import { Watchlist } from "../models/Watchlist";
import {
  checkMovieMakers,
  createNewMovie,
  getMovieDetails,
  checkMovieById,
  addGenres,
} from "../services/movieServices";
import { checkAdmin } from "../services/userServices";

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

const createMovie = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    await checkMovieMakers(req.body);
    const movieId = await createNewMovie(req.body);
    res.status(200).json({ id: movieId });
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

export default {
  getMovie,
  createMovie,
  addMovieGenres,
};
