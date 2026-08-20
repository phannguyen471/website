import Link from "next/link"
import Image from "next/image"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { path, productsPath } from "@/lib/routes"
import { media } from "@/lib/utils"
import { IconMail, IconPhone, IconPin } from "@/components/icons"
import { IconFacebook, IconMessenger, IconZalo } from "@/components/brand-icons"
import LanguageSwitcher from "@/components/language-switcher"

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale)
  const { brand, groups, services } = content(locale)
  const year = new Date().getFullYear()

  const navLinks = [
    { href: path(locale, "gioi-thieu"), label: t.nav.links.about },
    { href: path(locale, "san-pham"), label: t.nav.links.products },
    { href: path(locale, "uu-dai"), label: t.nav.links.promotions },
    { href: path(locale, "dich-vu"), label: t.nav.links.services },
    { href: path(locale, "tin-tuc"), label: t.nav.links.news },
    { href: path(locale, "lien-he"), label: t.nav.links.contact },
  ]

  return (
    <footer className="mt-24 bg-navy-500 text-white">
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Cột thương hiệu */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link href={path(locale)} className="transition-opacity hover:opacity-80">
              <Image
                src={media(brand.identity.logo_footer)}
                alt={brand.brandName}
                width={170}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="max-w-[290px] text-sm leading-relaxed text-white/65">
              {brand.legalName}
            </p>
            <p className="eyebrow max-w-[290px] leading-relaxed text-brand-gold">{brand.motto}</p>
            <div className="mt-1 flex items-center gap-3">
              <a
                href={brand.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Facebook"
              >
                <IconFacebook className="size-9" />
              </a>
              <a
                href={brand.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Zalo"
              >
                <IconZalo className="size-9" />
              </a>
              <a
                href={brand.social.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Messenger"
              >
                <IconMessenger className="size-9" idSuffix="-footer" />
              </a>
            </div>
          </div>

          {/* Danh mục sản phẩm */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="eyebrow text-white">{t.footer.products}</h3>
            <span className="h-px w-8 bg-brand-gold" />
            <ul className="flex flex-col gap-2.5">
              {groups
                .flatMap((g) => g.children)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={productsPath(locale, { category: c.slug })}
                      className="text-sm text-white/65 transition-colors hover:text-brand-gold"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Dịch vụ + liên kết */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h3 className="eyebrow text-white">{t.footer.services}</h3>
            <span className="h-px w-8 bg-brand-gold" />
            <ul className="flex flex-col gap-2.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={path(locale, "dich-vu", s.slug)}
                    className="text-sm text-white/65 transition-colors hover:text-brand-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={path(locale, "dich-vu")}
                  className="text-sm text-brand-gold/90 transition-colors hover:text-brand-gold"
                >
                  {t.footer.viewAll}
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="eyebrow text-white">{t.footer.contact}</h3>
            <span className="h-px w-8 bg-brand-gold" />
            <ul className="flex flex-col gap-3.5">
              <li className="flex gap-2.5 text-sm leading-relaxed text-white/65">
                <IconPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                {brand.address}
              </li>
              <li>
                <a
                  href={`tel:${brand.hotline}`}
                  className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-brand-gold"
                >
                  <IconPhone className="size-4 shrink-0 text-brand-gold" />
                  {brand.hotline}
                </a>
              </li>
              <li>
                <a
                  href={brand.social.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-brand-gold"
                >
                  <IconPhone className="size-4 shrink-0 text-brand-gold" />
                  {t.common.zalo}: {brand.zaloPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="flex items-center gap-2.5 text-sm break-all text-white/65 transition-colors hover:text-brand-gold"
                >
                  <IconMail className="size-4 shrink-0 text-brand-gold" />
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Thanh dưới */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/12 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {year} {brand.legalName}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-white/50 transition-colors hover:text-brand-gold"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher locale={locale} tone="dark" label={t.nav.language} />
          </div>
        </div>
      </div>
    </footer>
  )
}
