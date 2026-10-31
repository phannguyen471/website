import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { isLocale } from "@/lib/i18n"
import { THANK_YOU_PATH } from "@/lib/landing"
import ThankYou, { thankYouMetadata } from "@/components/thank-you"

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = thankYouMetadata("en")

/** Trang cảm ơn tiếng Anh; nút đổi ngôn ngữ đưa sang `/bao-gia/thank-you` → chuyển về slug tiếng Việt */
export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === "vi") redirect(THANK_YOU_PATH.vi)
  return <ThankYou locale="en" />
}
