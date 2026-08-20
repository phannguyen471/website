import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Be_Vietnam_Pro } from "next/font/google"
import Script from "next/script"
import "../globals.css"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import { htmlLang, isLocale, locales, ogLocale, type Locale } from "@/lib/i18n"
import { SITE, path } from "@/lib/routes"
import { robotsMeta } from "@/lib/seo"
import { media } from "@/lib/utils"

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
})

type Params = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale
  const t = dict(locale)
  const { brand } = content(locale)

  return {
    metadataBase: new URL(SITE),
    title: { default: t.meta.titleDefault, template: t.meta.titleTemplate },
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    authors: [{ name: brand.legalName }],
    openGraph: {
      type: "website",
      siteName: brand.legalName,
      locale: ogLocale[locale],
      url: SITE + path(locale),
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      images: [
        { url: media(brand.identity.hero_banner), width: 1200, height: 630, alt: brand.brandName },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.twitterDescription,
      images: [media(brand.identity.hero_banner)],
    },
    icons: {
      icon: media(brand.identity.logo_header),
      shortcut: media(brand.identity.logo_header),
      apple: media(brand.identity.logo_header),
    },
    alternates: {
      canonical: path(locale),
      languages: {
        vi: path("vi"),
        en: path("en"),
        "x-default": path("vi"),
      },
    },
    robots: robotsMeta,
  }
}

export default async function RootLayout({
  children,
  params,
}: { children: React.ReactNode } & Params) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const { brand } = content(locale)

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.legalName,
    alternateName: brand.brandName,
    url: SITE + path(locale),
    logo: SITE + media(brand.identity.logo_header),
    foundingDate: String(brand.founded),
    slogan: brand.motto,
    email: brand.email,
    telephone: brand.hotline,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.streetAddress,
      addressLocality: brand.locality,
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: brand.geo.lat,
      longitude: brand.geo.lng,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.hotline,
      email: brand.email,
      contactType: "sales",
      areaServed: "VN",
      availableLanguage: ["vi", "en"],
    },
  }

  return (
    <html lang={htmlLang[locale]} className={beVietnam.variable}>
      <body className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${brand.analytics.google_analytics}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${brand.analytics.google_analytics}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        <Nav locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <FloatingContact locale={locale} />
      </body>
    </html>
  )
}
