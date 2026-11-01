import type { Metadata } from "next"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { AU_COSMETIC_PATH, AU_COSMETIC_SHOWCASE, whatsappUrl } from "@/lib/au-landing"
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

/**
 * Landing Google Ads Úc — nhóm "Cosmetic Bags" (`/en/au/custom-cosmetic-bags`,
 * bản tiếng Việt `/au/tui-my-pham-in-logo`). Toàn bộ ảnh là sản phẩm thật làm
 * cho thương hiệu làm đẹp (public/media/au).
 */

export function auCosmeticMetadata(locale: Locale): Metadata {
  const vi = locale === "vi"
  return {
    title: vi
      ? "Túi mỹ phẩm, pouch in logo cho thương hiệu làm đẹp"
      : "Custom Cosmetic Bags & Makeup Pouches for Beauty Brands",
    description: vi
      ? "Túi mỹ phẩm, pouch trang điểm, hộp vanity và pouch quà tặng kèm làm cho các thương hiệu làm đẹp – Kiehl's, Lancôme, La Roche-Posay, Paula's Choice, Kérastase. Giá xưởng, giao tới Úc."
      : "Custom cosmetic bags, makeup pouches, vanity cases and gift-with-purchase pouches made for beauty brands – Kiehl's, Lancôme, La Roche-Posay, Paula's Choice and Kérastase. Factory-direct for Australia.",
    robots: landingRobots,
    alternates: {
      canonical: AU_COSMETIC_PATH[locale],
      languages: { "en-AU": AU_COSMETIC_PATH.en, vi: AU_COSMETIC_PATH.vi, "x-default": AU_COSMETIC_PATH.en },
    },
  }
}

