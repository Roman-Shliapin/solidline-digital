'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import LanguageSwitcher from "../i18n/LanguageSwitcher";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGetStarted = pathname?.startsWith("/get-started");

  if (isGetStarted) {
    return (
      <>
        <LanguageSwitcher mode="fixed" />
        {children}
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
