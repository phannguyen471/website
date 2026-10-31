import type { Metadata } from "next"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { TET, TET_PATH, TET_PRODUCT_KEYS, TET_SHOWCASE, TET_VARIANTS, type TetVariantKey } from "@/lib/tet-landing"
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
 * (bên tiếng Anh là `?group=`, xem lib/tet-landing.ts), cùng bộ khối dựng
 * với landing túi vải.
 */

export function tetLandingMetadata(key: TetVariantKey, locale: Locale): Metadata {
  const variant = TET_VARIANTS[key]
  return {
    title: variant.metaTitle[locale],
    description: variant.lead[locale],
    robots: landingRobots,
    alternates: {
      canonical: TET_PATH[locale],
      languages: { vi: TET_PATH.vi, en: TET_PATH.en, "x-default": TET_PATH.vi },
    },
  }
}

export default function TetLandingPage({
  variantKey,
  locale,
  review,
}: {
  variantKey: TetVariantKey
  locale: Locale
  review: boolean
}) {
  const variant = TET_VARIANTS[variantKey]
  const { brand, products } = content(locale)
  const Tbc = makeTbc(review)
  const vi = locale === "vi"
  const tr = (v: string, e: string) => (vi ? v : e)

  const imageOf = (slug: string) => media(products.find((p) => p.key === slug)?.images[0])
  const hero = variant.heroSlugs.map((slug) => ({
    src: imageOf(slug),
    alt: products.find((p) => p.key === slug)?.name ?? "",
  }))
  const showcase = TET_SHOWCASE.map((item) => ({
    slug: item.slug,
    tag: item.tag[locale],
    name: item.name[locale],
    note: item.note[locale],
    product: item.product,
    image: imageOf(item.slug),
  }))

  const facts = [
    { value: tr("Hợp đồng & VAT", "Contract & VAT"), label: tr("Đủ hồ sơ để quyết toán quà Tết", "Full paperwork for Tet gift accounting") },
    {
      value: (
        <Tbc note="Cần xác nhận hạn chót chốt mẫu mùa Tết">
          {tr(`Chốt mẫu trước ${TET.sampleDeadline}`, `Approve samples by ${TET.sampleDeadline}`)}
        </Tbc>
      ),
      label: tr("Để kịp giao trước Tết", "To deliver before Tet"),
    },
    {
      value: tr("Màu đỏ, vàng, in lời chúc", "Red, gold & greetings"),
      label: tr("Logo kèm thông điệp năm mới", "Your logo with a New Year message"),
    },
    {
      value: (
        <Tbc note="Tham khảo: hầu hết đối thủ đều miễn phí thiết kế">{tr("Mockup miễn phí", "Free mockup")}</Tbc>
      ),
      label: tr("Xem quà Tết trước khi đặt", "See your Tet gift before ordering"),
    },
  ]

  const timeline = [
    {
      when: tr("Tháng 11", "November"),
      text: tr(
        "Thời điểm tốt nhất: đủ thời gian làm mẫu, chỉnh màu, chọn chất liệu.",
        "The best time: enough room for sampling, colour matching and choosing materials.",
      ),
    },
    {
      when: tr("Tháng 12", "December"),
      text: tr(
        "Cao điểm đặt hàng. Nên chốt mẫu trong tuần đầu nhận mockup.",
        "Peak season. Approve your sample within a week of receiving the mockup.",
      ),
      hot: true,
    },
    {
      when: (
        <Tbc note="Cần xác nhận">
          {tr(`Trước ${TET.sampleDeadlineShort}`, `By ${TET.sampleDeadlineShort}`)}
        </Tbc>
      ),
      text: tr(
        "Hạn chót chốt mẫu để sản xuất và giao trước Tết.",
        "Last day to approve samples for production and delivery before Tet.",
      ),
      hot: true,
    },
    {
      when: (
        <Tbc note="Cần xác nhận ngày giao cuối cùng">
          {tr(`Trước ${TET.lastDelivery}`, `By ${TET.lastDelivery}`)}
        </Tbc>
      ),
      text: tr(
        "Giao hàng đợt cuối tới văn phòng, kho hoặc nơi đóng giỏ quà.",
        "Final deliveries to your office, warehouse or hamper packing site.",
      ),
    },
  ]

  const audiences = [
    {
      tag: tr("Quà khách hàng, đối tác", "Client & partner gifts"),
      title: tr("Tri ân khách hàng dịp Tết", "Thanking clients at Tet"),
      text: tr(
        "Túi da PU, túi canvas phối cói, túi mỹ phẩm in logo tinh tế, xứng tầm thương hiệu và đặt vừa hộp quà cao cấp.",
        "PU leather bags, canvas & seagrass totes and cosmetic pouches with a subtle logo – on-brand and sized for premium gift boxes.",
      ),
      fit: tr("Túi da PU, canvas cao cấp, pouch", "PU bags, premium canvas, pouches"),
    },
    {
      tag: tr("Quà nhân viên", "Staff gifts"),
      title: tr("Phòng nhân sự, công đoàn", "HR teams & trade unions"),
      text: tr(
        "Balo, áo, nón, túi canvas mang logo công ty – món quà nhân viên dùng hằng ngày, gắn kết với công ty cả năm.",
        "Backpacks, apparel, caps and canvas bags with the company logo – gifts staff use every day that build connection all year.",
      ),
      fit: tr("Balo, áo polo, nón", "Backpacks, polos, caps"),
    },
    {
      tag: tr("Tất niên, du xuân", "Year-end & New Year events"),
      title: tr("Year end party, team building", "Year-end parties, team building"),
      text: tr(
        "Áo đồng phục, nón, túi in logo và thông điệp năm mới cho tiệc tất niên, chuyến du xuân đầu năm.",
        "Uniforms, caps and bags printed with your logo and New Year message for year-end parties and spring outings.",
      ),
      fit: tr("Áo, nón, túi sự kiện", "Shirts, caps, event bags"),
    },
    {
      tag: tr("Đựng giỏ quà, khuyến mãi", "Hampers & promotions"),
      title: tr("Giỏ quà, siêu thị, hội chợ", "Hampers, retailers, fairs"),
      text: tr(
        "Túi in thương hiệu để đựng giỏ quà, hộp quà Tết hoặc tặng kèm đơn hàng – số lượng lớn, giá xưởng.",
        "Branded bags to carry Tet hampers and gift boxes or to give away with purchases – in bulk, at factory prices.",
      ),
      fit: tr("Túi không dệt, tote lớn", "Non-woven, large totes"),
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
  const comparison: [string, ...React.ReactNode[]][] = [
    [
      tr("Thời gian sử dụng", "How long it is used"),
      cell(tr("Vài ngày đến vài tuần", "A few days to a few weeks"), "no"),
      cell(tr("Cả năm, mỗi ngày", "All year, every day"), "yes"),
    ],
    [
      tr("Logo thương hiệu", "Your brand logo"),
      cell(tr("Trên bao bì, bỏ đi sau Tết", "On the packaging, thrown away after Tet"), "no"),
      cell(tr("Xuất hiện mỗi lần dùng", "Seen every time it is used"), "yes"),
    ],
    [
      tr("Khác biệt", "Stands out"),
      cell(tr("Dễ trùng với quà nơi khác", "Easily mixed up with other gifts")),
      cell(tr("Thiết kế riêng theo nhận diện", "Custom-designed to your brand"), "yes"),
    ],
    [
      tr("Phù hợp nhất", "Best for"),
      cell(tr("Quà truyền thống, quà kèm", "Traditional or add-on gifts")),
      cell(tr("Khách hàng, đối tác, nhân viên", "Clients, partners, staff")),
    ],
  ]

  const prices = [
    {
      name: tr("Túi canvas / vải bố in logo, in 1–2 màu", "Logo canvas / cotton bag, 1–2 colour print"),
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 25–40k">{tr("Từ 25.000đ", "From 25,000 VND")}</Tbc>,
      use: tr("Quà nhân viên, quà đối tác số lượng lớn", "Bulk staff and partner gifts"),
    },
    {
      name: tr("Túi canvas dày, có khóa kéo", "Heavy canvas bag with zip"),
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 40–60k">{tr("Từ 40.000đ", "From 40,000 VND")}</Tbc>,
      use: tr("Quà khách hàng", "Client gifts"),
    },
    {
      name: tr("Túi da PU, canvas phối cói cao cấp", "PU leather or premium canvas & seagrass bag"),
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 80–120k">{tr("Từ 80.000đ", "From 80,000 VND")}</Tbc>,
      use: tr("Quà VIP, đối tác chiến lược", "VIP and key partner gifts"),
    },
    {
      name: tr("Túi mỹ phẩm, pouch in logo", "Logo cosmetic pouches"),
      price: tr("Báo giá theo mẫu", "Quoted per design"),
      use: tr("Quà khách hàng, quà tặng kèm sản phẩm", "Client gifts, gift-with-purchase"),
    },
    {
      name: tr("Balo, áo polo, nón in / thêu logo", "Logo backpacks, polos, caps"),
      price: tr("Báo giá theo mẫu", "Quoted per design"),
      use: tr("Quà Tết nhân viên, year end party", "Staff Tet gifts, year-end parties"),
    },
    {
      name: tr("Túi vải không dệt đựng giỏ quà", "Non-woven hamper bags"),
      price: (
        <Tbc note="Cần Phan Nguyễn cung cấp giá và số lượng tối thiểu">
          {tr("Báo giá theo số lượng", "Quoted by quantity")}
        </Tbc>
      ),
      use: tr("Giỏ quà, hội chợ, khuyến mãi Tết", "Hampers, fairs, Tet promotions"),
    },
  ]

  const reasons = [
    {
      title: tr("Tiến độ ghi trong hợp đồng", "Deadlines in the contract"),
      text: tr(
        "Ngày giao được ghi rõ trong hợp đồng. Không hứa miệng rồi trễ hẹn sát Tết.",
        "The delivery date is written into the contract – no verbal promises that slip right before Tet.",
      ),
    },
    {
      title: tr("Hóa đơn VAT đầy đủ", "Full VAT invoice"),
      text: tr(
        "Đủ hồ sơ để phòng kế toán quyết toán chi phí quà Tết cuối năm.",
        "Everything your accounting team needs to close out year-end gift expenses.",
      ),
    },
    {
      title: tr("Duyệt mẫu thật trước", "Approve a real sample first"),
      text: (
        <>
          <Tbc>{tr("Mockup miễn phí", "Free mockup")}</Tbc>
          {tr(
            ", sau đó may mẫu thử để bạn kiểm tra màu đỏ, vàng và logo trước khi chạy hàng loạt.",
            ", then a physical sample so you can check the reds, golds and logo before mass production.",
          )}
        </>
      ),
    },
    {
      title: tr("Quen đơn của tập đoàn", "Used to corporate orders"),
      text: tr(
        "Đã sản xuất cho các thương hiệu thuộc L'Oréal và doanh nghiệp đa quốc gia, quen tiến độ khắt khe.",
        "Supplier to L'Oréal brands and multinationals, used to tight deadlines.",
      ),
    },
    {
      title: tr("Bảo hành lỗi sản xuất", "Manufacturing defect warranty"),
      text: (
        <>
          <Tbc note="Tham khảo: đối thủ bảo hành 1 đổi 1">
            {tr("Đổi mới 1:1 sản phẩm lỗi may, lỗi in hoặc lỗi vải", "1:1 replacement for sewing, printing or fabric defects")}
          </Tbc>
          .
        </>
      ),
    },
    {
      title: tr("Giao tận nơi đóng quà", "Delivered to your packing site"),
      text: tr(
        "Giao tới văn phòng, kho hoặc nơi đóng giỏ quà trên toàn quốc.",
        "Delivered to your office, warehouse or hamper packing site anywhere in Vietnam.",
      ),
    },
  ]

  const tel = `tel:${brand.hotline.replace(/\s/g, "")}`
  const faqs = [
    {
      q: tr("Đặt bây giờ có kịp giao trước Tết không?", "If I order now, will it arrive before Tet?"),
      a: (
        <>
          {tr("Kịp nếu chốt mẫu ", "Yes, if you approve the sample ")}
          <Tbc>{tr(`trước ${TET.sampleDeadline}`, `by ${TET.sampleDeadline}`)}</Tbc>
          {tr(". Thời gian sản xuất thường ", ". Production usually takes ")}
          <Tbc>{tr("7–15 ngày làm việc", "7–15 working days")}</Tbc>
          {tr(
            " sau khi duyệt mẫu, tùy số lượng. Ghi ngày cần hàng trong form để xưởng xếp lịch.",
            " after approval, depending on quantity. Add your deadline in the form so we can schedule it.",
          )}
        </>
      ),
    },
    {
      q: tr("Có làm gấp cho đơn sát Tết không?", "Can you rush an order close to Tet?"),
      a: (
        <>
          {tr("Có thể, tùy lịch xưởng và số lượng. Gọi", "Possibly, depending on our schedule and quantity. Call")}{" "}
          <a href={tel} data-track="click_call" className="font-semibold text-navy-500 hover:text-brand-red">
            {brand.hotline}
          </a>{" "}
          {tr(
            "để kiểm tra lịch trống trước khi gửi thiết kế.",
            "to check availability before sending your design.",
          )}
        </>
      ),
    },
    {
      q: tr("Đặt nhiều loại quà trong cùng một đơn được không?", "Can I order several kinds of gifts in one order?"),
      a: tr(
        "Được. Xưởng làm trọn gói túi, balo, áo, nón và phụ kiện in logo – một hợp đồng, một hóa đơn VAT, giao cùng một đợt. Bạn có thể chọn quà khác nhau cho khách hàng, đối tác và nhân viên.",
        "Yes. We make bags, backpacks, apparel, caps and accessories in one package – one contract, one VAT invoice, one delivery. You can choose different gifts for clients, partners and staff.",
      ),
    },
    {
      q: tr("Tôi cần túi vừa hộp quà, giỏ quà có sẵn?", "I need bags to fit my existing gift boxes or hampers"),
      a: tr(
        "Gửi số đo dài, rộng, cao của hộp hoặc giỏ quà. Xưởng đề xuất kích thước túi, kiểu đáy và quai để vừa khít và chịu được trọng lượng.",
        "Send the length, width and height of your box or hamper. We will suggest a bag size, base and handles that fit snugly and carry the weight.",
      ),
    },
    {
      q: tr("In được logo kèm lời chúc Tết không?", "Can you print a Tet greeting with the logo?"),
      a: tr(
        "Được. Có thể in logo cùng chữ chúc mừng năm mới, hình hoa mai, hoa đào hoặc linh vật năm. Xưởng tư vấn số màu in để vừa ngân sách.",
        "Yes. We can print your logo with a New Year greeting, apricot or peach blossoms, or the zodiac animal. We will advise on print colours to fit your budget.",
      ),
    },
    {
      q: tr("Số lượng tối thiểu là bao nhiêu?", "What is the minimum order?"),
      a: (
        <>
          <Tbc>{tr("Từ 100 sản phẩm mỗi mẫu", "From 100 pieces per design")}</Tbc>
          {tr(" với túi canvas; balo, áo, nón và túi không dệt ", " for canvas bags. For backpacks, apparel, caps and non-woven bags, ")}
          <Tbc>{tr("tùy mẫu, vui lòng liên hệ", "it depends on the design – please ask")}</Tbc>
          {tr(". Số lượng càng lớn đơn giá càng tốt.", ". The larger the order, the better the unit price.")}
        </>
      ),
    },
    {
      q: tr("Có hợp đồng và hóa đơn VAT không?", "Do you provide a contract and VAT invoice?"),
      a: tr(
        "Có. Mỗi đơn đều có hợp đồng ghi rõ quy cách, tiến độ, thanh toán và được xuất hóa đơn VAT đầy đủ.",
        "Yes. Every order has a contract covering specs, schedule and payment, plus a full VAT invoice.",
      ),
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        locale={locale}
        top={
          <>
            {review && <ReviewBanner />}
            <p className="bg-brand-red px-6 py-3 text-center text-[13px] leading-relaxed text-white">
              {TET.name[locale]}: <b className="text-brand-gold">{TET.date}</b>
              <span className="max-sm:hidden">
                {tr(
                  " · Xưởng nhận lịch sản xuất Tết theo thứ tự chốt mẫu",
                  " · Tet production slots are booked in order of sample approval",
                )}
              </span>
              {tr(" – đặt sớm để kịp giao", " – order early to deliver on time")}
            </p>
          </>
        }
        eyebrow={tr(
          `Mùa quà Tết ${TET.year} · Xưởng sản xuất từ ${brand.founded}`,
          `Tet gift season ${TET.year} · Factory since ${brand.founded}`,
        )}
        title={variant.title[locale]}
        lead={variant.lead[locale]}
        cta={tr("Giữ lịch sản xuất Tết", "Book a Tet production slot")}
        facts={facts}
        images={hero}
        zaloUrl={brand.social.zalo}
      />

      <ClientMarquee locale={locale} />

      {/* Lịch đặt hàng Tết */}
      <section id="lich-tet" className="scroll-mt-28 bg-navy-500 py-20 text-white lg:py-24">
        <div className="container-brand">
          <SectionIntro
            eyebrow={tr(`Lịch đặt hàng Tết ${TET.year}`, `Tet ${TET.year} ordering calendar`)}
            title={tr("Đặt càng sớm, càng chắc kịp Tết", "The earlier you order, the safer your Tet delivery")}
            lead={tr(
              "Quà in logo cần làm mẫu, duyệt mẫu rồi mới sản xuất hàng loạt. Tháng 12 và tháng 1 là cao điểm, lịch xưởng kín nhanh.",
              "Logo gifts need a sample and approval before mass production. December and January are peak months, and our schedule fills up fast.",
            )}
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
                      {tr("Cao điểm", "Peak")}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quà Tết cho ai */}
      <section className="container-brand py-20 lg:py-28">
        <SectionIntro
          eyebrow={tr("Quà Tết cho ai", "Who the gifts are for")}
          title={tr("Một xưởng, đủ quà Tết cho mọi đối tượng", "One factory, the right Tet gift for everyone")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="flex flex-col border border-line p-7">
              <p className="eyebrow text-brand-red">{a.tag}</p>
              <h3 className="mt-4 font-display text-xl leading-snug font-bold text-navy-500">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.text}</p>
              <p className="mt-auto border-t border-line pt-4 text-[13px] text-ink">
                <span className="eyebrow mr-2 text-ink-soft/70">{tr("Hợp", "Fits")}</span>
                {a.fit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* So sánh quà ăn hết và quà in logo dùng hằng ngày */}
      <section className="border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <SectionIntro
            eyebrow={tr("Quà ăn hết hay quà dùng được?", "Consumed or kept?")}
            title={tr("Chọn quà Tết doanh nghiệp thế nào?", "How to choose corporate Tet gifts")}
            lead={tr(
              "Giỏ bánh kẹo, rượu dùng hết sau vài tuần. Quà in logo dùng hằng ngày nên thương hiệu của bạn còn xuất hiện cả năm. Nhiều doanh nghiệp kết hợp cả hai: đặt giỏ quà truyền thống trong túi in logo.",
              "Hampers of sweets and wine are gone within weeks. Logo gifts get used every day, so your brand stays in sight all year. Many companies combine both: a traditional hamper inside a logo bag.",
            )}
            className=""
          />
          <div className="bg-white">
            <DataTable
              head={[
                tr("Tiêu chí", "Criteria"),
                tr("Bánh kẹo, rượu, giỏ quà", "Sweets, wine, hampers"),
                tr("Quà in logo dùng hằng ngày", "Everyday logo gifts"),
              ]}
              cols="md:grid-cols-[1fr_1.3fr_1.3fr]"
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
        locale={locale}
        title={tr("Ngân sách cho một món quà Tết in logo", "Budgeting for a logo Tet gift")}
        lead={tr(
          "Giá phụ thuộc loại quà, chất liệu, số màu in và số lượng. Cho xưởng biết ngân sách mỗi phần quà để được gợi ý phù hợp.",
          "Price depends on the gift type, material, print colours and quantity. Tell us your budget per gift and we will suggest options.",
        )}
        cta={tr("Nhận báo giá quà Tết", "Get a Tet gift quote")}
        rows={prices}
      />

      {/* Gợi ý quà Tết doanh nghiệp */}
      <section id="san-pham" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro
            eyebrow={tr("Gợi ý quà Tết doanh nghiệp", "Corporate Tet gift ideas")}
            title={tr("Quà Tết in logo cho từng đối tượng", "Logo Tet gifts for every recipient")}
            lead={tr(
              "Một số đơn hàng thực tế đã sản xuất cho các thương hiệu. Màu sắc, chất liệu và cách in đều đổi được theo nhận diện Tết của bạn.",
              "A selection of real orders we have produced for brands. Colours, materials and printing can all be adapted to your Tet branding.",
            )}
            className="mb-10 max-w-2xl"
          />
          <LandingShowcase locale={locale} items={showcase} tabs={false} />
          <p className="mt-10 text-[15px] text-ink-soft">
            {tr(
              "Đã có ý tưởng quà Tết? Gửi hình tham khảo hoặc logo qua",
              "Already have a gift idea? Send a reference photo or your logo via",
            )}{" "}
            <a
              href={brand.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="font-semibold text-navy-500 underline underline-offset-4 hover:text-brand-red"
            >
              Zalo
            </a>{" "}
            {tr("để xưởng làm mẫu đúng ý bạn.", "and we will make a sample to match.")}
          </p>
        </div>
      </section>

      <ReasonsSection
        eyebrow={tr("Vì sao chọn Phan Nguyễn mùa Tết", "Why Phan Nguyen this Tet")}
        title={tr("Không lo trễ hàng sát Tết", "No last-minute delays before Tet")}
        reasons={reasons}
        cols="lg:grid-cols-3"
      />

      <QuoteSection
        locale={locale}
        title={
          <>
            {tr("Giữ lịch sản xuất Tết – nhận báo giá", "Book your Tet slot – get a quote")}{" "}
            <Tbc note="Cần xác nhận cam kết thời gian phản hồi">
              {tr("trong 24 giờ làm việc", "within 24 working hours")}
            </Tbc>
          </>
        }
        lead={tr(
          "Ghi rõ ngày cần hàng để xưởng xếp lịch. Mùa Tết lịch sản xuất kín nhanh, đơn chốt mẫu trước được làm trước.",
          "Tell us your delivery date so we can schedule it. Tet slots fill fast, and orders are produced in order of sample approval.",
        )}
        Tbc={Tbc}
        brand={brand}
        form={{
          nhom: `tet-${variantKey}`,
          defaultProduct: variant.product,
          productKeys: TET_PRODUCT_KEYS,
          deadlinePlaceholder: tr(`VD: trước 15/01/${TET.year}`, `e.g. before 15 Jan ${TET.year}`),
          notePlaceholder: tr(
            "Loại quà, số lượng từng loại, tặng khách hàng hay nhân viên, màu (đỏ, vàng...), số màu logo, có in lời chúc Tết không...",
            "Gift types, quantity of each, for clients or staff, colours (red, gold...), number of logo colours, whether to add a Tet greeting...",
          ),
        }}
      />

      <FaqSection
        locale={locale}
        eyebrow={tr("Câu hỏi mùa Tết", "Tet season FAQ")}
        title={tr("Trước khi đặt quà Tết doanh nghiệp", "Before you order corporate Tet gifts")}
        faqs={faqs}
        brand={brand}
      />
    </>
  )
}
