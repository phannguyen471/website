import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AuCosmeticPage, { auCosmeticMetadata } from "@/components/au-cosmetic-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ review?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return locale === "en" ? auCosmeticMetadata : {}
}

/** Landing Úc nhóm túi mỹ phẩm — chỉ tiếng Anh */
export default async function AuCosmeticRoute({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale !== "en") notFound()
  return <AuCosmeticPage review={(await searchParams).review === "1"} />
}
