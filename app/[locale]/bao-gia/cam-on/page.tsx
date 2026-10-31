import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { isLocale } from "@/lib/i18n"
import { THANK_YOU_PATH } from "@/lib/landing"
import ThankYou, { thankYouMetadata } from "@/components/thank-you"

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = thankYouMetadata("vi")

/** Trang cảm ơn tiếng Việt; nút đổi ngôn ngữ đưa sang `/en/quote/cam-on` → chuyển về slug tiếng Anh */
export default async function CamOnPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === "en") redirect(THANK_YOU_PATH.en)
  return <ThankYou locale="vi" />
}
