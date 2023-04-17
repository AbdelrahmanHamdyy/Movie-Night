import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import checkJwtToken from "../services/userServices";

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

declare module "express" {
  interface Request {
    payload?: JwtPayload;
    loggedIn?: boolean;
  }
}

/**
 * A middleware used to verify an authentication token by extracting it from
 * the authorization header of a request and send back status code 401
 * with error message if the token is invalid or not provided
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
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
    req.payload = jwt.verify(token, TOKEN_SECRET) as JwtPayload;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid Token",
    });
  }
}

/**
 * Middleware used to check if there is a token in the request
 * header and if yes, then the payload is passed with the request and
 * a flag to indicate that the user is logged in
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 * @returns {void}
 */
export function optionalToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authResult = checkJwtToken(req);

  if (authResult) {
    req.loggedIn = true;
    req.payload = authResult;
  } else {
    req.loggedIn = false;
  }
  next();
}
