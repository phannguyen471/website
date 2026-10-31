import type { Metadata } from "next"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { SHOWCASE, VARIANTS, landingPath, type VariantKey } from "@/lib/landing"
import { media } from "@/lib/utils"
import ClientMarquee from "@/components/client-marquee"
import LandingShowcase from "@/components/landing-showcase"
import LandingTracking from "@/components/landing-tracking"
import {
  CasesSection,
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
 * Thân trang landing chạy Google Ads. Dùng chung cho `/bao-gia?nhom=…` và
 * các URL riêng theo nhóm (xem `path` trong lib/landing.ts), cả hai ngôn ngữ.
 *
 * `review` bật khi mở `?review=1`: tô vàng các con số lấy từ thị trường để
 * Phan Nguyễn xác nhận trước khi chạy quảng cáo.
 */

export function landingMetadata(key: VariantKey, locale: Locale): Metadata {
  const variant = VARIANTS[key]
  return {
    title: variant.metaTitle[locale],
    description: variant.lead[locale],
    robots: landingRobots,
    alternates: {
      canonical: landingPath(key, locale),
      languages: { vi: landingPath(key, "vi"), en: landingPath(key, "en"), "x-default": landingPath(key, "vi") },
    },
  }
}

export default function LandingPage({
  variantKey,
  locale,
  review,
}: {
  variantKey: VariantKey
  locale: Locale
  review: boolean
}) {
  const variant = VARIANTS[variantKey]
  const { brand, products } = content(locale)
  const vi = locale === "vi"
  const tr = (v: string, e: string) => (vi ? v : e)

  const imageOf = (slug: string) => media(products.find((p) => p.key === slug)?.images[0])
  const hero = variant.heroSlugs.map((slug) => ({
    src: imageOf(slug),
    alt: products.find((p) => p.key === slug)?.name ?? "",
  }))
  const showcase = SHOWCASE.map((item) => ({
    slug: item.slug,
    tab: item.tab,
    tag: item.tag[locale],
    name: item.name[locale],
    note: item.note[locale],
    product: item.product,
    image: imageOf(item.slug),
  }))
  const years = new Date().getFullYear() - brand.founded
  const Tbc = makeTbc(review)

  const facts = [
    { value: tr("Hợp đồng & VAT", "Contract & VAT"), label: tr("Đầy đủ hồ sơ cho doanh nghiệp", "Full paperwork for businesses") },
    {
      value: <Tbc note="Tham khảo: thị trường 50–100 sp/đơn">{tr("Từ 100 sản phẩm", "From 100 pieces")}</Tbc>,
      label: tr("Giá tốt hơn khi số lượng lớn", "Better prices for larger orders"),
    },
    {
      value: <Tbc note="Tham khảo: thị trường 5–7 ngày sau chốt mẫu">{tr("7–15 ngày", "7–15 days")}</Tbc>,
      label: tr("Sản xuất, tính từ khi duyệt mẫu", "Production time after sample approval"),
    },
    {
      value: (
        <Tbc note="Tham khảo: hầu hết đối thủ đều miễn phí thiết kế">{tr("Mockup miễn phí", "Free mockup")}</Tbc>
      ),
      label: tr("Xem logo trên sản phẩm trước", "See your logo on the product first"),
    },
  ]

  const prices = [
    {
      name: tr("Túi vải canvas / vải bố cơ bản, in 1–2 màu", "Basic canvas / cotton bag, 1–2 colour print"),
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 25–40k">{tr("Từ 25.000đ", "From 25,000 VND")}</Tbc>,
      use: tr("Sự kiện, hội nghị, quà tặng kèm sản phẩm", "Events, conferences, gift-with-purchase"),
    },
    {
      name: tr("Túi canvas dày, có khóa kéo / túi con", "Heavy canvas bag with zip / inner pocket"),
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 40–60k">{tr("Từ 40.000đ", "From 40,000 VND")}</Tbc>,
      use: tr("Quà tặng khách hàng, nhân viên", "Client and staff gifts"),
    },
    {
      name: tr("Túi canvas cao cấp phối da, PU, cói", "Premium canvas with leather, PU or seagrass"),
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 80–120k">{tr("Từ 80.000đ", "From 80,000 VND")}</Tbc>,
      use: tr("Quà VIP, quà tặng thương hiệu cao cấp", "VIP and premium brand gifts"),
    },
    {
      name: tr("Túi vải không dệt in logo", "Logo non-woven bag"),
      price: (
        <Tbc note="Cần Phan Nguyễn cung cấp giá và số lượng tối thiểu cho túi không dệt">
          {tr("Báo giá theo số lượng", "Quoted by quantity")}
        </Tbc>
      ),
      use: tr("Sự kiện, hội chợ, siêu thị, khuyến mãi số lượng lớn", "Events, fairs, supermarkets, bulk promotions"),
    },
    {
      name: tr("Balo, túi xách, túi đeo chéo in logo", "Logo backpacks, handbags, crossbody bags"),
      price: tr("Báo giá theo mẫu", "Quoted per design"),
      use: tr("Quà nhân viên, onboarding, đại lý", "Staff gifts, onboarding, dealers"),
    },
    {
      name: tr("Áo đồng phục, nón in / thêu logo", "Uniforms, printed / embroidered caps"),
      price: tr("Báo giá theo mẫu", "Quoted per design"),
      use: tr("Đồng phục, team building, sự kiện", "Uniforms, team building, events"),
    },
  ]

  const cases = [
    {
      brand: "Kiehl's",
      slug: "tui-canvas-cotton-phoi-coi",
      product: tr("Túi canvas xanh rêu phối cói tự nhiên", "Moss-green canvas tote with natural seagrass"),
      challenge: tr(
        "Phối hai chất liệu canvas và cói, giữ đúng màu nhận diện thương hiệu",
        "Combining canvas and seagrass while matching the exact brand colour",
      ),
    },
    {
      brand: "Vichy",
      slug: "tui-bo-in-lua-xach-tay",
      product: tr("Túi vải bố xách tay, in lụa logo trên thân và quai", "Cotton tote, logo screen-printed on body and handles"),
      challenge: tr(
        "In logo chạy dọc quai túi, sắc nét và đều màu trên cả lô",
        "Printing the logo along the handles, sharp and colour-consistent across the batch",
      ),
    },
    {
      brand: "Kérastase",
      slug: "tui-xach-tay-canvas-phoi-pu-nau",
      product: tr("Túi canvas phối quai da PU, logo tinh tế", "Canvas bag with PU leather handles, subtle logo"),
      challenge: tr(
        "Hoàn thiện cao cấp, đúng tinh thần thương hiệu salon chuyên nghiệp",
        "A premium finish true to a professional salon brand",
      ),
    },
  ]

  const reasons = [
    {
      title: tr("Xưởng sản xuất trực tiếp", "Direct from the factory"),
      text: tr(
        "Không qua trung gian – giá xưởng, kiểm soát chất lượng từ khâu cắt may đến đóng gói.",
        "No middlemen – factory prices and quality control from cutting and sewing to packing.",
      ),
    },
    {
      title: tr("Hợp đồng & hóa đơn VAT", "Contract & VAT invoice"),
      text: tr(
        "Ký hợp đồng rõ ràng về quy cách, tiến độ, thanh toán. Xuất hóa đơn VAT đầy đủ cho doanh nghiệp.",
        "A clear contract covering specs, schedule and payment, plus a full VAT invoice.",
      ),
    },
    {
      title: tr("Duyệt mẫu thật trước khi sản xuất", "Approve a real sample first"),
      text: (
        <>
          <Tbc note="Tham khảo: đối thủ ghi 'thiết kế miễn phí'">
            {tr("Thiết kế mockup miễn phí", "Free mockup design")}
          </Tbc>
          {tr(
            ", sau đó may mẫu thử để bạn cầm, kiểm tra và chốt trước khi chạy hàng loạt.",
            ", then a physical sample for you to check and approve before mass production.",
          )}
        </>
      ),
    },
    {
      title: tr("Đạt chuẩn nhà cung cấp tập đoàn", "Approved corporate supplier"),
      text: tr(
        "Sản xuất cho các thương hiệu thuộc L'Oréal và doanh nghiệp đa quốc gia – quen quy trình thẩm định, hồ sơ và tiến độ khắt khe.",
        "Supplier to L'Oréal brands and multinationals – used to strict audits, paperwork and deadlines.",
      ),
    },
    {
      title: tr("Làm theo mẫu hoặc thiết kế riêng", "Your sample or a custom design"),
      text: tr(
        "Gửi hình mẫu, sản phẩm thật hoặc bộ nhận diện – xưởng tư vấn chất liệu, kiểu in phù hợp ngân sách.",
        "Send a photo, a physical sample or your brand guide – we advise on materials and printing to fit your budget.",
      ),
    },
    {
      title: tr("Giao toàn quốc & quốc tế", "Nationwide & international delivery"),
      text: tr(
        "Đóng gói theo yêu cầu, giao tận văn phòng, kho hoặc địa điểm sự kiện trên toàn quốc và xuất khẩu.",
        "Custom packing, delivered to your office, warehouse or event venue across Vietnam, or exported.",
      ),
    },
    {
      title: tr("Bảo hành lỗi sản xuất", "Manufacturing defect warranty"),
      text: (
        <>
          <Tbc note="Tham khảo: tuivaiinlogo.com bảo hành 1 đổi 1; Trung Thành đổi trả 7 ngày">
            {tr("Đổi mới 1:1 sản phẩm lỗi may, lỗi in hoặc lỗi vải", "1:1 replacement for sewing, printing or fabric defects")}
          </Tbc>
          {tr(" – cam kết ghi rõ trong hợp đồng.", " – written into the contract.")}
        </>
      ),
    },
    {
      title: tr("Đến xưởng xem mẫu", "Visit our factory"),
      text: (
        <>
          {tr("Ghé xưởng tại ", "Drop by ")}
          <Tbc note="Kiểm tra tên phường mới sau sáp nhập 2025">{brand.address}</Tbc>
          {tr(
            " để xem chất liệu và mẫu thật trước khi đặt.",
            " to see materials and real samples before you order.",
          )}
        </>
      ),
    },
  ]

  const steps = [
    {
      title: tr("Gửi yêu cầu", "Send your request"),
      text: tr(
        "Điền form hoặc nhắn Zalo: sản phẩm, số lượng, logo, ngày cần hàng.",
        "Fill in the form or message us on Zalo: product, quantity, logo, delivery date.",
      ),
    },
    {
      title: tr("Tư vấn & mockup", "Advice & mockup"),
      text: tr(
        "Đề xuất chất liệu, cách in và gửi mockup logo trên sản phẩm.",
        "We suggest materials and printing, and send a mockup of your logo on the product.",
      ),
    },
    {
      title: tr("Báo giá & hợp đồng", "Quote & contract"),
      text: tr(
        "Báo giá chi tiết, ký hợp đồng về quy cách và tiến độ.",
        "A detailed quote and a contract covering specs and schedule.",
      ),
    },
    {
      title: tr("Làm mẫu & duyệt", "Sample & approval"),
      text: tr("May mẫu thử để bạn kiểm tra và chốt.", "We make a sample for you to check and sign off."),
    },
    {
      title: tr("Sản xuất & kiểm hàng", "Production & QC"),
      text: tr("Sản xuất hàng loạt, kiểm tra chất lượng từng lô.", "Mass production with quality checks on every batch."),
    },
    {
      title: tr("Giao hàng & hóa đơn", "Delivery & invoice"),
      text: tr("Giao đúng hẹn, xuất hóa đơn VAT đầy đủ.", "On-time delivery with a full VAT invoice."),
    },
  ]

  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: tr("Số lượng tối thiểu cho mỗi đơn là bao nhiêu?", "What is the minimum order quantity?"),
      a: (
        <>
          <Tbc>{tr("Từ 100 sản phẩm cho mỗi mẫu", "From 100 pieces per design")}</Tbc>
          {tr(
            ". Số lượng càng lớn, đơn giá càng tốt vì chi phí làm rập, khuôn in và set-up chuyền được chia đều. Đơn ít hơn vui lòng liên hệ để được tư vấn.",
            ". The larger the order, the lower the unit price, as pattern, print screen and line set-up costs are spread out. For smaller orders, please contact us.",
          )}
        </>
      ),
    },
    {
      q: tr("Thời gian sản xuất mất bao lâu?", "How long does production take?"),
      a: (
        <>
          {tr("Thông thường ", "Usually ")}
          <Tbc>{tr("7–15 ngày làm việc", "7–15 working days")}</Tbc>
          {tr(
            " tính từ khi duyệt mẫu, tùy số lượng và độ phức tạp. Thời gian cụ thể được ghi trong hợp đồng. Nếu cần gấp cho sự kiện, hãy ghi ngày cần hàng để xưởng xếp lịch ưu tiên.",
            " after sample approval, depending on quantity and complexity. The exact timeline is written into the contract. If you need it urgently for an event, include your deadline so we can prioritise it.",
          )}
        </>
      ),
    },
    {
      q: tr("Có ký hợp đồng và xuất hóa đơn VAT không?", "Do you provide a contract and VAT invoice?"),
      a: tr(
        "Có. Mỗi đơn hàng đều có hợp đồng quy định rõ quy cách, tiến độ, thanh toán và được xuất hóa đơn VAT đầy đủ.",
        "Yes. Every order comes with a contract covering specs, schedule and payment, and a full VAT invoice.",
      ),
    },
    {
      q: tr("Tôi có được xem mẫu trước khi sản xuất không?", "Can I see a sample before production?"),
      a: (
        <>
          {tr("Có. Xưởng gửi ", "Yes. We send a ")}
          <Tbc>{tr("mockup miễn phí", "free mockup")}</Tbc>
          {tr(
            " để bạn xem logo trên sản phẩm, sau đó may mẫu thử để bạn duyệt trước khi sản xuất hàng loạt.",
            " so you can see your logo on the product, then make a physical sample for approval before mass production.",
          )}
        </>
      ),
    },
    {
      q: tr("Tôi có thể đặt theo mẫu có sẵn của mình không?", "Can you make a product from my own sample?"),
      a: tr(
        "Có. Gửi hình mẫu, sản phẩm thật hoặc file thiết kế – xưởng sẽ làm đúng theo yêu cầu.",
        "Yes. Send a photo, a physical sample or a design file – we will make it to your specification.",
      ),
    },
    {
      q: tr("Nếu hàng bị lỗi thì xử lý thế nào?", "What happens if items are defective?"),
      a: (
        <>
          <Tbc>
            {tr(
              "Phan Nguyễn đổi mới 1:1 mọi sản phẩm lỗi may, lỗi in hoặc lỗi vải",
              "Phan Nguyen replaces 1:1 any item with sewing, printing or fabric defects",
            )}
          </Tbc>
          {tr(". Điều khoản bảo hành được ghi trong hợp đồng.", ". Warranty terms are written into the contract.")}
        </>
      ),
    },
    {
      q: tr("Có giao hàng tỉnh và nước ngoài không?", "Do you deliver nationwide and overseas?"),
      a: tr(
        "Có. Phan Nguyễn giao hàng toàn quốc và nhận đơn xuất khẩu quốc tế.",
        "Yes. Phan Nguyen delivers across Vietnam and accepts export orders.",
      ),
    },
    {
      q: tr("Xưởng có làm túi vải không dệt không?", "Do you make non-woven bags?"),
      a: (
        <>
          {tr(
            "Có. Phan Nguyễn sản xuất túi vải không dệt in logo theo yêu cầu: chọn định lượng vải, màu vải, kiểu quai và kích thước. Phù hợp cho sự kiện, hội chợ và chương trình khuyến mãi cần số lượng lớn, giá tốt. ",
            "Yes. Phan Nguyen makes custom logo non-woven bags: choose fabric weight, colour, handle style and size. Ideal for events, fairs and promotions that need large quantities at a good price. ",
          )}
          <Tbc note="Cần xác nhận: may hay ép nhiệt, số lượng tối thiểu">
            {tr("Nhận cả túi may và túi ép nhiệt", "Both sewn and heat-sealed bags are available")}
          </Tbc>
          .
        </>
      ),
    },
    {
      q: tr("In logo bằng phương pháp nào?", "Which logo printing methods do you offer?"),
      a: tr(
        "In lụa, in chuyển nhiệt, thêu vi tính, ép hoặc dập logo – xưởng tư vấn cách phù hợp nhất với chất liệu, số màu của logo và ngân sách.",
        "Screen printing, heat transfer, embroidery, embossing or debossing – we recommend the best method for your material, logo colours and budget.",
      ),
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        locale={locale}
        top={review && <ReviewBanner />}
        eyebrow={tr(`Xưởng sản xuất trực tiếp · Từ ${brand.founded}`, `Direct factory · Since ${brand.founded}`)}
        title={variant.title[locale]}
        lead={variant.lead[locale]}
        cta={tr("Nhận báo giá miễn phí", "Get a free quote")}
        facts={facts}
        images={hero}
        zaloUrl={brand.social.zalo}
      />

      <ClientMarquee locale={locale} />

      {/* Số liệu */}
      <section className="bg-navy-500 text-white">
        <div className="container-brand">
          <dl className="grid grid-cols-2 gap-px bg-white/12 lg:grid-cols-4">
            {[
              {
                n: tr(`Từ ${brand.founded}`, `Since ${brand.founded}`),
                l: tr(`${years} năm sản xuất túi & quà tặng in logo`, `${years} years making logo bags & gifts`),
              },
              { n: `${products.length}+`, l: tr("Mẫu sản phẩm đã sản xuất", "Product designs produced") },
              {
                n: "VAT",
                l: tr("Hợp đồng, hóa đơn đầy đủ cho mọi đơn hàng", "Contract and invoice for every order"),
              },
              {
                n: "WBE",
                l: tr(
                  "Doanh nghiệp nữ làm chủ – chứng nhận WEConnect International",
                  "Women-owned business – WEConnect International certified",
                ),
              },
            ].map((s) => (
              <div key={s.n} className="bg-navy-500 px-2 py-9 sm:px-7 lg:py-12">
                <dt className="font-display text-3xl font-bold text-brand-gold md:text-4xl">{s.n}</dt>
                <dd className="mt-2.5 max-w-[15rem] text-[13px] leading-relaxed text-white/65">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PriceSection
        locale={locale}
        title={tr("Giá bao nhiêu cho một chiếc túi in logo?", "How much does a logo bag cost?")}
        lead={tr(
          "Mức giá dưới đây giúp bạn ước lượng ngân sách. Giá thực tế phụ thuộc chất liệu, kích thước, số màu in và số lượng – gửi yêu cầu để nhận báo giá chính xác.",
          "These prices help you estimate a budget. The final price depends on material, size, number of print colours and quantity – send a request for an exact quote.",
        )}
        cta={tr("Nhận báo giá chính xác", "Get an exact quote")}
        rows={prices}
      />

      {/* Sản phẩm */}
      <section id="san-pham" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro
            eyebrow={tr("Sản phẩm", "Products")}
            title={tr("Một xưởng, đủ mọi món quà mang logo của bạn", "One factory for every gift that carries your logo")}
            lead={tr(
              "Một số đơn hàng thực tế đã sản xuất. Chất liệu, kích thước, màu sắc và cách in đều làm theo yêu cầu.",
              "A selection of real orders we have produced. Material, size, colour and printing are all made to your request.",
            )}
            className="mb-10 max-w-2xl"
          />

          <LandingShowcase locale={locale} items={showcase} />

          <p className="mt-10 text-[15px] text-ink-soft">
            {tr("Không thấy mẫu bạn cần? Gửi hình tham khảo hoặc logo qua", "Can't see what you need? Send a reference photo or your logo via")}{" "}
            <a
              href={brand.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="font-semibold text-navy-500 underline underline-offset-4 hover:text-brand-red"
            >
              Zalo
            </a>{" "}
            {tr("– xưởng sẽ làm mẫu theo đúng ý bạn.", "– we will make a sample exactly as you want.")}
          </p>
        </div>
      </section>

      <CasesSection
        locale={locale}
        eyebrow={tr("Dự án tiêu biểu", "Featured projects")}
        title={tr("Sản phẩm thật, làm cho thương hiệu thật", "Real products for real brands")}
        lead={tr(
          "Các thương hiệu toàn cầu chọn Phan Nguyễn vì chất lượng đồng đều trên cả lô hàng và đúng chuẩn nhận diện thương hiệu.",
          "Global brands choose Phan Nguyen for consistent quality across every batch and faithful brand identity.",
        )}
        cases={cases.map((c) => ({ ...c, image: imageOf(c.slug) }))}
      />

      <ReasonsSection
        eyebrow={tr("Vì sao chọn Phan Nguyễn", "Why Phan Nguyen")}
        title={tr(
          "Làm việc trực tiếp với xưởng, đầy đủ hồ sơ doanh nghiệp",
          "Work directly with the factory, with full business paperwork",
        )}
        reasons={reasons}
      />

      {/* Quy trình */}
      <section id="quy-trinh" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow={tr("Quy trình đặt hàng", "How ordering works")}
          title={tr("6 bước rõ ràng, có hợp đồng", "6 clear steps, backed by a contract")}
          className="mb-14 max-w-2xl"
        />

        <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="group bg-white p-7 lg:p-8">
              <span className="font-display text-4xl leading-none font-bold text-line transition-colors group-hover:text-brand-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-navy-500">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <QuoteSection
        locale={locale}
        title={
          <>
            {tr("Gửi yêu cầu – nhận báo giá", "Send a request – get a quote")}{" "}
            <Tbc note="Cần xác nhận cam kết thời gian phản hồi">
              {tr("trong 24 giờ làm việc", "within 24 working hours")}
            </Tbc>
          </>
        }
        lead={tr(
          "Càng nhiều thông tin (số lượng, ngân sách, logo, ngày cần hàng), báo giá càng chính xác.",
          "The more details you share (quantity, budget, logo, delivery date), the more accurate your quote.",
        )}
        Tbc={Tbc}
        brand={brand}
        form={{ nhom: variantKey, defaultProduct: variant.product }}
      />

      <FaqSection
        locale={locale}
        eyebrow={tr("Câu hỏi thường gặp", "FAQ")}
        title={tr("Trước khi đặt hàng", "Before you order")}
        faqs={faqs}
        brand={brand}
      />
    </>
  )
}
