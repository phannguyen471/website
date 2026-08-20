import { notFound } from "next/navigation"

/**
 * Bắt mọi đường dẫn không khớp route nào để trang 404 được render bên
 * trong layout của ngôn ngữ hiện tại (đúng `<html lang>`, đúng nav/footer).
 * Segment tĩnh luôn được ưu tiên hơn catch-all nên route thật không bị nuốt.
 */
export default function CatchAll() {
  notFound()
}
