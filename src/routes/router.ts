import express from "express";
import { Request, Response } from "express";
import signupRouter from "./signup.ts";
import loginRouter from "./login.ts";
import moviesRouter from "./movies.ts";
import watchlistRouter from "./watchlist.ts";
import companyRouter from "./companies.ts";
import ratingRouter from "./rating.ts";
import reviewRouter from "./reviews.ts";

const mainRouter = express.Router();

mainRouter.use(signupRouter);
mainRouter.use(loginRouter);
mainRouter.use(moviesRouter);
mainRouter.use(watchlistRouter);
mainRouter.use(companyRouter);
mainRouter.use(ratingRouter);
mainRouter.use(reviewRouter);

mainRouter.use((req: Request, res: Response) => {
  res.status(404).json(`Can't ${req.method} ${req.url}`);
});

export default mainRouter;
