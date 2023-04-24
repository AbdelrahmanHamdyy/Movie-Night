import { Movie, MovieData } from "../models/Movie";
import { UserRating, UserRatingData } from "../models/UserRating";
import { Watchlist } from "../models/Watchlist";
import ReqError from "../utils/error";

const movieModel = new Movie();
const userRating = new UserRating();
const watchlist = new Watchlist();

/**
 * This function generates a verification token of type "resetPassword" and
 * then sends a reset password email to the user which contains the created token.
 * If the email wasn't sent successfully then an error is thrown & caught in the controller
 *
 * @param {Object} user User object
 * @returns {Object}
 */
export async function getMovieDetails(
  movieId: number,
  userId: number | undefined
): Promise<Object> {
  let inWatchlist: boolean = false;
  let rated: boolean = false;
  let rate: number = 0;
  const movie: MovieData = await movieModel.getMovieById(movieId);
  if (userId) {
    inWatchlist = await watchlist.exists(userId, movieId);
    rate = await userRating.getRating(userId, movieId);
    if (rate != -1) {
      rated = true;
    }
  }
  return {
    movie,
    inWatchlist,
    rated,
    rate,
  };
}
