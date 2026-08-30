"use client"

import { useState } from "react"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Props = {
  locale: Locale
  /**
   * Tên sản phẩm khi mở form từ trang chi tiết sản phẩm. Trang chi tiết đã
   * có tiêu đề lớn "Yêu cầu báo giá cho [tên sản phẩm]" ngay cạnh form nên
   * không lặp lại ở đây — chỉ gửi kèm âm thầm trong payload, đồng thời ẩn
   * dropdown "Sản phẩm quan tâm" vì ngữ cảnh đã rõ ràng.
   */
  productName?: string
}

/** Vài quốc gia phổ biến — Việt Nam đứng đầu vì là thị trường chính */
const COUNTRIES = [
  "Việt Nam",
  "Hoa Kỳ",
  "Vương quốc Anh",
  "Singapore",
  "Nhật Bản",
  "Hàn Quốc",
  "Trung Quốc",
  "Đức",
  "Pháp",
  "Úc",
] as const

const inputClass =
  "rounded-[2px] border border-line bg-white px-3.5 py-3 text-sm outline-none transition-colors focus:border-navy-400"

/**
 * Form yêu cầu báo giá. Site gốc gửi qua backend PHP; ở bản mới form
 * gọi API route `/api/bao-gia`, route này gửi email thông báo qua Gmail SMTP
 * (xem app/api/bao-gia/route.ts).
 */
export default function QuoteForm({ locale, productName }: Props) {
  const t = dict(locale)
  const { groups, brand } = content(locale)
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("sending")

    const form = e.currentTarget
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      locale,
      ...(productName ? { subject: t.product.quoteSubject(productName) } : {}),
    }

    try {
      const res = await fetch("/api/bao-gia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("request failed")
      setState("sent")
    } catch {
      setState("error")
      setError(t.form.error)
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 border border-line bg-shell p-8">
        <div className="h-1 w-12 bg-brand-red" />
        <h3 className="font-display text-2xl font-bold text-navy-500">{t.form.thankYouTitle}</h3>
        <p className="text-[15px] leading-relaxed text-ink-soft">{t.form.thankYouBody}</p>
        {productName && (
          <p className="text-sm text-ink-soft">
            {t.form.thankYouProductLabel} <span className="font-medium text-ink">{productName}</span>
          </p>
        )}
        <p className="text-sm text-ink-soft">{t.form.attachmentHint(brand.email)}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-2 rounded-[2px] border border-navy-500 px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-navy-500 uppercase transition-colors hover:bg-navy-500 hover:text-white"
        >
          {t.form.submitAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Họ tên + Công ty */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {t.form.fullname}
            <span className="ml-1 text-brand-red">*</span>
          </span>
          <input name="fullname" type="text" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {t.form.company}
            <span className="ml-1 text-brand-red">*</span>
          </span>
          <input name="company" type="text" required className={inputClass} />
        </label>
      </div>

      {/* Điện thoại + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {t.form.phone}
            <span className="ml-1 text-brand-red">*</span>
          </span>
          <input name="phone" type="tel" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {t.form.email} <span className="font-normal normal-case">{t.form.optional}</span>
          </span>
          <input name="email" type="email" className={inputClass} />
        </label>
      </div>

      {/* Quốc gia */}
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-ink-soft">
          {t.form.country} <span className="font-normal normal-case">{t.form.optional}</span>
        </span>
        <select name="country" defaultValue="" className={cn(inputClass, "appearance-none")}>
          <option value="" disabled>
            {t.form.countryPlaceholder}
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* Sản phẩm quan tâm (chỉ hiện khi không có ngữ cảnh sản phẩm sẵn) + Số lượng */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {!productName && (
          <label className="flex flex-col gap-2">
            <span className="eyebrow text-ink-soft">
              {t.form.productInterest} <span className="font-normal normal-case">{t.form.optional}</span>
            </span>
            <select name="productInterest" defaultValue="" className={cn(inputClass, "appearance-none")}>
              <option value="" disabled>
                {t.form.productInterestPlaceholder}
              </option>
              {groups.flatMap((g) => g.children).map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value={t.form.productInterestOther}>{t.form.productInterestOther}</option>
            </select>
          </label>
        )}
        <label className={cn("flex flex-col gap-2", productName && "sm:col-span-2")}>
          <span className="eyebrow text-ink-soft">
            {t.form.quantity} <span className="font-normal normal-case">{t.form.optional}</span>
          </span>
          <input
            name="quantity"
            type="number"
            min={1}
            placeholder={t.form.quantityPlaceholder}
            className={inputClass}
          />
        </label>
      </div>

      {/* Nội dung yêu cầu */}
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-ink-soft">
          {t.form.content}
          <span className="ml-1 text-brand-red">*</span>
        </span>
        <textarea
          name="content"
          required
          rows={5}
          placeholder={t.form.contentPlaceholder}
          className={cn(inputClass, "resize-y placeholder:text-ink-soft/60")}
        />
      </label>

      {/* Gợi ý gửi file thiết kế */}
      <p className="text-xs text-ink-soft">{t.form.attachmentHint(brand.email)}</p>

      {state === "error" && (
        <p className="text-sm text-brand-red" role="status">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-[2px] bg-brand-red px-8 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark disabled:opacity-60 sm:w-fit"
      >
        {state === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  )
}
