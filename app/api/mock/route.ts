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

export async function PATCH(req: Request) {
  try {
    const { id, jsonData, settings } = await req.json();
    const client = await clientPromise;
    const db = client.db("mockapi-studio");

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID for update" },
        { status: 400 },
      );
    }

    const parsedData = JSON.parse(jsonData);

    const result = await db.collection("ghost").updateOne(
      { slug: id },
      {
        $set: {
          data: parsedData,
          config: settings,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Mock not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON or server error" },
      { status: 500 },
    );
  }
}
