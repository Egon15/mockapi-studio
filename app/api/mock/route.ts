import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const body = await req.json();
  const id = nanoid(8);

  // persist jsonData + settings in DB here
  // omitted: insertOne({ id, jsonData: body.jsonData, settings: body.settings })

  const url = `${req.headers.get("origin")}/api/mock/${id}`;
  return NextResponse.json({ id, url });
}
