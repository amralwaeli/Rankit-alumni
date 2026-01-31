// src/components/layout/TopBar.tsx
import { Bell } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

/**
 * TopBar shows the current page title for RankIt Alumni
 * and leaves space for future user/profile actions.
 */
export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b bg-background/60 px-4 py-3 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-base font-semibold leading-tight sm:text-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:bg-accent"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
