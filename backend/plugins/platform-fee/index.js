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

export default (container, options) => {
  const feeService = new PlatformFeeService()
  container.register("platformFeeService", feeService)

  const router = container.resolve("router")

  router.get("/store/platform-fee", (req, res) => {
    res.json({ enabled: feeService.getStatus() })
  })

  router.post("/admin/platform-fee/toggle", (req, res) => {
    res.json({ enabled: feeService.toggle() })
  })
}
