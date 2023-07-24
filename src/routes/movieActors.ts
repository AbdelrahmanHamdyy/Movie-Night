import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import movieActorController from "../controllers/movieActorController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";
import { movieActorsValidator } from "../validators/movieActorValidators.ts";

const movieActorRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movie Actors
 *   description: Endpoints for actors in a movie
 */

/**
 * @swagger
 * /movie-actors:
 *   post:
 *     summary: Register one or many actors for a movie
 *     tags: [Movie Actors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - actors
 *             properties:
 *                 movieId:
 *                   type: number
 *                   description: Movie ID
 *                 actors:
 *                   type: array
 *                   description: Actor IDs of this movie
 *                   items:
 *                      type: number
 *                      description: Actor ID
 *     responses:
 *       200:
 *         description: Movie actors created successfully
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
 *         description: Unauthorized to create new movie actors
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
movieActorRouter.post(
  "/movie-actors",
  verifyAuthToken,
  movieActorsValidator,
  validateRequestSchema,
  movieActorController.createMovieActors
);

/**
 * @swagger
 * /movie-actors:
 *   delete:
 *     summary: Remove an actor from a movie
 *     tags: [Movie Actors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - actorId
 *             properties:
 *                 movieId:
 *                   type: number
 *                   description: Movie ID
 *                 actorId:
 *                   type: number
 *                   description: Actor ID
 *     responses:
 *       204:
 *         description: Movie actor deleted successfully
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
 *         description: Unauthorized to remove a movie actor
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
movieActorRouter.delete(
  "/movie-actors",
  verifyAuthToken,
  movieActorsValidator,
  validateRequestSchema,
  movieActorController.deleteMovieActors
);

/**
 * @swagger
 * /movie-actors/{id}:
 *   get:
 *     summary: Get all actors of a certain movie
 *     tags: [Movie Actors]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie actors returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                        actorId:
 *                           type: number
 *                           description: Actor ID
 *                        firstName:
 *                           type: string
 *                           description: Actor First Name
 *                        lastName:
 *                           type: string
 *                           description: Actor Last Name
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
movieActorRouter.get(
  "/movie-actors/:id",
  movieIdValidator,
  validateRequestSchema,
  movieActorController.getMovieActors
);

export default movieActorRouter;
