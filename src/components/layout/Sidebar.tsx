// src/components/layout/Sidebar.tsx
import { ReactNode } from "react";
import {
  Bell,
  FileBarChart2,
  GraduationCap,
  Settings,
  Users,
  HeartPulse,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <HeartPulse className="h-4 w-4" /> },
  { label: "Alumni", path: "/alumni", icon: <Users className="h-4 w-4" /> },
  {
    label: "Donor Insights",
    path: "/donors",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  { label: "Alerts", path: "/alerts", icon: <Bell className="h-4 w-4" /> },
  {
    label: "Reports",
    path: "/reports",
    icon: <FileBarChart2 className="h-4 w-4" />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

/**
 * Sidebar shows global navigation and the RankIt Alumni brand.
 */
export function Sidebar() {
  return (
    <aside className="hidden border-r bg-background/40 backdrop-blur lg:block lg:w-64 xl:w-72">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex items-center gap-2 border-b px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white font-bold">
            R
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">
              RankIt Alumni
            </div>
            <div className="text-xs text-muted-foreground">
              Live alumni intelligence
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              <span className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
