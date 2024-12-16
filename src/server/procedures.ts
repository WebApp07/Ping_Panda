import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import { Redis } from "@upstash/redis/cloudflare"
import { env } from "hono/adapter"
import { cacheExtension } from "./__internals/db/cache-extension"
import { j } from "./__internals/j"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { HTTPException } from "hono/http-exception"

const authMiddleware = j.middleware(async ({ c, next }) => {
  // Extract Authorization header
  const authHeader = c.req.header("Authorization")

  // Check for API Key in Authorization header
  if (authHeader) {
    const apiKey = authHeader.split(" ")[1] // bearer <API_KEY>

    const user = await db.user.findUnique({
      where: { apiKey }, // Check if API key exists
    })
    if (user) return next({ user }) // API key is valid, pass user to the next handler
  }

  const auth = await currentUser() // Check the logged-in user

  // No session found, return 401
  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id }, // Match session to user
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" }) // No user found in the database
  }

  return next({ user }) // Session is valid, pass user to the next handler
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = publicProcedure.use(authMiddleware)
