import type { Locale } from "@/lib/i18n"
import { DEFAULT_PRODUCT_KEYS, type LeadProductKey } from "@/lib/landing"

/**
 * Landing quà Tết doanh nghiệp (`/qua-tet-doanh-nghiep`, `/en/corporate-tet-gifts`).
 *
 * Chạy theo mùa: khi qua Tết, cập nhật `TET` (năm, ngày Tết, hạn chốt mẫu)
 * cho mùa sau thay vì sửa từng chỗ trong trang.
 */

type L<T = string> = Record<Locale, T>

export const TET_PATH: L = { vi: "/qua-tet-doanh-nghiep", en: "/en/corporate-tet-gifts" }

export const TET = {
  year: 2027,
  name: { vi: "Tết Đinh Mùi", en: "Lunar New Year (Year of the Goat)" },
  date: "06/02/2027",
  /** Hạn chốt mẫu / giao đợt cuối — chưa được xưởng xác nhận (tô vàng ở ?review=1) */
  sampleDeadline: "10/01/2027",
  sampleDeadlineShort: "10/01",
  lastDelivery: "25/01",
}

/** Combo quà tặng lên đầu vì là nhu cầu chính của quà Tết doanh nghiệp, thêm lựa chọn túi đựng quà */
export const TET_PRODUCT_KEYS: LeadProductKey[] = [
  "combo",
  ...DEFAULT_PRODUCT_KEYS.filter((k) => k !== "combo"),
  "tetGift",
]

export type TetVariant = {
  title: L<[before: string, highlight: string, after: string]>
  lead: L
  metaTitle: L
  product: LeadProductKey
  heroSlugs: [string, string, string]
}

export const TET_VARIANTS = {
  "qua-tet": {
    title: {
      vi: ["", "Quà Tết doanh nghiệp", " in logo – sản xuất tại xưởng"],
      en: ["", "Corporate Tet gifts", " with your logo – made in our factory"],
    },
    lead: {
      vi: "Túi canvas, túi da PU, túi mỹ phẩm, balo, áo, nón in logo làm quà Tết cho khách hàng, đối tác và nhân viên. Quà dùng được cả năm nên thương hiệu của bạn còn được nhắc đến lâu sau Tết. Xưởng tại TP.HCM, hợp đồng, hóa đơn VAT, giao toàn quốc.",
      en: "Logo canvas bags, PU leather bags, cosmetic pouches, backpacks, apparel and caps as Tet gifts for clients, partners and staff. Gifts that get used all year keep your brand in mind long after Tet. Factory in Ho Chi Minh City, contract, VAT invoice, nationwide delivery.",
    },
    metaTitle: {
      vi: `Quà Tết doanh nghiệp ${TET.year} in logo – giá xưởng`,
      en: `Corporate Tet Gifts ${TET.year} with Your Logo`,
    },
    product: "combo",
    heroSlugs: ["tui-tote-pu-2-lop", "pouch-canvas-dang-tru-do", "ao-polo-me-phoi-mau"],
  },
  "khong-det": {
    title: {
      vi: ["", "Túi vải không dệt đựng quà Tết", " in logo – giá xưởng"],
      en: ["", "Non-woven Tet gift bags", " with your logo – factory prices"],
    },
    lead: {
      vi: "Túi không dệt in logo cho giỏ quà, hộp quà Tết, hội chợ và khuyến mãi Tết. Chọn màu đỏ, vàng, in logo kèm lời chúc. Xưởng tại TP.HCM, hợp đồng, VAT, giao toàn quốc.",
      en: "Logo-printed non-woven bags for Tet hampers, gift boxes, fairs and promotions. Choose red or gold, add your logo and a New Year greeting. Factory in Ho Chi Minh City, contract, VAT invoice, nationwide delivery.",
    },
    metaTitle: {
      vi: "Túi vải không dệt đựng quà Tết in logo",
      en: "Non-Woven Tet Gift Bags with Logo",
    },
    product: "nonwoven",
    // TODO: catalog chưa có túi không dệt — thay bằng ảnh thật khi xưởng gửi
    heroSlugs: ["tui-tote-size-lon", "tui-canvas-poly-deo-vai-in-chuyen", "tui-bo-in-lua-xach-tay"],
  },
  "nhan-vien": {
    title: {
      vi: ["", "Quà Tết nhân viên", " mang logo công ty – dùng cả năm"],
      en: ["", "Tet gifts for employees", " with your company logo – used all year"],
    },
    lead: {
      vi: "Túi canvas, balo, áo in logo làm quà Tết cho nhân viên hoặc làm túi đựng phần quà. Món quà dùng mỗi ngày, nhắc tên công ty quanh năm. Hợp đồng, hóa đơn VAT đầy đủ.",
      en: "Logo canvas bags, backpacks and apparel as Tet gifts for your staff, or as bags for their gift sets. An everyday gift that keeps your company name in sight all year. Full contract and VAT invoice.",
    },
    metaTitle: {
      vi: "Quà Tết nhân viên in logo công ty",
      en: "Tet Gifts for Employees with Company Logo",
    },
    product: "combo",
    heroSlugs: ["balo-hoc-sinh", "tui-canvas-poly-deo-vai-in-chuyen", "ao-polo"],
  },
} satisfies Record<string, TetVariant>

