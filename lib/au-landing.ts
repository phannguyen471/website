import type { LeadProductKey, TabDef } from "@/lib/landing"

/**
 * Landing Google Ads thị trường Úc (`/en/au`) — chỉ tiếng Anh.
 *
 * Định vị: xưởng may theo thiết kế riêng, đơn từ 300 sản phẩm, đặt trước
 * 5–8 tuần — khác với các đơn vị bán lại hàng phôi in logo ở Úc. Kế hoạch
 * chiến dịch nằm ở `google-ads/au/setup-au.md` của thư mục mockup landing.
 *
 * `?grp=` đổi tiêu đề, ảnh hero và sản phẩm chọn sẵn để khớp nhóm quảng cáo.
 */

export const AU_PATH = "/en/au"

/** Túi thành viên AFLW (Brisbane Lions) — ảnh thật từ mockup, catalog chưa có */
export const AFLW_TOTE = "/media/au/bag-aflw-member-tote.webp"
export const AU_THANK_YOU_PATH = "/en/au/thank-you"
export const AU_COSMETIC_PATH = "/en/au/custom-cosmetic-bags"

export type AuVariant = {
  title: [before: string, highlight: string, after: string]
  lead: string
  metaTitle: string
  product: LeadProductKey
  heroSlugs: [string, string, string]
}

export const AU_VARIANTS = {
  merch: {
    title: ["Custom ", "bags, caps & polos", " made for your brand"],
    lead: "We don't print your logo on a catalogue blank. We cut, sew and decorate every piece around your brand – your size, fabric, colour and trims – in our own factory, trusted by Kiehl's, Vichy, Kérastase, Maybelline and the AFLW.",
    metaTitle: "Custom Bags, Caps & Polos, Factory-Direct for Australian Brands",
    product: "auSeveral",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "non-in-lua", "ao-polo"],
  },
  tote: {
    title: ["Custom ", "tote & canvas bags", " made for your brand"],
    lead: "We cut, sew and print the bag around your brand – your size, fabric, colour and trims – in our own factory, trusted by Kiehl's, Vichy, Kérastase and the AFLW.",
    metaTitle: "Custom Tote Bags, Factory-Direct for Australian Brands",
    product: "auTote",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "tui-bo-in-lua-xach-tay", "tui-tote-size-lon"],
  },
  caps: {
    title: ["Custom ", "caps & bucket hats", ", embroidered with your logo"],
    lead: "Caps, trucker caps, sports caps and bucket hats made in your fabric colours – embroidered, printed or patched. Factory-direct pricing for 300+ units.",
    metaTitle: "Custom Caps & Bucket Hats, Factory-Direct to Australia",
    product: "auCaps",
    heroSlugs: ["non-in-lua", "non-kaki-phoi-luoi-the-thao", "non-du-loai"],
  },
  apparel: {
    title: ["Custom ", "embroidered polos & tees", " for your team"],
    lead: "Staff polos, event tees and hoodies sewn to your colours, with embroidered or printed logos and mixed size runs – factory-direct.",
    metaTitle: "Custom Embroidered Polos & Tees for Australian Teams",
    product: "auApparel",
    heroSlugs: ["ao-polo", "ao-thun-co-tron-in-full", "ao-polo-me-phoi-mau"],
  },
  cosmetic: {
    title: ["Custom ", "cosmetic bags & pouches", " for beauty brands"],
    lead: "Gift-with-purchase pouches, makeup bags and toiletry cases made to your brand spec – PU, canvas or nylon, debossed or printed. Trusted by L'Oréal group brands.",
    metaTitle: "Custom Cosmetic Bags & Pouches for Beauty Brands",
    product: "auCosmetic",
    heroSlugs: ["tui-dung-my-pham-pu-mo-cao-cap", "pouch-canvas-dang-tru-do", "tui-xach-tay-canvas-phoi-pu-nau"],
  },
  drawstring: {
    title: ["Custom ", "drawstring & calico bags", ", printed with your logo"],
    lead: "Cotton and calico drawstring bags for events, retail packaging and member packs – your size, colour and print, factory-direct.",
    metaTitle: "Custom Drawstring & Calico Bags, Factory-Direct",
    product: "auDrawstring",
    heroSlugs: ["tui-canvas-co-day-rut", "tui-tote-size-lon", "tui-bo-in-lua-xach-tay"],
  },
  backpack: {
    title: ["Custom ", "branded backpacks", ", made to your spec"],
    lead: "Backpacks for staff onboarding, clubs and events – water-resistant fabrics, your colours and logo, built in our own factory.",
    metaTitle: "Custom Branded Backpacks, Made to Your Spec",
    product: "auDrawstring",
    heroSlugs: ["balo-vai-den-in-logo", "balo-hoc-sinh", "tui-simili-deo-cheo"],
  },
} satisfies Record<string, AuVariant>

