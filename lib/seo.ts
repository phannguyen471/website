/**
 * Công tắc cho phép công cụ tìm kiếm lập chỉ mục (index).
 *
 * MẶC ĐỊNH LÀ **TẮT** — website sẽ báo `noindex` với Google và mọi bot khác.
 * Chỉ khi biến môi trường `ALLOW_INDEXING` được đặt đúng bằng chuỗi "true"
 * thì site mới cho phép index. Quên hoặc gõ sai đều rơi về trạng thái an toàn
 * (không index), nên không thể vô tình để Google thu thập sớm.
 *
 * Khi nào muốn cho Google index:
 *   1. Đặt biến môi trường ALLOW_INDEXING=true trên môi trường production
 *   2. Build và deploy lại
 *   3. Kiểm tra bằng: curl -I https://phannguyenbags.vn | grep -i x-robots-tag
 *      (phải KHÔNG còn dòng x-robots-tag: noindex)
 *
 * Ba tầng chặn đang hoạt động, xem thêm:
 *   - lib/seo.ts        → thẻ <meta name="robots"> trên mọi trang
 *   - app/robots.ts     → nội dung /robots.txt
 *   - next.config.mjs   → HTTP header X-Robots-Tag cho MỌI response
 */
export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === "true"

/** Giá trị cho `metadata.robots` của Next.js */
export const robotsMeta = ALLOW_INDEXING
  ? { index: true, follow: true }
  : {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-snippet": -1,
        "max-image-preview": "none" as const,
        "max-video-preview": -1,
      },
    }
