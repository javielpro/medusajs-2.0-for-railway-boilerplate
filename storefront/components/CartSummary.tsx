import { useEffect, useState } from "react"

type Cart = {
  subtotal?: number // in minor units
}

export default function CartSummary({ cart }: { cart: Cart }) {
  const [feeEnabled, setFeeEnabled] = useState(false)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""
    fetch(`${base}/store/platform-fee`)
      .then((res) => res.json())
      .then((data) => setFeeEnabled(!!data.enabled))
      .catch(() => setFeeEnabled(false))
  }, [])

  const subtotal = cart?.subtotal ?? 0
  const fee = feeEnabled ? Math.round(subtotal * 0.05) : 0
  const total = subtotal + fee

  const toMoney = (cents: number) => (cents / 100).toFixed(2)

  return (
    <div className="space-y-1">
      <div>Subtotal: ${toMoney(subtotal)}</div>
      {feeEnabled && <div>Platform Processing Fee (5%): ${toMoney(fee)}</div>}
      <div className="font-bold">Total: ${toMoney(total)}</div>
    </div>
  )
}
