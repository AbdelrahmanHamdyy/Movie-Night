import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import {
  movieIdValidator,
  createMovieValidator,
  movieGenresValidator,
  movieCoverTrailerValidator,
  updateMovieValidator,
  getMoviesValidator,
  setAwardValidator,
  deleteAwardValidator,
  searchMoviesValidator,
} from "../validators/movieValidators.ts";
import { optionalToken, verifyAuthToken } from "../middlewares/verifyToken.ts";
import moviesController from "../controllers/moviesController.ts";

const moviesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies Endpoints
 */

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Returns details about a certain movie given its id (Token is optional)
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie info returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.get(
  "/movie/:id",
  optionalToken,
  movieIdValidator,
  validateRequestSchema,
  moviesController.getMovie
);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Returns all movies (This endpoint is a listing)
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: skip
 *         description: The number of movies to skip before returning results
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         description: The amount of movies returned to be viewed by the user before further scrolling
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: genre
 *         description: Filter movies by genre
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: Sort movies by any of the below options
 *         schema:
 *           type: string
 *           default: new
 *           enum:
 *             - new
 *             - old
 *             - rating
 *             - score
 *       - in: query
 *         name: country
 *         description: Filter movies by country
 *         schema:
 *           type: string
 *       - in: query
 *         name: language
 *         description: Filter movies by language
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movies returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/Movie'
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 */
moviesRouter.get(
  "/movies",
  optionalToken,
  getMoviesValidator,
  validateRequestSchema,
  moviesController.getMovies
);

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Deletes a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Movie deleted successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to delete a movie
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.delete(
  "/movie/:id",
  verifyAuthToken,
  movieIdValidator,
  validateRequestSchema,
  moviesController.deleteMovie
);

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Creates a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - title
 *               - about
 *               - duration
 *               - language
 *               - country
 *               - directorId
 *               - producerId
 *               - companyId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Movie Title
 *               about:
 *                 type: string
 *                 description: Brief description of what the movie is about
 *               duration:
 *                 type: number
 *                 description: Movie duration (Example - 142 means 1 hour 42 minutes)
 *               budget:
 *                 type: number
 *                 format: double
 *                 description: Estimated budget for this movie
 *               releaseDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date in which the movie is expected to be released
 *               language:
 *                 type: string
 *                 description: The main language used in the movie
 *               country:
 *                 type: string
 *                 description: The country where the movie originated from
 *               directorId:
 *                 type: number
 *                 description: Movie director ID
 *               producerId:
 *                 type: number
 *                 description: Movie producer ID
 *               companyId:
 *                 type: number
 *                 description: Production Company ID
 *     responses:
 *       200:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                  id:
 *                     type: number
 *                     description: ID of the newly created movie
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to add a new movie
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.post(
  "/movie",
  verifyAuthToken,
  createMovieValidator,
  validateRequestSchema,
  moviesController.createMovie
);

/**
 * @swagger
 * /movie-genres:
 *   post:
 *     summary: Adds genres for a movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - genres
 *             properties:
 *               movieId:
 *                 type: number
 *                 description: Movie ID
 *               genres:
 *                 type: array
 *                 description: The genres associated with this movie
 *                 items:
 *                    type: string
 *     responses:
 *       200:
 *         description: Movie genres added successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to add a new movie
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.post(
  "/movie-genres",
  verifyAuthToken,
  movieGenresValidator,
  validateRequestSchema,
  moviesController.addMovieGenres
);

/**
 * @swagger
 * /movie-genres/{id}:
 *   get:
 *     summary: Gets all genres for a certain movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie genres returned successfully successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Genre Name
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 */
moviesRouter.get(
  "/movie-genres/:id",
  movieIdValidator,
  validateRequestSchema,
  moviesController.getMovieGenres
);

