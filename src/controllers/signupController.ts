import { Request, Response } from "express";
import { User, UserData } from "../models/User.ts";
import {
  verifyUser,
  verifyTokenAndUpdate,
  checkUserById,
} from "../services/userServices.ts";

const user = new User();

const signup = async (req: Request, res: Response) => {
  try {
    const userObj: UserData = {
      username: req.body.username,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    await user.create(userObj);
    const createdUser = await user.getUserByUsername(userObj.username);
    if (!createdUser) {
      return res.status(400).json({ error: "Error in creating user" });
    }
    const result = await verifyUser(createdUser);
    return res.status(result.statusCode).json(result.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

const usernameAvailable = async (req: Request, res: Response) => {
  try {
    const username = req.query.username as string;
    const result = await user.getUserByUsername(username);
    if (result) {
      return res.status(401).json("Username is already taken");
    }
    return res.status(200).json("Username is available");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

const emailAvailable = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await user.getUserByEmail(email);
    if (result) {
      return res.status(401).json("Email is already taken");
    }
    return res.status(200).json("Email is available");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const token = req.params.token as string;

    const checkedUser = await checkUserById(id);
    await verifyTokenAndUpdate(checkedUser, token, "verifyEmail");

    return res.status(200).json("Email has been verified successfully!");
  } catch (error: any) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json("Internal server error");
    }
  }
};

export default {
  signup,
  verifyEmail,
  usernameAvailable,
  emailAvailable,
};
