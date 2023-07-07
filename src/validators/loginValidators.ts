import { body, param } from "express-validator";

export const userIdValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("User ID must not be empty")
    .isNumeric()
    .withMessage("User ID must be numeric"),
];

export const loginValidator = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username must be letters and numbers only"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long"),
];

export const resetPasswordValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Id must not be empty")
    .isNumeric()
    .withMessage("Id must be numeric"),
  param("token").trim().not().isEmpty().withMessage("Token must not be empty"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New Password must be at least 8 chars long"),
  body("verifyPassword")
    .isLength({ min: 8 })
    .withMessage("Repeated Password must be at least 8 chars long"),
];

export const forgetPasswordValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must not be empty")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username must be letters and numbers only"),
];

export const forgetUsernameValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
];
