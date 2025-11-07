import { db } from "../db/index.ts"
import { refreshTokens } from "../db/schema.ts"
import { eq } from "drizzle-orm"

export async function deleteRefreshToken(token: string) {
    try {
        return db
            .delete(refreshTokens)
            .where(eq(refreshTokens.token, token));
    } catch (error) {
        console.log(`[ERROR_DELETE_REFRESH_TOKEN]`, error);
        return null
    }
}

export async function insertRefreshToken(token: string, userId: string) {
    try {
        return db
            .insert(refreshTokens)
            .values({
                userId: userId,
                token: token,
                expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
            })
    } catch (error) {
        console.log(`[ERROR_INSERT_REFRESH_TOKEN]`, error);
        return null
    }
}

export async function findRefreshToken(token: string) {
    try {
        return db
            .query.refreshTokens.findFirst({
                where: eq(refreshTokens.token, token)
            })
    } catch (error) {
        console.log(`[ERROR_FIND_REFRESH_TOKEN]`, error);
        return null
    }
}