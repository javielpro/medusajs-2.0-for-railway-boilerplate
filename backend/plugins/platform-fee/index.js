import { Router } from "express"

/**
 * SUPER MINIMAL, IN-MEMORY FLAG (resets on restart).
 * Persist later in DB/env if needed.
 */
class PlatformFeeService {
  constructor() {
    this.enabled = false
  }
  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }
  getStatus() {
    return this.enabled
  }
}

export default async function platformFeePlugin() {
  const feeService = new PlatformFeeService()

  // Store routes
  const storeRouter = Router()
  storeRouter.get("/platform-fee", (req, res) => {
    res.json({ enabled: feeService.getStatus() })
  })

  // Admin routes
  const adminRouter = Router()
  adminRouter.get("/platform-fee/status", (req, res) => {
    res.json({ enabled: feeService.getStatus() })
  })
  adminRouter.post("/platform-fee/toggle", (req, res) => {
    res.json({ enabled: feeService.toggle() })
  })

  // Medusa 2.0 return contract
  return {
    service: feeService,
    storeRoutes: [{ path: "/store", router: storeRouter }],
    adminRoutes: [{ path: "/admin", router: adminRouter }],
  }
}
