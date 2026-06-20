import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { isValidPhone } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const offset = (page - 1) * limit;

  const validStatuses = ["kunjungan_pertama", "kontrol_dijadwalkan", "perlu_diingatkan", "aktif", "tidak_aktif"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Status filter tidak valid" }, { status: 400 });
  }

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (search) {
    conditions.push(`(p.nama ILIKE $${params.length + 1} OR p.nomor_wa ILIKE $${params.length + 1})`);
    params.push(`%${search}%`);
  }

  if (status) {
    conditions.push(`p.status_followup = $${params.length + 1}::status_followup`);
    params.push(status);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countResult = await sql.query(
    `SELECT COUNT(*)::int as total FROM patients p ${where}`,
    params
  );
  const total = countResult[0]?.total ?? 0;

  const patients = await sql.query(
    `SELECT
      p.id, p.nama, p.nomor_wa, p.tanggal_lahir,
      p.jenis_kulit, p.alergi, p.status_followup,
      p.tanggal_pengingat, p.catatan_umum,
      p.created_at, p.updated_at,
      (SELECT t.jenis_treatment FROM treatments t WHERE t.patient_id = p.id ORDER BY t.tanggal DESC LIMIT 1) as treatment_terakhir
    FROM patients p
    ${where}
    ORDER BY p.updated_at DESC
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  return NextResponse.json({
    data: patients,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { nama, nomor_wa, tanggal_lahir, jenis_kulit, alergi, catatan_umum } = body;

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
    `INSERT INTO patients (nama, nomor_wa, tanggal_lahir, jenis_kulit, alergi, catatan_umum)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      nama.trim(),
      nomor_wa.trim(),
      tanggal_lahir || null,
      jenis_kulit || null,
      alergi || null,
      catatan_umum || null,
    ]
  );

  return NextResponse.json({ data: result[0] }, { status: 201 });
}
