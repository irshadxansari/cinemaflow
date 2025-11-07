import { Router } from "express";
import {
    signUp,
    signIn,
    SignOut,
    refreshToken,
    fetchMe,
} from "../controllers/auth.controller.ts"
import {authMiddleware} from "../middlewares/auth.middleware.ts"

const router = Router();

router.route("/auth/sign-up").post(signUp);
router.route("/auth/sign-in").post(signIn);
router.route("/auth/refresh-token").post(refreshToken);

// Secure Routes
router.route("/auth/sign-out").post(authMiddleware, SignOut);
router.route("/auth/me").post(authMiddleware, fetchMe);


export { router as authRouter }