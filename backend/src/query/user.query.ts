import { db } from "../db/index.ts"
import { users } from "../db/schema.ts"
import { eq } from "drizzle-orm"

export async function findUserByEmail(email: string) {
  try {
    return db.query.users.findFirst({
      where: eq(users.email, email)
    })
  } catch (error) {
    console.log(`[ERROR_FIND_USER_BY_EMAIL]`, error);
    return null
  }
}

export async function createUser(name: string, email: string, hashedPassword: string) {
  try {
    return db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning();
  } catch (error) {
    console.log(`[ERROR_CREATE_USER]`, error);
    return null
  }
}


export async function findUserById(id: string) {
  try {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  } catch (error) {
    console.log(`[ERROR_FIND_USER_BY_ID]`, error);
    return null
  }
}

export async function updateUserPassword(userId: string, password: string) {
  try {
    return db.update(users)
      .set({
        password,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));
  } catch (error) {
    console.log(`[ERROR_UPDATE_USER_PASSWORD]`, error);
    return null
  }
}