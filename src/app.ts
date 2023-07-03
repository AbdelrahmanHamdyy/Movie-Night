import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { fileStorage, fileFilter } from "./utils/files.ts";
import mainRouter from "./routes/router.ts";

const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Swagger Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie-Night",
      version: "1.0.0",
      description: "API-Documentation",
    },
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "cover", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "images", maxCount: 100 },
    { name: "trailer", maxCount: 1 },
  ])
);
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/videos", express.static(path.join(__dirname, "uploads/videos")));

app.use(mainRouter);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
