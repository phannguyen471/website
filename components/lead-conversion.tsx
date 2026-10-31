"use client"

import { useEffect } from "react"
import { LEAD_STORAGE_KEY } from "@/lib/landing"
import { track } from "@/lib/track"

/**
 * Bắn conversion `generate_lead` trên trang cảm ơn — chỉ khi vừa gửi form
 * thật (form để lại dữ liệu trong sessionStorage), nên F5, bấm Back hay mở
 * thẳng link đều không bị đếm thêm.
 */
export default function LeadConversion() {
  useEffect(() => {
    let lead: { product?: string; qty?: string; budget?: string; email?: string; phone?: string } | null
    try {
      lead = JSON.parse(sessionStorage.getItem(LEAD_STORAGE_KEY) || "null")
      sessionStorage.removeItem(LEAD_STORAGE_KEY)
    } catch {
      return
    }
    if (!lead) return

    // Enhanced Conversions: Google tự băm SHA-256 trước khi gửi
    const phone = (lead.phone || "").replace(/[^\d+]/g, "").replace(/^0/, "+84")
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    gtag?.("set", "user_data", {
      ...(lead.email ? { email: lead.email } : {}),
      ...(phone ? { phone_number: phone } : {}),
    })

    track("generate_lead", { product: lead.product, qty: lead.qty, budget: lead.budget })
  }, [])

  return null
}
