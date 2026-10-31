/**
 * Nội dung trang landing chạy quảng cáo Google Ads (`/bao-gia`).
 *
 * Mỗi nhóm quảng cáo trỏ về cùng một trang nhưng khác `?nhom=` — tiêu đề,
 * đoạn mở đầu, ảnh hero và sản phẩm chọn sẵn trong form đổi theo nhóm để
 * khớp từ khoá (Quality Score). Danh sách final URL nằm trong
 * `google-ads/*.csv` của thư mục mockup landing.
 *
 * Ảnh lấy theo slug sản phẩm trong catalog (data/products.json), nên khi
 * xưởng có ảnh túi không dệt thật chỉ cần thêm sản phẩm rồi đổi slug ở đây.
 */

/** Giá trị của ô "Sản phẩm quan tâm" — cũng là nội dung gửi kèm email lead */
export const LEAD_PRODUCTS = [
  "Túi vải / canvas",
  "Túi vải không dệt",
  "Balo / túi xách",
  "Áo đồng phục",
  "Nón",
  "Phụ kiện / khác",
  "Nhiều loại / combo quà tặng",
] as const

export type LeadProduct = (typeof LEAD_PRODUCTS)[number]

export const LEAD_QUANTITIES = ["Dưới 100", "100 – 500", "500 – 1.000", "1.000 – 5.000", "Trên 5.000"]

export const LEAD_BUDGETS = [
  "Dưới 30.000đ",
  "30.000 – 60.000đ",
  "60.000 – 120.000đ",
  "120.000 – 300.000đ",
  "Trên 300.000đ",
  "Chưa xác định",
]

export type LandingVariant = {
  /** Tiêu đề chia 3 phần: phần giữa tô đỏ là cụm từ khoá chính */
  title: [before: string, highlight: string, after: string]
  lead: string
  /** <title> của trang — giữ dưới ~60 ký tự */
  metaTitle: string
  product: LeadProduct
  /** 3 slug sản phẩm: ảnh lớn bên trái + 2 ảnh xếp chồng bên phải */
  heroSlugs: [string, string, string]
}

export const VARIANTS = {
  "tui-vai": {
    title: ["Xưởng sản xuất ", "túi vải in logo", " theo yêu cầu cho doanh nghiệp"],
    lead: "Túi canvas, túi vải bố, túi tote in logo thương hiệu – làm theo mẫu hoặc thiết kế riêng, sản xuất tại xưởng ở TP.HCM, giao toàn quốc và quốc tế.",
    metaTitle: "Xưởng sản xuất túi vải in logo theo yêu cầu",
    product: "Túi vải / canvas",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "tui-bo-in-lua-xach-tay", "tui-tote-size-lon"],
  },
  "khong-det": {
    title: ["Xưởng sản xuất ", "túi vải không dệt in logo", " theo yêu cầu"],
    lead: "Túi vải không dệt in logo cho sự kiện, hội chợ, siêu thị và khuyến mãi – chọn định lượng vải, màu, kiểu quai theo yêu cầu, sản xuất tại xưởng ở TP.HCM, có hợp đồng và hóa đơn VAT.",
    metaTitle: "Túi vải không dệt in logo theo yêu cầu",
    product: "Túi vải không dệt",
    // TODO: catalog chưa có túi không dệt — thay bằng ảnh thật khi xưởng gửi
    heroSlugs: ["tui-tote-size-lon", "tui-canvas-poly-deo-vai-in-chuyen", "tui-bo-in-lua-xach-tay"],
  },
  balo: {
    title: ["May ", "balo in logo", " theo yêu cầu cho doanh nghiệp"],
    lead: "Balo, túi xách, túi đeo chéo in hoặc thêu logo thương hiệu – làm theo mẫu hoặc thiết kế riêng, sản xuất tại xưởng ở TP.HCM, giao toàn quốc và quốc tế.",
    metaTitle: "May balo in logo theo yêu cầu cho doanh nghiệp",
    product: "Balo / túi xách",
    heroSlugs: ["balo-hoc-sinh", "tui-xach-tay-canvas-phoi-pu-nau", "tui-simili-deo-cheo"],
  },
  "dong-phuc": {
    title: ["May ", "áo đồng phục in logo", " cho doanh nghiệp"],
    lead: "Áo polo, áo thun, áo sự kiện in hoặc thêu logo công ty – may tại xưởng ở TP.HCM, có hợp đồng và hóa đơn VAT, giao toàn quốc.",
    metaTitle: "May áo đồng phục in logo cho doanh nghiệp",
    product: "Áo đồng phục",
    heroSlugs: ["ao-polo", "ao-dong-phuc", "ao-thun-co-tron-in-full"],
  },
  "qua-tang": {
    title: ["", "Quà tặng doanh nghiệp in logo", " – sản xuất tại xưởng"],
    lead: "Túi, balo, áo, nón và phụ kiện in logo thương hiệu cho quà tặng khách hàng, nhân viên, sự kiện – một xưởng làm trọn gói, giao toàn quốc và quốc tế.",
    metaTitle: "Quà tặng doanh nghiệp in logo – sản xuất tại xưởng",
    product: "Nhiều loại / combo quà tặng",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "non-in-lua", "tui-bo-in-lua-xach-tay"],
  },
} satisfies Record<string, LandingVariant>

