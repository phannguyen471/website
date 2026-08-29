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
import { IconArrowRight, IconTag } from "@/components/icons"

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)

  return {
    title: t.promotions.metaTitle,
    description: t.promotions.metaDescription,
    alternates: {
      canonical: path(locale, "uu-dai"),
      languages: {
        vi: path("vi", "uu-dai"),
        en: path("en", "uu-dai"),
        "x-default": path("vi", "uu-dai"),
      },
    },
  }
}

export default async function PromotionsPage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, promotions } = content(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.promotions.eyebrow(promotions.length)}
        title={t.promotions.title}
        lead={t.promotions.lead}
        image="/clients/uudai.webp"
        crumbs={[{ label: t.promotions.title }]}
      />

      <section className="container-brand py-16 lg:py-24">
        {promotions.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.promotions.empty}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {promotions.map((p) => (
              <Link
                key={p.slug}
                href={path(locale, "san-pham", p.slug)}
                className="group flex flex-col border border-line bg-white transition-colors hover:border-navy-300"
              >
                <div className="relative aspect-square overflow-hidden bg-shell">
                  <Image
                    src={media(p.image)}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {p.discount && (
                    <span className="absolute top-0 left-0 bg-brand-red px-2.5 py-1 text-[11px] font-bold text-white">
                      {p.discount}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="text-[15px] leading-snug font-medium text-ink transition-colors group-hover:text-navy-500">
                    {p.name}
                  </h2>
                  <p className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
                    <span className="text-base font-semibold text-brand-red">{p.priceNew}</span>
                    {p.priceOld && (
                      <span className="text-xs text-ink-soft line-through">{p.priceOld}</span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Ghi chú đơn số lượng lớn */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-line bg-shell p-7 md:flex-row md:items-center lg:p-9">
          <div className="flex items-start gap-4">
            <IconTag className="mt-1 size-6 shrink-0 text-brand-red" />
            <div>
              <h2 className="font-display text-xl font-bold text-navy-500">
                {t.promotions.bulkTitle}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                {t.promotions.bulkLead}
              </p>
            </div>
          </div>

          <Link
            href={path(locale, "lien-he")}
            className="group flex shrink-0 items-center gap-2.5 rounded-[2px] bg-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
          >
            {t.common.quote}
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  )
}
