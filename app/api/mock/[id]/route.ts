import clientPromise from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const client = await clientPromise;
    const db = client.db("mockapi-studio");
    const {id} = await params;

    const ghost = await db.collection("ghost").findOne({ slug: id });

    if (!ghost) {
      return new NextResponse(
        JSON.stringify({ error: "Mock API Endpoint not found" }),
        {
          status: 404,
        },
      );
    }

    const delay = ghost.config.delayMs || 0;
    const statusCode = ghost.config.statusCode || 200;
    const headers = ghost.config.headers || {};

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return new NextResponse(JSON.stringify(ghost.data), {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch mock API data" }),
      {
        status: 500,
      },
    );
  }
}
