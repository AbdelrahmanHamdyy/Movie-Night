import { generateJWT, generateVerifyToken } from "../utils/generateTokens";
import { sendVerifyEmail } from "../utils/emails";
import { UserData } from "../models/User";

type responseObject = {
  statusCode: number;
  body: Object;
};

/**
 * This function generates a verification token of type "verifyEmail" and
 * then sends a verification email to the user which contains the created token.
 * If the email was send successfully then a reponse is sent back to the user containins
 * the status code and a JWT token for authentication
 *
 * @param {Object} user User object
 * @returns {Object} Response to the request containing [statusCode, body]
 */
export async function verifyUser(user: UserData): Promise<responseObject> {
  const token = await generateVerifyToken(user.id, "verifyEmail");
  const emailSent = sendVerifyEmail(user, token);

  if (!emailSent) {
    return {
      statusCode: 400,
      body: {
        error: "Failed to send verification email!",
      },
    };
  }

  const jwtToken = generateJWT(user);
  return {
    statusCode: 201,
    body: {
      username: user.username,
      token: jwtToken,
    },
  };
}
