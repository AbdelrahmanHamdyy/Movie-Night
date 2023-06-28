import { Watchlist, WatchlistData } from "../models/Watchlist.ts";
import ReqError from "../utils/error.ts";

const watchlist = new Watchlist();

/**
 * This function returns the limited watchlist movies of a
 * certain user showing the movie details and returning the list
 *
 * @param {Number} userId User requesting to see his watchlist
 * @param {Number} skip Number of movies to skip
 * @param {Number} limit Number of movies to return
 * @returns {Array<WatchlistData>}
 */
export async function getWatchlistMovies(
  userId: number,
  skip: number,
  limit: number
): Promise<Array<WatchlistData>> {
  const movies = await watchlist.get(userId, skip, limit);
  return movies;
}

/**
 * This function takes a user ID and movie ID & checks whether the movie
 * is available in the user's watchlist or not (throws an error)
 *
 * @param {Number} userId ID of the user
 * @param {Number} movieId Movie ID to be added to watchlist of that user
 * @returns {void}
 */
export async function checkMovieInWatchlist(
  userId: number,
  movieId: number
): Promise<void> {
  const movieExists = await watchlist.exists(userId, movieId);
  if (movieExists) {
    const error = new ReqError("Movie already added to the user's watchlist");
    error.statusCode = 409;
    throw error;
  }
}

/**
 * This function deletes a movie from the user's watchlist after
 * checking if it's there & not already deleted
 *
 * @param {Number} userId ID of the user
 * @param {Number} movieId Movie ID to be added to watchlist of that user
 * @returns {void}
 */
export async function removeMovieFromWatchlist(
  userId: number,
  movieId: number
): Promise<void> {
  const movieExists = await watchlist.exists(userId, movieId);
  if (!movieExists) {
    const error = new ReqError("Movie already removed from watchlist");
    error.statusCode = 409;
    throw error;
  }
  await watchlist.remove(userId, movieId);
}
