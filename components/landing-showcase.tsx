"use client"

import Image from "next/image"
import { useState } from "react"
import { PRODUCT_TABS, SELECT_PRODUCT_EVENT, type LeadProduct, type ProductTab } from "@/lib/landing"
import { track } from "@/lib/track"
import { cn } from "@/lib/utils"
import { IconArrowRight } from "@/components/icons"

export type ShowcaseItem = {
  slug: string
  tab: Exclude<ProductTab, "all">
  tag: string
  name: string
  note: string
  product: LeadProduct
  image: string
}

/**
 * Lưới sản phẩm có tab lọc. Nút "Nhận báo giá" không mở trang chi tiết mà
 * chọn sẵn sản phẩm trong form cuối trang rồi cuộn xuống — giữ khách ở lại
 * landing thay vì lạc sang catalog.
 */
export default function LandingShowcase({ items }: { items: ShowcaseItem[] }) {
  const [tab, setTab] = useState<ProductTab>("all")
  const visible = tab === "all" ? items : items.filter((i) => i.tab === tab)

  function pick(product: LeadProduct) {
    track("click_product_quote", { product })
    window.dispatchEvent(new CustomEvent(SELECT_PRODUCT_EVENT, { detail: product }))
  }

  return (
    <>
      <div
        role="group"
        aria-label="Lọc sản phẩm"
        className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0"
      >
        {PRODUCT_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "shrink-0 rounded-[2px] border px-5 py-3 text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors",
              tab === t.key
                ? "border-navy-500 bg-navy-500 text-white"
                : "border-line text-navy-500 hover:border-navy-500",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {visible.map((item) => (
          <article key={item.slug} className="group flex flex-col border border-line bg-white">
            <div className="relative aspect-square overflow-hidden bg-shell">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="eyebrow text-ink-soft/70">{item.tag}</p>
              <h3 className="text-[15px] leading-snug font-medium text-ink">{item.name}</h3>
              <p className="text-[13px] leading-relaxed text-ink-soft">{item.note}</p>
              <button
                type="button"
                onClick={() => pick(item.product)}
                className="group/btn mt-auto flex w-fit items-center gap-1.5 pt-2 text-[11px] font-semibold tracking-[0.14em] text-brand-red uppercase transition-colors hover:text-brand-red-dark"
              >
                Nhận báo giá
                <IconArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
