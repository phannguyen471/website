import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LandingPage, { landingMetadata } from "@/components/landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ review?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return locale === "vi" ? landingMetadata("khong-det") : {}
}

/** Landing quảng cáo nhóm túi vải không dệt */
export default async function NonWovenLandingPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale !== "vi") notFound()
  return <LandingPage variantKey="khong-det" review={(await searchParams).review === "1"} />
}
