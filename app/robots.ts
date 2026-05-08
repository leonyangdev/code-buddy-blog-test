import { MetadataRoute } from "next"

/**
 * 生成 robots.txt
 * 控制搜索引擎爬虫的访问权限
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://your-domain.com/sitemap.xml",
  }
}