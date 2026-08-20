import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { content, findArticle, slugInLocale } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, locales, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { media } from "@/lib/utils"
import PageHeader from "@/components/page-header"
import ArticleBody from "@/components/article-body"
import { IconClock, IconEye } from "@/components/icons"

type Params = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => content(locale).news.map((a) => ({ locale, slug: a.slug })))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)
  const { brand } = content(locale)

  const article = findArticle(locale, slug, "news")
  if (!article) return { title: t.news.notFound }

  const description =
    article.contentText.replace(/\s+/g, " ").trim().slice(0, 160) ||
    t.news.fallbackDescription(article.title, brand.brandName)

  return {
    title: article.title,
    description,
    alternates: {
      canonical: path(locale, "tin-tuc", article.slug),
      languages: {
        vi: path("vi", "tin-tuc", slugInLocale(article.key, "vi", "news")),
        en: path("en", "tin-tuc", slugInLocale(article.key, "en", "news")),
        "x-default": path("vi", "tin-tuc", slugInLocale(article.key, "vi", "news")),
      },
    },
    openGraph: {
      type: "article",
      title: `${article.title} | ${brand.brandName}`,
      description,
      images: article.images[0] ? [media(article.images[0])] : undefined,
    },
  }
}

export default async function NewsDetailPage({ params }: Params) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, news } = content(locale)

  const article = findArticle(locale, slug, "news")
  if (!article) notFound()

  const others = news.filter((a) => a.key !== article.key).slice(0, 4)

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.images.map((i) => media(i)),
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: brand.legalName,
      logo: { "@type": "ImageObject", url: media(brand.identity.logo_header) },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        locale={locale}
        eyebrow={t.news.title}
        title={article.title}
        image={article.banner || brand.identity.page_banners[3]}
        crumbs={[{ label: t.news.title, href: path(locale, "tin-tuc") }, { label: article.title }]}
      />

      <section className="container-brand py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <article>
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line pb-5 text-xs text-ink-soft">
              {article.date && (
                <span className="flex items-center gap-1.5">
                  <IconClock className="size-3.5" />
                  {article.date}
                </span>
              )}
              {article.views && (
                <span className="flex items-center gap-1.5">
                  <IconEye className="size-3.5" />
                  {article.views} {t.common.views}
                </span>
              )}
            </div>

            <ArticleBody article={article} locale={locale} />
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="eyebrow text-navy-500">{t.news.otherArticles}</h2>
            <span className="mt-4 mb-5 block h-px w-8 bg-brand-gold" />

            <ul className="flex flex-col gap-5">
              {others.map((a) => (
                <li key={a.slug}>
                  <Link href={path(locale, "tin-tuc", a.slug)} className="group flex gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden bg-shell">
                      <Image
                        src={media(a.images[0] || a.banner)}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.14em] text-ink-soft/70 uppercase">
                        {a.date}
                      </p>
                      <h3 className="mt-1.5 text-sm leading-snug font-medium text-ink transition-colors group-hover:text-brand-red">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-navy-500 p-6 text-white">
              <p className="eyebrow text-brand-gold">{t.news.sidebarEyebrow}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {t.news.sidebarLeadStart}
                <Link href={path(locale, "san-pham")} className="text-brand-gold underline">
                  {t.news.sidebarLeadLink}
                </Link>
                {t.news.sidebarLeadEnd(brand.hotline)}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
