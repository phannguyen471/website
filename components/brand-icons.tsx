/**
 * Logo mạng xã hội — vẽ theo đúng nhận diện chính thức của từng nền tảng,
 * nên giữ nguyên màu thương hiệu thay vì kế thừa `currentColor` như bộ icon
 * trong `icons.tsx`.
 *
 * Dùng SVG thay cho file PNG của site cũ (chỉ 56×56, vỡ khi phóng to và
 * Messenger / Zalo còn sai phiên bản logo).
 */

type BrandIconProps = {
  className?: string
  /**
   * Hậu tố cho id của gradient. Bắt buộc khi cùng một icon xuất hiện nhiều
   * lần trên một trang, vì id trùng nhau là HTML không hợp lệ.
   */
  idSuffix?: string
}

export function IconFacebook({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M16.671 15.469 17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.235-2.687-.235c-2.741 0-4.533 1.662-4.533 4.669V12H7.078v3.469h3.046v8.385a12.09 12.09 0 0 0 3.75 0v-8.385h2.797Z"
      />
    </svg>
  )
}

export function IconMessenger({ className, idSuffix = "" }: BrandIconProps) {
  const gradientId = `messenger-gradient${idSuffix}`
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="12" y1="0" x2="12" y2="23.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00B2FF" />
          <stop offset="1" stopColor="#006AFF" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 0C5.373 0 0 4.974 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0Z"
      />
      <path
        fill="#fff"
        d="m4.792 15.045 3.526-5.593a1.8 1.8 0 0 1 2.603-.48l2.805 2.104a.72.72 0 0 0 .867-.003l3.788-2.874c.505-.384 1.165.222.827.759l-3.526 5.593a1.8 1.8 0 0 1-2.603.48l-2.805-2.104a.72.72 0 0 0-.867.003l-3.788 2.874c-.505.384-1.165-.222-.827-.759Z"
      />
    </svg>
  )
}

export function IconZalo({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#fff"
        stroke="#DDE1E6"
        strokeWidth=".7"
        d="M17 3.5h14c7.5 0 13.5 6 13.5 13.5v14c0 7.5-6 13.5-13.5 13.5H17c-2.9 0-5.6-.9-7.8-2.4l-4.7 1.7c-1.1.4-2.1-.6-1.7-1.7l1.6-4.4c-.6-2-.9-4.1-.9-6.2V17C3.5 9.5 9.5 3.5 17 3.5Z"
      />
      {/* Chữ "Zalo" dùng Be Vietnam Pro — font đã được next/font tải sẵn cho
          toàn site nên hiển thị giống nhau trên mọi máy, không phụ thuộc
          font hệ thống. */}
      <text
        x="24"
        y="30.2"
        textAnchor="middle"
        fontFamily="var(--font-be-vietnam), -apple-system, 'Helvetica Neue', Arial, sans-serif"
        fontSize="15.5"
        fontWeight="700"
        letterSpacing="-.3"
        fill="#0068FF"
      >
        Zalo
      </text>
    </svg>
  )
}
