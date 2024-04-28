import cloudinary from "../Config/Cloudinary.js";
import { fileURLToPath } from "url";
import path from "node:path";
import createHttpError from "http-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBook = async (req, res, next) => {
  try {
    const fileName = req.files.coverImage[0].filename;
    const coverImageMimeType = req.files.coverImage[0].mimetype
      .split("/")
      .at(-1);
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "Books-Covers",
      coverImage: coverImageMimeType,
    });

    console.log("uploads", uploadResult);

    // pdf uploads...
    const bookFileName = req.files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploads = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "bookpdfs",
      format: "pdf",
    });
    console.log("pdf uploads", bookFileUploads);
    return res.json({});
  } catch (error) {
    return next(createHttpError(400, "failed to upload"));
  }

  // console.log(req.files.coverImage[0].filename);
};
