import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { QUERY_KEYS, path } from "@/lib/routes"
import PageHeader from "@/components/page-header"
import ProductBrowser from "@/components/product-browser"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)

  return {
    title: t.products.metaTitle,
    description: t.products.metaDescription,
    alternates: {
      canonical: path(locale, "san-pham"),
      languages: {
        vi: path("vi", "san-pham"),
        en: path("en", "san-pham"),
        "x-default": path("vi", "san-pham"),
      },
    },
  }
}

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "")
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, groups, products } = content(locale)

  const sp = await searchParams
  const category = first(sp[QUERY_KEYS.category[locale]])
  const group = first(sp[QUERY_KEYS.group[locale]])

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.products.eyebrow(products.length)}
        title={t.products.title}
        lead={t.products.lead}
        image={brand.identity.page_banners[1]}
        crumbs={[{ label: t.products.title }]}
      />

      <ProductBrowser
        locale={locale}
        products={products}
        groups={groups}
        initialCategory={category}
        initialGroup={group}
      />
    </>
  )
}
