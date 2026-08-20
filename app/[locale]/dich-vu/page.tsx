import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import PageHeader from "@/components/page-header"
import { IconArrowUpRight, IconGlobe } from "@/components/icons"

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)

  return {
    title: t.services.metaTitle,
    description: t.services.metaDescription,
    alternates: {
      canonical: path(locale, "dich-vu"),
      languages: {
        vi: path("vi", "dich-vu"),
        en: path("en", "dich-vu"),
        "x-default": path("vi", "dich-vu"),
      },
    },
  }
}

export default async function ServicesPage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, services } = content(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.services.eyebrow(services.length)}
        title={t.services.title}
        lead={t.services.lead}
        image={brand.identity.page_banners[2]}
        crumbs={[{ label: t.services.title }]}
      />

      <section className="container-brand py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-brand-red">{t.services.listEyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
            {t.services.listTitle}
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-ink-soft">{t.services.listLead}</p>
        </div>

        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={path(locale, "dich-vu", s.slug)}
                className="group flex h-full flex-col gap-4 bg-white p-7 transition-colors hover:bg-navy-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <IconGlobe className="size-6 text-brand-red transition-colors group-hover:text-brand-gold" />
                  <IconArrowUpRight className="size-4 text-line transition-colors group-hover:text-brand-gold" />
                </div>
                <h3 className="font-display text-lg leading-snug font-bold text-navy-500 transition-colors group-hover:text-white">
                  {s.title}
                </h3>
                <p className="mt-auto text-[11px] tracking-[0.14em] text-ink-soft uppercase transition-colors group-hover:text-white/50">
                  {t.common.viewDetail}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-shell py-16">
        <div className="container-brand flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-500">
              {t.services.ctaTitle}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{t.services.ctaLead(brand.hotline)}</p>
          </div>
          <Link
            href={path(locale, "lien-he")}
            className="rounded-[2px] bg-brand-red px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark"
          >
            {t.services.ctaButton}
          </Link>
        </div>
      </section>
    </>
  )
}
