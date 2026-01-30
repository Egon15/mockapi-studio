import clientPromise from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });

    // Deployment specific: x-vercel-id only exists on Vercel
    // const region = req.headers.get("x-vercel-id")?.split(":")[0] || "Global";

    return NextResponse.json({
      status: "online",
      env: "development", // We'll hardcode this for now
      region: "localhost",
    });
  } catch (e) {
    return NextResponse.json(
      {
        status: "offline",
        message: "Db connection failed",
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 },
    );
  }
}
