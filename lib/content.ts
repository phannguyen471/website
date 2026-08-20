import enJson from "@/data/i18n/en.json"
import {
  brand as rawBrand,
  categoryGroups as rawGroups,
  categories as rawCategories,
  newsArticles as rawNews,
  products as rawProducts,
  promotions as rawPromotions,
  articleDate,
  articleViews,
  type Article,
  type Product,
} from "@/lib/data"
import { dict } from "@/lib/dictionary"
import { defaultLocale, type Locale } from "@/lib/i18n"

/* ══════════════════════════════════════════════════════════════════
   Kiểu dữ liệu đã dịch — mọi trang chỉ làm việc với các kiểu này,
   không đụng trực tiếp vào JSON gốc nữa.
   ══════════════════════════════════════════════════════════════════ */

export type LProduct = {
  /** Slug hiển thị trên URL của ngôn ngữ hiện tại */
  slug: string
  /** Slug gốc tiếng Việt — khoá ổn định để tra cứu chéo giữa hai bản */
  key: string
  name: string
  category: string
  categorySlug: string
  groupSlug: string
  price: string
  description: string
  attributes: Record<string, string>
  images: string[]
}

export type LCategory = { slug: string; key: string; name: string; count: number }

export type LGroup = {
  slug: string
  key: string
  name: string
  cover: string
  count: number
  children: LCategory[]
}

export type LArticle = {
  slug: string
  key: string
  title: string
  date: string
  views: string
  banner: string
  contentHtml: string
  contentText: string
  images: string[]
  videos: string[]
}

export type LPromotion = {
  slug: string
  key: string
  name: string
  image: string
  priceNew: string
  priceOld: string
  discount: string
}

export type LBrand = {
  legalName: string
  brandName: string
  motto: string
  tagline: string
  founded: number
  address: string
  streetAddress: string
  locality: string
  placename: string
  hotline: string
  zaloPhone: string
  email: string
  clients: string[]
  process: { step: number; name: string; desc: string }[]
  identity: typeof rawBrand.identity
  social: typeof rawBrand.social
  analytics: typeof rawBrand.analytics
  geo: typeof rawBrand.contact.geo
}

/* ══════════════════════════════════════════════════════════════════
   Giá tiền
   ══════════════════════════════════════════════════════════════════ */

/**
 * Giá gốc lưu dạng chuỗi tiếng Việt ("110.000đ" hoặc "Liên hệ").
 * Bản tiếng Anh dùng dấu phẩy phân cách nghìn và ký hiệu ₫.
 */
export function localizePrice(price: string | undefined, locale: Locale): string {
  const p = (price || "").trim()
  if (!p || !/\d/.test(p)) return dict(locale).common.contactPrice
  if (locale === defaultLocale) return p
  const digits = p.replace(/[^\d]/g, "")
  if (!digits) return p
  return `${Number(digits).toLocaleString("en-US")} ₫`
}

export function isQuotePrice(price: string | undefined): boolean {
  return !/\d/.test(price || "")
}

/* ══════════════════════════════════════════════════════════════════
   Dựng nội dung theo ngôn ngữ
   ══════════════════════════════════════════════════════════════════ */

const EN = enJson

/** Nhóm cấp 1 của một danh mục, suy từ cây danh mục gốc */
function groupKeyOfCategory(categoryName: string): string {
  const group = rawGroups.find((g) => g.children.some((c) => c.name === categoryName.trim()))
  return group?.slug ?? ""
}

function buildCategories(locale: Locale): LCategory[] {
  return rawCategories.map((c) => {
    const t = EN.categories[c.slug as keyof typeof EN.categories]
    return {
      key: c.slug,
      slug: locale === "en" && t ? t.slug : c.slug,
      name: locale === "en" && t ? t.name : c.name,
      count: c.products.length,
    }
  })
}

