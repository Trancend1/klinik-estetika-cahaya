import { PatientTable } from "@/components/crm/PatientTable";
import { ExportButton } from "@/components/crm/ExportButton";

export default function PasienPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Daftar Pasien
        </h1>
        <ExportButton
          label="Export CSV Pasien"
          filename="pasien.csv"
          fetchUrl="/api/patients/export"
          columnHeaders={{
            nama: "Nama",
            nomor_wa: "Nomor WA",
            tanggal_lahir: "Tanggal Lahir",
            jenis_kulit: "Jenis Kulit",
            alergi: "Alergi",
            status_followup: "Status Follow-up",
            tanggal_pengingat: "Tanggal Pengingat",
            catatan_umum: "Catatan Umum",
            created_at: "Tanggal Dibuat",
            updated_at: "Terakhir Update",
            total_treatment: "Total Treatment",
          }}
        />
      </div>
      <PatientTable />
    </div>
  );
}
