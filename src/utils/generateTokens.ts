import jwt from "jsonwebtoken";
import crypto, { verify } from "crypto";
import { Token, TokenData } from "../models/Token";
import { UserData } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const verifyToken = new Token();

/**
 * This function creates a jwt token containing the id & username
 * of the user with a token secret for security
 *
 * @param {Object} user User object that contains user_id, and username
 * @returns {string} JWT created for that user
 */
export function generateJWT(user: UserData): string {
  try {
    const token = jwt.sign(
      { user_id: user.id, username: user.username },
      TOKEN_SECRET
    );

    return token;
  } catch (error) {
    throw new Error("Could not create a token");
  }
}

/**
 * This function creates a verification token for the user given
 * his id and type of this token. It first deletes any previous tokens
 * of the same type for this user to create the newly updated one with the
 * new expiration date which will be compared with the current date later when
 * the user verifies his email or resets his password.
 *
 * @param {number} user_id User Id
 * @param {string} type Type of the token (verfiyEmail, resetPassword)
 * @returns {string} Token created for that user
 */
export async function generateVerifyToken(
  user_id: number,
  type: string
): Promise<string> {
  try {
    await verifyToken.destroy(user_id, type);
    const TOKEN = crypto.randomBytes(32).toString("hex");
    await verifyToken.create({
      user_id: user_id,
      token: TOKEN,
      type: type,
    });

    return TOKEN;
  } catch (error) {
    console.log(error);
    throw new Error("Could not create a token");
  }
}
