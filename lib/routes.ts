import { defaultLocale, type Locale } from "@/lib/i18n"

/**
 * Bản đồ đường dẫn.
 *
 * `SEGMENTS` là nguồn sự thật duy nhất: mỗi khoá là tên thư mục route nội bộ
 * (tiếng Việt), giá trị là segment hiển thị trên URL của từng ngôn ngữ.
 * `middleware.ts` dùng bảng này để đổi `/en/products` → `/en/san-pham`.
 */
export const SEGMENTS = {
  "san-pham": { vi: "san-pham", en: "products" },
  "gioi-thieu": { vi: "gioi-thieu", en: "about" },
  "tin-tuc": { vi: "tin-tuc", en: "news" },
  "uu-dai": { vi: "uu-dai", en: "promotions" },
  "lien-he": { vi: "lien-he", en: "contact" },
  // Landing quảng cáo — không có trong nav/sitemap, chỉ cần map URL hai ngôn ngữ
  "bao-gia": { vi: "bao-gia", en: "quote" },
  "tui-vai-in-logo": { vi: "tui-vai-in-logo", en: "custom-logo-tote-bags" },
  "tui-vai-khong-det-in-logo": { vi: "tui-vai-khong-det-in-logo", en: "custom-non-woven-bags" },
  "qua-tet-doanh-nghiep": { vi: "qua-tet-doanh-nghiep", en: "corporate-tet-gifts" },
  // Landing thị trường Úc: trang con dùng slug riêng mỗi ngôn ngữ, mỗi thư mục tự chuyển hướng sang slug đúng
  au: { vi: "au", en: "au" },
} as const

export type Section = keyof typeof SEGMENTS

/** Tên tham số lọc trên query string, theo từng ngôn ngữ */
export const QUERY_KEYS = {
  category: { vi: "danh-muc", en: "category" },
  group: { vi: "nhom", en: "group" },
} as const

/** Segment công khai (tiếng Việt) → tên route nội bộ. Dùng để nhận dạng ngược. */
export const INTERNAL_BY_PUBLIC: Record<Locale, Record<string, Section>> = {
  vi: Object.fromEntries(
    Object.entries(SEGMENTS).map(([internal, m]) => [m.vi, internal as Section]),
  ),
  en: Object.fromEntries(
    Object.entries(SEGMENTS).map(([internal, m]) => [m.en, internal as Section]),
  ),
}

/**
 * Dựng URL công khai.
 *
 *   path("vi", "san-pham")             → "/san-pham"
 *   path("en", "san-pham")             → "/en/products"
 *   path("en", "san-pham", "tank-top") → "/en/products/tank-top"
 */
export function path(locale: Locale, section?: Section, slug?: string): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`
  if (!section) return prefix || "/"
  const segment = SEGMENTS[section][locale]
  return slug ? `${prefix}/${segment}/${slug}` : `${prefix}/${segment}`
}

/** URL trang sản phẩm kèm bộ lọc danh mục hoặc nhóm */
export function productsPath(
  locale: Locale,
  filter?: { category?: string; group?: string },
): string {
  const base = path(locale, "san-pham")
  if (filter?.category) return `${base}?${QUERY_KEYS.category[locale]}=${filter.category}`
  if (filter?.group) return `${base}?${QUERY_KEYS.group[locale]}=${filter.group}`
  return base
}

/** Địa chỉ tuyệt đối, dùng cho sitemap / canonical / hreflang */
export const SITE = "https://phannguyenbags.vn"

export function absolute(locale: Locale, section?: Section, slug?: string): string {
  return SITE + path(locale, section, slug)
}
