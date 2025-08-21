import { useEffect, useState } from "react"
import { Button } from "@medusajs/ui"

export default function PlatformFeeToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    fetch("/admin/platform-fee/toggle") // quick check
      .then((res) => res.json())
      .then((data) => setEnabled(data.enabled))
  }, [])

  const toggle = async () => {
    const res = await fetch("/admin/platform-fee/toggle", { method: "POST" })
    const data = await res.json()
    setEnabled(data.enabled)
  }

  return (
    <div>
      <h3>Platform Fee</h3>
      <p>Current: {enabled ? "Enabled ✅" : "Disabled ❌"}</p>
      <Button onClick={toggle}>
        {enabled ? "Disable Fee" : "Enable Fee"}
      </Button>
    </div>
  )
}
