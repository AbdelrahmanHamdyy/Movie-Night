import { generateJWT, generateVerifyToken } from "../utils/generateTokens";
import { sendVerifyEmail } from "../utils/emails";
import { User, UserData } from "../models/User";
import { Token } from "../models/Token";
import ReqError from "../utils/error";

const userModel = new User();
const verifyToken = new Token();

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
  const token = await generateVerifyToken(user.id as number, "verifyEmail");
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

/**
 * This function takes a user id and checks if it's found in the database
 * or may have been deleted, then throws an error with a proper message
 *
 * @param {number} id User ID
 * @returns {UserData} The user object found
 */
export async function checkUserById(id: number): Promise<UserData> {
  const user = await userModel.getUserById(id);
  if (!user) {
    const error = new ReqError("User not found");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

/**
 * This function takes a username and checks if it's found in the database
 * and the user isn't deleted, then throws an error if not
 *
 * @param {string} username Username
 * @returns {UserData} The user object found
 */
export async function checkUserByUsername(username: string): Promise<UserData> {
  const user = await userModel.getUserByUsername(username);
  if (!user) {
    const error = new ReqError("User not found");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

/**
 * Calls the authenticate function of the user model to check for
 * the username and password given and then throws an error if null
 * was returned
 *
 * @param {string} username Username
 * @param {string} password Password
 * @returns {UserData} The user object returned after authenticating
 */
export async function authenticateUser(
  username: string,
  password: string
): Promise<UserData> {
  const user = await userModel.authenticate(username, password);
  if (!user) {
    const error = new ReqError("Authentication Failed");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

/**
 * This function verifies that there is a verification token stored for the given
 * user and that it hasn't been expired. If a false result was returned then an error is
 * thrown, else it continues to update the verified_email attribute to true for the user which
 * means that their email has been verified successfully
 *
 * @param {UserData} user User ID
 * @param {string} token Verification token
 * @returns {void}
 */
export async function checkVerificationToken(
  user: UserData,
  token: string
): Promise<void> {
  const verified = await verifyToken.validate(user.id as number, token);
  if (!verified) {
    const error = new ReqError("Token may be invalid or expired");
    error.statusCode = 403;
    throw error;
  }
  user.verified_email = true;
  await userModel.update(user);
  await verifyToken.destroy(user.id as number, "verifyEmail");
}