function buildGroups(locale: Locale, categories: LCategory[]): LGroup[] {
  return rawGroups.map((g) => {
    const t = EN.groups[g.slug as keyof typeof EN.groups]
    const children = g.children
      .map((c) => categories.find((lc) => lc.key === c.slug))
      .filter((c): c is LCategory => Boolean(c))
    return {
      key: g.slug,
      slug: locale === "en" && t ? t.slug : g.slug,
      name: locale === "en" && t ? t.name : g.name,
      cover: g.cover,
      count: g.count,
      children,
    }
  })
}

function buildProduct(
  p: Product,
  locale: Locale,
  categories: LCategory[],
  groups: LGroup[],
): LProduct {
  const t = EN.products[p.slug as keyof typeof EN.products] as
    | { slug: string; name: string; description?: string }
    | undefined
  const categoryName = p.category.trim()
  const rawCategory = rawCategories.find((c) => c.name === categoryName)
  const category = categories.find((c) => c.key === rawCategory?.slug)
  const attrLabels = dict(locale).product.attributes

  return {
    key: p.slug,
    slug: locale === "en" && t ? t.slug : p.slug,
    name: locale === "en" && t ? t.name : p.name.trim(),
    category: category?.name ?? categoryName,
    categorySlug: category?.slug ?? "",
    groupSlug:
      groups.find((g) => g.children.some((c) => c.key === category?.key))?.slug ??
      groupKeyOfCategory(categoryName),
    price: p.price,
    description: (locale === "en" ? (t?.description ?? "") : p.description) || "",
    attributes: Object.fromEntries(
      Object.entries(p.attributes)
        .filter(([k]) => k !== "Giá")
        .map(([k, v]) => [attrLabels[k] ?? k, v]),
    ),
    images: p.images_local,
  }
}

function buildArticle(a: Article, locale: Locale): LArticle {
  const t = EN.articles[a.slug as keyof typeof EN.articles]
  return {
    key: a.slug,
    slug: locale === "en" && t ? t.slug : a.slug,
    title: locale === "en" && t ? t.title : a.title.trim(),
    date: articleDate(a),
    views: articleViews(a),
    banner: a.banner_local,
    contentHtml: a.content_html,
    contentText: a.content_text,
    images: a.images_local,
    videos: a.videos_local,
  }
}

function buildBrand(locale: Locale): LBrand {
  const b = rawBrand
  const isEn = locale === "en"
  const e = EN.brand

  return {
    legalName: isEn ? e.legal_name : b.company.legal_name,
    brandName: isEn ? e.brand_name : b.company.brand_name,
    motto: isEn ? e.motto : b.company.motto,
    tagline: isEn ? e.tagline : b.company.tagline,
    founded: b.company.founded,
    address: isEn ? e.address : b.contact.address,
    streetAddress: isEn ? e.street_address : "471/25/2 Phạm Văn Bạch, Phường 15",
    locality: isEn ? e.locality : "Quận Tân Bình, Thành phố Hồ Chí Minh",
    placename: isEn ? e.placename : b.contact.geo.placename,
    hotline: b.contact.hotline,
    zaloPhone: b.contact.zalo_phone,
    email: b.contact.email,
    clients: b.clients.map((c) =>
      isEn ? ((e.clients as Record<string, string>)[c] ?? c) : c,
    ),
    process: b.process.map((s) => {
      const t = isEn ? (e.process as Record<string, { name: string; desc: string }>)[String(s.step)] : null
      return {
        step: s.step,
        name: t ? t.name : s.name,
        // Bước "GIAO HÀNG" không có mô tả trên site gốc — dùng câu mặc định
        desc: t
          ? t.desc
          : s.desc || "Đóng gói và giao hàng đúng tiến độ đã thống nhất trong hợp đồng.",
      }
    }),
    identity: b.identity,
    social: b.social,
    analytics: b.analytics,
    geo: b.contact.geo,
  }
}

