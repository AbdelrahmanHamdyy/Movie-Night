import express from "express";
import { Request, Response, NextFunction } from "express";
import { MysqlError } from "mysql";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import client from "./database";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

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
  apis: ["./routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

try {
  client.connect((err: MysqlError) => {
    if (err) throw err;
    console.log("Connected to MYSQL");
  });
} catch (err) {
  console.log("Failed to connect to MYSQL");
  console.log(err);
}

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

export default app;
