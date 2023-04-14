import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult";
import signupController from "../controllers/signupController";
import {
  signupValidator,
  emailValidator,
  usernameValidator,
} from "../validators/signupValidators";

const signupRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sign-up
 *   description: Sign Up and Email Verfication endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Creates a new account for a user given their credentials
 *     tags: [Sign-up]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email given by the user
 *               username:
 *                 type: string
 *                 description: Username
 *               password:
 *                 type: string
 *                 description: Password
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *     responses:
 *       201:
 *         description: The account has been successfully created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                 token:
 *                   type: string
 *                   description: Token that will be used for authorization
 *       400:
 *         description: The request was invalid. You may refer to response for details around why this may have happened
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
signupRouter.post(
  "/signup",
  signupValidator,
  validateRequestSchema,
  signupController.signup
);

/**
 * @swagger
 * /username-available:
 *   get:
 *     summary: Checks if the username prompted isn't taken by another user
 *     tags: [Sign-up]
 *     parameters:
 *       - in: query
 *         required: true
 *         name: username
 *         description: Username to check
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The username is available
 *       400:
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       409:
 *         description: Username already taken
 *       500:
 *         description: Internal server error
 */
signupRouter.get(
  "/username-available",
  usernameValidator,
  signupController.usernameAvailable
);

/**
 * @swagger
 * /email-available:
 *   get:
 *     summary: Checks if an email was used before
 *     tags: [Sign-up]
 *     parameters:
 *       - in: query
 *         required: true
 *         name: email
 *         description: Email to check
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The email is available
 *       400:
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       409:
 *         description: Email already taken
 *       500:
 *         description: Internal server error
 */
signupRouter.get(
  "/email-available",
  emailValidator,
  signupController.emailAvailable
);

/**
 * @swagger
 * /verify-email/{id}/{token}:
 *   post:
 *     summary: Verifies that an email is actually owned by the same user
 *     tags: [Sign-up]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User's id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         description: Token created by the server when signing in to verify the email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Type of error
 *       403:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */
signupRouter.post("/verify-email/:id/:token");

/**
 * @swagger
 * /random-username:
 *   get:
 *     summary: Get an available random username as a suggestion when creating an account
 *     tags: [Sign-up]
 *     parameters:
 *       - in: query
 *         name: count
 *         description: Number of random usernames to be generated
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       201:
 *         description: Usernames generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 usernames:
 *                   type: array
 *                   description: Array containing random usernames (Size = count)
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
signupRouter.get("/random-username");

export default signupRouter;
