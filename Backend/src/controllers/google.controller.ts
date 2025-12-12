import { Request, Response } from "express";
import {
    createAccessToken,
    createRefreshToken,
    saveRefreshToken,
} from "../utils/token.js";

// This controller runs AFTER passport.authenticate has successfully populated req.user
export const googleCallbackController = async (req: Request, res: Response) => {
    try {
        const user = req.user as any;

        if (!user) {
            return res.redirect(`${process.env.FRONTEND_ORIGIN}/auth/signin?error=auth_failed`);
        }

        const accessToken = createAccessToken(user.id, user.role);
        const refreshToken = createRefreshToken(user.id);

        await saveRefreshToken(user.id, refreshToken);

        // Set Cookies (Same config as loginUser)
        res.cookie("at", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("rt", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Redirect to frontend (dashboard or home)
        return res.redirect(`${process.env.FRONTEND_ORIGIN}/`);
    } catch (err) {
        console.error("Google OAuth Error:", err);
        return res.redirect(`${process.env.FRONTEND_ORIGIN}/auth/signin?error=server_error`);
    }
};
