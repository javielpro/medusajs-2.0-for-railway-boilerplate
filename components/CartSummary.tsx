import { useEffect, useState } from "react"

export default function CartSummary({ cart }) {
  const [feeEnabled, setFeeEnabled] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/platform-fee`)
      .then((res) => res.json())
      .then((data) => setFeeEnabled(data.enabled))
  }, [])

  const subtotal = cart.subtotal || 0
  const fee = feeEnabled ? Math.round(subtotal * 0.05) : 0
  const total = subtotal + fee

  return (
    <div>
      <div>Subtotal: ${(subtotal / 100).toFixed(2)}</div>
      {feeEnabled && (
        <div>Platform Processing Fee (5%): ${(fee / 100).toFixed(2)}</div>
      )}
      <div className="font-bold">Total: ${(total / 100).toFixed(2)}</div>
    </div>
  )
}
