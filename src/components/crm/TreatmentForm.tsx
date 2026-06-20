"use client";

import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";

interface TreatmentFormProps {
  patientId: string;
  onSuccess: () => void;
}

export function TreatmentForm({ patientId, onSuccess }: TreatmentFormProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    jenis_treatment: "",
    catatan_dokter: "",
    produk_diresepkan: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/patients/${patientId}/treatments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan treatment");
        setLoading(false);
        return;
      }

      setForm({
        tanggal: new Date().toISOString().split("T")[0],
        jenis_treatment: "",
        catatan_dokter: "",
        produk_diresepkan: "",
      });
      setOpen(false);
      onSuccess();
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-md text-sm font-medium hover:bg-sage-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Tambah Treatment
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Tambah Treatment Baru
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Treatment <span className="text-red-500">*</span>
                </label>
                <input
                  id="tanggal"
                  name="tanggal"
                  type="date"
                  required
                  value={form.tanggal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>

              <div>
                <label htmlFor="jenis_treatment" className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Treatment <span className="text-red-500">*</span>
                </label>
                <input
                  id="jenis_treatment"
                  name="jenis_treatment"
                  type="text"
                  required
                  value={form.jenis_treatment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Contoh: Chemical Peeling, Facial"
                />
              </div>

              <div>
                <label htmlFor="catatan_dokter" className="block text-sm font-medium text-gray-700 mb-1">
                  Catatan Dokter
                </label>
                <textarea
                  id="catatan_dokter"
                  name="catatan_dokter"
                  rows={3}
                  value={form.catatan_dokter}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-y"
                  placeholder="Catatan singkat hasil treatment..."
                />
              </div>

              <div>
                <label htmlFor="produk_diresepkan" className="block text-sm font-medium text-gray-700 mb-1">
                  Produk Diresepkan
                </label>
                <input
                  id="produk_diresepkan"
                  name="produk_diresepkan"
                  type="text"
                  value={form.produk_diresepkan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Contoh: Niacinamide 10%, Sunscreen SPF 50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-md text-sm font-medium hover:bg-sage-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Menyimpan..." : "Simpan Treatment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
