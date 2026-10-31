import type { Metadata } from "next"
import { content } from "@/lib/content"
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
 * Landing Google Ads Úc — nhóm "Cosmetic Bags" (`/en/au/custom-cosmetic-bags`).
 * Toàn bộ ảnh là sản phẩm thật làm cho thương hiệu làm đẹp (public/media/au).
 */

export const auCosmeticMetadata: Metadata = {
  title: "Custom Cosmetic Bags & Makeup Pouches for Beauty Brands",
  description:
    "Custom cosmetic bags, makeup pouches, vanity cases and gift-with-purchase pouches made for beauty brands – Kiehl's, Lancôme, La Roche-Posay, Paula's Choice and Kérastase. Factory-direct for Australia.",
  robots: landingRobots,
  alternates: { canonical: AU_COSMETIC_PATH, languages: { "en-AU": AU_COSMETIC_PATH } },
}

export default function AuCosmeticPage({ review }: { review: boolean }) {
  const locale = "en" as const
  const { brand } = content(locale)
  const Tbc = makeTbc(review)
  const wa = whatsappUrl(brand.zaloPhone)

  const showcase = AU_COSMETIC_SHOWCASE.map((item) => ({ ...item, slug: item.image, product: "auCosmetic" as const }))

  const facts = [
    { value: "Beauty-brand experience", label: "L'Oréal group and leading skincare brands" },
    { value: "Free digital mockup", label: "See your logo on the pouch first" },
    { value: "Physical sample first", label: "Approve colour and finish before bulk" },
    {
      value: <Tbc note="Confirm export MOQ for cosmetic pouches">From 500 units</Tbc>,
      label: "Per design, ideal for GWP runs",
    },
  ]

  const sizes = [
    { size: "18 × 12", text: "Mini pouch for samples and lip products." },
    { size: "22 × 14 × 6", text: "Standard makeup bag." },
    { size: "25 × 18 × 10", text: "Toiletry and travel bag." },
    { size: "Your kit", text: "Send your products – we size the pouch to fit." },
  ]

  const faqs = [
    {
      q: "What is the minimum order?",
      a: (
        <>
          <Tbc>500 pouches per design</Tbc>. Gift-with-purchase runs of 2,000+ get the best unit price.
        </>
      ),
    },
    {
      q: "Can you match our brand colour exactly?",
      a: "Yes. Send your Pantone references. We match the material and print, then confirm on a physical sample before bulk production.",
    },
    {
      q: "Can you pack for gift-with-purchase?",
      a: (
        <>
          Yes.{" "}
          <Tbc>Each pouch can be individually bagged, barcoded and carton-packed to your warehouse spec</Tbc>.
        </>
      ),
    },
    {
      q: "Do you provide material test reports?",
      a: (
        <Tbc>Material test reports (for example for heavy metals and azo dyes) are available on request.</Tbc>
      ),
    },
    {
      q: "How long until my order arrives in Australia?",
      a: (
        <>
          Plan on <Tbc>5–8 weeks</Tbc> from brief to delivery: sample, bulk production, then freight. Air freight
          suits urgent orders, sea freight suits large runs. You get a dated schedule with your quote.
        </>
      ),
    },
    {
      q: "Do I pay import duty and GST?",
      a: (
        <>
          GST applies to imports as normal. Goods made in Vietnam can enter Australia duty-free under the
          ASEAN–Australia–New Zealand Free Trade Agreement when shipped with a certificate of origin,{" "}
          <Tbc>which we supply</Tbc>. Your freight forwarder or customs broker confirms the details for your
          shipment.
        </>
      ),
    },
    {
      q: "How do payments work?",
      a: (
        <>
          <Tbc>A deposit to start production and the balance before shipping</Tbc>, by international bank transfer.
          Quotes are in AUD.
        </>
      ),
    },
  ]

  return (
    <>
      <LandingTracking />

      <LandingHero
        locale={locale}
        top={review && <AuReviewBanner />}
        eyebrow={`Cosmetic bags · For beauty brands · Since ${brand.founded}`}
        title={["Custom ", "cosmetic bags & pouches", " for beauty brands"]}
        lead="Gift-with-purchase pouches, makeup bags and vanity cases built to your brand standards – the same factory trusted by Kiehl's, Lancôme, La Roche-Posay, Paula's Choice and Kérastase."
        cta="Get a quote in 24 hours"
        facts={facts}
        images={[
          // Ảnh lớn khung đứng → dùng hộp vanity dáng đứng để không bị cắt
          { src: "/media/au/cos-kiehls-vanity.webp", alt: "Kiehl's red structured vanity case" },
          { src: "/media/au/cos-lancome-round.webp", alt: "Lancôme round glossy pouch" },
          { src: "/media/au/cos-paulas-choice.webp", alt: "Paula's Choice faux leather cosmetic bag" },
        ]}
        secondary={auSecondaryCta(brand)}
      />

      <ClientMarquee locale={locale} />

      <AuVersusSection
        title="Why order from the factory, not a catalogue"
        lead="Most Australian promo suppliers decorate stock items. That works for small, urgent runs. When the product carries your brand, one built to your spec looks better, lasts longer and usually costs less per unit at volume."
        rows={[
          ["Pouch design", "Stock pouch shapes", "Your shape, size, lining, zip and puller"],
          ["Material", "Limited stock colours", "PU, canvas, nylon, mesh, clear PVC, holographic"],
          ["Brand colour", "Nearest stock colour", "Matched to your brand Pantone"],
          ["Finish", "Printed logo only", "Deboss, foil, embroidery, logo zip pullers, woven labels"],
          ["Retail readiness", "Bulk packed", "Individually bagged, ready for GWP packing"],
        ]}
      />

      {/* Sản phẩm */}
      <section id="san-pham" className="container-brand scroll-mt-28 py-20 lg:py-28">
        <SectionIntro
          eyebrow="Real orders from our factory"
          title="Pouches, makeup bags and vanity cases"
          lead="Every style can be resized, re-coloured and re-trimmed to your brief."
          className="mb-10 max-w-2xl"
        />
        <LandingShowcase locale={locale} items={showcase} tabs={false} />
        <p className="mt-10 text-[15px] text-ink-soft">
          Don't see your style? Send a reference photo on{" "}
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
        title="Made for brands you know"
        cases={[
          {
            brand: "Lancôme",
            image: "/media/au/cos-lancome-round.webp",
            product: "Glossy round PU pouch for a fragrance campaign",
            challenge: "A perfect circle zip and high-gloss finish with no wrinkles",
          },
          {
            brand: "Paula's Choice",
            image: "/media/au/cos-paulas-choice.webp",
            product: "Faux-leather cosmetic bag with foil logo",
            challenge: "Rich colour match and a crisp gold foil logo on soft PU",
          },
          {
            brand: "Kiehl's",
            image: "/media/au/cos-kiehls-vanity.webp",
            product: "Structured vanity case with hanging handle",
            challenge: "Holding shape and the exact Kiehl's red across the run",
          },
        ]}
      />

      <AuProcurementSection
        Tbc={Tbc}
        last={{ title: "Reusable packaging", text: "A pouch customers keep replaces single-use gift packaging." }}
      />

      <AuPriceSection
        Tbc={Tbc}
        title="What does a custom cosmetic pouch cost?"
        lead="Indicative factory prices in AUD, excluding freight and GST. Final price depends on materials, size, decoration and quantity."
        quantities={["500 units", "2,000 units", "5,000 units"]}
        rows={[
          ["Canvas pouch, 1-colour print", "A$3.20", "A$2.40", "A$2.00"],
          ["PU pouch, debossed or foil logo", "A$5.90", "A$4.40", "A$3.80"],
          ["Clear PVC travel pouch", "A$3.90", "A$2.90", "A$2.40"],
          ["Structured vanity case", "A$12.50", "A$9.80", "A$8.60"],
        ]}
      />

      {/* Chất liệu, hoàn thiện, kích thước */}
      <section id="materials" className="scroll-mt-28 border-y border-line bg-shell py-20 lg:py-28">
        <div className="container-brand">
          <SectionIntro eyebrow="Choosing the right spec" title="Materials and finishes for beauty packaging" />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <AuTextTable
              head={["Material", "Look", "Best for"]}
              cols="md:grid-cols-[1fr_1fr_1.2fr]"
              rows={[
                ["Matte or glossy PU", "Premium, wipe-clean", "Fragrance and skincare GWP"],
                ["Cotton canvas", "Natural, printable", "Eco-led brands, everyday makeup bags"],
                ["Nylon / polyester", "Light, water-resistant", "Travel and toiletry bags"],
                ["Clear PVC or TPU", "See-through, airport-friendly", "Travel kits and minis"],
                ["Mesh", "Breathable, playful", "Bath and sheet-mask kits"],
                ["Holographic TPU", "Eye-catching", "Seasonal and Gen-Z campaigns"],
              ]}
            />
            <AuTextTable
              head={["Finish", "Look"]}
              cols="md:grid-cols-[1fr_1.2fr]"
              rows={[
                ["Deboss / emboss", "Subtle, tactile logo"],
                ["Foil hot-stamp", "Metallic gold, silver or rose gold"],
                ["Screen print", "Crisp colour logos and patterns"],
                ["Embroidery", "Premium on canvas and nylon"],
                ["Logo zip puller", "Branded metal or rubber puller"],
                ["Woven or printed label", "Retail-style detailing"],
              ]}
            />
          </div>

          <h3 className="mt-16 font-display text-2xl font-bold text-navy-500">Sizes</h3>
          <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {sizes.map((s) => (
              <li key={s.size} className="bg-white p-7">
                <p className="font-display text-2xl font-bold text-navy-500">{s.size}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">Sizes in cm (width × height × depth).</p>
        </div>
      </section>

      {/* TODO: thêm 2–3 nhận xét thật của khách Úc (tên, chức vụ, công ty) khi có — không tự viết */}

      <AuQuoteSection
        Tbc={Tbc}
        brand={brand}
        nhom="au-cosmetic"
        defaultProduct="auCosmetic"
        title="Tell us about your pouch"
      />

      <AuFaqSection brand={brand} faqs={faqs} />
    </>
  )
}
