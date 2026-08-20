import type { Locale } from "@/lib/i18n"

/**
 * Toàn bộ chuỗi giao diện.
 *
 * `vi` là bản gốc và cũng là kiểu tham chiếu — `en` được khai báo
 * `typeof vi` nên TypeScript sẽ báo lỗi ngay khi thiếu hoặc thừa khoá.
 */
const vi = {
  nav: {
    links: {
      about: "Giới thiệu",
      products: "Sản phẩm",
      promotions: "Ưu đãi",
      news: "Tin tức",
      contact: "Liên hệ",
    },
    quote: "Nhận báo giá",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    openCategories: "Mở danh mục",
    language: "Ngôn ngữ",
    switchTo: "Xem bản tiếng Anh",
  },

  footer: {
    company: "Công ty",
    products: "Sản phẩm",
    keepInTouch: "Kết nối",
    viewAll: "Xem tất cả sản phẩm →",
    rights: "All rights reserved.",
  },

  common: {
    home: "Trang chủ",
    breadcrumb: "Breadcrumb",
    quote: "Nhận báo giá",
    contactPrice: "Liên hệ",
    viewDetail: "Xem chi tiết",
    readMore: "Đọc bài viết",
    sale: "Ưu đãi",
    views: "lượt xem",
    image: (n: number) => `Ảnh ${n}`,
    call: (phone: string) => `Gọi ${phone}`,
    address: "Địa chỉ",
    hotline: "Hotline",
    email: "Email",
    zalo: "Zalo",
    videoUnsupported: "Trình duyệt của bạn không hỗ trợ phát video.",
    contentComing:
      "Nội dung chi tiết đang được cập nhật. Vui lòng liên hệ hotline để được tư vấn trực tiếp.",
    clientsEyebrow: "Khách hàng tiêu biểu",
    clientsSr: (names: string) => `Khách hàng tiêu biểu: ${names}.`,
    productCount: (n: number) => `${n} sản phẩm`,
  },

  home: {
    heroEyebrow: (year: number, city: string) => `Từ ${year} · ${city}`,
    heroTitleTop: "Dẫn đầu xu hướng",
    heroTitleBottom: "hàng quà tặng",
    heroLead:
      "Phan Nguyễn thiết kế và sản xuất balo, túi xách các loại, ly bình giữ nhiệt, ô dù, áo thun, khăn mặt, nón, khẩu trang vải và đồng phục nhân viên — nhằm quảng bá và nâng tầm thương hiệu cho doanh nghiệp.",
    heroCtaProducts: "Xem sản phẩm",
    heroImageAlt: "Sản phẩm quà tặng Phan Nguyễn",
    mottoLabel: "Phương châm",
    stats: {
      founded: "Năm thành lập",
      experience: "Năm kinh nghiệm",
      products: "Mẫu sản phẩm",
      clients: "Thương hiệu lớn",
    },
    categoriesEyebrow: "Danh mục",
    categoriesTitle: "Hai dòng sản phẩm chủ lực",
    allProducts: (n: number) => `Tất cả ${n} sản phẩm`,
    explore: "Khám phá ngay",
    pillarsEyebrow: "Vì sao chọn Phan Nguyễn",
    pillarsTitleTop: "Bốn cam kết làm nên",
    pillarsTitleBottom: "niềm tin hơn 10 năm",
    pillarsLead:
      "Sự tin tưởng và ủng hộ của khách hàng trong suốt thời gian qua luôn là nguồn động viên to lớn trên bước đường phát triển của Phan Nguyễn.",
    pillarsCta: "Về chúng tôi",
    pillars: [
      {
        title: "Thiết kế độc đáo",
        text: "Lên ý tưởng, dựng mẫu mã và thiết kế logo riêng cho từng chiến dịch thương hiệu.",
      },
      {
        title: "Chất lượng tối ưu",
        text: "Đội ngũ quản lý sản xuất giàu kinh nghiệm, kiểm soát chất lượng trước khi xuất hàng.",
      },
      {
        title: "Giá cả hợp lý",
        text: "Báo giá theo đúng số lượng và kinh phí, đáp ứng nhiều nhu cầu khác nhau của khách hàng.",
      },
      {
        title: "Dịch vụ hoàn hảo",
        text: "Kèm dịch thuật tiếng Trung, dẫn khách đi hội chợ Canton Fair và tham quan nhà máy.",
      },
    ],
    featuredEyebrow: "Sản phẩm tiêu biểu",
    featuredTitle: "Mẫu được doanh nghiệp chọn nhiều nhất",
    viewAll: "Xem tất cả",
    promoEyebrow: "Ưu đãi",
    promoTitle: "Sản phẩm đang giảm giá",
    promoAll: "Tất cả ưu đãi",
    processEyebrow: "Cách chúng tôi làm việc",
    processTitle: "Quy trình xử lý đơn hàng",
    newsEyebrow: "Tin tức",
    newsTitle: "Bản tin thị trường",
    newsAll: "Tất cả tin tức",
    ctaEyebrow: "Bắt đầu dự án",
    ctaTitleTop: "Gửi yêu cầu, nhận báo giá",
    ctaTitleBottom: "trong 24 giờ",
    ctaLead:
      "Cho chúng tôi biết sản phẩm, số lượng và kinh phí dự kiến — Phan Nguyễn tư vấn mẫu phù hợp với đối tượng khách hàng và mục tiêu chiến dịch của bạn.",
  },

  about: {
    metaTitle: "Giới thiệu",
    metaDescription:
      "Công ty TNHH MTV SX TM DV Phan Nguyễn thành lập năm 2013, tiên phong thiết kế và sản xuất vật phẩm quảng cáo, quà tặng doanh nghiệp tại TP.HCM.",
    eyebrow: "Về chúng tôi",
    title: "Phan Nguyễn — dẫn đầu xu hướng hàng quà tặng",
    storyEyebrow: "Câu chuyện",
    storyTitle: "Hơn 10 năm trong lĩnh vực quà tặng",
    story: [
      (year: number) =>
        `Công ty Phan Nguyễn được thành lập năm ${year}, là một trong những doanh nghiệp tiên phong trong lĩnh vực thiết kế, sản xuất các vật phẩm quảng cáo: balo, túi xách các loại, ly và bình giữ nhiệt, ô dù, áo thun, khăn mặt, nón, khẩu trang vải, đồng phục nhân viên… đồng thời nhập các sản phẩm từ Thái Lan, Trung Quốc.`,
      () =>
        "Nhằm quảng bá và nâng tầm thương hiệu cho doanh nghiệp, với đội ngũ quản lý sản xuất giàu kinh nghiệm, chúng tôi luôn sẵn sàng phục vụ các sản phẩm có chất lượng cao, thiết kế độc đáo, tiến độ giao hàng đúng hạn cùng một mức giá hợp lý — đáp ứng nhiều nhu cầu khác nhau của khách hàng.",
      () =>
        "Bên cạnh đó chúng tôi có cả dịch vụ dịch thuật, dịch sách chuyên ngành tiếng Trung, dẫn khách đi du lịch tham quan hoặc tour hội chợ Canton Fair được tổ chức hàng năm ở Quảng Châu, dẫn khách đi các chợ sĩ và tham quan nhà máy sản xuất tại Trung Quốc.",
      () =>
        "Sự tin tưởng và ủng hộ của khách hàng trong suốt thời gian qua luôn là nguồn động viên to lớn trên bước đường phát triển của Phan Nguyễn. Chúng tôi xin hứa sẽ không ngừng hoàn thiện, phục vụ khách hàng tốt nhất để luôn xứng đáng với niềm tin ấy.",
    ],
    workshopAlt: "Xưởng sản xuất Phan Nguyễn",
    clientsEyebrow: "Khách hàng",
    clientsTitle: "Đã đồng hành cùng các thương hiệu lớn",
    clientsLead: (motto: string) =>
      `Với phương châm “${motto}”, Phan Nguyễn đã đem lại sự hài lòng cho nhiều doanh nghiệp lớn trên thị trường Việt Nam.`,
    processEyebrow: "Quy trình",
    processTitle: "Sáu bước từ ý tưởng đến giao hàng",
    step: (n: number) => `Bước ${n}`,
    legalEyebrow: "Pháp lý",
    legalLead: (address: string) => `Doanh nghiệp đăng ký hoạt động tại ${address}.`,
    legalCta: "Liên hệ với chúng tôi",
    certificateAlt: "Giấy chứng nhận đăng ký doanh nghiệp Phan Nguyễn",
  },

  products: {
    metaTitle: "Sản phẩm",
    metaDescription:
      "Toàn bộ mẫu túi xách, balo, túi canvas, áo thun, nón kaki và quà tặng doanh nghiệp do Phan Nguyễn thiết kế và sản xuất. Nhận in logo theo yêu cầu.",
    eyebrow: (n: number) => `${n} mẫu sản phẩm`,
    title: "Sản phẩm",
    lead: "Túi xách, balo, túi canvas, áo thun, nón — mọi sản phẩm đều nhận in logo và tùy chỉnh chất liệu, kích thước theo yêu cầu của doanh nghiệp.",
    categories: "Danh mục",
    all: "Tất cả",
    allProducts: "Tất cả sản phẩm",
    searchLabel: "Tìm sản phẩm",
    searchPlaceholder: "Tìm tên sản phẩm…",
    matching: (q: string) => ` khớp với “${q}”`,
    empty: "Không tìm thấy sản phẩm phù hợp. Vui lòng thử từ khoá khác.",
    loadMore: (n: number) => `Xem thêm (${n})`,
  },

  product: {
    notFound: "Không tìm thấy sản phẩm",
    metaDescription: (name: string, category: string, phone: string) =>
      `${name} — ${category} do Phan Nguyễn sản xuất. Nhận in logo, tùy chỉnh chất liệu và kích thước theo yêu cầu doanh nghiệp. Liên hệ ${phone} để nhận báo giá.`,
    schemaDescription: (name: string, category: string) =>
      `${name} — ${category} sản xuất tại Phan Nguyễn.`,
    quoteHint: "Giá theo số lượng — gọi để nhận báo giá nhanh",
    chatZalo: "Chat Zalo",
    attributes: {
      "Mã sản phẩm": "Mã sản phẩm",
      Giá: "Giá",
    } as Record<string, string>,
    promises: ["In logo theo yêu cầu", "Làm mẫu trước khi sản xuất", "Giao hàng đúng hạn"],
    quoteEyebrow: "Báo giá",
    quoteTitleTop: "Yêu cầu báo giá cho",
    quoteLead:
      "Điền số lượng và yêu cầu in ấn, chúng tôi gửi báo giá kèm ảnh mẫu trong 24 giờ làm việc.",
    quoteSubject: (name: string) => `Báo giá: ${name}`,
    relatedEyebrow: "Cùng danh mục",
    relatedTitle: "Sản phẩm liên quan",
    relatedCta: (category: string) => `Xem ${category}`,
  },

  news: {
    metaTitle: "Tin tức",
    metaDescription:
      "Tin tức và cập nhật từ Phan Nguyễn: hoạt động hội chợ Canton Fair, xu hướng quà tặng doanh nghiệp và công nghệ mới trong ngành.",
    eyebrow: "Blogs",
    title: "Tin tức",
    lead: "Hoạt động của Phan Nguyễn và những cập nhật đáng chú ý từ thị trường quà tặng.",
    empty: "Chưa có bài viết nào.",
    latest: "Bài mới nhất",
    notFound: "Không tìm thấy bài viết",
    fallbackDescription: (title: string, brand: string) => `${title} — tin tức từ ${brand}.`,
    otherArticles: "Bài viết khác",
    sidebarEyebrow: "Quà tặng doanh nghiệp",
    sidebarLeadStart: "Xem ",
    sidebarLeadLink: "toàn bộ mẫu sản phẩm",
    sidebarLeadEnd: (phone: string) => ` hoặc gọi ${phone} để nhận báo giá.`,
  },

  promotions: {
    metaTitle: "Ưu đãi",
    metaDescription:
      "Các sản phẩm quà tặng đang giảm giá tại Phan Nguyễn: gối cổ cao su du lịch, túi du lịch, túi đựng mỹ phẩm, giá đỡ điện thoại.",
    eyebrow: (n: number) => `${n} sản phẩm giảm giá`,
    title: "Ưu đãi",
    lead: "Mẫu quà tặng có sẵn, giá tốt cho đơn lẻ và đơn số lượng nhỏ. Đặt số lượng lớn vui lòng liên hệ để nhận báo giá riêng.",
    empty: "Hiện chưa có chương trình ưu đãi nào.",
    bulkTitle: "Đặt số lượng lớn có giá riêng",
    bulkLead:
      "Toàn bộ sản phẩm đều nhận in logo và tùy chỉnh theo yêu cầu. Gửi số lượng dự kiến để Phan Nguyễn báo giá theo đúng kinh phí của bạn.",
  },

  contact: {
    metaTitle: "Liên hệ",
    metaDescription: (address: string, phone: string, email: string) =>
      `Liên hệ Công ty Phan Nguyễn — ${address}. Hotline ${phone}, email ${email}.`,
    eyebrow: "Liên hệ",
    title: "Gửi yêu cầu báo giá",
    lead: "Cho chúng tôi biết sản phẩm, số lượng và thời gian cần hàng — Phan Nguyễn phản hồi trong 24 giờ làm việc.",
    infoEyebrow: "Thông tin",
    hours: "Giờ làm việc",
    hoursValue: "Thứ 2 – Thứ 7, 08:00 – 17:30",
    mapTitle: "Bản đồ đến văn phòng Phan Nguyễn",
    formEyebrow: "Báo giá",
    formTitle: "Điền thông tin, chúng tôi liên hệ lại",
  },

  form: {
    fullname: "Họ và tên",
    phone: "Số điện thoại",
    email: "Email",
    company: "Công ty",
    country: "Quốc gia",
    countryPlaceholder: "Chọn quốc gia",
    productInterest: "Sản phẩm quan tâm",
    productInterestPlaceholder: "Chọn danh mục sản phẩm",
    productInterestOther: "Khác",
    quantity: "Số lượng cần đặt",
    quantityPlaceholder: "500",
    optional: "(tuỳ chọn)",
    content: "Nội dung yêu cầu",
    contentPlaceholder: "Yêu cầu in logo, chất liệu, thời gian cần hàng…",
    submit: "Gửi yêu cầu báo giá",
    sending: "Đang gửi…",
    error: "Không gửi được. Vui lòng gọi hotline hoặc thử lại sau.",
    thankYouTitle: "Cảm ơn bạn",
    thankYouBody:
      "Yêu cầu báo giá của bạn đã được ghi nhận. Đội ngũ Phan Nguyễn sẽ liên hệ lại trong 24 giờ làm việc.",
    thankYouProductLabel: "Sản phẩm quan tâm:",
    attachmentHint: (email: string) =>
      `Bạn có thể gửi file thiết kế hoặc logo qua email ${email} sau khi gửi yêu cầu.`,
    submitAnother: "Gửi yêu cầu khác",
  },

  notFound: {
    eyebrow: "Lỗi 404",
    title: "Không tìm thấy trang",
    lead: "Trang bạn tìm có thể đã đổi đường dẫn hoặc không còn tồn tại. Bạn có thể quay lại trang chủ hoặc xem toàn bộ sản phẩm của Phan Nguyễn.",
    home: "Về trang chủ",
    products: "Xem sản phẩm",
    help: "Cần hỗ trợ? Gọi ",
  },

  meta: {
    titleDefault: "Phan Nguyễn | Sản xuất túi xách, balo, áo thun & quà tặng doanh nghiệp",
    titleTemplate: "%s | Phan Nguyễn",
    description:
      "Công ty Phan Nguyễn — 10+ năm thiết kế và sản xuất túi xách, balo, áo thun, nón và quà tặng doanh nghiệp tại TP.HCM. Nhận in logo theo yêu cầu, giao hàng đúng hạn.",
    keywords: [
      "quà tặng doanh nghiệp",
      "sản xuất túi xách",
      "túi canvas in logo",
      "balo quà tặng",
      "áo thun đồng phục",
      "nón kaki in logo",
      "Phan Nguyễn",
    ],
    ogTitle: "Phan Nguyễn | Dẫn đầu xu hướng hàng quà tặng",
    ogDescription:
      "Thiết kế và sản xuất túi xách, balo, áo thun, nón, quà tặng doanh nghiệp. Đối tác của L'Oréal, P&G, Shiseido, Vietnam Airlines.",
    twitterDescription:
      "Thiết kế và sản xuất túi xách, balo, áo thun, nón, quà tặng doanh nghiệp tại TP.HCM.",
  },
}

