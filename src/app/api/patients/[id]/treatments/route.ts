import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const treatments = await sql.query(
    `SELECT t.*, u.nama as created_by_nama
     FROM treatments t
     LEFT JOIN users u ON t.created_by = u.id
     WHERE t.patient_id = $1
     ORDER BY t.tanggal DESC, t.created_at DESC`,
    [params.id]
  );

  return NextResponse.json({ data: treatments });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const patientId = params.id;
  const body = await request.json();
  const { tanggal, jenis_treatment, catatan_dokter, produk_diresepkan } = body;

  if (!tanggal) {
    return NextResponse.json({ error: "Tanggal treatment wajib diisi" }, { status: 400 });
  }
  if (!jenis_treatment?.trim()) {
    return NextResponse.json({ error: "Jenis treatment wajib diisi" }, { status: 400 });
  }

  const existing = await sql.query(
    "SELECT id FROM patients WHERE id = $1",
    [patientId]
  );
  if (!existing[0]) {
    return NextResponse.json({ error: "Pasien tidak ditemukan" }, { status: 404 });
  }

  const result = await sql.query(
    `INSERT INTO treatments (patient_id, tanggal, jenis_treatment, catatan_dokter, produk_diresepkan, created_by)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      patientId,
      tanggal,
      jenis_treatment.trim(),
      catatan_dokter?.trim() || null,
      produk_diresepkan?.trim() || null,
      session.user.id,
    ]
  );

  return NextResponse.json({ data: result[0] }, { status: 201 });
}
