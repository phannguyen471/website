import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ThankYou, { thankYouMetadata } from "@/components/thank-you"

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = thankYouMetadata("en", "au")

/** Trang cảm ơn của landing Úc — bắn conversion `generate_lead` như các landing khác */
export default async function AuThankYouPage({ params }: Props) {
  const { locale } = await params
  if (locale !== "en") notFound()
  return <ThankYou locale="en" market="au" />
}
