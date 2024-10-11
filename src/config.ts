import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";
dotenv.config();

interface EnvConfig {
  PORT: number;
  HOSTNAME: string;
}

const config = cleanEnv(process.env, {
  PORT: num({ default: 8080 }),
  HOSTNAME: str({ default: "0.0.0.0" }),
});

export const env: EnvConfig = {
  PORT: config.PORT,
  HOSTNAME: config.HOSTNAME,
};
