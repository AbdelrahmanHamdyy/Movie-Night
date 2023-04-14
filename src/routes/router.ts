import express from "express";
import { Request, Response } from "express";
import signupRouter from "./signup";

const mainRouter = express.Router();

mainRouter.use(signupRouter);

mainRouter.use((req: Request, res: Response) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
