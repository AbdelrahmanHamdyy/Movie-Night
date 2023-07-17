import { Movie } from "../models/Movie.ts";
import { Request } from "express";
import { Review, ReviewData } from "../models/Review.ts";
import { FilmMaker } from "../models/FilmMaker.ts";
import ReqError from "../utils/error.ts";

const reviewModel = new Review();
const movieModel = new Movie();
const filmMaker = new FilmMaker();

/**
 *
 *
 * @param {Number} userId User reviewing the movie
 * @param {Number} movieId ID of the movie to be reviewed
 * @param {Request["body"]} body Request Body containing the review contents
 * @returns {void}
 */
export async function createReview(
  userId: number,
  movieId: number,
  body: Request["body"]
): Promise<void> {
  let { reviewBody, spoiler, recommended, favActorID } = body;
  if (favActorID) {
    const actor = await filmMaker.getActorById(favActorID);
    if (!actor) {
      const error = new ReqError("Invalid Actor ID");
      error.statusCode = 400;
      throw error;
    }
  }
  spoiler ??= false;
  recommended ??= false;
  await reviewModel.create({
    user_id: userId,
    movie_id: movieId,
    description: reviewBody,
    spoiler,
    recommended,
    fav_actor_id: favActorID,
  });
}

/**
 *
 *
 * @param {Number} userId User updating review
 * @param {Number} movieId Movie ID
 * @param {Request["body"]} body Request Body containing the new review contents
 * @returns {void}
 */
export async function editReview(
  userId: number,
  movieId: number,
  body: Request["body"]
): Promise<void> {
  let { reviewBody, spoiler, recommended, favActorID } = body;
  if (favActorID) {
    const actor = await filmMaker.getActorById(favActorID);
    if (!actor) {
      const error = new ReqError("Invalid Actor ID");
      error.statusCode = 400;
      throw error;
    }
  }
  const review = await reviewModel.get(userId, movieId);
  review.description = reviewBody ?? review.description;
  review.spoiler = spoiler ?? review.spoiler;
  review.recommended = recommended ?? review.recommended;
  review.fav_actor_id = favActorID ?? review.fav_actor_id;
  await reviewModel.update(review);
}

/**
 *
 *
 * @param {Number} userId User ID
 * @param {Number} movieId Movie ID
 * @returns {ReviewData}
 */
export async function getUserReview(
  userId: number,
  movieId: number
): Promise<ReviewData> {
  const review = await reviewModel.get(userId, movieId);
  if (!review) {
    const error = new ReqError("Review not found");
    error.statusCode = 400;
    throw error;
  }
  return review;
}

/**
 *
 *
 * @param {Number} id Logged In User ID
 * @param {Number} userId User who owns the review
 * @param {Number} movieId Movie ID
 * @param {boolean} like True if the user likes the review, otherwise False
 * @returns {string} Response Message
 */
export async function react(
  id: number,
  userId: number,
  movieId: number,
  like: boolean
): Promise<string> {
  return "";
}

/**
 * Checks a review for this user on a movie exists or not and throws an error
 * according to the target value
 *
 * @param {Number} userId User ID
 * @param {Number} movieId Movie ID
 * @param {boolean} target Indicates whether we want to check if a review exists or doesn't exist
 * @returns {void}
 */
export async function reviewExists(
  userId: number,
  movieId: number,
  target: boolean
): Promise<void> {
  const exists = await reviewModel.exists(userId, movieId);
  let errorMsg: string = target
    ? "Review doesn't exist"
    : "Review already exists";
  if (exists !== target) {
    const error = new ReqError(errorMsg);
    error.statusCode = 400;
    throw error;
  }
}
