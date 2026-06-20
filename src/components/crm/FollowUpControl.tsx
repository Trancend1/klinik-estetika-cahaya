"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";

type StatusFollowup =
  | "kunjungan_pertama"
  | "kontrol_dijadwalkan"
  | "perlu_diingatkan"
  | "aktif"
  | "tidak_aktif";

const statusLabels: Record<StatusFollowup, string> = {
  kunjungan_pertama: "Kunjungan Pertama",
  kontrol_dijadwalkan: "Kontrol Dijadwalkan",
  perlu_diingatkan: "Perlu Diingatkan",
  aktif: "Pasien Aktif",
  tidak_aktif: "Tidak Aktif",
};

interface FollowUpControlProps {
  patientId: string;
  initialStatus: string;
  initialReminder: string | null;
  onUpdate: () => void;
}

export function FollowUpControl({
  patientId,
  initialStatus,
  initialReminder,
  onUpdate,
}: FollowUpControlProps) {
  const [status, setStatus] = useState(initialStatus);
  const [tanggalPengingat, setTanggalPengingat] = useState(
    initialReminder ? new Date(initialReminder).toISOString().split("T")[0] : ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/patients/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status_followup: status,
          tanggal_pengingat: tanggalPengingat || null,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        onUpdate();
      } else {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan");
        setSaved(false);
      }
    } catch (e) {
      console.error("Gagal menyimpan status follow-up:", e);
      setError("Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
        Status Follow-up
      </h2>

      <div className="space-y-3">
        <div>
          <label htmlFor="status-followup" className="block text-xs text-gray-500 mb-1">
            Status Saat Ini
          </label>
          <select
            id="status-followup"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setSaved(false);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          >
            {(Object.keys(statusLabels) as StatusFollowup[]).map((key) => (
              <option key={key} value={key}>
                {statusLabels[key]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tanggal-pengingat" className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <Bell className="w-3 h-3" />
            Pengingat Kontrol
          </label>
          <input
            id="tanggal-pengingat"
            type="date"
            value={tanggalPengingat}
            onChange={(e) => {
              setTanggalPengingat(e.target.value);
              setSaved(false);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 text-center">{error}</p>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-md text-sm font-medium hover:bg-sage-700 disabled:opacity-50 transition-colors"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Tersimpan
            </>
          ) : saving ? (
            "Menyimpan..."
          ) : (
            "Simpan Perubahan"
          )}
        </button>
      </div>
    </div>
  );
}
