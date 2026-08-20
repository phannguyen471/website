/**
 * Chuẩn bị dữ liệu cho website mới.
 *
 *  1. Copy content/*.json  →  data/
 *  2. Copy assets/*        →  public/media/
 *  3. Dựng data/promotions.json từ raw/uu-dai.html (giá cũ / giá mới / % giảm)
 *
 * Chạy:  node scripts/prep.mjs
 */

import { cp, mkdir, readFile, writeFile, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const web = resolve(here, "..")
const root = resolve(web, "..")

const SRC_CONTENT = join(root, "content")
const SRC_ASSETS = join(root, "assets")
const SRC_RAW = join(root, "raw")

const OUT_DATA = join(web, "data")
const OUT_MEDIA = join(web, "public", "media")

function log(step, msg) {
  console.log(`  ${step.padEnd(14)} ${msg}`)
}

/* ── 1. JSON nội dung ───────────────────────────────────────────── */

async function copyContent() {
  await mkdir(OUT_DATA, { recursive: true })
  const files = ["brand.json", "products.json", "categories.json", "news.json"]

  for (const f of files) {
    const src = join(SRC_CONTENT, f)
    if (!existsSync(src)) throw new Error(`Thiếu file dữ liệu: ${src}`)
    await cp(src, join(OUT_DATA, f))
    const n = JSON.parse(await readFile(src, "utf8"))
    log("content", `${f} (${Array.isArray(n) ? n.length + " mục" : "object"})`)
  }
}

/* ── 2. Media ───────────────────────────────────────────────────── */

async function copyMedia() {
  if (!existsSync(SRC_ASSETS)) throw new Error(`Thiếu thư mục assets: ${SRC_ASSETS}`)
  await rm(OUT_MEDIA, { recursive: true, force: true })
  await mkdir(OUT_MEDIA, { recursive: true })
  await cp(SRC_ASSETS, OUT_MEDIA, { recursive: true })
  log("media", `assets/ → public/media/`)
}

/* ── 3. Ưu đãi ──────────────────────────────────────────────────── */

async function buildPromotions() {
  const products = JSON.parse(await readFile(join(SRC_CONTENT, "products.json"), "utf8"))
  const bySlug = new Map(products.map((p) => [p.slug, p]))

  const promos = []
  const rawPath = join(SRC_RAW, "uu-dai.html")

  if (existsSync(rawPath)) {
    const html = await readFile(rawPath, "utf8")

    // Mỗi thẻ ưu đãi bắt đầu bằng badge "-NN%"; slug và giá nằm ngay sau đó.
    for (const m of html.matchAll(/-\s*(\d{1,3})\s*%/g)) {
      const chunk = html.slice(m.index, m.index + 2500)

      const slug = [...chunk.matchAll(/href="\/?([a-z0-9-]+)"/g)]
        .map((x) => x[1])
        .find((s) => bySlug.has(s))
      if (!slug || promos.some((p) => p.slug === slug)) continue

      const prices = [...chunk.matchAll(/([\d.]{3,})\s*đ/g)].map((x) => x[1] + "đ")
      const product = bySlug.get(slug)

      promos.push({
        slug,
        name: product.name.trim(),
        image: product.images_local[0] || "",
        price_new: prices[0] || product.price,
        price_old: prices[1] || "",
        discount: `-${m[1]}%`,
      })
    }
  }

  // Dự phòng: nếu không parse được, lấy mọi sản phẩm có giá bằng số.
  if (promos.length === 0) {
    for (const p of products) {
      if (/\d/.test(p.price)) {
        promos.push({
          slug: p.slug,
          name: p.name.trim(),
          image: p.images_local[0] || "",
          price_new: p.price,
          price_old: "",
          discount: "",
        })
      }
    }
    log("promotions", "không parse được uu-dai.html → dùng giá từ products.json")
  }

  await writeFile(join(OUT_DATA, "promotions.json"), JSON.stringify(promos, null, 1))
  log("promotions", `${promos.length} sản phẩm: ${promos.map((p) => p.slug).join(", ")}`)
}

/* ── Chạy ───────────────────────────────────────────────────────── */

console.log("\n▸ Chuẩn bị dữ liệu Phan Nguyễn\n")
await copyContent()
await buildPromotions()
await copyMedia()
console.log("\n✓ Xong. Chạy `pnpm dev` để xem website.\n")
