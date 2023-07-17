import { Request, Response } from "express";
import { Review } from "../models/Review.ts";
import {
  createReview,
  reviewExists,
  editReview,
  getUserReview,
  react,
} from "../services/reviewServices.ts";
import { checkMovieById } from "../services/movieServices.ts";
import { checkUserById } from "../services/userServices.ts";

const reviewModel = new Review();

const submitReview = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId as number;
    await checkUserById(userId);
    await checkMovieById(movieId);
    await reviewExists(userId, movieId, false);
    await createReview(userId, movieId, req.body);
    res.status(201).json("Review submitted successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId as number;
    await checkUserById(userId);
    await checkMovieById(movieId);
    await reviewExists(userId, movieId, true);
    await editReview(userId, movieId, req.body);
    res.status(200).json("Updated user review successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const movieId = req.body.movieId as number;
    await checkUserById(userId);
    await checkMovieById(movieId);
    await reviewExists(userId, movieId, true);
    await reviewModel.remove(userId, movieId);
    res.status(204).json("Review deleted successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getReview = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as unknown as number;
    const movieId = req.query.movieId as unknown as number;
    await checkUserById(userId);
    await checkMovieById(movieId);
    const review = await getUserReview(userId, movieId);
    res.status(200).json(review);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const reactToReview = async (req: Request, res: Response) => {
  try {
    const id = req.payload?.id;
    const userId = req.body.userId as number;
    const movieId = req.body.movieId as number;
    const like = req.body.like as boolean;
    await checkUserById(userId);
    await checkMovieById(movieId);
    await reviewExists(userId, movieId, true);
    const msg = await react(id, userId, movieId, like);
    res.status(200).json(msg);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getMovieReviews = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id as unknown as number;
    await checkMovieById(movieId);
    const reviews = await reviewModel.getMovieReviews(movieId);
    res.status(200).json(reviews);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getUserReviews = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;
    await checkUserById(userId);
    const reviews = await reviewModel.index(userId);
    res.status(200).json(reviews);
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  submitReview,
  updateReview,
  deleteReview,
  getReview,
  reactToReview,
  getMovieReviews,
  getUserReviews,
};
