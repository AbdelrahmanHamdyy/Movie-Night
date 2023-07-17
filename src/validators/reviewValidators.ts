import { body, query } from "express-validator";

export const reviewMovieValidator = [
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
  body("reviewBody")
    .not()
    .isEmpty()
    .withMessage("Review body cannot be empty!"),
  body("spoiler")
    .optional()
    .isBoolean()
    .withMessage("Spoiler parameter must be a boolean data type"),
  body("recommended")
    .optional()
    .isBoolean()
    .withMessage("Recommended parameter must be a boolean data type"),
  body("favActorID")
    .optional()
    .isNumeric()
    .withMessage("Actor ID must be a number"),
];

export const deleteReviewValidator = [
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
];

export const getReviewValidator = [
  query("userId")
    .not()
    .isEmpty()
    .withMessage("User ID cannot be empty!")
    .isNumeric()
    .withMessage("User ID must be a number!"),
  query("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
];

export const reviewReactionValidator = [
  body("userId")
    .not()
    .isEmpty()
    .withMessage("User ID cannot be empty!")
    .isNumeric()
    .withMessage("User ID must be a number!"),
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
  body("like")
    .not()
    .isEmpty()
    .withMessage("The like parameter cannot be empty!")
    .isBoolean()
    .withMessage("Like must be a boolean!"),
];

export const updateReviewValidator = [
  body("userId")
    .not()
    .isEmpty()
    .withMessage("User ID cannot be empty!")
    .isNumeric()
    .withMessage("User ID must be a number!"),
  body("movieId")
    .not()
    .isEmpty()
    .withMessage("Movie ID cannot be empty!")
    .isNumeric()
    .withMessage("Movie ID must be a number!"),
  body("spoiler")
    .optional()
    .isBoolean()
    .withMessage("Spoiler parameter must be a boolean data type"),
  body("recommended")
    .optional()
    .isBoolean()
    .withMessage("Recommended parameter must be a boolean data type"),
  body("favActorID")
    .optional()
    .isNumeric()
    .withMessage("Actor ID must be a number"),
];
