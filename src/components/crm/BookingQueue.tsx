"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  UserPlus,
  MessageCircle,
} from "lucide-react";
import type { StatusBooking, BookingRequest } from "@/types/database";

const statusLabels: Record<StatusBooking, string> = {
  baru: "Baru",
  dikonfirmasi: "Dikonfirmasi",
  dijadwalkan_ulang: "Dijadwalkan Ulang",
  selesai: "Selesai",
  batal: "Batal",
};

const statusStyles: Record<StatusBooking, string> = {
  baru: "bg-blue-50 text-blue-700",
  dikonfirmasi: "bg-green-50 text-green-700",
  dijadwalkan_ulang: "bg-amber-50 text-amber-700",
  selesai: "bg-sage-100 text-sage-700",
  batal: "bg-gray-100 text-gray-500",
};

const statusFilters = [
  { value: "", label: "Semua Status" },
  { value: "baru", label: "Baru" },
  { value: "dikonfirmasi", label: "Dikonfirmasi" },
  { value: "dijadwalkan_ulang", label: "Dijadwalkan Ulang" },
  { value: "selesai", label: "Selesai" },
  { value: "batal", label: "Batal" },
];

interface BookingWithPatient extends BookingRequest {
  linked_patient_nama?: string;
}

export function BookingQueue() {
  const [bookings, setBookings] = useState<BookingWithPatient[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const perPage = 10;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/booking?${params}`);
      if (!res.ok) throw new Error("Gagal memuat data");
      const json = await res.json();
      setBookings(json.data);
    } catch {
      setError("Gagal memuat antrian booking");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, status: StatusBooking) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchBookings();
    } catch (e) {
      console.error("Gagal update status booking:", e);
    } finally {
      setActionLoading(null);
    }
  };

  const convertToPatient = async (id: string) => {
    if (!confirm("Konversi booking ini menjadi pasien baru?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "POST",
      });
      if (res.ok) fetchBookings();
    } catch (e) {
      console.error("Gagal konversi booking:", e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReschedule = async (id: string, currentDate: string) => {
    const newDate = prompt(
      "Masukkan tanggal baru (YYYY-MM-DD):",
      currentDate
    );
    if (!newDate) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "dijadwalkan_ulang" as StatusBooking,
          tanggal_preferensi: newDate,
        }),
      });
      if (res.ok) fetchBookings();
    } catch (e) {
      console.error("Gagal reschedule booking:", e);
    } finally {
      setActionLoading(null);
    }
  };

  const totalPages = Math.ceil(bookings.length / perPage);
  const paginated = bookings.slice((page - 1) * perPage, page * perPage);
  const newCount = bookings.filter((b) => b.status === "baru").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Antrian Booking
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {newCount > 0 ? (
              <span className="text-amber-600 font-medium">
                {newCount} reservasi baru perlu dikonfirmasi
              </span>
            ) : (
              "Semua reservasi telah diproses"
            )}
          </p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
          aria-label="Filter status booking"
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
      ) : bookings.length === 0 ? (
        <div className="bg-white border border-gray-300 rounded-lg p-12 text-center">
          <CalendarClock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium mb-1">Belum ada booking</p>
          <p className="text-sm text-gray-400">
            {statusFilter
              ? "Tidak ada booking dengan status ini"
              : "Booking dari website akan muncul di sini"}
          </p>
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
                    <th className="py-3 px-4 font-medium text-gray-500">Tanggal</th>
                    <th className="py-3 px-4 font-medium text-gray-500 hidden md:table-cell">
                      Keluhan
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-500">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((booking) => (
                    <tr
                      key={booking.id}
                      className={`border-b border-gray-100 ${
                        booking.status === "baru"
                          ? "bg-blue-50/30"
                          : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {booking.nama}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <a
                          href={`https://wa.me/${booking.nomor_wa}?text=Halo%20${encodeURIComponent(booking.nama)}%2C%20dari%20Klinik%20Estetika%20Cahaya...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sage-700 hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          {booking.nomor_wa}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {new Date(booking.tanggal_preferensi).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden md:table-cell max-w-[200px] truncate">
                        {booking.keluhan || "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusStyles[booking.status as StatusBooking] ||
                            "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {statusLabels[booking.status as StatusBooking] ||
                            booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {booking.status === "baru" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "dikonfirmasi" as StatusBooking)
                                }
                                disabled={actionLoading === booking.id}
                                className="p-1.5 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50"
                                title="Konfirmasi"
                                aria-label="Konfirmasi booking"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "batal" as StatusBooking)
                                }
                                disabled={actionLoading === booking.id}
                                className="p-1.5 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                                title="Batalkan"
                                aria-label="Batalkan booking"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {(booking.status === "baru" ||
                            booking.status === "dikonfirmasi" ||
                            booking.status === "dijadwalkan_ulang") && (
                            <>
                              <button
                                onClick={() =>
                                  handleReschedule(
                                    booking.id,
                                    booking.tanggal_preferensi
                                  )
                                }
                                disabled={actionLoading === booking.id}
                                className="p-1.5 rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
                                title="Jadwalkan Ulang"
                                aria-label="Jadwalkan ulang booking"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                              {booking.status !== "dijadwalkan_ulang" && (
                                <button
                                  onClick={() => convertToPatient(booking.id)}
                                  disabled={actionLoading === booking.id}
                                  className="p-1.5 rounded-md bg-sage-50 text-sage-700 hover:bg-sage-100 transition-colors disabled:opacity-50"
                                  title="Konversi ke Pasien"
                                  aria-label="Konversi booking ke pasien"
                                >
                                  <UserPlus className="w-4 h-4" />
                                </button>
                              )}
                            </>
                          )}
                          <a
                            href={`https://wa.me/${booking.nomor_wa}?text=Halo%20${encodeURIComponent(booking.nama)}%2C%20dari%20Klinik%20Estetika%20Cahaya...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                            title="Chat WhatsApp"
                            aria-label="Chat WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Halaman {page} dari {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
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
