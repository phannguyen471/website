import type { Locale } from "@/lib/i18n"
import type { LeadProductKey, TabDef } from "@/lib/landing"

/**
 * Landing Google Ads thị trường Úc (`/en/au`, bản tiếng Việt `/au`).
 *
 * Quảng cáo chạy tiếng Anh; bản tiếng Việt giữ nguyên nội dung thị trường Úc
 * (giá AUD, giao tới Úc, WhatsApp) cho người đọc tiếng Việt.
 *
 * Định vị: xưởng may theo thiết kế riêng, đơn từ 300 sản phẩm, đặt trước
 * 5–8 tuần — khác với các đơn vị bán lại hàng phôi in logo ở Úc. Kế hoạch
 * chiến dịch nằm ở `google-ads/au/setup-au.md` của thư mục mockup landing.
 *
 * `?grp=` đổi tiêu đề, ảnh hero và sản phẩm chọn sẵn để khớp nhóm quảng cáo.
 */

type L<T = string> = Record<Locale, T>

export const AU_PATH: L = { vi: "/au", en: "/en/au" }
export const AU_THANK_YOU_PATH: L = { vi: "/au/cam-on", en: "/en/au/thank-you" }
export const AU_COSMETIC_PATH: L = { vi: "/au/tui-my-pham-in-logo", en: "/en/au/custom-cosmetic-bags" }

