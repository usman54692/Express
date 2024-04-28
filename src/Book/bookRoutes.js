import express from "express";
import { createBook } from "./bookController.js";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 3e7 }
});

bookRouter.post("/", upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), createBook);

export default bookRouter;
