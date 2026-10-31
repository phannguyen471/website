import { LEAD_PRODUCTS } from "@/lib/landing"

/**
 * Landing quà Tết doanh nghiệp (`/qua-tet-doanh-nghiep`).
 *
 * Chạy theo mùa: khi qua Tết, cập nhật `TET` (năm, ngày Tết, hạn chốt mẫu)
 * cho mùa sau thay vì sửa từng chỗ trong trang.
 */

export const TET_PATH = "/qua-tet-doanh-nghiep"

export const TET = {
  year: 2027,
  name: "Tết Đinh Mùi",
  date: "06/02/2027",
  /** Hạn chốt mẫu / giao đợt cuối — chưa được xưởng xác nhận (tô vàng ở ?review=1) */
  sampleDeadline: "10/01/2027",
  sampleDeadlineShort: "10/01",
  lastDelivery: "25/01",
}

export const TET_GIFT_BAG = "Túi đựng hộp quà / giỏ quà Tết"

/** Túi không dệt lên đầu vì là nhu cầu lớn nhất mùa Tết, thêm lựa chọn túi đựng quà */
export const TET_PRODUCTS = [
  "Túi vải không dệt",
  ...LEAD_PRODUCTS.filter((p) => p !== "Túi vải không dệt"),
  TET_GIFT_BAG,
]

export type TetVariant = {
  title: [before: string, highlight: string, after: string]
  lead: string
  metaTitle: string
  product: string
  heroSlugs: [string, string, string]
}

export const TET_VARIANTS = {
  "tui-qua": {
    title: ["", "Túi đựng quà Tết in logo", " cho doanh nghiệp"],
    lead: "Túi vải không dệt, túi canvas, túi phối cói in logo để đựng hộp quà, giỏ quà Tết. Khách nhận quà mang túi đi chợ, đi làm cả năm, logo của bạn đi theo họ thay vì nằm trong thùng rác như túi giấy.",
    metaTitle: `Túi đựng quà Tết ${TET.year} in logo cho doanh nghiệp`,
    product: TET_GIFT_BAG,
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "tui-tote-size-lon", "tui-xach-tay-canvas-phoi-pu-nau"],
  },
  "khong-det": {
    title: ["", "Túi vải không dệt đựng quà Tết", " in logo – giá xưởng"],
    lead: "Túi không dệt in logo cho giỏ quà, hộp quà Tết, hội chợ và khuyến mãi Tết. Chọn màu đỏ, vàng, in logo kèm lời chúc. Xưởng tại TP.HCM, hợp đồng, VAT, giao toàn quốc.",
    metaTitle: "Túi vải không dệt đựng quà Tết in logo",
    product: "Túi vải không dệt",
    // TODO: catalog chưa có túi không dệt — thay bằng ảnh thật khi xưởng gửi
    heroSlugs: ["tui-tote-size-lon", "tui-canvas-poly-deo-vai-in-chuyen", "tui-bo-in-lua-xach-tay"],
  },
  "nhan-vien": {
    title: ["", "Quà Tết nhân viên", " mang logo công ty – dùng cả năm"],
    lead: "Túi canvas, balo, áo in logo làm quà Tết cho nhân viên hoặc làm túi đựng phần quà. Món quà dùng mỗi ngày, nhắc tên công ty quanh năm. Hợp đồng, hóa đơn VAT đầy đủ.",
    metaTitle: "Quà Tết nhân viên in logo công ty",
    product: "Nhiều loại / combo quà tặng",
    heroSlugs: ["balo-hoc-sinh", "tui-canvas-poly-deo-vai-in-chuyen", "ao-polo"],
  },
} satisfies Record<string, TetVariant>

export type TetVariantKey = keyof typeof TET_VARIANTS

/** `?nhom=` lạ hoặc không có → túi đựng quà (nhóm lớn nhất của chiến dịch Tết) */
export function tetVariantFor(nhom: string | undefined): { key: TetVariantKey; variant: TetVariant } {
  const key = nhom && nhom in TET_VARIANTS ? (nhom as TetVariantKey) : "tui-qua"
  return { key, variant: TET_VARIANTS[key] }
}

export const TET_SHOWCASE: { slug: string; tag: string; name: string; note: string; product: string }[] = [
  { slug: "tui-canvas-cotton-phoi-coi", tag: "Quà khách hàng VIP", name: "Túi canvas phối cói", note: "Sang, dùng lại được, hợp hộp quà cao cấp", product: "Túi vải / canvas" },
  { slug: "tui-xach-tay-canvas-phoi-pu-nau", tag: "Quà đối tác", name: "Túi canvas phối quai da PU", note: "Ép logo tinh tế, đựng rượu, trà, hộp quà", product: "Túi vải / canvas" },
  { slug: "tui-tote-size-lon", tag: "Đựng giỏ quà", name: "Túi tote khổ lớn", note: "Vừa giỏ quà, hộp quà Tết cỡ lớn", product: TET_GIFT_BAG },
  { slug: "tui-bo-in-lua-xach-tay", tag: "Quà nhân viên", name: "Túi vải bố in lụa", note: "In logo kèm lời chúc Tết, nhiều màu", product: "Túi vải / canvas" },
  { slug: "tui-canvas-co-day-rut", tag: "Túi quà nhỏ", name: "Túi dây rút", note: "Đựng bánh, trà, quà nhỏ kèm thiệp", product: TET_GIFT_BAG },
  { slug: "tui-canvas-xach-tay", tag: "Số lượng lớn", name: "Túi canvas xách cơ bản", note: "Giá tốt cho đơn nghìn túi", product: "Túi vải / canvas" },
  { slug: "balo-hoc-sinh", tag: "Quà Tết nhân viên", name: "Balo in logo công ty", note: "Món quà nhân viên dùng mỗi ngày", product: "Balo / túi xách" },
  { slug: "ao-polo", tag: "Year end party", name: "Áo polo thêu logo", note: "Đồng phục tất niên, year end party", product: "Áo đồng phục" },
]
