/**
 * Sinh data/i18n/en.json từ bảng dịch bên dưới + dữ liệu gốc trong data/.
 * Slug tiếng Anh được tạo tự động từ tên tiếng Anh và kiểm tra trùng lặp.
 *
 * Chạy lại mỗi khi thêm/sửa bản dịch: node scripts/build-en.mjs
 */
import { readFileSync, writeFileSync } from "node:fs"

const read = (f) => JSON.parse(readFileSync(new URL(`../data/${f}`, import.meta.url), "utf8"))
const products = read("products.json")
const categories = read("categories.json")
const articles = read("news.json")

/* ── Tên sản phẩm: slug gốc → tên tiếng Anh ───────────────────────── */
const PRODUCT_NAMES = {
  // áo thun
  "ao-3-lo": "Tank top",
  "ao-boi-in-chuyen": "Sublimation-printed swim top",
  "ao-luoi-1-lop": "Single-layer mesh jersey",
  "ao-luoi-2-lop": "Two-layer mesh jersey",
  "ao-tank-top-nam": "Men's tank top",
  "ao-thun-co-tron-in-full": "Full-print crew neck t-shirt",
  "ao-thun-cotton-den": "Black cotton t-shirt",
  "ao-thun-in-chuyen-em-be": "Baby sublimation-printed t-shirt",
  "ao-thun-in-chuyen-nhiet": "Heat-transfer printed t-shirt",
  "ao-thun-in-nhiet": "Heat-printed t-shirt",
  "ao-thun-lanh-in-chuyen": "Sublimation-printed cool-touch t-shirt",
  "ao-thun-lanh": "Cool-touch t-shirt",
  "ao-thun-me-in-chuyen-nhiet": "Heat-transfer printed textured-knit t-shirt",
  "ao-thun-me": "Textured-knit t-shirt",
  "ao-tre-em-in-chuyen-nhiet": "Heat-transfer printed kids' t-shirt",

  // Áo Nón các loại
  "ao-ca-sau-poly": "Polyester piqué polo shirt",
  "ao-cotton-in-decal": "Decal-printed cotton t-shirt",
  "ao-dong-phuc": "Corporate uniform shirt",
  "ao-khoac-du-loai": "Jackets, all styles",
  "ao-luoi-in-chuyen-nhiet": "Heat-transfer printed mesh jersey",
  "ao-polo-du-loai": "Polo shirts, all styles",
  "ao-polo-in-chuyen": "Sublimation-printed polo shirt",
  "ao-polo": "Polo shirt",
  "ao-youth-in-chuyen": "Sublimation-printed youth t-shirt",
  "ao-youth": "Youth t-shirt",
  "dong-phuc-mam-non": "Preschool uniform",
  "gia-do-dien-thoai": "Phone stand",
  "goi-co-cao-su-du-lich": "Latex travel neck pillow",
  "non-in-lua": "Screen-printed cap",
  "non-jean-wash": "Washed denim cap",
  "non-kaki-du-lich-nhieu-mau": "Multicolour khaki travel cap",
  "non-kaki-du-mau": "Khaki cap in assorted colours",
  "non-kaki-in-mo": "Matte-print khaki cap",
  "non-kaki-mau-den": "Black khaki cap",
  "non-kaki-nhieu-mau": "Multicolour khaki cap",
  "non-kaki-phoi-luoi-the-thao": "Khaki sports cap with mesh panels",
  "non-kaki-phoi-mau": "Two-tone khaki cap",
  "non-kaki-vn": "Vietnam khaki cap",
  "non-nu-vai-du-chong-nuoc": "Women's water-resistant nylon hat",
  "non-tai-beo-hinh-gau-truc": "Panda bucket hat",
  "non-tai-beo-jean": "Denim bucket hat",
  "non-the-thao-nua-dau": "Sports visor",
  "non-the-thao-trang": "White sports cap",
  "non-vai-jean-xanh-nhat": "Light blue denim cap",
  "non-vanh-to-the-thao": "Wide-brim sports hat",

  // Túi các Loại
  "balo-em-be-hinh-thu": "Animal-shaped kids' backpack",
  "balo-hoc-sinh-in-chuyen": "Sublimation-printed school backpack",
  "balo-hoc-sinh-trung-hoc": "High school backpack",
  "balo-hoc-sinh": "School backpack",
  "balo-pg": "P&G backpack",
  "balo-rut-in-chuyen-nhiet": "Heat-transfer printed drawstring backpack",
  "balo-rut-nhua-pvc": "PVC drawstring backpack",
  "balo-rut-phoi-pvc-cao-cap": "Premium PVC-panel drawstring backpack",
  "balo-rut-vai-canvas": "Canvas drawstring backpack",
  "balo-rut": "Drawstring backpack",
  "combo-cac-san-pham": "Gift product combo set",
  "hop-com-giu-nhiet": "Insulated lunch box",
  "tui-cam-tay": "Clutch pouch with key hook",
  "tui-canvas-co-day-rut": "Canvas drawstring bag",
  "tui-canvas-cotton-phoi-coi": "Cotton canvas bag with straw trim",
  "tui-canvas-den": "Black canvas bag",
  "tui-canvas-doi-mau": "Colour-changing canvas bag",
  "tui-canvas-hat-lon": "Coarse-weave canvas bag",
  "tui-canvas-in-chuyen": "Sublimation-printed canvas bag",
  "tui-canvas-poly-deo-vai-in-chuyen": "Sublimation-printed poly canvas shoulder bag",
  "tui-canvas-poly-size-lon-in-decal": "Large decal-printed poly canvas bag",
  "tui-canvas-size-to": "Oversized canvas bag",
  "tui-chan-bong-deo-cheo": "Quilted crossbody bag",
  "tui-coi": "Straw bag",
  "tui-deo-cheo": "Crossbody bag",
  "tui-deo-vai-cao-cap": "Premium shoulder bag",
  "tui-deo-vai-hinh-ban-nguyet": "Half-moon shoulder bag",
  "tui-deo-vai-xach-tay-tien-dung": "Convertible shoulder and hand bag",
  "tui-deo-vai": "Shoulder bag",
  "tui-du-lich-ca-nhan": "Personal travel bag",
  "tui-du-lich-canvas-phoi-gia-da": "Canvas travel bag with faux leather trim",
  "tui-du-lich-canvas": "Canvas travel bag",
  "tui-du-lich-cao-cap": "Premium travel bag",
  "tui-du-lich-do": "Red travel bag",
  "tui-du-lich-mini": "Mini travel bag",
  "tui-du-lich-tien-dung": "Everyday travel bag",
  "tui-dung-laptop-vai-canvas": "Canvas laptop sleeve",
  "tui-dung-my-pham-du-lich": "Travel cosmetic bag",
  "tui-dung-my-pham-gia-da": "Faux leather cosmetic bag",
  "tui-dung-my-pham-pu-mo-cao-cap": "Premium matte PU cosmetic bag",
  "tui-in-chuyen-vai-poly": "Sublimation-printed polyester bag",
  "tui-luoi-du-lich": "Mesh travel bag",
  "tui-luoi": "Mesh bag",
  "tui-nhua-luoi": "Mesh PVC bag",
  "tui-phao-chan-bong-2-lop": "Double-layer puffer bag",
  "tui-phao-chan-bong-deo-cheo": "Quilted puffer crossbody bag",
  "tui-phao-chan-bong-size-lon": "Large quilted puffer bag",
  "tui-phao-chan-bong": "Quilted puffer bag",
  "tui-simili-deo-cheo": "Faux leather crossbody bag",
  "tui-tote-size-lon-in-chuyen": "Large sublimation-printed tote bag",
  "tui-tote-size-lon": "Large tote bag",
  "tui-xach-tay-tienm-dung": "Cooler bag with bottle opener",

  // Túi xách tay
  "tui-bo-in-lua-xach-tay": "Screen-printed canvas tote",
  "tui-canvas-size-lon-cao-cap": "Premium large canvas tote",
  "tui-canvas-size-lon-form-cung": "Large structured canvas tote",
  "tui-canvas-xach-tay": "Canvas hand tote",
  "tui-deo-vai-gia-da": "Faux leather shoulder bag",
  "tui-dung-my-pham-halogram": "Holographic cosmetic bag",
  "tui-dung-my-pham-nhua-pvc-phoi-canvas": "PVC and canvas cosmetic bag",
  "tui-dung-my-pham-si": "Faux leather cosmetic pouch",
  "tui-dung-my-pham": "Cosmetic bag",
  "tui-my-pham-chan-bong": "Quilted cosmetic bag",
  "tui-phao-dung-my-pham": "Puffer cosmetic bag",
  "tui-xach-cac-loai": "Handbag, assorted styles",
  "tui-xach-tay-bo-600-pu": "600D canvas and PU handbag",
  "tui-xach-tay-canvas-phoi-pu-nau": "Canvas handbag with brown PU trim",
  "tui-xach-tay-vai-sweed": "Suede handbag",
}

