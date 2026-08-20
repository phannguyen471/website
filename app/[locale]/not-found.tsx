import Link from "next/link"
import { headers } from "next/headers"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { IconArrowRight } from "@/components/icons"

/**
 * `not-found.tsx` không nhận được params, nên ngôn ngữ đọc từ header
 * `x-locale` do middleware gắn vào.
 */
export default async function NotFound() {
  const header = (await headers()).get("x-locale") ?? defaultLocale
  const locale: Locale = isLocale(header) ? header : defaultLocale
  const t = dict(locale)
  const { brand } = content(locale)

  return (
    <section className="container-brand flex min-h-[70vh] flex-col justify-center py-24 pt-[140px]">
      <p className="eyebrow text-brand-red">{t.notFound.eyebrow}</p>
      <h1 className="mt-5 font-display text-4xl leading-tight font-bold text-navy-500 md:text-6xl">
        {t.notFound.title}
      </h1>
      <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft">{t.notFound.lead}</p>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href={path(locale)}
          className="group flex items-center gap-2.5 rounded-[2px] bg-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-navy-600"
        >
          {t.notFound.home}
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href={path(locale, "san-pham")}
          className="rounded-[2px] border border-navy-500 px-7 py-4 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
        >
          {t.notFound.products}
        </Link>
      </div>

      <p className="mt-10 text-sm text-ink-soft">
        {t.notFound.help}
        <a
          href={`tel:${brand.hotline}`}
          className="font-semibold text-brand-red hover:underline"
        >
          {brand.hotline}
        </a>
      </p>
    </section>
  )
}
