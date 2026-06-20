import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";

  let query = `SELECT * FROM booking_requests`;
  const params: string[] = [];

  if (status) {
    query += ` WHERE status = $1::status_booking`;
    params.push(status);
  }

  query += ` ORDER BY created_at DESC`;

  const bookings = await sql.query(query, params);

  return NextResponse.json({ data: bookings });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nama, nomor_wa, tanggal, keluhan } = body;

  if (!nama?.trim()) {
    return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  }
  if (!nomor_wa?.trim()) {
    return NextResponse.json({ error: "Nomor WhatsApp wajib diisi" }, { status: 400 });
  }
  if (!tanggal) {
    return NextResponse.json({ error: "Tanggal preferensi wajib diisi" }, { status: 400 });
  }

  const tanggalDate = new Date(tanggal);
  if (isNaN(tanggalDate.getTime())) {
    return NextResponse.json({ error: "Format tanggal tidak valid" }, { status: 400 });
  }

  await sql.query(
    `INSERT INTO booking_requests (nama, nomor_wa, tanggal_preferensi, keluhan)
     VALUES ($1, $2, $3, $4)`,
    [nama.trim(), nomor_wa.trim(), tanggal, keluhan?.trim() || null]
  );

  return NextResponse.json(
    { message: "Permintaan booking berhasil dikirim" },
    { status: 201 }
  );
}
