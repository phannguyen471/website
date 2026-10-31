import type { Metadata } from "next"
import Image from "next/image"
import { content } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import { SHOWCASE, VARIANTS, landingPath, type VariantKey } from "@/lib/landing"
import { ALLOW_INDEXING, robotsMeta } from "@/lib/seo"
import { media } from "@/lib/utils"
import ClientMarquee from "@/components/client-marquee"
import LandingShowcase from "@/components/landing-showcase"
import LandingTracking from "@/components/landing-tracking"
import LeadForm from "@/components/lead-form"
import { IconZalo } from "@/components/brand-icons"
import {
  IconArrowRight,
  IconCheck,
  IconChat,
  IconPhone,
  IconPlus,
} from "@/components/icons"

/**
 * Thân trang landing chạy Google Ads — chỉ có bản tiếng Việt. Dùng chung cho
 * `/bao-gia?nhom=…` và các URL riêng theo nhóm (xem `path` trong lib/landing.ts).
 *
 * `review` bật khi mở `?review=1`: tô vàng các con số lấy từ thị trường để
 * Phan Nguyễn xác nhận trước khi chạy quảng cáo.
 */

/** Metadata chung: landing trùng nội dung site chính → không bao giờ index, kể cả khi ALLOW_INDEXING bật */
export function landingMetadata(key: VariantKey): Metadata {
  const variant = VARIANTS[key]
  return {
    title: variant.metaTitle,
    description: variant.lead,
    robots: ALLOW_INDEXING ? { index: false, follow: true } : robotsMeta,
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
  const tel = `tel:${brand.hotline.replace(/\s/g, "")}`

  /** Thông tin cần khách xác nhận: chỉ tô vàng khi mở `?review=1` */
  const Tbc = ({ children, note }: { children: React.ReactNode; note?: string }) =>
    review ? (
      <mark title={note} className="cursor-help rounded-[2px] bg-brand-gold px-1 text-navy-900">
        {children}
      </mark>
    ) : (
      <>{children}</>
    )

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

  const ctaPrimary =
    "group inline-flex items-center gap-2.5 rounded-[2px] bg-brand-red px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark"

  return (
    <>
      <LandingTracking />

      {/* ═══════════════════════════════════════════════════════════
          HERO — tiêu đề khớp nhóm quảng cáo + ảnh sản phẩm thật
          ═══════════════════════════════════════════════════════════ */}
      <section className="pt-[68px] md:pt-[108px]">
        {review && (
          <p className="bg-brand-gold px-6 py-3 text-center text-[13px] leading-relaxed text-navy-900">
            <b>Chế độ duyệt:</b> phần tô vàng là số liệu tham khảo từ thị trường – cần Phan Nguyễn xác nhận hoặc
            sửa trước khi chạy quảng cáo. Rê chuột lên để xem nguồn.
          </p>
        )}
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:py-20 xl:px-20">
            <p className="eyebrow text-brand-red">Xưởng sản xuất trực tiếp · Từ {brand.founded}</p>

            <h1 className="mt-6 font-display text-[2.5rem] leading-[1.08] font-bold text-navy-500 md:text-[3.25rem] xl:text-6xl">
              {variant.title[0]}
              <span className="text-brand-red">{variant.title[1]}</span>
              {variant.title[2]}
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-ink-soft md:text-base">
              {variant.lead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#bao-gia" data-track="click_quote_cta" className={ctaPrimary}>
                Nhận báo giá miễn phí
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={brand.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                data-track="click_zalo"
                className="inline-flex items-center gap-2.5 rounded-[2px] border border-navy-500 py-3 pr-7 pl-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
              >
                <IconZalo size={26} />
                Gửi logo qua Zalo
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
            {hero.map((img, i) => (
              <div key={i} className={`relative overflow-hidden bg-shell ${i === 0 ? "row-span-2" : ""}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientMarquee locale={locale} />

      {/* ═══════════════════════════════════════════════════════════
          SỐ LIỆU
          ═══════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════
          BẢNG GIÁ THAM KHẢO
          ═══════════════════════════════════════════════════════════ */}
      <section id="bang-gia" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">Bảng giá tham khảo</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
              Giá bao nhiêu cho một chiếc túi in logo?
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
              Mức giá dưới đây giúp bạn ước lượng ngân sách. Giá thực tế phụ thuộc chất liệu, kích thước, số màu
              in và số lượng – gửi yêu cầu để nhận báo giá chính xác.
            </p>
            <a href="#bao-gia" data-track="click_quote_cta" className={`${ctaPrimary} mt-8`}>
              Nhận báo giá chính xác
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div>
            <div className="hidden grid-cols-[1.5fr_1fr_1.4fr] gap-6 bg-navy-500 px-6 py-4 md:grid">
              {["Sản phẩm", "Giá tham khảo / cái", "Phù hợp cho"].map((h) => (
                <span key={h} className="eyebrow text-white/80">
                  {h}
                </span>
              ))}
            </div>
            <ul className="border-x border-b border-line max-md:border-t">
              {prices.map((row) => (
                <li
                  key={row.name}
                  className="grid gap-1.5 border-b border-line px-5 py-5 last:border-b-0 md:grid-cols-[1.5fr_1fr_1.4fr] md:items-center md:gap-6 md:px-6"
                >
                  <span className="text-[15px] font-medium text-ink">{row.name}</span>
                  <span className="font-display text-lg font-bold text-brand-red">{row.price}</span>
                  <span className="text-[13px] leading-relaxed text-ink-soft">{row.use}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-soft">Giá chưa bao gồm VAT. Đơn số lượng lớn có giá tốt hơn.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SẢN PHẨM
          ═══════════════════════════════════════════════════════════ */}
      <section id="san-pham" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow text-brand-red">Sản phẩm</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
              Một xưởng, đủ mọi món quà mang logo của bạn
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
              Một số đơn hàng thực tế đã sản xuất. Chất liệu, kích thước, màu sắc và cách in đều làm theo yêu cầu.
            </p>
          </div>

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

      {/* ═══════════════════════════════════════════════════════════
          DỰ ÁN TIÊU BIỂU
          ═══════════════════════════════════════════════════════════ */}
      <section id="du-an" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-brand-red">Dự án tiêu biểu</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
            Sản phẩm thật, làm cho thương hiệu thật
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
            Các thương hiệu toàn cầu chọn Phan Nguyễn vì chất lượng đồng đều trên cả lô hàng và đúng chuẩn nhận
            diện thương hiệu.
          </p>
        </div>

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

      {/* ═══════════════════════════════════════════════════════════
          VÌ SAO CHỌN PHAN NGUYỄN
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-navy-500 py-20 text-white lg:py-28">
        <div className="container-brand">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow text-brand-gold">Vì sao chọn Phan Nguyễn</p>
            <h2 className="mt-5 font-display text-3xl leading-tight font-bold md:text-4xl lg:text-[2.75rem]">
              Làm việc trực tiếp với xưởng, đầy đủ hồ sơ doanh nghiệp
            </h2>
          </div>

          <div className="grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ═══════════════════════════════════════════════════════════
          QUY TRÌNH
          ═══════════════════════════════════════════════════════════ */}
      <section id="quy-trinh" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow text-brand-red">Quy trình đặt hàng</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
            6 bước rõ ràng, có hợp đồng
          </h2>
        </div>

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

      {/* ═══════════════════════════════════════════════════════════
          FORM BÁO GIÁ
          ═══════════════════════════════════════════════════════════ */}
      <section id="bao-gia" className="scroll-mt-20 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand grid gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">Nhận báo giá miễn phí</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
              Gửi yêu cầu – nhận báo giá{" "}
              <Tbc note="Cần xác nhận cam kết thời gian phản hồi">trong 24 giờ làm việc</Tbc>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
              Càng nhiều thông tin (số lượng, ngân sách, logo, ngày cần hàng), báo giá càng chính xác.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {[
                "Báo giá chi tiết theo từng mức số lượng",
                <Tbc key="mockup">Mockup logo trên sản phẩm miễn phí</Tbc>,
                "Hợp đồng & hóa đơn VAT đầy đủ",
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
                { label: "Hotline", value: brand.hotline, href: tel, Icon: IconPhone, track: "click_call" },
                {
                  label: "Zalo – gửi logo, hình mẫu",
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

          <LeadForm
            nhom={variantKey}
            defaultProduct={variant.product}
            hotline={brand.hotline}
            zaloPhone={brand.zaloPhone}
            zaloUrl={brand.social.zalo}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════ */}
      {/* Không đệm dưới: footer của layout đã có mt-24 */}
      <section id="faq" className="container-brand scroll-mt-28 pt-20 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">Câu hỏi thường gặp</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
              Trước khi đặt hàng
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">
              Chưa thấy câu trả lời bạn cần? Gọi{" "}
              <a href={tel} data-track="click_call" className="font-semibold text-navy-500 hover:text-brand-red">
                {brand.hotline}
              </a>{" "}
              – xưởng tư vấn miễn phí.
            </p>
          </div>

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
    </>
  )
}