export type AuVariantKey = keyof typeof AU_VARIANTS

/** `?grp=` lạ hoặc không có → trang chung "custom merchandise" */
export function auVariantFor(grp: string | undefined): { key: AuVariantKey; variant: AuVariant } {
  const key = grp && grp in AU_VARIANTS ? (grp as AuVariantKey) : "merch"
  return { key, variant: AU_VARIANTS[key] }
}

export const AU_PRODUCT_KEYS: LeadProductKey[] = [
  "auTote",
  "auCosmetic",
  "auDrawstring",
  "auCooler",
  "auCaps",
  "auApparel",
  "auSeveral",
]

export const AU_QUANTITIES = ["Under 300", "300 – 1,000", "1,000 – 5,000", "5,000+"]
export const AU_BUDGETS = ["Under $5", "$5 – $10", "$10 – $20", "$20+", "Not sure yet"]

/** 4 danh mục lớn — trỏ sang trang riêng nếu đã có, còn lại về biến thể `?grp=` của trang chung */
export const AU_CATEGORIES = [
  { title: "Custom bags", text: "Totes, calico, drawstring, backpacks, coolers", image: "/media/au/bag-olaplex-tote.webp", href: `${AU_PATH}?grp=tote` },
  { title: "Cosmetic bags", text: "Pouches, makeup bags, vanity cases for beauty brands", image: "/media/au/cos-lancome-round.webp", href: AU_COSMETIC_PATH },
  { title: "Caps & hats", text: "Caps, truckers, visors, bucket and sun hats", image: "/media/au/cap-kiehls-denim.webp", href: `${AU_PATH}?grp=caps` },
  { title: "Polos & apparel", text: "Polos, tees, jerseys, hoodies, jackets", image: "/media/au/app-polo-navy.webp", href: `${AU_PATH}?grp=apparel` },
]

export const AU_TABS: readonly TabDef[] = [
  { key: "all", label: { vi: "Tất cả", en: "All" } },
  { key: "tote", label: { vi: "Túi tote, canvas", en: "Totes & canvas bags" } },
  { key: "cosmetic", label: { vi: "Túi mỹ phẩm, phụ kiện", en: "Cosmetic & accessories" } },
  { key: "other", label: { vi: "Túi dây rút, balo", en: "Drawstring & backpacks" } },
  { key: "caps", label: { vi: "Nón", en: "Caps & hats" } },
  { key: "apparel", label: { vi: "Áo", en: "Polos & tees" } },
]

