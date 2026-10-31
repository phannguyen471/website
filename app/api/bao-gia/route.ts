import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { brand } from "@/lib/data"

/**
 * Nhận yêu cầu báo giá từ form (trang Liên hệ, form trên trang chi tiết
 * sản phẩm và landing quảng cáo `/bao-gia` dùng chung route này) và gửi
 * email tới hộp thư kinh doanh qua Gmail SMTP.
 *
 * Cần 2 biến môi trường:
 *   GMAIL_USER         — địa chỉ Gmail dùng để gửi (thường là contact.email)
 *   GMAIL_APP_PASSWORD — App Password 16 ký tự, tạo tại
 *                        https://myaccount.google.com/apppasswords
 *                        (yêu cầu tài khoản đã bật xác minh 2 bước)
 */

type QuoteRequest = {
  fullname?: string
  phone?: string
  email?: string
  company?: string
  country?: string
  productInterest?: string
  quantity?: string
  subject?: string
  content?: string
  /** Ngôn ngữ người gửi đang dùng — để đội bán hàng trả lời đúng thứ tiếng */
  locale?: string
  /** "landing" khi gửi từ landing quảng cáo — công ty và nội dung không bắt buộc */
  source?: string
  budget?: string
  deadline?: string
  vat?: string
  /** Nguồn quảng cáo, để đối chiếu lead với chiến dịch */
  gclid?: string
  utm_source?: string
  utm_campaign?: string
  utm_term?: string
  nhom?: string
  landing?: string
}

/** Trường riêng của landing quảng cáo, theo thứ tự hiện trong email */
const LANDING_FIELDS: [keyof QuoteRequest, string][] = [
  ["budget", "Ngân sách / sản phẩm"],
  ["deadline", "Ngày cần hàng"],
  ["vat", "Cần hóa đơn VAT"],
  ["nhom", "Nhóm quảng cáo"],
  ["utm_source", "utm_source"],
  ["utm_campaign", "utm_campaign"],
  ["utm_term", "Từ khoá (utm_term)"],
  ["gclid", "gclid"],
  ["landing", "Trang gửi"],
]

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(request: Request) {
  let body: QuoteRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  const fullname = (body.fullname || "").trim()
  const phone = (body.phone || "").trim()
  const company = (body.company || "").trim()
  const content = (body.content || "").trim()
  const email = (body.email || "").trim()
  const country = (body.country || "").trim()
  const productInterest = (body.productInterest || "").trim()
  const quantity = (body.quantity || "").trim()
  const subject = (body.subject || "").trim()
  const locale = (body.locale || "vi").trim()
  const isLanding = body.source === "landing"
  const field = (k: keyof QuoteRequest) => String(body[k] ?? "").trim()

  // Landing quảng cáo: chỉ bắt buộc tên, điện thoại, sản phẩm — form ngắn để không mất lead
  const missing = isLanding
    ? !fullname || !phone || !productInterest
    : !fullname || !phone || !company || !content
  if (missing) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 })
  }

  // Số điện thoại Việt Nam: 9–11 chữ số, cho phép khoảng trắng và dấu chấm
  if (!/^[\d\s.+()-]{9,15}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 422 })
  }

  const receivedAt = new Date().toISOString()

  console.log("[bao-gia]", {
    fullname,
    phone,
    company,
    email,
    country,
    productInterest,
    quantity,
    subject,
    content,
    locale,
    ...(isLanding
      ? Object.fromEntries(LANDING_FIELDS.map(([k]) => [k, field(k)]))
      : {}),
    receivedAt,
  })

  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    console.error("[bao-gia] Thiếu GMAIL_USER hoặc GMAIL_APP_PASSWORD — email không được gửi.")
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 })
  }

  const rows: [string, string][] = [
    ["Họ tên", fullname],
    ...(company ? ([["Công ty", company]] as [string, string][]) : []),
    ["Điện thoại", phone],
    ...(email ? ([["Email", email]] as [string, string][]) : []),
    ...(country ? ([["Quốc gia", country]] as [string, string][]) : []),
    ...(productInterest ? ([["Sản phẩm quan tâm", productInterest]] as [string, string][]) : []),
    ...(quantity ? ([["Số lượng", quantity]] as [string, string][]) : []),
    ...(isLanding
      ? LANDING_FIELDS.flatMap(([k, label]) => (field(k) ? [[label, field(k)] as [string, string]] : []))
      : []),
    ["Ngôn ngữ", locale === "en" ? "Tiếng Anh" : "Tiếng Việt"],
  ]

  const html = `
    <div style="font-family: -apple-system, Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #0B3359; margin-bottom: 4px;">Yêu cầu báo giá mới</h2>
      <p style="color: #6C757D; margin-top: 0;">${subject || "Từ website Phan Nguyễn"}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e3e7ec; background: #f6f7f9; font-weight: 600; width: 160px;">${escapeHtml(label)}</td>
            <td style="padding: 8px 12px; border: 1px solid #e3e7ec;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        content
          ? `<p style="font-weight: 600; margin-bottom: 4px;">Nội dung yêu cầu</p>
      <p style="white-space: pre-wrap; padding: 12px; background: #f6f7f9; border: 1px solid #e3e7ec;">${escapeHtml(content)}</p>`
          : ""
      }
      <p style="color: #6C757D; font-size: 12px; margin-top: 24px;">Gửi lúc ${new Date(receivedAt).toLocaleString("vi-VN")}</p>
    </div>
  `

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    })

    await transporter.sendMail({
      from: `"Website Phan Nguyễn" <${gmailUser}>`,
      to: brand.contact.email,
      replyTo: email || undefined,
      subject: `[Yêu cầu báo giá] ${subject || fullname}`,
      html,
    })
  } catch (err) {
    console.error("[bao-gia] Gửi email thất bại:", err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
