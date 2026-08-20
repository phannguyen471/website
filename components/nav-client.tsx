"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { LBrand } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { cn, media } from "@/lib/utils"
import { IconMail, IconPhone } from "@/components/icons"
import LanguageSwitcher from "@/components/language-switcher"

type Props = {
  locale: Locale
  brand: LBrand
}

/**
 * Nav phẳng, không mega menu — theo đúng cách macv.com.vn làm: "Products"
 * chỉ là một link bình thường, mọi phân loại nhóm/danh mục nằm hẳn trong
 * trang /san-pham (xem components/product-browser.tsx), không phải ở dropdown
 * hover trên thanh điều hướng.
 */
export default function NavClient({ locale, brand }: Props) {
  const t = dict(locale)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: path(locale, "gioi-thieu"), label: t.nav.links.about },
    { href: path(locale, "san-pham"), label: t.nav.links.products },
    { href: path(locale, "uu-dai"), label: t.nav.links.promotions },
    { href: path(locale, "tin-tuc"), label: t.nav.links.news },
    { href: path(locale, "lien-he"), label: t.nav.links.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Đóng drawer khi chuyển trang
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Khoá scroll nền khi drawer mở
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Thanh tiện ích: thu gọn khi cuộn ── */}
      <div
        className={cn(
          "hidden overflow-hidden border-b bg-navy-500 transition-all duration-300 md:block",
          scrolled ? "h-0 border-transparent opacity-0" : "h-10 border-navy-600 opacity-100",
        )}
      >
        <div className="container-brand flex h-10 items-center justify-between">
          <p className="text-[11px] tracking-[0.18em] text-white/70 uppercase">{brand.motto}</p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-1.5 text-xs text-white/80 transition-colors hover:text-brand-gold"
            >
              <IconMail className="size-3.5" />
              {brand.email}
            </a>
            <span className="h-3 w-px bg-white/25" />
            <a
              href={`tel:${brand.hotline}`}
              className="flex items-center gap-1.5 text-xs text-white/80 transition-colors hover:text-brand-gold"
            >
              <IconPhone className="size-3.5" />
              {brand.hotline}
            </a>
            <span className="h-3 w-px bg-white/25" />
            <LanguageSwitcher locale={locale} tone="dark" label={t.nav.language} />
          </div>
        </div>
      </div>

      {/* ── Thanh điều hướng chính ── */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled ? "border-line bg-white/95 shadow-sm backdrop-blur-sm" : "border-line bg-white",
        )}
      >
        <div className="container-brand flex h-[68px] items-center justify-between gap-6">
          <Link
            href={path(locale)}
            className="flex shrink-0 items-center transition-opacity hover:opacity-75"
            aria-label={brand.brandName}
          >
            <Image
              src={media(brand.identity.logo_header)}
              alt={brand.brandName}
              width={150}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 py-6 text-[13px] tracking-[0.14em] uppercase transition-colors",
                    isActive(link.href)
                      ? "font-semibold text-navy-500"
                      : "text-ink-soft hover:text-navy-500",
                  )}
                >
                  {link.label}
                </Link>

                {/* Gạch chân active */}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-[2px] bg-brand-red transition-transform duration-300",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} label={t.nav.language} className="md:hidden" />
            <Link
              href={path(locale, "lien-he")}
              className="hidden rounded-[2px] bg-brand-red px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark md:block"
            >
              {t.nav.quote}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              className="flex flex-col gap-[5px] p-2 lg:hidden"
            >
              <span
                className={cn(
                  "block h-px w-6 origin-center bg-ink transition-all duration-300",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-ink transition-all duration-300",
                  open && "scale-x-0 opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 origin-center bg-ink transition-all duration-300",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Drawer mobile ── */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 bg-navy-900/50 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 flex h-dvh w-[86%] max-w-[340px] flex-col overflow-y-auto bg-white transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5">
          <Image
            src={media(brand.identity.logo_header)}
            alt={brand.brandName}
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.nav.closeMenu}
            className="p-2 text-2xl leading-none text-ink-soft"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col px-5 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-b border-line/70 py-4 text-sm tracking-[0.12em] uppercase",
                isActive(link.href) ? "font-semibold text-brand-red" : "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-line px-5 py-5">
          <a
            href={`tel:${brand.hotline}`}
            className="flex items-center gap-2 text-sm text-ink-soft"
          >
            <IconPhone className="size-4 text-brand-red" />
            {brand.hotline}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="flex items-center gap-2 text-sm break-all text-ink-soft"
          >
            <IconMail className="size-4 text-brand-red" />
            {brand.email}
          </a>
          <LanguageSwitcher locale={locale} label={t.nav.language} className="pt-1" />
          <Link
            href={path(locale, "lien-he")}
            className="mt-1 block rounded-[2px] bg-brand-red px-5 py-3 text-center text-[11px] font-semibold tracking-[0.16em] text-white uppercase"
          >
            {t.nav.quote}
          </Link>
        </div>
      </aside>
    </header>
  )
}
