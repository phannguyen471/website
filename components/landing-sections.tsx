import type { Metadata } from "next"
import Image from "next/image"
import type { LBrand } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { ALLOW_INDEXING, robotsMeta } from "@/lib/seo"
import LeadForm from "@/components/lead-form"
import { IconZalo } from "@/components/brand-icons"
import { IconArrowRight, IconCheck, IconChat, IconPhone, IconPlus } from "@/components/icons"

/**
 * Các khối dựng sẵn cho landing quảng cáo — dùng chung giữa landing chính
 * (components/landing-page.tsx) và landing theo mùa như Tết
 * (components/tet-landing-page.tsx), để hai trang luôn cùng một ngôn ngữ thiết kế.
 */

/** Landing theo công tắc index chung của site (lib/seo.ts) — có canonical riêng nên được index như trang thường */
export const landingRobots: Metadata["robots"] = robotsMeta

/** Trang cảm ơn sau khi gửi form: không bao giờ index, kể cả khi site cho index */
export const thankYouRobots: Metadata["robots"] = ALLOW_INDEXING ? { index: false, follow: false } : robotsMeta

export type TbcComponent = (props: { children: React.ReactNode; note?: string }) => React.ReactNode

/** Thông tin cần khách xác nhận: chỉ tô vàng khi mở `?review=1`, `note` hiện khi rê chuột */
export function makeTbc(review: boolean): TbcComponent {
  return function Tbc({ children, note }) {
    return review ? (
      <mark title={note} className="cursor-help rounded-[2px] bg-brand-gold px-1 text-navy-900">
        {children}
      </mark>
    ) : (
      <>{children}</>
    )
  }
}

/** Chuỗi giao diện dùng chung của các khối landing */
const UI = {
  vi: {
    zalo: "Gửi logo qua Zalo",
    priceEyebrow: "Bảng giá tham khảo",
    priceHead: ["Sản phẩm", "Giá tham khảo / cái", "Phù hợp cho"],
    priceNote: "Giá chưa bao gồm VAT. Đơn số lượng lớn có giá tốt hơn.",
    quoteEyebrow: "Nhận báo giá miễn phí",
    assure: ["Báo giá chi tiết theo từng mức số lượng", "Mockup logo trên sản phẩm miễn phí", "Hợp đồng & hóa đơn VAT đầy đủ"],
    hotline: "Hotline",
    zaloLabel: "Zalo – gửi logo, hình mẫu",
    faqLead: ["Chưa thấy câu trả lời bạn cần? Gọi", "– xưởng tư vấn miễn phí."],
  },
  en: {
    zalo: "Send logo via Zalo",
    priceEyebrow: "Indicative pricing",
    priceHead: ["Product", "Indicative price / unit", "Best for"],
    priceNote: "Prices exclude VAT. Larger orders get better unit prices.",
    quoteEyebrow: "Free quote",
    assure: ["Detailed quote for each quantity tier", "Free logo mockup on the product", "Full contract & VAT invoice"],
    hotline: "Hotline",
    zaloLabel: "Zalo – send logo, samples",
    faqLead: ["Can't find your answer? Call", "for free advice from our factory."],
  },
} satisfies Record<Locale, unknown>

export const ctaPrimary =
  "group inline-flex items-center gap-2.5 rounded-[2px] bg-brand-red px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark"

export function ReviewBanner() {
  return (
    <p className="bg-brand-gold px-6 py-3 text-center text-[13px] leading-relaxed text-navy-900">
      <b>Chế độ duyệt:</b> phần tô vàng là số liệu tham khảo từ thị trường – cần Phan Nguyễn xác nhận hoặc sửa
      trước khi chạy quảng cáo. Rê chuột lên để xem nguồn.
    </p>
  )
}

