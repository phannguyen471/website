import brandJson from "@/data/brand.json"
import productsJson from "@/data/products.json"
import categoriesJson from "@/data/categories.json"
import articlesJson from "@/data/news.json"
import promotionsJson from "@/data/promotions.json"

/* ══════════════════════════════════════════════════════════════════
   Kiểu dữ liệu
   ══════════════════════════════════════════════════════════════════ */

export type Brand = typeof brandJson

export type Product = {
  slug: string
  url: string
  name: string
  title_tag: string
  category_path: string[]
  category: string
  price: string
  attributes: Record<string, string>
  description: string
  images: string[]
  images_local: string[]
}

export type Category = {
  path: string[]
  name: string
  slug: string
  url: string
  products: { slug: string; name: string; price: string; image: string }[]
}

export type Article = {
  slug: string
  url: string
  title: string
  title_tag: string
  meta: string
  breadcrumb: string[]
  banner: string
  banner_local: string
  content_html: string
  content_text: string
  images: string[]
  images_local: string[]
  videos: string[]
  videos_local: string[]
}

export type Promotion = {
  slug: string
  name: string
  image: string
  price_new: string
  price_old: string
  discount: string
}

/* ══════════════════════════════════════════════════════════════════
   Dữ liệu
   ══════════════════════════════════════════════════════════════════ */

export const brand = brandJson
export const products = productsJson as Product[]
export const promotions = promotionsJson as Promotion[]

/**
 * Nhóm cấp 1. "Áo Nón các loại" của site gốc gộp chung áo và nón — hai loại
 * sản phẩm khác hẳn nhau — nên tách thành hai nhóm riêng: "Áo" và "Nón".
 */
export const GROUPS = ["Túi xách", "Áo", "Nón"] as const

/** Slug URL cho mỗi nhóm cấp 1 */
const GROUP_SLUG: Record<string, string> = {
  "Túi xách": "tui-xach",
  Áo: "ao",
  Nón: "non",
}

/** Ảnh đại diện cho mỗi nhóm cấp 1 (lấy từ chính sản phẩm của nhóm) */
const GROUP_COVER: Record<string, string> = {
  "Túi xách": "assets/upload/product/thiet-ke-chua-co-ten-14-4840.png",
  Áo: "assets/upload/product/0034a3edf76d57330e7c-6778.jpg",
  Nón: "assets/upload/product/e90888149175572b0e64-3921.jpg",
}

export const categories: Category[] = (categoriesJson as Category[]).map((c) => ({
  ...c,
  name: c.name.trim(),
}))

/** Cây danh mục 2 cấp dùng cho nav + trang sản phẩm */
export type CategoryGroup = {
  name: string
  slug: string
  cover: string
  count: number
  children: Category[]
}

export const categoryGroups: CategoryGroup[] = GROUPS.map((group) => {
  const children = categories.filter((c) => c.path[1]?.trim() === group)
  return {
    name: group,
    slug: GROUP_SLUG[group],
    cover: GROUP_COVER[group],
    count: children.reduce((n, c) => n + c.products.length, 0),
    children,
  }
})

/**
 * Tin tức: loại các bài "Dịch vụ" của site gốc (dịch thuật, dẫn khách hội
 * chợ...) — mục Dịch vụ không còn tồn tại trên site mới nên các bài này
 * vẫn nằm trong data/news.json nhưng không render ở đâu cả.
 */
const allArticles = articlesJson as Article[]

export const newsArticles: Article[] = allArticles.filter(
  (a) => !a.breadcrumb.some((b) => b.trim() === "Dịch vụ"),
)

/* ══════════════════════════════════════════════════════════════════
   Truy vấn
   ══════════════════════════════════════════════════════════════════ */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug)
}

export function productsInCategory(slug: string): Product[] {
  const cat = getCategory(slug)
  if (!cat) return []
  return products.filter((p) => p.category.trim() === cat.name)
}

export function productsInGroup(groupSlug: string): Product[] {
  const group = categoryGroups.find((g) => g.slug === groupSlug)
  if (!group) return []
  const names = group.children.map((c) => c.name)
  return products.filter((p) => names.includes(p.category.trim()))
}

/** Sản phẩm liên quan: cùng danh mục, loại chính nó ra */
export function relatedProducts(product: Product, limit = 8): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category.trim() === product.category.trim())
    .slice(0, limit)
}

/** Sản phẩm nổi bật trang chủ: trộn đều các danh mục để grid không bị lệch */
export function featuredProducts(limit = 8): Product[] {
  const buckets = categories.map((c) => products.filter((p) => p.category.trim() === c.name))
  const out: Product[] = []
  let i = 0
  while (out.length < limit && buckets.some((b) => b[i])) {
    for (const b of buckets) {
      if (b[i] && out.length < limit) out.push(b[i])
    }
    i++
  }
  return out
}

/** Ngày đăng dạng dd/mm/yyyy, lấy từ chuỗi meta của site gốc */
export function articleDate(a: Article): string {
  const m = a.meta.match(/(\d{2}\/\d{2}\/\d{4})/)
  return m ? m[1] : ""
}

/** Số lượt xem, lấy từ chuỗi meta của site gốc */
export function articleViews(a: Article): string {
  const m = a.meta.match(/([\d.,]+)\s*Lượt xem/i)
  return m ? m[1] : ""
}
