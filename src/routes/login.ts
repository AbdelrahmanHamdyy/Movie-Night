import express from "express";
import { validateRequestSchema } from "../middlewares/validationResult";
import loginController from "../controllers/loginController";
import {
  forgetPasswordValidator,
  forgetUsernameValidator,
  loginValidator,
  resetPasswordValidator,
} from "../validators/loginValidators";

const loginRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Login and Reset Password Endpoints
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in to the website
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username
 *               password:
 *                 type: string
 *                 description: Password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Username
 *                 token:
 *                   type: string
 *                   description: JWT Access token to verify that the user is logged in
 *       400:
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
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
loginRouter.post(
  "/login",
  loginValidator,
  validateRequestSchema,
  loginController.login
);

/**
 * @swagger
 * /login/forget-password:
 *   post:
 *     summary: Send forget password email to the user for resetting it
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username
 *               email:
 *                 type: string
 *                 description: Email
 *     responses:
 *       200:
 *         description: Email has been sent
 *       400:
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
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
loginRouter.post(
  "/login/forget-password",
  forgetPasswordValidator,
  validateRequestSchema,
  loginController.forgetPassword
);

/**
 * @swagger
 * /reset-password/{id}/{token}:
 *   post:
 *     summary: Reset password for the user after verifying the token
 *     tags: [Login]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         description: The token created by the server to reset the password
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - newPassword
 *               - verifyPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password
 *               verifyPassword:
 *                 type: string
 *                 description: Repeated new password again to verify
 *     responses:
 *       200:
 *         description: Password updated successfully
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
loginRouter.post(
  "/reset-password/:id/:token",
  resetPasswordValidator,
  validateRequestSchema,
  loginController.resetPassword
);

/**
 * @swagger
 * /login/forget-username:
 *   post:
 *     summary: Sends a forget username email which contains the true username inside
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email to send the username to
 *     responses:
 *       200:
 *         description: Email has been sent
 *       400:
 *         description: The request was invalid. You may refer to response for details around why the request was invalid
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
loginRouter.post(
  "/login/forget-username",
  forgetUsernameValidator,
  validateRequestSchema,
  loginController.forgetUsername
);

export default loginRouter;
