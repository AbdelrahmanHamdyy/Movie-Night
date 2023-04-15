import { Request, Response } from "express";
import { User, UserData } from "../models/User";
import { authenticateUser } from "../services/userServices";
import { generateJWT } from "../utils/generateTokens";

const login = async (req: Request, res: Response) => {
  try {
    const username = req.body.username as string;
    const password = req.body.password as string;
    const user = await authenticateUser(username, password);
    const token = generateJWT(user);
    return res.status(200).json({
      username: username,
      token: token,
    });
  } catch (error: any) {
    if (error.statusCode === 400) {
      res.status(error.statusCode).json({ error: error.message });
    } else if (error.statusCode) {
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  login,
};
