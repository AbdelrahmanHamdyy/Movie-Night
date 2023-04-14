import { Request, Response } from "express";
import { User, UserData, newUser } from "../models/User";
import { verifyUser } from "../services/userServices";

const user = new User();

const signup = async (req: Request, res: Response) => {
  try {
    const userObj: newUser = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
      return res.status(409).json("Username is already taken");
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
      return res.status(409).json("Email is already taken");
    }
    return res.status(200).json("Email is available");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

export default {
  signup,
  usernameAvailable,
  emailAvailable,
};
