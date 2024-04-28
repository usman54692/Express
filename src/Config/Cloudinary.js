import {v2 as cloudinary} from 'cloudinary';
import { Config } from './Config.js';
          
cloudinary.config({ 
  cloud_name: Config.cloudName, 
  api_key: Config.apikeyCloudinary, 
  api_secret: Config.apiSecretKeyCloudinary,
});



export default cloudinary;