/** Mọi đường dẫn thuộc landing Úc ở cả hai ngôn ngữ — dùng để đổi kênh liên hệ nổi */
export function isAuPath(pathname: string): boolean {
  return [AU_PATH.vi, AU_PATH.en].some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

/** Túi thành viên AFLW (Brisbane Lions) — ảnh thật từ mockup, catalog chưa có */
export const AFLW_TOTE = "/media/au/bag-aflw-member-tote.webp"

export type AuVariant = {
  title: L<[before: string, highlight: string, after: string]>
  lead: L
  metaTitle: L
  product: LeadProductKey
  heroSlugs: [string, string, string]
}

export const AU_VARIANTS = {
  merch: {
    title: {
      vi: ["", "Túi, nón & áo polo", " may theo thương hiệu của bạn"],
      en: ["Custom ", "bags, caps & polos", " made for your brand"],
    },
    lead: {
      vi: "Chúng tôi không in logo lên hàng phôi có sẵn trong catalogue. Mỗi sản phẩm được cắt, may và trang trí theo thương hiệu của bạn – kích thước, chất liệu, màu sắc, phụ kiện – tại xưởng riêng, được Kiehl's, Vichy, Kérastase, Maybelline và AFLW tin dùng.",
      en: "We don't print your logo on a catalogue blank. We cut, sew and decorate every piece around your brand – your size, fabric, colour and trims – in our own factory, trusted by Kiehl's, Vichy, Kérastase, Maybelline and the AFLW.",
    },
    metaTitle: {
      vi: "Túi, nón, áo polo in logo – xưởng sản xuất cho thương hiệu Úc",
      en: "Custom Bags, Caps & Polos, Factory-Direct for Australian Brands",
    },
    product: "auSeveral",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "non-in-lua", "ao-polo"],
  },
  tote: {
    title: {
      vi: ["", "Túi tote & túi canvas", " may theo thương hiệu của bạn"],
      en: ["Custom ", "tote & canvas bags", " made for your brand"],
    },
    lead: {
      vi: "Túi được cắt, may và in theo thương hiệu của bạn – kích thước, chất liệu, màu sắc, phụ kiện – tại xưởng riêng, được Kiehl's, Vichy, Kérastase và AFLW tin dùng.",
      en: "We cut, sew and print the bag around your brand – your size, fabric, colour and trims – in our own factory, trusted by Kiehl's, Vichy, Kérastase and the AFLW.",
    },
    metaTitle: {
      vi: "Túi tote in logo – xưởng sản xuất cho thương hiệu Úc",
      en: "Custom Tote Bags, Factory-Direct for Australian Brands",
    },
    product: "auTote",
    heroSlugs: ["tui-canvas-cotton-phoi-coi", "tui-bo-in-lua-xach-tay", "tui-tote-size-lon"],
  },
  caps: {
    title: {
      vi: ["", "Nón & mũ bucket", " thêu logo theo yêu cầu"],
      en: ["Custom ", "caps & bucket hats", ", embroidered with your logo"],
    },
    lead: {
      vi: "Nón kết, nón lưới trucker, nón thể thao và mũ bucket may theo màu vải của bạn – thêu, in hoặc gắn patch logo. Giá xưởng cho đơn từ 300 cái.",
      en: "Caps, trucker caps, sports caps and bucket hats made in your fabric colours – embroidered, printed or patched. Factory-direct pricing for 300+ units.",
    },
    metaTitle: {
      vi: "Nón & mũ bucket thêu logo – giao tới Úc",
      en: "Custom Caps & Bucket Hats, Factory-Direct to Australia",
    },
    product: "auCaps",
    heroSlugs: ["non-in-lua", "non-kaki-phoi-luoi-the-thao", "non-du-loai"],
  },
  apparel: {
    title: {
      vi: ["", "Áo polo & áo thun thêu logo", " cho đội ngũ của bạn"],
      en: ["Custom ", "embroidered polos & tees", " for your team"],
    },
    lead: {
      vi: "Áo polo nhân viên, áo thun sự kiện và hoodie may theo màu của bạn, thêu hoặc in logo, nhận chia size theo từng mẫu – giá xưởng.",
      en: "Staff polos, event tees and hoodies sewn to your colours, with embroidered or printed logos and mixed size runs – factory-direct.",
    },
    metaTitle: {
      vi: "Áo polo, áo thun thêu logo cho doanh nghiệp Úc",
      en: "Custom Embroidered Polos & Tees for Australian Teams",
    },
    product: "auApparel",
    heroSlugs: ["ao-polo", "ao-thun-co-tron-in-full", "ao-polo-me-phoi-mau"],
  },
  cosmetic: {
    title: {
      vi: ["", "Túi mỹ phẩm & pouch", " cho thương hiệu làm đẹp"],
      en: ["Custom ", "cosmetic bags & pouches", " for beauty brands"],
    },
    lead: {
      vi: "Pouch quà tặng kèm (GWP), túi trang điểm và túi đựng đồ cá nhân may theo tiêu chuẩn thương hiệu – PU, canvas hoặc nylon, dập chìm hoặc in logo. Được các thương hiệu thuộc L'Oréal tin dùng.",
      en: "Gift-with-purchase pouches, makeup bags and toiletry cases made to your brand spec – PU, canvas or nylon, debossed or printed. Trusted by L'Oréal group brands.",
    },
    metaTitle: {
      vi: "Túi mỹ phẩm, pouch in logo cho thương hiệu làm đẹp",
      en: "Custom Cosmetic Bags & Pouches for Beauty Brands",
    },
    product: "auCosmetic",
    heroSlugs: ["tui-dung-my-pham-pu-mo-cao-cap", "pouch-canvas-dang-tru-do", "tui-xach-tay-canvas-phoi-pu-nau"],
  },
  drawstring: {
    title: {
      vi: ["", "Túi dây rút & túi calico", " in logo theo yêu cầu"],
      en: ["Custom ", "drawstring & calico bags", ", printed with your logo"],
    },
    lead: {
      vi: "Túi dây rút vải cotton và calico cho sự kiện, bao bì bán lẻ và bộ quà thành viên – kích thước, màu sắc và hình in theo ý bạn, giá xưởng.",
      en: "Cotton and calico drawstring bags for events, retail packaging and member packs – your size, colour and print, factory-direct.",
    },
    metaTitle: {
      vi: "Túi dây rút, túi calico in logo – giá xưởng",
      en: "Custom Drawstring & Calico Bags, Factory-Direct",
    },
    product: "auDrawstring",
    heroSlugs: ["tui-canvas-co-day-rut", "tui-tote-size-lon", "tui-bo-in-lua-xach-tay"],
  },
  backpack: {
    title: {
      vi: ["", "Balo in logo thương hiệu", " may theo yêu cầu"],
      en: ["Custom ", "branded backpacks", ", made to your spec"],
    },
    lead: {
      vi: "Balo cho nhân viên mới, câu lạc bộ và sự kiện – vải chống thấm nước, màu sắc và logo của bạn, sản xuất tại xưởng riêng.",
      en: "Backpacks for staff onboarding, clubs and events – water-resistant fabrics, your colours and logo, built in our own factory.",
    },
    metaTitle: {
      vi: "Balo in logo thương hiệu, may theo yêu cầu",
      en: "Custom Branded Backpacks, Made to Your Spec",
    },
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

export const AU_QUANTITIES: L<string[]> = {
  vi: ["Dưới 300", "300 – 1.000", "1.000 – 5.000", "Trên 5.000"],
  en: ["Under 300", "300 – 1,000", "1,000 – 5,000", "5,000+"],
}
export const AU_BUDGETS: L<string[]> = {
  vi: ["Dưới A$5", "A$5 – A$10", "A$10 – A$20", "Trên A$20", "Chưa xác định"],
  en: ["Under $5", "$5 – $10", "$10 – $20", "$20+", "Not sure yet"],
}

/** 4 danh mục lớn — trỏ sang trang riêng nếu đã có, còn lại về biến thể `?grp=` của trang chung */
export function auCategories(locale: Locale) {
  const hub = AU_PATH[locale]
  const vi = locale === "vi"
  return [
    {
      title: vi ? "Túi in logo" : "Custom bags",
      text: vi ? "Tote, calico, dây rút, balo, túi giữ nhiệt" : "Totes, calico, drawstring, backpacks, coolers",
      image: "/media/au/bag-olaplex-tote.webp",
      href: `${hub}?grp=tote`,
    },
    {
      title: vi ? "Túi mỹ phẩm" : "Cosmetic bags",
      text: vi
        ? "Pouch, túi trang điểm, hộp vanity cho thương hiệu làm đẹp"
        : "Pouches, makeup bags, vanity cases for beauty brands",
      image: "/media/au/cos-lancome-round.webp",
      href: AU_COSMETIC_PATH[locale],
    },
    {
      title: vi ? "Nón & mũ" : "Caps & hats",
      text: vi ? "Nón kết, trucker, visor, mũ bucket, mũ rộng vành" : "Caps, truckers, visors, bucket and sun hats",
      image: "/media/au/cap-kiehls-denim.webp",
      href: `${hub}?grp=caps`,
    },
    {
      title: vi ? "Áo polo & áo thun" : "Polos & apparel",
      text: vi ? "Polo, áo thun, áo đấu, hoodie, áo khoác" : "Polos, tees, jerseys, hoodies, jackets",
      image: "/media/au/app-polo-navy.webp",
      href: `${hub}?grp=apparel`,
    },
  ]
}

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
  tag: L
  name: L
  note: L
  product: LeadProductKey
  /** Ảnh riêng thay cho ảnh catalog của `slug` */
  image?: string
}[] = [
  {
    slug: "tui-canvas-cotton-phoi-coi",
    tab: "tote",
    tag: { vi: "Túi canvas", en: "Canvas tote" },
    name: { vi: "Túi canvas phối cói", en: "Canvas tote with straw panel" },
    note: { vi: "Phối hai chất liệu, đúng màu thương hiệu", en: "Two-material build, brand-matched colour" },
    product: "auTote",
  },
  {
    slug: "tui-bo-in-lua-xach-tay",
    tab: "tote",
    tag: { vi: "In lụa", en: "Screen printed" },
    name: { vi: "Túi canvas in lụa", en: "Screen printed canvas tote" },
    note: { vi: "Logo in dọc thân và quai túi", en: "Logo printed along body and handles" },
    product: "auTote",
  },
  {
    slug: "tui-tote-size-lon",
    tab: "tote",
    tag: { vi: "Túi sự kiện", en: "Event tote" },
    name: { vi: "Túi tote khổ lớn in full", en: "Large full-print tote" },
    note: { vi: "Làm cho AFLW – sự kiện, thành viên, bán lẻ", en: "Made for AFLW – events, members, retail" },
    product: "auTote",
    image: AFLW_TOTE,
  },
  {
    slug: "tui-xach-tay-canvas-phoi-pu-nau",
    tab: "tote",
    tag: { vi: "Túi cao cấp", en: "Premium tote" },
    name: { vi: "Túi canvas quai da PU", en: "Canvas with faux-leather handles" },
    note: { vi: "Logo dập chìm, hoàn thiện chuẩn salon", en: "Debossed logo, salon-grade finish" },
    product: "auTote",
  },
  {
    slug: "tui-dung-my-pham-pu-mo-cao-cap",
    tab: "cosmetic",
    tag: { vi: "Pouch mỹ phẩm", en: "Cosmetic pouch" },
    name: { vi: "Pouch mỹ phẩm PU", en: "PU cosmetic pouch" },
    note: { vi: "Quà tặng kèm cho thương hiệu làm đẹp", en: "Gift-with-purchase for beauty brands" },
    product: "auCosmetic",
  },
  {
    slug: "tui-simili-deo-cheo",
    tab: "cosmetic",
    tag: { vi: "Phụ kiện", en: "Accessories" },
    name: { vi: "Túi đeo chéo giả da", en: "Faux-leather crossbody" },
    note: { vi: "Logo dập chìm, hoàn thiện như hàng bán lẻ", en: "Debossed logo, retail-ready finish" },
    product: "auCosmetic",
  },
  {
    slug: "tui-canvas-co-day-rut",
    tab: "other",
    tag: { vi: "Túi dây rút", en: "Drawstring" },
    name: { vi: "Túi dây rút cotton", en: "Cotton drawstring bag" },
    note: { vi: "Bao bì kiểu calico và quà thương hiệu", en: "Calico-style packaging and merch" },
    product: "auDrawstring",
  },
  {
    slug: "balo-hoc-sinh",
    tab: "other",
    tag: { vi: "Balo", en: "Backpack" },
    name: { vi: "Balo in logo", en: "Custom backpack" },
    note: { vi: "Vải chống thấm, in theo nhận diện", en: "Water-resistant fabric, printed to brand" },
    product: "auDrawstring",
  },
  {
    slug: "non-in-lua",
    tab: "caps",
    tag: { vi: "Nón kết", en: "Cap" },
    name: { vi: "Nón thêu hoặc in logo", en: "Embroidered or printed cap" },
    note: { vi: "Làm cho Maybelline – đúng màu thương hiệu", en: "Made for Maybelline – brand-matched colours" },
    product: "auCaps",
  },
  {
    slug: "non-kaki-phoi-luoi-the-thao",
    tab: "caps",
    tag: { vi: "Nón thể thao", en: "Sports cap" },
    name: { vi: "Nón thể thao phối lưới", en: "Sports cap with mesh panels" },
    note: { vi: "Thoáng khí, thêu hoặc in logo", en: "Breathable, embroidered or printed logo" },
    product: "auCaps",
  },
  {
    slug: "ao-polo",
    tab: "apparel",
    tag: { vi: "Áo polo", en: "Polo" },
    name: { vi: "Áo polo cá sấu thêu logo", en: "Embroidered pique polo" },
    note: { vi: "Bo cổ dệt riêng, màu thương hiệu", en: "Custom knit collar, your brand colours" },
    product: "auApparel",
  },
  {
    slug: "ao-thun-co-tron-in-full",
    tab: "apparel",
    tag: { vi: "Áo thun", en: "T-shirt" },
    name: { vi: "Áo thun sự kiện in full", en: "Full-print event tee" },
    note: { vi: "In chuyển nhiệt tràn viền, màu rực", en: "Sublimated edge to edge, vivid colour" },
    product: "auApparel",
  },
]

/** WhatsApp dùng chung số Zalo (cần xác nhận số của người trả lời tiếng Anh) */
export function whatsappUrl(intlPhone: string): string {
  return `https://wa.me/${intlPhone.replace(/\D/g, "")}`
}

/** Trang túi mỹ phẩm — ảnh thật làm cho các thương hiệu làm đẹp, lấy từ mockup */
export const AU_COSMETIC_SHOWCASE: { image: string; tag: L; name: L; note: L }[] = [
  {
    image: "/media/au/cos-kiehls-red.webp",
    tag: { vi: "Pouch canvas", en: "Canvas pouch" },
    name: { vi: "Túi mỹ phẩm canvas", en: "Canvas cosmetic bag" },
    note: { vi: "Làm cho Kiehl's – đầu kéo khoá có logo", en: "Made for Kiehl's – logo zip puller" },
  },
  {
    image: "/media/au/cos-lancome-round.webp",
    tag: { vi: "Pouch tròn", en: "Round pouch" },
    name: { vi: "Pouch PU tròn bóng", en: "Glossy round PU pouch" },
    note: { vi: "Làm cho Lancôme – chiến dịch Idôle", en: "Made for Lancôme – Idôle campaign" },
  },
  {
    image: "/media/au/cos-paulas-choice.webp",
    tag: { vi: "Túi PU", en: "PU bag" },
    name: { vi: "Túi mỹ phẩm giả da", en: "Faux-leather cosmetic bag" },
    note: { vi: "Làm cho Paula's Choice – logo ép nhũ", en: "Made for Paula's Choice – foil logo" },
  },
  {
    image: "/media/au/cos-la-roche-posay.webp",
    tag: { vi: "Pouch PU", en: "PU pouch" },
    name: { vi: "Pouch giả da", en: "Faux-leather pouch" },
    note: { vi: "Làm cho La Roche-Posay", en: "Made for La Roche-Posay" },
  },
  {
    image: "/media/au/cos-lancome-square.webp",
    tag: { vi: "Bộ du lịch", en: "Travel kit" },
    name: { vi: "Pouch du lịch có ô trong suốt", en: "Clear-window travel pouch" },
    note: { vi: "Làm cho Lancôme – bao bì bộ du lịch", en: "Made for Lancôme – travel kit packaging" },
  },
  {
    image: "/media/au/cos-kerastase.webp",
    tag: { vi: "Pouch dẹt", en: "Flat pouch" },
    name: { vi: "Pouch canvas sọc", en: "Striped canvas pouch" },
    note: { vi: "Làm cho Kérastase – nhãn dệt", en: "Made for Kérastase – woven label" },
  },
  {
    image: "/media/au/cos-kiehls-vanity.webp",
    tag: { vi: "Hộp vanity", en: "Vanity case" },
    name: { vi: "Hộp vanity đứng form", en: "Structured vanity case" },
    note: { vi: "Làm cho Kiehl's – quai treo", en: "Made for Kiehl's – hanging handle" },
  },
  {
    image: "/media/au/cos-kiehls-cylinder.webp",
    tag: { vi: "Pouch trụ", en: "Cylinder pouch" },
    name: { vi: "Pouch canvas dáng trụ", en: "Cylinder canvas pouch" },
    note: { vi: "Làm cho cửa hàng flagship Kiehl's", en: "Made for Kiehl's flagship store" },
  },
  {
    image: "/media/au/cos-holographic.webp",
    tag: { vi: "Hologram", en: "Holographic" },
    name: { vi: "Túi TPU hologram", en: "Holographic TPU bag" },
    note: { vi: "Làm cho Pantene – bộ quà GWP", en: "Made for Pantene – GWP bundle" },
  },
  {
    image: "/media/au/cos-mesh.webp",
    tag: { vi: "Túi lưới", en: "Mesh bag" },
    name: { vi: "Túi mỹ phẩm vải lưới", en: "Mesh cosmetic bag" },
    note: { vi: "Làm cho Paula's Choice – patch in", en: "Made for Paula's Choice – printed patches" },
  },
  {
    image: "/media/au/cos-pvc-canvas.webp",
    tag: { vi: "Túi trong suốt", en: "Clear bag" },
    name: { vi: "Túi PVC trong phối canvas", en: "Clear PVC + canvas bag" },
    note: { vi: "Tiện mang lên máy bay", en: "Airport-friendly travel bag" },
  },
  {
    image: "/media/au/cos-vanity-case.webp",
    tag: { vi: "Hộp vanity", en: "Vanity case" },
    name: { vi: "Hộp vanity giả da", en: "Faux-leather vanity case" },
    note: { vi: "Quai xách trên, đáy đứng form", en: "Top handle, structured base" },
  },
]
