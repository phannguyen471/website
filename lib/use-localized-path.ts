"use client"

import { useCallback, useEffect, useState } from "react"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n"
import { INTERNAL_BY_PUBLIC, QUERY_KEYS, SEGMENTS, path, type Section } from "@/lib/routes"
import slugMap from "@/data/i18n/slug-map.json"

type SlugMap = Record<string, Record<string, string>>

/**
 * Dịch đường dẫn đang xem sang ngôn ngữ khác, giữ nguyên trang và bộ lọc.
 *
 * `slug-map.json` (sinh bởi scripts/build-en.mjs) map slug hai chiều cho
 * sản phẩm, dịch vụ và tin tức, nên nút đổi ngôn ngữ không đá người dùng
 * về trang chủ. Query string đọc từ `window.location` thay vì
 * `useSearchParams()` để trang tĩnh không bị rơi xuống render phía client.
 */
export function useLocalizedPath() {
  const [search, setSearch] = useState("")

  useEffect(() => {
    setSearch(window.location.search)
  }, [])

  return useCallback(
    (pathname: string, target: Locale): string => {
      const parts = pathname.split("/").filter(Boolean)
      const current: Locale = parts[0] && isLocale(parts[0]) ? parts[0] : defaultLocale
      const rest = current === defaultLocale ? parts : parts.slice(1)

      if (rest.length === 0) return path(target)

      const [segment, slug] = rest
      const section = resolveSection(segment, current)
      if (!section) return path(target)

      if (slug) {
        const table = (slugMap as SlugMap)[`${current}->${target}`]
        return path(target, section, table?.[slug] ?? slug)
      }

      return path(target, section) + translateQuery(search, current, target)
    },
    [search],
  )
}

/**
 * Nhận cả segment công khai (`products`) lẫn tên route nội bộ (`san-pham`),
 * vì `usePathname()` có thể trả về đường dẫn trước hoặc sau khi rewrite
 * tuỳ trang được render tĩnh hay động.
 */
function resolveSection(segment: string, current: Locale): Section | undefined {
  return INTERNAL_BY_PUBLIC[current][segment] ?? (segment in SEGMENTS ? (segment as Section) : undefined)
}

/** Đổi tên tham số lọc (`danh-muc` ↔ `category`) và slug giá trị của nó */
function translateQuery(search: string, current: Locale, target: Locale): string {
  if (!search) return ""
  const from = new URLSearchParams(search)
  const to = new URLSearchParams()
  const table = (slugMap as SlugMap)[`${current}->${target}`]

  for (const kind of ["category", "group"] as const) {
    const value = from.get(QUERY_KEYS[kind][current])
    if (value) to.set(QUERY_KEYS[kind][target], table?.[value] ?? value)
  }

  const qs = to.toString()
  return qs ? `?${qs}` : ""
}
