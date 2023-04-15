import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import dotenv from "dotenv";
import { UserData } from "../models/User";

dotenv.config();

const API_KEY = process.env.SENDGRID_API_KEY as string;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const BASE = "localhost:3000";

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({ apiKey: API_KEY })
);

/**
 * This function sends a verification email to a certain user
 * to verify his email after signing up directly
 *
 * @param {UserData} user User object
 * @param {string} token Verification token that will be used to verify the email
 * @returns {boolean} True if the email was sent successfully and false if any error occured
 */
export function sendVerifyEmail(user: UserData, token: string): boolean {
  try {
    transporter.sendMail({
      to: user.email,
      from: SENDER_EMAIL,
      subject: "Movie Night - Verification Email",
      html: `<h1>Click <a href="${BASE}/verify-email/${user.id}/${token}">here</a> to verify your email</h1>`,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * This function sends a reset password email that will enable him
 * to enter new password when clicking on the link with the correct token
 *
 * @param {UserData} user User object
 * @param {string} token Verification token that will be used to reset the user's password
 * @returns {boolean} True if the email was sent successfully and false if any error occured
 */
export function sendResetPasswordEmail(user: UserData, token: string): boolean {
  try {
    transporter.sendMail({
      to: user.email,
      from: SENDER_EMAIL,
      subject: "Movie Night - Reset Password Email",
      html: `<h1>Click <a href="${BASE}/reset-password/${user.id}/${token}">here</a> to reset your password</h1>`,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * This function sends a forget username email that will simply
 * remind the user what his username is
 *
 * @param {UserData} user User object
 * @returns {boolean} True if the email was sent successfully and false if any error occured
 */
export function sendForgetUsernameEmail(user: UserData): boolean {
  try {
    transporter.sendMail({
      to: user.email,
      from: SENDER_EMAIL,
      subject: "Movie Night - Forget Username Email",
      html: `<h1>Your username is ${user.username}</h1>`,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
