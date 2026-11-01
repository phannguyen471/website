import type { MetadataRoute } from "next"
import { AU_COSMETIC_PATH, AU_PATH } from "@/lib/au-landing"
import { content } from "@/lib/content"
import { locales, type Locale } from "@/lib/i18n"
import { SITE, absolute, path, type Section } from "@/lib/routes"

const STATIC_SECTIONS: {
  section?: Section
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}[] = [
  { changeFrequency: "weekly", priority: 1 },
  { section: "san-pham", changeFrequency: "weekly", priority: 0.9 },
  { section: "gioi-thieu", changeFrequency: "monthly", priority: 0.7 },
  { section: "uu-dai", changeFrequency: "weekly", priority: 0.7 },
  { section: "tin-tuc", changeFrequency: "weekly", priority: 0.6 },
  { section: "lien-he", changeFrequency: "yearly", priority: 0.6 },
]

const LANDING_SECTIONS: Section[] = ["tui-vai-in-logo", "tui-vai-khong-det-in-logo", "qua-tet-doanh-nghiep"]

/** Khối hreflang cho một trang, trỏ sang bản tương ứng ở ngôn ngữ kia */
function alternates(section: Section | undefined, key?: string) {
  const languages = Object.fromEntries(
    locales.map((l) => [
      l,
      SITE + path(l, section, key ? slugFor(l, section!, key) : undefined),
    ]),
  )
  return { languages }
}

function slugFor(locale: Locale, section: Section, key: string): string {
  const c = content(locale)
  if (section === "san-pham") return c.products.find((p) => p.key === key)?.slug ?? key
  if (section === "tin-tuc") return c.news.find((a) => a.key === key)?.slug ?? key
  return key
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const c = content(locale)

    for (const s of STATIC_SECTIONS) {
      entries.push({
        url: absolute(locale, s.section),
        lastModified: now,
        changeFrequency: s.changeFrequency,
        priority: s.priority,
        alternates: alternates(s.section),
      })
    }

    for (const p of c.products) {
      entries.push({
        url: absolute(locale, "san-pham", p.slug),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates("san-pham", p.key),
      })
    }

    // Landing quảng cáo có URL riêng (nhóm `/bao-gia?nhom=` dùng query nên không đưa vào)
    for (const section of LANDING_SECTIONS) {
      entries.push({
        url: absolute(locale, section),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates(section),
      })
    }

    for (const a of c.news) {
      entries.push({
        url: absolute(locale, "tin-tuc", a.slug),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: alternates("tin-tuc", a.key),
      })
    }
  }

  // Landing thị trường Úc: mỗi trang con có slug riêng theo ngôn ngữ
  for (const page of [AU_PATH, AU_COSMETIC_PATH]) {
    for (const locale of locales) {
      entries.push({
        url: SITE + page[locale],
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: { vi: SITE + page.vi, en: SITE + page.en } },
      })
    }
  }

  return entries
}
