"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { Locale } from "@/lib/i18n"
import {
  DEFAULT_PRODUCT_KEYS,
  LEAD_BUDGETS,
  LEAD_QUANTITIES,
  LEAD_STORAGE_KEY,
  SELECT_PRODUCT_EVENT,
  THANK_YOU_PATH,
  leadProduct,
  type LeadProductKey,
} from "@/lib/landing"
import { cn } from "@/lib/utils"

type Props = {
  locale: Locale
  /** Nhóm quảng cáo của trang — gửi kèm lead khi URL không có `?nhom=` */
  nhom: string
  /** Sản phẩm chọn sẵn theo nhóm quảng cáo */
  defaultProduct: LeadProductKey
  /** Danh sách ô "Sản phẩm quan tâm" — landing theo mùa có thêm lựa chọn riêng */
  productKeys?: LeadProductKey[]
  deadlinePlaceholder?: string
  notePlaceholder?: string
  hotline: string
  zaloPhone: string
  zaloUrl: string
}

type Field = "fullname" | "phone" | "email" | "productInterest"

const COPY = {
  vi: {
    title: "Yêu cầu báo giá",
    sub: "Chỉ mất 1 phút. Thông tin của bạn được bảo mật.",
    fullname: "Họ tên",
    company: "Công ty",
    phone: "Điện thoại / Zalo",
    email: "Email",
    product: "Sản phẩm quan tâm",
    productPlaceholder: "Chọn sản phẩm",
    quantity: "Số lượng dự kiến",
    budget: "Ngân sách / sản phẩm",
    rangePlaceholder: "Chọn khoảng",
    deadline: "Ngày cần hàng",
    deadlinePlaceholder: "VD: trước 15/12",
    note: "Mô tả yêu cầu",
    notePlaceholder: "Kích thước, chất liệu, màu sắc, số màu logo, vị trí in, cần đóng hộp không...",
    vat: "Cần xuất hóa đơn VAT",
    vatValue: "Có",
    submit: "Gửi yêu cầu báo giá",
    sending: "Đang gửi...",
    failed: ["Chưa gửi được. Vui lòng gọi", "hoặc nhắn Zalo"],
    consent: "Khi gửi, bạn đồng ý để Phan Nguyễn dùng thông tin này để liên hệ báo giá. Hoặc gửi logo & hình mẫu qua",
    subject: "Landing quảng cáo",
    errors: {
      fullname: "Vui lòng nhập họ tên",
      phone: "Số điện thoại chưa đúng",
      email: "Email chưa đúng",
      productInterest: "Vui lòng chọn sản phẩm",
    },
  },
  en: {
    title: "Request a quote",
    sub: "Takes 1 minute. Your details are kept confidential.",
    fullname: "Full name",
    company: "Company",
    phone: "Phone / Zalo",
    email: "Email",
    product: "Product of interest",
    productPlaceholder: "Select a product",
    quantity: "Estimated quantity",
    budget: "Budget per item",
    rangePlaceholder: "Select a range",
    deadline: "Needed by",
    deadlinePlaceholder: "e.g. before 15 Dec",
    note: "Project details",
    notePlaceholder: "Size, material, colours, number of logo colours, print position, gift box needed...",
    vat: "VAT invoice required",
    vatValue: "Yes",
    submit: "Send quote request",
    sending: "Sending...",
    failed: ["Could not send. Please call", "or message us on Zalo"],
    consent: "By sending, you agree that Phan Nguyen may use these details to contact you with a quote. Or send your logo & samples via",
    subject: "Landing page (EN)",
    errors: {
      fullname: "Please enter your name",
      phone: "Please enter a valid phone number",
      email: "Please enter a valid email",
      productInterest: "Please select a product",
    },
  },
} satisfies Record<Locale, unknown>

/** Nguồn quảng cáo lưu kèm lead, đọc từ URL lúc khách vào trang (`group` là tên tham số nhóm bên tiếng Anh) */
const TRACKING_KEYS = ["gclid", "utm_source", "utm_campaign", "utm_term", "nhom", "group"] as const

const inputClass =
  "w-full rounded-[2px] border border-line bg-white px-3.5 py-3 text-sm outline-none transition-colors focus:border-navy-400 aria-invalid:border-brand-red"

