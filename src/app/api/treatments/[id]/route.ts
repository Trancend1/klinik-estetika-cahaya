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
    "SELECT id FROM treatments WHERE id = $1",
    [params.id]
  );
  if (!existing[0]) {
    return NextResponse.json({ error: "Treatment tidak ditemukan" }, { status: 404 });
  }

  const body = await request.json();
  const { tanggal, jenis_treatment, catatan_dokter, produk_diresepkan } = body;

  if (!tanggal) {
    return NextResponse.json({ error: "Tanggal treatment wajib diisi" }, { status: 400 });
  }
  if (!jenis_treatment?.trim()) {
    return NextResponse.json({ error: "Jenis treatment wajib diisi" }, { status: 400 });
  }

  const result = await sql.query(
    `UPDATE treatments SET
      tanggal = $1, jenis_treatment = $2,
      catatan_dokter = $3, produk_diresepkan = $4
     WHERE id = $5 RETURNING *`,
    [
      tanggal,
      jenis_treatment.trim(),
      catatan_dokter?.trim() || null,
      produk_diresepkan?.trim() || null,
      params.id,
    ]
  );

  return NextResponse.json({ data: result[0] });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await sql.query(
    "SELECT id FROM treatments WHERE id = $1",
    [params.id]
  );
  if (!existing[0]) {
    return NextResponse.json({ error: "Treatment tidak ditemukan" }, { status: 404 });
  }

  await sql.query("DELETE FROM treatments WHERE id = $1", [params.id]);

  return NextResponse.json({ message: "Treatment berhasil dihapus" });
}
