import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult";
import {
  movieIdValidator,
  createMovieValidator,
} from "../validators/movieValidators";
import { optionalToken } from "../middlewares/verifyToken";
import moviesController from "../controllers/moviesController";

const moviesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies Endpoints
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Movie:
 *        type: object
 *        properties:
 *          id:
 *              type: number
 *              description: Movie ID
 *          title:
 *              type: string
 *              description: Movie Title
 *          about:
 *              type: string
 *              description: Description about the story of the movie and its main idea
 *          photo:
 *              type: string
 *              description: Display picture path of the movie
 *          trailer:
 *              type: string
 *              description: Path for the movie trailer
 *          score:
 *              type: number
 *              description: A number representing the popularity of this movie (Higher means more popular)
 *          rating:
 *              type: number
 *              description: Rating of the movie averaged from users who rated it
 *              minimum: 0
 *              maximum: 10
 *          budget:
 *              type: number
 *              format: double
 *              description: Budget of the movie
 *          release_date:
 *              type: string
 *              format: date-time
 *              description: Movie official release date
 *          language:
 *              type: string
 *              description: Language in which the movie was written with
 *          added_to_watchlist:
 *              type: boolean
 *              description: Indicates whether this movie was added to the watchlist in case there's a logged in user
 *          rated:
 *              type: boolean
 *              description: Indicates whether the logged in user has rated this movie or not
 *          user_rating:
 *              type: number
 *              description: The user rating in case the rated parameter was true
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
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
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
 * /movie:
 *   post:
 *     summary: Creates a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/formdata:
 *           schema:
 *             required:
 *               - title
 *               - about
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
 *               photo:
 *                 type: object
 *                 description: Image file
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
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       409:
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
  "/movie/:id",
  createMovieValidator,
  validateRequestSchema,
  moviesController.createMovie
);

export default moviesRouter;