const en: typeof vi = {
  nav: {
    links: {
      about: "About",
      products: "Products",
      promotions: "Promotions",
      news: "News",
      contact: "Contact",
    },
    quote: "Get a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openCategories: "Open categories",
    language: "Language",
    switchTo: "View the Vietnamese site",
  },

  footer: {
    company: "Company",
    products: "Products",
    keepInTouch: "Get in Touch",
    viewAll: "View all products →",
    rights: "All rights reserved.",
  },

  common: {
    home: "Home",
    breadcrumb: "Breadcrumb",
    quote: "Get a quote",
    contactPrice: "Request price",
    viewDetail: "View details",
    readMore: "Read the article",
    sale: "On sale",
    views: "views",
    image: (n: number) => `Image ${n}`,
    call: (phone: string) => `Call ${phone}`,
    address: "Address",
    hotline: "Hotline",
    email: "Email",
    zalo: "Zalo",
    videoUnsupported: "Your browser does not support video playback.",
    contentComing:
      "Detailed content is being updated. Please call our hotline for direct assistance.",
    clientsEyebrow: "Selected clients",
    clientsSr: (names: string) => `Selected clients: ${names}.`,
    productCount: (n: number) => `${n} product${n === 1 ? "" : "s"}`,
  },

  home: {
    heroEyebrow: (year: number, city: string) => `Since ${year} · ${city}`,
    heroTitleTop: "Leading the trend",
    heroTitleBottom: "in corporate gifts",
    heroLead:
      "Phan Nguyen designs and manufactures backpacks, bags of every kind, insulated bottles and tumblers, umbrellas, t-shirts, towels, caps, cloth masks and staff uniforms — built to promote and elevate your company's brand.",
    heroCtaProducts: "Browse products",
    heroImageAlt: "Phan Nguyen corporate gift products",
    mottoLabel: "Our promise",
    stats: {
      founded: "Year founded",
      experience: "Years of experience",
      products: "Product designs",
      clients: "Major brands",
    },
    categoriesEyebrow: "Categories",
    categoriesTitle: "Two core product lines",
    allProducts: (n: number) => `All ${n} products`,
    explore: "Explore now",
    pillarsEyebrow: "Why choose Phan Nguyen",
    pillarsTitleTop: "Four commitments behind",
    pillarsTitleBottom: "more than 10 years of trust",
    pillarsLead:
      "The trust and support of our customers over the years has been the greatest encouragement on Phan Nguyen's path forward.",
    pillarsCta: "About us",
    pillars: [
      {
        title: "Distinctive design",
        text: "Concepts, product styling and bespoke logo artwork developed for each brand campaign.",
      },
      {
        title: "Optimal quality",
        text: "An experienced production management team inspects quality before every shipment.",
      },
      {
        title: "Fair pricing",
        text: "Quotations matched to your exact quantity and budget, for a wide range of needs.",
      },
      {
        title: "Flawless service",
        text: "Chinese translation, Canton Fair escort tours and factory visits included.",
      },
    ],
    featuredEyebrow: "Featured products",
    featuredTitle: "The designs businesses choose most",
    viewAll: "View all",
    promoEyebrow: "Promotions",
    promoTitle: "Products on sale",
    promoAll: "All promotions",
    processEyebrow: "How we work",
    processTitle: "Our order process",
    newsEyebrow: "News",
    newsTitle: "Market bulletin",
    newsAll: "All news",
    ctaEyebrow: "Start a project",
    ctaTitleTop: "Send your brief, get a quote",
    ctaTitleBottom: "within 24 hours",
    ctaLead:
      "Tell us the product, the quantity and your budget — Phan Nguyen will recommend designs that suit your audience and campaign goals.",
  },

  about: {
    metaTitle: "About us",
    metaDescription:
      "Phan Nguyen Production Trading & Service Co., Ltd was founded in 2013 and is a pioneer in designing and manufacturing promotional items and corporate gifts in Ho Chi Minh City.",
    eyebrow: "About us",
    title: "Phan Nguyen — leading the corporate gift trend",
    storyEyebrow: "Our story",
    storyTitle: "Over 10 years in the corporate gift industry",
    story: [
      (year: number) =>
        `Phan Nguyen was founded in ${year} and is one of the pioneering companies in the design and manufacture of promotional items: backpacks, bags of every kind, insulated bottles and tumblers, umbrellas, t-shirts, towels, caps, cloth masks and staff uniforms — while also importing products from Thailand and China.`,
      () =>
        "To promote and elevate our clients' brands, our experienced production management team is always ready to deliver high-quality products with distinctive design, on-time delivery and fair pricing — meeting a wide range of customer needs.",
      () =>
        "We also provide translation services and specialist Chinese book translation, escort clients on sightseeing trips or Canton Fair tours held each year in Guangzhou, and guide clients through wholesale markets and factory visits in China.",
      () =>
        "The trust and support of our customers over the years has been the greatest encouragement on Phan Nguyen's path forward. We promise to keep improving and to serve our customers as well as we possibly can, so we always remain worthy of that trust.",
    ],
    workshopAlt: "The Phan Nguyen production workshop",
    clientsEyebrow: "Clients",
    clientsTitle: "Trusted by major brands",
    clientsLead: (motto: string) =>
      `Guided by our promise — “${motto}” — Phan Nguyen has satisfied many of the largest companies operating in Vietnam.`,
    processEyebrow: "Process",
    processTitle: "Six steps from idea to delivery",
    step: (n: number) => `Step ${n}`,
    legalEyebrow: "Legal",
    legalLead: (address: string) => `The company is registered at ${address}.`,
    legalCta: "Get in touch",
    certificateAlt: "Phan Nguyen business registration certificate",
  },

  products: {
    metaTitle: "Products",
    metaDescription:
      "Every bag, backpack, canvas tote, t-shirt, khaki cap and corporate gift designed and manufactured by Phan Nguyen. Custom logo printing available.",
    eyebrow: (n: number) => `${n} product designs`,
    title: "Products",
    lead: "Bags, backpacks, canvas totes, t-shirts and caps — every product can be logo-printed and customised in material and size to your requirements.",
    categories: "Categories",
    all: "All",
    allProducts: "All products",
    searchLabel: "Search products",
    searchPlaceholder: "Search product names…",
    matching: (q: string) => ` matching “${q}”`,
    empty: "No matching products found. Please try a different keyword.",
    loadMore: (n: number) => `Load more (${n})`,
  },

  product: {
    notFound: "Product not found",
    metaDescription: (name: string, category: string, phone: string) =>
      `${name} — ${category} manufactured by Phan Nguyen. Custom logo printing, materials and sizes to your specification. Call ${phone} for a quotation.`,
    schemaDescription: (name: string, category: string) =>
      `${name} — ${category} manufactured by Phan Nguyen.`,
    quoteHint: "Price depends on quantity — call us for a fast quotation",
    chatZalo: "Chat on Zalo",
    attributes: {
      "Mã sản phẩm": "Product code",
      Giá: "Price",
    } as Record<string, string>,
    promises: ["Custom logo printing", "Sample made before production", "Delivery on schedule"],
    quoteEyebrow: "Quotation",
    quoteTitleTop: "Request a quote for",
    quoteLead:
      "Tell us the quantity and printing requirements and we will send a quotation with sample photos within 24 working hours.",
    quoteSubject: (name: string) => `Quotation: ${name}`,
    relatedEyebrow: "Same category",
    relatedTitle: "Related products",
    relatedCta: (category: string) => `View ${category}`,
  },

  news: {
    metaTitle: "News",
    metaDescription:
      "News and updates from Phan Nguyen: Canton Fair activity, corporate gift trends and new technology in the industry.",
    eyebrow: "Blogs",
    title: "News",
    lead: "What Phan Nguyen is doing, and the updates worth knowing from the corporate gift market.",
    empty: "No articles yet.",
    latest: "Latest article",
    notFound: "Article not found",
    fallbackDescription: (title: string, brand: string) => `${title} — news from ${brand}.`,
    otherArticles: "Other articles",
    sidebarEyebrow: "Corporate gifts",
    sidebarLeadStart: "Browse ",
    sidebarLeadLink: "our full product range",
    sidebarLeadEnd: (phone: string) => ` or call ${phone} for a quotation.`,
  },

  promotions: {
    metaTitle: "Promotions",
    metaDescription:
      "Corporate gift products currently discounted at Phan Nguyen: latex travel neck pillows, travel bags, cosmetic bags and phone stands.",
    eyebrow: (n: number) => `${n} discounted products`,
    title: "Promotions",
    lead: "In-stock gift designs at good prices for single items and small orders. For large quantities, please contact us for a dedicated quotation.",
    empty: "There are no active promotions at the moment.",
    bulkTitle: "Bulk orders get their own pricing",
    bulkLead:
      "Every product can be logo-printed and customised to your specification. Send us your expected quantity and Phan Nguyen will quote to your budget.",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription: (address: string, phone: string, email: string) =>
      `Contact Phan Nguyen — ${address}. Hotline ${phone}, email ${email}.`,
    eyebrow: "Contact",
    title: "Request a quotation",
    lead: "Tell us the product, the quantity and when you need it — Phan Nguyen replies within 24 working hours.",
    infoEyebrow: "Details",
    hours: "Opening hours",
    hoursValue: "Monday – Saturday, 08:00 – 17:30",
    mapTitle: "Map to the Phan Nguyen office",
    formEyebrow: "Quotation",
    formTitle: "Fill in your details and we will get back to you",
  },

  form: {
    fullname: "Full name",
    phone: "Phone number",
    email: "Email",
    company: "Company",
    country: "Country",
    countryPlaceholder: "Select your country",
    productInterest: "Product of interest",
    productInterestPlaceholder: "Select a product category",
    productInterestOther: "Other",
    quantity: "Quantity required",
    quantityPlaceholder: "500",
    optional: "(optional)",
    content: "Your request",
    contentPlaceholder: "Logo printing requirements, materials, delivery date…",
    submit: "Send quotation request",
    sending: "Sending…",
    error: "Could not send. Please call our hotline or try again later.",
    thankYouTitle: "Thank you",
    thankYouBody:
      "Your quote request has been received. The Phan Nguyen team will get back to you within 24 working hours.",
    thankYouProductLabel: "Product of interest:",
    attachmentHint: (email: string) =>
      `You may send artwork or logos to ${email} after submission.`,
    submitAnother: "Submit another request",
  },

  notFound: {
    eyebrow: "Error 404",
    title: "Page not found",
    lead: "The page you are looking for may have moved or no longer exists. You can return to the homepage or browse all Phan Nguyen products.",
    home: "Back to homepage",
    products: "Browse products",
    help: "Need help? Call ",
  },

  meta: {
    titleDefault: "Phan Nguyen | Bags, backpacks, t-shirts & corporate gift manufacturing",
    titleTemplate: "%s | Phan Nguyen",
    description:
      "Phan Nguyen — 10+ years designing and manufacturing bags, backpacks, t-shirts, caps and corporate gifts in Ho Chi Minh City. Custom logo printing, delivered on schedule.",
    keywords: [
      "corporate gifts Vietnam",
      "bag manufacturer Vietnam",
      "custom logo canvas tote",
      "promotional backpacks",
      "uniform t-shirts",
      "custom printed caps",
      "Phan Nguyen",
    ],
    ogTitle: "Phan Nguyen | Leading the corporate gift trend",
    ogDescription:
      "Design and manufacture of bags, backpacks, t-shirts, caps and corporate gifts. Partner to L'Oréal, P&G, Shiseido and Vietnam Airlines.",
    twitterDescription:
      "Design and manufacture of bags, backpacks, t-shirts, caps and corporate gifts in Ho Chi Minh City.",
  },
}

export type Dictionary = typeof vi

const dictionaries: Record<Locale, Dictionary> = { vi, en }

export function dict(locale: Locale): Dictionary {
  return dictionaries[locale]
}
