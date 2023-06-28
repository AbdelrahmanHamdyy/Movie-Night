import { body, check, param, query } from "express-validator";

export const getCompaniesValidator = [
  query("skip")
    .not()
    .isEmpty()
    .withMessage("Skip parameter cannot be empty!")
    .isNumeric()
    .withMessage("Skip must be a number!"),
  query("limit")
    .not()
    .isEmpty()
    .withMessage("Limit parameter cannot be empty!")
    .isNumeric()
    .withMessage("Limit must be a number!"),
];

export const companyIdValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Company ID can't be empty")
    .isNumeric()
    .withMessage("Company ID must be a number"),
];

export const followCompanyValidator = [
  body("userId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("User ID can't be empty")
    .isNumeric()
    .withMessage("User ID must be a number"),
  body("companyId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Company ID can't be empty")
    .isNumeric()
    .withMessage("Company ID must be a number"),
];

export const createCompanyValidator = [
  // TODO
];
