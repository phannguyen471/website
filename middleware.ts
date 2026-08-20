import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, isLocale } from "@/lib/i18n"
import { INTERNAL_BY_PUBLIC } from "@/lib/routes"

/**
 * Ánh xạ URL công khai → route nội bộ.
 *
 * Route nội bộ luôn có dạng `/<locale>/<segment tiếng Việt>/...`.
 * Middleware chỉ viết lại đường dẫn (rewrite), không chuyển hướng, nên
 * URL trên thanh địa chỉ giữ nguyên như người dùng thấy:
 *
 *   /san-pham/tui-tote-size-lon  →  /vi/san-pham/tui-tote-size-lon
 *   /en/products/large-tote-bag  →  /en/san-pham/large-tote-bag
 *   /en                          →  /en
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const parts = pathname.split("/").filter(Boolean)

  const locale = parts[0] && isLocale(parts[0]) ? parts[0] : defaultLocale
  const rest = locale === defaultLocale ? parts : parts.slice(1)

  // Tiếng Việt vẫn nằm ở gốc — chặn truy cập trực tiếp vào /vi/... để
  // tránh hai URL cùng nội dung.
  if (parts[0] === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = "/" + parts.slice(1).join("/")
    return NextResponse.redirect(url)
  }

  const [section, ...tail] = rest
  const internalSection = section ? INTERNAL_BY_PUBLIC[locale][section] : undefined

  // Segment đầu tiên không thuộc bảng route → để Next.js tự trả 404
  if (section && !internalSection) {
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/${rest.join("/")}`
    return rewrite(request, url, locale)
  }

  const url = request.nextUrl.clone()
  url.pathname = ["", locale, internalSection, ...tail].filter(Boolean).join("/")
  return rewrite(request, url, locale)
}

/**
 * `not-found.tsx` không nhận được params, nên ngôn ngữ được truyền kèm
 * qua header để trang 404 hiển thị đúng thứ tiếng.
 */
function rewrite(request: NextRequest, url: URL, locale: string) {
  const headers = new Headers(request.headers)
  headers.set("x-locale", locale)
  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  /**
   * Bỏ qua API, asset nội bộ Next.js, và MỌI đường dẫn có phần mở rộng file
   * (đoạn cuối chứa dấu chấm — ảnh, font, .txt, .xml...). Dùng quy tắc theo
   * đuôi file thay vì liệt kê từng thư mục tĩnh (`media`, `logo`, `clients`)
   * để không lặp lại lỗi 404 mỗi khi thêm thư mục ảnh mới mà quên cập nhật
   * matcher — đã xảy ra 2 lần trước khi đổi sang quy tắc này.
   */
  matcher: ["/((?!api|_next/static|_next/image)(?!.*\\.).*)"],
}
