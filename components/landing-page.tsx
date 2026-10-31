import type { Metadata } from "next"
import Image from "next/image"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { SHOWCASE, VARIANTS, landingPath, type VariantKey } from "@/lib/landing"
import { media } from "@/lib/utils"
import ClientMarquee from "@/components/client-marquee"
import LandingShowcase from "@/components/landing-showcase"
import LandingTracking from "@/components/landing-tracking"
import {
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
 * Thân trang landing chạy Google Ads — chỉ có bản tiếng Việt. Dùng chung cho
 * `/bao-gia?nhom=…` và các URL riêng theo nhóm (xem `path` trong lib/landing.ts).
 *
 * `review` bật khi mở `?review=1`: tô vàng các con số lấy từ thị trường để
 * Phan Nguyễn xác nhận trước khi chạy quảng cáo.
 */

export function landingMetadata(key: VariantKey): Metadata {
  const variant = VARIANTS[key]
  return {
    title: variant.metaTitle,
    description: variant.lead,
    robots: landingRobots,
    alternates: { canonical: landingPath(key) },
  }
}

export default function LandingPage({ variantKey, review }: { variantKey: VariantKey; review: boolean }) {
  const locale: Locale = "vi"
  const variant = VARIANTS[variantKey]
  const { brand, products } = content(locale)

  const imageOf = (slug: string) => media(products.find((p) => p.key === slug)?.images[0])
  const hero = variant.heroSlugs.map((slug) => ({
    src: imageOf(slug),
    alt: products.find((p) => p.key === slug)?.name ?? "",
  }))
  const showcase = SHOWCASE.map((item) => ({ ...item, image: imageOf(item.slug) }))
  const years = new Date().getFullYear() - brand.founded
  const Tbc = makeTbc(review)

  const facts = [
    { value: "Hợp đồng & VAT", label: "Đầy đủ hồ sơ cho doanh nghiệp" },
    {
      value: <Tbc note="Tham khảo: thị trường 50–100 sp/đơn">Từ 100 sản phẩm</Tbc>,
      label: "Giá tốt hơn khi số lượng lớn",
    },
    {
      value: <Tbc note="Tham khảo: thị trường 5–7 ngày sau chốt mẫu">7–15 ngày</Tbc>,
      label: "Sản xuất, tính từ khi duyệt mẫu",
    },
    {
      value: <Tbc note="Tham khảo: hầu hết đối thủ đều miễn phí thiết kế">Mockup miễn phí</Tbc>,
      label: "Xem logo trên sản phẩm trước",
    },
  ]

  const prices = [
    {
      name: "Túi vải canvas / vải bố cơ bản, in 1–2 màu",
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 25–40k">Từ 25.000đ</Tbc>,
      use: "Sự kiện, hội nghị, quà tặng kèm sản phẩm",
    },
    {
      name: "Túi canvas dày, có khóa kéo / túi con",
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 40–60k">Từ 40.000đ</Tbc>,
      use: "Quà tặng khách hàng, nhân viên",
    },
    {
      name: "Túi canvas cao cấp phối da, PU, cói",
      price: <Tbc note="Tham khảo: tuivaiinlogo.com 80–120k">Từ 80.000đ</Tbc>,
      use: "Quà VIP, quà tặng thương hiệu cao cấp",
    },
    {
      name: "Túi vải không dệt in logo",
      price: (
        <Tbc note="Cần Phan Nguyễn cung cấp giá và số lượng tối thiểu cho túi không dệt">
          Báo giá theo số lượng
        </Tbc>
      ),
      use: "Sự kiện, hội chợ, siêu thị, khuyến mãi số lượng lớn",
    },
    { name: "Balo, túi xách, túi đeo chéo in logo", price: "Báo giá theo mẫu", use: "Quà nhân viên, onboarding, đại lý" },
    { name: "Áo đồng phục, nón in / thêu logo", price: "Báo giá theo mẫu", use: "Đồng phục, team building, sự kiện" },
  ]

  const cases = [
    {
      brand: "Kiehl's",
      slug: "tui-canvas-cotton-phoi-coi",
      product: "Túi canvas xanh rêu phối cói tự nhiên",
      challenge: "Phối hai chất liệu canvas và cói, giữ đúng màu nhận diện thương hiệu",
    },
    {
      brand: "Vichy",
      slug: "tui-bo-in-lua-xach-tay",
      product: "Túi vải bố xách tay, in lụa logo trên thân và quai",
      challenge: "In logo chạy dọc quai túi, sắc nét và đều màu trên cả lô",
    },
    {
      brand: "Kérastase",
      slug: "tui-xach-tay-canvas-phoi-pu-nau",
      product: "Túi canvas phối quai da PU, logo tinh tế",
      challenge: "Hoàn thiện cao cấp, đúng tinh thần thương hiệu salon chuyên nghiệp",
    },
  ]

  const reasons = [
    {
      title: "Xưởng sản xuất trực tiếp",
      text: "Không qua trung gian – giá xưởng, kiểm soát chất lượng từ khâu cắt may đến đóng gói.",
    },
    {
      title: "Hợp đồng & hóa đơn VAT",
      text: "Ký hợp đồng rõ ràng về quy cách, tiến độ, thanh toán. Xuất hóa đơn VAT đầy đủ cho doanh nghiệp.",
    },
    {
      title: "Duyệt mẫu thật trước khi sản xuất",
      text: (
        <>
          <Tbc note="Tham khảo: đối thủ ghi 'thiết kế miễn phí'">Thiết kế mockup miễn phí</Tbc>, sau đó may
          mẫu thử để bạn cầm, kiểm tra và chốt trước khi chạy hàng loạt.
        </>
      ),
    },
    {
      title: "Đạt chuẩn nhà cung cấp tập đoàn",
      text: "Sản xuất cho các thương hiệu thuộc L'Oréal và doanh nghiệp đa quốc gia – quen quy trình thẩm định, hồ sơ và tiến độ khắt khe.",
    },
    {
      title: "Làm theo mẫu hoặc thiết kế riêng",
      text: "Gửi hình mẫu, sản phẩm thật hoặc bộ nhận diện – xưởng tư vấn chất liệu, kiểu in phù hợp ngân sách.",
    },
    {
      title: "Giao toàn quốc & quốc tế",
      text: "Đóng gói theo yêu cầu, giao tận văn phòng, kho hoặc địa điểm sự kiện trên toàn quốc và xuất khẩu.",
    },
    {
      title: "Bảo hành lỗi sản xuất",
      text: (
        <>
          <Tbc note="Tham khảo: tuivaiinlogo.com bảo hành 1 đổi 1; Trung Thành đổi trả 7 ngày">
            Đổi mới 1:1 sản phẩm lỗi may, lỗi in hoặc lỗi vải
          </Tbc>{" "}
          – cam kết ghi rõ trong hợp đồng.
        </>
      ),
    },
    {
      title: "Đến xưởng xem mẫu",
      text: (
        <>
          Ghé xưởng tại{" "}
          <Tbc note="Kiểm tra tên phường mới sau sáp nhập 2025">{brand.address}</Tbc> để xem chất liệu và mẫu
          thật trước khi đặt.
        </>
      ),
    },
  ]

  const steps = [
    { title: "Gửi yêu cầu", text: "Điền form hoặc nhắn Zalo: sản phẩm, số lượng, logo, ngày cần hàng." },
    { title: "Tư vấn & mockup", text: "Đề xuất chất liệu, cách in và gửi mockup logo trên sản phẩm." },
    { title: "Báo giá & hợp đồng", text: "Báo giá chi tiết, ký hợp đồng về quy cách và tiến độ." },
    { title: "Làm mẫu & duyệt", text: "May mẫu thử để bạn kiểm tra và chốt." },
    { title: "Sản xuất & kiểm hàng", text: "Sản xuất hàng loạt, kiểm tra chất lượng từng lô." },
    { title: "Giao hàng & hóa đơn", text: "Giao đúng hẹn, xuất hóa đơn VAT đầy đủ." },
  ]

  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: "Số lượng tối thiểu cho mỗi đơn là bao nhiêu?",
      a: (
        <>
          <Tbc>Từ 100 sản phẩm cho mỗi mẫu</Tbc>. Số lượng càng lớn, đơn giá càng tốt vì chi phí làm rập, khuôn
          in và set-up chuyền được chia đều. Đơn ít hơn vui lòng liên hệ để được tư vấn.
        </>
      ),
    },
    {
      q: "Thời gian sản xuất mất bao lâu?",
      a: (
        <>
          Thông thường <Tbc>7–15 ngày làm việc</Tbc> tính từ khi duyệt mẫu, tùy số lượng và độ phức tạp. Thời
          gian cụ thể được ghi trong hợp đồng. Nếu cần gấp cho sự kiện, hãy ghi ngày cần hàng để xưởng xếp lịch
          ưu tiên.
        </>
      ),
    },
    {
      q: "Có ký hợp đồng và xuất hóa đơn VAT không?",
      a: "Có. Mỗi đơn hàng đều có hợp đồng quy định rõ quy cách, tiến độ, thanh toán và được xuất hóa đơn VAT đầy đủ.",
    },
    {
      q: "Tôi có được xem mẫu trước khi sản xuất không?",
      a: (
        <>
          Có. Xưởng gửi <Tbc>mockup miễn phí</Tbc> để bạn xem logo trên sản phẩm, sau đó may mẫu thử để bạn
          duyệt trước khi sản xuất hàng loạt.
        </>
      ),
    },
    {
      q: "Tôi có thể đặt theo mẫu có sẵn của mình không?",
      a: "Có. Gửi hình mẫu, sản phẩm thật hoặc file thiết kế – xưởng sẽ làm đúng theo yêu cầu.",
    },
    {
      q: "Nếu hàng bị lỗi thì xử lý thế nào?",
      a: (
        <>
          <Tbc>Phan Nguyễn đổi mới 1:1 mọi sản phẩm lỗi may, lỗi in hoặc lỗi vải</Tbc>. Điều khoản bảo hành
          được ghi trong hợp đồng.
        </>
      ),
    },
    {
      q: "Có giao hàng tỉnh và nước ngoài không?",
      a: "Có. Phan Nguyễn giao hàng toàn quốc và nhận đơn xuất khẩu quốc tế.",
    },
    {
      q: "Xưởng có làm túi vải không dệt không?",
      a: (
        <>
          Có. Phan Nguyễn sản xuất túi vải không dệt in logo theo yêu cầu: chọn định lượng vải, màu vải, kiểu
          quai và kích thước. Phù hợp cho sự kiện, hội chợ và chương trình khuyến mãi cần số lượng lớn, giá tốt.{" "}
          <Tbc note="Cần xác nhận: may hay ép nhiệt, số lượng tối thiểu">Nhận cả túi may và túi ép nhiệt</Tbc>.
        </>
      ),
    },
    {
      q: "In logo bằng phương pháp nào?",
      a: "In lụa, in chuyển nhiệt, thêu vi tính, ép hoặc dập logo – xưởng tư vấn cách phù hợp nhất với chất liệu, số màu của logo và ngân sách.",
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        top={review && <ReviewBanner />}
        eyebrow={`Xưởng sản xuất trực tiếp · Từ ${brand.founded}`}
        title={variant.title}
        lead={variant.lead}
        cta="Nhận báo giá miễn phí"
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
              { n: `Từ ${brand.founded}`, l: `${years} năm sản xuất túi & quà tặng in logo` },
              { n: `${products.length}+`, l: "Mẫu sản phẩm đã sản xuất" },
              { n: "VAT", l: "Hợp đồng, hóa đơn đầy đủ cho mọi đơn hàng" },
              { n: "WBE", l: "Doanh nghiệp nữ làm chủ – chứng nhận WEConnect International" },
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
        title="Giá bao nhiêu cho một chiếc túi in logo?"
        lead="Mức giá dưới đây giúp bạn ước lượng ngân sách. Giá thực tế phụ thuộc chất liệu, kích thước, số màu in và số lượng – gửi yêu cầu để nhận báo giá chính xác."
        cta="Nhận báo giá chính xác"
        rows={prices}
      />

      {/* Sản phẩm */}
      <section id="san-pham" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro
            eyebrow="Sản phẩm"
            title="Một xưởng, đủ mọi món quà mang logo của bạn"
            lead="Một số đơn hàng thực tế đã sản xuất. Chất liệu, kích thước, màu sắc và cách in đều làm theo yêu cầu."
            className="mb-10 max-w-2xl"
          />

          <LandingShowcase items={showcase} />

          <p className="mt-10 text-[15px] text-ink-soft">
            Không thấy mẫu bạn cần? Gửi hình tham khảo hoặc logo qua{" "}
            <a
              href={brand.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              data-track="click_zalo"
              className="font-semibold text-navy-500 underline underline-offset-4 hover:text-brand-red"
            >
              Zalo
            </a>{" "}
            – xưởng sẽ làm mẫu theo đúng ý bạn.
          </p>
        </div>
      </section>

      {/* Dự án tiêu biểu */}
      <section id="du-an" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow="Dự án tiêu biểu"
          title="Sản phẩm thật, làm cho thương hiệu thật"
          lead="Các thương hiệu toàn cầu chọn Phan Nguyễn vì chất lượng đồng đều trên cả lô hàng và đúng chuẩn nhận diện thương hiệu."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.brand} className="flex flex-col border border-line">
              <div className="relative aspect-[4/3] overflow-hidden bg-shell">
                <Image
                  src={imageOf(c.slug)}
                  alt={`${c.product} – ${c.brand}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6 lg:p-7">
                <h3 className="font-display text-2xl font-bold text-navy-500">{c.brand}</h3>
                <div className="mt-3 h-px w-8 bg-brand-gold" />
                <dl className="mt-5 flex flex-col gap-4 text-sm leading-relaxed">
                  <div>
                    <dt className="eyebrow text-ink-soft/70">Sản phẩm</dt>
                    <dd className="mt-1.5 text-ink">{c.product}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-soft/70">Điểm khó</dt>
                    <dd className="mt-1.5 text-ink-soft">{c.challenge}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ReasonsSection
        eyebrow="Vì sao chọn Phan Nguyễn"
        title="Làm việc trực tiếp với xưởng, đầy đủ hồ sơ doanh nghiệp"
        reasons={reasons}
      />

      {/* Quy trình */}
      <section id="quy-trinh" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro eyebrow="Quy trình đặt hàng" title="6 bước rõ ràng, có hợp đồng" className="mb-14 max-w-2xl" />

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
        title={
          <>
            Gửi yêu cầu – nhận báo giá{" "}
            <Tbc note="Cần xác nhận cam kết thời gian phản hồi">trong 24 giờ làm việc</Tbc>
          </>
        }
        lead="Càng nhiều thông tin (số lượng, ngân sách, logo, ngày cần hàng), báo giá càng chính xác."
        Tbc={Tbc}
        brand={brand}
        form={{ nhom: variantKey, defaultProduct: variant.product }}
      />

      <FaqSection eyebrow="Câu hỏi thường gặp" title="Trước khi đặt hàng" faqs={faqs} brand={brand} />
    </>
  )
}
