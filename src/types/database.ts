export type JenisKulit = "normal" | "berminyak" | "kombinasi" | "sensitif" | "kering";

export type StatusFollowup =
  | "kunjungan_pertama"
  | "kontrol_dijadwalkan"
  | "perlu_diingatkan"
  | "aktif"
  | "tidak_aktif";

export type StatusBooking =
  | "baru"
  | "dikonfirmasi"
  | "dijadwalkan_ulang"
  | "selesai"
  | "batal";

export interface Patient {
  id: string;
  nama: string;
  nomor_wa: string;
  tanggal_lahir: string | null;
  jenis_kulit: JenisKulit | null;
  alergi: string | null;
  status_followup: StatusFollowup;
  tanggal_pengingat: string | null;
  catatan_umum: string | null;
  created_at: string;
  updated_at: string;
}

export interface Treatment {
  id: string;
  patient_id: string;
  tanggal: string;
  jenis_treatment: string;
  catatan_dokter: string | null;
  produk_diresepkan: string | null;
  created_by: string;
  created_at: string;
}

export interface BookingRequest {
  id: string;
  nama: string;
  nomor_wa: string;
  tanggal_preferensi: string;
  keluhan: string | null;
  status: StatusBooking;
  linked_patient_id: string | null;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      patients: {
        Row: Patient;
        Insert: Omit<Patient, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Patient, "id" | "created_at">>;
      };
      treatments: {
        Row: Treatment;
        Insert: Omit<Treatment, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Treatment, "id" | "created_at" | "patient_id" | "created_by">>;
      };
      booking_requests: {
        Row: BookingRequest;
        Insert: Omit<BookingRequest, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<BookingRequest, "id" | "created_at">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      jenis_kulit: JenisKulit;
      status_followup: StatusFollowup;
      status_booking: StatusBooking;
    };
  };
};
