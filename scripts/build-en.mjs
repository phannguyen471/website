/**
 * Sinh data/i18n/en.json từ bảng dịch bên dưới + dữ liệu gốc trong data/.
 * Slug tiếng Anh được tạo tự động từ tên tiếng Anh và kiểm tra trùng lặp.
 *
 * Chạy lại mỗi khi thêm/sửa bản dịch: node scripts/build-en.mjs
 */
import { readFileSync, writeFileSync } from "node:fs"

const read = (f) => JSON.parse(readFileSync(new URL(`../data/${f}`, import.meta.url), "utf8"))
const products = read("products.json")
const categories = read("categories.json")
const articles = read("news.json")

/* ── Tên sản phẩm: slug gốc → tên tiếng Anh ───────────────────────── */
const PRODUCT_NAMES = {
  // áo thun
  "ao-3-lo": "Tank top",
  "ao-boi-in-chuyen": "Sublimation-printed swim top",
  "ao-luoi-1-lop": "Single-layer mesh jersey",
  "ao-luoi-2-lop": "Two-layer mesh jersey",
  "ao-tank-top-nam": "Men's tank top",
  "ao-thun-co-tron-in-full": "Full-print crew neck t-shirt",
  "ao-thun-cotton-den": "Black cotton t-shirt",
  "ao-thun-in-chuyen-em-be": "Baby sublimation-printed t-shirt",
  "ao-thun-in-chuyen-nhiet": "Heat-transfer printed t-shirt",
  "ao-thun-in-nhiet": "Heat-printed t-shirt",
  "ao-thun-lanh-in-chuyen": "Sublimation-printed cool-touch t-shirt",
  "ao-thun-lanh": "Cool-touch t-shirt",
  "ao-thun-me-in-chuyen-nhiet": "Heat-transfer printed textured-knit t-shirt",
  "ao-thun-me": "Textured-knit t-shirt",
  "ao-tre-em-in-chuyen-nhiet": "Heat-transfer printed kids' t-shirt",

  // Áo Nón các loại
  "ao-ca-sau-poly": "Polyester piqué polo shirt",
  "ao-cotton-in-decal": "Decal-printed cotton t-shirt",
  "ao-dong-phuc": "Corporate uniform shirt",
  "ao-khoac-du-loai": "Jackets, all styles",
  "ao-luoi-in-chuyen-nhiet": "Heat-transfer printed mesh jersey",
  "ao-polo-du-loai": "Polo shirts, all styles",
  "ao-polo-in-chuyen": "Sublimation-printed polo shirt",
  "ao-polo": "Polo shirt",
  "ao-youth-in-chuyen": "Sublimation-printed youth t-shirt",
  "ao-youth": "Youth t-shirt",
  "dong-phuc-mam-non": "Preschool uniform",
  "gia-do-dien-thoai": "Phone stand",
  "goi-co-cao-su-du-lich": "Latex travel neck pillow",
  "non-in-lua": "Screen-printed cap",
  "non-jean-wash": "Washed denim cap",
  "non-kaki-du-lich-nhieu-mau": "Multicolour khaki travel cap",
  "non-kaki-du-mau": "Khaki cap in assorted colours",
  "non-kaki-in-mo": "Matte-print khaki cap",
  "non-kaki-mau-den": "Black khaki cap",
  "non-kaki-nhieu-mau": "Multicolour khaki cap",
  "non-kaki-phoi-luoi-the-thao": "Khaki sports cap with mesh panels",
  "non-kaki-phoi-mau": "Two-tone khaki cap",
  "non-kaki-vn": "Vietnam khaki cap",
  "non-nu-vai-du-chong-nuoc": "Women's water-resistant nylon hat",
  "non-tai-beo-hinh-gau-truc": "Panda bucket hat",
  "non-tai-beo-jean": "Denim bucket hat",
  "non-the-thao-nua-dau": "Sports visor",
  "non-the-thao-trang": "White sports cap",
  "non-vai-jean-xanh-nhat": "Light blue denim cap",
  "non-vanh-to-the-thao": "Wide-brim sports hat",

  // Túi các Loại
  "balo-em-be-hinh-thu": "Animal-shaped kids' backpack",
  "balo-hoc-sinh-in-chuyen": "Sublimation-printed school backpack",
  "balo-hoc-sinh-trung-hoc": "High school backpack",
  "balo-hoc-sinh": "School backpack",
  "balo-pg": "P&G backpack",
  "balo-rut-in-chuyen-nhiet": "Heat-transfer printed drawstring backpack",
  "balo-rut-nhua-pvc": "PVC drawstring backpack",
  "balo-rut-phoi-pvc-cao-cap": "Premium PVC-panel drawstring backpack",
  "balo-rut-vai-canvas": "Canvas drawstring backpack",
  "balo-rut": "Drawstring backpack",
  "combo-cac-san-pham": "Gift product combo set",
  "hop-com-giu-nhiet": "Insulated lunch box",
  "tui-cam-tay": "Clutch pouch with key hook",
  "tui-canvas-co-day-rut": "Canvas drawstring bag",
  "tui-canvas-cotton-phoi-coi": "Cotton canvas bag with straw trim",
  "tui-canvas-den": "Black canvas bag",
  "tui-canvas-doi-mau": "Colour-changing canvas bag",
  "tui-canvas-hat-lon": "Coarse-weave canvas bag",
  "tui-canvas-in-chuyen": "Sublimation-printed canvas bag",
  "tui-canvas-poly-deo-vai-in-chuyen": "Sublimation-printed poly canvas shoulder bag",
  "tui-canvas-poly-size-lon-in-decal": "Large decal-printed poly canvas bag",
  "tui-canvas-size-to": "Oversized canvas bag",
  "tui-chan-bong-deo-cheo": "Quilted crossbody bag",
  "tui-coi": "Straw bag",
  "tui-deo-cheo": "Crossbody bag",
  "tui-deo-vai-cao-cap": "Premium shoulder bag",
  "tui-deo-vai-hinh-ban-nguyet": "Half-moon shoulder bag",
  "tui-deo-vai-xach-tay-tien-dung": "Convertible shoulder and hand bag",
  "tui-deo-vai": "Shoulder bag",
  "tui-du-lich-ca-nhan": "Personal travel bag",
  "tui-du-lich-canvas-phoi-gia-da": "Canvas travel bag with faux leather trim",
  "tui-du-lich-canvas": "Canvas travel bag",
  "tui-du-lich-cao-cap": "Premium travel bag",
  "tui-du-lich-do": "Red travel bag",
  "tui-du-lich-mini": "Mini travel bag",
  "tui-du-lich-tien-dung": "Everyday travel bag",
  "tui-dung-laptop-vai-canvas": "Canvas laptop sleeve",
  "tui-dung-my-pham-du-lich": "Travel cosmetic bag",
  "tui-dung-my-pham-gia-da": "Faux leather cosmetic bag",
  "tui-dung-my-pham-pu-mo-cao-cap": "Premium matte PU cosmetic bag",
  "tui-in-chuyen-vai-poly": "Sublimation-printed polyester bag",
  "tui-luoi-du-lich": "Mesh travel bag",
  "tui-luoi": "Mesh bag",
  "tui-nhua-luoi": "Mesh PVC bag",
  "tui-phao-chan-bong-2-lop": "Double-layer puffer bag",
  "tui-phao-chan-bong-deo-cheo": "Quilted puffer crossbody bag",
  "tui-phao-chan-bong-size-lon": "Large quilted puffer bag",
  "tui-phao-chan-bong": "Quilted puffer bag",
  "tui-simili-deo-cheo": "Faux leather crossbody bag",
  "tui-tote-size-lon-in-chuyen": "Large sublimation-printed tote bag",
  "tui-tote-size-lon": "Large tote bag",
  "tui-xach-tay-tienm-dung": "Cooler bag with bottle opener",

  // Túi xách tay
  "tui-bo-in-lua-xach-tay": "Screen-printed canvas tote",
  "tui-canvas-size-lon-cao-cap": "Premium large canvas tote",
  "tui-canvas-size-lon-form-cung": "Large structured canvas tote",
  "tui-canvas-xach-tay": "Canvas hand tote",
  "tui-deo-vai-gia-da": "Faux leather shoulder bag",
  "tui-dung-my-pham-halogram": "Holographic cosmetic bag",
  "tui-dung-my-pham-nhua-pvc-phoi-canvas": "PVC and canvas cosmetic bag",
  "tui-dung-my-pham-si": "Faux leather cosmetic pouch",
  "tui-dung-my-pham": "Cosmetic bag",
  "tui-my-pham-chan-bong": "Quilted cosmetic bag",
  "tui-phao-dung-my-pham": "Puffer cosmetic bag",
  "tui-xach-cac-loai": "Handbag, assorted styles",
  "tui-xach-tay-bo-600-pu": "600D canvas and PU handbag",
  "tui-xach-tay-canvas-phoi-pu-nau": "Canvas handbag with brown PU trim",
  "tui-xach-tay-vai-sweed": "Suede handbag",
}

