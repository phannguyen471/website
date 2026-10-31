import type { Metadata } from "next"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { TET, TET_PATH, TET_PRODUCTS, TET_SHOWCASE, TET_VARIANTS, type TetVariantKey } from "@/lib/tet-landing"
import { media } from "@/lib/utils"
import ClientMarquee from "@/components/client-marquee"
import LandingShowcase from "@/components/landing-showcase"
import LandingTracking from "@/components/landing-tracking"
import {
  DataTable,
  FaqSection,
  LandingHero,
  PriceSection,
  QuoteSection,
  ReasonsSection,
  ReviewBanner,
  SectionIntro,
  landingRobots,
  makeTbc,
} from "@/components/landing-sections"

/**
 * Thân trang landing quà Tết doanh nghiệp — nội dung đổi theo `?nhom=`
 * (xem lib/tet-landing.ts), cùng bộ khối dựng với landing túi vải.
 */

export function tetLandingMetadata(key: TetVariantKey): Metadata {
  const variant = TET_VARIANTS[key]
  return {
    title: variant.metaTitle,
    description: variant.lead,
    robots: landingRobots,
    alternates: { canonical: TET_PATH },
  }
}

export default function TetLandingPage({ variantKey, review }: { variantKey: TetVariantKey; review: boolean }) {
  const locale: Locale = "vi"
  const variant = TET_VARIANTS[variantKey]
  const { brand, products } = content(locale)
  const Tbc = makeTbc(review)

  const imageOf = (slug: string) => media(products.find((p) => p.key === slug)?.images[0])
  const hero = variant.heroSlugs.map((slug) => ({
    src: imageOf(slug),
    alt: products.find((p) => p.key === slug)?.name ?? "",
  }))
  const showcase = TET_SHOWCASE.map((item) => ({ ...item, image: imageOf(item.slug) }))

  const facts = [
    { value: "Hợp đồng & VAT", label: "Đủ hồ sơ để quyết toán quà Tết" },
    {
      value: <Tbc note="Cần xác nhận hạn chót chốt mẫu mùa Tết">Chốt mẫu trước {TET.sampleDeadline}</Tbc>,
      label: "Để kịp giao trước Tết",
    },
    { value: "Màu đỏ, vàng, in lời chúc", label: "Logo kèm thông điệp năm mới" },
    {
      value: <Tbc note="Tham khảo: hầu hết đối thủ đều miễn phí thiết kế">Mockup miễn phí</Tbc>,
      label: "Xem túi Tết trước khi đặt",
    },
  ]

  const timeline = [
    { when: "Tháng 11", text: "Thời điểm tốt nhất: đủ thời gian làm mẫu, chỉnh màu, chọn chất liệu." },
    { when: "Tháng 12", text: "Cao điểm đặt hàng. Nên chốt mẫu trong tuần đầu nhận mockup.", hot: true },
    {
      when: <Tbc note="Cần xác nhận">Trước {TET.sampleDeadlineShort}</Tbc>,
      text: "Hạn chót chốt mẫu để sản xuất và giao trước Tết.",
      hot: true,
    },
    {
      when: <Tbc note="Cần xác nhận ngày giao cuối cùng">Trước {TET.lastDelivery}</Tbc>,
      text: "Giao hàng đợt cuối tới văn phòng, kho hoặc nơi đóng giỏ quà.",
    },
  ]

  const audiences = [
    {
      tag: "Quà khách hàng, đối tác",
      title: "Doanh nghiệp tặng quà Tết",
      text: "Túi canvas phối cói, phối da PU in logo tinh tế, xứng với hộp quà cao cấp.",
      fit: "Túi canvas cao cấp",
    },
    {
      tag: "Quà nhân viên",
      title: "Phòng nhân sự, công đoàn",
      text: "Túi đựng phần quà Tết, hoặc tặng luôn balo, túi canvas mang logo công ty.",
      fit: "Túi canvas, balo",
    },
    {
      tag: "Bán giỏ quà, hộp quà",
      title: "Đơn vị bán quà Tết",
      text: "Túi in thương hiệu của bạn để đựng giỏ quà, số lượng lớn, giá xưởng.",
      fit: "Túi không dệt, tote lớn",
    },
    {
      tag: "Khuyến mãi Tết",
      title: "Siêu thị, chuỗi bán lẻ, hội chợ",
      text: "Túi tặng kèm đơn hàng Tết, in logo và chương trình khuyến mãi.",
      fit: "Túi không dệt",
    },
  ]

  /** Ô so sánh: "yes" tô xanh, "no" mờ đi */
  const cell = (text: string, tone?: "yes" | "no") => (
    <span
      className={
        tone === "yes"
          ? "text-[14px] font-semibold text-brand-green"
          : tone === "no"
            ? "text-[14px] text-ink-soft/70"
            : "text-[14px] text-ink"
      }
    >
      {text}
    </span>
  )
  const comparison = [
    ["Được dùng lại sau Tết", cell("Hiếm", "no"), cell("Có", "yes"), cell("Rất thường xuyên", "yes")],
    ["Chịu được giỏ quà nặng", cell("Hạn chế", "no"), cell("Tốt", "yes"), cell("Rất tốt", "yes")],
    ["Cảm giác cao cấp", cell("Trung bình"), cell("Trung bình"), cell("Cao", "yes")],
    ["Phù hợp nhất", cell("Quà nhỏ, nhẹ"), cell("Giỏ quà số lượng lớn, khuyến mãi"), cell("Quà khách VIP, đối tác, nhân viên")],
  ] as const

  const prices = [
    {
      name: "Túi vải không dệt in logo",
      price: <Tbc note="Cần Phan Nguyễn cung cấp giá và số lượng tối thiểu">Báo giá theo số lượng</Tbc>,
      use: "Giỏ quà, hội chợ, khuyến mãi Tết",
    },
    {
      name: "Túi canvas / vải bố cơ bản, in 1–2 màu",
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 25–40k">Từ 25.000đ</Tbc>,
      use: "Quà nhân viên, quà đối tác số lượng lớn",
    },
    {
      name: "Túi canvas dày, có khóa kéo",
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 40–60k">Từ 40.000đ</Tbc>,
      use: "Quà khách hàng",
    },
    {
      name: "Túi canvas phối da PU, phối cói",
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 80–120k">Từ 80.000đ</Tbc>,
      use: "Quà VIP, hộp quà cao cấp",
    },
    { name: "Balo, áo in logo làm quà nhân viên", price: "Báo giá theo mẫu", use: "Quà Tết nhân viên, year end party" },
  ]

  const reasons = [
    {
      title: "Tiến độ ghi trong hợp đồng",
      text: "Ngày giao được ghi rõ trong hợp đồng. Không hứa miệng rồi trễ hẹn sát Tết.",
    },
    { title: "Hóa đơn VAT đầy đủ", text: "Đủ hồ sơ để phòng kế toán quyết toán chi phí quà Tết cuối năm." },
    {
      title: "Duyệt mẫu thật trước",
      text: (
        <>
          <Tbc>Mockup miễn phí</Tbc>, sau đó may mẫu thử để bạn kiểm tra màu đỏ, vàng và logo trước khi chạy hàng
          loạt.
        </>
      ),
    },
    {
      title: "Quen đơn của tập đoàn",
      text: "Đã sản xuất cho các thương hiệu thuộc L'Oréal và doanh nghiệp đa quốc gia, quen tiến độ khắt khe.",
    },
    {
      title: "Bảo hành lỗi sản xuất",
      text: (
        <>
          <Tbc note="Tham khảo: đối thủ bảo hành 1 đổi 1">Đổi mới 1:1 sản phẩm lỗi may, lỗi in hoặc lỗi vải</Tbc>.
        </>
      ),
    },
    { title: "Giao tận nơi đóng quà", text: "Giao tới văn phòng, kho hoặc nơi đóng giỏ quà trên toàn quốc." },
  ]

  const tel = `tel:${brand.hotline.replace(/\s/g, "")}`
  const faqs = [
    {
      q: "Đặt bây giờ có kịp giao trước Tết không?",
      a: (
        <>
          Kịp nếu chốt mẫu <Tbc>trước {TET.sampleDeadline}</Tbc>. Thời gian sản xuất thường{" "}
          <Tbc>7–15 ngày làm việc</Tbc> sau khi duyệt mẫu, tùy số lượng. Ghi ngày cần hàng trong form để xưởng xếp
          lịch.
        </>
      ),
    },
    {
      q: "Có làm gấp cho đơn sát Tết không?",
      a: (
        <>
          Có thể, tùy lịch xưởng và số lượng. Gọi{" "}
          <a href={tel} data-track="click_call" className="font-semibold text-navy-500 hover:text-brand-red">
            {brand.hotline}
          </a>{" "}
          để kiểm tra lịch trống trước khi gửi thiết kế.
        </>
      ),
    },
    {
      q: "Tôi cần túi vừa hộp quà, giỏ quà có sẵn?",
      a: "Gửi số đo dài, rộng, cao của hộp hoặc giỏ quà. Xưởng đề xuất kích thước túi, kiểu đáy và quai để vừa khít và chịu được trọng lượng.",
    },
    {
      q: "In được logo kèm lời chúc Tết không?",
      a: "Được. Có thể in logo cùng chữ chúc mừng năm mới, hình hoa mai, hoa đào hoặc linh vật năm. Xưởng tư vấn số màu in để vừa ngân sách.",
    },
    {
      q: "Số lượng tối thiểu là bao nhiêu?",
      a: (
        <>
          <Tbc>Từ 100 sản phẩm mỗi mẫu</Tbc> với túi canvas. Túi không dệt{" "}
          <Tbc>cần xác nhận số lượng tối thiểu</Tbc>. Số lượng càng lớn đơn giá càng tốt.
        </>
      ),
    },
    {
      q: "Có hợp đồng và hóa đơn VAT không?",
      a: "Có. Mỗi đơn đều có hợp đồng ghi rõ quy cách, tiến độ, thanh toán và được xuất hóa đơn VAT đầy đủ.",
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        top={
          <>
            {review && <ReviewBanner />}
            <p className="bg-brand-red px-6 py-3 text-center text-[13px] leading-relaxed text-white">
              {TET.name}: <b className="text-brand-gold">{TET.date}</b>
              <span className="max-sm:hidden"> · Xưởng nhận lịch sản xuất Tết theo thứ tự chốt mẫu</span> – đặt sớm
              để kịp giao
            </p>
          </>
        }
        eyebrow={`Mùa quà Tết ${TET.year} · Xưởng sản xuất từ ${brand.founded}`}
        title={variant.title}
        lead={variant.lead}
        cta="Giữ lịch sản xuất Tết"
        facts={facts}
        images={hero}
        zaloUrl={brand.social.zalo}
      />

      <ClientMarquee locale={locale} />

      {/* Lịch đặt hàng Tết */}
      <section id="lich-tet" className="scroll-mt-28 bg-navy-500 py-20 text-white lg:py-24">
        <div className="container-brand">
          <SectionIntro
            eyebrow={`Lịch đặt hàng Tết ${TET.year}`}
            title="Đặt càng sớm, càng chắc kịp Tết"
            lead="Túi in logo cần làm mẫu, duyệt mẫu rồi mới sản xuất hàng loạt. Tháng 12 và tháng 1 là cao điểm, lịch xưởng kín nhanh."
            dark
          />
          <ol className="grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((s, i) => (
              <li key={i} className="relative bg-navy-500 p-7">
                <span className={`absolute inset-x-0 top-0 h-[3px] ${s.hot ? "bg-brand-red" : "bg-white/15"}`} />
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-2xl font-bold text-brand-gold">{s.when}</p>
                  {s.hot && (
                    <span className="bg-brand-red px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase">
                      Cao điểm
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Túi quà Tết cho ai */}
      <section className="container-brand py-20 lg:py-28">
        <SectionIntro eyebrow="Túi quà Tết cho ai" title="Một xưởng, đủ loại túi cho mọi kiểu quà Tết" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="flex flex-col border border-line p-7">
              <p className="eyebrow text-brand-red">{a.tag}</p>
              <h3 className="mt-4 font-display text-xl leading-snug font-bold text-navy-500">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.text}</p>
              <p className="mt-auto border-t border-line pt-4 text-[13px] text-ink">
                <span className="eyebrow mr-2 text-ink-soft/70">Hợp</span>
                {a.fit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* So sánh túi giấy / không dệt / canvas */}
      <section className="border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <SectionIntro
            eyebrow="Túi giấy hay túi vải?"
            title="Chọn túi nào cho quà Tết?"
            lead="Túi giấy thường bị bỏ sau khi mở quà. Túi vải được dùng lại, nên logo của bạn còn xuất hiện sau Tết."
            className=""
          />
          <div className="bg-white">
            <DataTable
              head={["Tiêu chí", "Túi giấy", "Túi không dệt", "Túi canvas"]}
              cols="md:grid-cols-[1.2fr_1fr_1fr_1fr]"
              mobileLabels
              rows={comparison.map(([label, ...cells]) => ({
                key: label,
                cells: [
                  <span key="l" className="text-[15px] font-medium text-navy-500">
                    {label}
                  </span>,
                  ...cells,
                ],
              }))}
            />
          </div>
        </div>
      </section>

      <PriceSection
        title="Ngân sách cho một chiếc túi quà Tết"
        lead="Giá phụ thuộc chất liệu, kích thước, số màu in và số lượng. Gửi kích thước hộp quà hoặc giỏ quà để nhận báo giá chính xác."
        cta="Nhận báo giá túi quà Tết"
        rows={prices}
      />

      {/* Mẫu túi quà Tết */}
      <section id="san-pham" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro
            eyebrow="Mẫu túi quà Tết"
            title="Gợi ý mẫu cho mùa Tết"
            lead="Một số đơn hàng thực tế đã sản xuất. Màu vải, màu in và kích thước đều đổi được theo hộp quà và nhận diện Tết của bạn."
            className="mb-10 max-w-2xl"
          />
          <LandingShowcase items={showcase} tabs={false} />
          <p className="mt-10 text-[15px] text-ink-soft">
            Có sẵn kích thước hộp quà? Gửi số đo hoặc ảnh hộp quà qua{" "}
            <a
              href={brand.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="font-semibold text-navy-500 underline underline-offset-4 hover:text-brand-red"
            >
              Zalo
            </a>{" "}
            để xưởng đề xuất kích thước túi vừa khít.
          </p>
        </div>
      </section>

      <ReasonsSection
        eyebrow="Vì sao chọn Phan Nguyễn mùa Tết"
        title="Không lo trễ hàng sát Tết"
        reasons={reasons}
        cols="lg:grid-cols-3"
      />

      <QuoteSection
        title={
          <>
            Giữ lịch sản xuất Tết – nhận báo giá{" "}
            <Tbc note="Cần xác nhận cam kết thời gian phản hồi">trong 24 giờ làm việc</Tbc>
          </>
        }
        lead="Ghi rõ ngày cần hàng để xưởng xếp lịch. Mùa Tết lịch sản xuất kín nhanh, đơn chốt mẫu trước được làm trước."
        Tbc={Tbc}
        brand={brand}
        form={{
          nhom: `tet-${variantKey}`,
          defaultProduct: variant.product,
          products: TET_PRODUCTS,
          deadlinePlaceholder: `VD: trước 15/01/${TET.year}`,
          notePlaceholder:
            "Kích thước hộp/giỏ quà cần đựng, màu (đỏ, vàng...), số màu logo, có in thêm chữ chúc Tết không...",
        }}
      />

      <FaqSection eyebrow="Câu hỏi mùa Tết" title="Trước khi đặt túi quà Tết" faqs={faqs} brand={brand} />
    </>
  )
}
