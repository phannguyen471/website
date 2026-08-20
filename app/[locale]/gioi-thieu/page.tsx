import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { media } from "@/lib/utils"
import PageHeader from "@/components/page-header"
import { IconArrowRight, IconFactory, IconGlobe, IconSparkle, IconTag } from "@/components/icons"

const PILLAR_ICONS = [IconSparkle, IconFactory, IconTag, IconGlobe]

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)

  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    alternates: {
      canonical: path(locale, "gioi-thieu"),
      languages: {
        vi: path("vi", "gioi-thieu"),
        en: path("en", "gioi-thieu"),
        "x-default": path("vi", "gioi-thieu"),
      },
    },
  }
}

export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, products } = content(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lead={brand.motto}
        image={brand.identity.page_banners[0]}
        crumbs={[{ label: t.about.metaTitle }]}
      />

      {/* Câu chuyện thương hiệu */}
      <section className="container-brand py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">{t.about.storyEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
              {t.about.storyTitle}
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-[15px] leading-[1.9] text-ink-soft md:text-base">
              {t.about.story.map((paragraph, i) => (
                <p key={i}>{paragraph(brand.founded)}</p>
              ))}
            </div>

            {/* 4 trụ cột */}
            <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {t.home.pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i] ?? IconSparkle
                return (
                  <li key={pillar.title} className="flex flex-col gap-3 bg-white p-5">
                    <Icon className="size-6 text-brand-red" />
                    <span className="text-sm leading-snug font-medium text-navy-500">
                      {pillar.title}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-shell">
              <Image
                src={media(brand.identity.about_image)}
                alt={t.about.workshopAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <dl className="grid grid-cols-2 gap-px bg-line">
              {[
                { n: brand.founded, l: t.home.stats.founded },
                { n: "10+", l: t.home.stats.experience },
                { n: products.length, l: t.home.stats.products },
                { n: brand.clients.length, l: t.home.stats.clients },
              ].map((s) => (
                <div key={s.l} className="bg-white p-5">
                  <dt className="font-display text-2xl font-bold text-navy-500">{s.n}</dt>
                  <dd className="mt-1 text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Khách hàng */}
      <section className="border-y border-line bg-shell py-16 lg:py-20">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-red">{t.about.clientsEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
              {t.about.clientsTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {t.about.clientsLead(brand.motto)}
            </p>
          </div>

          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {brand.clients.map((c) => (
              <li
                key={c}
                className="flex min-h-[88px] items-center bg-white p-5 text-sm font-medium text-navy-500"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quy trình */}
      <section className="container-brand py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-brand-red">{t.about.processEyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
            {t.about.processTitle}
          </h2>
        </div>

        <ol className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {brand.process.map((s) => (
            <li key={s.step} className="bg-white p-7">
              <span className="eyebrow text-brand-gold">{t.about.step(s.step)}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-500">{s.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Giấy chứng nhận */}
      <section className="border-t border-line bg-shell py-16 lg:py-20">
        <div className="container-brand grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">{t.about.legalEyebrow}</p>
            <h2 className="mt-4 font-display text-2xl leading-tight font-bold text-navy-500 lg:text-3xl">
              {brand.legalName}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {t.about.legalLead(brand.address)}
            </p>
            <Link
              href={path(locale, "lien-he")}
              className="group mt-8 inline-flex items-center gap-2 rounded-[2px] bg-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
            >
              {t.about.legalCta}
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-line bg-white">
            <Image
              src={media(brand.identity.certificate)}
              alt={t.about.certificateAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>
    </>
  )
}
