import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult.ts";
import signupController from "../controllers/signupController.ts";
import {
  signupValidator,
  emailValidator,
  usernameValidator,
  verifyEmailValidator,
} from "../validators/signupValidators.ts";

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
 *       401:
 *         description: Username is already taken
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 */
signupRouter.get(
  "/username-available",
  usernameValidator,
  validateRequestSchema,
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
 *       401:
 *         description: Email is already taken
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 */
signupRouter.get(
  "/email-available",
  emailValidator,
  validateRequestSchema,
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
 *         description: Invalid Token
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 */
signupRouter.post(
  "/verify-email/:id/:token",
  verifyEmailValidator,
  validateRequestSchema,
  signupController.verifyEmail
);

export default signupRouter;
