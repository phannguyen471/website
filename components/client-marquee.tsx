import Image from "next/image"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"

/**
 * Logo khách hàng có sẵn file — 6/13 tên trong brand.clients (xem trang
 * Giới thiệu để có danh sách đầy đủ). Tên riêng của thương hiệu nên giữ
 * nguyên ở cả hai ngôn ngữ, không cần dịch.
 */
const CLIENTS = [
  { name: "Shiseido", src: "/clients/shiseido.png", width: 1243, height: 200 },
  { name: "P&G", src: "/clients/pg.png", width: 199, height: 200 },
  { name: "Vietnam Airlines", src: "/clients/vietnam-airlines.png", width: 541, height: 200 },
  { name: "Mitsubishi", src: "/clients/mitsubishi.png", width: 183, height: 200 },
  { name: "L'Oréal Professionnel", src: "/clients/loreal.png", width: 800, height: 200 },
  { name: "Paula's Choice", src: "/clients/paulas-choice.png", width: 322, height: 200 },
] as const

const loop = [...CLIENTS, ...CLIENTS]

/**
 * Dải chạy logo khách hàng doanh nghiệp. Danh sách nhân đôi để animation
 * translateX(-50%) khớp liền mạch, không thấy điểm nối. Logo xám hoá và
 * lên màu khi hover — đồng nhất trực quan giữa các logo có bảng màu rất
 * khác nhau (đỏ Mitsubishi, xanh P&G, đen Shiseido/L'Oréal).
 */
export default function ClientMarquee({ locale }: { locale: Locale }) {
  const t = dict(locale)

  return (
    <div className="border-y border-line bg-shell py-5">
      <div className="flex items-center gap-6">
        <p className="eyebrow shrink-0 border-r border-line pr-6 pl-6 text-navy-500 lg:pl-8">
          {t.common.clientsEyebrow}
        </p>
        {/* Biên cắt riêng cho dải logo chạy — tách khỏi nhãn tĩnh bên trái để
            translateX của animation không tràn đè lên chữ "Khách hàng tiêu biểu". */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-14"
            aria-hidden="true"
          >
            {loop.map((client, i) => (
              <Image
                key={i}
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="h-8 w-auto shrink-0 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bản đọc được cho screen reader, không animate */}
      <p className="sr-only">{t.common.clientsSr(CLIENTS.map((c) => c.name).join(", "))}</p>
    </div>
  )
}
