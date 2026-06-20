"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CalendarClock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pasien", href: "/pasien", icon: Users },
  { label: "Booking", href: "/booking", icon: CalendarClock },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50"
      aria-label="Navigasi mobile"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-md text-xs transition-colors ${
                isActive
                  ? "text-sage-700 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              {item.label}
            </a>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-md text-xs text-gray-500 hover:text-red-600 transition-colors"
          aria-label="Keluar"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          Keluar
        </button>
      </div>
    </nav>
  );
}
