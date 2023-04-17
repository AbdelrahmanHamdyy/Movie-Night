import { param } from "express-validator";

export const movieIdValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
];
