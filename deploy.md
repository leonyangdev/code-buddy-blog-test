构建成功！

⏺ Neon + Prisma 集成完成。以下是总结：

  已完成
  
  ┌─────────────────────────────────────────────────────────────┬──────┐
  │                            组件                             │ 状态 │
  ├─────────────────────────────────────────────────────────────┼──────┤
  │ Prisma Schema（Post/Tag/PostTag/Subscriber/ContactMessage） │ done │
  ├─────────────────────────────────────────────────────────────┼──────┤
  │ 数据库数据层（带降级到硬编码数据）                          │ done │
  ├─────────────────────────────────────────────────────────────┼──────┤
  │ 联系表单 → 发邮件 + 存数据库                                │ done │
  ├─────────────────────────────────────────────────────────────┼──────┤
  │ 订阅 → 发欢迎邮件 + 通知你 + 存数据库                       │ done │
  ├─────────────────────────────────────────────────────────────┼──────┤
  │ 构建验证通过                                                │ done │
  └─────────────────────────────────────────────────────────────┴──────┘

  你需要做的

  1. 创建 Neon 数据库（免费）

  1. 访问 https://console.neon.tech，用 GitHub 登录
  2. 创建项目，复制连接字符串（格式：postgresql://xxx@ep-xxx.neon.tech/dbname?sslmode=require）
  3. 填入 .env 的 DATABASE_URL

  2. 创建 Resend 账号（免费）

  1. 访问 https://resend.com，用 GitHub 登录
  2. 创建 API Key，填入 .env 的 RESEND_API_KEY
  3. 在 Vercel 的 Environment Variables 中设置同样的值

  3. 初始化数据库

  npx prisma migrate dev --name init
  npx prisma db seed

  4. 部署到 Vercel

  在 Vercel 项目设置中添加 Environment Variables：
  - DATABASE_URL = 你的 Neon 连接字符串
  - RESEND_API_KEY = 你的 Resend API Key
  - CONTACT_EMAIL = 你的邮箱
  - NEXT_PUBLIC_SITE_URL = Vercel 提供的 URL