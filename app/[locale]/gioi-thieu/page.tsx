import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { media } from "@/lib/utils"
import { CLIENT_LOGOS } from "@/lib/client-logos"
import PageHeader from "@/components/page-header"
import { IconArrowRight, IconFactory, IconGlobe, IconSparkle, IconTag } from "@/components/icons"

const PILLAR_ICONS = [IconSparkle, IconFactory, IconTag, IconGlobe]

const SHOWROOM_PHOTOS = [
  "xuong-mau-tong-quan.webp",
  "xuong-mau-tui-tote-can.webp",
  "xuong-mau-balo-tui.webp",
  "xuong-mau-dong-phuc-non.webp",
]

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)

  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    alternates: {
      canonical: path(locale, "gioi-thieu"),
      languages: {
        vi: path("vi", "gioi-thieu"),
        en: path("en", "gioi-thieu"),
        "x-default": path("vi", "gioi-thieu"),
      },
    },
    openGraph: {
      title: t.about.metaTitle,
      description: t.about.metaDescription,
      images: ["/clients/banner-aboutus.webp"],
    },
  }
}

export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, products } = content(locale)

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lead={brand.motto}
        image="/clients/banner-aboutus.webp"
        crumbs={[{ label: t.about.metaTitle }]}
      />

      {/* Câu chuyện thương hiệu */}
      <section className="container-brand py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">{t.about.storyEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
              {t.about.storyTitle}
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-[15px] leading-[1.9] text-ink-soft md:text-base">
              {t.about.story.map((paragraph, i) => (
                <p key={i}>{paragraph(brand.founded)}</p>
              ))}
            </div>

            {/* 4 trụ cột */}
            <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {t.home.pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i] ?? IconSparkle
                return (
                  <li key={pillar.title} className="flex flex-col gap-3 bg-white p-5">
                    <Icon className="size-6 text-brand-red" />
                    <span className="text-sm leading-snug font-medium text-navy-500">
                      {pillar.title}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-shell">
              <video
                controls
                preload="metadata"
                poster="/media/videos/video-phannguyen-poster.webp"
                className="absolute inset-0 size-full object-cover"
              >
                <source src="/media/videos/video-phannguyen.mp4" type="video/mp4" />
                {t.common.videoUnsupported}
              </video>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-line">
              {[
                { n: brand.founded, l: t.home.stats.founded },
                { n: "10+", l: t.home.stats.experience },
                { n: products.length, l: t.home.stats.products },
                { n: brand.clients.length, l: t.home.stats.clients },
              ].map((s) => (
                <div key={s.l} className="bg-white p-5">
                  <dt className="font-display text-2xl font-bold text-navy-500">{s.n}</dt>
                  <dd className="mt-1 text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Khách hàng */}
      <section className="border-y border-line bg-white py-16 lg:py-20">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-red">{t.about.clientsEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
              {t.about.clientsTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {t.about.clientsLead(brand.motto)}
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-10">
            {brand.clients.map((c) => {
              const logo = CLIENT_LOGOS[c]
              return (
                <li key={c} className="flex items-center">
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={c}
                      width={logo.width}
                      height={logo.height}
                      className="h-14 w-auto max-w-[190px] object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold tracking-wide text-ink-soft transition-colors hover:text-navy-500">
                      {c}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Quy trình */}
      <section className="container-brand py-16 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-brand-red">{t.about.processEyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
            {t.about.processTitle}
          </h2>
        </div>

        <ol className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {brand.process.map((s) => (
            <li key={s.step} className="bg-white p-7">
              <span className="eyebrow text-brand-gold">{t.about.step(s.step)}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-500">{s.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Giấy chứng nhận */}
      <section className="border-t border-line bg-shell py-16 lg:py-20">
        <div className="container-brand grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow text-brand-red">{t.about.legalEyebrow}</p>
            <h2 className="mt-4 font-display text-2xl leading-tight font-bold text-navy-500 lg:text-3xl">
              {brand.legalName}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {t.about.legalLead(brand.address)}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {t.about.legalCert}
            </p>
            <Link
              href={path(locale, "lien-he")}
              className="group mt-8 inline-flex items-center gap-2 rounded-[2px] bg-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
            >
              {t.about.legalCta}
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-line bg-white">
            <Image
              src={media(brand.identity.certificate)}
              alt={t.about.certificateAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* Kho mẫu thực tế — ảnh chụp thật tại xưởng, nối tiếp phần Pháp lý để
          củng cố niềm tin: đây là nhà sản xuất có hàng thật, không chỉ catalogue. */}
      <section className="border-t border-line bg-white py-16 lg:py-24">
        <div className="container-brand">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-red">{t.about.showroomEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 lg:text-4xl">
              {t.about.showroomTitle}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {t.about.showroomLead}
            </p>
          </div>

          <div className="no-scrollbar -mx-6 mt-10 flex snap-x snap-mandatory gap-px overflow-x-auto border-y border-line bg-line px-6 pb-px sm:mx-0 sm:grid sm:grid-cols-4 sm:snap-none sm:px-0">
            {SHOWROOM_PHOTOS.map((file, i) => (
              <figure
                key={file}
                className="group relative aspect-[3/4] w-[74%] shrink-0 snap-center overflow-hidden bg-shell sm:w-auto sm:shrink"
              >
                <Image
                  src={`/gioi-thieu/${file}`}
                  alt={t.about.showroomPhotos[i]}
                  fill
                  sizes="(min-width: 640px) 25vw, 74vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 to-transparent px-4 pt-12 pb-4">
                  <span className="text-[11px] leading-snug font-semibold tracking-[0.1em] text-white uppercase">
                    {t.about.showroomPhotos[i]}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
