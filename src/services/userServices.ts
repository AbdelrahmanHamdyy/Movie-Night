import { generateJWT, generateVerifyToken } from "../utils/generateTokens";
import { sendVerifyEmail } from "../utils/emails";
import { UserData } from "../models/User";

type responseObject = {
  statusCode: number;
  body: Object;
};

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
