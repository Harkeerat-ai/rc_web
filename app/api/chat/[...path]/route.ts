import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function backendUrl(): string | null {
  const url = process.env.CHAT_API_URL?.trim();
  return url ? url.replace(/\/+$/, "") : null;
}

function brand(): string | null {
  const b = process.env.CHAT_BRAND?.trim();
  return b ? b : null;
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

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const base = backendUrl();
  const slug = brand();
  if (!base || !slug) return notConfigured();

  const subPath = params.path.join("/");
  const upstream = new URL(
    `${base}/api/${slug}/${subPath}${request.nextUrl.search}`
  );

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
  const base = backendUrl();
  const slug = brand();
  if (!base || !slug) return notConfigured();

  const subPath = params.path.join("/");
  const upstream = new URL(`${base}/api/${slug}/${subPath}`);

  const body = await request.text();

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