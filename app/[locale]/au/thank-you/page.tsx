import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { AU_THANK_YOU_PATH } from "@/lib/au-landing"
import ThankYou, { thankYouMetadata } from "@/components/thank-you"

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = thankYouMetadata("en", "au")

/** Trang cảm ơn landing Úc (tiếng Anh) — bắn conversion `generate_lead` như các landing khác */
export default async function AuThankYouPage({ params }: Props) {
  const { locale } = await params
  if (locale === "vi") redirect(AU_THANK_YOU_PATH.vi)
  if (locale !== "en") notFound()
  return <ThankYou locale="en" market="au" />
}