export default function AuCosmeticPage({ locale, review }: { locale: Locale; review: boolean }) {
  const { brand } = content(locale)
  const Tbc = makeTbc(review)
  const wa = whatsappUrl(brand.zaloPhone)
  const tr = (vi: string, en: string) => (locale === "vi" ? vi : en)

  const showcase = AU_COSMETIC_SHOWCASE.map((item) => ({
    slug: item.image,
    image: item.image,
    tag: item.tag[locale],
    name: item.name[locale],
    note: item.note[locale],
    product: "auCosmetic" as const,
  }))

  const facts = [
    {
      value: tr("Kinh nghiệm ngành làm đẹp", "Beauty-brand experience"),
      label: tr("Các thương hiệu L'Oréal và chăm sóc da hàng đầu", "L'Oréal group and leading skincare brands"),
    },
    {
      value: tr("Mockup miễn phí", "Free digital mockup"),
      label: tr("Xem logo trên pouch trước", "See your logo on the pouch first"),
    },
    {
      value: tr("Duyệt mẫu thật trước", "Physical sample first"),
      label: tr("Duyệt màu và hoàn thiện trước khi sản xuất", "Approve colour and finish before bulk"),
    },
    {
      value: <Tbc note="Confirm export MOQ for cosmetic pouches">{tr("Từ 500 sản phẩm", "From 500 units")}</Tbc>,
      label: tr("Mỗi mẫu, phù hợp đơn quà tặng kèm", "Per design, ideal for GWP runs"),
    },
  ]

  const sizes = [
    { size: "18 × 12", text: tr("Pouch mini cho hàng mẫu và son.", "Mini pouch for samples and lip products.") },
    { size: "22 × 14 × 6", text: tr("Túi trang điểm tiêu chuẩn.", "Standard makeup bag.") },
    { size: "25 × 18 × 10", text: tr("Túi đựng đồ cá nhân, du lịch.", "Toiletry and travel bag.") },
    {
      size: tr("Theo bộ sản phẩm", "Your kit"),
      text: tr("Gửi sản phẩm của bạn – chúng tôi làm túi vừa khít.", "Send your products – we size the pouch to fit."),
    },
  ]

  const faqs = [
    {
      q: tr("Số lượng tối thiểu là bao nhiêu?", "What is the minimum order?"),
      a: (
        <>
          <Tbc>{tr("500 pouch mỗi mẫu", "500 pouches per design")}</Tbc>
          {tr(
            ". Đơn quà tặng kèm từ 2.000 cái có đơn giá tốt nhất.",
            ". Gift-with-purchase runs of 2,000+ get the best unit price.",
          )}
        </>
      ),
    },
    {
      q: tr("Có làm đúng màu thương hiệu không?", "Can you match our brand colour exactly?"),
      a: tr(
        "Có. Gửi mã Pantone, chúng tôi pha màu chất liệu và màu in cho khớp, rồi xác nhận trên mẫu thật trước khi sản xuất hàng loạt.",
        "Yes. Send your Pantone references. We match the material and print, then confirm on a physical sample before bulk production.",
      ),
    },
    {
      q: tr("Có đóng gói cho quà tặng kèm (GWP) không?", "Can you pack for gift-with-purchase?"),
      a: tr(
        "Có. Mỗi pouch được bỏ bao riêng, dán mã vạch do bạn cung cấp, rồi đóng thùng theo quy cách kho của bạn.",
        "Yes. Each pouch is individually bagged and labelled with the barcodes you supply, then carton-packed to your warehouse spec.",
      ),
    },
    {
      q: tr("Có báo cáo kiểm nghiệm chất liệu không?", "Do you provide material test reports?"),
      a: (
        <Tbc>
          {tr(
            "Có báo cáo kiểm nghiệm chất liệu (ví dụ kim loại nặng, thuốc nhuộm azo) khi bạn yêu cầu.",
            "Material test reports (for example for heavy metals and azo dyes) are available on request.",
          )}
        </Tbc>
      ),
    },
    {
      q: tr("Bao lâu thì hàng tới Úc?", "How long until my order arrives in Australia?"),
      a: (
        <>
          {tr("Dự trù khoảng ", "Plan on ")}
          <Tbc>{tr("5–8 tuần", "5–8 weeks")}</Tbc>
          {tr(
            " từ lúc gửi yêu cầu tới khi nhận hàng: làm mẫu, sản xuất rồi vận chuyển. Hàng không hợp với đơn gấp, đường biển hợp với đơn lớn. Bạn nhận lịch có ngày cụ thể kèm báo giá.",
            " from brief to delivery: sample, bulk production, then freight. Air freight suits urgent orders, sea freight suits large runs. You get a dated schedule with your quote.",
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
            ". Your freight forwarder or customs broker confirms the details for your shipment.",
          )}
        </>
      ),
    },
    {
      q: tr("Thanh toán thế nào?", "How do payments work?"),
      a: (
        <>
          <Tbc>
            {tr(
              "Đặt cọc để bắt đầu sản xuất và thanh toán phần còn lại trước khi giao",
              "A deposit to start production and the balance before shipping",
            )}
          </Tbc>
          {tr(", chuyển khoản quốc tế. Giá báo bằng AUD.", ", by international bank transfer. Quotes are in AUD.")}
        </>
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
          `Túi mỹ phẩm · Cho thương hiệu làm đẹp · Từ ${brand.founded}`,
          `Cosmetic bags · For beauty brands · Since ${brand.founded}`,
        )}
        title={
          locale === "vi"
            ? ["", "Túi mỹ phẩm & pouch", " cho thương hiệu làm đẹp"]
            : ["Custom ", "cosmetic bags & pouches", " for beauty brands"]
        }
        lead={tr(
          "Pouch quà tặng kèm, túi trang điểm và hộp vanity may theo tiêu chuẩn thương hiệu – cùng xưởng được Kiehl's, Lancôme, La Roche-Posay, Paula's Choice và Kérastase tin dùng.",
          "Gift-with-purchase pouches, makeup bags and vanity cases built to your brand standards – the same factory trusted by Kiehl's, Lancôme, La Roche-Posay, Paula's Choice and Kérastase.",
        )}
        cta={tr("Nhận báo giá trong 24 giờ", "Get a quote in 24 hours")}
        facts={facts}
        images={[
          // Ảnh lớn khung đứng → dùng hộp vanity dáng đứng để không bị cắt
          { src: "/media/au/cos-kiehls-vanity.webp", alt: "Kiehl's red structured vanity case" },
          { src: "/media/au/cos-lancome-round.webp", alt: "Lancôme round glossy pouch" },
          { src: "/media/au/cos-paulas-choice.webp", alt: "Paula's Choice faux leather cosmetic bag" },
        ]}
        secondary={auSecondaryCta(brand, locale)}
      />

      <ClientMarquee locale={locale} />

      <AuVersusSection
        locale={locale}
        title={tr("Vì sao nên đặt trực tiếp từ xưởng, không qua catalogue", "Why order from the factory, not a catalogue")}
        lead={tr(
          "Phần lớn nhà cung cấp hàng khuyến mãi ở Úc trang trí lên hàng có sẵn. Cách đó hợp với đơn nhỏ, gấp. Khi sản phẩm mang thương hiệu của bạn, sản phẩm may theo thiết kế riêng đẹp hơn, bền hơn và thường rẻ hơn mỗi chiếc khi số lượng lớn.",
          "Most Australian promo suppliers decorate stock items. That works for small, urgent runs. When the product carries your brand, one built to your spec looks better, lasts longer and usually costs less per unit at volume.",
        )}
        rows={[
          [
            tr("Thiết kế pouch", "Pouch design"),
            tr("Dáng pouch có sẵn", "Stock pouch shapes"),
            tr("Dáng, kích thước, lót, khoá kéo và đầu kéo theo ý bạn", "Your shape, size, lining, zip and puller"),
          ],
          [
            tr("Chất liệu", "Material"),
            tr("Ít màu có sẵn", "Limited stock colours"),
            tr("PU, canvas, nylon, lưới, PVC trong, hologram", "PU, canvas, nylon, mesh, clear PVC, holographic"),
          ],
          [
            tr("Màu thương hiệu", "Brand colour"),
            tr("Màu có sẵn gần nhất", "Nearest stock colour"),
            tr("Khớp mã Pantone thương hiệu", "Matched to your brand Pantone"),
          ],
          [
            tr("Hoàn thiện", "Finish"),
            tr("Chỉ in logo", "Printed logo only"),
            tr(
              "Dập chìm, ép nhũ, thêu, đầu kéo có logo, nhãn dệt",
              "Deboss, foil, embroidery, logo zip pullers, woven labels",
            ),
          ],
          [
            tr("Sẵn sàng bán lẻ", "Retail readiness"),
            tr("Đóng thùng chung", "Bulk packed"),
            tr("Bỏ bao từng chiếc, sẵn sàng đóng bộ quà tặng kèm", "Individually bagged, ready for GWP packing"),
          ],
        ]}
      />

      {/* Sản phẩm */}
      <section id="san-pham" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow={tr("Đơn hàng thực tế từ xưởng", "Real orders from our factory")}
          title={tr("Pouch, túi trang điểm và hộp vanity", "Pouches, makeup bags and vanity cases")}
          lead={tr(
            "Mẫu nào cũng đổi được kích thước, màu sắc và phụ kiện theo yêu cầu của bạn.",
            "Every style can be resized, re-coloured and re-trimmed to your brief.",
          )}
          className="mb-10 max-w-2xl"
        />
        <LandingShowcase locale={locale} items={showcase} tabs={false} />
        <p className="mt-10 text-[15px] text-ink-soft">
          {tr("Chưa thấy mẫu bạn cần? Gửi hình tham khảo qua", "Don't see your style? Send a reference photo on")}{" "}
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
        title={tr("Làm cho những thương hiệu bạn biết", "Made for brands you know")}
        cases={[
          {
            brand: "Lancôme",
            image: "/media/au/cos-lancome-round.webp",
            product: tr(
              "Pouch PU tròn bóng cho chiến dịch nước hoa",
              "Glossy round PU pouch for a fragrance campaign",
            ),
            challenge: tr(
              "Khoá kéo tròn hoàn hảo, bề mặt bóng không nhăn",
              "A perfect circle zip and high-gloss finish with no wrinkles",
            ),
          },
          {
            brand: "Paula's Choice",
            image: "/media/au/cos-paulas-choice.webp",
            product: tr("Túi mỹ phẩm giả da logo ép nhũ", "Faux-leather cosmetic bag with foil logo"),
            challenge: tr(
              "Màu đậm đúng chuẩn và logo nhũ vàng sắc nét trên PU mềm",
              "Rich colour match and a crisp gold foil logo on soft PU",
            ),
          },
          {
            brand: "Kiehl's",
            image: "/media/au/cos-kiehls-vanity.webp",
            product: tr("Hộp vanity đứng form có quai treo", "Structured vanity case with hanging handle"),
            challenge: tr(
              "Giữ form và đúng màu đỏ Kiehl's trên cả lô hàng",
              "Holding shape and the exact Kiehl's red across the run",
            ),
          },
        ]}
      />

      <AuProcurementSection
        locale={locale}
        Tbc={Tbc}
        last={{
          title: tr("Bao bì dùng lại được", "Reusable packaging"),
          text: tr(
            "Khách giữ lại pouch dùng tiếp, thay cho bao bì quà tặng dùng một lần.",
            "A pouch customers keep replaces single-use gift packaging.",
          ),
        }}
      />

      <AuPriceSection
        locale={locale}
        Tbc={Tbc}
        title={tr("Một chiếc pouch mỹ phẩm may riêng giá bao nhiêu?", "What does a custom cosmetic pouch cost?")}
        lead={tr(
          "Giá xưởng tham khảo bằng AUD, chưa gồm vận chuyển và GST. Giá cuối phụ thuộc chất liệu, kích thước, cách trang trí và số lượng.",
          "Indicative factory prices in AUD, excluding freight and GST. Final price depends on materials, size, decoration and quantity.",
        )}
        quantities={[tr("500 cái", "500 units"), tr("2.000 cái", "2,000 units"), tr("5.000 cái", "5,000 units")]}
        rows={[
          [tr("Pouch canvas, in 1 màu", "Canvas pouch, 1-colour print"), "A$3.20", "A$2.40", "A$2.00"],
          [tr("Pouch PU, logo dập chìm hoặc ép nhũ", "PU pouch, debossed or foil logo"), "A$5.90", "A$4.40", "A$3.80"],
          [tr("Pouch du lịch PVC trong", "Clear PVC travel pouch"), "A$3.90", "A$2.90", "A$2.40"],
          [tr("Hộp vanity đứng form", "Structured vanity case"), "A$12.50", "A$9.80", "A$8.60"],
        ]}
      />

      {/* Chất liệu, hoàn thiện, kích thước */}
      <section id="materials" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro
            eyebrow={tr("Chọn đúng quy cách", "Choosing the right spec")}
            title={tr("Chất liệu và hoàn thiện cho bao bì làm đẹp", "Materials and finishes for beauty packaging")}
          />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <AuTextTable
              head={[tr("Chất liệu", "Material"), tr("Vẻ ngoài", "Look"), tr("Phù hợp cho", "Best for")]}
              cols="md:grid-cols-[1fr_1fr_1.2fr]"
              rows={[
                [
                  tr("PU mờ hoặc bóng", "Matte or glossy PU"),
                  tr("Cao cấp, lau sạch dễ", "Premium, wipe-clean"),
                  tr("Quà tặng kèm nước hoa, chăm sóc da", "Fragrance and skincare GWP"),
                ],
                [
                  tr("Canvas cotton", "Cotton canvas"),
                  tr("Tự nhiên, in đẹp", "Natural, printable"),
                  tr("Thương hiệu xanh, túi trang điểm hằng ngày", "Eco-led brands, everyday makeup bags"),
                ],
                [
                  tr("Nylon / polyester", "Nylon / polyester"),
                  tr("Nhẹ, chống thấm", "Light, water-resistant"),
                  tr("Túi du lịch, đồ cá nhân", "Travel and toiletry bags"),
                ],
                [
                  tr("PVC hoặc TPU trong", "Clear PVC or TPU"),
                  tr("Trong suốt, tiện đi máy bay", "See-through, airport-friendly"),
                  tr("Bộ du lịch, sản phẩm mini", "Travel kits and minis"),
                ],
                [
                  tr("Vải lưới", "Mesh"),
                  tr("Thoáng, trẻ trung", "Breathable, playful"),
                  tr("Bộ tắm, bộ mặt nạ", "Bath and sheet-mask kits"),
                ],
                [
                  tr("TPU hologram", "Holographic TPU"),
                  tr("Bắt mắt", "Eye-catching"),
                  tr("Chiến dịch theo mùa, Gen Z", "Seasonal and Gen-Z campaigns"),
                ],
              ]}
            />
            <AuTextTable
              head={[tr("Hoàn thiện", "Finish"), tr("Vẻ ngoài", "Look")]}
              cols="md:grid-cols-[1fr_1.2fr]"
              rows={[
                [tr("Dập chìm / dập nổi", "Deboss / emboss"), tr("Logo tinh tế, có độ nổi", "Subtle, tactile logo")],
                [tr("Ép nhũ nóng", "Foil hot-stamp"), tr("Nhũ vàng, bạc hoặc vàng hồng", "Metallic gold, silver or rose gold")],
                [tr("In lụa", "Screen print"), tr("Logo, hoạ tiết màu sắc nét", "Crisp colour logos and patterns")],
                [tr("Thêu", "Embroidery"), tr("Cao cấp trên canvas và nylon", "Premium on canvas and nylon")],
                [tr("Đầu kéo khoá có logo", "Logo zip puller"), tr("Đầu kéo kim loại hoặc cao su", "Branded metal or rubber puller")],
                [tr("Nhãn dệt hoặc nhãn in", "Woven or printed label"), tr("Chi tiết như hàng bán lẻ", "Retail-style detailing")],
              ]}
            />
          </div>

          <h3 className="mt-16 font-display text-2xl font-bold text-navy-500">{tr("Kích thước", "Sizes")}</h3>
          <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((s) => (
              <li key={s.size} className="bg-white p-7">
                <p className="font-display text-2xl font-bold text-navy-500">{s.size}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">
            {tr("Kích thước tính bằng cm (rộng × cao × sâu).", "Sizes in cm (width × height × depth).")}
          </p>
        </div>
      </section>

      {/* TODO: thêm 2–3 nhận xét thật của khách Úc (tên, chức vụ, công ty) khi có — không tự viết */}

      <AuQuoteSection
        locale={locale}
        Tbc={Tbc}
        brand={brand}
        nhom="au-cosmetic"
        defaultProduct="auCosmetic"
        title={tr("Cho chúng tôi biết về chiếc pouch của bạn", "Tell us about your pouch")}
      />

      <AuFaqSection locale={locale} brand={brand} faqs={faqs} />
    </>
  )
}
