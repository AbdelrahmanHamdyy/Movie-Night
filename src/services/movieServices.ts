// @ts-nocheck
import { Request } from "express";
import { Movie, MovieData } from "../models/Movie.ts";
import { UserRating, UserRatingData } from "../models/UserRating.ts";
import { Watchlist } from "../models/Watchlist.ts";
import ReqError from "../utils/error.ts";
import { FilmMaker } from "../models/FilmMaker.ts";
import { Company } from "../models/Company.ts";
import { Genre } from "../models/Genre.ts";
import { deleteFile } from "../utils/files.ts";

const movieModel = new Movie();
const movieGenre = new Genre();
const userRating = new UserRating();
const watchlist = new Watchlist();
const filmMaker = new FilmMaker();
const company = new Company();

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
    ...movie,
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
  if (directorId && !director) {
    errorMsg = "Invalid director ID";
  }
  const producer = await filmMaker.getProducerById(producerId);
  if (producerId && !producer) {
    errorMsg = "Invalid producer ID";
  }
  const productionCompany = await company.getCompanyById(companyId);
  if (companyId && !productionCompany) {
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
 * This function takes a movie id and a genres array and checks
 * if the given genres are already inserted with the movie and adds it if not
 *
 * @param {number} id Movie ID
 * @param {Array} genres Genres under this movie
 * @returns {void}
 */
export async function addGenres(id: number, genres: string[]): Promise<void> {
  for (let genreName of genres) {
    const genreExists = await movieGenre.getMovieGenre(id, genreName);
    if (genreExists) {
      const error = new ReqError(`Genre ${genreName} already exists`);
      error.statusCode = 400;
      throw error;
    }
    const genre = await movieGenre.getGenreByName(genreName);
    if (!genre) {
      const error = new ReqError(`Incorrect Genre Name ${genreName}`);
      error.statusCode = 400;
      throw error;
    }
    await movieGenre.addMovieGenre(id, genreName);
  }
}

/**
 * This function takes a movie object and inserts the cover or trailer
 * after deleting the existing ones. It determines which one to insert
 * through the type argument and the files is the array containing the cover or trailer upload
 *
 * @param {MovieData} movie The movie object
 * @param {string} type Cover or Trailer
 * @param {Request["files"]} files Contains the cover or trailer file itself
 * @returns {void}
 */
export async function addCoverTrailer(
  movie: MovieData,
  type: string,
  files: Request["files"]
): Promise<void> {
  if (type == "cover") {
    if (!files || !files?.cover) {
      const error = new ReqError("Cover file not found");
      error.statusCode = 400;
      throw error;
    }
    if (movie.cover_url) deleteFile(movie.cover_url as string);
    movie.cover_url = files?.cover[0].path;
  } else {
    if (!files || !files?.trailer) {
      const error = new ReqError("Trailer not found");
      error.statusCode = 400;
      throw error;
    }
    if (movie.trailer_url) deleteFile(movie.trailer_url as string);
    movie.trailer_url = files?.trailer[0].path;
  }
  await movieModel.update(movie);
}

/**
 * This function takes a movie object and ideletes its cover or trailer
 * according to the type then updates the operation in the database
 *
 * @param {MovieData} movie The movie object
 * @param {string} type Cover or Trailer
 * @returns {void}
 */
export async function deleteCoverTrailer(
  movie: MovieData,
  type: string
): Promise<void> {
  if (type == "cover") {
    if (movie.cover_url) deleteFile(movie.cover_url as string);
    movie.cover_url = null;
  } else {
    if (movie.trailer_url) deleteFile(movie.trailer_url as string);
    movie.trailer_url = null;
  }
  await movieModel.update(movie);
}

/**
 * This function takes in the movie fron its id and the request body
 * which will use it to update the movie details one by one
 * and check for validations when needed
 *
 * @param {MovieData} movie The movie object
 * @param {Request["body"]} body Request body containing the new movie details
 * @returns {void}
 */
export async function editMovie(
  movie: MovieData,
  body: Request["body"]
): Promise<void> {
  movie.title = body.title ?? movie.title;
  movie.about = body.about ?? movie.about;
  movie.language = body.language ?? movie.language;
  movie.country = body.country ?? movie.country;
  movie.duration = body.duration ?? movie.duration;
  movie.budget = body.budget ?? movie.budget;
  movie.release_date = body.releaseDate ?? movie.release_date;

  await checkMovieMakers(body);
  movie.director_id = body.directorId ?? movie.director_id;
  movie.producer_id = body.producerId ?? movie.producer_id;
  movie.company_id = body.companyId ?? movie.company_id;

  await movieModel.update(movie);
}
