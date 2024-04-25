import express from "express";

import globalErrorHandler from "./middlewares/globaleErrorHandler.js";


const app = express();

// Routes 
app.get('/', (req, res,next) => {
    const error= new Error("something went wrong")
    next(error)
    
});

// Error handling middleware
app.use(globalErrorHandler);



export default app;
