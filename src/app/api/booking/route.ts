import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { isValidPhone, getClientIp } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
  const offset = (page - 1) * limit;

  const validStatuses = ["baru", "dikonfirmasi", "dijadwalkan_ulang", "selesai", "batal"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
  }

  let whereClause = "";
  const params: string[] = [];

  if (status) {
    whereClause = ` WHERE status = $1::status_booking`;
    params.push(status);
  }

  const countResult = await sql.query(
    `SELECT COUNT(*) as count FROM booking_requests${whereClause}`,
    params
  );
  const total = Number(countResult[0]?.count || 0);

  const bookings = await sql.query(
    `SELECT br.*, p.nama as linked_patient_nama FROM booking_requests br LEFT JOIN patients p ON br.linked_patient_id = p.id${whereClause} ORDER BY br.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, String(limit), String(offset)]
  );

  return NextResponse.json({ data: bookings, total, page, limit });
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`booking:${ip}`, 5, 60000);
  if (!allowed) {
    return NextResponse.json({ error: "Terlalu banyak permintaan. Silakan coba lagi nanti." }, { status: 429 });
  }

  const body = await request.json();
  const { nama, nomor_wa, tanggal, keluhan } = body;

  if (!nama?.trim()) {
    return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  }
  if (!nomor_wa?.trim()) {
    return NextResponse.json({ error: "Nomor WhatsApp wajib diisi" }, { status: 400 });
  }
  if (!isValidPhone(nomor_wa)) {
    return NextResponse.json({ error: "Format nomor WA tidak valid. Gunakan format 62xxxxxxxxxx" }, { status: 400 });
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