export const AU_SHOWCASE: {
  slug: string
  tab: string
  tag: string
  name: string
  note: string
  product: LeadProductKey
  /** Ảnh riêng thay cho ảnh catalog của `slug` */
  image?: string
}[] = [
  { slug: "tui-canvas-cotton-phoi-coi", tab: "tote", tag: "Canvas tote", name: "Canvas tote with straw panel", note: "Two-material build, brand-matched colour", product: "auTote" },
  { slug: "tui-bo-in-lua-xach-tay", tab: "tote", tag: "Screen printed", name: "Screen printed canvas tote", note: "Logo printed along body and handles", product: "auTote" },
  { slug: "tui-tote-size-lon", tab: "tote", tag: "Event tote", name: "Large full-print tote", note: "Made for AFLW – events, members, retail", product: "auTote", image: AFLW_TOTE },
  { slug: "tui-xach-tay-canvas-phoi-pu-nau", tab: "tote", tag: "Premium tote", name: "Canvas with faux-leather handles", note: "Debossed logo, salon-grade finish", product: "auTote" },
  { slug: "tui-dung-my-pham-pu-mo-cao-cap", tab: "cosmetic", tag: "Cosmetic pouch", name: "PU cosmetic pouch", note: "Gift-with-purchase for beauty brands", product: "auCosmetic" },
  { slug: "tui-simili-deo-cheo", tab: "cosmetic", tag: "Accessories", name: "Faux-leather crossbody", note: "Debossed logo, retail-ready finish", product: "auCosmetic" },
  { slug: "tui-canvas-co-day-rut", tab: "other", tag: "Drawstring", name: "Cotton drawstring bag", note: "Calico-style packaging and merch", product: "auDrawstring" },
  { slug: "balo-hoc-sinh", tab: "other", tag: "Backpack", name: "Custom backpack", note: "Water-resistant fabric, printed to brand", product: "auDrawstring" },
  { slug: "non-in-lua", tab: "caps", tag: "Cap", name: "Embroidered or printed cap", note: "Made for Maybelline – brand-matched colours", product: "auCaps" },
  { slug: "non-kaki-phoi-luoi-the-thao", tab: "caps", tag: "Sports cap", name: "Sports cap with mesh panels", note: "Breathable, embroidered or printed logo", product: "auCaps" },
  { slug: "ao-polo", tab: "apparel", tag: "Polo", name: "Embroidered pique polo", note: "Custom knit collar, your brand colours", product: "auApparel" },
  { slug: "ao-thun-co-tron-in-full", tab: "apparel", tag: "T-shirt", name: "Full-print event tee", note: "Sublimated edge to edge, vivid colour", product: "auApparel" },
]

/** WhatsApp dùng chung số Zalo (cần xác nhận số của người trả lời tiếng Anh) */
export function whatsappUrl(intlPhone: string): string {
  return `https://wa.me/${intlPhone.replace(/\D/g, "")}`
}

/** Trang túi mỹ phẩm (`/en/au/custom-cosmetic-bags`) — ảnh thật làm cho các thương hiệu làm đẹp, lấy từ mockup */
export const AU_COSMETIC_SHOWCASE: { image: string; tag: string; name: string; note: string }[] = [
  { image: "/media/au/cos-kiehls-red.webp", tag: "Canvas pouch", name: "Canvas cosmetic bag", note: "Made for Kiehl's – logo zip puller" },
  { image: "/media/au/cos-lancome-round.webp", tag: "Round pouch", name: "Glossy round PU pouch", note: "Made for Lancôme – Idôle campaign" },
  { image: "/media/au/cos-paulas-choice.webp", tag: "PU bag", name: "Faux-leather cosmetic bag", note: "Made for Paula's Choice – foil logo" },
  { image: "/media/au/cos-la-roche-posay.webp", tag: "PU pouch", name: "Faux-leather pouch", note: "Made for La Roche-Posay" },
  { image: "/media/au/cos-lancome-square.webp", tag: "Travel kit", name: "Clear-window travel pouch", note: "Made for Lancôme – travel kit packaging" },
  { image: "/media/au/cos-kerastase.webp", tag: "Flat pouch", name: "Striped canvas pouch", note: "Made for Kérastase – woven label" },
  { image: "/media/au/cos-kiehls-vanity.webp", tag: "Vanity case", name: "Structured vanity case", note: "Made for Kiehl's – hanging handle" },
  { image: "/media/au/cos-kiehls-cylinder.webp", tag: "Cylinder pouch", name: "Cylinder canvas pouch", note: "Made for Kiehl's flagship store" },
  { image: "/media/au/cos-holographic.webp", tag: "Holographic", name: "Holographic TPU bag", note: "Made for Pantene – GWP bundle" },
  { image: "/media/au/cos-mesh.webp", tag: "Mesh bag", name: "Mesh cosmetic bag", note: "Made for Paula's Choice – printed patches" },
  { image: "/media/au/cos-pvc-canvas.webp", tag: "Clear bag", name: "Clear PVC + canvas bag", note: "Airport-friendly travel bag" },
  { image: "/media/au/cos-vanity-case.webp", tag: "Vanity case", name: "Faux-leather vanity case", note: "Top handle, structured base" },
]
