import type { MetadataRoute } from "next"
import { ALLOW_INDEXING } from "@/lib/seo"
import { SITE } from "@/lib/routes"

/**
 * Khi chưa cho index: chặn toàn bộ và KHÔNG khai báo sitemap, để không mời
 * bot đi thu thập 262 URL.
 *
 * Lưu ý: robots.txt chỉ ngăn *thu thập*, không ngăn *lập chỉ mục* — một URL bị
 * chặn ở đây vẫn có thể lọt vào kết quả tìm kiếm nếu site khác trỏ link tới.
 * Vì vậy thẻ `noindex` và header `X-Robots-Tag` mới là tầng bảo vệ chính,
 * còn robots.txt là lớp phụ.
 */
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: [{ userAgent: "*", disallow: "/" }] }
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