/* ── Mô tả sản phẩm (chỉ 5 sản phẩm gốc có mô tả) ─────────────────── */
const PRODUCT_DESCRIPTIONS = {
  "ao-polo-in-chuyen": `Material: piqué knit
Composition: 100% polyester
- UV protection
- Sublimation printing
- Water repellent
- Quick drying
- Smart and youthful`,
  "ao-thun-me": "Textured-knit crew neck t-shirt",
  "tui-canvas-size-to":
    "Add a touch of personality to any look — this oversized bag makes a style of its own.",
  "tui-deo-vai-hinh-ban-nguyet":
    "The elegant half-moon silhouette gives this Ida bag a modern feel and makes it the ideal companion, whether you are shining on the beach or travelling with confidence. A refined balance of style and practicality, it is the perfect way to refresh a favourite outfit with a look that is as fashionable as it is comfortable.",
  "tui-du-lich-do": `Multi-purpose travel bag
Can be carried on the shoulder or by hand, with several compartments for clothes, shoes and more
Available in red and grey`,
}

/* ── Danh mục & nhóm ──────────────────────────────────────────────── */
const CATEGORY_NAMES = {
  balo: "Backpacks",
  "tui-du-lich": "Travel bags",
  "tui-tote": "Tote bags",
  "tui-rut": "Drawstring bags",
  "tui-phao-chan-bong": "Quilted puffer bags",
  "tui-deo-vai": "Shoulder bags",
  "tui-deo-cheo": "Crossbody bags",
  "tui-xach-tay": "Handbags",
  "tui-dung-my-pham": "Cosmetic bags",
  "ao-thun": "T-shirts",
  "ao-polo": "Polo shirts",
  "dong-phuc": "Uniforms",
  "ao-khoac": "Jackets",
  "ao-the-thao": "Sports jerseys",
  "non-ket": "Structured caps",
  "non-tai-beo": "Bucket hats",
  "non-the-thao": "Sports caps",
  "phu-kien": "Accessories",
}

