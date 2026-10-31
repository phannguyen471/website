import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale } from "@/lib/i18n"
import { tetVariantFor } from "@/lib/tet-landing"
import TetLandingPage, { tetLandingMetadata } from "@/components/tet-landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ nhom?: string; group?: string; review?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { nhom, group } = await searchParams
  return tetLandingMetadata(tetVariantFor(nhom ?? group).key, locale)
}

/**
 * Landing quà Tết doanh nghiệp — `?nhom=khong-det | nhan-vien` đổi tiêu đề,
 * ảnh và sản phẩm chọn sẵn. Bản tiếng Anh dùng `?group=` (nút đổi ngôn ngữ
 * tự đổi tên tham số theo QUERY_KEYS).
 */
export default async function TetPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { nhom, group, review } = await searchParams
  return <TetLandingPage variantKey={tetVariantFor(nhom ?? group).key} locale={locale} review={review === "1"} />
}
