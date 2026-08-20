"use client"

import { useMemo, useState } from "react"
import type { LCategory, LGroup, LProduct } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { QUERY_KEYS, path } from "@/lib/routes"
import { cn, deaccent } from "@/lib/utils"
import ProductCard from "@/components/product-card"

type Props = {
  locale: Locale
  products: LProduct[]
  groups: LGroup[]
  /** Bộ lọc ban đầu, đọc từ query string ở phía server để lưới render sẵn trong HTML */
  initialCategory?: string
  initialGroup?: string
}

const PAGE_SIZE = 24

/**
 * Trang sản phẩm: sidebar danh mục (desktop) + dải tab cuộn ngang (mobile),
 * kèm ô tìm kiếm và nút xem thêm. Trạng thái danh mục đồng bộ với query
 * string để link từ nav/footer dẫn đúng bộ lọc.
 */
export default function ProductBrowser({
  locale,
  products,
  groups,
  initialCategory = "",
  initialGroup = "",
}: Props) {
  const t = dict(locale)
  const [category, setCategory] = useState(initialCategory)
  const [group, setGroup] = useState(initialGroup)
  const [query, setQuery] = useState("")
  const [visible, setVisible] = useState(PAGE_SIZE)

  const allCategories: LCategory[] = useMemo(() => groups.flatMap((g) => g.children), [groups])

  const filtered = useMemo(() => {
    let list = products

    if (category) {
      list = list.filter((p) => p.categorySlug === category)
    } else if (group) {
      list = list.filter((p) => p.groupSlug === group)
    }

    const q = deaccent(query.trim())
    if (q) list = list.filter((p) => deaccent(p.name).includes(q))

    return list
  }, [products, category, group, query])

  function pick(nextCategory: string, nextGroup: string) {
    setCategory(nextCategory)
    setGroup(nextGroup)
    setVisible(PAGE_SIZE)

    // Đồng bộ URL để người dùng copy/chia sẻ được bộ lọc, nhưng không
    // điều hướng lại (tránh render vòng lặp và giữ nguyên vị trí cuộn).
    const sp = new URLSearchParams()
    if (nextCategory) sp.set(QUERY_KEYS.category[locale], nextCategory)
    else if (nextGroup) sp.set(QUERY_KEYS.group[locale], nextGroup)
    const base = path(locale, "san-pham")
    const qs = sp.toString()
    window.history.replaceState(null, "", qs ? `${base}?${qs}` : base)
  }

  const activeLabel = category
    ? allCategories.find((c) => c.slug === category)?.name
    : group
      ? groups.find((g) => g.slug === group)?.name
      : t.products.allProducts

  return (
    <div className="container-brand py-14 lg:py-20">
      {/* Dải tab cuộn ngang — mobile & tablet */}
      <div className="mb-8 lg:hidden">
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
          <TabButton active={!category && !group} onClick={() => pick("", "")}>
            {t.products.all}
          </TabButton>
          {groups.map((g) => (
            <TabButton key={g.slug} active={group === g.slug} onClick={() => pick("", g.slug)}>
              {g.name}
            </TabButton>
          ))}
          {allCategories.map((c) => (
            <TabButton key={c.slug} active={category === c.slug} onClick={() => pick(c.slug, "")}>
              {c.name}
            </TabButton>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Sidebar danh mục — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <h2 className="eyebrow mb-4 text-navy-500">{t.products.categories}</h2>
            <span className="mb-5 block h-px w-8 bg-brand-gold" />

            <button
              type="button"
              onClick={() => pick("", "")}
              className={cn(
                "mb-4 block w-full text-left text-sm transition-colors",
                !category && !group
                  ? "font-semibold text-brand-red"
                  : "text-ink-soft hover:text-navy-500",
              )}
            >
              {t.products.allProducts}
              <span className="ml-1.5 text-[11px] opacity-60">{products.length}</span>
            </button>

            <div className="flex flex-col gap-6">
              {groups.map((g) => (
                <div key={g.slug}>
                  <button
                    type="button"
                    onClick={() => pick("", g.slug)}
                    className={cn(
                      "text-[13px] tracking-[0.12em] uppercase transition-colors",
                      group === g.slug && !category
                        ? "font-semibold text-brand-red"
                        : "text-navy-500 hover:text-brand-red",
                    )}
                  >
                    {g.name}
                    <span className="ml-1.5 text-[11px] font-normal opacity-60">{g.count}</span>
                  </button>

                  <ul className="mt-3 flex flex-col gap-2.5 border-l border-line pl-4">
                    {g.children.map((c) => (
                      <li key={c.slug}>
                        <button
                          type="button"
                          onClick={() => pick(c.slug, "")}
                          className={cn(
                            "flex w-full items-baseline justify-between gap-2 text-left text-sm transition-colors",
                            category === c.slug
                              ? "font-semibold text-brand-red"
                              : "text-ink-soft hover:text-navy-500",
                          )}
                        >
                          <span>{c.name}</span>
                          <span className="text-[11px] opacity-60">{c.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Lưới sản phẩm */}
        <div>
          <div className="mb-7 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-500">{activeLabel}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                {t.common.productCount(filtered.length)}
                {query.trim() ? t.products.matching(query.trim()) : ""}
              </p>
            </div>

            <label className="relative w-full sm:w-64">
              <span className="sr-only">{t.products.searchLabel}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setVisible(PAGE_SIZE)
                }}
                placeholder={t.products.searchPlaceholder}
                className="w-full rounded-[2px] border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus:border-navy-400"
              />
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-line py-20 text-center">
              <p className="text-sm text-ink-soft">{t.products.empty}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {filtered.slice(0, visible).map((p, i) => (
                  <ProductCard key={p.slug} product={p} locale={locale} priority={i < 4} />
                ))}
              </div>

              {visible < filtered.length && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-[2px] border border-navy-500 px-8 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
                  >
                    {t.products.loadMore(filtered.length - visible)}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-[2px] border px-4 py-2.5 text-xs whitespace-nowrap transition-colors",
        active
          ? "border-navy-500 bg-navy-500 font-semibold text-white"
          : "border-line bg-white text-ink-soft hover:border-navy-300",
      )}
    >
      {children}
    </button>
  )
}
