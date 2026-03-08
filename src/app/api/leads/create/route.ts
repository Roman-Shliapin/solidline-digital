import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- simple in-memory rate limiting ---------- */
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_MAX) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}
/* ---------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_BUSINESS_TYPES = ["local-service", "online-business", "personal-brand", "small-company"];
const VALID_STYLES = ["modern", "minimal", "bold", "unsure"];

const MAX = { short: 200, medium: 500, long: 1000 } as const;

function trimStr(v: unknown): string {
  return (typeof v === "string" ? v : "").trim();
}
function sanitize(v: unknown): string {
  return trimStr(v).replace(/[<>]/g, "");
}
function cap(str: string, max: number): string {
  return str.slice(0, max);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Empty or invalid body" }, { status: 400 });
    }

    if (trimStr(body.company)) {
      return NextResponse.json({ message: "Lead created", id: "ok" });
    }

    const nameS = cap(sanitize(body.name), MAX.short);
    const emailS = cap(trimStr(body.email), MAX.short);
    const businessNameS = cap(sanitize(body.businessName), MAX.short);
    const locationS = cap(sanitize(body.location), MAX.short);
    const descriptionS = cap(sanitize(body.description), MAX.long);
    const customersS = cap(sanitize(body.customers), MAX.medium);
    const differentiationS = cap(sanitize(body.differentiation), MAX.medium);

    if (!nameS || !emailS || !businessNameS || !locationS) {
      return NextResponse.json({ error: "Fill in required step 1 fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(emailS)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { businessType, services, hasLogo, stylePreference, competitors } = body;

    if (typeof businessType !== "string" || !VALID_BUSINESS_TYPES.includes(businessType)) {
      return NextResponse.json({ error: "Invalid business type" }, { status: 400 });
    }

    const servicesArr = Array.isArray(services)
      ? services.map((s) => cap(sanitize(s), MAX.short)).filter(Boolean).slice(0, 20)
      : [];
    if (!descriptionS || servicesArr.length === 0 || !customersS || !differentiationS) {
      return NextResponse.json({ error: "Fill in required step 2 fields" }, { status: 400 });
    }

    const stylePref = typeof stylePreference === "string" && VALID_STYLES.includes(stylePreference) ? stylePreference : "modern";

    await dbConnect();

    const lead = await Lead.create({
      name: nameS,
      email: emailS,
      businessName: businessNameS,
      location: locationS,
      businessType,
      answers: {
        description: descriptionS,
        services: servicesArr,
        customers: customersS,
        differentiation: differentiationS,
        hasLogo: Boolean(hasLogo),
        brandColors: cap(sanitize(body.brandColors), MAX.short) || undefined,
        stylePreference: stylePref,
        competitors: Array.isArray(competitors)
          ? competitors.map((s) => cap(trimStr(s), MAX.short)).filter(Boolean).slice(0, 10)
          : undefined,
        phone: cap(sanitize(body.phone), 20) || undefined,
        instagram: cap(sanitize(body.instagram), 50) || undefined,
        website: cap(trimStr(body.website), 300) || undefined,
        notes: cap(sanitize(body.notes), MAX.long) || undefined,
      },
    });

    const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    if (TELEGRAM_TOKEN && CHAT_ID) {
      const ans = lead.answers as Record<string, unknown> | undefined;
      const svcList = Array.isArray(ans?.services) ? ans.services : [];
      const svcText = svcList.length > 0 ? svcList.map((s) => `• ${s}`).join("\n") : "—";

      const lines = [
        "🚀 New Lead — Get Started",
        "🆔 " + String(lead._id),
        "",
        "👤 " + String(lead.name),
        "🏢 " + String(lead.businessName),
        "📍 " + String(lead.location) + ` (${String(lead.businessType).replace(/-/g, " ")})`,
        "",
        "📧 " + String(lead.email),
        ...(ans?.phone ? ["📱 " + String(ans.phone)] : []),
        ...(ans?.instagram ? ["📷 @" + String(ans.instagram).replace(/^@/, "")] : []),
        "",
        "💼 Services:",
        svcText,
        "",
        "📝 Description:",
        String(ans?.description ?? "—"),
        "",
        "🎯 Target customers:",
        String(ans?.customers ?? "—"),
        "",
        "✨ What makes them different:",
        String(ans?.differentiation ?? "—"),
        ...(ans?.stylePreference ? ["", "🎨 Style: " + String(ans.stylePreference)] : []),
        ...(ans?.hasLogo ? ["🖼 Logo: Yes"] : []),
        ...(ans?.brandColors ? ["🌈 Colors: " + String(ans.brandColors)] : []),
        ...(ans?.website ? ["🌐 " + String(ans.website)] : []),
        ...(ans?.notes ? ["", "📎 Notes: " + String(ans.notes)] : []),
      ];

      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: lines.join("\n") }),
      }).catch((e) => console.error("[telegram]", e));
    }

    return NextResponse.json({ message: "Lead created", id: lead._id });
  } catch (err) {
    console.error("[leads]", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
