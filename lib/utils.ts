import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Dữ liệu gốc lưu đường dẫn ảnh dạng `assets/upload/...`.
 * Toàn bộ media được copy sang `public/media/`, nên chỉ cần đổi tiền tố.
 */
export function media(path: string | undefined | null): string {
  if (!path) return "/media/upload/photo/phan-nguyen-4110.png"
  if (path.startsWith("http") || path.startsWith("/")) return path
  return "/media/" + path.replace(/^assets\//, "")
}

/** "Liên hệ" hoặc "120.000đ" → hiển thị nhất quán */
export function formatPrice(price: string | undefined): string {
  const p = (price || "").trim()
  return p.length ? p : "Liên hệ"
}

export function isQuotePrice(price: string | undefined): boolean {
  return !/\d/.test(price || "")
}

/** Bỏ dấu tiếng Việt để so sánh/tìm kiếm không phân biệt dấu */
export function deaccent(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
}
