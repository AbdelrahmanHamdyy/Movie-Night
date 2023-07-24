import { Request, Response } from "express";

const createMovieWriters = async (req: Request, res: Response) => {
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

const deleteMovieWriters = async (req: Request, res: Response) => {
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

const getMovieWriters = async (req: Request, res: Response) => {
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
  createMovieWriters,
  deleteMovieWriters,
  getMovieWriters,
};
