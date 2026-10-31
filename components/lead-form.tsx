"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  LEAD_BUDGETS,
  LEAD_PRODUCTS,
  LEAD_QUANTITIES,
  LEAD_STORAGE_KEY,
  SELECT_PRODUCT_EVENT,
  type LeadProduct,
} from "@/lib/landing"
import { cn } from "@/lib/utils"

type Props = {
  /** Sản phẩm chọn sẵn theo nhóm quảng cáo (`?nhom=`) */
  defaultProduct: LeadProduct
  hotline: string
  zaloPhone: string
  zaloUrl: string
}

type Field = "fullname" | "phone" | "email" | "productInterest"

const ERRORS: Record<Field, string> = {
  fullname: "Vui lòng nhập họ tên",
  phone: "Số điện thoại chưa đúng",
  email: "Email chưa đúng",
  productInterest: "Vui lòng chọn sản phẩm",
}

/** Nguồn quảng cáo lưu kèm lead, đọc từ URL lúc khách vào trang */
const TRACKING_KEYS = ["gclid", "utm_source", "utm_campaign", "utm_term", "nhom"] as const

const inputClass =
  "w-full rounded-[2px] border border-line bg-white px-3.5 py-3 text-sm outline-none transition-colors focus:border-navy-400 aria-invalid:border-brand-red"

/**
 * Form báo giá của landing quảng cáo. Gửi về cùng API `/api/bao-gia` với
 * form trang Liên hệ (kèm `source: "landing"` để API áp quy tắc bắt buộc
 * riêng), thành công thì chuyển sang `/bao-gia/cam-on` — conversion bắn ở
 * trang đó, đúng một lần cho mỗi lead.
 */
export default function LeadForm({ defaultProduct, hotline, zaloPhone, zaloUrl }: Props) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [product, setProduct] = useState<string>(defaultProduct)
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({})
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [tracking, setTracking] = useState<Record<string, string>>({})

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    setTracking(
      Object.fromEntries(
        TRACKING_KEYS.flatMap((k) => (qs.get(k) ? [[k, qs.get(k) as string]] : [])),
      ),
    )

    function onSelect(e: Event) {
      setProduct((e as CustomEvent<string>).detail)
      setInvalid((v) => ({ ...v, productInterest: false }))
      document.getElementById("bao-gia")?.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => formRef.current?.fullname.focus({ preventScroll: true }), 500)
    }
    window.addEventListener(SELECT_PRODUCT_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_PRODUCT_EVENT, onSelect)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const bad: Partial<Record<Field, boolean>> = {
      fullname: !data.fullname?.trim(),
      phone: !/^[\d\s.+()-]{9,15}$/.test(data.phone?.trim() ?? ""),
      email: Boolean(data.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
      productInterest: !data.productInterest,
    }
    setInvalid(bad)
    const firstBad = (Object.keys(bad) as Field[]).find((k) => bad[k])
    if (firstBad) {
      ;(form.elements.namedItem(firstBad) as HTMLElement | null)?.focus()
      return
    }

    setSending(true)
    setFailed(false)
    try {
      const res = await fetch("/api/bao-gia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...tracking,
          landing: window.location.pathname,
          source: "landing",
          locale: "vi",
          subject: `Landing quảng cáo – ${data.productInterest}`,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      try {
        sessionStorage.setItem(
          LEAD_STORAGE_KEY,
          JSON.stringify({
            product: data.productInterest,
            qty: data.quantity,
            budget: data.budget,
            email: data.email,
            phone: data.phone,
          }),
        )
      } catch {}
      router.push("/bao-gia/cam-on")
    } catch {
      setSending(false)
      setFailed(true)
    }
  }

  const error = (f: Field) =>
    invalid[f] ? <span className="text-xs text-brand-red">{ERRORS[f]}</span> : null

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(11,51,89,0.35)] md:p-9"
    >
      <h3 className="font-display text-2xl font-bold text-navy-500">Yêu cầu báo giá</h3>
      <p className="mt-2 text-sm text-ink-soft">Chỉ mất 1 phút. Thông tin của bạn được bảo mật.</p>
      <div className="mt-5 h-px w-12 bg-brand-red" />

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            Họ tên<span className="ml-1 text-brand-red">*</span>
          </span>
          <input name="fullname" autoComplete="name" aria-invalid={invalid.fullname} className={inputClass} />
          {error("fullname")}
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">Công ty</span>
          <input name="company" autoComplete="organization" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            Điện thoại / Zalo<span className="ml-1 text-brand-red">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={invalid.phone}
            className={inputClass}
          />
          {error("phone")}
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">Email</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={invalid.email} className={inputClass} />
          {error("email")}
        </label>

        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            Sản phẩm quan tâm<span className="ml-1 text-brand-red">*</span>
          </span>
          <select
            name="productInterest"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            aria-invalid={invalid.productInterest}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="">Chọn sản phẩm</option>
            {LEAD_PRODUCTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          {error("productInterest")}
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">Số lượng dự kiến</span>
          <select name="quantity" defaultValue="" className={cn(inputClass, "appearance-none")}>
            <option value="">Chọn khoảng</option>
            {LEAD_QUANTITIES.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">Ngân sách / sản phẩm</span>
          <select name="budget" defaultValue="" className={cn(inputClass, "appearance-none")}>
            <option value="">Chọn khoảng</option>
            {LEAD_BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">Ngày cần hàng</span>
          <input name="deadline" placeholder="VD: trước 15/12" className={cn(inputClass, "placeholder:text-ink-soft/60")} />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="eyebrow text-ink-soft">Mô tả yêu cầu</span>
          <textarea
            name="content"
            rows={4}
            placeholder="Kích thước, chất liệu, màu sắc, số màu logo, vị trí in, cần đóng hộp không..."
            className={cn(inputClass, "resize-y placeholder:text-ink-soft/60")}
          />
        </label>

        <label className="flex items-center gap-2.5 text-sm text-ink sm:col-span-2">
          <input type="checkbox" name="vat" value="Có" className="size-4 accent-navy-500" />
          Cần xuất hóa đơn VAT
        </label>
      </div>

      {failed && (
        <p className="mt-5 border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm text-ink" role="status">
          Chưa gửi được. Vui lòng gọi{" "}
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="font-semibold text-brand-red">
            {hotline}
          </a>{" "}
          hoặc nhắn Zalo{" "}
          <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red">
            {zaloPhone}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 w-full rounded-[2px] bg-brand-red px-8 py-4 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark disabled:opacity-60"
      >
        {sending ? "Đang gửi..." : "Gửi yêu cầu báo giá"}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        Khi gửi, bạn đồng ý để Phan Nguyễn dùng thông tin này để liên hệ báo giá. Hoặc gửi logo &amp; hình
        mẫu qua{" "}
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="click_zalo"
          className="font-medium text-navy-500 underline underline-offset-2"
        >
          Zalo {zaloPhone}
        </a>
        .
      </p>
    </form>
  )
}
