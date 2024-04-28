
import mongoose, { Schema } from "mongoose";

const bookSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,

        required:true,
    },
    genre:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }

},{timestamps:true})


export default mongoose.model("Book",bookSchema);