import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await sql.query(
    "SELECT id FROM booking_requests WHERE id = $1",
    [params.id]
  );
  if (!existing[0]) {
    return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
  }

  const body = await request.json();
  const { status, tanggal_preferensi } = body;

  const validStatuses = ["baru", "dikonfirmasi", "dijadwalkan_ulang", "selesai", "batal"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
  }

  const updates: string[] = [];
  const values: (string | null)[] = [];

  if (status) {
    updates.push(`status = $${values.length + 1}::status_booking`);
    values.push(status);
  }
  if (tanggal_preferensi) {
    updates.push(`tanggal_preferensi = $${values.length + 1}`);
    values.push(tanggal_preferensi);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "Tidak ada data yang diubah" }, { status: 400 });
  }

  values.push(params.id);
  const result = await sql.query(
    `UPDATE booking_requests SET ${updates.join(", ")} WHERE id = $${values.length} RETURNING *`,
    values
  );

  return NextResponse.json({ data: result[0] });
}

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const booking = await sql.query(
    "SELECT * FROM booking_requests WHERE id = $1",
    [params.id]
  );

  if (!booking[0]) {
    return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
  }

  const b = booking[0] as {
    nama: string;
    nomor_wa: string;
    keluhan: string | null;
    status: string;
  };

  if (b.status === "selesai" || b.status === "batal") {
    return NextResponse.json(
      { error: "Booking dengan status ini tidak bisa dikonversi" },
      { status: 400 }
    );
  }

  const newPatient = await sql.query(
    `INSERT INTO patients (nama, nomor_wa, catatan_umum)
     VALUES ($1, $2, $3) RETURNING *`,
    [b.nama, b.nomor_wa, b.keluhan || null]
  );

  await sql.query(
    `UPDATE booking_requests
     SET status = 'selesai'::status_booking, linked_patient_id = $1
     WHERE id = $2`,
    [newPatient[0].id, params.id]
  );

  return NextResponse.json(
    { data: { patient: newPatient[0], booking_id: params.id } },
    { status: 201 }
  );
}
