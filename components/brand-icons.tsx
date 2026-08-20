import Image from "next/image"

/**
 * Logo mạng xã hội — ảnh PNG do khách hàng cung cấp trực tiếp
 * (public/logo/facebook.png, messenger.png, zalo.png), không phải icon
 * tự vẽ. Nền trong suốt, xuất ở 512×512 nên sắc nét trên màn Retina.
 */
type BrandIconProps = { className?: string; size?: number }

export function IconFacebook({ className, size = 32 }: BrandIconProps) {
  return (
    <Image
      src="/logo/facebook.png"
      alt="Facebook"
      width={size}
      height={size}
      className={className}
    />
  )
}

export function IconMessenger({ className, size = 32 }: BrandIconProps) {
  return (
    <Image
      src="/logo/messenger.png"
      alt="Messenger"
      width={size}
      height={size}
      className={className}
    />
  )
}

export function IconZalo({ className, size = 32 }: BrandIconProps) {
  return (
    <Image
      src="/logo/zalo.png"
      alt="Zalo"
      width={size}
      height={size}
      className={className}
    />
  )
}
