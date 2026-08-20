"use client"

import { useState } from "react"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Props = {
  locale: Locale
  /** Điền sẵn chủ đề khi mở form từ trang chi tiết sản phẩm */
  defaultSubject?: string
}

/**
 * Form yêu cầu báo giá. Site gốc gửi qua backend PHP; ở bản mới form
 * gọi API route `/api/bao-gia` — hiện chỉ ghi log để đội kỹ thuật cắm
 * SMTP hoặc CRM vào sau.
 */
export default function QuoteForm({ locale, defaultSubject = "" }: Props) {
  const t = dict(locale)
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [message, setMessage] = useState("")

  const fields = [
    { name: "fullname", label: t.form.fullname, type: "text", required: true, span: 1 },
    { name: "phone", label: t.form.phone, type: "tel", required: true, span: 1 },
    { name: "email", label: t.form.email, type: "email", required: false, span: 1 },
    { name: "company", label: t.form.company, type: "text", required: false, span: 1 },
    { name: "subject", label: t.form.subject, type: "text", required: false, span: 2 },
  ] as const

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("sending")

    const form = e.currentTarget
    const payload = { ...Object.fromEntries(new FormData(form).entries()), locale }

    try {
      const res = await fetch("/api/bao-gia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("request failed")
      setState("sent")
      setMessage(t.form.sent)
      form.reset()
    } catch {
      setState("error")
      setMessage(t.form.error)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className={cn("flex flex-col gap-2", f.span === 2 && "sm:col-span-2")}>
          <span className="eyebrow text-ink-soft">
            {f.label}
            {f.required && <span className="ml-1 text-brand-red">*</span>}
          </span>
          <input
            name={f.name}
            type={f.type}
            required={f.required}
            defaultValue={f.name === "subject" ? defaultSubject : undefined}
            className="rounded-[2px] border border-line bg-white px-3.5 py-3 text-sm outline-none transition-colors focus:border-navy-400"
          />
        </label>
      ))}

      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className="eyebrow text-ink-soft">
          {t.form.content}
          <span className="ml-1 text-brand-red">*</span>
        </span>
        <textarea
          name="content"
          required
          rows={5}
          placeholder={t.form.contentPlaceholder}
          className="resize-y rounded-[2px] border border-line bg-white px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus:border-navy-400"
        />
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-[2px] bg-brand-red px-8 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand-red-dark disabled:opacity-60"
        >
          {state === "sending" ? t.form.sending : t.form.submit}
        </button>

        {message && (
          <p
            className={cn("text-sm", state === "sent" ? "text-brand-green" : "text-brand-red")}
            role="status"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  )
}
