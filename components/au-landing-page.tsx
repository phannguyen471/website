import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import {
  AFLW_TOTE,
  AU_PATH,
  AU_SHOWCASE,
  AU_TABS,
  AU_VARIANTS,
  auCategories,
  whatsappUrl,
  type AuVariantKey,
} from "@/lib/au-landing"
import { media } from "@/lib/utils"
import ClientMarquee from "@/components/client-marquee"
import LandingShowcase from "@/components/landing-showcase"
import LandingTracking from "@/components/landing-tracking"
import { CasesSection, LandingHero, SectionIntro, landingRobots, makeTbc } from "@/components/landing-sections"
import {
  AuFaqSection,
  AuPriceSection,
  AuProcurementSection,
  AuQuoteSection,
  AuReviewBanner,
  AuTextTable,
  AuVersusSection,
  auSecondaryCta,
} from "@/components/au-sections"
import { IconArrowUpRight } from "@/components/icons"

/**
 * Landing Google Ads cho thị trường Úc (`/en/au`, bản tiếng Việt `/au`) —
 * liên hệ qua WhatsApp và email, giá AUD. Khối riêng của thị trường Úc ở
 * components/au-sections.tsx.
 */

export function auLandingMetadata(key: AuVariantKey, locale: Locale): Metadata {
  const variant = AU_VARIANTS[key]
  return {
    title: variant.metaTitle[locale],
    description: variant.lead[locale],
    robots: landingRobots,
    alternates: {
      canonical: AU_PATH[locale],
      languages: { "en-AU": AU_PATH.en, vi: AU_PATH.vi, "x-default": AU_PATH.en },
    },
  }
}

