import Link from "next/link"
import Image from "next/image"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { media } from "@/lib/utils"

type Crumb = { label: string; href?: string }

type Props = {
  locale: Locale
  eyebrow?: string
  title: string
  lead?: string
  image?: string
  crumbs?: Crumb[]
}

/**
 * Header trang trong: banner ảnh phủ tối, nhãn nhỏ + tiêu đề lớn,
 * breadcrumb ngay dưới. Dùng chung cho mọi trang không phải trang chủ.
 */
export default function PageHeader({ locale, eyebrow, title, lead, image, crumbs }: Props) {
  const t = dict(locale)
  const bg = media(image || "assets/upload/photo/1-4614.jpg")

  return (
    <section className="relative isolate flex min-h-[300px] items-end overflow-hidden bg-navy-500 pt-[68px] md:min-h-[380px]">
      <Image src={bg} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/70 to-navy-500/30" />

      <div className="container-brand relative z-10 pt-12 pb-10 md:pt-16 md:pb-12">
        {eyebrow && <p className="eyebrow mb-4 text-brand-gold">{eyebrow}</p>}
        <h1 className="max-w-3xl font-display text-4xl leading-[1.1] font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 md:text-base">
            {lead}
          </p>
        )}

        {crumbs && crumbs.length > 0 && (
          <nav aria-label={t.common.breadcrumb} className="mt-7">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60">
              <li>
                <Link href={path(locale)} className="transition-colors hover:text-brand-gold">
                  {t.common.home}
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-white/30">
                    /
                  </span>
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-brand-gold">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  )
}
