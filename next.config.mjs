/**
 * `ALLOW_INDEXING` phải đúng bằng chuỗi "true" thì site mới cho phép Google
 * lập chỉ mục. Mặc định (biến chưa đặt) => gắn header `X-Robots-Tag: noindex`
 * vào **mọi** response, kể cả sitemap.xml và file ảnh trong /media — những thứ mà
 * thẻ <meta> không với tới được.
 *
 * Xem lib/seo.ts để biết cách bật lại khi cần.
 */
const allowIndexing = process.env.ALLOW_INDEXING === "true"

/**
 * Khi biến `CLAUDE_VERIFY_BUILD` được đặt, build ghi ra `.next-verify/`
 * thay vì `.next/` — để build kiểm chứng của Claude không bao giờ đụng vào
 * cache mà `pnpm dev` của người dùng đang đọc dở giữa chừng (từng gây lỗi
 * "Cannot find module './xxx.js'" ba lần). Không đặt biến này thì hành vi
 * giống hệt mặc định của Next.js — không ảnh hưởng gì tới `pnpm dev` /
 * `pnpm build` / `pnpm start` bình thường của người dùng.
 */
const verifyBuild = process.env.CLAUDE_VERIFY_BUILD === "1"

/** @type {import('next').NextConfig} */
export default {
  images: { unoptimized: true },
  ...(verifyBuild ? { distDir: ".next-verify" } : {}),
  async headers() {
    if (allowIndexing) return []
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex, noarchive" },
        ],
      },
    ]
  },
}
