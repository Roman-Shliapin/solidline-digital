'use client';

import { useState } from "react";
import Link from "next/link";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineViewGrid,
  HiOutlineUserGroup,
  HiOutlineLightningBolt,
  HiOutlinePhotograph,
  HiOutlineColorSwatch,
  HiOutlineLink,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiOutlinePencil,
} from "react-icons/hi";
import type { LeadFormData, BusinessType, StylePreference } from "@/types/lead";

const INPUT_CLASS =
  "bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 placeholder:text-[#444]";
const TEXTAREA_CLASS =
  "bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 placeholder:text-[#444] resize-none";
const ICON_CLASS = "absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-lg pointer-events-none";
const TEXTAREA_ICON_CLASS = "absolute left-3 top-4 text-[#444] text-lg pointer-events-none";
const LABEL_CLASS = "text-sm text-[#888] mb-1 block";

const OPTION_BTN = (active: boolean) =>
  `px-4 py-3 rounded-xl border text-left transition-all flex-1 min-w-0 ${active ? "border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]" : "border-[#222] bg-[#141414] text-[#888] hover:border-[#333] hover:text-[#ccc]"}`;

const BUSINESS_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: "local-service", label: "Local service" },
  { value: "online-business", label: "Online business" },
  { value: "personal-brand", label: "Personal brand" },
  { value: "small-company", label: "Company" },
];

const STYLE_OPTIONS: { value: StylePreference; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
  { value: "bold", label: "Bold" },
  { value: "unsure", label: "Not sure" },
];

