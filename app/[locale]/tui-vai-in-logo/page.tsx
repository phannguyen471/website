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
  return isLocale(locale) ? landingMetadata("tui-vai", locale) : {}
}

/** Landing quảng cáo nhóm túi vải / canvas — `/tui-vai-in-logo`, `/en/custom-logo-tote-bags` */
export default async function CanvasLandingPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <LandingPage variantKey="tui-vai" locale={locale} review={(await searchParams).review === "1"} />
}
