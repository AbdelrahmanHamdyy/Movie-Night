import { Request } from "express";
import { Review, ReviewData } from "../models/Review.ts";
import { FilmMaker } from "../models/FilmMaker.ts";
import ReqError from "../utils/error.ts";

const reviewModel = new Review();
const filmMaker = new FilmMaker();

/**
 * This function creates a new review through the body contents
 * after validating the actor ID and setting the spoiler and recommended
 * as false in case they are undefined. Then, we call the create db function
 * from the review model.
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
 * Edit a review by first setting the review values of the body
 * in case they are present and then update the record using the
 * model db update function. We also check for the actor ID and
 * throw an error in case it's invalid.
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
 * This function returns a user review from the user ID and
 * movie ID. In case the review doesn't exist, it throws an error
 * with status code 400.
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
 * This if the main function that gets called when a user likes or dislikes
 * a review. We first determine whether this user has already liked or disliked
 * the review before and according to the decision of both, we increment and
 * decrement the number of likes/dislikes while setting an appropriate response
 * message and finally updating the review model.
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
  const review = await reviewModel.get(userId, movieId);
  const liked = await reviewModel.likedReview(id, userId, movieId);
  const disliked = await reviewModel.dislikedReview(id, userId, movieId);
  let msg = "";
  if (like) {
    msg = "Liked review successfully";
    if (!liked && disliked) {
      review.likes && review.likes++;
      review.dislikes && review.dislikes--;
      await reviewModel.updateReaction(id, userId, movieId, true);
    } else if (!liked && !disliked) {
      review.likes && review.likes++;
      await reviewModel.addToReactions(id, userId, movieId, true);
    } else if (liked && !disliked) {
      review.likes && review.likes--;
      msg = "Removed like on review successfully";
      await reviewModel.removeFromReactions(id, userId, movieId);
    }
  } else {
    msg = "Disliked review successfully";
    if (!disliked && liked) {
      review.dislikes && review.dislikes++;
      review.likes && review.likes--;
      await reviewModel.updateReaction(id, userId, movieId, false);
    } else if (!disliked && !liked) {
      review.dislikes && review.dislikes++;
      await reviewModel.addToReactions(id, userId, movieId, false);
    } else if (disliked && !liked) {
      review.dislikes && review.dislikes--;
      msg = "Removed dislike on review successfully";
      await reviewModel.removeFromReactions(id, userId, movieId);
    }
  }
  await reviewModel.update(review);
  return msg;
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
