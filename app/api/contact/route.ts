import { NextResponse } from "next/server"

interface ContactPayload {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "无效的请求格式" },
        { status: 415 }
      )
    }

    const body: ContactPayload = await request.json()
    const { name, email, subject, message } = body

    // Validation
    const errors: Record<string, string> = {}
    if (!name?.trim()) errors.name = "请输入姓名"
    else if (name.trim().length > 100) errors.name = "姓名不能超过 100 个字符"
    if (!email?.trim()) errors.email = "请输入邮箱"
    else if (!validateEmail(email)) errors.email = "请输入有效的邮箱地址"
    if (!subject?.trim()) errors.subject = "请输入主题"
    else if (subject.trim().length > 200) errors.subject = "主题不能超过 200 个字符"
    if (!message?.trim()) errors.message = "请输入消息内容"
    else if (message.trim().length > 5000) errors.message = "消息内容不能超过 5000 个字符"

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: "表单验证失败", errors },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, log the submission and return success
    console.log("[Contact Form Submission]", {
      name: name!.trim(),
      email: email!.trim(),
      subject: subject!.trim(),
      message: message!.trim(),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "消息已发送，我会尽快回复你！",
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "请求处理失败，请稍后重试" },
      { status: 500 }
    )
  }
}
