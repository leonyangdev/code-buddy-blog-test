import Link from "next/link"
import { Globe, Mail, Rss } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: "/blog", label: "博客" },
    { href: "/projects", label: "项目" },
    { href: "/about", label: "关于" },
    { href: "/contact", label: "联系" },
    { href: "/search", label: "搜索" },
  ]

  const socialLinks = [
    { href: "https://github.com", label: "GitHub" },
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://linkedin.com", label: "LinkedIn" },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-label-14 text-muted-foreground">
              &copy; {currentYear} 个人技术博客
            </span>
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-label-13 text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Globe className="size-4" />
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
            <Link
              href="/rss.xml"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Rss className="size-4" />
              <span className="sr-only">RSS</span>
            </Link>
            <Link
              href="mailto:hello@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <Mail className="size-4" />
              <span className="sr-only">邮箱</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
