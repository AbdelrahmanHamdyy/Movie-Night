import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import dotenv from "dotenv";
import { UserData } from "../models/User";

dotenv.config();

const API_KEY: any = process.env.SENDGRID_API_KEY;
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
