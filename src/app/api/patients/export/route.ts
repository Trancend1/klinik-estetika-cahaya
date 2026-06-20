import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const patients = await sql.query(
    `SELECT
      p.nama, p.nomor_wa, p.tanggal_lahir,
      p.jenis_kulit, p.alergi, p.status_followup,
      p.tanggal_pengingat, p.catatan_umum,
      p.created_at, p.updated_at,
      (SELECT COUNT(*)::int FROM treatments t WHERE t.patient_id = p.id) as total_treatment
    FROM patients p
    ORDER BY p.created_at DESC`
  );

  return NextResponse.json({ data: patients });
}
