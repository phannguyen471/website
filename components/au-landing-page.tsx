import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { content } from "@/lib/content"
import {
  AFLW_TOTE,
  AU_CATEGORIES,
  AU_PATH,
  AU_SHOWCASE,
  AU_TABS,
  AU_VARIANTS,
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
 * Landing Google Ads cho thị trường Úc — chỉ tiếng Anh, liên hệ qua WhatsApp
 * và email, giá AUD. Khối riêng của thị trường Úc ở components/au-sections.tsx.
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

export default function AuLandingPage({ variantKey, review }: { variantKey: AuVariantKey; review: boolean }) {
  const locale = "en" as const
  const variant = AU_VARIANTS[variantKey]
  const { brand, products } = content(locale)
  const Tbc = makeTbc(review)
  const wa = whatsappUrl(brand.zaloPhone)

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
        top={review && <AuReviewBanner />}
        eyebrow={`Factory-direct · Made to your spec · Since ${brand.founded}`}
        title={variant.title}
        lead={variant.lead}
        cta="Get a quote in 24 hours"
        facts={facts}
        images={hero}
        secondary={auSecondaryCta(brand)}
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
                  See range
                  <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AuVersusSection
        title="Why buy from the factory, not a catalogue"
        lead="Most Australian promo suppliers print your logo onto stock items. That works for small runs. When the product carries your brand to customers, a product built to your spec looks and lasts better – and usually costs less per unit at volume."
        rows={[
          ["Product design", "Pick from a catalogue blank", "Built to your size, fabric, colour, trims"],
          ["Brand colour", "Nearest stock colour", "Fabric and print matched to your brand"],
          [
            "Decoration",
            "Print on the front panel",
            "Screen print, full print, embroidery, debossed PU, woven labels, custom tags",
          ],
          ["Price at 300+ units", "Reseller margin on top", "Factory-direct"],
          ["Best for", "Under 100 units, needed this week", "300+ units, planned 5–8 weeks ahead"],
        ]}
      />

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

      <AuProcurementSection
        Tbc={Tbc}
        last={{
          title: "Fewer plastic bags",
          text: "Reusable canvas and cotton bags support your sustainability and ESG goals.",
        }}
      />

      <AuPriceSection
        Tbc={Tbc}
        title="What does it cost, made to spec?"
        lead="Indicative factory prices in AUD, excluding freight and GST. Final price depends on fabric, size, print colours and quantity."
        quantities={["300 units", "1,000 units", "3,000 units"]}
        rows={[
          ["Cotton canvas tote, 1-colour print", "A$4.50", "A$3.20", "A$2.60"],
          ["Heavy canvas tote, gusset & inner pocket", "A$7.90", "A$6.20", "A$5.40"],
          ["Canvas with PU or straw trims", "A$12.50", "A$10.00", "A$8.90"],
          ["Embroidered cap or bucket hat", "A$6.50", "A$5.20", "A$4.60"],
          ["Embroidered pique polo", "A$14.00", "A$11.50", "A$10.20"],
          ["PU cosmetic pouch, debossed logo", "A$5.90", "A$4.40", "A$3.80"],
        ]}
      />

      {/* Chất liệu & cách in */}
      <section id="materials" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro eyebrow="Choosing the right product" title="Fabrics and decoration, explained" />
          <AuTextTable
            head={["Fabric", "Feel", "Durability", "Budget", "Best for"]}
            cols="md:grid-cols-[1.3fr_1fr_1fr_0.6fr_1.4fr]"
            rows={[
              ["Calico / light cotton", "Soft, natural", "Everyday light use", "Lowest", "Events, conferences, retail packaging"],
              ["Cotton canvas", "Thick, holds its shape", "Years of use", "Mid", "Brand merch, gift-with-purchase, members"],
              ["Polyester / nylon", "Light, water-resistant", "High, packs small", "Mid", "Backpacks, cooler bags, travel"],
              ["Pique cotton / poly (polos, tees)", "Breathable, smart-casual", "Holds colour wash after wash", "Mid", "Staff uniforms, events, merch"],
              ["Cotton twill (caps, bucket hats)", "Structured or soft crown", "High", "Low–mid", "Giveaways, staff, retail merch"],
              ["Canvas + PU, straw, faux leather", "Premium, retail-ready", "High", "Higher", "VIP gifts, retail-grade merch"],
            ]}
          />
          <div className="mt-8">
            <AuTextTable
              head={["Decoration", "Best for", "Look"]}
              cols="md:grid-cols-[1fr_1.4fr_1.2fr]"
              rows={[
                ["Screen print", "1–4 colour logos, larger runs", "Bold, crisp, best value"],
                ["Full-colour heat transfer", "Photos, gradients, all-over prints", "Vivid, edge to edge"],
                ["Embroidery", "Small logos on canvas, caps", "Premium, longest lasting"],
                ["Debossed PU / woven label", "Beauty and fashion brands", "Subtle, retail finish"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* TODO: thêm 2–3 nhận xét thật của khách Úc (tên, chức vụ, công ty) khi có — không tự viết */}

      <AuQuoteSection Tbc={Tbc} brand={brand} nhom={`au-${variantKey}`} defaultProduct={variant.product} />

      <AuFaqSection brand={brand} faqs={faqs} />
    </>
  )
}
