import { body, check, param, query } from "express-validator";

export const movieIdValidator = [
  param("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
];

export const getMoviesValidator = [
  // TODO
];

export const createMovieValidator = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie title can't be empty")
    .isAlphanumeric("en-US", { ignore: "s" })
    .withMessage("Movie title must be letters & numbers only"),
  body("language")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie language can't be empty")
    .isAlpha("en-US", { ignore: "s" })
    .withMessage("Movie language must be letters only"),
  body("country")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie country can't be empty")
    .isAlpha("en-US", { ignore: "s" })
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
  body("movieId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
  body("genres")
    .isArray({ min: 1 })
    .withMessage("A movie must have atleast 1 genre"),
];

export const movieCoverTrailerValidator = [
  body("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
  body("type").trim().not().isEmpty().withMessage("File type cannot be empty"),
  check("type")
    .isIn(["cover", "trailer"])
    .withMessage("Type must be either cover or trailer only"),
];

export const updateMovieValidator = [
  body("id")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Movie ID can't be empty")
    .isNumeric()
    .withMessage("Movie ID must be a number"),
  body("budget").optional().isNumeric().withMessage("Budget must be a number"),
  body("releaseDate")
    .optional()
    .isDate()
    .withMessage("Release Date must be a date"),
  body("title")
    .optional()
    .isAlphanumeric()
    .withMessage("Title must be letters or numbers only"),
  body("about")
    .optional()
    .isAlphanumeric()
    .withMessage("About must be in letters or numbers only"),
  body("duration")
    .optional()
    .isNumeric()
    .withMessage("Duration must be a number"),
  body("language").optional().isAlpha().withMessage("Language must be alpha"),
  body("country").optional().isAlpha().withMessage("Country must be alpha"),
  body(["directorId", "producerId", "companyId"])
    .optional()
    .isNumeric()
    .withMessage("ID must be a number"),
];