/** Nhãn + tiêu đề + đoạn dẫn đầu mỗi section */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  dark,
  className = "mb-12 max-w-2xl",
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <p className={`eyebrow ${dark ? "text-brand-gold" : "text-brand-red"}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-3xl leading-tight font-bold md:text-4xl ${dark ? "lg:text-[2.75rem]" : "text-navy-500"}`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-[15px] leading-[1.85] ${dark ? "text-white/65" : "text-ink-soft"}`}>{lead}</p>
      )}
    </div>
  )
}

/** Hero chia đôi: chữ + 4 điểm mạnh bên trái, 3 ảnh sản phẩm bên phải */
export function LandingHero({
  locale,
  eyebrow,
  title,
  lead,
  cta,
  facts,
  images,
  zaloUrl,
  top,
}: {
  locale: Locale
  eyebrow: string
  /** Phần giữa tô đỏ là cụm từ khoá chính */
  title: [string, string, string]
  lead: string
  cta: string
  facts: { value: React.ReactNode; label: string }[]
  images: { src: string; alt: string }[]
  zaloUrl: string
  /** Dải hiển thị ngay dưới header (chế độ duyệt, dải thông báo mùa vụ) */
  top?: React.ReactNode
}) {
  return (
    <section className="pt-[68px] md:pt-[108px]">
      {top}
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:py-20 xl:px-20">
          <p className="eyebrow text-brand-red">{eyebrow}</p>

          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.08] font-bold text-navy-500 md:text-[3.25rem] xl:text-6xl">
            {title[0]}
            <span className="text-brand-red">{title[1]}</span>
            {title[2]}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-ink-soft md:text-base">{lead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#bao-gia" data-track="click_quote_cta" className={ctaPrimary}>
              {cta}
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="inline-flex items-center gap-2.5 rounded-[2px] border border-navy-500 py-3 pr-7 pl-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
            >
              <IconZalo size={26} />
              {UI[locale].zalo}
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-display text-lg font-bold text-navy-500 md:text-xl">{f.value}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-ink-soft">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Ảnh: 1 lớn + 2 xếp chồng */}
        <div className="grid min-h-[420px] grid-cols-2 grid-rows-2 gap-1 bg-white lg:min-h-[680px]">
          {images.map((img, i) => (
            <div key={i} className={`relative overflow-hidden bg-shell ${i === 0 ? "row-span-2" : ""}`}>
              <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Bảng nhiều cột: thanh tiêu đề navy trên desktop, mỗi hàng thành một khối trên mobile */
export function DataTable({
  head,
  rows,
  cols,
  note,
  mobileLabels,
}: {
  head: string[]
  rows: { key: string; cells: React.ReactNode[] }[]
  /** Mobile không có thanh tiêu đề → gắn nhãn cột trước mỗi giá trị (cho bảng so sánh) */
  mobileLabels?: boolean
  /** grid-template-columns trên desktop, ví dụ "md:grid-cols-[1.5fr_1fr_1.4fr]" */
  cols: string
  note?: string
}) {
  return (
    <div>
      <div className={`hidden gap-6 bg-navy-500 px-6 py-4 md:grid ${cols}`}>
        {head.map((h) => (
          <span key={h} className="eyebrow text-white/80">
            {h}
          </span>
        ))}
      </div>
      <ul className="border-x border-b border-line max-md:border-t">
        {rows.map((row) => (
          <li
            key={row.key}
            className={`grid gap-1.5 border-b border-line px-5 py-5 last:border-b-0 md:items-center md:gap-6 md:px-6 ${cols}`}
          >
            {row.cells.map((cell, i) => (
              <span key={i}>
                {mobileLabels && i > 0 && <span className="eyebrow mr-2 text-ink-soft/70 md:hidden">{head[i]}:</span>}
                {cell}
              </span>
            ))}
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-xs text-ink-soft">{note}</p>}
    </div>
  )
}

/** Bảng giá tham khảo: chữ dẫn + CTA bên trái, bảng bên phải */
export function PriceSection({
  locale,
  title,
  lead,
  cta,
  rows,
}: {
  locale: Locale
  title: string
  lead: string
  cta: string
  rows: { name: string; price: React.ReactNode; use: string }[]
}) {
  return (
    <section id="bang-gia" className="container-brand scroll-mt-28 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <div>
          <SectionIntro eyebrow={UI[locale].priceEyebrow} title={title} lead={lead} className="" />
          <a href="#bao-gia" data-track="click_quote_cta" className={`${ctaPrimary} mt-8`}>
            {cta}
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <DataTable
          head={UI[locale].priceHead}
          cols="md:grid-cols-[1.5fr_1fr_1.4fr]"
          note={UI[locale].priceNote}
          rows={rows.map((r) => ({
            key: r.name,
            cells: [
              <span key="n" className="text-[15px] font-medium text-ink">
                {r.name}
              </span>,
              <span key="p" className="font-display text-lg font-bold text-brand-red">
                {r.price}
              </span>,
              <span key="u" className="text-[13px] leading-relaxed text-ink-soft">
                {r.use}
              </span>,
            ],
          }))}
        />
      </div>
    </section>
  )
}

/** Khối navy đánh số "Vì sao chọn Phan Nguyễn" */
export function ReasonsSection({
  eyebrow,
  title,
  reasons,
  cols = "lg:grid-cols-4",
}: {
  eyebrow: string
  title: string
  reasons: { title: string; text: React.ReactNode }[]
  cols?: string
}) {
  return (
    <section className="bg-navy-500 py-20 text-white lg:py-28">
      <div className="container-brand">
        <SectionIntro eyebrow={eyebrow} title={title} dark />
        <div className={`grid gap-px bg-white/12 sm:grid-cols-2 ${cols}`}>
          {reasons.map((r, i) => (
            <div key={r.title} className="bg-navy-500 p-7">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-brand-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg leading-snug font-bold">{r.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/60">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Form báo giá: lời hứa + liên hệ nhanh bên trái, form bên phải */
export function QuoteSection({
  locale,
  title,
  lead,
  Tbc,
  brand,
  form,
}: {
  locale: Locale
  title: React.ReactNode
  lead: string
  Tbc: TbcComponent
  brand: LBrand
  form: Omit<React.ComponentProps<typeof LeadForm>, "locale" | "hotline" | "zaloPhone" | "zaloUrl">
}) {
  const ui = UI[locale]
  const tel = `tel:${brand.hotline.replace(/\s/g, "")}`
  return (
    <section id="bao-gia" className="scroll-mt-20 border-y border-line bg-shell py-20 lg:py-28">
      <div className="container-brand grid gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
        <div>
          <SectionIntro eyebrow={ui.quoteEyebrow} title={title} lead={lead} className="" />

          <ul className="mt-8 flex flex-col gap-3.5">
            {[
              ui.assure[0],
              <Tbc key="mockup">{ui.assure[1]}</Tbc>,
              ui.assure[2],
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-navy-500 text-white">
                  <IconCheck className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 border border-line bg-white">
            {[
              { label: ui.hotline, value: brand.hotline, href: tel, Icon: IconPhone, track: "click_call" },
              {
                label: ui.zaloLabel,
                value: brand.zaloPhone,
                href: brand.social.zalo,
                Icon: IconChat,
                track: "click_zalo",
                external: true,
              },
            ].map((x) => (
              <a
                key={x.label}
                href={x.href}
                data-track={x.track}
                {...(x.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 border-b border-line px-6 py-5 transition-colors last:border-b-0 hover:bg-shell"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-500 transition-colors group-hover:border-navy-500 group-hover:bg-navy-500 group-hover:text-white">
                  <x.Icon className="size-4" />
                </span>
                <span>
                  <span className="eyebrow block text-ink-soft">{x.label}</span>
                  <span className="mt-1 block font-display text-lg font-bold text-navy-500">{x.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <LeadForm {...form} locale={locale} hotline={brand.hotline} zaloPhone={brand.zaloPhone} zaloUrl={brand.social.zalo} />
      </div>
    </section>
  )
}

/** Câu hỏi thường gặp dạng accordion; không đệm dưới vì footer của layout đã có mt-24 */
export function FaqSection({
  locale,
  eyebrow,
  title,
  faqs,
  brand,
}: {
  locale: Locale
  eyebrow: string
  title: string
  faqs: { q: string; a: React.ReactNode }[]
  brand: LBrand
}) {
  return (
    <section id="faq" className="container-brand scroll-mt-28 pt-20 lg:pt-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          className=""
          lead={
            <>
              {UI[locale].faqLead[0]}{" "}
              <a
                href={`tel:${brand.hotline.replace(/\s/g, "")}`}
                data-track="click_call"
                className="font-semibold text-navy-500 hover:text-brand-red"
              >
                {brand.hotline}
              </a>{" "}
              {UI[locale].faqLead[1]}
            </>
          }
        />

        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[15px] font-semibold text-navy-500 [&::-webkit-details-marker]:hidden">
                {f.q}
                <IconPlus className="size-5 shrink-0 text-brand-red transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="pb-6 text-[15px] leading-[1.85] text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
