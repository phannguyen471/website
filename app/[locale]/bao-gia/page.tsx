import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { landingPath, variantFor } from "@/lib/landing"
import LandingPage, { landingMetadata } from "@/components/landing-page"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  if (locale !== "vi") return {}
  return landingMetadata(variantFor((await searchParams).nhom).key)
}

/**
 * Landing chung, nội dung đổi theo `?nhom=`. Nhóm nào đã có URL riêng thì
 * chuyển hướng sang đó, giữ nguyên gclid / UTM / review trên query string.
 */
export default async function BaoGiaPage({ params, searchParams }: Props) {
  const { locale } = await params
  if (locale !== "vi") notFound()
  const query = await searchParams
  const { key } = variantFor(query.nhom)

  const own = landingPath(key)
  if (!own.startsWith("/bao-gia")) {
    const rest = new URLSearchParams(
      Object.entries(query).filter((e): e is [string, string] => e[0] !== "nhom" && e[1] !== undefined),
    ).toString()
    permanentRedirect(rest ? `${own}?${rest}` : own)
  }

  return <LandingPage variantKey={key} review={query.review === "1"} />
}
