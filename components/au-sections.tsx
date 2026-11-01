import type { LBrand } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
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
 * Khối dùng chung cho các landing thị trường Úc (`/en/au/*`, `/au/*`): liên hệ
 * WhatsApp + email, giá AUD. Dựng trên components/landing-sections.tsx.
 * Ghi chú nguồn ở chế độ duyệt (`note` của Tbc) giữ tiếng Anh cho cả hai bản.
 */

const tr = (locale: Locale) => (vi: string, en: string) => (locale === "vi" ? vi : en)

/** Dải chế độ duyệt (`?review=1`) */
export function AuReviewBanner({ locale }: { locale: Locale }) {
  return locale === "vi" ? (
    <p className="bg-brand-gold px-6 py-3 text-center text-[13px] leading-relaxed text-navy-900">
      <b>Chế độ duyệt:</b> phần tô vàng là giả định hoặc số liệu tham khảo thị trường – cần Phan Nguyễn xác nhận
      trước khi chạy quảng cáo. Rê chuột lên để xem nguồn.
    </p>
  ) : (
    <p className="bg-brand-gold px-6 py-3 text-center text-[13px] leading-relaxed text-navy-900">
      <b>Review mode:</b> highlighted items are assumptions or market references – Phan Nguyen must confirm before
      ads go live. Hover for the source.
    </p>
  )
}

export function auSecondaryCta(brand: LBrand, locale: Locale) {
  return {
    href: whatsappUrl(brand.zaloPhone),
    label: tr(locale)("Gửi logo qua WhatsApp", "Send your logo on WhatsApp"),
    icon: <IconWhatsApp size={26} />,
    track: "click_whatsapp",
  }
}

/** So sánh đơn vị bán lại hàng phôi với xưởng — cột xưởng tô xanh */
export function AuVersusSection({
  locale,
  title,
  lead,
  rows,
}: {
  locale: Locale
  title: string
  lead: string
  rows: [label: string, reseller: string, factory: string][]
}) {
  const t = tr(locale)
  return (
    <section id="why" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
      <div className="container-brand grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
        <SectionIntro
          eyebrow={t("Đơn vị bán lại hay xưởng sản xuất", "Reseller vs manufacturer")}
          title={title}
          lead={lead}
          className=""
        />
        <div className="bg-white">
          <DataTable
            head={["", t("Đơn vị bán lại hàng khuyến mãi", "Typical promo reseller"), t("Xưởng Phan Nguyễn", "Phan Nguyen factory")]}
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
  locale,
  Tbc,
  last,
}: {
  locale: Locale
  Tbc: TbcComponent
  /** Ý cuối đổi theo sản phẩm (túi tái sử dụng, bao bì giữ lại...) */
  last: { title: string; text: string }
}) {
  const t = tr(locale)
  return (
    <ReasonsSection
      eyebrow={t("Dành cho bộ phận marketing & mua hàng", "For marketing & procurement teams")}
      title={t("Nhà cung cấp mà bộ phận mua hàng yên tâm duyệt", "A supplier your procurement team can sign off")}
      cols="lg:grid-cols-3"
      reasons={[
        {
          title: t("Doanh nghiệp nữ làm chủ (WBE)", "Women-owned business (WBE)"),
          text: t(
            "Chứng nhận bởi WEConnect International – được tính vào chỉ tiêu đa dạng nhà cung cấp.",
            "Certified by WEConnect International – counts toward supplier diversity targets.",
          ),
        },
        {
          title: t("Kinh nghiệm với thương hiệu toàn cầu", "Global brand experience"),
          text: t(
            "Nhà cung cấp cho các thương hiệu thuộc L'Oréal – quen với audit thương hiệu, tiêu chuẩn màu và tiến độ khắt khe.",
            "Supplier to L'Oréal group brands – used to brand audits, colour standards and strict timelines.",
          ),
        },
        {
          title: t("Sản xuất có trách nhiệm", "Ethical sourcing"),
          text: (
            <>
              <Tbc note="Confirm audits available (e.g. BSCI, Sedex/SMETA)">
                {t("Có báo cáo audit nhà máy", "Factory audit reports available")}
              </Tbc>
              {t(
                " để hỗ trợ báo cáo theo Luật Chống nô lệ hiện đại (Modern Slavery Act) của Úc.",
                " to support your Modern Slavery Act reporting.",
              )}
            </>
          ),
        },
        {
          title: t("Miễn thuế nhập khẩu", "Duty-free entry"),
          text: (
            <>
              <Tbc note="Confirm certificate of origin is supplied">
                {t(
                  "Cung cấp chứng nhận xuất xứ để miễn thuế nhập khẩu theo hiệp định AANZFTA",
                  "Certificate of origin supplied for duty-free entry under AANZFTA",
                )}
              </Tbc>
              {t(". GST vẫn áp dụng như bình thường.", ". GST applies as usual.")}
            </>
          ),
        },
        {
          title: t("Giấy tờ rõ ràng", "Clear paperwork"),
          text: t(
            "Báo giá bằng văn bản, hoá đơn chiếu lệ (pro-forma) và ngày giao được thống nhất trước khi sản xuất.",
            "Written quote, pro-forma invoice and agreed delivery date before production starts.",
          ),
        },
        last,
      ]}
    />
  )
}

