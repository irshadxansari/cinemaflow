import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

import { authRouter } from "./routes/auth.route.ts";
import { frontendUrl } from "./config.ts";

const app = express()

app.use(
    cors({
        origin: frontendUrl,
        credentials: true
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1', authRouter)

export { app }