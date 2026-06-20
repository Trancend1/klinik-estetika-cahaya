import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().split("T")[0];

  const [totalPasien, perluDihubungi, bookingBaru, treatmentMingguIni] =
    await Promise.all([
      sql.query("SELECT COUNT(*)::int as count FROM patients"),
      sql.query(
        "SELECT COUNT(*)::int as count FROM patients WHERE tanggal_pengingat <= $1 AND tanggal_pengingat IS NOT NULL",
        [today]
      ),
      sql.query(
        "SELECT COUNT(*)::int as count FROM booking_requests WHERE status = 'baru'"
      ),
      sql.query(
        `SELECT COUNT(*)::int as count FROM treatments
         WHERE tanggal >= date_trunc('week', CURRENT_DATE)`
      ),
    ]);

  return NextResponse.json({
    total_pasien: totalPasien[0]?.count ?? 0,
    perlu_dihubungi: perluDihubungi[0]?.count ?? 0,
    booking_baru: bookingBaru[0]?.count ?? 0,
    treatment_minggu_ini: treatmentMingguIni[0]?.count ?? 0,
  });
}
