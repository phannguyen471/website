"use client"

import { useEffect } from "react"
import { track } from "@/lib/track"

/**
 * Bắt mọi click vào phần tử có `data-track` (gọi, Zalo, CTA báo giá) trên
 * trang landing — kể cả nút liên hệ nổi của layout — và gửi thành sự kiện GA4.
 */
export default function LandingTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]")
      if (!el?.dataset.track) return
      track(el.dataset.track, { link_url: el.getAttribute("href") ?? "" })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
