import type { Locale } from "@/lib/i18n"

/**
 * Nội dung trang landing chạy quảng cáo Google Ads.
 *
 * Mỗi nhóm quảng cáo có tiêu đề, đoạn mở đầu, ảnh hero và sản phẩm chọn sẵn
 * trong form riêng để khớp từ khoá (Quality Score). Nhóm có `path` dùng URL
 * riêng (`/tui-vai-in-logo`), nhóm còn lại dùng `/bao-gia?nhom=<key>`.
 * Quảng cáo chạy tiếng Việt, bản tiếng Anh chỉ để khách bấm nút đổi ngôn ngữ
 * vẫn có trang tương ứng — tham số nhóm bên tiếng Anh là `?group=` theo quy
 * ước QUERY_KEYS của site.
 *
 * Ảnh lấy theo slug sản phẩm trong catalog (data/products.json), nên khi
 * xưởng có ảnh túi không dệt thật chỉ cần thêm sản phẩm rồi đổi slug ở đây.
 */

type L<T = string> = Record<Locale, T>

/** Lựa chọn của ô "Sản phẩm quan tâm" — nhãn theo ngôn ngữ cũng là nội dung gửi kèm email lead */
export const LEAD_PRODUCTS = {
  canvas: { vi: "Túi vải / canvas", en: "Canvas / cotton bags" },
  nonwoven: { vi: "Túi vải không dệt", en: "Non-woven bags" },
  bag: { vi: "Balo / túi xách", en: "Backpacks / handbags" },
  uniform: { vi: "Áo đồng phục", en: "Uniforms / T-shirts" },
  cap: { vi: "Nón", en: "Caps / hats" },
  other: { vi: "Phụ kiện / khác", en: "Accessories / other" },
  combo: { vi: "Nhiều loại / combo quà tặng", en: "Multiple items / gift set" },
  tetGift: { vi: "Túi đựng hộp quà / giỏ quà Tết", en: "Tet gift box / hamper bags" },
} satisfies Record<string, L>

export type LeadProductKey = keyof typeof LEAD_PRODUCTS

export function leadProduct(key: LeadProductKey, locale: Locale): string {
  return LEAD_PRODUCTS[key][locale]
}

/** Danh sách lựa chọn mặc định (không gồm túi quà Tết — chỉ landing Tết mới có) */
export const DEFAULT_PRODUCT_KEYS: LeadProductKey[] = ["canvas", "nonwoven", "bag", "uniform", "cap", "other", "combo"]

export const LEAD_QUANTITIES: L<string[]> = {
  vi: ["Dưới 100", "100 – 500", "500 – 1.000", "1.000 – 5.000", "Trên 5.000"],
  en: ["Under 100", "100 – 500", "500 – 1,000", "1,000 – 5,000", "Over 5,000"],
}

export const LEAD_BUDGETS: L<string[]> = {
  vi: ["Dưới 30.000đ", "30.000 – 60.000đ", "60.000 – 120.000đ", "120.000 – 300.000đ", "Trên 300.000đ", "Chưa xác định"],
  en: [
    "Under 30,000 VND",
    "30,000 – 60,000 VND",
    "60,000 – 120,000 VND",
    "120,000 – 300,000 VND",
    "Over 300,000 VND",
    "Not sure yet",
  ],
}

export type LandingVariant = {
  /** Tiêu đề chia 3 phần: phần giữa tô đỏ là cụm từ khoá chính */
  title: L<[before: string, highlight: string, after: string]>
  lead: L
  /** <title> của trang — giữ dưới ~60 ký tự */
  metaTitle: L
  product: LeadProductKey
  /** 3 slug sản phẩm: ảnh lớn bên trái + 2 ảnh xếp chồng bên phải */
  heroSlugs: [string, string, string]
  /** URL riêng cho nhóm này; không có thì dùng `/bao-gia?nhom=<key>` */
  path?: L
}

