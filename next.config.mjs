/**
 * `ALLOW_INDEXING` phải đúng bằng chuỗi "true" thì site mới cho phép Google
 * lập chỉ mục. Mặc định (biến chưa đặt) => gắn header `X-Robots-Tag: noindex`
 * vào **mọi** response, kể cả sitemap.xml và file ảnh trong /media — những thứ mà
 * thẻ <meta> không với tới được.
 *
 * Xem lib/seo.ts để biết cách bật lại khi cần.
 */
const allowIndexing = process.env.ALLOW_INDEXING === "true"

/** @type {import('next').NextConfig} */
export default {
  images: { unoptimized: true },
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