export type TetVariantKey = keyof typeof TET_VARIANTS

/** `?nhom=` lạ hoặc không có → quà Tết doanh nghiệp (từ khoá chính của chiến dịch Tết) */
export function tetVariantFor(nhom: string | undefined): { key: TetVariantKey; variant: TetVariant } {
  const key = nhom && nhom in TET_VARIANTS ? (nhom as TetVariantKey) : "qua-tet"
  return { key, variant: TET_VARIANTS[key] }
}

export const TET_SHOWCASE: { slug: string; tag: L; name: L; note: L; product: LeadProductKey }[] = [
  {
    slug: "tui-tote-pu-2-lop",
    tag: { vi: "Quà khách hàng VIP", en: "VIP client gift" },
    name: { vi: "Túi tote da PU 2 lớp", en: "Two-layer PU leather tote" },
    note: { vi: "Màu đỏ may mắn, logo ép tinh tế", en: "Lucky red, subtly embossed logo" },
    product: "bag",
  },
  {
    slug: "tui-canvas-cotton-phoi-coi",
    tag: { vi: "Quà đối tác", en: "Partner gift" },
    name: { vi: "Túi canvas phối cói", en: "Canvas & seagrass tote" },
    note: { vi: "Sang, dùng lại được, đựng vừa hộp quà", en: "Elegant, reusable, fits a gift box" },
    product: "canvas",
  },
  {
    slug: "pouch-canvas-dang-tru-do",
    tag: { vi: "Quà khách hàng", en: "Client gift" },
    name: { vi: "Pouch canvas dáng trụ", en: "Barrel canvas pouch" },
    note: { vi: "Màu đỏ Tết, in logo thương hiệu", en: "Tet red, printed with your brand" },
    product: "other",
  },
  {
    slug: "tui-dung-my-pham-pu-mo-cao-cap",
    tag: { vi: "Quà tặng kèm", en: "Gift with purchase" },
    name: { vi: "Túi mỹ phẩm PU cao cấp", en: "Premium PU cosmetic pouch" },
    note: { vi: "Logo dập chìm, hợp ngành làm đẹp", en: "Debossed logo, ideal for beauty brands" },
    product: "other",
  },
  {
    slug: "balo-vai-den-in-logo",
    tag: { vi: "Quà Tết nhân viên", en: "Staff Tet gift" },
    name: { vi: "Balo in logo công ty", en: "Company logo backpack" },
    note: { vi: "Món quà nhân viên dùng mỗi ngày", en: "A gift staff use every day" },
    product: "bag",
  },
  {
    slug: "ao-polo-me-phoi-mau",
    tag: { vi: "Year end party", en: "Year-end party" },
    name: { vi: "Áo polo phối màu thêu logo", en: "Colour-block embroidered polo" },
    note: { vi: "Đồng phục tất niên, year end party", en: "Uniforms for year-end parties" },
    product: "uniform",
  },
  {
    slug: "non-du-loai",
    tag: { vi: "Team building", en: "Team building" },
    name: { vi: "Nón in / thêu logo", en: "Printed / embroidered caps" },
    note: { vi: "Quà nhân viên, du xuân đầu năm", en: "Staff gifts, New Year outings" },
    product: "cap",
  },
  {
    slug: "tui-tote-size-lon",
    tag: { vi: "Đựng giỏ quà", en: "Hamper bag" },
    name: { vi: "Túi tote khổ lớn", en: "Large tote bag" },
    note: { vi: "Vừa giỏ quà, hộp quà Tết cỡ lớn", en: "Fits large Tet hampers and gift boxes" },
    product: "tetGift",
  },
]
