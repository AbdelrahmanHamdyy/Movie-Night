import { Request, Response } from "express";
import { Watchlist } from "../models/Watchlist.ts";
import {
  getWatchlistMovies,
  checkMovieInWatchlist,
  removeMovieFromWatchlist,
} from "../services/watchlistServices.ts";
import { checkMovieById } from "../services/movieServices.ts";

const watchlist = new Watchlist();

const getWatchlist = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const skip = req.query.skip as unknown as number;
    const limit = req.query.limit as unknown as number;
    const movies = await getWatchlistMovies(userId, skip, limit);
    res.status(200).json(movies);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId;
    await checkMovieById(movieId);
    await checkMovieInWatchlist(userId, movieId);
    await watchlist.add(userId, movieId);
    res.status(200).json("Movie added to watchlist successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const removeFromWatchlist = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId;
    await checkMovieById(movieId);
    await removeMovieFromWatchlist(userId, movieId);
    res.status(204).json("Movie removed from watchlist successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
