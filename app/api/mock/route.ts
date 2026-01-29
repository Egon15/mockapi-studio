import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import clientPromise from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedPayload =
      typeof body.jsonData === "string"
        ? JSON.parse(body.jsonData)
        : body.jsonData;

    const id = nanoid(8);

    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    await db.collection("ghost").insertOne({
      slug: id,
      data: parsedPayload,
      config: body.settings,
      createdAt: new Date(),
    });

    console.log("SAVED TO DB:", {
      id,
      data: parsedPayload,
      config: body.settings,
    });

    const url = `${req.headers.get("origin")}/api/mock/${id}`;

    return NextResponse.json({ id, url });
  } catch (error) {
    console.error("Error creating mock API:", error);
    return NextResponse.json(
      { error: "Failed to create mock API" },
      { status: 500 },
    );
  }
}