/**
 * Form báo giá của landing quảng cáo. Gửi về cùng API `/api/bao-gia` với
 * form trang Liên hệ (kèm `source: "landing"` để API áp quy tắc bắt buộc
 * riêng), thành công thì chuyển sang trang cảm ơn — conversion bắn ở
 * trang đó, đúng một lần cho mỗi lead.
 */
export default function LeadForm({
  locale,
  nhom,
  defaultProduct,
  productKeys = DEFAULT_PRODUCT_KEYS,
  deadlinePlaceholder,
  notePlaceholder,
  hotline,
  zaloPhone,
  zaloUrl,
}: Props) {
  const c = COPY[locale]
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [product, setProduct] = useState<string>(leadProduct(defaultProduct, locale))
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({})
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [tracking, setTracking] = useState<Record<string, string>>({})

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    const found = Object.fromEntries(TRACKING_KEYS.flatMap((k) => (qs.get(k) ? [[k, qs.get(k) as string]] : [])))
    if (found.group) {
      found.nhom ??= found.group
      delete found.group
    }
    setTracking(found)

    function onSelect(e: Event) {
      setProduct(leadProduct((e as CustomEvent<LeadProductKey>).detail, locale))
      setInvalid((v) => ({ ...v, productInterest: false }))
      document.getElementById("bao-gia")?.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => formRef.current?.fullname.focus({ preventScroll: true }), 500)
    }
    window.addEventListener(SELECT_PRODUCT_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_PRODUCT_EVENT, onSelect)
  }, [locale])

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
          nhom,
          ...tracking,
          landing: window.location.pathname,
          source: "landing",
          locale,
          subject: `${c.subject} – ${data.productInterest}`,
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
      router.push(THANK_YOU_PATH[locale])
    } catch {
      setSending(false)
      setFailed(true)
    }
  }

  const error = (f: Field) => (invalid[f] ? <span className="text-xs text-brand-red">{c.errors[f]}</span> : null)
  const required = <span className="ml-1 text-brand-red">*</span>

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-line bg-white p-6 shadow-[0_24px_60px_-30px_rgba(11,51,89,0.35)] md:p-9"
    >
      <h3 className="font-display text-2xl font-bold text-navy-500">{c.title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{c.sub}</p>
      <div className="mt-5 h-px w-12 bg-brand-red" />

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {c.fullname}
            {required}
          </span>
          <input name="fullname" autoComplete="name" aria-invalid={invalid.fullname} className={inputClass} />
          {error("fullname")}
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">{c.company}</span>
          <input name="company" autoComplete="organization" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {c.phone}
            {required}
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
          <span className="eyebrow text-ink-soft">{c.email}</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={invalid.email} className={inputClass} />
          {error("email")}
        </label>

        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">
            {c.product}
            {required}
          </span>
          <select
            name="productInterest"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            aria-invalid={invalid.productInterest}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="">{c.productPlaceholder}</option>
            {productKeys.map((k) => (
              <option key={k}>{leadProduct(k, locale)}</option>
            ))}
          </select>
          {error("productInterest")}
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">{c.quantity}</span>
          <select name="quantity" defaultValue="" className={cn(inputClass, "appearance-none")}>
            <option value="">{c.rangePlaceholder}</option>
            {LEAD_QUANTITIES[locale].map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">{c.budget}</span>
          <select name="budget" defaultValue="" className={cn(inputClass, "appearance-none")}>
            <option value="">{c.rangePlaceholder}</option>
            {LEAD_BUDGETS[locale].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-soft">{c.deadline}</span>
          <input
            name="deadline"
            placeholder={deadlinePlaceholder ?? c.deadlinePlaceholder}
            className={cn(inputClass, "placeholder:text-ink-soft/60")}
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="eyebrow text-ink-soft">{c.note}</span>
          <textarea
            name="content"
            rows={4}
            placeholder={notePlaceholder ?? c.notePlaceholder}
            className={cn(inputClass, "resize-y placeholder:text-ink-soft/60")}
          />
        </label>

        <label className="flex items-center gap-2.5 text-sm text-ink sm:col-span-2">
          <input type="checkbox" name="vat" value={c.vatValue} className="size-4 accent-navy-500" />
          {c.vat}
        </label>
      </div>

      {failed && (
        <p className="mt-5 border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm text-ink" role="status">
          {c.failed[0]}{" "}
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="font-semibold text-brand-red">
            {hotline}
          </a>{" "}
          {c.failed[1]}{" "}
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
        {sending ? c.sending : c.submit}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        {c.consent}{" "}
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
