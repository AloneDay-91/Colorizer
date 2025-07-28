"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import FooterSection from "@/components/blocks/Footer";
import HeaderSection from "@/components/blocks/Header";

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

        <HeaderSection/>

      <main className="flex-1">
        <div>{children}</div>
      </main>

      <FooterSection/>
    </div>
  );
}
