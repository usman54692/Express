import { config } from "dotenv";

config();

const _Config={
    port: process.env.PORT
}

export const Config=Object.freeze(_Config);