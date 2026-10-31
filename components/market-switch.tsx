"use client"

import { usePathname } from "next/navigation"
import { AU_PATH } from "@/lib/au-landing"

/**
 * Chọn nội dung theo thị trường của trang đang xem — layout là server
 * component nên không tự biết đường dẫn. Hiện chỉ có landing Úc (`/en/au`)
 * dùng kênh liên hệ khác (WhatsApp, email thay cho Zalo, hotline).
 */
export default function MarketSwitch({ au, children }: { au: React.ReactNode; children: React.ReactNode }) {
  const pathname = usePathname()
  return pathname === AU_PATH || pathname.startsWith(`${AU_PATH}/`) ? au : children
}
