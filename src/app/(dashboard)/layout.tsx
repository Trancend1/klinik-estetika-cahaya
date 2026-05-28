import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 bg-white border-r border-gray-300 p-4 flex flex-col gap-1">
        <div className="mb-6 px-3">
          <span className="text-sm font-semibold text-gray-900">Klinik Estetika Cahaya</span>
        </div>
        <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-sage-50 hover:text-sage-700 text-sm">
          Dashboard
        </a>
        <a href="/pasien" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-sage-50 hover:text-sage-700 text-sm">
          Pasien
        </a>
        <a href="/booking" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-sage-50 hover:text-sage-700 text-sm">
          Booking
        </a>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
