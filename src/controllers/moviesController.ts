import { Request, Response } from "express";

const getMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
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
