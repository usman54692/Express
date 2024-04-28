import userModel from "./userModel.js";
import bcrypt from "bcrypt";
import { Config } from "../Config/Config.js";
import JWT from "jsonwebtoken";
import createHttpError from "http-errors";

const createUser = async (req, res, next) => {
  const { name, password, email } = req.body;

  // validation
  if (!name || !password || !email) {
    const error = new Error("All fields Are REQuired");
    return next(error);
  }

  const user = await userModel.findOne({ email });

  if (user) {
    const error = new Error("user Already has been taken");
    return next(error);
  }

  //   hashpassword...
  const hashPassword = await bcrypt.hash(password, 10);

  // create new user

  const newUser = userModel.create({
    name,
    email,
    password: hashPassword,
  });

  //    token generation ...
  const token = JWT.sign({ sub: newUser._id }, Config.JwtToken, {
    expiresIn: "7d",
  });

  return res.json({
    accessToken: token,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new Error("All fields are required"));
    }
  } catch (error) {
    return next(new Error("error while fileds are required"));
  }
   let user;
  try {
     user = await userModel.findOne({ email });

    if (!user) {
      return next(new Error("User Not Found"));
    }
  } catch (error) {
   
    return next(new Error("Error While User Not Authenticating"));

  }

  try {

    const ismatch= await bcrypt.compare(password, user.password);

    if(!ismatch){
      return next(createHttpError(401,"password is Not Valid"));


    }
    
  } catch (error) {

    return next(new Error("Error while password not match"),402)
    
  }

  // create access token..

  const token = JWT.sign({sub:user._id},Config.JwtToken,{expiresIn:"7d"});


  res.status(201).json({
    accessToken: token,
  });
};



export { createUser, loginUser };
