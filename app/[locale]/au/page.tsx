import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { auVariantFor } from "@/lib/au-landing"
import AuLandingPage, { auLandingMetadata } from "@/components/au-landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ grp?: string; review?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== "en") return {}
  return auLandingMetadata(auVariantFor((await searchParams).grp).key)
}

/**
 * Landing thị trường Úc `/en/au` — chỉ tiếng Anh nên `/au` trả 404, và nút
 * đổi ngôn ngữ đưa khách về trang chủ tiếng Việt (không có segment trong
 * lib/routes.ts).
 */
export default async function AuPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale !== "en") notFound()
  const { grp, review } = await searchParams
  return <AuLandingPage variantKey={auVariantFor(grp).key} review={review === "1"} />
}
