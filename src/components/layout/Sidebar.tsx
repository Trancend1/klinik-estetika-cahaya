"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CalendarClock, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pasien", href: "/pasien", icon: Users },
  { label: "Booking", href: "/booking", icon: CalendarClock },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-300 p-4 flex flex-col gap-1 min-h-screen shrink-0 hidden lg:flex">
      <div className="px-3 pb-4 border-b border-gray-300 mb-4">
        <span className="text-sm font-semibold text-gray-900 block">
          Klinik Estetika Cahaya
        </span>
        <span className="text-xs text-gray-500 mt-0.5 block">
          {session?.user?.name || "Admin"}
        </span>
      </div>

      <nav className="flex-1 space-y-1" aria-label="Navigasi CRM">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                ${
                  isActive
                    ? "bg-sage-100 text-sage-700 font-medium"
                    : "text-gray-700 hover:bg-sage-50 hover:text-sage-700"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              {item.label}
            </a>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
      >
        <LogOut className="w-5 h-5" aria-hidden="true" />
        Keluar
      </button>
    </aside>
  );
}
