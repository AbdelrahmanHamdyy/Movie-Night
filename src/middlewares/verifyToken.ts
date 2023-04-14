import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

/**
 * A middleware used to verify an authentication token by extracting it from
 * the authorization header of a request and send back status code 401
 * with error message if the token is invalid or not provided
 *
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next Next function
 * @returns {void}
 */
export function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token: string = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_SECRET);

    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid Token",
    });
  }
}
