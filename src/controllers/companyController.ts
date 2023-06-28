import { Request, Response } from "express";
import { Company } from "../models/Company.ts";
import { checkMovieById } from "../services/movieServices.ts";

const company = new Company();

const getCompanies = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const skip = req.query.skip as unknown as number;
    const limit = req.query.limit as unknown as number;
    const follow = req.query.follow as unknown as number;
    // TODO
    res.status(200).json("TODO: Return companies here");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const getCompany = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("TODO: Return company here");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const createCompany = async (req: Request, res: Response) => {
  try {
    // TODO
    res.status(200).json("Company created successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const deleteCompany = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const companyId = req.params.movieId as unknown as number;
    // TODO
    res.status(204).json("Company deleted successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

const followCompany = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const companyId = req.params.movieId as unknown as number;
    const followed = req.params.movieId as unknown as boolean;
    // TODO
    res.status(200).json("Followed company successfully!");

    res.status(200).json("Unfollowed company successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  getCompanies,
  getCompany,
  createCompany,
  deleteCompany,
  followCompany,
};