import { body } from "express-validator";

export const rateMovieValidator = [
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
  body("rating")
    .not()
    .isEmpty()
    .withMessage("User rating cannot be empty!")
    .isInt({ min: 0, max: 10 })
    .withMessage("Rating must be a number between 0 and 10 inclusive!"),
];
