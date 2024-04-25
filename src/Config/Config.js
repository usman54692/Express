import { config } from "dotenv";

config();

const _Config={
    port: process.env.PORT,
    DataBaseUrl:process.env.MONGO_URL,
    env:process.env.NODE_ENV
}

export const Config=Object.freeze(_Config);