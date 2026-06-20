import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, pesan } = body;

    if (!nama?.trim()) {
      return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
    }
    if (!email?.trim()) {
      return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
    }
    if (!pesan?.trim()) {
      return NextResponse.json({ error: "Pesan wajib diisi" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Terima kasih, pesan Anda telah diterima. Kami akan menghubungi Anda segera.",
    });
  } catch {
    return NextResponse.json({ error: "Gagal memproses pesan" }, { status: 400 });
  }
}
