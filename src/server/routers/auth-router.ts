import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"

export const AuthRouter = router({
  getDataSyncStatus: publicProcedure.query(({ c }) => {
    return c.json({ status: "Success" })
  }),
})
