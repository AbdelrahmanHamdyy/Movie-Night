import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import movieActorController from "../controllers/movieActorController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";

const movieActorRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movie Actors
 *   description: Endpoints for actors in a movie
 */

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