export const VARIANTS = {
  "tui-vai": {
    title: {
      vi: ["Xưởng sản xuất ", "túi vải in logo", " theo yêu cầu cho doanh nghiệp"],
      en: ["", "Custom logo tote bags", " made in our own factory"],
    },
    lead: {
      vi: "Túi canvas, túi vải bố, túi tote in logo thương hiệu – làm theo mẫu hoặc thiết kế riêng, sản xuất tại xưởng ở TP.HCM, giao toàn quốc và quốc tế.",
      en: "Canvas, cotton and tote bags printed with your brand logo – made to your sample or design at our factory in Ho Chi Minh City, shipped nationwide and worldwide.",
    },
    metaTitle: {
      vi: "Xưởng sản xuất túi vải in logo theo yêu cầu",
      en: "Custom Logo Tote Bags – Factory Direct",
    },
    product: "canvas",
    path: { vi: "/tui-vai-in-logo", en: "/en/custom-logo-tote-bags" },
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "tui-bo-in-lua-xach-tay", "tui-tote-size-lon"],
  },
  "khong-det": {
    title: {
      vi: ["Xưởng sản xuất ", "túi vải không dệt in logo", " theo yêu cầu"],
      en: ["", "Custom non-woven bags", " printed with your logo"],
    },
    lead: {
      vi: "Túi vải không dệt in logo cho sự kiện, hội chợ, siêu thị và khuyến mãi – chọn định lượng vải, màu, kiểu quai theo yêu cầu, sản xuất tại xưởng ở TP.HCM, có hợp đồng và hóa đơn VAT.",
      en: "Logo-printed non-woven bags for events, trade fairs, supermarkets and promotions – choose fabric weight, colour and handle style. Made at our Ho Chi Minh City factory with a contract and VAT invoice.",
    },
    metaTitle: {
      vi: "Túi vải không dệt in logo theo yêu cầu",
      en: "Custom Non-Woven Bags with Logo",
    },
    product: "nonwoven",
    path: { vi: "/tui-vai-khong-det-in-logo", en: "/en/custom-non-woven-bags" },
    // TODO: catalog chưa có túi không dệt — thay bằng ảnh thật khi xưởng gửi
    heroSlugs: ["tui-tote-size-lon", "tui-canvas-poly-deo-vai-in-chuyen", "tui-bo-in-lua-xach-tay"],
  },
  balo: {
    title: {
      vi: ["May ", "balo in logo", " theo yêu cầu cho doanh nghiệp"],
      en: ["", "Custom logo backpacks", " for businesses"],
    },
    lead: {
      vi: "Balo, túi xách, túi đeo chéo in hoặc thêu logo thương hiệu – làm theo mẫu hoặc thiết kế riêng, sản xuất tại xưởng ở TP.HCM, giao toàn quốc và quốc tế.",
      en: "Backpacks, handbags and crossbody bags printed or embroidered with your logo – made to your sample or design at our Ho Chi Minh City factory, shipped nationwide and worldwide.",
    },
    metaTitle: {
      vi: "May balo in logo theo yêu cầu cho doanh nghiệp",
      en: "Custom Logo Backpacks for Businesses",
    },
    product: "bag",
    heroSlugs: ["balo-hoc-sinh", "tui-xach-tay-canvas-phoi-pu-nau", "tui-simili-deo-cheo"],
  },
  "dong-phuc": {
    title: {
      vi: ["May ", "áo đồng phục in logo", " cho doanh nghiệp"],
      en: ["", "Custom logo uniforms", " for your company"],
    },
    lead: {
      vi: "Áo polo, áo thun, áo sự kiện in hoặc thêu logo công ty – may tại xưởng ở TP.HCM, có hợp đồng và hóa đơn VAT, giao toàn quốc.",
      en: "Polo shirts, T-shirts and event shirts printed or embroidered with your company logo – sewn at our Ho Chi Minh City factory, with a contract and VAT invoice, shipped nationwide.",
    },
    metaTitle: {
      vi: "May áo đồng phục in logo cho doanh nghiệp",
      en: "Custom Logo Uniforms for Companies",
    },
    product: "uniform",
    heroSlugs: ["ao-polo", "ao-dong-phuc", "ao-thun-co-tron-in-full"],
  },
  "qua-tang": {
    title: {
      vi: ["", "Quà tặng doanh nghiệp in logo", " – sản xuất tại xưởng"],
      en: ["", "Corporate logo gifts", " – made in our own factory"],
    },
    lead: {
      vi: "Túi, balo, áo, nón và phụ kiện in logo thương hiệu cho quà tặng khách hàng, nhân viên, sự kiện – một xưởng làm trọn gói, giao toàn quốc và quốc tế.",
      en: "Bags, backpacks, apparel, caps and accessories with your logo for client gifts, staff gifts and events – one factory handles it all, shipped nationwide and worldwide.",
    },
    metaTitle: {
      vi: "Quà tặng doanh nghiệp in logo – sản xuất tại xưởng",
      en: "Corporate Logo Gifts – Factory Direct",
    },
    product: "combo",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "non-in-lua", "tui-bo-in-lua-xach-tay"],
  },
} satisfies Record<string, LandingVariant>

