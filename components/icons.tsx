/**
 * Bộ icon dạng nét mảnh, tự vẽ — khớp với tinh thần layout editorial:
 * viền 1.5px, không tô màu, kế thừa currentColor.
 */

type IconProps = { className?: string }

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

export function IconMail({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" />
      <path d="m2.5 5 9.5 8 9.5-8" />
    </svg>
  )
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.2 3h-2A1.7 1.7 0 0 0 2.5 4.9c.3 3 1.4 5.9 3.2 8.3a20 20 0 0 0 5.1 5.1c2.4 1.8 5.3 2.9 8.3 3.2a1.7 1.7 0 0 0 1.9-1.7v-2a1.7 1.7 0 0 0-1.5-1.7c-.9-.1-1.7-.3-2.5-.6a1.7 1.7 0 0 0-1.8.4l-.9.9a16 16 0 0 1-5.9-5.9l.9-.9a1.7 1.7 0 0 0 .4-1.8 12 12 0 0 1-.6-2.5A1.7 1.7 0 0 0 6.2 3Z" />
    </svg>
  )
}

export function IconPin({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </svg>
  )
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  )
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  )
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function IconEye({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/** Bút thiết kế — bước "Thiết kế" trong quy trình */
export function IconPen({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20h4L20.5 7.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M15.5 6 18 8.5" />
    </svg>
  )
}

/** Bong bóng hội thoại — bước "Tư vấn" */
export function IconChat({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.4-5.2A8.5 8.5 0 1 1 21 12Z" />
    </svg>
  )
}

/** Mẫu sản phẩm — bước "Làm mẫu" */
export function IconSample({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
      <path d="M4 8.5 12 13l8-4.5M12 13v7" />
    </svg>
  )
}

/** Hợp đồng — bước "Hợp đồng" */
export function IconContract({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </svg>
  )
}

/** Nhà máy — bước "Sản xuất" */
export function IconFactory({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 20V10l5 3.5V10l5 3.5V10l5 3.5V20H3Z" />
      <path d="M18 10V4h3v16" />
    </svg>
  )
}

/** Xe giao hàng — bước "Giao hàng" */
export function IconTruck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 6.5h10v10h-10zM12.5 10h4l3 3v3.5h-7z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </svg>
  )
}

export function IconShield({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 5 5.5V12c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V5.5L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.4l-1.8-5.7L4.5 10.8 10.2 9 12 3.5Z" />
    </svg>
  )
}

export function IconTag({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12.6 3H21v8.4L11.4 21 3 12.6 12.6 3Z" />
      <circle cx="16.8" cy="7.2" r="1.3" />
    </svg>
  )
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </svg>
  )
}