/* ── Mô tả sản phẩm (chỉ 5 sản phẩm gốc có mô tả) ─────────────────── */
const PRODUCT_DESCRIPTIONS = {
  "ao-polo-in-chuyen": `Material: piqué knit
Composition: 100% polyester
- UV protection
- Sublimation printing
- Water repellent
- Quick drying
- Smart and youthful`,
  "ao-thun-me": "Textured-knit crew neck t-shirt",
  "tui-canvas-size-to":
    "Add a touch of personality to any look — this oversized bag makes a style of its own.",
  "tui-deo-vai-hinh-ban-nguyet":
    "The elegant half-moon silhouette gives this Ida bag a modern feel and makes it the ideal companion, whether you are shining on the beach or travelling with confidence. A refined balance of style and practicality, it is the perfect way to refresh a favourite outfit with a look that is as fashionable as it is comfortable.",
  "tui-du-lich-do": `Multi-purpose travel bag
Can be carried on the shoulder or by hand, with several compartments for clothes, shoes and more
Available in red and grey`,
}

/* ── Danh mục & nhóm ──────────────────────────────────────────────── */
const CATEGORY_NAMES = {
  balo: "Backpacks",
  "tui-du-lich": "Travel bags",
  "tui-tote": "Tote bags",
  "tui-rut": "Drawstring bags",
  "tui-phao-chan-bong": "Quilted puffer bags",
  "tui-deo-vai": "Shoulder bags",
  "tui-deo-cheo": "Crossbody bags",
  "tui-xach-tay": "Handbags",
  "tui-dung-my-pham": "Cosmetic bags",
  "ao-thun": "T-shirts",
  "ao-polo": "Polo shirts",
  "dong-phuc": "Uniforms",
  "ao-khoac": "Jackets",
  "ao-the-thao": "Sports jerseys",
  "non-ket": "Structured caps",
  "non-tai-beo": "Bucket hats",
  "non-the-thao": "Sports caps",
  "phu-kien": "Accessories",
}

