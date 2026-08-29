import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import PageHeader from "@/components/page-header"
import QuoteForm from "@/components/quote-form"
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/icons"

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)
  const { brand } = content(locale)

  return {
    title: t.contact.metaTitle,
    description: t.contact.metaDescription(brand.locality, brand.hotline),
    alternates: {
      canonical: path(locale, "lien-he"),
      languages: {
        vi: path("vi", "lien-he"),
        en: path("en", "lien-he"),
        "x-default": path("vi", "lien-he"),
      },
    },
  }
}

const MAP_QUERY = encodeURIComponent("471/25/2 Phạm Văn Bạch, Phường 15, Tân Bình, Hồ Chí Minh")

export default async function ContactPage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand } = content(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lead={t.contact.lead}
        image="/clients/lienhe.webp"
        crumbs={[{ label: t.contact.metaTitle }]}
      />

      <section className="container-brand py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Thông tin liên hệ */}
          <div>
            <p className="eyebrow text-brand-red">{t.contact.infoEyebrow}</p>
            <h2 className="mt-4 font-display text-2xl leading-tight font-bold text-navy-500 lg:text-3xl">
              {brand.legalName}
            </h2>

            <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
              <li className="flex gap-4 py-5">
                <IconPin className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <div>
                  <p className="eyebrow text-ink-soft">{t.common.address}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{brand.address}</p>
                </div>
              </li>

              <li className="flex gap-4 py-5">
                <IconPhone className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <div>
                  <p className="eyebrow text-ink-soft">{t.common.hotline}</p>
                  <a
                    href={`tel:${brand.hotline}`}
                    className="mt-1.5 block text-[15px] font-semibold text-ink transition-colors hover:text-brand-red"
                  >
                    {brand.hotline}
                  </a>
                  <a
                    href={brand.social.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-ink-soft transition-colors hover:text-brand-red"
                  >
                    {t.common.zalo}: {brand.zaloPhone}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 py-5">
                <IconMail className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <div>
                  <p className="eyebrow text-ink-soft">{t.common.email}</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1.5 block text-[15px] break-all text-ink transition-colors hover:text-brand-red"
                  >
                    {brand.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 py-5">
                <IconClock className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <div>
                  <p className="eyebrow text-ink-soft">{t.contact.hours}</p>
                  <p className="mt-1.5 text-[15px] text-ink">{t.contact.hoursValue}</p>
                </div>
              </li>
            </ul>

            {/* Bản đồ */}
            <div className="mt-8 aspect-[4/3] overflow-hidden border border-line">
              <iframe
                title={t.contact.mapTitle}
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="border border-line bg-white p-6 lg:p-10">
            <p className="eyebrow text-brand-red">{t.contact.formEyebrow}</p>
            <h2 className="mt-4 mb-8 font-display text-2xl leading-tight font-bold text-navy-500 lg:text-3xl">
              {t.contact.formTitle}
            </h2>
            <QuoteForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  )
}
