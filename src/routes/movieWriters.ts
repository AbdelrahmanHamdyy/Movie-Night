import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import movieWriterController from "../controllers/movieWriterController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";

const movieWriterRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movie Writers
 *   description: Endpoints for writers of a movie
 */

/**
 * @swagger
 * /movie-writers/{id}:
 *   get:
 *     summary: Get all writers of a certain movie
 *     tags: [Movie Writers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie writers returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                        writerId:
 *                           type: number
 *                           description: Writer ID
 *                        firstName:
 *                           type: string
 *                           description: Writer First Name
 *                        lastName:
 *                           type: string
 *                           description: Writer Last Name
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
movieWriterRouter.get(
  "/movie-writers/:id",
  movieIdValidator,
  validateRequestSchema,
  movieWriterController.getMovieWriters
);

export default movieWriterRouter;
