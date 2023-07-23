import { Request, Response } from "express";

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
  getMovieActors,
};
