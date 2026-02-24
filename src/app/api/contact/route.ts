import { NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, project } = body;

  if (!name || !email || !project) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const text = `New inquiry!\n\nName: ${name}\nEmail: ${email}\nProject: ${project}`;

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Message sent successfully" });
}
