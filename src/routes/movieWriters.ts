import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import movieWriterController from "../controllers/movieWriterController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";
import { movieWritersValidator } from "../validators/movieWriterValidators.ts";

const movieWriterRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movie Writers
 *   description: Endpoints for writers of a movie
 */

/**
 * @swagger
 * /movie-writers:
 *   post:
 *     summary: Register one or many writers for a movie
 *     tags: [Movie Writers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - writers
 *             properties:
 *                 movieId:
 *                   type: number
 *                   description: Movie ID
 *                 writers:
 *                   type: array
 *                   description: Writer IDs of this movie
 *                   items:
 *                      type: number
 *                      description: Movie Writer ID
 *     responses:
 *       200:
 *         description: Movie writers created successfully
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
 *         description: Unauthorized to create new movie writers
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
movieWriterRouter.post(
  "/movie-writers",
  verifyAuthToken,
  movieWritersValidator,
  validateRequestSchema,
  movieWriterController.createMovieWriters
);

/**
 * @swagger
 * /movie-writers:
 *   delete:
 *     summary: Remove a writer from a movie
 *     tags: [Movie Writers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - movieId
 *               - writerId
 *             properties:
 *                 movieId:
 *                   type: number
 *                   description: Movie ID
 *                 writerId:
 *                   type: number
 *                   description: Writer ID
 *     responses:
 *       204:
 *         description: Movie writer deleted successfully
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
 *         description: Unauthorized to remove a movie writer
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
movieWriterRouter.delete(
  "/movie-writers",
  verifyAuthToken,
  movieWritersValidator,
  validateRequestSchema,
  movieWriterController.deleteMovieWriters
);

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
