import type { Request, Response } from "express"
import {
    findUserByEmail,
    createUser,
} from "../query/user.query.ts";
import argon2 from "argon2";
import {
    signUpSchema,
    signInSchema
} from "../schemas/auth.schema.ts"
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../lib/auth.ts"
import {
    deleteRefreshToken,
} from "../query/token.query.ts"

export async function signUp(req: Request, res: Response) {
    try {
        const data = req.body
        const validData = signUpSchema.safeParse(data);

        if (!validData.success) {
            return res.status(400).json({
                error: "Invalid input"
            })
        }
        const { name, email, password } = validData.data;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await argon2.hash(password);

        const createdUser = await createUser(name, email, hashedPassword);

        if (!createdUser) {
            return res.status(500).json({ error: "Something went wrong while registering the user" })
        }

        return res.status(200).json({ success: "User registered Successfully" })

    } catch (error) {
        return res.status(500).json({ error: "signUp - Internal Server Error" });
    }
}

export async function signIn(req: Request, res: Response) {
    try {
        const data = req.body
        const validData = signInSchema.safeParse(data);

        if (!validData.success) {
            return res.status(400).json({
                error: "Invalid input"
            })
        }

        const { email, password } = validData.data

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(404).json({ error: "Password does not match" });
        }

        const payload = { userId: user.id }
        const refreshToken = await generateRefreshToken(user.id)
        const accessToken = await generateAccessToken(payload)

        if (!refreshToken || !accessToken) {
            return res.status(500).json({
                error: "Failed to sign in. please try again!"
            })
        }

        const option = {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }
        return res
            .status(200)
            .cookie('refreshToken', refreshToken, option)
            .json({
                message: "Sign in successful.",
                accessToken: accessToken,
            })
    } catch (error) {
        return res.status(500).json({ error: "signIn - Internal Server Error" });
    }

}

export async function SignOut(req: Request, res: Response) {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "Refresh token required!"
            })
        }

        await deleteRefreshToken(refreshToken)

        const option = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .clearCookie("refreshToken", option)
            .json({
                message: "Sign out successful."
            })
    } catch (error) {
        return res.status(500).json({ error: "signOut - Internal Server Error" });
    }
}

export async function refreshToken(req: Request, res: Response) {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({
                error: "UNAUTHORIZED",
                message: "Invalid refresh token!"
            })
        }

        const payload = await verifyRefreshToken(refreshToken)
        if (!payload) {
            return res.status(401).json({
                error: "UNAUTHORIZED",
                message: "Invalid refresh token!"
            })
        }

        const accessToken = await generateAccessToken(payload)

        return res
            .status(200)
            .json({
                accessToken: accessToken,
                message: "Refresh successful."
            })
    } catch (error) {
        return res.status(500).json({
            message: "RefreshToken - Failed to refresh. Please try again!"
        })
    }
}

export async function fetchMe(req: Request, res: Response) {
    try {
        const user = req.user
        if (!user) {
            return res.status(400).json({
                error: "BAD_REQUEST",
                message: "User does not exist!"
            })
        }

        return res
            .status(200)
            .json({
                data: {
                    ...user
                },
                message: "User data fetched successfully."
            })
    } catch (error) {
        return res.status(500).json({
            message: "fetchMe - Failed to get user data. Please try again!"
        })
    }
}