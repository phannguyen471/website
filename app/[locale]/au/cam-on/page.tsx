import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { AU_THANK_YOU_PATH } from "@/lib/au-landing"
import ThankYou, { thankYouMetadata } from "@/components/thank-you"

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = thankYouMetadata("vi", "au")

/** Trang cảm ơn landing Úc (tiếng Việt) */
export default async function AuCamOnPage({ params }: Props) {
  const { locale } = await params
  if (locale === "en") redirect(AU_THANK_YOU_PATH.en)
  if (locale !== "vi") notFound()
  return <ThankYou locale="vi" market="au" />
}
