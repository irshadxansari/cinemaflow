import dotenv from "dotenv"

dotenv.config()

export const frontendUrl = process.env.FRONTEND_URL!
export const port = process.env.PORT!
export const databaseUrl = process.env.DATABASE_URL!
export const accessSecretKey = process.env.ACCESS_TOKEN_SECRET!
export const resendKey = process.env.RESEND_API_KEY!