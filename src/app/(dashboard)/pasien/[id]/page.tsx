import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { Pencil, Phone, User, AlertTriangle, MessageCircle, Stethoscope } from "lucide-react";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { FollowUpControl } from "@/components/crm/FollowUpControl";
import { TreatmentSection } from "@/components/crm/TreatmentSection";
import type { JenisKulit } from "@/types/database";

interface PatientData {
  id: string;
  nama: string;
  nomor_wa: string;
  tanggal_lahir: string | null;
  jenis_kulit: JenisKulit | null;
  alergi: string | null;
  status_followup: string;
  tanggal_pengingat: string | null;
  catatan_umum: string | null;
  created_at: string;
  updated_at: string;
}

export default async function PasienDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const patientResult = await sql.query(
    "SELECT * FROM patients WHERE id = $1",
    [params.id]
  );

  if (!patientResult[0]) notFound();

  const patient = patientResult[0] as PatientData;
  const waNumber = patient.nomor_wa.startsWith("0")
    ? "62" + patient.nomor_wa.slice(1)
    : patient.nomor_wa.startsWith("62")
    ? patient.nomor_wa
    : "62" + patient.nomor_wa;
  const waMessage = `Halo ${patient.nama}, dari Klinik Estetika Cahaya...`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <a
          href="/pasien"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Kembali ke daftar pasien"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
          </svg>
        </a>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              {patient.nama}
            </h1>
            <StatusBadge status={patient.status_followup} />
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Terdaftar sejak {new Date(patient.created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-sage-50 hover:text-sage-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WA</span>
          </a>
          <a
            href={`/pasien/${params.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-300 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
              Informasi Pasien
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Nomor WA</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sage-700 hover:underline inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    {patient.nomor_wa}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Tanggal Lahir</p>
                  <p className="text-sm text-gray-900">
                    {patient.tanggal_lahir
                      ? new Date(patient.tanggal_lahir).toLocaleDateString("id-ID")
                      : "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Stethoscope className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Jenis Kulit</p>
                  <p className="text-sm text-gray-900">
                    {patient.jenis_kulit
                      ? ({ normal: "Normal", berminyak: "Berminyak", kombinasi: "Kombinasi", sensitif: "Sensitif", kering: "Kering" } as Record<string, string>)[patient.jenis_kulit] || patient.jenis_kulit
                      : "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Alergi</p>
                  <p className="text-sm text-gray-900">
                    {patient.alergi || "Tidak ada"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <FollowUpControl
            patientId={patient.id}
            initialStatus={patient.status_followup}
            initialReminder={patient.tanggal_pengingat}
            onUpdate={async () => {}}
          />

          {patient.catatan_umum && (
            <div className="bg-white border border-gray-300 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Catatan Umum
              </h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {patient.catatan_umum}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <TreatmentSection patientId={patient.id} />
        </div>
      </div>
    </div>
  );
}
