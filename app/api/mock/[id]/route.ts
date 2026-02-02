import clientPromise from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Mocks change frequently, and we need fresh data every time.
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    const { id } = await params;

    const ghost = await db.collection("ghost").findOne({ slug: id });

    if (!ghost) {
      return NextResponse.json(
        { error: "Mock API Endpoint not found" },
        { status: 404 },
      );
    }

    const {
      delayMs = 0,
      statusCode = 200,
      headers = {},
      contentType = "application/json",
    } = ghost.config || {};

    //  Handling the custom delay as requested by the user
    if (delayMs > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(delayMs, 10000)),
      );
    }

    //  If it's JSON, stringify it. If it's a raw string (for text/xml/etc), send as is.
    const body = contentType.includes("json")
      ? JSON.stringify(ghost.data)
      : ghost.data;

    return new NextResponse(body, {
      status: statusCode,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*", // CORS Support: Essential for Mock APIs to be callable from other sites
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        ...headers,
      },
    });
  } catch (error) {
    console.error("Mock API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