const GROUP_NAMES = {
  "tui-xach": "Bags",
  ao: "Apparel",
  non: "Caps",
  "phu-kien": "Accessories",
}

const GROUP_DESCRIPTIONS = {
  "tui-xach": "Backpacks, totes, travel bags, more — ready for your logo.",
  ao: "T-shirts, polos, uniforms, jackets for the whole team.",
  non: "Caps, bucket hats, sport caps, embroidered to order.",
  "phu-kien": "Small extras round out your gift set.",
}

/* ── Bài viết (tin tức + dịch vụ) ─────────────────────────────────── */
const ARTICLE_TITLES = {
  "canton-fair-2023": "Canton Fair 2023",
  "dan-khach-di-hc": "Escorting clients to trade fairs",
  "dan-khach-di-hoi-cho-tq": "Escorting clients to trade fairs in China",
  "dan-khach-di-nha-may-san-xuat": "Factory visit escort service",
  "dich-cac-loai-sach": "Translation of books across all genres",
  "dich-sach": "Book translation",
  "dich-sach-tu-viet-sang-trung": "Vietnamese to Chinese book translation",
  "dich-truc-tiep": "Live interpreting",
  "dich-truyen": "Fiction and comic translation",
  "dich-vu-dich-cabin": "Simultaneous booth interpreting",
  "dich-vu-dich-thuat": "Translation services",
  "cach-chon-tui-vai-qua-tang-doanh-nghiep": "How to choose corporate gift tote bags for every event",
  "dong-phuc-cong-ty-in-logo": "Branded company uniforms: a guide to fabric and bulk ordering",
  "non-in-logo-thuong-hieu-chon-loai-nao": "Branded caps: structured cap, bucket hat, or sports cap?",
  "luu-y-khi-in-logo-len-qua-tang-doanh-nghiep": "5 tips for printing your logo on corporate gifts without fading or smudging",
}

