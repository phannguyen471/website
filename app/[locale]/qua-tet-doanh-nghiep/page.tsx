import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { tetVariantFor } from "@/lib/tet-landing"
import TetLandingPage, { tetLandingMetadata } from "@/components/tet-landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ nhom?: string; review?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== "vi") return {}
  return tetLandingMetadata(tetVariantFor((await searchParams).nhom).key)
}

/** Landing quà Tết doanh nghiệp — `?nhom=khong-det | nhan-vien` đổi tiêu đề, ảnh và sản phẩm chọn sẵn */
export default async function TetPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale !== "vi") notFound()
  const { nhom, review } = await searchParams
  return <TetLandingPage variantKey={tetVariantFor(nhom).key} review={review === "1"} />
}
