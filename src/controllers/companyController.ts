import { Request, Response } from "express";
import { Company } from "../models/Company.ts";
import {
  indexCompanies,
  createNewCompany,
  checkCompanyById,
} from "../services/companyServices.ts";
import { checkAdmin, checkUserById } from "../services/userServices.ts";

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
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    await checkUserById(req.body.ownerId);
    const companyId = await createNewCompany(req.body, req.files);
    res.status(200).json(companyId);
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
    const companyId = req.params.id as unknown as number;
    const userId = req.payload?.userId;
    await checkAdmin(userId);
    await checkCompanyById(companyId);
    await companyModel.destroy(companyId);
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
    const companyId = req.params.companyId as unknown as number;
    const followed = req.params.followed as unknown as boolean;
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
