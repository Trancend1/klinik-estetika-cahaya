import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { PatientForm } from "@/components/crm/PatientForm";
import type { JenisKulit } from "@/types/database";

export default async function PasienEditPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const result = await sql.query(
    "SELECT * FROM patients WHERE id = $1",
    [params.id]
  );

  if (!result[0]) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Pasien tidak ditemukan</p>
        <a href="/pasien" className="text-sage-700 hover:underline text-sm mt-2 inline-block">
          Kembali ke daftar pasien
        </a>
      </div>
    );
  }

  const patient = result[0] as {
    id: string;
    nama: string;
    nomor_wa: string;
    tanggal_lahir: string | null;
    jenis_kulit: JenisKulit | null;
    alergi: string | null;
    catatan_umum: string | null;
  };

  return (
    <PatientForm
      patientId={params.id}
      initialData={{
        nama: patient.nama,
        nomor_wa: patient.nomor_wa,
        tanggal_lahir: patient.tanggal_lahir
          ? new Date(patient.tanggal_lahir).toISOString().split("T")[0]
          : "",
        jenis_kulit: patient.jenis_kulit || "",
        alergi: patient.alergi || "",
        catatan_umum: patient.catatan_umum || "",
      }}
    />
  );
}
