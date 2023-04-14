import { body, query, param } from "express-validator";

// Validators
export const signupValidator = [
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

export const usernameValidator = [
  query("username")
    .not()
    .isEmpty()
    .withMessage("Username can't be empty")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username should consist of letters and numbers only"),
];

export const emailValidator = [
  query("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
];
