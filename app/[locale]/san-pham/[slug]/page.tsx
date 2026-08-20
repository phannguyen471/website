import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  content,
  findProduct,
  isQuotePrice,
  localizePrice,
  relatedProducts,
  slugInLocale,
} from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, locales, type Locale } from "@/lib/i18n"
import { path, productsPath } from "@/lib/routes"
import { media } from "@/lib/utils"
import ProductGallery from "@/components/product-gallery"
import ProductCard from "@/components/product-card"
import QuoteForm from "@/components/quote-form"
import { IconArrowRight, IconPhone, IconShield, IconSparkle, IconTruck } from "@/components/icons"

const PROMISE_ICONS = [IconSparkle, IconShield, IconTruck]

type Params = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    content(locale).products.map((p) => ({ locale, slug: p.slug })),
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)
  const { brand } = content(locale)

  const product = findProduct(locale, slug)
  if (!product) return { title: t.product.notFound }

  const description = t.product.metaDescription(product.name, product.category, brand.hotline)

  return {
    title: product.name,
    description,
    alternates: {
      canonical: path(locale, "san-pham", product.slug),
      languages: {
        vi: path("vi", "san-pham", slugInLocale(product.key, "vi", "product")),
        en: path("en", "san-pham", slugInLocale(product.key, "en", "product")),
        "x-default": path("vi", "san-pham", slugInLocale(product.key, "vi", "product")),
      },
    },
    openGraph: {
      title: `${product.name} | ${brand.brandName}`,
      description,
      images: product.images.length ? [media(product.images[0])] : undefined,
    },
  }
}

export default async function ProductPage({ params }: Params) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, groups, promotions } = content(locale)

  const product = findProduct(locale, slug)
  if (!product) notFound()

  const promo = promotions.find((p) => p.key === product.key)
  const quote = isQuotePrice(product.price)
  const related = relatedProducts(locale, product, 4)

  const group = groups.find((g) => g.slug === product.groupSlug)
  const category = group?.children.find((c) => c.slug === product.categorySlug)

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => media(i)),
    description:
      product.description || t.product.schemaDescription(product.name, product.category),
    category: product.category,
    brand: { "@type": "Brand", name: brand.brandName },
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      price: quote ? "0" : product.price.replace(/[^\d]/g, ""),
      seller: { "@type": "Organization", name: brand.legalName },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-shell pt-[68px]">
        <nav aria-label={t.common.breadcrumb} className="container-brand py-4">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
            <li>
              <Link href={path(locale)} className="transition-colors hover:text-brand-red">
                {t.common.home}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="opacity-40">/</span>
              <Link
                href={path(locale, "san-pham")}
                className="transition-colors hover:text-brand-red"
              >
                {t.products.title}
              </Link>
            </li>
            {group && (
              <li className="flex items-center gap-2">
                <span className="opacity-40">/</span>
                <Link
                  href={productsPath(locale, { group: group.slug })}
                  className="transition-colors hover:text-brand-red"
                >
                  {group.name}
                </Link>
              </li>
            )}
            {category && (
              <li className="flex items-center gap-2">
                <span className="opacity-40">/</span>
                <Link
                  href={productsPath(locale, { category: category.slug })}
                  className="transition-colors hover:text-brand-red"
                >
                  {category.name}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-2">
              <span className="opacity-40">/</span>
              <span className="text-ink">{product.name}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Gallery + thông tin */}
      <section className="container-brand py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <ProductGallery images={product.images} alt={product.name} locale={locale} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-brand-red">{product.category}</p>
            <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
              {product.name}
            </h1>

            {/* Giá */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3 border-y border-line py-5">
              <span className="font-display text-3xl font-bold text-brand-red">
                {promo ? promo.priceNew : localizePrice(product.price, locale)}
              </span>
              {promo?.priceOld && (
                <>
                  <span className="text-base text-ink-soft line-through">{promo.priceOld}</span>
                  <span className="rounded-[2px] bg-brand-red px-2 py-0.5 text-[11px] font-bold text-white">
                    {promo.discount}
                  </span>
                </>
              )}
              {quote && !promo && (
                <span className="text-sm text-ink-soft">{t.product.quoteHint}</span>
              )}
            </div>

            {product.description && (
              <div className="prose-brand mt-6 whitespace-pre-line text-[15px]">
                {product.description}
              </div>
            )}

            {/* Thuộc tính */}
            {Object.keys(product.attributes).length > 0 && (
              <dl className="mt-6 flex flex-col gap-2.5">
                {Object.entries(product.attributes).map(([k, v]) => (
                  <div key={k} className="flex gap-3 text-sm">
                    <dt className="w-28 shrink-0 text-ink-soft">{k}</dt>
                    <dd className="text-ink">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${brand.hotline}`}
                className="flex items-center gap-2.5 rounded-[2px] bg-brand-red px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark"
              >
                <IconPhone className="size-4" />
                {brand.hotline}
              </a>
              <a
                href={brand.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] border border-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
              >
                {t.product.chatZalo}
              </a>
            </div>

            {/* Cam kết */}
            <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
              {t.product.promises.map((promise, i) => {
                const Icon = PROMISE_ICONS[i] ?? IconSparkle
                return (
                  <li key={promise} className="flex flex-col gap-2.5 bg-white p-4">
                    <Icon className="size-5 text-navy-500" />
                    <span className="text-xs leading-snug text-ink-soft">{promise}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Form báo giá */}
      <section className="border-y border-line bg-shell py-16 lg:py-20">
        <div className="container-brand grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">{t.product.quoteEyebrow}</p>
            <h2 className="mt-4 font-display text-2xl leading-tight font-bold text-navy-500 lg:text-3xl">
              {t.product.quoteTitleTop}
              <br />
              {product.name}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{t.product.quoteLead}</p>
          </div>
          <div className="border border-line bg-white p-6 lg:p-8">
            <QuoteForm locale={locale} defaultSubject={t.product.quoteSubject(product.name)} />
          </div>
        </div>
      </section>

      {/* Sản phẩm liên quan */}
      {related.length > 0 && (
        <section className="container-brand py-16 lg:py-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-brand-red">{t.product.relatedEyebrow}</p>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy-500 lg:text-3xl">
                {t.product.relatedTitle}
              </h2>
            </div>
            {category && (
              <Link
                href={productsPath(locale, { category: category.slug })}
                className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:text-brand-red"
              >
                {t.product.relatedCta(category.name)}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
