import { NextRequest, NextResponse } from "next/server";

const recent = new Map<string, number>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const last = recent.get(ip) ?? 0;
  if (now - last < 3000) return true;
  recent.set(ip, now);
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: { email?: string; consent?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim() ?? "";
  if (!email || !email.includes("@") || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (!body.consent) {
    return NextResponse.json(
      { ok: false, error: "Consent is required." },
      { status: 400 },
    );
  }

  const provider = process.env.NEWSLETTER_PROVIDER ?? "mock";

  if (provider === "mock") {
    return NextResponse.json({ ok: true, provider: "mock" });
  }

  const apiUrl = process.env.NEWSLETTER_API_URL;
  const apiKey = process.env.NEWSLETTER_API_KEY;
  if (!apiUrl || !apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Newsletter provider is configured but API credentials are missing.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        listId: process.env.NEWSLETTER_LIST_ID,
        consent: true,
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Newsletter provider rejected the signup." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, provider });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach newsletter provider." },
      { status: 502 },
    );
  }
}
