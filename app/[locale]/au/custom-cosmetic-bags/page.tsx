import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { AU_COSMETIC_PATH } from "@/lib/au-landing"
import AuCosmeticPage, { auCosmeticMetadata } from "@/components/au-cosmetic-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ review?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return locale === "en" ? auCosmeticMetadata("en") : {}
}

/** Landing Úc túi mỹ phẩm, tiếng Anh; nút đổi ngôn ngữ đưa sang `/au/custom-cosmetic-bags` → chuyển về slug tiếng Việt */
export default async function AuCosmeticRoute({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale === "vi") redirect(AU_COSMETIC_PATH.vi)
  if (locale !== "en") notFound()
  return <AuCosmeticPage locale="en" review={(await searchParams).review === "1"} />
}
