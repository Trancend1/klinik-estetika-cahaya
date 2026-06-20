"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

const jenisKulitOptions = [
  { value: "", label: "Pilih jenis kulit" },
  { value: "normal", label: "Normal" },
  { value: "berminyak", label: "Berminyak" },
  { value: "kombinasi", label: "Kombinasi" },
  { value: "sensitif", label: "Sensitif" },
  { value: "kering", label: "Kering" },
];

interface PatientFormData {
  nama: string;
  nomor_wa: string;
  tanggal_lahir: string;
  jenis_kulit: string;
  alergi: string;
  catatan_umum: string;
}

interface PatientFormProps {
  initialData?: PatientFormData;
  patientId?: string;
}

export function PatientForm({ initialData, patientId }: PatientFormProps) {
  const router = useRouter();
  const isEdit = !!patientId;

  const [form, setForm] = useState<PatientFormData>(
    initialData || {
      nama: "",
      nomor_wa: "",
      tanggal_lahir: "",
      jenis_kulit: "",
      alergi: "",
      catatan_umum: "",
    }
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isEdit ? `/api/patients/${patientId}` : "/api/patients";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan");
        setLoading(false);
        return;
      }

      router.push(`/pasien/${data.data.id}`);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <a
          href="/pasien"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Kembali ke daftar pasien"
        >
          <ArrowLeft className="w-5 h-5" />
        </a>
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Pasien" : "Tambah Pasien Baru"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isEdit ? "Ubah data pasien" : "Isi data pasien baru"}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-300 rounded-lg p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              id="nama"
              name="nama"
              type="text"
              required
              value={form.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="Nama pasien"
            />
          </div>
          <div>
            <label htmlFor="nomor_wa" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="nomor_wa"
              name="nomor_wa"
              type="text"
              required
              value={form.nomor_wa}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="Contoh: 628123456789"
            />
          </div>
          <div>
            <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Lahir
            </label>
            <input
              id="tanggal_lahir"
              name="tanggal_lahir"
              type="date"
              value={form.tanggal_lahir}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>
          <div>
            <label htmlFor="jenis_kulit" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kulit
            </label>
            <select
              id="jenis_kulit"
              name="jenis_kulit"
              value={form.jenis_kulit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              {jenisKulitOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="alergi" className="block text-sm font-medium text-gray-700 mb-1">
            Alergi (jika ada)
          </label>
          <input
            id="alergi"
            name="alergi"
            type="text"
            value={form.alergi}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            placeholder="Contoh: nickel, lidah buaya, aspirin"
          />
        </div>

        <div>
          <label htmlFor="catatan_umum" className="block text-sm font-medium text-gray-700 mb-1">
            Catatan Umum
          </label>
          <textarea
            id="catatan_umum"
            name="catatan_umum"
            rows={3}
            value={form.catatan_umum}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-y"
            placeholder="Catatan tambahan tentang pasien..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <a
          href="/pasien"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Batal
        </a>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-md text-sm font-medium hover:bg-sage-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {loading ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Pasien"}
        </button>
      </div>
    </form>
  );
}
