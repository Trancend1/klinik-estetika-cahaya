import { HTMLAttributes, forwardRef } from "react";

type BadgeVariant =
  | "kunjungan_pertama"
  | "kontrol_dijadwalkan"
  | "perlu_diingatkan"
  | "aktif"
  | "tidak_aktif"
  | "baru"
  | "dikonfirmasi"
  | "dijadwalkan_ulang"
  | "selesai"
  | "batal";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  kunjungan_pertama: "bg-blue-50 text-blue-700",
  kontrol_dijadwalkan: "bg-green-50 text-green-700",
  perlu_diingatkan: "bg-amber-50 text-amber-700",
  aktif: "bg-sage-100 text-sage-700",
  tidak_aktif: "bg-gray-100 text-gray-500",
  baru: "bg-blue-50 text-blue-700",
  dikonfirmasi: "bg-green-50 text-green-700",
  dijadwalkan_ulang: "bg-amber-50 text-amber-700",
  selesai: "bg-sage-100 text-sage-700",
  batal: "bg-gray-100 text-gray-500",
};

const labels: Record<BadgeVariant, string> = {
  kunjungan_pertama: "Kunjungan Pertama",
  kontrol_dijadwalkan: "Kontrol Dijadwalkan",
  perlu_diingatkan: "Perlu Diingatkan",
  aktif: "Aktif",
  tidak_aktif: "Tidak Aktif",
  baru: "Baru",
  dikonfirmasi: "Dikonfirmasi",
  dijadwalkan_ulang: "Dijadwalkan Ulang",
  selesai: "Selesai",
  batal: "Batal",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className = "", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex px-2.5 py-1 rounded-full text-crm-meta font-medium
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {labels[variant]}
      </span>
    );
  }
);

Badge.displayName = "Badge";
export { Badge };
export type { BadgeProps, BadgeVariant };
