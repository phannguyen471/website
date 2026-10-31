import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale } from "@/lib/i18n"
import LandingPage, { landingMetadata } from "@/components/landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ review?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? landingMetadata("khong-det", locale) : {}
}

/** Landing quảng cáo nhóm túi vải không dệt — `/tui-vai-khong-det-in-logo`, `/en/custom-non-woven-bags` */
export default async function NonWovenLandingPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <LandingPage variantKey="khong-det" locale={locale} review={(await searchParams).review === "1"} />
}
