import type { Metadata } from "next"
import Link from "next/link"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { THANK_YOU_PATH } from "@/lib/landing"
import { path } from "@/lib/routes"
import LandingTracking from "@/components/landing-tracking"
import LeadConversion from "@/components/lead-conversion"
import { thankYouRobots } from "@/components/landing-sections"
import { IconZalo } from "@/components/brand-icons"
import { IconArrowRight, IconCheck } from "@/components/icons"

const COPY = {
  vi: {
    meta: "Đã nhận yêu cầu báo giá",
    eyebrow: "Đã nhận yêu cầu",
    title: "Cảm ơn bạn!",
    body: "Phan Nguyễn đã nhận yêu cầu báo giá. Chuyên viên sẽ liên hệ trong vòng 24 giờ làm việc. Để báo giá nhanh hơn, bạn có thể gửi logo và hình mẫu qua Zalo ngay bây giờ.",
    zalo: "Gửi logo qua Zalo",
    more: "Xem thêm sản phẩm",
  },
  en: {
    meta: "Quote request received",
    eyebrow: "Request received",
    title: "Thank you!",
    body: "Phan Nguyen has received your quote request. Our team will get back to you within 24 working hours. For a faster quote, send your logo and reference photos via Zalo now.",
    zalo: "Send logo via Zalo",
    more: "Browse more products",
  },
} satisfies Record<Locale, unknown>

export function thankYouMetadata(locale: Locale): Metadata {
  return {
    title: COPY[locale].meta,
    robots: thankYouRobots,
    alternates: {
      canonical: THANK_YOU_PATH[locale],
      languages: { vi: THANK_YOU_PATH.vi, en: THANK_YOU_PATH.en },
    },
  }
}

/** Trang cảm ơn sau khi gửi form landing — nơi duy nhất bắn conversion `generate_lead` */
export default function ThankYou({ locale }: { locale: Locale }) {
  const { brand } = content(locale)
  const c = COPY[locale]

  return (
    <section className="flex min-h-[80vh] items-center bg-shell pt-[68px] md:pt-[108px]">
      <LeadConversion />
      <LandingTracking />

      <div className="container-brand py-20">
        <div className="mx-auto max-w-xl border border-line bg-white px-7 py-12 text-center md:px-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-navy-500 text-white">
            <IconCheck className="size-8" />
          </span>
          <p className="eyebrow mt-8 text-brand-red">{c.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-500">{c.title}</h1>
          <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
          <p className="mt-6 text-[15px] leading-[1.85] text-ink-soft">{c.body}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={brand.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="inline-flex items-center gap-2.5 rounded-[2px] bg-navy-500 py-3 pr-7 pl-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
            >
              <IconZalo size={26} />
              {c.zalo}
            </a>
            <Link
              href={path(locale, "san-pham")}
              className="group inline-flex items-center gap-2 rounded-[2px] border border-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
            >
              {c.more}
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
