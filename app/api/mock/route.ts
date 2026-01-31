import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import clientPromise from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    const { jsonData, settings } = await req.json();
    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    // Only parse if the content type is JSON
    let finalData;
    if (settings.contentType.includes("json")) {
      finalData =
        typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    } else {
      finalData = jsonData; // Store as raw string for Text/XML/CSV
    }

    const id = nanoid(8);
    await db.collection("ghost").insertOne({
      slug: id,
      data: finalData,
      config: settings,
      createdAt: new Date(),
    });

    const url = `${req.headers.get("origin")}/api/mock/${id}`;
    return NextResponse.json({ id, url });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data format for selected Content-Type" },
      { status: 400 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, jsonData, settings } = await req.json();
    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    // Consistent logic: Parse only if it's supposed to be JSON
    let finalData;
    if (settings.contentType.includes("json")) {
      finalData =
        typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
    } else {
      finalData = jsonData;
    }

    const result = await db.collection("ghost").updateOne(
      { slug: id },
      {
        $set: {
          data: finalData,
          config: settings,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }
}
