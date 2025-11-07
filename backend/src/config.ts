import dotenv from "dotenv"

dotenv.config()

export const appOrigin = process.env.APPLICATION_ORIGIN!
export const port = process.env.PORT!
export const databaseUrl = process.env.DATABASE_URL!
export const accessSecretKey = process.env.ACCESS_TOKEN_SECRET!