const initialForm: LeadFormData = {
  name: "",
  email: "",
  businessName: "",
  location: "",
  businessType: "local-service",
  description: "",
  services: [],
  customers: "",
  differentiation: "",
  hasLogo: false,
  brandColors: "",
  stylePreference: "modern",
  competitors: undefined,
  phone: "",
  instagram: "",
  website: "",
  notes: "",
};

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep1 = () => {
    return form.name.trim() && form.email.trim() && form.businessName.trim() && form.location.trim();
  };
  const validateStep2 = () => {
    return form.description.trim() && form.services.length > 0 && form.customers.trim() && form.differentiation.trim();
  };

  const canNext = () => {
    if (step === 1) return validateStep1();
    if (step === 2) return validateStep2();
    return true;
  };

  const handleNext = () => {
    if (step < 4 && canNext()) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]">
        <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
          <Link href="/" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">SolidLine Digital</Link>
          <Link href="/" className="bg-[#7C5CFF] px-5 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#6B4FE0]">Home</Link>
        </div>
        <div className="max-w-xl mx-auto text-center py-24 px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#7C5CFF]">Thanks!</h1>
          <p className="text-[#888] text-lg">
            We&apos;ve received your information. We&apos;ll review your details and get back to you within 24 hours.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]">
      <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <Link href="/" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">SolidLine Digital</Link>
        <Link href="/" className="bg-[#7C5CFF] px-5 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#6B4FE0]">Home</Link>
      </div>
      <div className="max-w-xl mx-auto py-16 px-6">
        <div className="flex items-center gap-3 mb-8">
          <HiOutlineRocketLaunch className="text-[#7C5CFF] w-10 h-10 shrink-0" />
          <div>
            <h1 className="text-xl font-bold">Get started</h1>
            <p className="text-[#7C5CFF] font-medium text-sm">Step {step} of 4</p>
          </div>
        </div>
        <div className="h-1.5 bg-[#222] rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-[#7C5CFF] rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Basic information</h2>
            <div>
              <label htmlFor="name" className={LABEL_CLASS}>Name</label>
              <div className="relative">
                <HiOutlineUser className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={LABEL_CLASS}>Email</label>
              <div className="relative">
                <HiOutlineMail className={ICON_CLASS} />
                <input className={INPUT_CLASS} type="email" id="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="businessName" className={LABEL_CLASS}>Business name</label>
              <div className="relative">
                <HiOutlineOfficeBuilding className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="businessName" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Company name" />
              </div>
            </div>
            <div>
              <label htmlFor="location" className={LABEL_CLASS}>Business location</label>
              <div className="relative">
                <HiOutlineLocationMarker className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City or region" />
              </div>
            </div>
            <div>
              <label className={LABEL_CLASS}>
                <span className="inline-flex items-center gap-1.5"><HiOutlineBriefcase className="text-[#444]" /> Business type</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {BUSINESS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("businessType", opt.value)}
                    className={OPTION_BTN(form.businessType === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Business description</h2>
            <div>
              <label htmlFor="description" className={LABEL_CLASS}>What does your business do?</label>
              <div className="relative">
                <HiOutlineDocumentText className={TEXTAREA_ICON_CLASS} />
                <textarea className={TEXTAREA_CLASS} id="description" rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Briefly describe what you do" />
              </div>
            </div>
            <div>
              <label htmlFor="services" className={LABEL_CLASS}>Services or products (one per line)</label>
              <div className="relative">
                <HiOutlineViewGrid className={TEXTAREA_ICON_CLASS} />
                <textarea className={TEXTAREA_CLASS} id="services" rows={3} value={form.services.join("\n")} onChange={(e) => update("services", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} placeholder="e.g. Consultations, Web development" />
              </div>
            </div>
            <div>
              <label htmlFor="customers" className={LABEL_CLASS}>Who are your typical customers?</label>
              <div className="relative">
                <HiOutlineUserGroup className={TEXTAREA_ICON_CLASS} />
                <textarea className={TEXTAREA_CLASS} id="customers" rows={2} value={form.customers} onChange={(e) => update("customers", e.target.value)} placeholder="Describe your audience" />
              </div>
            </div>
            <div>
              <label htmlFor="differentiation" className={LABEL_CLASS}>What makes your business different?</label>
              <div className="relative">
                <HiOutlineLightningBolt className={TEXTAREA_ICON_CLASS} />
                <textarea className={TEXTAREA_CLASS} id="differentiation" rows={3} value={form.differentiation} onChange={(e) => update("differentiation", e.target.value)} placeholder="Your strengths, unique selling points" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Website preferences</h2>
            <div>
              <label className={LABEL_CLASS}>
                <span className="inline-flex items-center gap-1.5"><HiOutlinePhotograph className="text-[#444]" /> Do you have a logo?</span>
              </label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => update("hasLogo", true)}
                  className={`px-4 py-2 rounded-xl border transition-all ${form.hasLogo === true ? "border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]" : "border-[#222] bg-[#141414] text-[#888]"}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => update("hasLogo", false)}
                  className={`px-4 py-2 rounded-xl border transition-all ${form.hasLogo === false ? "border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]" : "border-[#222] bg-[#141414] text-[#888]"}`}
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="brandColors" className={LABEL_CLASS}>Brand colors (optional)</label>
              <div className="relative">
                <HiOutlineColorSwatch className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="brandColors" value={form.brandColors ?? ""} onChange={(e) => update("brandColors", e.target.value)} placeholder="e.g. #7C5CFF, blue" />
              </div>
            </div>
            <div>
              <label className={LABEL_CLASS}>Preferred website style</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("stylePreference", opt.value)}
                    className={OPTION_BTN(form.stylePreference === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="competitors" className={LABEL_CLASS}>Competitor websites (one URL per line, optional)</label>
              <div className="relative">
                <HiOutlineLink className={TEXTAREA_ICON_CLASS} />
                <textarea className={TEXTAREA_CLASS} id="competitors" rows={2} value={(form.competitors ?? []).join("\n")} onChange={(e) => update("competitors", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} placeholder="https://..." />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Contact & final details</h2>
            <div>
              <label htmlFor="phone" className={LABEL_CLASS}>Phone (optional)</label>
              <div className="relative">
                <HiOutlinePhone className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="phone" type="tel" value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} placeholder="+1..." />
              </div>
            </div>
            <div>
              <label htmlFor="instagram" className={LABEL_CLASS}>Instagram (optional)</label>
              <div className="relative">
                <HiOutlinePhotograph className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="instagram" value={form.instagram ?? ""} onChange={(e) => update("instagram", e.target.value)} placeholder="@username" />
              </div>
            </div>
            <div>
              <label htmlFor="website" className={LABEL_CLASS}>Existing website (optional)</label>
              <div className="relative">
                <HiOutlineGlobe className={ICON_CLASS} />
                <input className={INPUT_CLASS} id="website" type="url" value={form.website ?? ""} onChange={(e) => update("website", e.target.value)} placeholder="https://..." />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className={LABEL_CLASS}>Additional notes</label>
              <div className="relative">
                <HiOutlinePencil className={TEXTAREA_ICON_CLASS} />
                <textarea className={TEXTAREA_CLASS} id="notes" rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Anything else we should know?" />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-full border border-[#222] text-[#888] hover:border-[#444] hover:text-white transition-all"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext()}
              className="bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all hover:bg-[#6B4FE0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all hover:bg-[#6B4FE0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
