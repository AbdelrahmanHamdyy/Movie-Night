import express from "express";
import { Request, Response } from "express";
import signupRouter from "./signup";
import loginRouter from "./login";

const mainRouter = express.Router();

mainRouter.use(signupRouter);
mainRouter.use(loginRouter);

mainRouter.use((req: Request, res: Response) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
