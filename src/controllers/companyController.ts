import { Request, Response } from "express";
import { Company } from "../models/Company.ts";
import { indexCompanies } from "../services/companyServices.ts";

const companyModel = new Company();

const getCompanies = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.userId;
    const skip = req.query.skip as unknown as number;
    const limit = req.query.limit as unknown as number;
    const follow = req.query.follow as unknown as boolean;
    const companies = await indexCompanies(userId, skip, limit, follow);
    res.status(200).json(companies);
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
    const userId = req.payload?.userId;
    const companyId = req.params.id as unknown as number;
    const company = await companyModel.getCompanyById(companyId, userId);
    res.status(200).json(company);
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