export default function AuLandingPage({
  variantKey,
  locale,
  review,
}: {
  variantKey: AuVariantKey
  locale: Locale
  review: boolean
}) {
  const variant = AU_VARIANTS[variantKey]
  const { brand, products } = content(locale)
  const Tbc = makeTbc(review)
  const wa = whatsappUrl(brand.zaloPhone)
  const tr = (vi: string, en: string) => (locale === "vi" ? vi : en)

  const imageOf = (slug: string) => media(products.find((p) => p.key === slug)?.images[0])
  const hero = variant.heroSlugs.map((slug) => ({
    src: imageOf(slug),
    alt: products.find((p) => p.key === slug)?.name ?? "",
  }))
  const showcase = AU_SHOWCASE.map((item) => ({
    slug: item.slug,
    tab: item.tab,
    tag: item.tag[locale],
    name: item.name[locale],
    note: item.note[locale],
    product: item.product,
    image: item.image ?? imageOf(item.slug),
  }))

  const facts = [
    { value: tr("Giá tận xưởng", "Factory-direct pricing"), label: tr("Không qua trung gian", "No reseller mark-up") },
    {
      value: tr("Mockup miễn phí", "Free digital mockup"),
      label: tr("Xem logo trên sản phẩm trước", "See your logo on the product first"),
    },
    {
      value: tr("Duyệt mẫu thật trước", "Physical sample first"),
      label: tr("Duyệt trước khi sản xuất hàng loạt", "Approve before bulk production"),
    },
    {
      value: <Tbc note="Confirm export MOQ per product">{tr("Từ 300 sản phẩm", "From 300 units")}</Tbc>,
      label: tr("Mỗi mẫu, giá tốt hơn khi số lượng lớn", "Per design, better price at volume"),
    },
  ]

  const faqs = [
    {
      q: tr("Số lượng tối thiểu là bao nhiêu?", "What is the minimum order?"),
      a: (
        <>
          <Tbc>{tr("300 sản phẩm mỗi mẫu", "300 units per design")}</Tbc>
          {tr(
            " với hầu hết các loại túi. Một số mẫu nhận đơn nhỏ hơn với đơn giá cao hơn – hãy hỏi chúng tôi.",
            " for most bags. Smaller runs are possible on some styles at a higher unit price – ask us.",
          )}
        </>
      ),
    },
    {
      q: tr("Bao lâu thì hàng tới Úc?", "How long until the order arrives in Australia?"),
      a: (
        <>
          {tr("Dự trù khoảng ", "Plan on ")}
          <Tbc>{tr("5–8 tuần", "5–8 weeks")}</Tbc>
          {tr(
            " từ lúc gửi yêu cầu tới khi nhận hàng: làm mẫu, sản xuất rồi vận chuyển. Hàng không nhanh hơn cho đơn gấp; đường biển rẻ hơn cho đơn lớn. Chúng tôi gửi lịch có ngày cụ thể kèm báo giá.",
            " from brief to delivery: sample, production, then freight. Air freight is faster for urgent orders; sea freight is cheaper for large runs. We'll give you a dated schedule with your quote.",
          )}
        </>
      ),
    },
    {
      q: tr("Tôi có phải trả thuế nhập khẩu và GST không?", "Do I pay import duty and GST?"),
      a: (
        <>
          {tr(
            "GST áp dụng cho hàng nhập khẩu như bình thường. Hàng sản xuất tại Việt Nam được miễn thuế nhập khẩu vào Úc theo Hiệp định thương mại tự do ASEAN–Úc–New Zealand khi có chứng nhận xuất xứ, ",
            "GST applies to imports as normal. Goods made in Vietnam can enter Australia duty-free under the ASEAN–Australia–New Zealand Free Trade Agreement when shipped with a certificate of origin, ",
          )}
          <Tbc>{tr("do chúng tôi cung cấp", "which we supply")}</Tbc>
          {tr(
            ". Đơn vị giao nhận hoặc đại lý hải quan của bạn sẽ xác nhận chi tiết cho từng lô hàng.",
            ". Your freight forwarder or customs broker will confirm the details for your shipment.",
          )}
        </>
      ),
    },
    {
      q: tr("Tôi có được xem mẫu trước khi sản xuất không?", "Can I see a sample before production?"),
      a: (
        <>
          {tr(
            "Có. Bạn nhận mockup miễn phí trước, sau đó là mẫu thật gửi chuyển phát tới. ",
            "Yes. You get a free digital mockup first, then a physical sample couriered to you. ",
          )}
          <Tbc note="Confirm sample policy">
            {tr("Phí làm mẫu được trừ vào đơn hàng chính.", "Sample cost is credited against your bulk order.")}
          </Tbc>
        </>
      ),
    },
    {
      q: tr("Có làm đúng màu thương hiệu không?", "Can you match our brand colours?"),
      a: tr(
        "Có. Gửi mã Pantone, chúng tôi pha màu vải và màu in cho khớp, rồi xác nhận trên mẫu thật trước khi sản xuất hàng loạt.",
        "Yes. Send Pantone references and we match fabric and print colours, then confirm them on the physical sample before bulk production.",
      ),
    },
    {
      q: tr("Thanh toán thế nào?", "How do payments work?"),
      a: (
        <>
          <Tbc note="Confirm payment terms">
            {tr(
              "Đặt cọc để bắt đầu sản xuất và thanh toán phần còn lại trước khi giao",
              "A deposit to start production and the balance before shipping",
            )}
          </Tbc>
          {tr(", chuyển khoản quốc tế. Giá báo bằng AUD.", ", by international bank transfer. Prices are quoted in AUD.")}
        </>
      ),
    },
    {
      q: tr("Áo polo và áo thun có chia nhiều size được không?", "Can I order mixed sizes for polos and tees?"),
      a: (
        <>
          {tr(
            "Được. Gửi bảng chia size cho từng mẫu (ví dụ XS–5XL), chúng tôi may đúng theo tỉ lệ. ",
            "Yes. Give us a size run per design (for example XS–5XL) and we sew to your split. ",
          )}
          <Tbc note="Confirm size range and grading">
            {tr("Có form nam, nữ và trẻ em.", "Men's, women's and youth fits available.")}
          </Tbc>
        </>
      ),
    },
    {
      q: tr("Xưởng làm được những kiểu nón nào?", "Which cap styles can you make?"),
      a: tr(
        "Nón 6 múi và 5 múi, nón trucker lưới sau, nón thể thao và mũ bucket, theo màu vải của bạn với logo thêu, in hoặc patch.",
        "Six-panel and five-panel caps, trucker caps with mesh backs, sports caps and bucket hats, in your fabric colours with embroidered, printed or patch logos.",
      ),
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        locale={locale}
        top={review && <AuReviewBanner locale={locale} />}
        eyebrow={tr(
          `Giá tận xưởng · May theo thiết kế · Từ ${brand.founded}`,
          `Factory-direct · Made to your spec · Since ${brand.founded}`,
        )}
        title={variant.title[locale]}
        lead={variant.lead[locale]}
        cta={tr("Nhận báo giá trong 24 giờ", "Get a quote in 24 hours")}
        facts={facts}
        images={hero}
        secondary={auSecondaryCta(brand, locale)}
      />

      <ClientMarquee locale={locale} />

      {/* Số liệu */}
      <section className="bg-navy-500 text-white">
        <div className="container-brand">
          <dl className="grid grid-cols-2 gap-px bg-white/12 lg:grid-cols-4">
            {[
              {
                n: String(brand.founded),
                l: tr("Năm bắt đầu sản xuất túi và quà tặng thương hiệu", "Making bags and branded merchandise since"),
              },
              { n: `${products.length}+`, l: tr("Mẫu sản phẩm đã sản xuất", "Custom styles produced") },
              {
                n: "WBE",
                l: tr(
                  "Doanh nghiệp nữ làm chủ – chứng nhận WEConnect International",
                  "Certified women-owned business – WEConnect International",
                ),
              },
              {
                n: "AU",
                l: tr("Đã giao cho thương hiệu, câu lạc bộ và sự kiện tại Úc", "Delivered to Australian brands, clubs and events"),
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

      {/* Danh mục */}
      <section id="categories" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow={tr("Chọn theo sản phẩm", "Shop by product")}
          title={tr("Bạn cần làm sản phẩm gì?", "What do you need made?")}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {auCategories(locale).map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col border border-line bg-white transition-colors hover:border-navy-300"
            >
              <div className="relative aspect-square overflow-hidden bg-shell">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-display text-xl font-bold text-navy-500">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-ink-soft">{c.text}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-2 text-[11px] font-semibold tracking-[0.14em] text-brand-red uppercase">
                  {tr("Xem mẫu", "See range")}
                  <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AuVersusSection
        locale={locale}
        title={tr("Vì sao nên đặt trực tiếp từ xưởng, không qua catalogue", "Why buy from the factory, not a catalogue")}
        lead={tr(
          "Phần lớn nhà cung cấp hàng khuyến mãi ở Úc in logo lên hàng có sẵn. Cách đó phù hợp với đơn nhỏ. Khi sản phẩm mang thương hiệu của bạn tới khách hàng, sản phẩm may theo thiết kế riêng đẹp và bền hơn – và thường rẻ hơn mỗi chiếc khi số lượng lớn.",
          "Most Australian promo suppliers print your logo onto stock items. That works for small runs. When the product carries your brand to customers, a product built to your spec looks and lasts better – and usually costs less per unit at volume.",
        )}
        rows={[
          [
            tr("Thiết kế sản phẩm", "Product design"),
            tr("Chọn hàng phôi trong catalogue", "Pick from a catalogue blank"),
            tr("May theo kích thước, chất liệu, màu, phụ kiện của bạn", "Built to your size, fabric, colour, trims"),
          ],
          [
            tr("Màu thương hiệu", "Brand colour"),
            tr("Màu có sẵn gần nhất", "Nearest stock colour"),
            tr("Vải và màu in khớp với thương hiệu", "Fabric and print matched to your brand"),
          ],
          [
            tr("Trang trí", "Decoration"),
            tr("In ở mặt trước", "Print on the front panel"),
            tr(
              "In lụa, in tràn, thêu, dập chìm PU, nhãn dệt, thẻ treo riêng",
              "Screen print, full print, embroidery, debossed PU, woven labels, custom tags",
            ),
          ],
          [
            tr("Giá cho đơn 300+", "Price at 300+ units"),
            tr("Cộng thêm lợi nhuận của đơn vị bán lại", "Reseller margin on top"),
            tr("Giá tận xưởng", "Factory-direct"),
          ],
          [
            tr("Phù hợp nhất", "Best for"),
            tr("Dưới 100 cái, cần ngay trong tuần", "Under 100 units, needed this week"),
            tr("Từ 300 cái, lên kế hoạch trước 5–8 tuần", "300+ units, planned 5–8 weeks ahead"),
          ],
        ]}
      />

      {/* Sản phẩm */}
      <section id="san-pham" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow={tr("Sản phẩm của xưởng", "What we make")}
          title={tr(
            "Túi, nón và áo polo cho thương hiệu, đội nhóm và sự kiện",
            "Bags, caps and polos for brands, teams and events",
          )}
          lead={tr(
            "Đơn hàng thực tế từ xưởng. Mẫu nào cũng đổi được kích thước, màu sắc và phụ kiện theo yêu cầu của bạn.",
            "Real orders from our factory. Every style can be resized, re-coloured and re-trimmed to your brief.",
          )}
          className="mb-10 max-w-2xl"
        />
        <LandingShowcase locale={locale} items={showcase} tabList={AU_TABS} />
        <p className="mt-10 text-[15px] text-ink-soft">
          {tr(
            "Nhận làm thêm: mũ bucket, hoodie, túi giữ nhiệt, túi cơm, túi chống sốc laptop và túi du lịch. Gửi hình tham khảo qua",
            "Also made to order: bucket hats, hoodies, cooler and lunch bags, laptop sleeves and travel pouches. Send a reference photo on",
          )}{" "}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-track="click_whatsapp"
            className="font-semibold text-navy-500 underline underline-offset-4 hover:text-brand-red"
          >
            WhatsApp
          </a>{" "}
          {tr("để nhận báo giá.", "and we'll quote it.")}
        </p>
      </section>

      <CasesSection
        locale={locale}
        eyebrow={tr("Dự án tiêu biểu", "Selected work")}
        title={tr("Sản phẩm thật, làm cho thương hiệu thật", "Real products for real brands")}
        cases={[
          {
            brand: "Kiehl's",
            image: imageOf("tui-canvas-cotton-phoi-coi"),
            product: tr("Túi canvas xanh rêu phối cói tự nhiên", "Moss-green canvas tote with natural straw panel"),
            challenge: tr(
              "Ghép hai chất liệu mà vẫn giữ đúng màu xanh thương hiệu",
              "Joining two materials while holding the exact brand green",
            ),
          },
          {
            brand: "AFLW",
            image: AFLW_TOTE,
            product: tr("Túi tote khổ lớn in full cho thành viên và sự kiện", "Large full-print tote for members and events"),
            challenge: tr(
              "In tràn nhiều màu rực rỡ, đồng đều trên cả lô hàng",
              "Vivid full-colour print, consistent across the whole run",
            ),
          },
          {
            brand: "Kérastase",
            image: imageOf("tui-xach-tay-canvas-phoi-pu-nau"),
            product: tr("Túi canvas quai giả da", "Canvas bag with faux-leather handles"),
            challenge: tr(
              "Hoàn thiện chuẩn salon với logo dập chìm tinh tế",
              "Salon-grade finish with a subtle debossed logo",
            ),
          },
        ]}
      />

      <AuProcurementSection
        locale={locale}
        Tbc={Tbc}
        last={{
          title: tr("Giảm túi nhựa", "Fewer plastic bags"),
          text: tr(
            "Túi canvas và cotton dùng lại được, hỗ trợ mục tiêu bền vững và ESG của bạn.",
            "Reusable canvas and cotton bags support your sustainability and ESG goals.",
          ),
        }}
      />

      <AuPriceSection
        locale={locale}
        Tbc={Tbc}
        title={tr("Giá bao nhiêu khi may theo thiết kế riêng?", "What does it cost, made to spec?")}
        lead={tr(
          "Giá xưởng tham khảo bằng AUD, chưa gồm vận chuyển và GST. Giá cuối phụ thuộc chất liệu, kích thước, số màu in và số lượng.",
          "Indicative factory prices in AUD, excluding freight and GST. Final price depends on fabric, size, print colours and quantity.",
        )}
        quantities={[tr("300 cái", "300 units"), tr("1.000 cái", "1,000 units"), tr("3.000 cái", "3,000 units")]}
        rows={[
          [tr("Túi canvas cotton, in 1 màu", "Cotton canvas tote, 1-colour print"), "A$4.50", "A$3.20", "A$2.60"],
          [
            tr("Túi canvas dày, có hông và túi trong", "Heavy canvas tote, gusset & inner pocket"),
            "A$7.90",
            "A$6.20",
            "A$5.40",
          ],
          [tr("Túi canvas phối PU hoặc cói", "Canvas with PU or straw trims"), "A$12.50", "A$10.00", "A$8.90"],
          [tr("Nón hoặc mũ bucket thêu logo", "Embroidered cap or bucket hat"), "A$6.50", "A$5.20", "A$4.60"],
          [tr("Áo polo cá sấu thêu logo", "Embroidered pique polo"), "A$14.00", "A$11.50", "A$10.20"],
          [tr("Pouch mỹ phẩm PU, logo dập chìm", "PU cosmetic pouch, debossed logo"), "A$5.90", "A$4.40", "A$3.80"],
        ]}
      />

      {/* Chất liệu & cách in */}
      <section id="materials" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro
            eyebrow={tr("Chọn đúng sản phẩm", "Choosing the right product")}
            title={tr("Chất liệu và cách trang trí", "Fabrics and decoration, explained")}
          />
          <AuTextTable
            head={[
              tr("Chất liệu", "Fabric"),
              tr("Cảm giác", "Feel"),
              tr("Độ bền", "Durability"),
              tr("Ngân sách", "Budget"),
              tr("Phù hợp cho", "Best for"),
            ]}
            cols="md:grid-cols-[1.3fr_1fr_1fr_0.6fr_1.4fr]"
            rows={[
              [
                tr("Calico / cotton mỏng", "Calico / light cotton"),
                tr("Mềm, tự nhiên", "Soft, natural"),
                tr("Dùng nhẹ hằng ngày", "Everyday light use"),
                tr("Thấp nhất", "Lowest"),
                tr("Sự kiện, hội nghị, bao bì bán lẻ", "Events, conferences, retail packaging"),
              ],
              [
                tr("Canvas cotton", "Cotton canvas"),
                tr("Dày, đứng form", "Thick, holds its shape"),
                tr("Dùng nhiều năm", "Years of use"),
                tr("Trung bình", "Mid"),
                tr("Quà thương hiệu, quà tặng kèm, thành viên", "Brand merch, gift-with-purchase, members"),
              ],
              [
                tr("Polyester / nylon", "Polyester / nylon"),
                tr("Nhẹ, chống thấm", "Light, water-resistant"),
                tr("Cao, gấp gọn", "High, packs small"),
                tr("Trung bình", "Mid"),
                tr("Balo, túi giữ nhiệt, du lịch", "Backpacks, cooler bags, travel"),
              ],
              [
                tr("Vải cá sấu cotton / poly (polo, áo thun)", "Pique cotton / poly (polos, tees)"),
                tr("Thoáng, lịch sự", "Breathable, smart-casual"),
                tr("Giữ màu qua nhiều lần giặt", "Holds colour wash after wash"),
                tr("Trung bình", "Mid"),
                tr("Đồng phục nhân viên, sự kiện, quà", "Staff uniforms, events, merch"),
              ],
              [
                tr("Kaki cotton (nón, mũ bucket)", "Cotton twill (caps, bucket hats)"),
                tr("Đứng form hoặc mềm", "Structured or soft crown"),
                tr("Cao", "High"),
                tr("Thấp – trung bình", "Low–mid"),
                tr("Quà tặng, nhân viên, bán lẻ", "Giveaways, staff, retail merch"),
              ],
              [
                tr("Canvas phối PU, cói, giả da", "Canvas + PU, straw, faux leather"),
                tr("Cao cấp, như hàng bán lẻ", "Premium, retail-ready"),
                tr("Cao", "High"),
                tr("Cao hơn", "Higher"),
                tr("Quà VIP, hàng bán lẻ cao cấp", "VIP gifts, retail-grade merch"),
              ],
            ]}
          />
          <div className="mt-8">
            <AuTextTable
              head={[tr("Cách trang trí", "Decoration"), tr("Phù hợp cho", "Best for"), tr("Hiệu quả", "Look")]}
              cols="md:grid-cols-[1fr_1.4fr_1.2fr]"
              rows={[
                [
                  tr("In lụa", "Screen print"),
                  tr("Logo 1–4 màu, đơn lớn", "1–4 colour logos, larger runs"),
                  tr("Đậm, sắc nét, giá tốt nhất", "Bold, crisp, best value"),
                ],
                [
                  tr("In chuyển nhiệt nhiều màu", "Full-colour heat transfer"),
                  tr("Ảnh, chuyển màu, in tràn", "Photos, gradients, all-over prints"),
                  tr("Rực rỡ, tràn viền", "Vivid, edge to edge"),
                ],
                [
                  tr("Thêu", "Embroidery"),
                  tr("Logo nhỏ trên canvas, nón", "Small logos on canvas, caps"),
                  tr("Cao cấp, bền nhất", "Premium, longest lasting"),
                ],
                [
                  tr("Dập chìm PU / nhãn dệt", "Debossed PU / woven label"),
                  tr("Thương hiệu làm đẹp, thời trang", "Beauty and fashion brands"),
                  tr("Tinh tế, như hàng bán lẻ", "Subtle, retail finish"),
                ],
              ]}
            />
          </div>
        </div>
      </section>

      {/* TODO: thêm 2–3 nhận xét thật của khách Úc (tên, chức vụ, công ty) khi có — không tự viết */}

      <AuQuoteSection
        locale={locale}
        Tbc={Tbc}
        brand={brand}
        nhom={`au-${variantKey}`}
        defaultProduct={variant.product}
      />

      <AuFaqSection locale={locale} brand={brand} faqs={faqs} />
    </>
  )
}
