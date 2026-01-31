// src/components/layout/AppLayout.tsx
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * AppLayout is the shared shell for all RankIt Alumni pages.
 * It wires the Sidebar and TopBar (controller-ish layout),
 * while page components focus on their own content.
 */
export function AppLayout({ title, subtitle, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar title={title} subtitle={subtitle} />
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
