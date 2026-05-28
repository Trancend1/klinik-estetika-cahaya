import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Handler booking dari website publik — akan diimplementasi di Phase 5
  const body = await request.json();
  return NextResponse.json(
    { message: "Booking endpoint — coming in Phase 5", received: body },
    { status: 200 }
  );
}