/* ══════════════════════════════════════════════════════════════════
   API công khai — có cache theo ngôn ngữ vì dữ liệu là tĩnh
   ══════════════════════════════════════════════════════════════════ */

export type Content = {
  locale: Locale
  brand: LBrand
  categories: LCategory[]
  groups: LGroup[]
  products: LProduct[]
  promotions: LPromotion[]
  news: LArticle[]
}

const cache = new Map<Locale, Content>()

export function content(locale: Locale): Content {
  const hit = cache.get(locale)
  if (hit) return hit

  const categories = buildCategories(locale)
  const groups = buildGroups(locale, categories)
  const products = rawProducts.map((p) => buildProduct(p, locale, categories, groups))

  const built: Content = {
    locale,
    brand: buildBrand(locale),
    categories,
    groups,
    products,
    promotions: rawPromotions.map((p) => {
      const match = products.find((x) => x.key === p.slug)
      return {
        key: p.slug,
        slug: match?.slug ?? p.slug,
        name: match?.name ?? p.name,
        image: p.image,
        priceNew: localizePrice(p.price_new, locale),
        priceOld: localizePrice(p.price_old, locale),
        discount: p.discount,
      }
    }),
    news: rawNews.map((a) => buildArticle(a, locale)),
  }

  cache.set(locale, built)
  return built
}

/* ── Tra cứu ──────────────────────────────────────────────────────── */

/**
 * Tìm sản phẩm theo slug. Chấp nhận cả slug của ngôn ngữ hiện tại lẫn
 * slug gốc tiếng Việt, để link cũ hoặc link chép tay vẫn mở đúng trang.
 */
export function findProduct(locale: Locale, slug: string): LProduct | undefined {
  const list = content(locale).products
  return list.find((p) => p.slug === slug) ?? list.find((p) => p.key === slug)
}

export function findCategory(locale: Locale, slug: string): LCategory | undefined {
  const list = content(locale).categories
  return list.find((c) => c.slug === slug) ?? list.find((c) => c.key === slug)
}

export function findGroup(locale: Locale, slug: string): LGroup | undefined {
  const list = content(locale).groups
  return list.find((g) => g.slug === slug) ?? list.find((g) => g.key === slug)
}

export function findArticle(locale: Locale, slug: string): LArticle | undefined {
  const list = content(locale).news
  return list.find((a) => a.slug === slug) ?? list.find((a) => a.key === slug)
}

/** Sản phẩm cùng danh mục, loại chính nó ra */
export function relatedProducts(locale: Locale, product: LProduct, limit = 8): LProduct[] {
  return content(locale)
    .products.filter((p) => p.key !== product.key && p.categorySlug === product.categorySlug)
    .slice(0, limit)
}

/** Sản phẩm nổi bật: trộn đều các danh mục để lưới không bị lệch về một nhóm */
export function featuredProducts(locale: Locale, limit = 8): LProduct[] {
  const { products, categories } = content(locale)
  const buckets = categories.map((c) => products.filter((p) => p.categorySlug === c.slug))
  const out: LProduct[] = []
  let i = 0
  while (out.length < limit && buckets.some((b) => b[i])) {
    for (const b of buckets) {
      if (b[i] && out.length < limit) out.push(b[i])
    }
    i++
  }
  return out
}

/** Đường dẫn slug tương ứng ở ngôn ngữ kia — dùng cho hreflang & nút đổi ngôn ngữ */
export function slugInLocale(
  key: string,
  target: Locale,
  kind: "product" | "news" | "category" | "group",
): string {
  if (kind === "product") return content(target).products.find((p) => p.key === key)?.slug ?? key
  if (kind === "category") return content(target).categories.find((c) => c.key === key)?.slug ?? key
  if (kind === "group") return content(target).groups.find((g) => g.key === key)?.slug ?? key
  return content(target)[kind].find((a) => a.key === key)?.slug ?? key
}