const GROUP_NAMES = {
  "tui-xach": "Bags",
  ao: "Apparel",
  non: "Caps",
  "phu-kien": "Accessories",
}

const GROUP_DESCRIPTIONS = {
  "tui-xach": "Backpacks, totes, travel bags, more — ready for your logo.",
  ao: "T-shirts, polos, uniforms, jackets for the whole team.",
  non: "Caps, bucket hats, sport caps, embroidered to order.",
  "phu-kien": "Small extras round out your gift set.",
}

/* ── Bài viết (tin tức + dịch vụ) ─────────────────────────────────── */
const ARTICLE_TITLES = {
  "canton-fair-2023": "Canton Fair 2023",
  "dan-khach-di-hc": "Escorting clients to trade fairs",
  "dan-khach-di-hoi-cho-tq": "Escorting clients to trade fairs in China",
  "dan-khach-di-nha-may-san-xuat": "Factory visit escort service",
  "dich-cac-loai-sach": "Translation of books across all genres",
  "dich-sach": "Book translation",
  "dich-sach-tu-viet-sang-trung": "Vietnamese to Chinese book translation",
  "dich-truc-tiep": "Live interpreting",
  "dich-truyen": "Fiction and comic translation",
  "dich-vu-dich-cabin": "Simultaneous booth interpreting",
  "dich-vu-dich-thuat": "Translation services",
  "cach-chon-tui-vai-qua-tang-doanh-nghiep": "How to choose corporate gift tote bags for every event",
  "dong-phuc-cong-ty-in-logo": "Branded company uniforms: a guide to fabric and bulk ordering",
  "non-in-logo-thuong-hieu-chon-loai-nao": "Branded caps: structured cap, bucket hat, or sports cap?",
  "luu-y-khi-in-logo-len-qua-tang-doanh-nghiep": "5 tips for printing your logo on corporate gifts without fading or smudging",
}

