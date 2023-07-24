import { body, query } from "express-validator";

export const movieActorsValidator = [
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
  body("actors")
    .not()
    .isEmpty()
    .withMessage("Actors cannot be empty!")
    .isArray()
    .withMessage("Actors must be an array"),
];
