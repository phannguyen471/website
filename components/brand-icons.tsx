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
