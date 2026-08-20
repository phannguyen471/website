"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales, localeLabel, type Locale } from "@/lib/i18n"
import { useLocalizedPath } from "@/lib/use-localized-path"
import { cn } from "@/lib/utils"

type Props = {
  locale: Locale
  className?: string
  /** `dark` dùng trên nền navy (thanh tiện ích, footer) */
  tone?: "light" | "dark"
  label: string
}

/**
 * Nút đổi ngôn ngữ. Giữ nguyên trang đang xem: đường dẫn hiện tại được
 * dịch sang ngôn ngữ kia (kể cả slug sản phẩm / bài viết), chỉ khi không
 * dịch được mới lùi về trang chủ của ngôn ngữ đó.
 */
export default function LanguageSwitcher({ locale, className, tone = "light", label }: Props) {
  const pathname = usePathname()
  const translate = useLocalizedPath()

  return (
    <div className={cn("flex items-center gap-1", className)} role="group" aria-label={label}>
      {locales.map((l, i) => {
        const active = l === locale
        return (
          <span key={l} className="flex items-center gap-1">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn("text-[10px]", tone === "dark" ? "text-white/30" : "text-line")}
              >
                /
              </span>
            )}
            <Link
              href={translate(pathname, l)}
              hrefLang={l}
              aria-current={active ? "true" : undefined}
              title={localeLabel[l].full}
              className={cn(
                "text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors",
                tone === "dark"
                  ? active
                    ? "text-brand-gold"
                    : "text-white/60 hover:text-white"
                  : active
                    ? "text-brand-red"
                    : "text-ink-soft hover:text-navy-500",
              )}
            >
              {localeLabel[l].short}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
