import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const treatments = await sql.query(
    `SELECT
      t.tanggal, t.jenis_treatment, t.catatan_dokter,
      t.produk_diresepkan, p.nama as pasien_nama, p.nomor_wa as pasien_nomor_wa,
      u.nama as ditangani_oleh, t.created_at
    FROM treatments t
    LEFT JOIN patients p ON t.patient_id = p.id
    LEFT JOIN users u ON t.created_by = u.id
    ORDER BY t.tanggal DESC`
  );

  return NextResponse.json({ data: treatments });
}
