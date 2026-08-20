# Phan Nguyễn — website mới

Website dựng lại cho **CÔNG TY TNHH MTV SX TM DV PHAN NGUYỄN**.

- **Giữ nguyên**: thương hiệu (logo, màu, font, slogan, thông tin liên hệ), toàn bộ 112 sản phẩm, hình ảnh, văn bản và tin tức lấy từ phannguyenbags.vn.
- **Làm mới**: layout, navigation và ngôn ngữ thiết kế theo hướng editorial tối giản — header cố định có thanh tiện ích thu gọn khi cuộn, mega menu danh mục, lưới sản phẩm có bộ lọc, footer nhiều cột.
- **Song ngữ**: bản tiếng Anh đầy đủ tại `/en`, URL tiếng Việt giữ nguyên như cũ.

## Chạy dự án

```bash
pnpm install
node scripts/prep.mjs     # copy dữ liệu + media từ ../content và ../assets
node scripts/build-en.mjs # sinh bản dịch tiếng Anh
pnpm dev                  # http://localhost:3000
```

Build production:

```bash
pnpm build && pnpm start
```

`scripts/prep.mjs` phải chạy lại mỗi khi dữ liệu ở `../content/` hoặc `../assets/` thay đổi.
`scripts/build-en.mjs` phải chạy lại sau `prep.mjs` và mỗi khi sửa bảng dịch — script sẽ **báo lỗi và dừng** nếu có sản phẩm / danh mục / bài viết chưa có bản dịch, nên không thể vô tình đẩy nội dung thiếu tiếng Anh lên production.

## Công nghệ

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 — không dùng thư viện UI ngoài, toàn bộ component tự viết.

## Cấu trúc

```
app/
  [locale]/             Mọi trang nằm dưới đây; `locale` là "vi" hoặc "en"
    page.tsx            Trang chủ
    san-pham/           Danh sách (SSR + lọc) và chi tiết sản phẩm
    gioi-thieu/         Giới thiệu, khách hàng, quy trình, giấy chứng nhận
    tin-tuc/            Danh sách + chi tiết bài viết
    uu-dai/             5 sản phẩm đang giảm giá
    lien-he/            Thông tin + bản đồ + form báo giá
    [...rest]/          Bắt URL lạ để 404 render trong layout đúng ngôn ngữ
    not-found.tsx       Trang 404 (đọc ngôn ngữ từ header `x-locale`)
  api/bao-gia/          API nhận form (hiện chỉ log — xem TODO bên dưới)
  sitemap.ts            Sitemap 262 URL, kèm hreflang cho từng trang

middleware.ts           Map URL công khai → route nội bộ (xem phần Đa ngôn ngữ)

components/             Nav, Footer, ProductCard, ProductBrowser, ProductGallery,
                        PageHeader, QuoteForm, ArticleBody, ClientMarquee,
                        LanguageSwitcher, icons

lib/
  i18n.ts               Danh sách ngôn ngữ, ngôn ngữ mặc định, nhãn hiển thị
  routes.ts             Bảng segment URL theo ngôn ngữ + helper `path()`
  dictionary.ts         Toàn bộ chuỗi giao diện (vi + en)
  content.ts            Nội dung đã dịch: sản phẩm, danh mục, bài viết, thương hiệu
  use-localized-path.ts Dịch đường dẫn hiện tại sang ngôn ngữ kia (nút đổi ngôn ngữ)
  data.ts               Đọc JSON, dựng cây danh mục, tách tin tức / dịch vụ
  utils.ts              cn(), media(), bỏ dấu tiếng Việt

data/                   JSON sinh bởi prep.mjs (không sửa tay)
data/i18n/              Bản dịch sinh bởi build-en.mjs (không sửa tay)
public/media/           Toàn bộ ảnh, font, video (sinh bởi prep.mjs)
```

## Đa ngôn ngữ

Tiếng Việt là ngôn ngữ mặc định và **giữ nguyên URL cũ** để không mất thứ hạng
tìm kiếm. Tiếng Anh nằm dưới `/en` với slug tiếng Anh:

| Tiếng Việt | Tiếng Anh |
|---|---|
| `/` | `/en` |
| `/san-pham` | `/en/products` |
| `/san-pham/tui-tote-size-lon` | `/en/products/large-tote-bag` |
| `/gioi-thieu` | `/en/about` |
| `/tin-tuc` | `/en/news` |
| `/uu-dai` | `/en/promotions` |
| `/lien-he` | `/en/contact` |
| `?danh-muc=` / `?nhom=` | `?category=` / `?group=` |

Cách hoạt động:

- Thư mục route bên trong vẫn đặt tên tiếng Việt. `middleware.ts` viết lại
  (rewrite) URL công khai về route nội bộ: `/en/products/x` → `/en/san-pham/x`,
  `/san-pham/x` → `/vi/san-pham/x`. Thanh địa chỉ không đổi.
