import { Request, Response } from "express";
import { User, UserData } from "../models/User";
import {
  authenticateUser,
  changePassword,
  checkUserById,
  checkVerificationToken,
  forgetPasswordEmail,
  verifyUsernameAndEmail,
} from "../services/userServices";
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

const forgetPassword = async (req: Request, res: Response) => {
  try {
    const username = req.body.username as string;
    const email = req.body.email as string;
    const user = await verifyUsernameAndEmail(username, email);
    await forgetPasswordEmail(user);
    return res.status(200).json("Reset Password Email sent successfully");
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

const resetPassword = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const token = req.params.token as string;

    const newPassword = req.body.newPassword;
    const verifyPassword = req.body.verifyPassword;

    const user = await checkUserById(id);
    await checkVerificationToken(
      user,
      token,
      "resetPassword",
      newPassword,
      verifyPassword
    );
    return res.status(200).json("Password changed successfully!");
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
  forgetPassword,
  resetPassword,
};
