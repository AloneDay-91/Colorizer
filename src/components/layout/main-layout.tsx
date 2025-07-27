"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { NavigationMenuDemo } from "@/components/main-nav";
import { useMemo } from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWaitlistPage = useMemo(
    () => pathname?.startsWith("/waitlist") || false,
    [pathname]
  );

  if (isWaitlistPage) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <NavigationMenuDemo />
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Colorizer Pro. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