const ARTICLE_CONTENT = {
  "cach-chon-tui-vai-qua-tang-doanh-nghiep": {
    content_text:
      "Tote, drawstring, or quilted puffer bag — each fabric bag suits a different corporate gifting purpose. A buying guide from Phan Nguyen.",
    content_html: `<p>Fabric bags are among the most popular corporate gifts today — not only for their reasonable cost but for their natural ability to spread brand awareness: every time a recipient carries the bag to work, to the market, or out for errands, the company logo appears in front of hundreds of different eyes. However, the fabric-bag gifting market now spans a wide range of types — from tote bags, drawstring bags, and quilted puffer bags to shoulder bags, crossbody bags, backpacks, and travel bags — and not every type suits every event or every audience. Choosing the wrong bag wastes budget and makes the gift less memorable than intended. This article breaks down how to choose each type of fabric bag for its actual use case, based on the product lines Phan Nguyen currently manufactures.</p>

<h2>Why fabric bags remain a top corporate gift choice</h2>
<p>Compared with traditional gifts like notebooks, pens, or thermal mugs, fabric bags have a hard-to-replace advantage: high frequency of use and logo visibility in public spaces. A tote bag carried to work, to the market, or to school can appear in public dozens of times a month — something few other gifts can match. Fabric bags also offer flexible production costs, easy to adjust to any budget by changing the material, size, or printing technique. Finally, the growing preference for sustainable, reusable alternatives to plastic bags turns a reusable fabric bag into a gift that is both practical and carries a positive environmental message — a meaningful plus for brand image.</p>

<h2>Tote bags — a safe choice for almost any event</h2>
<p>A structured shape, sturdy handles, and a wide front panel for the logo are why tote bags are consistently the most ordered line for corporate gifts. Tote bags suit nearly every type of event: client conferences, grand openings, trade fairs, year-end gifts, or welcome gifts for new hires. As for material, heavyweight canvas totes feel durable and premium, well suited as gifts for important partners, while lighter cotton totes suit large giveaway programs where shipping cost needs to stay low. For size, choose one large enough for A4 documents, a thin laptop, or a few personal items — too small feels impractical, too large feels bulky to carry home. Browse the <a href="/en/products?category=tote-bags">tote bags</a> currently available at Phan Nguyen.</p>

<h2>Drawstring bags — lightweight, ideal for large-volume gifting</h2>
<p>For programs that need to hand out gifts to hundreds or thousands of guests at once — conferences, sporting events, recruitment fairs, or gifts for students — drawstring bags are the optimal choice. Their biggest advantage is light weight and easy folding, which significantly cuts packaging and shipping costs compared with tote bags at the same volume. The simple construction with two drawstrings also means lower production cost, useful when the gifting budget is tight but the quantity needed is large. The trade-off is a smaller printable area than a tote, so they suit simple logos with few details best. Browse more <a href="/en/products?category=drawstring-bags">drawstring bags</a>.</p>

<h2>Quilted puffer bags — a premium gift with strong visual impact</h2>
<p>If a business wants to give a gift with a higher perceived value — for VIP partners, year-end gifts, or the colder northern market — the quilted puffer bag stands out. Its signature puffy shape and quilted surface feel warm, upscale, and clearly distinct from ordinary flat fabric bags, making the gift feel more valuable even when production cost isn't much higher. Quilted puffer bags also come in several variants — crossbody, oversized, or double-layer — suited to seasonal gifts or limited editions for special programs. See the <a href="/en/products?category=quilted-puffer-bags">quilted puffer bags</a> available.</p>

<h2>Shoulder bags and crossbody bags — personal, everyday gifts</h2>
<p>Unlike tote bags, which are usually tied to a specific purpose, shoulder bags and crossbody bags feel more personal — well suited as gifts for loyalty programs, gifts for female staff, or holiday and company-anniversary gifts. Because they get used in daily life far more than typical event bags, this line also keeps the brand top of mind for much longer. When choosing a <a href="/en/products?category=shoulder-bags">shoulder bag</a> or <a href="/en/products?category=crossbody-bags">crossbody bag</a> as a gift, favor a neutral design that's easy to style rather than something too distinctive, so it suits a wider range of recipients.</p>

<h2>Backpacks and travel bags — gifts for multi-day events</h2>
<p>For multi-day conferences, internal training, company trips (team building), or gifts for partners traveling on business, <a href="/en/products?category=backpacks">backpacks</a> and <a href="/en/products?category=travel-bags">travel bags</a> are far more practical than an ordinary fabric bag. This is a gift category with high ongoing utility — recipients tend to keep and use them for years if the quality is good — so even though the upfront investment is higher, the long-term brand-recall payoff is well worth considering, particularly as a gift for key clients or partners rather than a mass giveaway.</p>

<h2>Handbags and cosmetic bags — gifts for beauty events and female customers</h2>
<p>For female-customer programs, beauty events, spa promotions, or gifts bundled with cosmetics, <a href="/en/products?category=handbags">handbags</a> and <a href="/en/products?category=cosmetic-bags">cosmetic bags</a> suit the occasion better than a standard fabric bag. Their compact size and refined design give the gift a thoughtful, considered feel — ideal as an add-on gift or a thank-you gift after an event.</p>

<h2>Printing techniques that suit each fabric type</h2>
<p>Every fabric works best with a specific printing technique, and choosing the wrong one is the most common reason a logo peels or fades quickly. Thick, textured canvas suits screen printing — a hand-applied, layer-by-layer ink process that's colorfast and reasonably priced at volume — or embroidery, the most durable technique, best for simple logos with few details. Thin, soft cotton suits heat-transfer printing better: sharp images, good for multi-color logos, though the pressing temperature needs care so the fabric doesn't stiffen. Polyester and nylon fabrics usually take heat-pressed decal printing, which gives a glossy, eye-catching finish. Before committing to a large production run, always request a sample to check color adhesion, sharpness, and logo placement on the actual fabric that will be used, rather than judging from a design file alone.</p>

<h2>The process for ordering fabric gift bags at Phan Nguyen</h2>
<p>To make sure the finished order matches expectations, ordering fabric gift bags at Phan Nguyen typically follows these steps: consulting on the right bag type and material for your budget and event; sending your logo file for design and a quantity-based quote; producing a physical sample so you can approve the fabric color, shape, and print position before mass production; manufacturing the full order to the approved sample; and delivering on the committed schedule. The sampling step matters most for first-time orders or logos with many details, since it prevents an entire large batch from coming out with the same flaw with no time to fix it before the event date.</p>

<h2>Frequently asked questions</h2>
<p><strong>Which bag type works best on a tight budget but a large order?</strong><br/>Drawstring bags are usually the most economical thanks to their simple construction and light weight, which lowers both production and shipping costs.</p>
<p><strong>Can I order a small batch to try before committing?</strong><br/>Yes — request a sample or a small trial order before committing to a large batch, especially as a first-time customer.</p>
<p><strong>How long does production usually take for a fabric bag order?</strong><br/>It depends on quantity, material, and printing technique — reach out ahead of time for a specific timeline so you can plan your event accordingly.</p>

<p>No single fabric bag is right for every event — what matters is identifying the actual use case, recipient, and budget before choosing a style. Phan Nguyen designs, samples, and manufactures corporate gift fabric bags to order, with on-time delivery for large orders. Browse all <a href="/en/products">bag products</a> or <a href="/en/contact">get in touch for fast advice and a quote</a>.</p>`,
  },

  "dong-phuc-cong-ty-in-logo": {
    content_text:
      "Choosing branded company uniforms means weighing fabric, print placement and printing technique for each department. A bulk-order guide from Phan Nguyen.",
    content_html: `<p>Company uniforms are more than work attire — they're a quiet but persistent brand-recognition channel, especially for businesses whose staff interact directly with customers: retail, restaurants, events, or customer service. A well-designed, correctly branded uniform makes staff look professional and gives customers a sense of consistency and trust. But ordering branded company uniforms in bulk isn't as simple as picking a shirt style and printing a logo on it — you need to think through garment type, fabric, printing technique, and the bulk-ordering process to avoid costly mistakes. This article covers what to know before ordering uniforms.</p>

<h2>Choosing the right garment type for each department</h2>
<p>Not every department needs the same style of uniform. Office staff, receptionists, and customer advisors usually suit <a href="/en/products?category=polo-shirts">polo shirts</a> — smart enough to look professional, comfortable enough for indoor work. Production, technical, and delivery teams need <a href="/en/products?category=uniforms">uniforms</a> that are durable, comfortable to move in, and easy to wash frequently. For event programs, trade fairs, or bulk staff gifts, branded <a href="/en/products?category=t-shirts">t-shirts</a> are a flexible, cost-effective option that pairs easily with other clothing. For outdoor environments, cold weather, or work that needs an extra layer, add a matching <a href="/en/products?category=jackets">jacket</a> to complete the look.</p>

<h2>Choosing fabric that suits the work environment</h2>
<p>Cotton absorbs sweat well and feels soft, suited to air-conditioned offices or mostly indoor work — it's also the most common fabric for t-shirt and polo uniforms. For teams that move a lot or work outdoors or in hot conditions, favor cooling fabric or <a href="/en/products?category=sports-jerseys">sports jerseys</a> with stretch and quick-dry properties that stay comfortable even with heavy sweating. For uniforms that need high durability and frequent washing — kitchen or production uniforms, for example — choose a heavier fabric that wrinkles less and holds its shape after repeated washes. Choosing the right fabric affects not just staff comfort but how long the whole uniform lasts.</p>

<h2>Logo placement and printing technique shape how the brand is perceived</h2>
<p>Logo placement has a real effect on how the brand is perceived. A small logo on the left chest feels professional and understated, well suited to an office or client-facing environment. A large logo on the back or center chest suits event or outdoor uniforms better, where visibility from a distance matters. On technique, embroidery is the most durable over time and keeps fine detail crisp through repeated washing, but works best for logos with few colors and little detail. Decal or heat-transfer printing suits multi-color logos with gradients or intricate detail, though you'll need to watch temperature and care instructions to avoid peeling over time. For uniforms meant to last, embroidery is generally the recommended choice to keep the logo looking sharp.</p>

<h2>Uniform color and consistency across the brand</h2>
<p>Uniform colors should follow the company's existing brand identity rather than the personal preference of whoever is placing the order. Companies with multiple departments can consider a shared primary color while varying the collar or sleeve trim by department, keeping overall consistency while still making roles easy to distinguish. Avoid mixing too many colors into one uniform — it clutters the look and dilutes the logo's impact. Two to three colors is usually enough for a clean, professional uniform.</p>

<h2>Ordering in bulk: sizing, fit, and common mistakes</h2>
<p>One of the most common mistakes when ordering uniforms in bulk is skipping a proper size survey of the whole staff before placing the order, leading to shortages or surpluses in specific sizes. Collect actual measurements or current shirt sizes for each staff member before submitting the order, and add a small buffer quantity for new hires or size exchanges. For companies with both male and female staff, consider separate cuts for each rather than a single unisex fit, to keep both comfort and appearance in check.</p>

<h2>The bulk uniform ordering process at Phan Nguyen</h2>
<p>For bulk uniform orders, Phan Nguyen always produces a sample before mass production so you can check the actual fit, fabric color, and logo placement before committing to the full run. The process typically includes: consulting on the right garment type and fabric; receiving your logo file and size chart; producing a sample for approval before production; manufacturing to the approved sample; quality checking and packing; and delivering on the committed schedule. Sampling first minimizes the risk of having to redo an entire large batch after a flaw is discovered post-production.</p>

<h2>Frequently asked questions</h2>
<p><strong>Should I print or embroider the logo for a long-lasting uniform?</strong><br/>Embroidery is generally more durable over time and better suited to uniforms worn and washed daily.</p>
<p><strong>Can I order different cuts within the same order?</strong><br/>Yes — as long as the fabric, color, and print position stay consistent to keep departments looking cohesive.</p>
<p><strong>How do I avoid sizing mistakes on a bulk order?</strong><br/>Survey each staff member's actual size before ordering rather than estimating by general ratio, and order a small buffer quantity.</p>

<p>Ordering branded company uniforms isn't just about picking a nice shirt style — it's a process that weighs fabric, printing technique, quantity, and fit to keep the brand identity consistent. Browse the available <a href="/en/products?category=uniforms">uniforms</a> and <a href="/en/products?category=polo-shirts">polo shirts</a>, or <a href="/en/contact">get in touch for material advice and a volume quote</a>.</p>`,
  },

  "non-in-logo-thuong-hieu-chon-loai-nao": {
    content_text:
      "Structured cap, bucket hat, or sports cap — each branded cap suits a different purpose. A gift-cap buying guide from Phan Nguyen.",
    content_html: `<p>Caps are one of those small corporate gifts with outsized brand impact, since the front panel — where the logo sits — stays in plain view whenever the wearer is out in public. Unlike a shirt or a bag, a cap is almost always worn outdoors, in public spaces where many people can see it — which gives caps a strong cost-to-impact ratio as a gift. The cap-gifting market has three main lines: structured caps, bucket hats, and sports caps, each suited to a different audience and purpose. This article helps businesses choose the right cap for each program.</p>

<h2>Structured caps — the most popular, versatile choice</h2>
<p><a href="/en/products?category=structured-caps">Structured caps</a> are the most frequently ordered line for corporate gifts thanks to their firm, tidy shape and a spacious front panel that's easy to print or embroider with a large, clearly visible logo. Structured caps suit almost any program: event gifts, trade fairs, grand openings, or uniforms for a sales team or promotional staff at retail points. On material, khaki structured caps hold their shape well over time; denim structured caps have a younger, more casual feel, suited to brands targeting a younger audience. For programs that need multiple colors to distinguish roles or departments, structured caps also have an edge, since they come in a wide range of fabric colors.</p>

<h2>Bucket hats — suited to outdoor events and multi-day trips</h2>
<p><a href="/en/products?category=bucket-hats">Bucket hats</a> cover the whole head and part of the neck, giving noticeably better sun protection than a structured cap — which is why they're the preferred pick for team-building programs, company trips, or all-day outdoor events under harsh sun. Beyond function, bucket hats also carry a more approachable, down-to-earth feel, well suited to brands in travel, agriculture, or community programs. Because the fabric area is larger than a structured cap, bucket hats also suit logos with more detail, or ones that need extra text like a program name or slogan alongside the main logo.</p>

<h2>Sports caps — for races and athletic events</h2>
<p><a href="/en/products?category=sports-caps">Sports caps</a> are usually made from lighter, more breathable fabric with better moisture-wicking than standard caps — well suited as gifts for a race, a corporate sports event, or uniforms for amateur athletes and event organizers. Some sports cap styles use a half-crown visor design or a wider brim, suited to outdoor sports that need a wide field of view. When choosing sports caps as a gift, prioritize functional details like an adjustable rear strap and ventilation holes to ensure a genuinely good experience, not just a good look.</p>

<h2>Choosing a cap size that fits a wide range of recipients</h2>
<p>Since corporate gifts are usually handed out to a large group with varying head sizes, favor styles with an adjustable strap or buckle at the back rather than a fixed size. This lets a single style fit most recipients without producing multiple sizes — saving cost and simplifying packing and distribution at the event.</p>

<h2>Printing techniques suited to each cap type</h2>
<p>Simple, low-color logos should be embroidered to hold up over repeated use and washing — this is also the most common technique for structured caps, since the slightly curved front panel lets embroidery sit firm and resist peeling over time. For multi-color logos with gradients or intricate small details, screen printing or heat-transfer decal printing works better, though the print position should avoid seams to prevent cracking or shifting over time. Bucket hats and sports caps, with flatter fabric surfaces, allow more flexibility between printing techniques depending on budget and logo detail.</p>

<h2>Pairing caps with other gift items</h2>
<p>Caps tend to make the strongest impression when paired with other gift items as a complete set, rather than given alone. A gift set of a cap paired with a <a href="/en/products?category=t-shirts">t-shirt</a> or <a href="/en/products?category=tote-bags">tote bag</a> in a matching color and print position feels far more polished and professional than handing out unrelated single items. This pairing also puts the brand in front of the recipient at more touchpoints in daily life — from putting the cap on before heading out to carrying the bag to work.</p>

<h2>The process for ordering branded caps at Phan Nguyen</h2>
<p>Phan Nguyen produces a sample cap on request before mass production, to confirm the correct fabric color, shape, and print position before the full delivery. The process typically includes: consulting on the right cap style for its intended use; receiving your logo file for design and a quote; producing a physical sample for approval before production; manufacturing the full order to the approved sample; and delivering on the committed schedule — especially important for orders tied to a fixed event date.</p>

<h2>Frequently asked questions</h2>
<p><strong>Structured cap or bucket hat — which suits an outdoor event better?</strong><br/>For an all-day event under harsh sun, a bucket hat offers better coverage; for shorter wear where looks matter more, the structured cap remains the more popular pick.</p>
<p><strong>Is embroidery or printing more durable for caps?</strong><br/>Embroidery is generally more durable over time, especially for logos with fewer details; printing suits multi-color logos better.</p>
<p><strong>Can I order a small batch to try before a large order?</strong><br/>Request a sample before committing to a large order, especially for first-time customers or logos with complex detail.</p>

<p>No single cap style is the right choice for every program — what matters is identifying the actual use case, audience, and logo complexity before choosing a style. Browse the <a href="/en/products?category=structured-caps">caps</a> currently available at Phan Nguyen or <a href="/en/contact">get in touch for advice and a quote</a>.</p>`,
  },

  "luu-y-khi-in-logo-len-qua-tang-doanh-nghiep": {
    content_text:
      "Printing a logo on corporate gifts can fade or peel if the wrong technique is used. 5 tips from Phan Nguyen to keep your logo looking sharp for longer.",
    content_html: `<p>Logo printing is the single most important step in making a corporate gift — the same product with a sharp, colorfast logo looks professional, while a logo that smears, peels, or shifts color after just a few uses backfires, leaving recipients with a poor impression of both the product and the brand. In practice, most logo-printing problems don't come from the design itself but from choosing the wrong printing technique for the product's material, or skipping the sampling step before a large production run. Here are 5 tips to help businesses minimize these risks when printing a logo on gifts.</p>

<h2>Common logo-printing techniques today</h2>
<p>Before getting into specific tips, it helps to understand the printing techniques commonly used for corporate gifts. Screen printing is the traditional technique, well suited to large volumes, reasonably priced, and colorfast, but limited when a logo has too many colors. Heat-transfer printing (decal, heat press) gives a sharp image and suits multi-color or gradient logos, usually used on thin cotton or polyester fabric. Embroidery is the most durable technique over time, suited to simple logos with few details, commonly used for uniforms and caps. Each technique has its own strengths and weaknesses, and none is the best choice for every case — choosing the right one depends on the product's material, the logo's complexity, and the order quantity.</p>

<h2>1. Match the printing technique to the product's material</h2>
<p>This is the single most important consideration, and the most common reason a logo peels or fades quickly. Cotton and canvas absorb well, so they suit screen printing or heat-transfer printing, since the ink can soak deep into the fibers. Nylon and polyester have a smoother, less absorbent surface, so they suit decal or heat-press printing better — techniques that form an ink layer on the surface rather than soaking into the fibers. Applying the wrong technique — screen printing directly onto smooth polyester, for example — leaves the ink layer poorly adhered and prone to peeling after just a few washes or uses. For non-fabric products such as faux-leather or PVC bags, more specialized techniques like heat pressing or embossing are needed instead of standard fabric-printing methods.</p>

<h2>2. Always request a sample before mass production</h2>
<p>A physical sample lets you check color adhesion, sharpness, and print position on the actual material that will be used for production — something a digital design file rarely reflects accurately, since it doesn't show how ink actually sits on a given fabric. Sampling matters most for first-time orders or logos with multiple colors or fine details, since these are the cases most prone to differences between the design file and the finished product. Skipping this step to save time can lead to a much bigger risk: an entire large batch coming out with the same flaw, with no time to fix it before the delivery date — costing both money and event timelines.</p>

<h2>3. Weigh the logo's color count and complexity</h2>
<p>The more colors and fine details a logo has, the more complex the printing technique, the longer production takes, and the higher the cost. For large orders or tight budgets, consider a single-color or simplified version of the logo — many major brands already keep a simplified logo variant specifically for applications like gifts and uniforms. Simplifying the logo not only saves cost but also makes it read more clearly on small surfaces like a cap or a drawstring bag, where a limited print area can make a highly detailed logo look blurry and hard to recognize.</p>

<h2>4. Pay attention to print placement on each product type</h2>
<p>Print placement should avoid seams, zippers, folds, or any stress points during use — these are the areas most prone to cracking, shifting, or peeling faster than a flat surface. For bags, avoid printing right at the bottom fold; for shirts, favor the left chest or center back over positions near the sleeve seam. Good placement also accounts for how the product is actually displayed or folded in daily use — a logo in the right spot stays visible even when a bag is folded into a backpack or a shirt is folded in a drawer, rather than being completely hidden.</p>

<h2>5. Tell recipients how to care for the product after receiving it</h2>
<p>Even with the right printing technique, a product can still fade quickly if the owner doesn't care for it properly. For printed products, recommend hand-washing or a gentle machine cycle, and avoid washing alongside items with zippers or rough surfaces that can rub and scratch the printed layer. Also avoid prolonged direct sun exposure, since high heat can make some inks brittle and prone to cracking over time. For premium gift items, consider including a small care-instruction card with the product — it helps preserve the logo's quality longer and adds a thoughtful, considered touch to the brand's image.</p>

<h2>What determines the cost of logo printing?</h2>
<p>The cost of printing a logo on a corporate gift usually depends on four main factors: the printing technique chosen, the number of colors in the logo, the print area, and the order quantity. The larger the quantity, the lower the cost per unit tends to be, thanks to better-optimized machine setup and material use. Before locking in a budget, discuss the expected quantity and logo complexity clearly with the manufacturer to get the most accurate quote, rather than relying on a generic reference price.</p>

<h2>Frequently asked questions</h2>
<p><strong>Which printing technique is most durable?</strong><br/>Embroidery is usually the most durable over time but suits simpler, low-color logos better.</p>
<p><strong>Is sampling required before printing a large order?</strong><br/>It's not strictly required, but strongly recommended, especially for first-time orders or detailed logos, to avoid an entire batch coming out with the same flaw.</p>
<p><strong>Can a multi-color logo be printed on any material?</strong><br/>Yes, but you'll need the right technique for each material — it's best to get advice first to ensure the best possible colorfastness.</p>

<p>A sharp, long-lasting printed logo doesn't come down to a single factor — it's the right combination of printing technique, product material, and a proper sampling process before mass production. At Phan Nguyen, every logo-printing order is sampled and approved before it goes into full production, minimizing the risk of smudging or design mismatches. Browse <a href="/en/products">products available for logo printing</a> or <a href="/en/contact">get in touch for advice on the right printing technique</a>.</p>`,
  },
}

