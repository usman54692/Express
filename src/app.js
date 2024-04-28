import express from "express";

import globalErrorHandler from "./middlewares/globaleErrorHandler.js";
import userRouter from "./user/userRoutes.js";
import bookRouter from "./Book/bookRoutes.js";


const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
  const error = new Error("something went wrong");
  next(error);
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Error handling middleware
app.use(globalErrorHandler);


export default app;
