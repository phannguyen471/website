import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale } from "@/lib/i18n"
import { auVariantFor } from "@/lib/au-landing"
import AuLandingPage, { auLandingMetadata } from "@/components/au-landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ grp?: string; review?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return auLandingMetadata(auVariantFor((await searchParams).grp).key, locale)
}

/** Landing thị trường Úc — `/en/au` (chạy quảng cáo) và bản tiếng Việt `/au` */
export default async function AuPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { grp, review } = await searchParams
  return <AuLandingPage variantKey={auVariantFor(grp).key} locale={locale} review={review === "1"} />
}
