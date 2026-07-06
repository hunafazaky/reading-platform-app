import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await apiFetch("users/signin", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan pada jembatan API";

    return NextResponse.json({ message }, { status: 400 });
  }
}
