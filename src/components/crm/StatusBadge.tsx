interface StatusBadgeProps {
  status: string;
}

const styles: Record<string, string> = {
  kunjungan_pertama: "bg-blue-50 text-blue-700",
  kontrol_dijadwalkan: "bg-green-50 text-green-700",
  perlu_diingatkan: "bg-amber-50 text-amber-700",
  aktif: "bg-sage-100 text-sage-700",
  tidak_aktif: "bg-gray-100 text-gray-500",
};

const labels: Record<string, string> = {
  kunjungan_pertama: "Kunjungan Pertama",
  kontrol_dijadwalkan: "Kontrol Dijadwalkan",
  perlu_diingatkan: "Perlu Diingatkan",
  aktif: "Pasien Aktif",
  tidak_aktif: "Tidak Aktif",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}
