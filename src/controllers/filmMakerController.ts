import { Request, Response } from "express";
import { FilmMaker } from "../models/FilmMaker.ts";
import { checkMovieById } from "../services/movieServices.ts";
import { checkAdmin, checkUserById } from "../services/userServices.ts";

const filmMakerModel = new FilmMaker();

const createFilmMaker = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    // TODO
    res.status(201).json("Film-maker created successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const updateFilmMaker = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    // TODO
    res.status(200).json("Updated film-maker successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteFilmMaker = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    // TODO
    res.status(204).json("Film-maker deleted successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getFilmMaker = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("Film-maker returned successfully");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getFilmMakers = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("Film makers returned successfully");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getMovieActors = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("Movie actors returned successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getMovieWriters = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("Movie writers returned successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getFilmMakerMovies = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("Film-maker movies returned successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  createFilmMaker,
  updateFilmMaker,
  deleteFilmMaker,
  getFilmMaker,
  getFilmMakers,
  getMovieActors,
  getMovieWriters,
  getFilmMakerMovies,
};