/* ── Thương hiệu ──────────────────────────────────────────────────── */
const BRAND = {
  legal_name: "PHAN NGUYEN PRODUCTION – TRADING – SERVICE ONE MEMBER CO., LTD",
  brand_name: "Phan Nguyen",
  tagline: "PHAN NGUYEN – LEADING THE CORPORATE GIFT TREND",
  motto: "Distinctive design, optimal quality, fair pricing, flawless service",
  experience: "Over 10 years in the corporate gift industry",
  industry:
    "Design and manufacture of corporate gifts and promotional items (bags, backpacks, t-shirts, caps and more)",
  address:
    "471/25/2 Pham Van Bach Street, Ward 15, Tan Binh District, Ho Chi Minh City, Vietnam",
  street_address: "471/25/2 Pham Van Bach Street, Ward 15",
  locality: "Tan Binh District, Ho Chi Minh City",
  placename: "Ho Chi Minh City",
  clients: {
    "Tập đoàn L'Oréal Việt Nam": "L'Oréal Vietnam Group",
    "AMOREPACIFIC Việt Nam": "AMOREPACIFIC Vietnam",
    "Kao Việt Nam": "Kao Vietnam",
    "Shiseido Việt Nam": "Shiseido Vietnam",
    "Cô Gái Hà Lan": "Dutch Lady",
  },
  process: {
    1: {
      name: "CONSULTATION",
      desc: "We take your brief and advise on the gift that best fits your audience, campaign goals and budget, then send a quotation.",
    },
    2: {
      name: "DESIGN",
      desc: "We develop the concept, product styling and logo artwork for you to review and adjust as you wish.",
    },
    3: { name: "SAMPLING", desc: "We produce a sample and confirm it with you." },
    4: { name: "CONTRACT", desc: "Both parties negotiate and sign the contract." },
    5: {
      name: "PRODUCTION",
      desc: "Manufacturing and printing are carried out exactly to the agreed specification.",
    },
    6: {
      name: "DELIVERY",
      desc: "We pack and deliver on the schedule agreed in the contract.",
    },
  },
}

