import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { isValidPhone } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const patient = await sql.query(
    `SELECT * FROM patients WHERE id = $1`,
    [params.id]
  );

  if (!patient[0]) {
    return NextResponse.json({ error: "Pasien tidak ditemukan" }, { status: 404 });
  }

  const treatments = await sql.query(
    `SELECT t.*, u.nama as created_by_nama
     FROM treatments t
     LEFT JOIN users u ON t.created_by = u.id
     WHERE t.patient_id = $1
     ORDER BY t.tanggal DESC, t.created_at DESC`,
    [params.id]
  );

  return NextResponse.json({ data: patient[0], treatments });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await sql.query(
    "SELECT id FROM patients WHERE id = $1",
    [params.id]
  );
  if (!existing[0]) {
    return NextResponse.json({ error: "Pasien tidak ditemukan" }, { status: 404 });
  }

  const body = await request.json();
  const { nama, nomor_wa, tanggal_lahir, jenis_kulit, alergi, status_followup, catatan_umum, tanggal_pengingat } = body;

  if (!nama) {
    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (status_followup !== undefined) {
      fields.push(`status_followup = $${idx}::status_followup`);
      values.push(status_followup);
      idx++;
    }
    if (tanggal_pengingat !== undefined) {
      fields.push(`tanggal_pengingat = $${idx}`);
      values.push(tanggal_pengingat || null);
      idx++;
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "Tidak ada field yang diupdate" }, { status: 400 });
    }

    values.push(params.id);
    const result = await sql.query(
      `UPDATE patients SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
      values
    );

    return NextResponse.json({ data: result[0] });
  }

  if (!nama?.trim()) {
    return NextResponse.json({ error: "Nama pasien wajib diisi" }, { status: 400 });
  }
  if (!nomor_wa?.trim()) {
    return NextResponse.json({ error: "Nomor WhatsApp wajib diisi" }, { status: 400 });
  }
  if (!isValidPhone(nomor_wa)) {
    return NextResponse.json({ error: "Format nomor WA tidak valid. Gunakan format 62xxxxxxxxxx" }, { status: 400 });
  }

  const result = await sql.query(
    `UPDATE patients SET
      nama = $1, nomor_wa = $2, tanggal_lahir = $3,
      jenis_kulit = $4, alergi = $5,
      status_followup = $6::status_followup, catatan_umum = $7,
      tanggal_pengingat = $8
     WHERE id = $9 RETURNING *`,
    [
      nama.trim(),
      nomor_wa.trim(),
      tanggal_lahir || null,
      jenis_kulit || null,
      alergi || null,
      status_followup || "kunjungan_pertama",
      catatan_umum || null,
      tanggal_pengingat || null,
      params.id,
    ]
  );

  return NextResponse.json({ data: result[0] });
}
