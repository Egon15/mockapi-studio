import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import clientPromise from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    const { payloadData, settings } = await req.json();
    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    let finalData = payloadData;

    if (settings.contentType.includes("json")) {
      try {
        finalData =
          payloadData && typeof payloadData === "string"
            ? JSON.parse(payloadData)
            : payloadData;
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid JSON format in payload" },
          { status: 400 },
        );
      }
    }

    const id = nanoid(8);
    await db.collection("ghost").insertOne({
      slug: id,
      data: finalData,
      config: settings,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const url = `${protocol}://${host}/api/mock/${id}`;

    return NextResponse.json({ id, url });
  } catch (error) {
    console.log("POST ROUTE ERROR: ", error);
    return NextResponse.json(
      { error: "Invalid data format for selected Content-Type" },
      { status: 400 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, payloadData, settings } = await req.json();
    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    // Consistent logic: Parse only if it's supposed to be JSON
    let finalData;
    if (settings.contentType.includes("json")) {
      finalData =
        typeof payloadData === "string" ? JSON.parse(payloadData) : payloadData;
    } else {
      finalData = payloadData;
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
      return NextResponse.json(
        { error: "Endpoint not found" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Updated successfully",
      id,
      url: `${req.headers.get("origin")}/api/mock/${id}`,
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }
}
