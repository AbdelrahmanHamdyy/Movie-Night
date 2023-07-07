import { Movie } from "../models/Movie.ts";
import { UserRating, UserRatingData } from "../models/UserRating.ts";
import ReqError from "../utils/error.ts";

const userRating = new UserRating();
const movieModel = new Movie();

/**
 * This function takes in the user ID, movie ID and the rating. It checks
 * if the user has rated this movie before so it updates it with the new rating
 * else it adds a new record with the user rating. The overall movie rating is also
 * updated in the movies table.
 *
 * @param {Number} userId User rating the movie
 * @param {Number} movieId ID of the movie to be rated
 * @param {Number} rating Rating given as a number to this movie by the user
 * @returns {void}
 */
export async function rateMovie(
  userId: number,
  movieId: number,
  rating: number
): Promise<void> {
  const userRatingData: UserRatingData = {
    user_id: userId,
    movie_id: movieId,
    rate: rating,
  };
  let scaledRating = 0;
  const movie = await movieModel.getMovieById(movieId);
  const ratings = await userRating.getNumberOfRatings(movieId);
  if (movie.rating) scaledRating = (movie.rating / 10.0) * (ratings * 10);
  const movieRated = await userRating.exists(userId, movieId);
  if (movieRated) {
    const oldRating = await userRating.getRating(userId, movieId);
    scaledRating += rating - oldRating;
    movie.rating = scaledRating / ratings;
    await userRating.update(userRatingData);
  } else {
    scaledRating += rating;
    movie.rating = scaledRating / (ratings + 1);
    await userRating.add(userRatingData);
  }
  await movieModel.update(movie);
}
