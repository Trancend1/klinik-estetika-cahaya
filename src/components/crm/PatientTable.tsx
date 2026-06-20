"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Users, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { StatusBadge } from "@/components/crm/StatusBadge";

interface Patient {
  id: string;
  nama: string;
  nomor_wa: string;
  status_followup: string;
  treatment_terakhir: string | null;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusFilters = [
  { value: "", label: "Semua Status" },
  { value: "kunjungan_pertama", label: "Kunjungan Pertama" },
  { value: "kontrol_dijadwalkan", label: "Kontrol Dijadwalkan" },
  { value: "perlu_diingatkan", label: "Perlu Diingatkan" },
  { value: "aktif", label: "Pasien Aktif" },
  { value: "tidak_aktif", label: "Tidak Aktif" },
];

export function PatientTable() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = useCallback(async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "20");
      if (search) params.set("search", search);
      if (status) params.set("status", status);

      const res = await fetch(`/api/patients?${params}`);
      if (!res.ok) throw new Error("Gagal memuat data");

      const json = await res.json();
      setPatients(json.data);
      setPagination(json.pagination);
    } catch {
      setError("Gagal memuat data pasien");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchPatients(1);
  }, [fetchPatients]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchPatients(page);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm text-gray-500">
          {pagination.total} pasien terdaftar
        </p>
        <a
          href="/pasien/baru"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-md text-sm font-medium hover:bg-sage-700 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Pasien Baru
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Cari nama atau nomor WA..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            aria-label="Cari pasien"
          />
        </div>
        <select
          value={status}
          onChange={handleStatusFilter}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          aria-label="Filter status"
        >
          {statusFilters.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-400 text-sm">Memuat data...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white border border-gray-300 rounded-lg p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium mb-1">Belum ada pasien</p>
          <p className="text-sm text-gray-400 mb-4">
            {search || status
              ? "Tidak ada pasien yang sesuai filter"
              : "Klik tombol di atas untuk menambah pasien pertama"}
          </p>
          {!search && !status && (
            <a
              href="/pasien/baru"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white rounded-md text-sm font-medium hover:bg-sage-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Pasien Baru
            </a>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50 text-left">
                    <th className="py-3 px-4 font-medium text-gray-500">Nama</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Nomor WA</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-500 hidden md:table-cell">
                      Treatment Terakhir
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500 hidden md:table-cell">
                      Tanggal Dibuat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => window.location.href = `/pasien/${patient.id}`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {patient.nama}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{patient.nomor_wa}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={patient.status_followup} />
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden md:table-cell">
                        {patient.treatment_terakhir || "—"}
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden md:table-cell">
                        {new Date(patient.created_at).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Halaman {pagination.page} dari {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
