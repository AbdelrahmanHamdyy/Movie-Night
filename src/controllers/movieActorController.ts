import { Request, Response } from "express";

const createMovieActors = async (req: Request, res: Response) => {
  try {
    // TODO
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteMovieActors = async (req: Request, res: Response) => {
  try {
    // TODO
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
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  createMovieActors,
  deleteMovieActors,
  getMovieActors,
};
