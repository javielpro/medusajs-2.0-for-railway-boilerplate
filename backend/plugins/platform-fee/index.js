import { Router } from "express"

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

export default async function platformFeePlugin(container) {
  const feeService = new PlatformFeeService()

  // API routes
  const storeRouter = Router()
  storeRouter.get("/platform-fee", (req, res) => {
    res.json({ enabled: feeService.getStatus() })
  })

  const adminRouter = Router()
  adminRouter.post("/platform-fee/toggle", (req, res) => {
    res.json({ enabled: feeService.toggle() })
  })

  return {
    service: feeService,
    storeRoutes: [
      {
        path: "/store",
        router: storeRouter,
      },
    ],
    adminRoutes: [
      {
        path: "/admin",
        router: adminRouter,
      },
    ],
  }
}
