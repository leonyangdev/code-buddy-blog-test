import { NextResponse } from "next/server"

interface NewsletterPayload {
  email?: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body: NewsletterPayload = await request.json()
    const { email } = body

    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, error: "请输入邮箱地址" },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "请输入有效的邮箱地址" },
        { status: 400 }
      )
    }

    // TODO: Integrate with newsletter service (Mailchimp, Buttondown, Resend, etc.)
    // For now, log the subscription and return success
    console.log("[Newsletter Subscription]", {
      email: email.trim(),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "订阅成功！感谢你的关注。",
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "请求处理失败，请稍后重试" },
      { status: 500 }
    )
  }
}
