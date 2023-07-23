import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import {
  createfilmMakerValidator,
  updatefilmMakerValidator,
  filmMakerIdValidator,
  filmMakerTypeValidator,
  filmMakerMoviesValidator,
} from "../validators/filmMakerValidators.ts";
import { verifyAuthToken } from "../middlewares/verifyToken.ts";
import filmMakerController from "../controllers/filmMakerController.ts";
import { movieIdValidator } from "../validators/movieValidators.ts";

const filmMakerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Film Makers
 *   description: Endpoints for Actors/Writers/Producers/Directors
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      FilmMaker:
 *        type: object
 *        properties:
 *           id:
 *             type: number
 *             description: Film Maker ID
 *           first_name:
 *             type: string
 *             description: First Name
 *           last_name:
 *             type: string
 *             description: Last Name
 *           about:
 *             type: string
 *             description: Quick summary about this film maker.
 *           country:
 *             type: string
 *             description: Nationality
 *           gender:
 *             type: string
 *             default: male
 *             enum:
 *                - male
 *                - female
 *           avatar:
 *             type: string
 *             description: Display picture URL
 *           birthday:
 *             type: string
 *             format: date
 *             description: Date that this person was born
 *           is_writer:
 *             type: boolean
 *             description: True if this film maker is a writer, else False
 *           is_producer:
 *             type: boolean
 *             description: True if this film maker is a producer, else False
 *           is_director:
 *             type: boolean
 *             description: True if this film maker is a director, else False
 *           is_actor:
 *             type: boolean
 *             description: True if this film maker is an actor, else False
 */

