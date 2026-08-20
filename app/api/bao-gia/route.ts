import { NextResponse } from "next/server"

/**
 * Nhận yêu cầu báo giá từ form.
 *
 * Bản này chỉ kiểm tra dữ liệu và ghi log ra server — chưa gửi email.
 * Để bật gửi mail thật, cắm SMTP (nodemailer / Resend / SendGrid) vào
 * đúng chỗ đánh dấu TODO bên dưới và đặt biến môi trường tương ứng.
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

  if (!fullname || !phone || !company || !content) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 })
  }

  // Số điện thoại Việt Nam: 9–11 chữ số, cho phép khoảng trắng và dấu chấm
  if (!/^[\d\s.+()-]{9,15}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 422 })
  }

  // TODO: gửi email tới Phannguyen471@gmail.com hoặc đẩy vào CRM tại đây.
  console.log("[bao-gia]", {
    fullname,
    phone,
    company,
    email: (body.email || "").trim(),
    country: (body.country || "").trim(),
    productInterest: (body.productInterest || "").trim(),
    quantity: (body.quantity || "").trim(),
    subject: (body.subject || "").trim(),
    content,
    locale: (body.locale || "vi").trim(),
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
