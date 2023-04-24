import { body, param } from "express-validator";

export const movieIdValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
];

export const createMovieValidator = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie title can't be empty")
    .isAlphanumeric()
    .withMessage("Movie title must be letters & numbers only"),
  body("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie must have an about")
    .isLength({ max: 100 })
    .withMessage("Movie about must be less than 100 characters"),
  body(["directorId", "producerId", "companyId"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("ID can't be empty")
    .isNumeric()
    .withMessage("ID must be a number"),
];
