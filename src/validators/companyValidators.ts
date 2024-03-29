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
  body("followed")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Followed parameter can't be empty")
    .isBoolean()
    .withMessage("Followed must be boolean"),
];

export const createCompanyValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Company Name can't be empty")
    .isAlphanumeric()
    .withMessage("Company Name must be only letters & numbers"),
  body("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Company must have an about")
    .isLength({ max: 100 })
    .withMessage("Company about must be less than 100 characters"),
  body("location")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Location can't be empty")
    .isAlpha()
    .withMessage("Location must be only letters"),
  body("ownerId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Owner ID can't be empty")
    .isNumeric()
    .withMessage("Owner ID must be a number"),
];

export const updateCompanyValidator = [
  body("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Company ID can't be empty")
    .isNumeric()
    .withMessage("Company ID must numeric"),
  body("about")
    .optional()
    .isAlphanumeric()
    .withMessage("Company about must be only letters & numbers"),
  body("location")
    .optional()
    .isAlpha()
    .withMessage("Location must be only letters"),
  body("ownerId")
    .optional()
    .isNumeric()
    .withMessage("Owner ID must be a number"),
];
