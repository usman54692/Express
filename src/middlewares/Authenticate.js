import createHttpError from "http-errors";
import JWT from 'jsonwebtoken';
import { Config } from "../Config/Config.js";


const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if(!token){
    const error= createHttpError(401,("Authorization token is required"))
    return next(error)
  }

  const parsedToken=token.split(" ")[1];

  const decode= JWT.verify(parsedToken,Config.JwtToken)
  console.log("decode",decode);

  req.userId=decode.sub
  next();
};


export default authenticate;