- `/vi/...` bị **redirect 301/307 về `/...`** để một nội dung không có hai URL.
- Mỗi trang tự khai `canonical` + `hreflang` (vi / en / x-default) trỏ đúng bản
  tương ứng; sitemap cũng gắn `xhtml:link` cho từng URL.
- Slug sản phẩm / bài viết tra được cả hai chiều, nên link cũ dán vào `/en` vẫn
  mở đúng trang thay vì 404.
- Nút đổi ngôn ngữ (VI / EN, ở thanh tiện ích, drawer mobile và footer) giữ
  nguyên trang đang xem — kể cả trang chi tiết và bộ lọc danh mục.

### Thêm hoặc sửa bản dịch

Mọi bản dịch **nội dung** nằm trong bảng ở đầu `scripts/build-en.mjs`
(tên sản phẩm, mô tả, danh mục, tiêu đề bài viết, thông tin công ty).
Sửa xong chạy `node scripts/build-en.mjs`.

Mọi chuỗi **giao diện** nằm trong `lib/dictionary.ts`. Bản `en` được khai báo
là `typeof vi`, nên chỉ cần thiếu một khoá là `pnpm typecheck` sẽ báo lỗi.

Thêm ngôn ngữ thứ ba: bổ sung mã vào `locales` trong `lib/i18n.ts`, thêm cột
vào `SEGMENTS` / `QUERY_KEYS` trong `lib/routes.ts`, thêm dictionary và bảng
dịch nội dung tương ứng.

## Chặn Google index (đang bật)

Website **đang chặn toàn bộ công cụ tìm kiếm**. Trạng thái mặc định là không
cho index, và chỉ mở khi đặt biến môi trường `ALLOW_INDEXING=true`.

Ba tầng chặn chạy song song:

| Tầng | File | Tác dụng |
|---|---|---|
| HTTP header | `next.config.mjs` | `X-Robots-Tag: noindex, nofollow, noimageindex, noarchive` cho **mọi** response — kể cả `sitemap.xml` và ảnh trong `/media`, nơi thẻ `<meta>` không với tới |
| Thẻ meta | `lib/seo.ts` → `app/[locale]/layout.tsx` | `<meta name="robots" content="noindex, nofollow, nocache">` trên mọi trang, kèm `<meta name="googlebot">` riêng |
| robots.txt | `app/robots.ts` | `Disallow: /`, và **không** khai báo sitemap để khỏi mời bot thu thập 262 URL |

Cần cả ba vì mỗi tầng bịt một lỗ hổng khác nhau: `robots.txt` chỉ ngăn *thu
thập* chứ không ngăn *lập chỉ mục* (URL bị chặn vẫn có thể lọt vào kết quả tìm
kiếm nếu site khác trỏ link tới), còn thẻ `<meta>` thì không áp dụng được cho
file ảnh và XML.

### Khi nào muốn cho Google index

1. Đặt biến môi trường trên production: `ALLOW_INDEXING=true`
2. Build và deploy lại
3. Kiểm tra:

```bash
curl -I https://phannguyenbags.vn | grep -i x-robots-tag   # phải không có kết quả
curl -s https://phannguyenbags.vn/robots.txt               # phải thấy "Allow: /"
```

Biến phải đúng bằng chuỗi `true`. Gõ sai hoặc quên đặt đều rơi về trạng thái an
toàn là **không index**, nên không thể vô tình để Google thu thập sớm.

## Hệ thống thiết kế

| Token | Giá trị | Dùng cho |
|---|---|---|
| `navy-500` | `#0B3359` | Màu chủ đạo: header phụ, footer, khối tối, tiêu đề |
| `brand-red` | `#EC2D3F` | CTA, giá, nhãn ưu đãi, gạch chân active |
| `brand-gold` | `#FFC120` | Nhấn trên nền tối, gạch phân cách |
| `ink` / `ink-soft` | `#212529` / `#6C757D` | Chữ chính / chữ phụ |
| `line` / `shell` | `#E3E7EC` / `#F6F7F9` | Viền / nền khối |

- **Font**: `OriflameSans2` (font thương hiệu gốc) cho tiêu đề, `Be Vietnam Pro` cho nội dung. OriflameSans2 có thể thiếu glyph tiếng Việt nên luôn đặt Be Vietnam Pro ngay sau trong font stack — trình duyệt tự fallback theo từng ký tự.
- **Bo góc 2px**, viền mảnh, nhãn nhỏ in hoa giãn chữ (`.eyebrow`) là mô-típ nhận diện xuyên suốt.

## Dữ liệu

Sinh từ thư mục cha bằng `scripts/prep.mjs`:

