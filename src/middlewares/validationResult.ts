import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware used to check if there is a validation error in the request
 * according to validators using the validationResult function from the
 * express-validator package
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Next function
 * @returns {void}
 */
export function validateRequestSchema(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let errors: string[] = [];
    for (let i = 0; i < result.array().length; i++) {
      errors.push(result.array()[i].msg);
    }

    return res.status(400).json({ errors });
  }
  next();
}