export type VariantKey = keyof typeof VARIANTS

export function landingPath(key: VariantKey, locale: Locale): string {
  const variant: LandingVariant = VARIANTS[key]
  if (variant.path) return variant.path[locale]
  return locale === "en" ? `/en/quote?group=${key}` : `/bao-gia?nhom=${key}`
}

/** URL trang cảm ơn sau khi gửi form, theo ngôn ngữ */
export const THANK_YOU_PATH: L = { vi: "/bao-gia/cam-on", en: "/en/quote/thank-you" }

/** `?nhom=` lạ hoặc không có → rơi về nhóm túi vải (nhóm lớn nhất) */
export function variantFor(nhom: string | undefined): { key: VariantKey; variant: LandingVariant } {
  const key = nhom && nhom in VARIANTS ? (nhom as VariantKey) : "tui-vai"
  return { key, variant: VARIANTS[key] }
}

export const PRODUCT_TABS = [
  { key: "all", label: { vi: "Tất cả", en: "All" } },
  { key: "tui", label: { vi: "Túi vải, canvas & không dệt", en: "Canvas & non-woven bags" } },
  { key: "balo", label: { vi: "Balo & túi xách", en: "Backpacks & handbags" } },
  { key: "ao", label: { vi: "Áo đồng phục", en: "Uniforms" } },
  { key: "non", label: { vi: "Nón & phụ kiện", en: "Caps & accessories" } },
] as const

export type ProductTab = (typeof PRODUCT_TABS)[number]["key"]

export type ShowcaseEntry = {
  slug: string
  tab?: Exclude<ProductTab, "all">
  tag: L
  name: L
  note: L
  product: LeadProductKey
}