| File | Nội dung |
|---|---|
| `data/brand.json` | Thông tin công ty, liên hệ, màu, font, logo, khách hàng, quy trình 6 bước |
| `data/products.json` | 112 sản phẩm |
| `data/categories.json` | 15 danh mục trong 4 nhóm — **Túi xách** (67): Balo, Túi du lịch, Túi tote & túi vải, Túi xách tay, Túi đeo vai & đeo chéo, Túi đựng mỹ phẩm · **Áo** (26): Áo thun, Áo polo, Đồng phục, Áo khoác, Áo thể thao · **Nón** (17): Nón kết, Nón tai bèo, Nón thể thao · **Phụ kiện** (2). Phân loại lại từ 4 danh mục gốc của site cũ, dựa theo hình dáng/công năng thật xác nhận qua ảnh sản phẩm (xem `Việc cần làm tiếp`) |
| `data/news.json` | 12 bài từ site gốc — 2 bài hiển thị làm Tin tức, 10 bài có breadcrumb "Dịch vụ" bị lọc bỏ (mục Dịch vụ đã gỡ khỏi toàn site) |
| `data/promotions.json` | 5 sản phẩm giảm giá, parse giá cũ/mới/% từ `raw/uu-dai.html` |

## Việc cần làm tiếp

1. **Form báo giá chưa gửi email.** `app/api/bao-gia/route.ts` mới validate và ghi log (đã kèm `locale` để biết khách gửi từ bản tiếng nào). Cắm SMTP (nodemailer/Resend/SendGrid) vào chỗ đánh dấu `TODO` để gửi về `Phannguyen471@gmail.com`.
2. **Link Facebook** trong `content/brand.json` đang trỏ về `facebook.com` chung — cần thay bằng fanpage thật.
3. **107/112 sản phẩm chưa có mô tả** và giá để "Liên hệ" (nguyên trạng site cũ). Trang chi tiết đã chừa sẵn chỗ, chỉ cần bổ sung nội dung vào `content/products.json` rồi chạy lại prep — nhớ thêm bản tiếng Anh vào `PRODUCT_DESCRIPTIONS` trong `scripts/build-en.mjs`.
4. **Tên sản phẩm tiếng Anh dịch từ tên gốc.** Một số tên gốc viết tắt hoặc sai chính tả (`non kaki in mo`, `tui phao chan bong`, `tui xach tay vải sweed`) nên bản dịch là suy đoán hợp lý nhất — nên nhờ người phụ trách sản phẩm rà lại bảng `PRODUCT_NAMES` trong `scripts/build-en.mjs`.
5. **Hai bài tin tức chỉ có video, không có văn bản.** Bản tiếng Anh mới dịch tiêu đề; muốn đầy đủ thì cần phụ đề hoặc mô tả tiếng Anh cho video.
6. **Ảnh sản phẩm bản gốc không có watermark** — nếu muốn giữ watermark như site cũ thì cần xử lý riêng.
7. **Bước "Giao hàng" chưa có mô tả gốc.** Quy trình 6 bước trên site gốc bỏ trống bước này; hiện dùng câu tạm — bản tiếng Việt trong `lib/content.ts`, bản tiếng Anh trong `BRAND.process` của `scripts/build-en.mjs`.
8. **Nhóm "Phụ kiện" hiện chỉ có 2 sản phẩm.** "Giá đỡ điện thoại" và "Gối cổ cao su du lịch" vốn nằm lạc trong danh mục "Áo Nón các loại" gốc, được tách thành nhóm riêng thay vì gán tạm vào danh mục túi. Nếu catalogue có thêm sản phẩm quà tặng/phụ kiện tương tự (bút, sạc dự phòng, ô dù...), bổ sung trực tiếp vào nhóm này.
9. **Mã sản phẩm (SKU) là số tự sinh, không phải mã kho thật.** "Mã sản phẩm" gốc trên site cũ chỉ có ở 13/112 sản phẩm và phần lớn (9/13) là văn bản không khớp tên sản phẩm — không phải hệ thống mã chuẩn. Đã sinh lại `PN-001`–`PN-112` cho toàn bộ 112 sản phẩm, đánh số theo thứ tự nhóm → danh mục (xem `attributes["Mã sản phẩm"]` trong `data/products.json`). Nếu công ty có hệ thống mã kho nội bộ riêng, cần thay thế bằng mã thật.
10. **Danh mục "Áo khoác" hiện chỉ có 1 sản phẩm** ("Áo khoác đủ loại") — tách riêng vì ảnh xác nhận đây là jacket zip, khác hẳn áo polo/đồng phục, không phải vì đủ số lượng để làm danh mục riêng. Tương tự mục 8, nếu catalogue có thêm áo khoác thì danh mục này sẽ đầy đặn hơn tự nhiên.
