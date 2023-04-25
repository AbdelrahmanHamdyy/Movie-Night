import { Request } from "express";
import { Movie, MovieData } from "../models/Movie";
import { UserRating, UserRatingData } from "../models/UserRating";
import { Watchlist } from "../models/Watchlist";
import ReqError from "../utils/error";
import { FilmMaker } from "../models/FilmMaker";
import { Company } from "../models/Company";
import { Genre } from "../models/Genre";

const movieModel = new Movie();
const movieGenre = new Genre();
const userRating = new UserRating();
const watchlist = new Watchlist();
const filmMaker = new FilmMaker();
const company = new Company();

declare module "express" {
  interface File {
    photo?: Object;
  }
}

/**
 * This service function returns details about a movie given its id from the database
 * and returns extra booleans in case there is a logged in user. They are: Movie is in the
 * user's watchlist, he/she has rated it and what rating has he/she given the movie. Then append
 * these info together in a single object.
 *
 * @param {Number} movieId Movie ID
 * @param {Number} userId User ID in case there's a logged in user, else undefined
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
  if (!movie) {
    const error = new ReqError("Invalid ID. Movie was not found!");
    error.statusCode = 400;
    throw error;
  }
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

/**
 * This function checks if the director, producer, and production company for the
 * movie are found in the database given their id. If not, then an error is thrown
 * with the appropriate message
 *
 * @param {Request["body"]} reqBody Request Body
 * @returns {void}
 */
export async function checkMovieMakers(
  reqBody: Request["body"]
): Promise<void> {
  const { directorId, producerId, companyId } = reqBody;
  let errorMsg: string | undefined;
  const director = await filmMaker.getDirectorById(directorId);
  if (!director) {
    errorMsg = "Invalid director ID";
  }
  const producer = await filmMaker.getProducerById(producerId);
  if (!producer) {
    errorMsg = "Invalid producer ID";
  }
  const productionCompany = await company.getCompanyById(companyId);
  if (!productionCompany) {
    errorMsg = "Invalid production company ID";
  }
  if (errorMsg) {
    const error = new ReqError(errorMsg);
    error.statusCode = 400;
    throw error;
  }
}

/**
 * Creates a new movie from the parameters found in the body related
 * to the movie and then returns the new movie ID
 *
 * @param {Request["body"]} reqBody Request Body
 * @returns {number} ID of the newly created movie
 */
export async function createNewMovie(
  reqBody: Request["body"]
): Promise<number> {
  const movieId = await movieModel.create({
    title: reqBody.title,
    about: reqBody.about,
    release_date: reqBody.releaseDate,
    budget: reqBody.budget,
    language: reqBody.language,
    country: reqBody.country,
    duration: reqBody.duration,
    director_id: reqBody.directorId,
    producer_id: reqBody.producerId,
    company_id: reqBody.companyId,
  });
  return movieId;
}

/**
 * This function takes a movie id and checks if it's found in the database
 * or may have been deleted, then throws an error with a proper message
 *
 * @param {number} id Movie ID
 * @returns {MovieData} The movie object found
 */
export async function checkMovieById(id: number): Promise<MovieData> {
  const movie = await movieModel.getMovieById(id);
  if (!movie) {
    const error = new ReqError("Incorrect Movie ID");
    error.statusCode = 400;
    throw error;
  }
  return movie;
}

/**
 * This function takes a movie id and checks if it's found in the database
 * or may have been deleted, then throws an error with a proper message
 *
 * @param {number} id Movie ID
 * @param {Array} id Genres under this movie
 * @returns {void}
 */
export async function addGenres(id: number, genres: string[]): Promise<void> {
  for (let genreName in genres) {
    const genre = await movieGenre.getGenreByName(genreName);
    if (!genre) {
      const error = new ReqError(`Incorrect Genre Name ${genreName}`);
      error.statusCode = 400;
      throw error;
    }
    await movieGenre.addMovieGenre(id, genreName);
  }
}