const PRICE_PLACEHOLDER = "Placeholder – needs Phan Nguyen export price list"

/** Bảng giá AUD theo 3 mức số lượng + lịch từ brief tới lúc giao */
export function AuPriceSection({
  locale,
  Tbc,
  title,
  lead,
  quantities,
  rows,
}: {
  locale: Locale
  Tbc: TbcComponent
  title: string
  lead: string
  quantities: [string, string, string]
  rows: [name: string, a: string, b: string, c: string][]
}) {
  const t = tr(locale)
  const price = (v: string) => (
    <span className="font-display text-lg font-bold text-brand-red">
      <Tbc note={PRICE_PLACEHOLDER}>{v}</Tbc>
    </span>
  )
  const timeline = [
    { when: t("24 giờ", "24 hours"), text: t("Báo giá và mockup miễn phí", "Quote and free digital mockup") },
    {
      when: <Tbc note="Confirm">{t("7–10 ngày", "7–10 days")}</Tbc>,
      text: t("Mẫu thật, gửi chuyển phát tới bạn", "Physical sample, couriered to you"),
    },
    {
      when: <Tbc note="Confirm">{t("2–3 tuần", "2–3 weeks")}</Tbc>,
      text: t("Sản xuất hàng loạt sau khi duyệt mẫu", "Bulk production after sample approval"),
    },
    {
      when: <Tbc note="Confirm freight options">{t("1–4 tuần", "1–4 weeks")}</Tbc>,
      text: t("Vận chuyển hàng không hoặc đường biển tới tận nơi ở Úc", "Air or sea freight to your door in Australia"),
    },
  ]

  return (
    <section id="pricing" className="container-brand scroll-mt-28 py-20 lg:py-28">
      <SectionIntro eyebrow={t("Bảng giá tham khảo", "Price guide")} title={title} lead={lead} />
      <DataTable
        head={[t("Sản phẩm", "Product"), ...quantities]}
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

      <h3 className="mt-16 font-display text-2xl font-bold text-navy-500">
        {t("Từ yêu cầu tới tận tay bạn", "From brief to your door")}
      </h3>
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
        {t("Nhận báo giá chính xác", "Get an exact quote")}
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
          cells: r.map((text, i) => (
            <span key={i} className={i === 0 ? "text-[15px] font-medium text-navy-500" : "text-[14px] text-ink"}>
              {text}
            </span>
          )),
        }))}
      />
    </div>
  )
}

