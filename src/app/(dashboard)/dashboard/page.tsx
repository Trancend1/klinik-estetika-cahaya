import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { Users, CalendarClock, Bell, Activity, MessageCircle, UserCheck } from "lucide-react";
import { ExportButton } from "@/components/crm/ExportButton";

interface Stat {
  label: string;
  value: number;
  icon: typeof Users;
  color: string;
  href?: string;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const today = new Date().toISOString().split("T")[0];

  const [
    totalPasien,
    perluDihubungi,
    bookingBaru,
    treatmentMingguIni,
    pasienAktif,
    perluDihubungiList,
  ] = await Promise.all([
    sql.query("SELECT COUNT(*)::int as count FROM patients"),
    sql.query(
      "SELECT COUNT(*)::int as count FROM patients WHERE tanggal_pengingat <= $1 AND tanggal_pengingat IS NOT NULL",
      [today]
    ),
    sql.query(
      "SELECT COUNT(*)::int as count FROM booking_requests WHERE status = 'baru'"
    ),
    sql.query(
      `SELECT COUNT(*)::int as count FROM treatments
       WHERE tanggal >= date_trunc('week', CURRENT_DATE)`
    ),
    sql.query(
      "SELECT COUNT(*)::int as count FROM patients WHERE status_followup = 'aktif'"
    ),
    sql.query(
      `SELECT id, nama, nomor_wa, tanggal_pengingat
       FROM patients
       WHERE tanggal_pengingat <= $1 AND tanggal_pengingat IS NOT NULL
       ORDER BY tanggal_pengingat ASC
       LIMIT 5`,
      [today]
    ),
  ]);

  const stats: Stat[] = [
    {
      label: "Total Pasien",
      value: totalPasien[0]?.count ?? 0,
      icon: Users,
      color: "text-sage-500",
      href: "/pasien",
    },
    {
      label: "Booking Baru",
      value: bookingBaru[0]?.count ?? 0,
      icon: CalendarClock,
      color: "text-blue-500",
      href: "/booking",
    },
    {
      label: "Perlu Dihubungi",
      value: perluDihubungi[0]?.count ?? 0,
      icon: Bell,
      color: "text-amber-500",
    },
    {
      label: "Pasien Aktif",
      value: pasienAktif[0]?.count ?? 0,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      label: "Treatment Minggu Ini",
      value: treatmentMingguIni[0]?.count ?? 0,
      icon: Activity,
      color: "text-purple-500",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Selamat datang, {session.user?.name || "Admin"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            label="Export Treatment"
            filename="riwayat-treatment.csv"
            fetchUrl="/api/treatments/export"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const content = (
            <div
              className="bg-white border border-gray-300 rounded-lg p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );

          return stat.href ? (
            <a key={stat.label} href={stat.href}>
              {content}
            </a>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })}
      </div>

      {perluDihubungiList.length > 0 && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-semibold text-amber-800">
                Pasien yang Perlu Dihubungi Hari Ini
              </h2>
            </div>
          </div>
          <div className="divide-y divide-amber-200">
            {(perluDihubungiList as { id: string; nama: string; nomor_wa: string; tanggal_pengingat: string }[]).map((p) => {
              const waNumber = p.nomor_wa.startsWith("0")
                ? "62" + p.nomor_wa.slice(1)
                : p.nomor_wa;
              return (
                <div
                  key={p.id}
                  className="px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      {p.nama}
                    </p>
                    <p className="text-xs text-amber-700">
                      Pengingat:{" "}
                      {new Date(p.tanggal_pengingat).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/pasien/${p.id}`}
                      className="text-xs text-amber-700 hover:underline"
                    >
                      Buka
                    </a>
                    <a
                      href={`https://wa.me/${waNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                      aria-label={`WhatsApp ${p.nama}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
