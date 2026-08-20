import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { content, findArticle, slugInLocale } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, locales, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import PageHeader from "@/components/page-header"
import ArticleBody from "@/components/article-body"
import { IconArrowRight } from "@/components/icons"

type Params = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    content(locale).services.map((s) => ({ locale, slug: s.slug })),
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)
  const { brand } = content(locale)

  const article = findArticle(locale, slug, "services")
  if (!article) return { title: t.services.notFound }

  return {
    title: article.title,
    description: t.services.detailMetaDescription(article.title, brand.hotline),
    alternates: {
      canonical: path(locale, "dich-vu", article.slug),
      languages: {
        vi: path("vi", "dich-vu", slugInLocale(article.key, "vi", "services")),
        en: path("en", "dich-vu", slugInLocale(article.key, "en", "services")),
        "x-default": path("vi", "dich-vu", slugInLocale(article.key, "vi", "services")),
      },
    },
  }
}

export default async function ServiceDetailPage({ params }: Params) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, services } = content(locale)

  const article = findArticle(locale, slug, "services")
  if (!article) notFound()

  const others = services.filter((s) => s.key !== article.key).slice(0, 6)

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.services.title}
        title={article.title}
        image={article.banner || brand.identity.page_banners[2]}
        crumbs={[
          { label: t.services.title, href: path(locale, "dich-vu") },
          { label: article.title },
        ]}
      />

      <section className="container-brand py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <article>
            <ArticleBody article={article} locale={locale} />

            <div className="mt-12 border-t border-line pt-8">
              <p className="text-sm text-ink-soft">
                {t.services.detailQuoteLead}
                <a
                  href={`tel:${brand.hotline}`}
                  className="font-semibold text-brand-red hover:underline"
                >
                  {brand.hotline}
                </a>
                {t.services.detailQuoteOr}
                <Link
                  href={path(locale, "lien-he")}
                  className="font-semibold text-brand-red hover:underline"
                >
                  {t.services.detailQuoteLink}
                </Link>
                .
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="eyebrow text-navy-500">{t.services.otherServices}</h2>
            <span className="mt-4 mb-5 block h-px w-8 bg-brand-gold" />
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={path(locale, "dich-vu", s.slug)}
                    className="group flex items-center justify-between gap-3 py-4 text-sm text-ink transition-colors hover:text-brand-red"
                  >
                    {s.title}
                    <IconArrowRight className="size-4 shrink-0 text-line transition-all group-hover:translate-x-1 group-hover:text-brand-red" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-navy-500 p-6 text-white">
              <p className="eyebrow text-brand-gold">{t.services.sidebarEyebrow}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t.services.sidebarLead}
              </p>
              <Link
                href={path(locale, "lien-he")}
                className="mt-5 block rounded-[2px] bg-brand-red px-5 py-3 text-center text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-brand-red-dark"
              >
                {t.services.sidebarCta}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
