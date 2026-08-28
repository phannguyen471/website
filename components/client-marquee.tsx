import Image from "next/image"
import { content } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { CLIENT_LOGOS } from "@/lib/client-logos"

/**
 * Dải chạy logo khách hàng doanh nghiệp. Lấy đầy đủ khách hàng có logo từ
 * brand.clients (những tên chưa có file logo, ví dụ chỉ có chữ, sẽ không lọt
 * vào dải chạy vì text không phù hợp với animation marquee). Danh sách nhân
 * đôi để animation translateX(-50%) khớp liền mạch, không thấy điểm nối.
 * Logo xám hoá và lên màu khi hover — đồng nhất trực quan giữa các logo có
 * bảng màu rất khác nhau.
 */
export default function ClientMarquee({ locale }: { locale: Locale }) {
  const t = dict(locale)
  const { brand } = content(locale)

  const clients = brand.clients
    .map((name) => ({ name, logo: CLIENT_LOGOS[name] }))
    .filter((c): c is { name: string; logo: NonNullable<(typeof c)["logo"]> } => Boolean(c.logo))

  const loop = [...clients, ...clients]

  return (
    <div className="border-y border-line bg-white py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <p className="eyebrow shrink-0 pl-6 text-navy-500 sm:border-r sm:border-line sm:pr-6 lg:pl-8">
          {t.common.clientsEyebrow}
        </p>
        {/* Biên cắt riêng cho dải logo chạy — tách khỏi nhãn tĩnh bên trái để
            translateX của animation không tràn đè lên chữ "Khách hàng tiêu biểu". */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-14"
            aria-hidden="true"
          >
            {loop.map((client, i) => (
              <Image
                key={i}
                src={client.logo.src}
                alt={client.name}
                width={client.logo.width}
                height={client.logo.height}
                className="h-8 w-auto shrink-0 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bản đọc được cho screen reader, không animate */}
      <p className="sr-only">{t.common.clientsSr(clients.map((c) => c.name).join(", "))}</p>
    </div>
  )
}