/* ── Sinh slug ────────────────────────────────────────────────────── */
function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/* ── Dựng file ────────────────────────────────────────────────────── */
const errors = []

const outProducts = {}
const seenSlug = new Map()
for (const p of products) {
  const name = PRODUCT_NAMES[p.slug]
  if (!name) {
    errors.push(`Thiếu bản dịch tên sản phẩm: ${p.slug} (${p.name.trim()})`)
    continue
  }
  let slug = slugify(name)
  if (seenSlug.has(slug)) {
    // Trùng slug: thêm hậu tố từ slug gốc để giữ URL duy nhất và ổn định
    slug = `${slug}-${slugify(p.slug).split("-").slice(-1)[0]}`
    if (seenSlug.has(slug)) errors.push(`Slug EN trùng không giải được: ${slug}`)
  }
  seenSlug.set(slug, p.slug)
  outProducts[p.slug] = {
    slug,
    name,
    ...(PRODUCT_DESCRIPTIONS[p.slug] ? { description: PRODUCT_DESCRIPTIONS[p.slug] } : {}),
  }
}

const outCategories = {}
for (const c of categories) {
  const name = CATEGORY_NAMES[c.slug]
  if (!name) {
    errors.push(`Thiếu bản dịch danh mục: ${c.slug}`)
    continue
  }
  outCategories[c.slug] = { slug: slugify(name), name }
}

