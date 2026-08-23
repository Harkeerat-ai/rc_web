import { NextRequest } from "next/server";
import { consumeRate, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;

type EndpointClass = "health" | "suggestions" | "feedback" | "stream";

const RATE_LIMITS: Record<EndpointClass, number> = {
  health: 20,
  suggestions: 30,
  feedback: 10,
  stream: 10,
};

interface AllowedRoute {
  cls: EndpointClass;
}

function matchRoute(
  method: string,
  segments: string[]
): AllowedRoute | null {
  if (method === "GET" && segments.length === 1 && segments[0] === "health") {
    return { cls: "health" };
  }
  if (
    method === "GET" &&
    segments.length === 2 &&
    segments[0] === "suggestions" &&
    /^\d+$/.test(segments[1])
  ) {
    return { cls: "suggestions" };
  }
  if (
    method === "POST" &&
    segments.length === 2 &&
    segments[0] === "chat" &&
    segments[1] === "stream"
  ) {
    return { cls: "stream" };
  }
  if (
    method === "POST" &&
    segments.length === 1 &&
    segments[0] === "feedback"
  ) {
    return { cls: "feedback" };
  }
  return null;
}

function backendUrl(): string | null {
  const url = process.env.CHAT_API_URL?.trim();
  return url ? url.replace(/\/+$/, "") : null;
}

function brand(): string | null {
  const b = process.env.CHAT_BRAND?.trim();
  return b ? b : null;
}

function notFound() {
  return Response.json({ error: "not_found" }, { status: 404 });
}

function notConfigured() {
  return Response.json(
    { error: "not_configured", detail: "Chat backend is not configured." },
    { status: 503 }
  );
}

function backendDown() {
  return Response.json(
    { error: "backend_unreachable", detail: "Chat backend could not be reached." },
    { status: 503 }
  );
}

function rateLimited(retryAfterSeconds: number) {
  return Response.json(
    { error: "rate_limited", detail: "Too many requests. Please slow down." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    }
  );
}

function payloadTooLarge() {
  return Response.json(
    { error: "payload_too_large", detail: "Request body exceeds 32 KB." },
    { status: 413 }
  );
}

function enforceGuards(
  request: NextRequest,
  params: { path: string[] }
): { route: AllowedRoute } | { response: Response } {
  const method = request.method.toUpperCase();
  const route = matchRoute(method, params.path);
  if (!route) return { response: notFound() };

  const ip = getClientIp(request);
  const result = consumeRate(`${ip}:${route.cls}`, RATE_LIMITS[route.cls]);
  if (!result.allowed) return { response: rateLimited(result.retryAfterSeconds) };

  return { route };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const guarded = enforceGuards(request, params);
  if ("response" in guarded) return guarded.response;

  const base = backendUrl();
  const slug = brand();
  if (!base || !slug) return notConfigured();

  const subPath = params.path.join("/");
  const upstream = new URL(`${base}/api/${slug}/${subPath}`);

  let res: Response;
  try {
    res = await fetch(upstream.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });
  } catch {
    return backendDown();
  }

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const guarded = enforceGuards(request, params);
  if ("response" in guarded) return guarded.response;

  const base = backendUrl();
  const slug = brand();
  if (!base || !slug) return notConfigured();

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return payloadTooLarge();
  }

  let body = "";
  try {
    body = await request.text();
  } catch {
    return payloadTooLarge();
  }
  if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) {
    return payloadTooLarge();
  }

  const subPath = params.path.join("/");
  const upstream = new URL(`${base}/api/${slug}/${subPath}`);

  let res: Response;
  try {
    res = await fetch(upstream.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
    });
  } catch {
    return backendDown();
  }

  const contentType = res.headers.get("Content-Type") ?? "";

  if (contentType.includes("text/event-stream")) {
    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": contentType || "application/json",
    },
  });
}
