import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { content } from "@/lib/content"
import { isLocale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { ALLOW_INDEXING, robotsMeta } from "@/lib/seo"
import LandingTracking from "@/components/landing-tracking"
import LeadConversion from "@/components/lead-conversion"
import { IconZalo } from "@/components/brand-icons"
import { IconArrowRight, IconCheck } from "@/components/icons"

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: "Đã nhận yêu cầu báo giá",
  robots: ALLOW_INDEXING ? { index: false, follow: false } : robotsMeta,
}

/** Trang cảm ơn sau khi gửi form landing — nơi duy nhất bắn conversion `generate_lead` */
export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale) || locale !== "vi") notFound()
  const { brand } = content(locale)

  return (
    <section className="flex min-h-[80vh] items-center bg-shell pt-[68px] md:pt-[108px]">
      <LeadConversion />
      <LandingTracking />

      <div className="container-brand py-20">
        <div className="mx-auto max-w-xl border border-line bg-white px-7 py-12 text-center md:px-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-navy-500 text-white">
            <IconCheck className="size-8" />
          </span>
          <p className="eyebrow mt-8 text-brand-red">Đã nhận yêu cầu</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-500">Cảm ơn bạn!</h1>
          <div className="mx-auto mt-5 h-px w-12 bg-brand-gold" />
          <p className="mt-6 text-[15px] leading-[1.85] text-ink-soft">
            Phan Nguyễn đã nhận yêu cầu báo giá. Chuyên viên sẽ liên hệ trong vòng 24 giờ làm việc. Để báo giá
            nhanh hơn, bạn có thể gửi logo và hình mẫu qua Zalo ngay bây giờ.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={brand.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="inline-flex items-center gap-2.5 rounded-[2px] bg-navy-500 py-3 pr-7 pl-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
            >
              <IconZalo size={26} />
              Gửi logo qua Zalo
            </a>
            <Link
              href={path(locale, "san-pham")}
              className="group inline-flex items-center gap-2 rounded-[2px] border border-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
            >
              Xem thêm sản phẩm
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
