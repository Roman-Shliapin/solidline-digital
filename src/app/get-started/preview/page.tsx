"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import SitePreviewView from "@/components/SitePreviewView";
import { loadLeadFormFromPreviewStorage } from "@/lib/getStartedPreviewStorage";
import { templateIdForBusinessType } from "@/lib/templateForLead";
import type { LeadFormData } from "@/types/lead";
import { FORM } from "@/styles/forms";

export default function GetStartedPreviewPage() {
  const router = useRouter();
  const [form, setForm] = useState<LeadFormData | null>(null);

  useEffect(() => {
    const data = loadLeadFormFromPreviewStorage();
    if (!data) {
      router.replace("/get-started");
      return;
    }
    setForm(data);
  }, [router]);

  if (!form) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#888] text-sm">
        Loading preview…
      </main>
    );
  }

  const templateId = templateIdForBusinessType(form.businessType);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] text-white">
      <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <Link
          href="/get-started"
          className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]"
        >
          SolidLine Digital
        </Link>
        <Link href="/get-started" className={FORM.btnSecondary}>
          Back to form
        </Link>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-8">
          <HiOutlineRocketLaunch className="text-[#7C5CFF] w-9 h-9 shrink-0" />
          <div>
            <p className="text-xs font-medium text-[#7C5CFF] uppercase tracking-wide">Get started</p>
            <h1 className="text-lg font-bold">Site preview</h1>
            <p className="text-[#888] text-sm mt-0.5">
              Demo layout — template: {templateId.replace(/-/g, " ")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pb-16 flex flex-col items-center">
        <SitePreviewView form={form} templateId={templateId} />
      </div>
    </main>
  );
}
