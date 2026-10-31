import type { LBrand } from "@/lib/content"
import { AU_BUDGETS, AU_PRODUCT_KEYS, AU_QUANTITIES, AU_THANK_YOU_PATH, whatsappUrl } from "@/lib/au-landing"
import type { LeadProductKey } from "@/lib/landing"
import {
  DataTable,
  FaqSection,
  QuoteSection,
  ReasonsSection,
  SectionIntro,
  ctaPrimary,
  type TbcComponent,
} from "@/components/landing-sections"
import { IconWhatsApp } from "@/components/brand-icons"
import { IconArrowRight, IconMail } from "@/components/icons"

/**
 * Khối dùng chung cho các landing thị trường Úc (`/en/au/*`): chỉ tiếng Anh,
 * liên hệ WhatsApp + email, giá AUD. Dựng trên components/landing-sections.tsx.
 */

/** Dải chế độ duyệt (`?review=1`) — tiếng Anh như mockup vì trang chỉ có tiếng Anh */
export function AuReviewBanner() {
  return (
    <p className="bg-brand-gold px-6 py-3 text-center text-[13px] leading-relaxed text-navy-900">
      <b>Review mode:</b> highlighted items are assumptions or market references – Phan Nguyen must confirm before
      ads go live. Hover for the source.
    </p>
  )
}

export function auSecondaryCta(brand: LBrand) {
  return {
    href: whatsappUrl(brand.zaloPhone),
    label: "Send your logo on WhatsApp",
    icon: <IconWhatsApp size={26} />,
    track: "click_whatsapp",
  }
}

/** So sánh đơn vị bán lại hàng phôi với xưởng — cột xưởng tô xanh */
export function AuVersusSection({
  title,
  lead,
  rows,
}: {
  title: string
  lead: string
  rows: [label: string, reseller: string, factory: string][]
}) {
  return (
    <section id="why" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
      <div className="container-brand grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
        <SectionIntro eyebrow="Reseller vs manufacturer" title={title} lead={lead} className="" />
        <div className="bg-white">
          <DataTable
            head={["", "Typical promo reseller", "Phan Nguyen factory"]}
            cols="md:grid-cols-[0.9fr_1.1fr_1.3fr]"
            mobileLabels
            rows={rows.map(([label, reseller, factory]) => ({
              key: label,
              cells: [
                <span key="l" className="text-[15px] font-medium text-navy-500">
                  {label}
                </span>,
                <span key="r" className="text-[14px] text-ink-soft">
                  {reseller}
                </span>,
                <span key="f" className="text-[14px] font-semibold text-brand-green">
                  {factory}
                </span>,
              ],
            }))}
          />
        </div>
      </div>
    </section>
  )
}

/** Khối navy cho bộ phận mua hàng: WBE, kinh nghiệm tập đoàn, audit, AANZFTA... */
export function AuProcurementSection({
  Tbc,
  last,
}: {
  Tbc: TbcComponent
  /** Ý cuối đổi theo sản phẩm (túi tái sử dụng, bao bì giữ lại...) */
  last: { title: string; text: string }
}) {
  return (
    <ReasonsSection
      eyebrow="For marketing & procurement teams"
      title="A supplier your procurement team can sign off"
      cols="lg:grid-cols-3"
      reasons={[
        {
          title: "Women-owned business (WBE)",
          text: "Certified by WEConnect International – counts toward supplier diversity targets.",
        },
        {
          title: "Global brand experience",
          text: "Supplier to L'Oréal group brands – used to brand audits, colour standards and strict timelines.",
        },
        {
          title: "Ethical sourcing",
          text: (
            <>
              <Tbc note="Confirm audits available (e.g. BSCI, Sedex/SMETA)">Factory audit reports available</Tbc> to
              support your Modern Slavery Act reporting.
            </>
          ),
        },
        {
          title: "Duty-free entry",
          text: (
            <>
              <Tbc note="Confirm certificate of origin is supplied">
                Certificate of origin supplied for duty-free entry under AANZFTA
              </Tbc>
              . GST applies as usual.
            </>
          ),
        },
        {
          title: "Clear paperwork",
          text: "Written quote, pro-forma invoice and agreed delivery date before production starts.",
        },
        last,
      ]}
    />
  )
}

const PRICE_PLACEHOLDER = "Placeholder – needs Phan Nguyen export price list"

