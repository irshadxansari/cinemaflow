import jwt from "jsonwebtoken";
import {
  accessSecretKey,
} from "../config.ts"
import { 
  insertRefreshToken, 
  findRefreshToken,
  deleteRefreshToken 
} from "../query/token.query.ts"

interface TokenPayload {
  userId: string;
}

export async function generateAccessToken(payload: TokenPayload) {
  try {
    return jwt.sign(payload,
      accessSecretKey, {
      expiresIn: "15m",
    });
  } catch (error) {
    console.log(`[ERROR_GENERATE_ACCESS_TOKEN]`, error);
    return null
  }
}

export async function generateRefreshToken(userId: string) {
  try {
    const token = crypto.randomUUID()
    await insertRefreshToken(token, userId)
    return token
  } catch (error) {
    console.log(`[ERROR_GENERATE_REFRESH_TOKEN]`, error);
    return null
  }
}

export async function verifyAccessToken(token: string) {
  try {
    const payload = jwt.verify(
      token,
      accessSecretKey,
    ) as TokenPayload
    return payload
  } catch (error) {
    console.log(`[ERROR_VERIFY_ACCESS_TOKEN]`, error);
    return null
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const refreshTokens = await findRefreshToken(token)
    if(!refreshTokens) return null
    const isValid = refreshTokens.expiresAt > new Date()
    if(!isValid) {
      await deleteRefreshToken(token)
      return null
    }
    return {userId: refreshTokens.userId}
  } catch (error) {
    console.log(`[ERROR_VERIFY_REFRESH_TOKEN]`, error);
    return null
  }
}
