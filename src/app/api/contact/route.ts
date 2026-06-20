import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, getClientIp } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`contact:${ip}`, 5, 60000);
  if (!allowed) {
    return NextResponse.json({ error: "Terlalu banyak permintaan. Silakan coba lagi nanti." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { nama, email, pesan } = body;

    if (!nama?.trim()) {
      return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Format email tidak valid" }, { status: 400 });
    }
    if (!pesan?.trim()) {
      return NextResponse.json({ error: "Pesan wajib diisi" }, { status: 400 });
    }

    await sql.query(
      "INSERT INTO contact_messages (nama, email, pesan) VALUES ($1, $2, $3)",
      [nama.trim(), email.trim(), pesan.trim()]
    );

    return NextResponse.json({
      message: "Terima kasih, pesan Anda telah diterima. Kami akan menghubungi Anda segera.",
    });
  } catch (e) {
    console.error("Gagal menyimpan pesan kontak:", e);
    return NextResponse.json({ error: "Gagal memproses pesan" }, { status: 400 });
  }
}
