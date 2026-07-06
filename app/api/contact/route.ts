import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9+\-\s()]{10,15}$/),
  message: z.string().min(10),
  consent: z.literal(true),
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
    // reset window
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
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data provided." },
        { status: 400 }
      );
    }

    // 4. Honeypot check (technically covered by Zod .max(0), but explicit here for logic flow)
    if (result.data._honey.length > 0) {
      // Silently accept to fool bots
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 5. Stub: Send Email via Provider
    const API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
    if (!API_KEY) {
      console.warn("EMAIL_PROVIDER_API_KEY is not set. Simulating email sending.");
    }
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, you would throw an error if the email provider fails:
    // throw new Error("Email provider failed to send");

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your message." },
      { status: 500 }
    );
  }
}
