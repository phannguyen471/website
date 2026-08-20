"use client"

import Image from "next/image"
import { useState } from "react"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { cn, media } from "@/lib/utils"

type Props = {
  images: string[]
  alt: string
  locale: Locale
}

/**
 * Gallery chi tiết sản phẩm: ảnh lớn + dải thumbnail bên dưới.
 * Nếu chỉ có 1 ảnh thì bỏ luôn dải thumbnail.
 */
export default function ProductGallery({ images, alt, locale }: Props) {
  const t = dict(locale)
  const list = images.length ? images : [""]
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden border border-line bg-shell">
        <Image
          src={media(list[active])}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>

      {list.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {list.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={t.common.image(i + 1)}
              aria-current={i === active}
              className={cn(
                "relative aspect-square overflow-hidden border bg-shell transition-colors",
                i === active ? "border-navy-500" : "border-line hover:border-navy-300",
              )}
            >
              <Image
                src={media(img)}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