const outGroups = {}
for (const [viSlug, name] of Object.entries(GROUP_NAMES)) {
  outGroups[viSlug] = {
    slug: slugify(name),
    name,
    ...(GROUP_DESCRIPTIONS[viSlug] ? { description: GROUP_DESCRIPTIONS[viSlug] } : {}),
  }
}

const outArticles = {}
for (const a of articles) {
  const title = ARTICLE_TITLES[a.slug]
  if (!title) {
    errors.push(`Thiếu bản dịch bài viết: ${a.slug}`)
    continue
  }
  const content = ARTICLE_CONTENT[a.slug]
  outArticles[a.slug] = {
    slug: slugify(title),
    title,
    ...(content ? { content_html: content.content_html, content_text: content.content_text } : {}),
  }
}

if (errors.length) {
  console.error("✗ " + errors.join("\n✗ "))
  process.exit(1)
}

const payload = {
  _generated: "scripts/build-en.mjs — không sửa tay, sửa bảng dịch trong script rồi chạy lại",
  brand: BRAND,
  groups: outGroups,
  categories: outCategories,
  products: outProducts,
  articles: outArticles,
}

writeFileSync(new URL("../data/i18n/en.json", import.meta.url), JSON.stringify(payload, null, 1) + "\n")

/* ── Bảng map slug hai chiều, dùng cho nút đổi ngôn ngữ ở phía client ── */
const viToEn = {}
const enToVi = {}
for (const table of [outProducts, outCategories, outGroups, outArticles]) {
  for (const [viSlug, v] of Object.entries(table)) {
    viToEn[viSlug] = v.slug
    enToVi[v.slug] = viSlug
  }
}
writeFileSync(
  new URL("../data/i18n/slug-map.json", import.meta.url),
  JSON.stringify({ "vi->en": viToEn, "en->vi": enToVi }, null, 1) + "\n",
)
console.log(
  `✓ data/i18n/en.json — ${Object.keys(outProducts).length} sản phẩm, ${Object.keys(outCategories).length} danh mục, ${Object.keys(outGroups).length} nhóm, ${Object.keys(outArticles).length} bài viết`,
)
