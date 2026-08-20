import Image from "next/image"
import type { LArticle } from "@/lib/content"
import { dict } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { media } from "@/lib/utils"

/**
 * Thân bài viết. Nội dung gốc từ CMS cũ được giữ nguyên dạng HTML;
 * nếu bài chỉ có video (một số bài trên site gốc) thì render player,
 * còn khi không có nội dung nào thì hiện ghi chú thay vì để trống.
 */
export default function ArticleBody({
  article,
  locale,
}: {
  article: LArticle
  locale: Locale
}) {
  const t = dict(locale)
  const hasHtml = article.contentHtml.replace(/<[^>]*>|\s|&nbsp;/g, "").length > 0
  const videos = article.videos.filter(Boolean)
  const images = article.images.filter(Boolean)

  if (videos.length) {
    return (
      <div className="flex flex-col gap-8">
        {videos.map((v) => (
          <video
            key={v}
            controls
            preload="metadata"
            className="w-full border border-line bg-black"
            poster={images[0] ? media(images[0]) : undefined}
          >
            <source src={media(v)} type="video/mp4" />
            {t.common.videoUnsupported}
          </video>
        ))}
      </div>
    )
  }

  if (hasHtml) {
    return <div className="prose-brand" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
  }

  if (images.length) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {images.map((img) => (
          <div
            key={img}
            className="relative aspect-[4/3] overflow-hidden border border-line bg-shell"
          >
            <Image
              src={media(img)}
              alt={article.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="border border-dashed border-line p-8">
      <p className="text-sm leading-relaxed text-ink-soft">{t.common.contentComing}</p>
    </div>
  )
}
