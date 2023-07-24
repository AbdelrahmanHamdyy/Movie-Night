import { Request, Response } from "express";
import { UserRating } from "../models/Rating.ts";
import { rateMovie } from "../services/userRatingServices.ts";
import { checkMovieById } from "../services/movieServices.ts";
import { checkUserById } from "../services/userServices.ts";

const userRating = new UserRating();

const rate = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId as number;
    const rating = req.body.rating as number;
    await checkUserById(userId);
    await checkMovieById(movieId);
    await rateMovie(userId, movieId, rating);
    res.status(200).json("Rated movie successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getMovieRatings = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id as unknown as number;
    await checkMovieById(movieId);
    const ratings = await userRating.get(movieId);
    res.status(200).json(ratings);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getUserRatings = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;
    await checkUserById(userId);
    const ratings = await userRating.index(userId);
    res.status(200).json(ratings);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  rate,
  getMovieRatings,
  getUserRatings,
};
