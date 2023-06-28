import { body, query } from "express-validator";

export const getWatchlistValidator = [
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

export const movieIdValidator = [
  body("movieId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
];
