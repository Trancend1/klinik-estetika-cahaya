"use client";

import { useState, useEffect, useCallback } from "react";
import { Stethoscope } from "lucide-react";
import { TreatmentForm } from "@/components/crm/TreatmentForm";

interface Treatment {
  id: string;
  patient_id: string;
  tanggal: string;
  jenis_treatment: string;
  catatan_dokter: string | null;
  produk_diresepkan: string | null;
  created_by: string;
  created_by_nama: string;
  created_at: string;
}

interface TreatmentSectionProps {
  patientId: string;
}

export function TreatmentSection({ patientId }: TreatmentSectionProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTreatments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/patients/${patientId}/treatments`);
      if (res.ok) {
        const json = await res.json();
        setTreatments(json.data);
      } else {
        setError("Gagal memuat riwayat treatment");
      }
    } catch (e) {
      console.error("Gagal memuat riwayat treatment:", e);
      setError("Gagal memuat riwayat treatment");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchTreatments();
  }, [fetchTreatments]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-300 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Riwayat Treatment
        </h2>
        <TreatmentForm patientId={patientId} onSuccess={fetchTreatments} />
      </div>

      {loading ? (
        <div className="p-8 text-center">
          <p className="text-gray-400 text-sm">Memuat riwayat treatment...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      ) : treatments.length === 0 ? (
        <div className="p-8 text-center">
          <Stethoscope className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm mb-1">
            Belum ada riwayat treatment
          </p>
          <p className="text-xs text-gray-400">
            Klik &quot;Tambah Treatment&quot; untuk mencatat treatment pertama
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">
                    {treatment.jenis_treatment}
                  </p>
                  {treatment.catatan_dokter && (
                    <p className="text-sm text-gray-600 mt-1">
                      {treatment.catatan_dokter}
                    </p>
                  )}
                  {treatment.produk_diresepkan && (
                    <p className="text-sm text-sage-700 mt-1">
                      Produk: {treatment.produk_diresepkan}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-gray-500">
                    {new Date(treatment.tanggal).toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    oleh {treatment.created_by_nama}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