/** Form báo giá: email bắt buộc, ngân sách AUD, liên hệ WhatsApp + email */
export function AuQuoteSection({
  locale,
  Tbc,
  brand,
  nhom,
  defaultProduct,
  title,
  productKeys = AU_PRODUCT_KEYS,
}: {
  locale: Locale
  Tbc: TbcComponent
  brand: LBrand
  nhom: string
  defaultProduct: LeadProductKey
  title?: string
  productKeys?: LeadProductKey[]
}) {
  const t = tr(locale)
  const wa = whatsappUrl(brand.zaloPhone)
  const mail = `mailto:${brand.email}`

  return (
    <QuoteSection
      locale={locale}
      eyebrow={t("Báo giá & mockup miễn phí", "Free quote & mockup")}
      title={
        <>
          {title ?? t("Cho chúng tôi biết bạn cần gì", "Tell us what you need")}
          {t(" – báo giá trong ", " – quote in ")}
          <Tbc note="Confirm response time in AEST business hours">{t("24 giờ", "24 hours")}</Tbc>
        </>
      }
      lead={t(
        "Càng nhiều thông tin (số lượng, ngân sách, logo, ngày cần hàng), báo giá càng chính xác.",
        "The more you share (quantity, budget, logo, in-hands date), the more accurate your quote.",
      )}
      Tbc={Tbc}
      brand={brand}
      assure={[
        t("Báo giá theo nhiều mức số lượng", "Price breaks at several quantities"),
        t("Mockup logo trên sản phẩm miễn phí", "Free digital mockup of your logo on the product"),
        t("Mẫu thật trước khi sản xuất hàng loạt", "Physical sample before bulk production"),
      ]}
      contacts={[
        {
          label: t("WhatsApp – gửi logo hoặc hình tham khảo", "WhatsApp – send logo or reference photos"),
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
        quantities: AU_QUANTITIES[locale],
        budgets: AU_BUDGETS[locale],
        thankYouPath: AU_THANK_YOU_PATH[locale],
        contactLink: { href: wa, label: `WhatsApp ${brand.zaloPhone}`, track: "click_whatsapp" },
        deadlinePlaceholder: t("VD: 15/3", "e.g. 15 March"),
        notePlaceholder: t(
          "Kích thước, chất liệu, màu sắc, màu logo, thành phố giao hàng, link tham khảo...",
          "Size, fabric, colours, logo colours, delivery city, any reference links...",
        ),
        copy:
          locale === "vi"
            ? {
                sub: "Chỉ mất 1 phút. Chúng tôi trả lời trong giờ làm việc ở Úc.",
                email: "Email công việc",
                phone: "Điện thoại / WhatsApp",
                product: "Sản phẩm",
                budget: "Ngân sách / sản phẩm (AUD)",
                deadline: "Ngày cần nhận hàng",
                note: "Yêu cầu của bạn",
                vat: "Cần hoá đơn thuế",
                consent: "Khi gửi, bạn đồng ý để Phan Nguyễn liên hệ về báo giá này. Hoặc gửi logo qua",
                subject: "AU landing (VI)",
              }
            : {
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
            {t("Chưa gửi được. Vui lòng email", "Sorry, that did not send. Please email")}{" "}
            <a href={mail} className="font-semibold text-brand-red">
              {brand.email}
            </a>{" "}
            {t("hoặc nhắn WhatsApp", "or WhatsApp")}{" "}
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
export function AuFaqSection({
  locale,
  brand,
  faqs,
}: {
  locale: Locale
  brand: LBrand
  faqs: { q: string; a: React.ReactNode }[]
}) {
  const t = tr(locale)
  return (
    <FaqSection
      locale={locale}
      eyebrow={t("Câu hỏi thường gặp", "FAQ")}
      title={t("Trước khi đặt hàng", "Before you order")}
      faqs={faqs}
      brand={brand}
      lead={
        <>
          {t("Chưa thấy câu trả lời bạn cần? Email", "Can't find your answer? Email")}{" "}
          <a
            href={`mailto:${brand.email}`}
            data-track="click_email"
            className="font-semibold text-navy-500 hover:text-brand-red"
          >
            {brand.email}
          </a>{" "}
          {t("hoặc nhắn qua", "or message us on")}{" "}
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
