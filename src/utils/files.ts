import multer from "multer";
import { Request } from "express";
import { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { __dirname } from "../app.ts";

export const fileStorage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.mimetype.split("/")[0] === "video") {
      cb(null, path.join(__dirname, "uploads/videos"));
    } else {
      cb(null, path.join(__dirname, "uploads/images"));
    }
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

export const fileFilter = (
  _req: Request,
  file: { mimetype: string },
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/x-m4v" ||
    file.mimetype === "video/x-matroska"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * A function that is used to delete a file from the server
 * @param {string} pathToFile File path
 * @returns {void}
 */
export function deleteFile(pathToFile: string): void {
  try {
    fs.unlinkSync(pathToFile);
    // console.log("Successfully deleted the file.");
  } catch (err) {
    // console.log("There is no file to delete.");
  }
}
