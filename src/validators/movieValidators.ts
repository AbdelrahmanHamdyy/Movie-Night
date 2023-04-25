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
  body("language")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie language can't be empty")
    .isAlpha()
    .withMessage("Movie language must be letters only"),
  body("country")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie country can't be empty")
    .isAlpha()
    .withMessage("Movie country must be letters only"),
  body("duration")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie duration can't be empty")
    .isNumeric()
    .withMessage("Movie duration must be numeric"),
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

export const movieGenresValidator = [
  body("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
  body("genres")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Genres array can't be empty")
    .isArray({ min: 1 })
    .withMessage("A movie must have atleast 1 genre"),
];
