import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { rateMovieValidator } from "../validators/ratingValidators.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import ratingController from "../controllers/ratingController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";
import { userIdValidator } from "../validators/loginValidators.ts";

const ratingRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: Movie Ratings Endpoints
 */

/**
 * @swagger
 * /rate:
 *   post:
 *     summary: Register a user rating for a given movie
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - rating
 *             properties:
 *               movieId:
 *                 type: number
 *                 description: Movie ID
 *               rating:
 *                 type: number
 *                 description: A number from 0 to 10 for rating a movie by the logged in user
 *     responses:
 *       200:
 *         description: Rated movie successfully
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
 *         description: Unauthorized to rate this movie
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
ratingRouter.post(
  "/rate",
  verifyAuthToken,
  rateMovieValidator,
  validateRequestSchema,
  ratingController.rate
);

/**
 * @swagger
 * /movie-ratings/{id}:
 *   get:
 *     summary: Return all user ratings for this movie
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Ratings returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type: array
 *                 description: User Ratings for the given movie
 *                 items:
 *                    type: object
 *                    properties:
 *                       userId:
 *                           type: number
 *                           description: ID of the user who gave this rating
 *                       rate:
 *                           type: number
 *                           description: The user rating
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
ratingRouter.get(
  "/movie-ratings/:id",
  movieIdValidator,
  validateRequestSchema,
  ratingController.getMovieRatings
);

/**
 * @swagger
 * /user-ratings/{id}:
 *   get:
 *     summary: Return all movie ratings for a user
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User Ratings returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type: array
 *                 description: All ratings for this user
 *                 items:
 *                    type: object
 *                    properties:
 *                       movieId:
 *                           type: number
 *                           description: Movie ID
 *                       rate:
 *                           type: number
 *                           description: Rating given for this movie
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
ratingRouter.get(
  "/user-ratings/:id",
  userIdValidator,
  validateRequestSchema,
  ratingController.getUserRatings
);

export default ratingRouter;