/* ── Thương hiệu ──────────────────────────────────────────────────── */
const BRAND = {
  legal_name: "PHAN NGUYEN PRODUCTION – TRADING – SERVICE ONE MEMBER CO., LTD",
  brand_name: "Phan Nguyen",
  tagline: "PHAN NGUYEN – LEADING THE CORPORATE GIFT TREND",
  motto: "Distinctive design, optimal quality, fair pricing, flawless service",
  experience: "Over 10 years in the corporate gift industry",
  industry:
    "Design and manufacture of corporate gifts and promotional items (bags, backpacks, t-shirts, caps and more)",
  address:
    "471/25/2 Pham Van Bach Street, Ward 15, Tan Binh District, Ho Chi Minh City, Vietnam",
  street_address: "471/25/2 Pham Van Bach Street, Ward 15",
  locality: "Tan Binh District, Ho Chi Minh City",
  placename: "Ho Chi Minh City",
  clients: {
    "Tập đoàn L'Oréal Việt Nam": "L'Oréal Vietnam Group",
    "AMOREPACIFIC Việt Nam": "AMOREPACIFIC Vietnam",
    "Kao Việt Nam": "Kao Vietnam",
    "Shiseido Việt Nam": "Shiseido Vietnam",
    "Cô Gái Hà Lan": "Dutch Lady",
  },
  process: {
    1: {
      name: "CONSULTATION",
      desc: "We take your brief and advise on the gift that best fits your audience, campaign goals and budget, then send a quotation.",
    },
    2: {
      name: "DESIGN",
      desc: "We develop the concept, product styling and logo artwork for you to review and adjust as you wish.",
    },
    3: { name: "SAMPLING", desc: "We produce a sample and confirm it with you." },
    4: { name: "CONTRACT", desc: "Both parties negotiate and sign the contract." },
    5: {
      name: "PRODUCTION",
      desc: "Manufacturing and printing are carried out exactly to the agreed specification.",
    },
    6: {
      name: "DELIVERY",
      desc: "We pack and deliver on the schedule agreed in the contract.",
    },
  },
}

/* ── Sinh slug ────────────────────────────────────────────────────── */
function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/* ── Dựng file ────────────────────────────────────────────────────── */
const errors = []

const outProducts = {}
const seenSlug = new Map()
for (const p of products) {
  const name = PRODUCT_NAMES[p.slug]
  if (!name) {
    errors.push(`Thiếu bản dịch tên sản phẩm: ${p.slug} (${p.name.trim()})`)
    continue
  }
  let slug = slugify(name)
  if (seenSlug.has(slug)) {
    // Trùng slug: thêm hậu tố từ slug gốc để giữ URL duy nhất và ổn định
    slug = `${slug}-${slugify(p.slug).split("-").slice(-1)[0]}`
    if (seenSlug.has(slug)) errors.push(`Slug EN trùng không giải được: ${slug}`)
  }
  seenSlug.set(slug, p.slug)
  outProducts[p.slug] = {
    slug,
    name,
    ...(PRODUCT_DESCRIPTIONS[p.slug] ? { description: PRODUCT_DESCRIPTIONS[p.slug] } : {}),
  }
}

const outCategories = {}
for (const c of categories) {
  const name = CATEGORY_NAMES[c.slug]
  if (!name) {
    errors.push(`Thiếu bản dịch danh mục: ${c.slug}`)
    continue
  }
  outCategories[c.slug] = { slug: slugify(name), name }
}

const outGroups = {}
for (const [viSlug, name] of Object.entries(GROUP_NAMES)) {
  outGroups[viSlug] = {
    slug: slugify(name),
    name,
    ...(GROUP_DESCRIPTIONS[viSlug] ? { description: GROUP_DESCRIPTIONS[viSlug] } : {}),
  }
}

const outArticles = {}
for (const a of articles) {
  const title = ARTICLE_TITLES[a.slug]
  if (!title) {
    errors.push(`Thiếu bản dịch bài viết: ${a.slug}`)
    continue
  }
  outArticles[a.slug] = { slug: slugify(title), title }
}

if (errors.length) {
  console.error("✗ " + errors.join("\n✗ "))
  process.exit(1)
}

const payload = {
  _generated: "scripts/build-en.mjs — không sửa tay, sửa bảng dịch trong script rồi chạy lại",
  brand: BRAND,
  groups: outGroups,
  categories: outCategories,
  products: outProducts,
  articles: outArticles,
}

writeFileSync(new URL("../data/i18n/en.json", import.meta.url), JSON.stringify(payload, null, 1) + "\n")

/* ── Bảng map slug hai chiều, dùng cho nút đổi ngôn ngữ ở phía client ── */
const viToEn = {}
const enToVi = {}
for (const table of [outProducts, outCategories, outGroups, outArticles]) {
  for (const [viSlug, v] of Object.entries(table)) {
    viToEn[viSlug] = v.slug
    enToVi[v.slug] = viSlug
  }
}
writeFileSync(
  new URL("../data/i18n/slug-map.json", import.meta.url),
  JSON.stringify({ "vi->en": viToEn, "en->vi": enToVi }, null, 1) + "\n",
)
console.log(
  `✓ data/i18n/en.json — ${Object.keys(outProducts).length} sản phẩm, ${Object.keys(outCategories).length} danh mục, ${Object.keys(outGroups).length} nhóm, ${Object.keys(outArticles).length} bài viết`,
)
