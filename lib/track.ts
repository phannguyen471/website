/**
 * Gửi sự kiện tới GA4 qua `gtag()` mà layout đã khai báo sẵn.
 *
 * Không đẩy object thô vào `dataLayer` vì gtag.js bỏ qua dạng đó — chỉ GTM
 * mới đọc được. Khi nào chuyển sang GTM thì sửa đúng một chỗ này.
 */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.("event", event, params)
}
