import mongoose from "mongoose";
import { Config } from "./Config.js";

const dbConnected= async ()=>{
  try {
  
   
    mongoose.connection.on('error',(err)=>{
      console.log('err in connected to dataBase',err);
  });
    mongoose.connection.on('connected', ()=>{
        console.log('DataBase Connected Succesfully');
    });

    
    await mongoose.connect(Config.DataBaseUrl);
    
  } catch (error) {
    console.log('connection failed in connected to database');
     process.exit(1)
  }
}

export default dbConnected;