import { config } from "dotenv";

config();

const _Config={
    port: process.env.PORT,
    DataBaseUrl:process.env.MONGO_URL,
    env:process.env.NODE_ENV,
    JwtToken:process.env.JWT_TOKEN,
    cloudName:process.env.CLOUD_NAME,
    apikeyCloudinary:process.env.API_KEY,
    apiSecretKeyCloudinary:process.env.CLOUDINARY_API_SECRET,
    


}


export const Config =Object.freeze(_Config);