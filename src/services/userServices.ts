import { generateJWT, generateVerifyToken } from "../utils/generateTokens";
import {
  sendForgetUsernameEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
} from "../utils/emails";
import { User, UserData } from "../models/User";
import { Token } from "../models/Token";
import ReqError from "../utils/error";
import bcrypt from "bcrypt";

const PEPPER = process.env.BCRYPT_PASSWORD;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

const userModel = new User();
const verifyToken = new Token();

type responseObject = {
  statusCode: number;
  body: Object;
};

/**
 * This function generates a verification token of type "verifyEmail" and
 * then sends a verification email to the user which contains the created token.
 * If the email was sent successfully then a reponse is sent back to the user containing
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
 * This function generates a verification token of type "resetPassword" and
 * then sends a reset password email to the user which contains the created token.
 * If the email wasn't sent successfully then an error is thrown & caught in the controller
 *
 * @param {Object} user User object
 * @returns {void}
 */
export async function forgetPasswordEmail(user: UserData): Promise<void> {
  const token = await generateVerifyToken(user.id as number, "resetPassword");
  const emailSent = sendResetPasswordEmail(user, token);

  if (!emailSent) {
    const error = new ReqError("Failed to send Reset Password email");
    error.statusCode = 400;
    throw error;
  }
}

/**
 * This function sends a forget username email to the user by calling the
 * utility function and checking its return value to know if the email was successfully
 * send without any errors or not
 *
 * @param {Object} user User object
 * @returns {void}
 */
export function forgetUsernameEmail(user: UserData): void {
  const emailSent = sendForgetUsernameEmail(user);

  if (!emailSent) {
    const error = new ReqError("Failed to send Forget Username email");
    error.statusCode = 400;
    throw error;
  }
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
    const error = new ReqError("Incorrect ID");
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
    const error = new ReqError("Incorrect Username");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

/**
 * This function takes an email the associated user is found in the
 * database, then throws an error if not
 *
 * @param {string} email Email
 * @returns {UserData} The user object found
 */
export async function checkUserByEmail(email: string): Promise<UserData> {
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    const error = new ReqError("Incorrect Email");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

/**
 * This function checks if there exists a user with the given username and
 * then checks that the email given is the same as that of the user. If not,
 * then an error is thrown with an incorrect email message
 *
 * @param {string} username Username
 * @param {string} email Email
 * @returns {UserData} The user object found
 */
export async function verifyUsernameAndEmail(
  username: string,
  email: string
): Promise<UserData> {
  const user = await checkUserByUsername(username);
  if (user.email !== email) {
    const error = new ReqError("Incorrect Email");
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
 * means that their email has been verified successfully if type is "verifyEmail", and if type
 * is "resetPassword", it calls the changePassword function to perform the password checks and update it
 *
 * @param {UserData} user User Object
 * @param {string} token Verification token
 * @param {string} type Type of this token: "verifyEmail" or "resetPassword"
 * @param {string} newPassword New password entered (Only when type is "resetPassword")
 * @param {string} verifyPassword Repeated password entered (Only when type is "resetPassword")
 * @returns {void}
 */
export async function verifyTokenAndUpdate(
  user: UserData,
  token: string,
  type: string,
  newPassword?: string,
  verifyPassword?: string
): Promise<void> {
  const verified = await verifyToken.validate(user.id as number, token);
  if (!verified) {
    const error = new ReqError("Token may be invalid or expired");
    error.statusCode = 403;
    throw error;
  }
  if (type === "verifyEmail") {
    user.verified_email = true;
    await userModel.update(user);
  } else {
    await changePassword(user, newPassword as string, verifyPassword as string);
  }
  await verifyToken.destroy(user.id as number, type);
}

/**
 * The function is responsible for changing the user's password. It makes sure
 * that the new given password is the same as the repeated password,
 * else throws an error, and then encrypts it using bcrypt's hash functions.
 * The user is then updated with the new hashed password
 *
 * @param {UserData} user User ID
 * @param {string} newPassword New password entered by the user
 * @param {string} verifyPassword Repeated password to ensure it's identical to the new one
 * @returns {void}
 */
export async function changePassword(
  user: UserData,
  newPassword: string,
  verifyPassword: string
): Promise<void> {
  if (newPassword !== verifyPassword) {
    const error = new ReqError("Passwords do not match");
    error.statusCode = 400;
    throw error;
  }

  const hash = bcrypt.hashSync(
    newPassword + PEPPER,
    parseInt(SALT_ROUNDS as string)
  );

  user.password = hash;
  await userModel.update(user);
}
