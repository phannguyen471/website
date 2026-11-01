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
  return locale === "vi" ? auCosmeticMetadata("vi") : {}
}

/** Landing Úc túi mỹ phẩm, tiếng Việt; nút đổi ngôn ngữ đưa sang `/en/au/tui-my-pham-in-logo` → chuyển về slug tiếng Anh */
export default async function AuCosmeticViRoute({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale === "en") redirect(AU_COSMETIC_PATH.en)
  if (locale !== "vi") notFound()
  return <AuCosmeticPage locale="vi" review={(await searchParams).review === "1"} />
}
