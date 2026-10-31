import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { IconPhone } from "@/components/icons"
import { IconZalo } from "@/components/brand-icons"

/**
 * Cụm nút liên hệ nổi — đặt trần logo ở góc phải, không bọc thêm khung/nền
 * vì mỗi logo đã có hình dạng và màu nền riêng sẵn.
 */
export default function FloatingContact({ locale }: { locale: Locale }) {
  const t = dict(locale)
  const { brand } = content(locale)

  const items = [{ label: t.common.zalo, href: brand.social.zalo, Icon: IconZalo }]

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-track="click_zalo"
          className="block drop-shadow-lg transition-transform hover:scale-110"
        >
          <Icon size={44} />
        </a>
      ))}

      <a
        href={`tel:${brand.hotline}`}
        aria-label={t.common.call(brand.hotline)}
        data-track="click_call"
        className="flex items-center gap-2 rounded-full bg-brand-red py-2.5 pr-4 pl-3 text-white shadow-lg transition-colors hover:bg-brand-red-dark"
      >
        <IconPhone className="size-4" />
        <span className="text-xs font-semibold tracking-wide">{brand.hotline}</span>
      </a>
    </div>
  )
}
