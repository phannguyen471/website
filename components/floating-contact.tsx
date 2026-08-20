import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { IconPhone } from "@/components/icons"

/**
 * Cụm nút liên hệ nổi — giữ lại thói quen của site gốc
 * (Messenger / Facebook / Zalo), nhưng dựng lại theo dạng viên thuốc
 * gọn ở góc phải, không che nội dung trên mobile.
 */
export default function FloatingContact({ locale }: { locale: Locale }) {
  const t = dict(locale)
  const { brand } = content(locale)

  const items = [
    { label: t.common.zalo, href: brand.social.zalo, short: "Za" },
    { label: "Messenger", href: brand.social.messenger, short: "Ms" },
    { label: "Facebook", href: brand.social.facebook, short: "Fb" },
  ]

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={it.label}
          className="group flex items-center gap-2 rounded-full border border-line bg-white/95 py-2 pr-3 pl-2 shadow-lg backdrop-blur transition-all hover:border-navy-300"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-navy-500 text-[11px] font-semibold tracking-wide text-white">
            {it.short}
          </span>
          <span className="max-w-0 overflow-hidden text-xs font-medium whitespace-nowrap text-navy-500 transition-all duration-300 group-hover:max-w-[100px]">
            {it.label}
          </span>
        </a>
      ))}

      <a
        href={`tel:${brand.hotline}`}
        aria-label={t.common.call(brand.hotline)}
        className="flex items-center gap-2 rounded-full bg-brand-red py-2.5 pr-4 pl-3 text-white shadow-lg transition-colors hover:bg-brand-red-dark"
      >
        <IconPhone className="size-4" />
        <span className="text-xs font-semibold tracking-wide">{brand.hotline}</span>
      </a>
    </div>
  )
}
