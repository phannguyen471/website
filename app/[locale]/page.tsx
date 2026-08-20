import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { content, featuredProducts } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { isLocale, type Locale } from "@/lib/i18n"
import { path, productsPath } from "@/lib/routes"
import { media } from "@/lib/utils"
import ProductCard from "@/components/product-card"
import ClientMarquee from "@/components/client-marquee"
import {
  IconArrowRight,
  IconArrowUpRight,
  IconChat,
  IconFactory,
  IconGlobe,
  IconMail,
  IconPhone,
  IconPin,
  IconSparkle,
  IconTag,
} from "@/components/icons"

const PILLAR_ICONS = [IconSparkle, IconFactory, IconTag, IconGlobe]

type Params = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const t = dict(locale)
  const { brand, groups, products, promotions, news } = content(locale)

  const featured = featuredProducts(locale, 8)
  const latestNews = news.slice(0, 3)

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — chia đôi: chữ bên trái, ảnh bên phải
          ═══════════════════════════════════════════════════════════ */}
      <section className="pt-[68px]">
        <div className="grid lg:grid-cols-[1.05fr_1fr] xl:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-24 xl:px-20">
            <p className="eyebrow text-brand-red">
              {t.home.heroEyebrow(brand.founded, brand.placename)}
            </p>

            <h1 className="mt-6 font-display text-[2.75rem] leading-[1.06] font-bold text-navy-500 md:text-6xl xl:text-7xl">
              {t.home.heroTitleTop}
              <br />
              <span className="text-brand-red">{t.home.heroTitleBottom}</span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-ink-soft md:text-base">
              {t.home.heroLead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={path(locale, "san-pham")}
                className="group flex items-center gap-2.5 rounded-[2px] bg-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
              >
                {t.home.heroCtaProducts}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={path(locale, "lien-he")}
                className="rounded-[2px] border border-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
              >
                {t.common.quote}
              </Link>
            </div>

            {/* Số liệu */}
            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-9 sm:grid-cols-4">
              {[
                { n: brand.founded, l: t.home.stats.founded },
                { n: "10+", l: t.home.stats.experience },
                { n: products.length, l: t.home.stats.products },
                { n: brand.clients.length, l: t.home.stats.clients },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-bold text-navy-500 md:text-4xl">
                    {s.n}
                  </dt>
                  <dd className="mt-1.5 text-[11px] tracking-[0.14em] text-ink-soft uppercase">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Ảnh hero */}
          <div className="relative min-h-[340px] lg:min-h-[640px]">
            <Image
              src="/clients/homepage-phannguyen.png"
              alt={t.home.heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 border border-white/25 bg-navy-900/70 p-5 backdrop-blur-sm lg:inset-x-10 lg:bottom-10 lg:max-w-sm">
              <p className="eyebrow text-brand-gold">{t.home.mottoLabel}</p>
              <p className="mt-3 font-display text-lg leading-snug font-bold text-white">
                {brand.motto}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dải khách hàng */}
      <ClientMarquee locale={locale} />

      {/* ═══════════════════════════════════════════════════════════
          HAI NHÓM SẢN PHẨM
          ═══════════════════════════════════════════════════════════ */}
      <section className="container-brand py-20 lg:py-28">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand-red">{t.home.categoriesEyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
              {t.home.categoriesTitle}
            </h2>
          </div>
          <Link
            href={path(locale, "san-pham")}
            className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:text-brand-red"
          >
            {t.home.allProducts(products.length)}
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <Link
              key={group.slug}
              href={productsPath(locale, { group: group.slug })}
              className="group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden lg:min-h-[420px]"
            >
              <Image
                src={media(group.cover)}
                alt={group.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/35 to-transparent" />

              <div className="relative z-10 p-7 lg:p-8">
                <p className="eyebrow text-brand-gold">{t.common.productCount(group.count)}</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-white lg:text-4xl">
                  {group.name}
                </h3>

                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                  {group.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 border-b border-brand-gold pb-1 text-[11px] font-semibold tracking-[0.16em] text-brand-gold uppercase">
                  {t.home.explore}
                  <IconArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          KHỐI TỐI — 4 trụ cột theo phương châm
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-navy-500 py-20 text-white lg:py-28">
        <div className="container-brand">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-gold">{t.home.pillarsEyebrow}</p>
              <h2 className="mt-5 font-display text-3xl leading-tight font-bold md:text-4xl lg:text-[2.75rem]">
                {t.home.pillarsTitleTop}
                <br />
                {t.home.pillarsTitleBottom}
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.85] text-white/65">
                {t.home.pillarsLead}
              </p>
              <Link
                href={path(locale, "gioi-thieu")}
                className="group mt-8 inline-flex items-center gap-2 border-b border-brand-gold pb-1 text-[11px] font-semibold tracking-[0.16em] text-brand-gold uppercase"
              >
                {t.home.pillarsCta}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-px bg-white/12 sm:grid-cols-2">
              {t.home.pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i] ?? IconSparkle
                return (
                  <div key={pillar.title} className="bg-navy-500 p-7">
                    <Icon className="size-7 text-brand-gold" />
                    <h3 className="mt-5 font-display text-lg font-bold">{pillar.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/60">{pillar.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SẢN PHẨM TIÊU BIỂU
          ═══════════════════════════════════════════════════════════ */}
      <section className="container-brand py-20 lg:py-28">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand-red">{t.home.featuredEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
              {t.home.featuredTitle}
            </h2>
          </div>
          <Link
            href={path(locale, "san-pham")}
            className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:text-brand-red"
          >
            {t.home.viewAll}
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} priority={i < 4} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ƯU ĐÃI
          ═══════════════════════════════════════════════════════════ */}
      {promotions.length > 0 && (
        <section className="border-y border-line bg-shell py-20 lg:py-24">
          <div className="container-brand">
            <div className="mb-11 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-brand-red">{t.home.promoEyebrow}</p>
                <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
                  {t.home.promoTitle}
                </h2>
              </div>
              <Link
                href={path(locale, "uu-dai")}
                className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:text-brand-red"
              >
                {t.home.promoAll}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
              {promotions.map((p) => (
                <Link
                  key={p.slug}
                  href={path(locale, "san-pham", p.slug)}
                  className="group flex flex-col border border-line bg-white transition-colors hover:border-navy-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-shell">
                    <Image
                      src={media(p.image)}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.discount && (
                      <span className="absolute top-0 left-0 bg-brand-red px-2.5 py-1 text-[11px] font-bold text-white">
                        {p.discount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="text-[15px] leading-snug font-medium text-ink transition-colors group-hover:text-navy-500">
                      {p.name}
                    </h3>
                    <p className="mt-auto flex items-baseline gap-2 pt-1">
                      <span className="text-sm font-semibold text-brand-red">{p.priceNew}</span>
                      {p.priceOld && (
                        <span className="text-xs text-ink-soft line-through">{p.priceOld}</span>
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          QUY TRÌNH XỬ LÝ ĐƠN HÀNG
          ═══════════════════════════════════════════════════════════ */}
      <section className="container-brand py-20 lg:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow text-brand-red">{t.home.processEyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
            {t.home.processTitle}
          </h2>
        </div>

        <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {brand.process.map((step) => (
            <li key={step.step} className="group relative bg-white p-7 lg:p-8">
              <span className="font-display text-4xl leading-none font-bold text-line transition-colors group-hover:text-brand-gold">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-navy-500">{step.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TIN TỨC
          ═══════════════════════════════════════════════════════════ */}
      {latestNews.length > 0 && (
        <section className="container-brand py-20 lg:py-28">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-brand-red">{t.home.newsEyebrow}</p>
              <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-navy-500 md:text-4xl">
                {t.home.newsTitle}
              </h2>
            </div>
            <Link
              href={path(locale, "tin-tuc")}
              className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:text-brand-red"
            >
              {t.home.newsAll}
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestNews.map((a) => (
              <Link
                key={a.slug}
                href={path(locale, "tin-tuc", a.slug)}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-shell">
                  <Image
                    src={media(a.images[0] || a.banner)}
                    alt={a.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-5 text-ink-soft/70">{a.date}</p>
                <h3 className="mt-3 font-display text-lg leading-snug font-bold text-navy-500 transition-colors group-hover:text-brand-red">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          CTA CUỐI
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-navy-500 py-20 text-white lg:py-24">
        <div className="container-brand">
          <div className="grid gap-9 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow text-brand-gold">{t.home.ctaEyebrow}</p>
              <h2 className="mt-5 font-display text-3xl leading-[1.1] font-bold md:text-5xl">
                {t.home.ctaTitleTop}
                <br />
                {t.home.ctaTitleBottom}
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/65">
                {t.home.ctaLead}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={path(locale, "lien-he")}
                  className="rounded-[2px] bg-brand-red px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark"
                >
                  {t.common.quote}
                </Link>
                <a
                  href={`tel:${brand.hotline}`}
                  className="rounded-[2px] border border-white/30 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  {t.common.call(brand.hotline)}
                </a>
              </div>
            </div>

            <div className="border border-white/15 bg-navy-900/40 backdrop-blur-sm">
              {[
                {
                  label: t.common.address,
                  value: brand.address,
                  href: `https://www.google.com/maps?q=${brand.geo.lat},${brand.geo.lng}`,
                  external: true,
                  Icon: IconPin,
                },
                {
                  label: t.common.hotline,
                  value: brand.hotline,
                  href: `tel:${brand.hotline.replace(/\s/g, "")}`,
                  Icon: IconPhone,
                },
                {
                  label: t.common.zalo,
                  value: brand.zaloPhone,
                  href: brand.social.zalo,
                  external: true,
                  Icon: IconChat,
                },
                {
                  label: t.common.email,
                  value: brand.email,
                  href: `mailto:${brand.email}`,
                  Icon: IconMail,
                },
              ].map((x) => (
                <a
                  key={x.label}
                  href={x.href}
                  {...(x.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 border-b border-white/10 px-6 py-5 transition-colors last:border-b-0 hover:bg-white/5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold transition-colors group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-navy-500">
                    <x.Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-white/45">{x.label}</span>
                    <span className="mt-1 block text-[15px] leading-snug font-medium break-words text-white">
                      {x.value}
                    </span>
                  </span>
                  <IconArrowUpRight className="size-4 shrink-0 text-white/25 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-brand-gold" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