export type VariantKey = keyof typeof VARIANTS

/** `?nhom=` lạ hoặc không có → rơi về nhóm túi vải (nhóm lớn nhất) */
export function variantFor(nhom: string | undefined): { key: VariantKey; variant: LandingVariant } {
  const key = nhom && nhom in VARIANTS ? (nhom as VariantKey) : "tui-vai"
  return { key, variant: VARIANTS[key] }
}

export const PRODUCT_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "tui", label: "Túi vải, canvas & không dệt" },
  { key: "balo", label: "Balo & túi xách" },
  { key: "ao", label: "Áo đồng phục" },
  { key: "non", label: "Nón & phụ kiện" },
] as const

export type ProductTab = (typeof PRODUCT_TABS)[number]["key"]

/** Lưới "Một xưởng, đủ mọi món quà" — mỗi thẻ có nút chọn sẵn sản phẩm trong form */
export const SHOWCASE: {
  slug: string
  tab: Exclude<ProductTab, "all">
  tag: string
  name: string
  note: string
  product: LeadProduct
}[] = [
  { slug: "tui-canvas-cotton-phoi-coi", tab: "tui", tag: "Túi canvas", name: "Túi canvas phối cói", note: "Cotton canvas, phối cói tự nhiên", product: "Túi vải / canvas" },
  { slug: "tui-bo-in-lua-xach-tay", tab: "tui", tag: "Túi vải bố", name: "Túi bố in lụa xách tay", note: "Vải bố, in lụa nhiều màu", product: "Túi vải / canvas" },
  { slug: "tui-tote-size-lon", tab: "tui", tag: "Túi tote", name: "Túi tote khổ lớn in full", note: "Dùng cho sự kiện, hội nghị", product: "Túi vải / canvas" },
  { slug: "tui-canvas-poly-deo-vai-in-chuyen", tab: "tui", tag: "Túi canvas", name: "Túi canvas đeo vai in logo", note: "Quà tặng khách hàng, nhân viên", product: "Túi vải / canvas" },
  { slug: "tui-canvas-co-day-rut", tab: "tui", tag: "Túi dây rút", name: "Túi canvas dây rút", note: "Đựng quà, đựng sản phẩm", product: "Túi vải / canvas" },
  { slug: "tui-xach-tay-canvas-phoi-pu-nau", tab: "balo", tag: "Túi xách", name: "Túi canvas phối quai PU", note: "Canvas + da tổng hợp, ép logo", product: "Balo / túi xách" },
  { slug: "balo-hoc-sinh", tab: "balo", tag: "Balo", name: "Balo vải dù in logo", note: "Vải dù chống thấm, in theo nhận diện", product: "Balo / túi xách" },
  { slug: "tui-simili-deo-cheo", tab: "balo", tag: "Túi đeo", name: "Túi đeo chéo simili", note: "Simili cao cấp, logo dập chìm", product: "Balo / túi xách" },
  { slug: "ao-polo", tab: "ao", tag: "Áo đồng phục", name: "Áo polo cá sấu", note: "Bo cổ dệt riêng, thêu logo", product: "Áo đồng phục" },
  { slug: "ao-thun-co-tron-in-full", tab: "ao", tag: "Áo sự kiện", name: "Áo thun in chuyển nhiệt", note: "In full thân, màu sắc bền", product: "Áo đồng phục" },
  { slug: "non-in-lua", tab: "non", tag: "Nón", name: "Nón kết in lụa / thêu", note: "Kaki, thêu vi tính hoặc in lụa", product: "Nón" },
  { slug: "tui-dung-my-pham-pu-mo-cao-cap", tab: "non", tag: "Phụ kiện", name: "Túi đựng mỹ phẩm PU", note: "Quà tặng kèm sản phẩm", product: "Phụ kiện / khác" },
]

/** Sự kiện trình duyệt để nút "Nhận báo giá" trên thẻ sản phẩm chọn sẵn ô sản phẩm trong form */
export const SELECT_PRODUCT_EVENT = "pn:select-product"

/** Khoá sessionStorage chuyển dữ liệu lead sang trang cảm ơn để bắn conversion đúng 1 lần */
export const LEAD_STORAGE_KEY = "pn_lead"
