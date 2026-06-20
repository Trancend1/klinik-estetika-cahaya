import { PatientTable } from "@/components/crm/PatientTable";
import { ExportButton } from "@/components/crm/ExportButton";

export default function PasienPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div />
        <ExportButton
          label="Export CSV Pasien"
          filename="pasien.csv"
          fetchUrl="/api/patients/export"
        />
      </div>
      <PatientTable />
    </div>
  );
}
