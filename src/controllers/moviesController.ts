import { Request, Response } from "express";
import { Watchlist } from "../models/Watchlist";
import { getMovieDetails } from "../services/movieServices";

const watchlist = new Watchlist();

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

export default {
  getMovie,
};
