import { useEffect, useState } from "react"
import { Button, Heading, Text } from "@medusajs/ui"
import type { RouteConfig } from "@medusajs/admin"

const PlatformFeeToggle = () => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    fetch("/admin/platform-fee/status")
      .then((r) => r.json())
      .then((d) => setEnabled(!!d.enabled))
      .catch(() => setEnabled(false))
  }, [])

  const toggle = async () => {
    const r = await fetch("/admin/platform-fee/toggle", { method: "POST" })
    const d = await r.json()
    setEnabled(!!d.enabled)
  }

  return (
    <div className="p-4 border rounded flex flex-col gap-2">
      <Heading level="h2">Platform Processing Fee</Heading>
      <Text>Current status: {enabled ? "Enabled ✅" : "Disabled ❌"}</Text>
      <Button variant="secondary" onClick={toggle}>
        {enabled ? "Disable Fee" : "Enable Fee"}
      </Button>
    </div>
  )
}

const config: RouteConfig = {
  link: {
    label: "Platform Fee",
    path: "/settings/platform-fee",
    group: "settings",
  },
  element: <PlatformFeeToggle />,
}

export default config
