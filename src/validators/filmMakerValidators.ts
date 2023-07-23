import { body, check, param, query } from "express-validator";

export const createfilmMakerValidator = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name can't be empty")
    .isAlpha()
    .withMessage("First name must be letters only"),
  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last name can't be empty")
    .isAlpha()
    .withMessage("Last name must be letters only"),
  body("country")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Country can't be empty")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Country must be letters only"),
  body("about")
    .optional()
    .isLength({ max: 100 })
    .withMessage("About must be less than 100 characters"),
  body("birthday").optional().isDate().withMessage("Birthday must be a date"),
  body("avatar")
    .not()
    .isEmpty()
    .withMessage("This person must have a profile picture")
    .isMimeType()
    .withMessage("Avatar must be an image"),
  body(["is_writer", "is_director", "is_producer", "is_actor"])
    .trim()
    .not()
    .isEmpty()
    .withMessage("One of the booleans is empty")
    .isBoolean()
    .withMessage("Only true or false are allowed in the boolean fields"),
];

export const updatefilmMakerValidator = [
  body("firstName")
    .optional()
    .isAlpha()
    .withMessage("First name must be letters only"),
  body("lastName")
    .optional()
    .isAlpha()
    .withMessage("Last name must be letters only"),
  body("country")
    .optional()
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Country must be letters only"),
  body("about")
    .optional()
    .isLength({ max: 100 })
    .withMessage("About must be less than 100 characters"),
  body("birthday").optional().isDate().withMessage("Birthday must be a date"),
  body("avatar").optional().isMimeType().withMessage("Avatar must be an image"),
  body(["is_writer", "is_director", "is_producer", "is_actor"])
    .optional()
    .isBoolean()
    .withMessage("Only true or false are allowed in the boolean fields"),
];

export const filmMakerIdValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Film Maker ID can't be empty")
    .isNumeric()
    .withMessage("Film Maker ID must be a number"),
];

export const filmMakerTypeValidator = [
  query("type")
    .optional()
    .isAlpha()
    .withMessage("Film Maker Type must contain letters only")
    .isIn(["actors", "writers", "directors", "producers"]),
];

export const filmMakerMoviesValidator = [
  param("filmMakerId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Film Maker ID can't be empty")
    .isNumeric()
    .withMessage("Film Maker ID must be a number"),
  query("type")
    .optional()
    .isAlpha()
    .withMessage("Film Maker Type must contain letters only")
    .isIn(["actors", "writers", "directors", "producers"]),
];

export const searchFilmMakersValidator = [
  query("query").not().isEmpty().withMessage("Search Query cannot be empty!"),
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