/** Bảng giá AUD theo 3 mức số lượng + lịch từ brief tới lúc giao */
export function AuPriceSection({
  Tbc,
  title,
  lead,
  quantities,
  rows,
}: {
  Tbc: TbcComponent
  title: string
  lead: string
  quantities: [string, string, string]
  rows: [name: string, a: string, b: string, c: string][]
}) {
  const price = (v: string) => (
    <span className="font-display text-lg font-bold text-brand-red">
      <Tbc note={PRICE_PLACEHOLDER}>{v}</Tbc>
    </span>
  )
  const timeline = [
    { when: "24 hours", text: "Quote and free digital mockup" },
    { when: <Tbc note="Confirm">7–10 days</Tbc>, text: "Physical sample, couriered to you" },
    { when: <Tbc note="Confirm">2–3 weeks</Tbc>, text: "Bulk production after sample approval" },
    { when: <Tbc note="Confirm freight options">1–4 weeks</Tbc>, text: "Air or sea freight to your door in Australia" },
  ]

  return (
    <section id="pricing" className="container-brand scroll-mt-28 py-20 lg:py-28">
      <SectionIntro eyebrow="Price guide" title={title} lead={lead} />
      <DataTable
        head={["Product", ...quantities]}
        cols="md:grid-cols-[1.6fr_1fr_1fr_1fr]"
        mobileLabels
        rows={rows.map(([name, a, b, c]) => ({
          key: name,
          cells: [
            <span key="n" className="text-[15px] font-medium text-ink">
              {name}
            </span>,
            price(a),
            price(b),
            price(c),
          ],
        }))}
      />

      <h3 className="mt-16 font-display text-2xl font-bold text-navy-500">From brief to your door</h3>
      <ol className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {timeline.map((s, i) => (
          <li key={i} className="bg-white p-7">
            <span className="font-display text-sm font-bold tracking-[0.2em] text-brand-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-navy-500">{s.when}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
      <a href="#bao-gia" data-track="click_quote_cta" className={`${ctaPrimary} mt-10`}>
        Get an exact quote
        <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </a>
    </section>
  )
}

/** Bảng chữ thuần (chất liệu, cách in...) — cột đầu đậm màu navy */
export function AuTextTable({ head, rows, cols }: { head: string[]; rows: string[][]; cols: string }) {
  return (
    <div className="bg-white">
      <DataTable
        head={head}
        cols={cols}
        mobileLabels
        rows={rows.map((r) => ({
          key: r[0],
          cells: r.map((t, i) => (
            <span key={i} className={i === 0 ? "text-[15px] font-medium text-navy-500" : "text-[14px] text-ink"}>
              {t}
            </span>
          )),
        }))}
      />
    </div>
  )
}

/** Form báo giá: email bắt buộc, ngân sách AUD, liên hệ WhatsApp + email */
export function AuQuoteSection({
  Tbc,
  brand,
  nhom,
  defaultProduct,
  title,
  productKeys = AU_PRODUCT_KEYS,
}: {
  Tbc: TbcComponent
  brand: LBrand
  nhom: string
  defaultProduct: LeadProductKey
  title?: string
  productKeys?: LeadProductKey[]
}) {
  const wa = whatsappUrl(brand.zaloPhone)
  const mail = `mailto:${brand.email}`

  return (
    <QuoteSection
      locale="en"
      eyebrow="Free quote & mockup"
      title={
        <>
          {title ?? "Tell us what you need"} – quote in{" "}
          <Tbc note="Confirm response time in AEST business hours">24 hours</Tbc>
        </>
      }
      lead="The more you share (quantity, budget, logo, in-hands date), the more accurate your quote."
      Tbc={Tbc}
      brand={brand}
      assure={[
        "Price breaks at several quantities",
        "Free digital mockup of your logo on the product",
        "Physical sample before bulk production",
      ]}
      contacts={[
        {
          label: "WhatsApp – send logo or reference photos",
          value: <Tbc note="Confirm WhatsApp number used by the English-speaking sales contact">{brand.zaloPhone}</Tbc>,
          href: wa,
          icon: <IconWhatsApp size={22} />,
          track: "click_whatsapp",
          external: true,
        },
        {
          label: "Email",
          value: <Tbc note="Recommend a domain email for Australian buyers">{brand.email}</Tbc>,
          href: mail,
          icon: <IconMail className="size-4" />,
          track: "click_email",
        },
      ]}
      form={{
        nhom,
        defaultProduct,
        productKeys,
        required: "email",
        quantities: AU_QUANTITIES,
        budgets: AU_BUDGETS,
        thankYouPath: AU_THANK_YOU_PATH,
        contactLink: { href: wa, label: `WhatsApp ${brand.zaloPhone}`, track: "click_whatsapp" },
        deadlinePlaceholder: "e.g. 15 March",
        notePlaceholder: "Size, fabric, colours, logo colours, delivery city, any reference links...",
        copy: {
          sub: "Takes one minute. We reply in English during Australian business hours.",
          fullname: "Name",
          email: "Work email",
          phone: "Phone / WhatsApp",
          product: "Product",
          productPlaceholder: "Choose a product",
          quantity: "Quantity",
          budget: "Budget per unit (AUD)",
          rangePlaceholder: "Choose a range",
          deadline: "In-hands date",
          note: "Your brief",
          vat: "Tax invoice required",
          submit: "Request my quote",
          consent: "By submitting, you agree Phan Nguyen may contact you about this quote. Or send your logo via",
          subject: "AU landing",
        },
        failedNode: (
          <>
            Sorry, that did not send. Please email{" "}
            <a href={mail} className="font-semibold text-brand-red">
              {brand.email}
            </a>{" "}
            or WhatsApp{" "}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red">
              {brand.zaloPhone}
            </a>
            .
          </>
        ),
      }}
    />
  )
}

/** FAQ với lời dẫn mời email / WhatsApp thay cho hotline */
export function AuFaqSection({ brand, faqs }: { brand: LBrand; faqs: { q: string; a: React.ReactNode }[] }) {
  return (
    <FaqSection
      locale="en"
      eyebrow="FAQ"
      title="Before you order"
      faqs={faqs}
      brand={brand}
      lead={
        <>
          Can't find your answer? Email{" "}
          <a
            href={`mailto:${brand.email}`}
            data-track="click_email"
            className="font-semibold text-navy-500 hover:text-brand-red"
          >
            {brand.email}
          </a>{" "}
          or message us on{" "}
          <a
            href={whatsappUrl(brand.zaloPhone)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="click_whatsapp"
            className="font-semibold text-navy-500 hover:text-brand-red"
          >
            WhatsApp
          </a>
          .
        </>
      }
    />
  )
}
