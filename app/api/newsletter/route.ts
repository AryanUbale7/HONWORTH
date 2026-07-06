import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
  _honey: z.string().max(0),
});

// Basic In-Memory Rate Limiter (IP -> { count, timestamp })
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 5; // max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse Payload
    const body = await req.json();

    // 3. Validate Schema
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email provided." },
        { status: 400 }
      );
    }

    // 4. Honeypot check
    if (result.data._honey.length > 0) {
      // Silently accept to fool bots
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 5. Stub: Send Email / Add to list via Provider
    const API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
    if (!API_KEY) {
      console.warn("EMAIL_PROVIDER_API_KEY is not set. Simulating newsletter subscription.");
    }
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
