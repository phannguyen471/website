import Link from "next/link"
import Image from "next/image"
import { isQuotePrice, localizePrice, type LProduct } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { path } from "@/lib/routes"
import { cn, media } from "@/lib/utils"

type Props = {
  product: LProduct
  locale: Locale
  priority?: boolean
  className?: string
}

/**
 * Thẻ sản phẩm: ảnh vuông, đổi sang ảnh thứ 2 khi hover (nếu có),
 * nhãn danh mục nhỏ in hoa, tên và giá bên dưới.
 */
export default function ProductCard({ product, locale, priority, className }: Props) {
  const t = dict(locale)
  const first = media(product.images[0])
  const second = product.images[1] ? media(product.images[1]) : null
  const quote = isQuotePrice(product.price)

  return (
    <Link
      href={path(locale, "san-pham", product.slug)}
      className={cn(
        "group flex flex-col border border-line bg-white transition-colors hover:border-navy-300",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-shell">
        <Image
          src={first}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className={cn(
            "object-cover transition-all duration-500",
            second ? "group-hover:opacity-0" : "group-hover:scale-[1.04]",
          )}
        />
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {!quote && (
          <span className="absolute top-0 left-0 bg-brand-red px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
            {t.common.sale}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="eyebrow text-ink-soft/70">{product.category}</p>
        <h3 className="text-[15px] leading-snug font-medium text-ink transition-colors group-hover:text-navy-500">
          {product.name}
        </h3>
        <p
          className={cn(
            "mt-auto pt-1 text-sm font-semibold",
            quote ? "text-ink-soft" : "text-brand-red",
          )}
        >
          {localizePrice(product.price, locale)}
        </p>
      </div>
    </Link>
  )
}
