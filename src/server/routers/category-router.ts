import { db } from "@/db"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"
import { startOfMonth } from "date-fns"

// Fetch categories for the authenticated user
export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id }, // ctx.user contains the authenticated user
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updateAt: true,
        createAt: true,
      },
      orderBy: { updateAt: "desc" }, // Sort by last update, newest first
    })

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        // Get the start of the current month
        const now = new Date()
        // Get the first day of this month
        const firstDayOfMonth = startOfMonth(now)

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          db.event
            .findMany({
              where: {
                EventCategory: { id: category.id }, // Only look at events in the current category
                createdAt: { gte: firstDayOfMonth }, // Only events created this month
              },
              select: { fields: true }, // Only select the "fields" of the event
              distinct: ["fields"], // Ensure only distinct field names are returned
            })
            .then((events) => {
              const fieldNames = new Set<string>() // A Set to store unique field names

              //For each event, look through its fields
              events.forEach((event) => {
                // For each field in the event, add it to the Set
                Object.keys(event.fields as object).forEach((fieldName) => {
                  fieldNames.add(fieldName) // Add the field name to the Set
                })
              })

              return fieldNames.size
            }),

          db.event.count({
            where: {
              EventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
          db.event.findFirst({
            where: {
              EventCategory: { id: category.id },
            },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
        ])

        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    )

    // Return the categories in the response
    return c.json({})
  }),
})
