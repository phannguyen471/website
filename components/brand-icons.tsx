import Image from "next/image"

/**
 * Logo mạng xã hội — ảnh do khách hàng cung cấp trực tiếp
 * (public/logo/zalo.webp), không phải icon tự vẽ. Nền trong suốt, xuất ở
 * 512×512 nên sắc nét trên màn Retina.
 */
type BrandIconProps = { className?: string; size?: number }

export function IconZalo({ className, size = 32 }: BrandIconProps) {
  return (
    <Image
      src="/logo/zalo.webp"
      alt="Zalo"
      width={size}
      height={size}
      className={className}
    />
  )
}

/** Logo WhatsApp vẽ bằng SVG (chưa có file ảnh do khách cung cấp) — nền tròn xanh đặc trưng */
export function IconWhatsApp({ className, size = 32 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        fill="#fff"
        d="M16 6.5a9.5 9.5 0 0 0-8.2 14.3L6.5 25.5l4.8-1.3A9.5 9.5 0 1 0 16 6.5Zm5.1 13.5c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .2-3.2-.7-2.7-1-4.3-3.7-4.5-3.9-.1-.2-1-1.4-1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.5.2.5.3.1.1.1.6-.1 1.2Z"
      />
    </svg>
  )
}
