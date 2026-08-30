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
import { IconClock, IconEye } from "@/components/icons"

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)

  return {
    title: t.news.metaTitle,
    description: t.news.metaDescription,
    alternates: {
      canonical: path(locale, "tin-tuc"),
      languages: {
        vi: path("vi", "tin-tuc"),
        en: path("en", "tin-tuc"),
        "x-default": path("vi", "tin-tuc"),
      },
    },
    openGraph: {
      title: t.news.metaTitle,
      description: t.news.metaDescription,
      images: ["/clients/tintuc.webp"],
    },
  }
}

export default async function NewsPage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, news } = content(locale)
  const [lead, ...rest] = news

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.news.eyebrow}
        title={t.news.title}
        lead={t.news.lead}
        image="/clients/tintuc.webp"
        crumbs={[{ label: t.news.title }]}
      />

      <section className="container-brand py-16 lg:py-24">
        {news.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.news.empty}</p>
        ) : (
          <>
            {/* Bài nổi bật */}
            <Link
              href={path(locale, "tin-tuc", lead.slug)}
              className="group grid gap-8 border-b border-line pb-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-shell">
                <Image
                  src={media(lead.images[0] || lead.banner)}
                  alt={lead.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div>
                <p className="eyebrow text-brand-red">{t.news.latest}</p>
                <h2 className="mt-4 font-display text-2xl leading-tight font-bold text-navy-500 transition-colors group-hover:text-brand-red lg:text-4xl">
                  {lead.title}
                </h2>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-soft">
                  {lead.date && (
                    <span className="flex items-center gap-1.5">
                      <IconClock className="size-3.5" />
                      {lead.date}
                    </span>
                  )}
                  {lead.views && (
                    <span className="flex items-center gap-1.5">
                      <IconEye className="size-3.5" />
                      {lead.views} {t.common.views}
                    </span>
                  )}
                </div>
                <span className="mt-7 inline-block border-b border-brand-red pb-1 text-[11px] font-semibold tracking-[0.16em] text-brand-red uppercase">
                  {t.common.readMore}
                </span>
              </div>
            </Link>

            {/* Các bài còn lại */}
            {rest.length > 0 && (
              <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <Link
                    key={a.slug}
                    href={path(locale, "tin-tuc", a.slug)}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-shell">
                      <Image
                        src={media(a.images[0] || a.banner)}
                        alt={a.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="eyebrow mt-5 text-ink-soft/70">{a.date}</p>
                    <h3 className="mt-3 font-display text-lg leading-snug font-bold text-navy-500 transition-colors group-hover:text-brand-red">
                      {a.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
