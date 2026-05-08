/**
 * JSON-LD 结构化数据组件
 * 用于 SEO 优化，帮助搜索引擎更好地理解页面内容
 */

interface JsonLdProps {
  /** 结构化数据对象 */
  data: Record<string, any>
}

/**
 * JSON-LD 组件
 * 将结构化数据添加到页面中
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * 文章结构化数据
 */
export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  publisherName,
  publisherLogo,
}: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName: string
  publisherName: string
  publisherLogo?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: publisherLogo
        ? {
            "@type": "ImageObject",
            url: publisherLogo,
          }
        : undefined,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <JsonLd data={data} />
}

/**
 * 博客结构化数据
 */
export function BlogJsonLd({
  name,
  description,
  url,
  logo,
}: {
  name: string
  description: string
  url: string
  logo?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: name,
    description: description,
    url: url,
    logo: logo
      ? {
          "@type": "ImageObject",
          url: logo,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: name,
    },
  }

  return <JsonLd data={data} />
}

/**
 * 个人资料结构化数据
 */
export function PersonJsonLd({
  name,
  url,
  image,
  jobTitle,
  description,
  sameAs,
}: {
  name: string
  url: string
  image?: string
  jobTitle?: string
  description?: string
  sameAs?: string[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    url: url,
    image: image,
    jobTitle: jobTitle,
    description: description,
    sameAs: sameAs,
  }

  return <JsonLd data={data} />
}

/**
 * 网站结构化数据
 */
export function WebsiteJsonLd({
  name,
  url,
  description,
  potentialAction,
}: {
  name: string
  url: string
  description: string
  potentialAction?: {
    "@type": "SearchAction"
    target: string
    "query-input": string
  }
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    url: url,
    description: description,
    potentialAction: potentialAction,
  }

  return <JsonLd data={data} />
}

/**
 * 面包屑导航结构化数据
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{
    name: string
    url: string
  }>
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}