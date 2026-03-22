"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { FORM } from "@/styles/forms";
import { saveLeadFormForPreview } from "@/lib/getStartedPreviewStorage";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";

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

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return <p className="text-red-400 text-xs mt-1">{message}</p>;
}

function FormMessage({ type, message }: { type: "error" | "success"; message: string }) {
  const bg =
    type === "error"
      ? "bg-red-500/10 border-red-500/30 text-red-400"
      : "bg-green-500/10 border-green-500/30 text-green-400";
  return (
    <div className={`px-4 py-3 rounded-xl border text-sm mb-6 ${bg}`}>{message}</div>
  );
}

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const update = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const step1Errors = {
    name: touched && !form.name.trim(),
    email: touched && (!form.email.trim() || !isValidEmail(form.email)),
    businessName: touched && !form.businessName.trim(),
    location: touched && !form.location.trim(),
  };
  const step2Errors = {
    description: touched && !form.description.trim(),
    services: touched && form.services.length === 0,
    customers: touched && !form.customers.trim(),
    differentiation: touched && !form.differentiation.trim(),
  };

  const validateStep1 = () =>
    form.name.trim() &&
    form.email.trim() &&
    isValidEmail(form.email) &&
    form.businessName.trim() &&
    form.location.trim();
  const validateStep2 = () =>
    form.description.trim() &&
    form.services.length > 0 &&
    form.customers.trim() &&
    form.differentiation.trim();

  const canNext = () => {
    if (step === 1) return validateStep1();
    if (step === 2) return validateStep2();
    return true;
  };

  const handleNext = () => {
    setTouched(true);
    if (step < 4 && canNext()) {
      setStep(step + 1);
      setTouched(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setTouched(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
      if (res.ok) {
        router.push("/get-started/thank-you");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] text-white">
      <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <Link href="/" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">
          SolidLine Digital
        </Link>
        <Link href="/" className={FORM.btnSecondary}>
          Home
        </Link>
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

        {error && <FormMessage type="error" message={error} />}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Basic information</h2>
            <div>
              <label htmlFor="name" className={FORM.label}>Name</label>
              <div className="relative">
                <HiOutlineUser className={FORM.icon} />
                <input
                  className={step1Errors.name ? FORM.inputError : FORM.input}
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  maxLength={100}
                />
              </div>
              <FieldError show={step1Errors.name} message="Name is required" />
            </div>
            <div>
              <label htmlFor="email" className={FORM.label}>Email</label>
              <div className="relative">
                <HiOutlineMail className={FORM.icon} />
                <input
                  className={step1Errors.email ? FORM.inputError : FORM.input}
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@example.com"
                  maxLength={200}
                />
              </div>
              <FieldError show={step1Errors.email} message={!form.email.trim() ? "Email is required" : "Enter a valid email"} />
            </div>
            <div>
              <label htmlFor="businessName" className={FORM.label}>Business name</label>
              <div className="relative">
                <HiOutlineOfficeBuilding className={FORM.icon} />
                <input
                  className={step1Errors.businessName ? FORM.inputError : FORM.input}
                  id="businessName"
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="Company name"
                  maxLength={150}
                />
              </div>
              <FieldError show={step1Errors.businessName} message="Business name is required" />
            </div>
            <div>
              <label htmlFor="location" className={FORM.label}>Business location</label>
              <div className="relative">
                <HiOutlineLocationMarker className={FORM.icon} />
                <input
                  className={step1Errors.location ? FORM.inputError : FORM.input}
                  id="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City or region"
                  maxLength={150}
                />
              </div>
              <FieldError show={step1Errors.location} message="Location is required" />
            </div>
            <div>
              <label className={FORM.label}>
                <span className="inline-flex items-center gap-1.5">
                  <HiOutlineBriefcase className="text-[#444]" /> Business type
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {BUSINESS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("businessType", opt.value)}
                    className={FORM.optionBtn(form.businessType === opt.value)}
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
              <label htmlFor="description" className={FORM.label}>What does your business do?</label>
              <div className="relative">
                <HiOutlineDocumentText className={FORM.textareaIcon} />
                <textarea
                  className={step2Errors.description ? FORM.textareaError : FORM.textarea}
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Briefly describe what you do"
                  maxLength={1000}
                />
              </div>
              <FieldError show={step2Errors.description} message="Business description is required" />
            </div>
            <div>
              <label htmlFor="services" className={FORM.label}>Services or products (one per line)</label>
              <div className="relative">
                <HiOutlineViewGrid className={FORM.textareaIcon} />
                <textarea
                  className={step2Errors.services ? FORM.textareaError : FORM.textarea}
                  id="services"
                  rows={3}
                  value={form.services.join("\n")}
                  onChange={(e) => update("services", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                  placeholder="e.g. Consultations, Web development"
                  maxLength={1000}
                />
              </div>
              <FieldError show={step2Errors.services} message="Add at least one service" />
            </div>
            <div>
              <label htmlFor="customers" className={FORM.label}>Who are your typical customers?</label>
              <div className="relative">
                <HiOutlineUserGroup className={FORM.textareaIcon} />
                <textarea
                  className={step2Errors.customers ? FORM.textareaError : FORM.textarea}
                  id="customers"
                  rows={2}
                  value={form.customers}
                  onChange={(e) => update("customers", e.target.value)}
                  placeholder="Describe your audience"
                  maxLength={500}
                />
              </div>
              <FieldError show={step2Errors.customers} message="Describe your customers" />
            </div>
            <div>
              <label htmlFor="differentiation" className={FORM.label}>What makes your business different?</label>
              <div className="relative">
                <HiOutlineLightningBolt className={FORM.textareaIcon} />
                <textarea
                  className={step2Errors.differentiation ? FORM.textareaError : FORM.textarea}
                  id="differentiation"
                  rows={3}
                  value={form.differentiation}
                  onChange={(e) => update("differentiation", e.target.value)}
                  placeholder="Your strengths, unique selling points"
                  maxLength={500}
                />
              </div>
              <FieldError show={step2Errors.differentiation} message="Tell us what makes you different" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Website preferences</h2>
            <div>
              <label className={FORM.label}>
                <span className="inline-flex items-center gap-1.5">
                  <HiOutlinePhotograph className="text-[#444]" /> Do you have a logo?
                </span>
              </label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => update("hasLogo", true)}
                  className={FORM.optionBtn(form.hasLogo === true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => update("hasLogo", false)}
                  className={FORM.optionBtn(form.hasLogo === false)}
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="brandColors" className={FORM.label}>Brand colors (optional)</label>
              <div className="relative">
                <HiOutlineColorSwatch className={FORM.icon} />
                <input
                  className={FORM.input}
                  id="brandColors"
                  value={form.brandColors ?? ""}
                  onChange={(e) => update("brandColors", e.target.value)}
                  placeholder="e.g. #7C5CFF, blue"
                  maxLength={100}
                />
              </div>
            </div>
            <div>
              <label className={FORM.label}>Preferred website style</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("stylePreference", opt.value)}
                    className={FORM.optionBtn(form.stylePreference === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="competitors" className={FORM.label}>Competitor websites (one URL per line, optional)</label>
              <div className="relative">
                <HiOutlineLink className={FORM.textareaIcon} />
                <textarea
                  className={FORM.textarea}
                  id="competitors"
                  rows={2}
                  value={(form.competitors ?? []).join("\n")}
                  onChange={(e) => update("competitors", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                  placeholder="https://..."
                  maxLength={500}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Contact & final details</h2>
            <div>
              <label htmlFor="phone" className={FORM.label}>Phone (optional)</label>
              <div className="relative">
                <HiOutlinePhone className={FORM.icon} />
                <input
                  className={FORM.input}
                  id="phone"
                  type="tel"
                  value={form.phone ?? ""}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1..."
                  maxLength={20}
                />
              </div>
            </div>
            <div>
              <label htmlFor="instagram" className={FORM.label}>Instagram (optional)</label>
              <div className="relative">
                <HiOutlinePhotograph className={FORM.icon} />
                <input
                  className={FORM.input}
                  id="instagram"
                  value={form.instagram ?? ""}
                  onChange={(e) => update("instagram", e.target.value)}
                  placeholder="@username"
                  maxLength={50}
                />
              </div>
            </div>
            <div>
              <label htmlFor="website" className={FORM.label}>Existing website (optional)</label>
              <div className="relative">
                <HiOutlineGlobe className={FORM.icon} />
                <input
                  className={FORM.input}
                  id="website"
                  type="url"
                  value={form.website ?? ""}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://..."
                  maxLength={300}
                />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className={FORM.label}>Additional notes</label>
              <div className="relative">
                <HiOutlinePencil className={FORM.textareaIcon} />
                <textarea
                  className={FORM.textarea}
                  id="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Anything else we should know?"
                  maxLength={1000}
                />
              </div>
            </div>
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-10 items-center">
          {step > 1 && (
            <button type="button" onClick={handleBack} className={FORM.btnSecondary}>
              Back
            </button>
          )}
          <div className="flex-1 min-w-[1rem]" />
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext()}
              className={FORM.btnPrimary}
            >
              Next
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  saveLeadFormForPreview(form);
                  router.push("/get-started/preview");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/50 bg-[#7C5CFF]/10 px-5 py-3 text-sm font-semibold text-[#C4B5FD] transition hover:bg-[#7C5CFF]/20 hover:border-[#7C5CFF]/70"
              >
                <HiOutlineDevicePhoneMobile className="text-lg" aria-hidden />
                View site preview
              </button>
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={FORM.btnPrimary}>
                {isSubmitting ? "Submitting…" : "Submit"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
