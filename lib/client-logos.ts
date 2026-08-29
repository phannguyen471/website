export type ClientLogo = { src: string; width: number; height: number }

const LOGO_LOREAL: ClientLogo = { src: "/clients/loreal.webp", width: 800, height: 200 }
const LOGO_AMOREPACIFIC: ClientLogo = { src: "/clients/amore pacific.webp", width: 1080, height: 400 }
const LOGO_KAO: ClientLogo = { src: "/clients/kao.webp", width: 446, height: 255 }
const LOGO_SHISEIDO: ClientLogo = { src: "/clients/shiseido.webp", width: 1243, height: 200 }
const LOGO_DUTCH_LADY: ClientLogo = { src: "/clients/dutch lady.webp", width: 1800, height: 1801 }

/**
 * Logo khách hàng — khớp theo đúng tên trong brand.clients. Một số thương
 * hiệu có bản dịch riêng cho EN (xem data/i18n/en.json → clients) nên cần
 * thêm alias tên tiếng Anh, nếu không bản /en sẽ không khớp được tên đã dịch
 * với logo và rơi về hiển thị chữ.
 *
 * Dùng chung cho trang Giới thiệu (lưới đầy đủ) và dải logo chạy trang chủ
 * (chỉ lấy các thương hiệu có logo, xem lib/data.ts không liên quan tới file
 * này).
 */
export const CLIENT_LOGOS: Record<string, ClientLogo> = {
  "Tập đoàn L'Oréal Việt Nam": LOGO_LOREAL,
  "L'Oréal Vietnam Group": LOGO_LOREAL,
  "TPF GROUP": { src: "/clients/tpf group.webp", width: 611, height: 367 },
  "P&G": { src: "/clients/pg.webp", width: 199, height: 200 },
  "Paula's Choice": { src: "/clients/paulas-choice.webp", width: 322, height: 200 },
  "AMOREPACIFIC Việt Nam": LOGO_AMOREPACIFIC,
  "AMOREPACIFIC Vietnam": LOGO_AMOREPACIFIC,
  "Kao Việt Nam": LOGO_KAO,
  "Kao Vietnam": LOGO_KAO,
  "Shiseido Việt Nam": LOGO_SHISEIDO,
  "Shiseido Vietnam": LOGO_SHISEIDO,
  Mitsubishi: { src: "/clients/mitsubishi.webp", width: 183, height: 200 },
  "LG Vina Cosmetic VN": { src: "/clients/LG-logo.webp", width: 300, height: 300 },
  "DKSH VN": { src: "/clients/dksh_1432107662.webp", width: 700, height: 269 },
  "Cô Gái Hà Lan": LOGO_DUTCH_LADY,
  "Dutch Lady": LOGO_DUTCH_LADY,
  "Vietnam Airlines": { src: "/clients/vietnam-airlines.webp", width: 541, height: 200 },
  Candid: { src: "/clients/candid.webp", width: 599, height: 333 },
  CeraVe: { src: "/clients/CeraVe_logo.webp", width: 1230, height: 466 },
  "Kiehl's": { src: "/clients/kiehl's.webp", width: 576, height: 291 },
  Murad: { src: "/clients/murad.webp", width: 300, height: 167 },
  Vichy: { src: "/clients/vichy.webp", width: 576, height: 288 },
  "Lancôme": { src: "/clients/Lancome-logo.webp", width: 2803, height: 1500 },
  "M.O.I": { src: "/clients/moi cosmetic.webp", width: 447, height: 299 },
}
