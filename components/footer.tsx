import Link from "next/link"
import Image from "next/image"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { path, productsPath } from "@/lib/routes"
import { media } from "@/lib/utils"
import { IconMail, IconPhone, IconPin } from "@/components/icons"

/**
 * Bố cục 4 cột kiểu macv.com.vn: thương hiệu, Company (trang tĩnh),
 * Products (danh mục), Get in Touch (liên hệ). Mục Dịch vụ đã gỡ khỏi
 * toàn site — không còn route, nav, hay dữ liệu nào được render ra.
 */
export default function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale)
  const { brand, groups } = content(locale)
  const year = new Date().getFullYear()

  const companyLinks = [
    { href: path(locale, "gioi-thieu"), label: t.nav.links.about },
    { href: path(locale, "uu-dai"), label: t.nav.links.promotions },
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
                src={media(brand.identity.logo_header)}
                alt={brand.brandName}
                width={150}
                height={50}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-[290px] text-sm leading-relaxed text-white/65">
              {brand.legalName}
            </p>
            <p className="eyebrow max-w-[290px] leading-relaxed text-brand-gold">{brand.motto}</p>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h3 className="eyebrow text-white">{t.footer.company}</h3>
            <span className="h-px w-8 bg-brand-gold" />
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="eyebrow text-white">{t.footer.products}</h3>
            <span className="h-px w-8 bg-brand-gold" />
            <ul className="flex flex-col gap-2.5">
              {groups.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={productsPath(locale, { group: g.slug })}
                    className="text-sm text-white/65 transition-colors hover:text-brand-gold"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={path(locale, "san-pham")}
                  className="text-sm text-brand-gold/90 transition-colors hover:text-brand-gold"
                >
                  {t.footer.viewAll}
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="eyebrow text-white">{t.footer.keepInTouch}</h3>
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
                  href={`tel:${brand.zaloPhone}`}
                  className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-brand-gold"
                >
                  <IconPhone className="size-4 shrink-0 text-brand-gold" />
                  {brand.zaloPhone}
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
        <div className="mt-14 border-t border-white/12 pt-7">
          <p className="text-xs text-white/50">
            © {year} {brand.legalName}. Design and Development by{" "}
            <a
              href="https://www.growthtrait.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-brand-gold"
            >
              Growthtrait
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
