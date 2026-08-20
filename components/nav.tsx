import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import NavClient from "@/components/nav-client"

/**
 * Vỏ server cho thanh điều hướng: đọc nội dung đã dịch rồi truyền xuống
 * component client, để dữ liệu sản phẩm không bị đóng gói vào bundle trình duyệt.
 */
export default function Nav({ locale }: { locale: Locale }) {
  const { brand, groups } = content(locale)
  return <NavClient locale={locale} brand={brand} groups={groups} />
}