/**
 * @swagger
 * /cover-trailer:
 *   post:
 *     summary: Adds a cover or trailer for a given movie according to the file type
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             required:
 *               - type
 *               - id
 *               - cover
 *               - trailer
 *             properties:
 *               id:
 *                 type: number
 *                 description: Movie ID
 *               type:
 *                 type: string
 *                 enum:
 *                   - cover
 *                   - trailer
 *               cover:
 *                 type: object
 *                 description: The cover image
 *               trailer:
 *                 type: object
 *                 description: Trailer video file
 *     responses:
 *       200:
 *         description: Movie cover or trailer added successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to add a new movie cover or trailer
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.post(
  "/cover-trailer",
  verifyAuthToken,
  movieCoverTrailerValidator,
  validateRequestSchema,
  moviesController.addMovieCoverTrailer
);

/**
 * @swagger
 * /cover-trailer:
 *   delete:
 *     summary: Deletes a cover or trailer
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - id
 *               - type
 *             properties:
 *               id:
 *                 type: number
 *                 description: Movie ID
 *               type:
 *                 type: string
 *                 enum:
 *                   - cover
 *                   - trailer
 *     responses:
 *       200:
 *         description: Movie cover or trailer deleted successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to delete a movie cover or trailer
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.delete(
  "/cover-trailer",
  verifyAuthToken,
  movieCoverTrailerValidator,
  validateRequestSchema,
  moviesController.deleteMovieCoverTrailer
);

/**
 * @swagger
 * /movie:
 *   put:
 *     summary: Update details of a given movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *                 description: Movie ID
 *               title:
 *                 type: string
 *                 description: Movie Title
 *               about:
 *                 type: string
 *                 description: Brief description of what the movie is about
 *               duration:
 *                 type: number
 *                 description: Movie duration (Example - 142 means 1 hour 42 minutes)
 *               budget:
 *                 type: number
 *                 format: double
 *                 description: Estimated budget for this movie
 *               releaseDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date in which the movie is expected to be released
 *               language:
 *                 type: string
 *                 description: The main language used in the movie
 *               country:
 *                 type: string
 *                 description: The country where the movie originated from
 *               directorId:
 *                 type: number
 *                 description: Movie director ID
 *               producerId:
 *                 type: number
 *                 description: Movie producer ID
 *               companyId:
 *                 type: number
 *                 description: Production Company ID
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to update a movie
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.put(
  "/movie",
  verifyAuthToken,
  updateMovieValidator,
  validateRequestSchema,
  moviesController.updateMovie
);

/**
 * @swagger
 * /award:
 *   put:
 *     summary: Give a movie an award
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - type
 *             properties:
 *               movieId:
 *                 type: number
 *                 description: Movie ID
 *               type:
 *                 type: string
 *                 description: Award type
 *                 enum:
 *                   - bronze
 *                   - silver
 *                   - gold
 *                   - platinum
 *     responses:
 *       200:
 *         description: Award granted successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to give this movie an award
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.put(
  "/award",
  verifyAuthToken,
  setAwardValidator,
  validateRequestSchema,
  moviesController.updateAward
);

/**
 * @swagger
 * /award:
 *   delete:
 *     summary: Remove an award for a movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *             properties:
 *               movieId:
 *                 type: number
 *                 description: Movie ID
 *     responses:
 *       204:
 *         description: Award removed successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       401:
 *         description: Unauthorized to strip a movie off its award
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *     security:
 *          - bearerAuth: []
 */
moviesRouter.delete(
  "/award",
  verifyAuthToken,
  deleteAwardValidator,
  validateRequestSchema,
  moviesController.removeAward
);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for a movie from its title or about
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Main search query
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         description: The number of movies to skip before returning results
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         description: The amount of movies returned to be viewed by the user before further scrolling
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Search results returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/Movie'
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       500:
 *         description: Internal server error
 */
moviesRouter.get(
  "/search",
  optionalToken,
  searchMoviesValidator,
  validateRequestSchema,
  moviesController.searchMovies
);

export default moviesRouter;
