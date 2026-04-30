import { NextResponse } from "next/server";
import { fetchRooms } from "@/lib/data";

export const revalidate = 60;

export async function GET() {
  try {
    const rooms = await fetchRooms();
    return NextResponse.json(
      { rooms, syncedAt: Date.now() },
      {
        headers: {
          "cache-control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message, rooms: [] },
      { status: 500 },
    );
  }
}
