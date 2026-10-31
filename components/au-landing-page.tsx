import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { content } from "@/lib/content"
import {
  AFLW_TOTE,
  AU_BUDGETS,
  AU_CATEGORIES,
  AU_PATH,
  AU_PRODUCT_KEYS,
  AU_QUANTITIES,
  AU_SHOWCASE,
  AU_TABS,
  AU_THANK_YOU_PATH,
  AU_VARIANTS,
  whatsappUrl,
  type AuVariantKey,
} from "@/lib/au-landing"
import { media } from "@/lib/utils"
import ClientMarquee from "@/components/client-marquee"
import LandingShowcase from "@/components/landing-showcase"
import LandingTracking from "@/components/landing-tracking"
import {
  CasesSection,
  DataTable,
  FaqSection,
  LandingHero,
  QuoteSection,
  ReasonsSection,
  SectionIntro,
  ctaPrimary,
  landingRobots,
  makeTbc,
} from "@/components/landing-sections"
import { IconWhatsApp } from "@/components/brand-icons"
import { IconArrowRight, IconArrowUpRight, IconMail } from "@/components/icons"

/**
 * Landing Google Ads cho thị trường Úc — chỉ tiếng Anh, liên hệ qua WhatsApp
 * và email, giá AUD. Dùng cùng bộ khối dựng với landing trong nước
 * (components/landing-sections.tsx).
 */

export function auLandingMetadata(key: AuVariantKey): Metadata {
  const variant = AU_VARIANTS[key]
  return {
    title: variant.metaTitle,
    description: variant.lead,
    robots: landingRobots,
    alternates: { canonical: AU_PATH, languages: { "en-AU": AU_PATH } },
  }
}

/** Dải chế độ duyệt (`?review=1`) — giữ tiếng Anh như mockup vì trang chỉ có tiếng Anh */
function ReviewBannerAu() {
  return (
    <p className="bg-brand-gold px-6 py-3 text-center text-[13px] leading-relaxed text-navy-900">
      <b>Review mode:</b> highlighted items are assumptions or market references – Phan Nguyen must confirm before
      ads go live. Hover for the source.
    </p>
  )
}

