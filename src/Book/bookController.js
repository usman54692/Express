import cloudinary from "../Config/Cloudinary.js";
import { fileURLToPath } from "url";
import path from "node:path";
import createHttpError from "http-errors";
import { bookModel } from "./bookModel.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBook = async (req, res, next) => {
  try {
    const { title, genre } = req.body;
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
    console.log("userId", req.userId);

    const newBook = await bookModel.create({
      title,
      genre,
      author: req.userId,
      coverImage: uploadResult.secure_url,
      file: bookFileUploads.secure_url,
    });

    //  unlink file..

    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    return res.json({ id: newBook._id });
  } catch (error) {
    return next(createHttpError(400, "failed to upload"));
  }

  // console.log(req.files.coverImage[0].filename);
};

export const updateBook = async (req, res, next) => {
  try {
    const { title, genre } = req.body;
    const bookId = req.params.bookId;

    const book = await bookModel.findOne({ _id: bookId });
      console.log(book.author);
    if(!book){
    return next(createHttpError(402,'book Not Found'))
    }
      
    // check acess
    if(book.author.toString() !== req.userId){
return  next(403,'You can not update  others book')
    }
  // check if image filed is exist

  let completeCoverImage=''
  if(req.files.coverImage){
    const fileName=req.files.coverImage[0].filename
    const coverMimeType=req.files.coverImage[0].mimetype.split("/").at(-1)
    const filePath= path.resolve(__dirname,'../../public/data/uploads'+ fileName)

  }

  } catch (error) {}
};


