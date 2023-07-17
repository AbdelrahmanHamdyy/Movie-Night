import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import {
  reviewMovieValidator,
  updateReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  reviewReactionValidator,
} from "../validators/reviewValidators.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import reviewController from "../controllers/reviewController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";
import { userIdValidator } from "../validators/loginValidators.ts";

const reviewRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Movie reviews Endpoints
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Review:
 *        type: object
 *        properties:
 *           movieId:
 *             type: number
 *             description: Movie ID
 *           reviewBody:
 *             type: string
 *             description: Contents of the review
 *           spoiler:
 *             type: boolean
 *             description: This indicates whether this review contains a spoiler to this movie or not
 *           recommended:
 *             type: boolean
 *             description: Indicates whether this user recommends the movie to others or not
 *           favActorID:
 *             type: number
 *             description: This is the ID of the user's favorite actor
 */

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Register a user review for a given movie
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: User review submitted successfully
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
 *         description: Unauthorized to review this movie
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
reviewRouter.post(
  "/review",
  verifyAuthToken,
  reviewMovieValidator,
  validateRequestSchema,
  reviewController.submitReview
);

/**
 * @swagger
 * /review:
 *   put:
 *     summary: Edit review on a movie
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: User review updated successfully
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
 *         description: Unauthorized to update user review
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
reviewRouter.put(
  "/review",
  verifyAuthToken,
  updateReviewValidator,
  validateRequestSchema,
  reviewController.updateReview
);

/**
 * @swagger
 * /review:
 *   delete:
 *     summary: Deletes a user review
 *     tags: [Reviews]
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
 *         description: User review deleted successfully
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
 *         description: Unauthorized to delete this review
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
reviewRouter.delete(
  "/review",
  verifyAuthToken,
  deleteReviewValidator,
  validateRequestSchema,
  reviewController.deleteReview
);

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Retrieve a user review on a movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: userId
 *         description: User ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: movieId
 *         description: MovieId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User review retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    description:
 *                      type: string
 *                      description: Contents of the review
 *                    spoiler:
 *                      type: boolean
 *                      description: This indicates whether this review contains a spoiler to this movie or not
 *                    recommended:
 *                      type: boolean
 *                      description: Indicates whether this user recommends the movie to others or not
 *                    fav_actor_id:
 *                      type: number
 *                      description: This is the ID of the user's favorite actor
 *                    likes:
 *                      type: number
 *                      description: Number of likes on this review
 *                    dislikes:
 *                      type: number
 *                      description: Number of dislikes on this review
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
reviewRouter.get(
  "/review",
  getReviewValidator,
  validateRequestSchema,
  reviewController.getReview
);

/**
 * @swagger
 * /review-reaction:
 *   post:
 *     summary: Deletes a user review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userId
 *               - movieId
 *               - like
 *             properties:
 *               userId:
 *                 type: number
 *                 description: Movie ID
 *               movieId:
 *                 type: number
 *                 description: Movie ID
 *               like:
 *                 type: boolean
 *                 description: True for liking this review, False for disliking it
 *     responses:
 *       200:
 *         description: Liked/Disliked review successfully
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
 *         description: Unauthorized to react to this review
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
reviewRouter.post(
  "/review-reaction",
  verifyAuthToken,
  reviewReactionValidator,
  validateRequestSchema,
  reviewController.reactToReview
);

/**
 * @swagger
 * /movie-reviews/{id}:
 *   get:
 *     summary: Return all user reviews for this movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie reviews returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                    type: array
 *                    description: User reviews for the given movie
 *                    items:
 *                       type: object
 *                       properties:
 *                           user_id:
 *                             type: number
 *                             description: User ID
 *                           description:
 *                             type: string
 *                             description: Contents of the review
 *                           spoiler:
 *                             type: boolean
 *                             description: This indicates whether this review contains a spoiler to this movie or not
 *                           recommended:
 *                             type: boolean
 *                             description: Indicates whether this user recommends the movie to others or not
 *                           fav_actor_id:
 *                             type: number
 *                             description: This is the ID of the user's favorite actor
 *                           likes:
 *                             type: number
 *                             description: Number of likes on this review
 *                           dislikes:
 *                             type: number
 *                             description: Number of dislikes on this review
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
reviewRouter.get(
  "/movie-reviews/:id",
  movieIdValidator,
  validateRequestSchema,
  reviewController.getMovieReviews
);

/**
 * @swagger
 * /user-reviews/{id}:
 *   get:
 *     summary: Return all movie reviews for a user
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User reviews returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                    type: array
 *                    description: All reviews for this user
 *                    items:
 *                       type: object
 *                       properties:
 *                           movie_id:
 *                             type: number
 *                             description: Movie ID
 *                           description:
 *                             type: string
 *                             description: Contents of the review
 *                           spoiler:
 *                             type: boolean
 *                             description: This indicates whether this review contains a spoiler to this movie or not
 *                           recommended:
 *                             type: boolean
 *                             description: Indicates whether this user recommends the movie to others or not
 *                           fav_actor_id:
 *                             type: number
 *                             description: This is the ID of the user's favorite actor
 *                           likes:
 *                               type: number
 *                               description: Number of likes on this review
 *                           dislikes:
 *                               type: number
 *                               description: Number of dislikes on this review
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
reviewRouter.get(
  "/user-reviews/:id",
  userIdValidator,
  validateRequestSchema,
  reviewController.getUserReviews
);

export default reviewRouter;