export default function AuLandingPage({ variantKey, review }: { variantKey: AuVariantKey; review: boolean }) {
  const locale = "en" as const
  const variant = AU_VARIANTS[variantKey]
  const { brand, products } = content(locale)
  const Tbc = makeTbc(review)
  const wa = whatsappUrl(brand.zaloPhone)
  const mail = `mailto:${brand.email}`

  const imageOf = (slug: string) => media(products.find((p) => p.key === slug)?.images[0])
  const hero = variant.heroSlugs.map((slug) => ({
    src: imageOf(slug),
    alt: products.find((p) => p.key === slug)?.name ?? "",
  }))
  const showcase = AU_SHOWCASE.map((item) => ({ ...item, image: item.image ?? imageOf(item.slug) }))

  const facts = [
    { value: "Factory-direct pricing", label: "No reseller mark-up" },
    { value: "Free digital mockup", label: "See your logo on the product first" },
    { value: "Physical sample first", label: "Approve before bulk production" },
    {
      value: <Tbc note="Confirm export MOQ per product">From 300 units</Tbc>,
      label: "Per design, better price at volume",
    },
  ]

  const cell = (text: string, tone?: "yes") => (
    <span className={tone === "yes" ? "text-[14px] font-semibold text-brand-green" : "text-[14px] text-ink-soft"}>
      {text}
    </span>
  )
  const versus: [string, React.ReactNode, React.ReactNode][] = [
    ["Product design", cell("Pick from a catalogue blank"), cell("Built to your size, fabric, colour, trims", "yes")],
    ["Brand colour", cell("Nearest stock colour"), cell("Fabric and print matched to your brand", "yes")],
    [
      "Decoration",
      cell("Print on the front panel"),
      cell("Screen print, full print, embroidery, debossed PU, woven labels, custom tags", "yes"),
    ],
    ["Price at 300+ units", cell("Reseller margin on top"), cell("Factory-direct", "yes")],
    ["Best for", cell("Under 100 units, needed this week"), cell("300+ units, planned 5–8 weeks ahead", "yes")],
  ]

  const procurement = [
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
    {
      title: "Fewer plastic bags",
      text: "Reusable canvas and cotton bags support your sustainability and ESG goals.",
    },
  ]

  const price = (v: string, note?: string) => (
    <span className="font-display text-lg font-bold text-brand-red">
      <Tbc note={note}>{v}</Tbc>
    </span>
  )
  const PLACEHOLDER = "Placeholder – needs Phan Nguyen export price list"
  const prices: [string, string, string, string][] = [
    ["Cotton canvas tote, 1-colour print", "A$4.50", "A$3.20", "A$2.60"],
    ["Heavy canvas tote, gusset & inner pocket", "A$7.90", "A$6.20", "A$5.40"],
    ["Canvas with PU or straw trims", "A$12.50", "A$10.00", "A$8.90"],
    ["Embroidered cap or bucket hat", "A$6.50", "A$5.20", "A$4.60"],
    ["Embroidered pique polo", "A$14.00", "A$11.50", "A$10.20"],
    ["PU cosmetic pouch, debossed logo", "A$5.90", "A$4.40", "A$3.80"],
  ]

  const timeline = [
    { when: "24 hours", text: "Quote and free digital mockup" },
    { when: <Tbc note="Confirm">7–10 days</Tbc>, text: "Physical sample, couriered to you" },
    { when: <Tbc note="Confirm">2–3 weeks</Tbc>, text: "Bulk production after sample approval" },
    { when: <Tbc note="Confirm freight options">1–4 weeks</Tbc>, text: "Air or sea freight to your door in Australia" },
  ]

  const fabrics = [
    ["Calico / light cotton", "Soft, natural", "Everyday light use", "Lowest", "Events, conferences, retail packaging"],
    ["Cotton canvas", "Thick, holds its shape", "Years of use", "Mid", "Brand merch, gift-with-purchase, members"],
    ["Polyester / nylon", "Light, water-resistant", "High, packs small", "Mid", "Backpacks, cooler bags, travel"],
    ["Pique cotton / poly (polos, tees)", "Breathable, smart-casual", "Holds colour wash after wash", "Mid", "Staff uniforms, events, merch"],
    ["Cotton twill (caps, bucket hats)", "Structured or soft crown", "High", "Low–mid", "Giveaways, staff, retail merch"],
    ["Canvas + PU, straw, faux leather", "Premium, retail-ready", "High", "Higher", "VIP gifts, retail-grade merch"],
  ]
  const decorations = [
    ["Screen print", "1–4 colour logos, larger runs", "Bold, crisp, best value"],
    ["Full-colour heat transfer", "Photos, gradients, all-over prints", "Vivid, edge to edge"],
    ["Embroidery", "Small logos on canvas, caps", "Premium, longest lasting"],
    ["Debossed PU / woven label", "Beauty and fashion brands", "Subtle, retail finish"],
  ]
  const textCell = (t: string, i: number) => (
    <span key={i} className={i === 0 ? "text-[15px] font-medium text-navy-500" : "text-[14px] text-ink"}>
      {t}
    </span>
  )

  const faqs = [
    {
      q: "What is the minimum order?",
      a: (
        <>
          <Tbc>300 units per design</Tbc> for most bags. Smaller runs are possible on some styles at a higher unit
          price – ask us.
        </>
      ),
    },
    {
      q: "How long until the order arrives in Australia?",
      a: (
        <>
          Plan on <Tbc>5–8 weeks</Tbc> from brief to delivery: sample, production, then freight. Air freight is
          faster for urgent orders; sea freight is cheaper for large runs. We'll give you a dated schedule with your
          quote.
        </>
      ),
    },
    {
      q: "Do I pay import duty and GST?",
      a: (
        <>
          GST applies to imports as normal. Goods made in Vietnam can enter Australia duty-free under the
          ASEAN–Australia–New Zealand Free Trade Agreement when shipped with a certificate of origin,{" "}
          <Tbc>which we supply</Tbc>. Your freight forwarder or customs broker will confirm the details for your
          shipment.
        </>
      ),
    },
    {
      q: "Can I see a sample before production?",
      a: (
        <>
          Yes. You get a free digital mockup first, then a physical sample couriered to you.{" "}
          <Tbc note="Confirm sample policy">Sample cost is credited against your bulk order.</Tbc>
        </>
      ),
    },
    {
      q: "Can you match our brand colours?",
      a: "Yes. Send Pantone references and we match fabric and print colours, then confirm them on the physical sample before bulk production.",
    },
    {
      q: "How do payments work?",
      a: (
        <>
          <Tbc note="Confirm payment terms">A deposit to start production and the balance before shipping</Tbc>, by
          international bank transfer. Prices are quoted in AUD.
        </>
      ),
    },
    {
      q: "Can I order mixed sizes for polos and tees?",
      a: (
        <>
          Yes. Give us a size run per design (for example XS–5XL) and we sew to your split.{" "}
          <Tbc note="Confirm size range and grading">Men's, women's and youth fits available.</Tbc>
        </>
      ),
    },
    {
      q: "Which cap styles can you make?",
      a: "Six-panel and five-panel caps, trucker caps with mesh backs, sports caps and bucket hats, in your fabric colours with embroidered, printed or patch logos.",
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        locale={locale}
        top={review && <ReviewBannerAu />}
        eyebrow={`Factory-direct · Made to your spec · Since ${brand.founded}`}
        title={variant.title}
        lead={variant.lead}
        cta="Get a quote in 24 hours"
        facts={facts}
        images={hero}
        secondary={{
          href: wa,
          label: "Send your logo on WhatsApp",
          icon: <IconWhatsApp size={26} />,
          track: "click_whatsapp",
        }}
      />

      <ClientMarquee locale={locale} />

      {/* Số liệu */}
      <section className="bg-navy-500 text-white">
        <div className="container-brand">
          <dl className="grid grid-cols-2 gap-px bg-white/12 lg:grid-cols-4">
            {[
              { n: String(brand.founded), l: "Making bags and branded merchandise since" },
              { n: `${products.length}+`, l: "Custom styles produced" },
              { n: "WBE", l: "Certified women-owned business – WEConnect International" },
              { n: "AU", l: "Delivered to Australian brands, clubs and events" },
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
        <SectionIntro eyebrow="Shop by product" title="What do you need made?" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {AU_CATEGORIES.map((c) => (
            <Link
              key={c.grp}
              href={`${AU_PATH}?grp=${c.grp}`}
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
                  See range
                  <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Xưởng vs đơn vị bán lại */}
      <section id="why" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <SectionIntro
            eyebrow="Reseller vs manufacturer"
            title="Why buy from the factory, not a catalogue"
            lead="Most Australian promo suppliers print your logo onto stock items. That works for small runs. When the product carries your brand to customers, a product built to your spec looks and lasts better – and usually costs less per unit at volume."
            className=""
          />
          <div className="bg-white">
            <DataTable
              head={["", "Typical promo reseller", "Phan Nguyen factory"]}
              cols="md:grid-cols-[0.9fr_1.1fr_1.3fr]"
              mobileLabels
              rows={versus.map(([label, a, b]) => ({
                key: label,
                cells: [
                  <span key="l" className="text-[15px] font-medium text-navy-500">
                    {label}
                  </span>,
                  a,
                  b,
                ],
              }))}
            />
          </div>
        </div>
      </section>

      {/* Sản phẩm */}
      <section id="san-pham" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow="What we make"
          title="Bags, caps and polos for brands, teams and events"
          lead="Real orders from our factory. Every style can be resized, re-coloured and re-trimmed to your brief."
          className="mb-10 max-w-2xl"
        />
        <LandingShowcase locale={locale} items={showcase} tabList={AU_TABS} />
        <p className="mt-10 text-[15px] text-ink-soft">
          Also made to order: bucket hats, hoodies, cooler and lunch bags, laptop sleeves and travel pouches. Send a
          reference photo on{" "}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-track="click_whatsapp"
            className="font-semibold text-navy-500 underline underline-offset-4 hover:text-brand-red"
          >
            WhatsApp
          </a>{" "}
          and we'll quote it.
        </p>
      </section>

      <CasesSection
        locale={locale}
        eyebrow="Selected work"
        title="Real products for real brands"
        cases={[
          {
            brand: "Kiehl's",
            image: imageOf("tui-canvas-cotton-phoi-coi"),
            product: "Moss-green canvas tote with natural straw panel",
            challenge: "Joining two materials while holding the exact brand green",
          },
          {
            brand: "AFLW",
            image: AFLW_TOTE,
            product: "Large full-print tote for members and events",
            challenge: "Vivid full-colour print, consistent across the whole run",
          },
          {
            brand: "Kérastase",
            image: imageOf("tui-xach-tay-canvas-phoi-pu-nau"),
            product: "Canvas bag with faux-leather handles",
            challenge: "Salon-grade finish with a subtle debossed logo",
          },
        ]}
      />

      <ReasonsSection
        eyebrow="For marketing & procurement teams"
        title="A supplier your procurement team can sign off"
        reasons={procurement}
        cols="lg:grid-cols-3"
      />

      {/* Bảng giá AUD + thời gian */}
      <section id="pricing" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow="Price guide"
          title="What does it cost, made to spec?"
          lead="Indicative factory prices in AUD, excluding freight and GST. Final price depends on fabric, size, print colours and quantity."
        />
        <DataTable
          head={["Product", "300 units", "1,000 units", "3,000 units"]}
          cols="md:grid-cols-[1.6fr_1fr_1fr_1fr]"
          mobileLabels
          rows={prices.map(([name, a, b, c]) => ({
            key: name,
            cells: [
              <span key="n" className="text-[15px] font-medium text-ink">
                {name}
              </span>,
              price(a, PLACEHOLDER),
              price(b, PLACEHOLDER),
              price(c, PLACEHOLDER),
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

      {/* Chất liệu & cách in */}
      <section id="materials" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro eyebrow="Choosing the right product" title="Fabrics and decoration, explained" />
          <div className="bg-white">
            <DataTable
              head={["Fabric", "Feel", "Durability", "Budget", "Best for"]}
              cols="md:grid-cols-[1.3fr_1fr_1fr_0.6fr_1.4fr]"
              mobileLabels
              rows={fabrics.map((r) => ({ key: r[0], cells: r.map(textCell) }))}
            />
          </div>
          <div className="mt-8 bg-white">
            <DataTable
              head={["Decoration", "Best for", "Look"]}
              cols="md:grid-cols-[1fr_1.4fr_1.2fr]"
              mobileLabels
              rows={decorations.map((r) => ({ key: r[0], cells: r.map(textCell) }))}
            />
          </div>
        </div>
      </section>

      {/* TODO: thêm 2–3 nhận xét thật của khách Úc (tên, chức vụ, công ty) khi có — không tự viết */}

      <QuoteSection
        locale={locale}
        eyebrow="Free quote & mockup"
        title={
          <>
            Tell us what you need – quote in{" "}
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
            value: (
              <Tbc note="Confirm WhatsApp number used by the English-speaking sales contact">{brand.zaloPhone}</Tbc>
            ),
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
          nhom: `au-${variantKey}`,
          defaultProduct: variant.product,
          productKeys: AU_PRODUCT_KEYS,
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

      <FaqSection
        locale={locale}
        eyebrow="FAQ"
        title="Before you order"
        faqs={faqs}
        brand={brand}
        lead={
          <>
            Can't find your answer? Email{" "}
            <a href={mail} data-track="click_email" className="font-semibold text-navy-500 hover:text-brand-red">
              {brand.email}
            </a>{" "}
            or message us on{" "}
            <a
              href={wa}
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
    </>
  )
}