/** Lưới "Một xưởng, đủ mọi món quà" — mỗi thẻ có nút chọn sẵn sản phẩm trong form */
export const SHOWCASE: ShowcaseEntry[] = [
  {
    slug: "tui-canvas-cotton-phoi-coi",
    tab: "tui",
    tag: { vi: "Túi canvas", en: "Canvas bag" },
    name: { vi: "Túi canvas phối cói", en: "Canvas & seagrass tote" },
    note: { vi: "Cotton canvas, phối cói tự nhiên", en: "Cotton canvas with natural seagrass" },
    product: "canvas",
  },
  {
    slug: "tui-bo-in-lua-xach-tay",
    tab: "tui",
    tag: { vi: "Túi vải bố", en: "Cotton bag" },
    name: { vi: "Túi bố in lụa xách tay", en: "Screen-printed cotton tote" },
    note: { vi: "Vải bố, in lụa nhiều màu", en: "Cotton duck, multi-colour screen print" },
    product: "canvas",
  },
  {
    slug: "tui-tote-size-lon",
    tab: "tui",
    tag: { vi: "Túi tote", en: "Tote bag" },
    name: { vi: "Túi tote khổ lớn in full", en: "Large all-over print tote" },
    note: { vi: "Dùng cho sự kiện, hội nghị", en: "For events and conferences" },
    product: "canvas",
  },
  {
    slug: "tui-canvas-poly-deo-vai-in-chuyen",
    tab: "tui",
    tag: { vi: "Túi canvas", en: "Canvas bag" },
    name: { vi: "Túi canvas đeo vai in logo", en: "Logo canvas shoulder bag" },
    note: { vi: "Quà tặng khách hàng, nhân viên", en: "Gifts for clients and staff" },
    product: "canvas",
  },
  {
    slug: "tui-canvas-co-day-rut",
    tab: "tui",
    tag: { vi: "Túi dây rút", en: "Drawstring bag" },
    name: { vi: "Túi canvas dây rút", en: "Canvas drawstring bag" },
    note: { vi: "Đựng quà, đựng sản phẩm", en: "For gifts and product packaging" },
    product: "canvas",
  },
  {
    slug: "tui-xach-tay-canvas-phoi-pu-nau",
    tab: "balo",
    tag: { vi: "Túi xách", en: "Handbag" },
    name: { vi: "Túi canvas phối quai PU", en: "Canvas bag with PU handles" },
    note: { vi: "Canvas + da tổng hợp, ép logo", en: "Canvas + PU leather, embossed logo" },
    product: "bag",
  },
  {
    slug: "balo-hoc-sinh",
    tab: "balo",
    tag: { vi: "Balo", en: "Backpack" },
    name: { vi: "Balo vải dù in logo", en: "Logo polyester backpack" },
    note: { vi: "Vải dù chống thấm, in theo nhận diện", en: "Water-resistant fabric, printed to your brand" },
    product: "bag",
  },
  {
    slug: "tui-simili-deo-cheo",
    tab: "balo",
    tag: { vi: "Túi đeo", en: "Crossbody" },
    name: { vi: "Túi đeo chéo simili", en: "Faux leather crossbody bag" },
    note: { vi: "Simili cao cấp, logo dập chìm", en: "Premium faux leather, debossed logo" },
    product: "bag",
  },
  {
    slug: "ao-polo",
    tab: "ao",
    tag: { vi: "Áo đồng phục", en: "Uniform" },
    name: { vi: "Áo polo cá sấu", en: "Piqué polo shirt" },
    note: { vi: "Bo cổ dệt riêng, thêu logo", en: "Custom knitted collar, embroidered logo" },
    product: "uniform",
  },
  {
    slug: "ao-thun-co-tron-in-full",
    tab: "ao",
    tag: { vi: "Áo sự kiện", en: "Event shirt" },
    name: { vi: "Áo thun in chuyển nhiệt", en: "Sublimation-printed T-shirt" },
    note: { vi: "In full thân, màu sắc bền", en: "All-over print, long-lasting colour" },
    product: "uniform",
  },
  {
    slug: "non-in-lua",
    tab: "non",
    tag: { vi: "Nón", en: "Cap" },
    name: { vi: "Nón kết in lụa / thêu", en: "Printed / embroidered cap" },
    note: { vi: "Kaki, thêu vi tính hoặc in lụa", en: "Khaki, embroidery or screen print" },
    product: "cap",
  },
  {
    slug: "tui-dung-my-pham-pu-mo-cao-cap",
    tab: "non",
    tag: { vi: "Phụ kiện", en: "Accessory" },
    name: { vi: "Túi đựng mỹ phẩm PU", en: "PU cosmetic pouch" },
    note: { vi: "Quà tặng kèm sản phẩm", en: "Gift-with-purchase item" },
    product: "other",
  },
]

/** Sự kiện trình duyệt để nút "Nhận báo giá" trên thẻ sản phẩm chọn sẵn ô sản phẩm trong form */
export const SELECT_PRODUCT_EVENT = "pn:select-product"

/** Khoá sessionStorage chuyển dữ liệu lead sang trang cảm ơn để bắn conversion đúng 1 lần */
export const LEAD_STORAGE_KEY = "pn_lead"