/**
 * @swagger
 * /film-maker:
 *   post:
 *     summary: Create an actor, producer, director, or writer
 *     tags: [Film Makers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - country
 *               - avatar
 *               - gender
 *               - isWriter
 *               - isDirector
 *               - isProducer
 *               - isActor
 *             properties:
 *                 firstName:
 *                   type: string
 *                   description: First Name
 *                 lastName:
 *                   type: string
 *                   description: Last Name
 *                 about:
 *                   type: string
 *                   description: Quick summary about this film maker.
 *                 country:
 *                   type: string
 *                   description: Nationality
 *                 gender:
 *                   type: string
 *                   default: male
 *                   enum:
 *                      - male
 *                      - female
 *                 avatar:
 *                   type: object
 *                   description: Profile picture
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   description: Date that this person was born
 *                 isWriter:
 *                   type: boolean
 *                   description: True if this film maker is a writer, else False
 *                 isProducer:
 *                   type: boolean
 *                   description: True if this film maker is a producer, else False
 *                 isDirector:
 *                   type: boolean
 *                   description: True if this film maker is a director, else False
 *                 isActor:
 *                   type: boolean
 *                   description: True if this film maker is an actor, else False
 *     responses:
 *       201:
 *         description: Film Maker created successfully
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
 *         description: Unauthorized to create a new film maker
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
filmMakerRouter.post(
  "/film-maker",
  verifyAuthToken,
  createfilmMakerValidator,
  validateRequestSchema,
  filmMakerController.createFilmMaker
);

/**
 * @swagger
 * /film-maker:
 *   put:
 *     summary: Update the info of an actor, producer, director, or writer
 *     tags: [Film Makers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             required:
 *                - id
 *             properties:
 *                 id:
 *                   type: number
 *                   description: Film maker ID
 *                 firstName:
 *                   type: string
 *                   description: First Name
 *                 lastName:
 *                   type: string
 *                   description: Last Name
 *                 about:
 *                   type: string
 *                   description: Quick summary about this film maker.
 *                 country:
 *                   type: string
 *                   description: Nationality
 *                 gender:
 *                   type: string
 *                   default: male
 *                   enum:
 *                      - male
 *                      - female
 *                 avatar:
 *                   type: object
 *                   description: Profile picture
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   description: Date that this person was born
 *                 isWriter:
 *                   type: boolean
 *                   description: Update this person to be a writer
 *                 isProducer:
 *                   type: boolean
 *                   description: Update this person to be a producer
 *                 isDirector:
 *                   type: boolean
 *                   description: Update this person to be a director
 *                 isActor:
 *                   type: boolean
 *                   description: Update this person to be an actor
 *     responses:
 *       200:
 *         description: Film maker's data updated successfully
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
 *         description: Unauthorized to update info
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
filmMakerRouter.put(
  "/film-maker",
  verifyAuthToken,
  updatefilmMakerValidator,
  validateRequestSchema,
  filmMakerController.updateFilmMaker
);

/**
 * @swagger
 * /film-maker/{id}:
 *   delete:
 *     summary: Delete a film maker
 *     tags: [Film Makers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Film Maker ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Film Maker deleted successfully
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
 *         description: Unauthorized to delete this film maker
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
filmMakerRouter.delete(
  "/film-maker/:id",
  verifyAuthToken,
  filmMakerIdValidator,
  validateRequestSchema,
  filmMakerController.deleteFilmMaker
);

/**
 * @swagger
 * /film-maker/{id}:
 *   get:
 *     summary: Get a film maker details
 *     tags: [Film Makers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Film Maker ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Film Maker retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmMaker'
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
filmMakerRouter.get(
  "/film-maker/:id",
  filmMakerIdValidator,
  validateRequestSchema,
  filmMakerController.getFilmMaker
);

/**
 * @swagger
 * /film-makers:
 *   get:
 *     summary: Get all film makers of a certain type
 *     tags: [Film Makers]
 *     parameters:
 *       - in: query
 *         name: type
 *         description: Type of film makers to be retrieved
 *         required: true
 *         schema:
 *           type: number
 *           default: actors
 *           enum:
 *             - actors
 *             - writers
 *             - directors
 *             - producers
 *     responses:
 *       200:
 *         description: Film Makers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/FilmMaker'
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
filmMakerRouter.get(
  "/film-makers",
  filmMakerTypeValidator,
  validateRequestSchema,
  filmMakerController.getFilmMakers
);

/**
 * @swagger
 * /movies/{filmMakerId}:
 *   get:
 *     summary: Get the names of movies done by a certain actor/writer/producer/director
 *     tags: [Film Makers]
 *     parameters:
 *       - in: path
 *         name: filmMakerId
 *         description: Film Maker ID
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: type
 *         description: Type of this filmMaker
 *         schema:
 *           type: number
 *           default: actors
 *           enum:
 *             - actor
 *             - writer
 *             - director
 *             - producer
 *     responses:
 *       200:
 *         description: Film Maker movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                        movieId:
 *                           type: number
 *                           description: Movie ID
 *                        movieTitle:
 *                           type: string
 *                           description: Movie famous name
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
filmMakerRouter.get(
  "/movies/:filmMakerId",
  filmMakerMoviesValidator,
  validateRequestSchema,
  filmMakerController.getFilmMakerMovies
);

/**
 * @swagger
 * /movie-actors/{id}:
 *   get:
 *     summary: Get all actors of a certain movie
 *     tags: [Film Makers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Movie ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Movie actors returned successfully
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                        actorId:
 *                           type: number
 *                           description: Actor ID
 *                        firstName:
 *                           type: string
 *                           description: Actor First Name
 *                        lastName:
 *                           type: string
 *                           description: Actor Last Name
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
filmMakerRouter.get(
  "/movie-actors/:id",
  movieIdValidator,
  validateRequestSchema,
  filmMakerController.getMovieActors
);

/**
 * @swagger
 * /movie-writers/{id}:
 *   get:
 *     summary: Get all writers of a certain movie
 *     tags: [Film Makers]
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
filmMakerRouter.get(
  "/movie-writers/:id",
  movieIdValidator,
  validateRequestSchema,
  filmMakerController.getMovieWriters
);

export default filmMakerRouter;
