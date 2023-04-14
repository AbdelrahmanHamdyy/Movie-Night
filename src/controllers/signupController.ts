import { Request, Response } from "express";
import { body, query, param } from "express-validator";
import { User, UserData, newUser } from "../models/User";
import { verifyUser } from "../services/userServices";

const user = new User();

// Validators
const signupValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username can't be empty")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username should consist of letters and numbers only"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long"),
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First Name can't be empty")
    .isAlpha()
    .withMessage("First name should consist of letters only"),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name can't be empty")
    .isAlpha()
    .withMessage("Last name should consist of letters only"),
];

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
    const result = await verifyUser(createdUser);
    return res.status(result.statusCode).json(result.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

export default {
  signupValidator,
  signup,
};
