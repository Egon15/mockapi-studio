import { NextResponse } from "next/server";

// mocked DB response for template
async function fetchData(id: string) {
  return {
    jsonData: { msg: "example" },
    settings: { delayMs: 0, statusCode: 200, headers: {} },
  };
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const record = await fetchData(params.id);
  if (!record) return new NextResponse("Not Found", { status: 404 });

  const { jsonData, settings } = record;

  if (settings.delayMs) {
    await new Promise((r) => setTimeout(r, settings.delayMs));
  }

  return new NextResponse(JSON.stringify(jsonData), {
    status: settings.statusCode,
    headers: {
      "Content-Type": "application/json",
      ...settings.headers,
    },
  });
}
