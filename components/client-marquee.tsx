import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"

/**
 * Dải chạy tên khách hàng doanh nghiệp. Danh sách được nhân đôi để
 * animation translateX(-50%) khớp liền mạch, không thấy điểm nối.
 */
export default function ClientMarquee({ locale }: { locale: Locale }) {
  const t = dict(locale)
  const items = content(locale).brand.clients
  const loop = [...items, ...items]

  return (
    <div className="border-y border-line bg-shell py-5">
      <div className="flex items-center gap-6 overflow-hidden">
        <p className="eyebrow shrink-0 border-r border-line pr-6 pl-6 text-navy-500 lg:pl-8">
          {t.common.clientsEyebrow}
        </p>
        <div
          className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-10"
          aria-hidden="true"
        >
          {loop.map((name, i) => (
            <span
              key={i}
              className="text-sm font-medium tracking-wide whitespace-nowrap text-ink-soft"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Bản đọc được cho screen reader, không animate */}
      <p className="sr-only">{t.common.clientsSr(items.join(", "))}</p>
    </div>
  )
}
