/**
 * Cấu hình đa ngôn ngữ.
 *
 * - Tiếng Việt là ngôn ngữ mặc định và giữ nguyên URL gốc (`/san-pham`)
 *   để không mất thứ hạng tìm kiếm đã có.
 * - Tiếng Anh nằm dưới tiền tố `/en` và dùng slug tiếng Anh
 *   (`/en/products`), map về route nội bộ trong `middleware.ts`.
 */

export const locales = ["vi", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "vi"

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v)
}

/** Mã ngôn ngữ đầy đủ cho thẻ `<html lang>` và Open Graph */
export const htmlLang: Record<Locale, string> = { vi: "vi", en: "en" }
export const ogLocale: Record<Locale, string> = { vi: "vi_VN", en: "en_US" }

/** Nhãn hiển thị trên nút chuyển ngôn ngữ */
export const localeLabel: Record<Locale, { short: string; full: string }> = {
  vi: { short: "VI", full: "Tiếng Việt" },
  en: { short: "EN", full: "English" },
}
