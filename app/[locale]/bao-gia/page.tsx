import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { isLocale } from "@/lib/i18n"
import { landingPath, variantFor } from "@/lib/landing"
import LandingPage, { landingMetadata } from "@/components/landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

/** Tham số chọn nhóm: `nhom` (tiếng Việt, URL quảng cáo) hoặc `group` (tiếng Anh) */
const GROUP_KEYS = ["nhom", "group"]

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const query = await searchParams
  return landingMetadata(variantFor(query.nhom ?? query.group).key, locale)
}

/**
 * Landing chung (`/bao-gia`, `/en/quote`), nội dung đổi theo nhóm. Nhóm nào
 * đã có URL riêng thì chuyển hướng sang đó, giữ nguyên gclid / UTM / review.
 */
export default async function BaoGiaPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const query = await searchParams
  const { key } = variantFor(query.nhom ?? query.group)

  const own = landingPath(key, locale)
  if (!own.startsWith(locale === "en" ? "/en/quote" : "/bao-gia")) {
    const rest = new URLSearchParams(
      Object.entries(query).filter(
        (e): e is [string, string] => !GROUP_KEYS.includes(e[0]) && e[1] !== undefined,
      ),
    ).toString()
    permanentRedirect(rest ? `${own}?${rest}` : own)
  }

  return <LandingPage variantKey={key} locale={locale} review={query.review === "1"} />
}
