import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import {
  getWatchlistValidator,
  movieIdValidator,
} from "../validators/watchlistValidators.ts";
import watchlistController from "../controllers/watchlistController.ts";

const watchlistRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Watch-List
 *   description: Watchl-list Endpoints
 */

/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Returns the full watchlist of a certain user (This endpoint is a listing)
 *     tags: [Watch-List]
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
 *     responses:
 *       200:
 *         description: Watchlist returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/Watchlist'
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
watchlistRouter.get(
  "/watchlist",
  verifyAuthToken,
  getWatchlistValidator,
  validateRequestSchema,
  watchlistController.getWatchlist
);

/**
 * @swagger
 * /watchlist:
 *   post:
 *     summary: Adds movie to a user's watch-list
 *     tags: [Watch-List]
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
 *       200:
 *         description: Movie added to watch-list returned successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       409:
 *         description: Movie already added to watchlist
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
watchlistRouter.post(
  "/watchlist",
  verifyAuthToken,
  movieIdValidator,
  validateRequestSchema,
  watchlistController.addToWatchlist
);

/**
 * @swagger
 * /watchlist:
 *   delete:
 *     summary: Deletes a movie from the given user's watchlist
 *     tags: [Watch-List]
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
 *         description: Movie removed from watch-list successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this happened
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       409:
 *         description: Movie isn't in the watchlist
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
watchlistRouter.delete(
  "/watchlist",
  verifyAuthToken,
  movieIdValidator,
  validateRequestSchema,
  watchlistController.removeFromWatchlist
);

export default watchlistRouter;
