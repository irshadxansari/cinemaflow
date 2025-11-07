import type { Request, Response, NextFunction } from "express"
import { findUserById } from "../query/user.query.ts";
import { verifyAccessToken } from "../lib/auth.ts"

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized request",
                message: "Access token must required"
            })
        }

        const decoded = await verifyAccessToken(token)
        if (!decoded) {
            return res.status(401).json({
                error: "Unauthorized request",
                message: "Invalid access token"
            })
        }

        const user = await findUserById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                error: "not found",
                message: "Invalid access token"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            error: "Internal Error",
            message: "Something went wrong in auth middleware"
        })
    }
}