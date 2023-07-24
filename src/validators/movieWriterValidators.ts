import { body, query } from "express-validator";

export const movieWritersValidator = [
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
  body("writers")
    .not()
    .isEmpty()
    .withMessage("Writers array cannot be empty!")
    .isArray()
    .withMessage("Writers must be an array"),
];
