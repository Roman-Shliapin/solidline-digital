"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineUser, HiOutlineMail, HiOutlineOfficeBuilding, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineViewGrid, HiOutlineUserGroup, HiOutlinePhotograph, HiOutlineGlobe } from "react-icons/hi";
import type { BusinessType, LeadFormData, StylePreference } from "@/types/lead";
import { FORM } from "@/styles/forms";
import { useT } from "@/hooks/useT";
import PhoneField from "@/components/PhoneField";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

const BUSINESS_OPTIONS: { value: BusinessType; labelKey: string }[] = [
  { value: "local-service", labelKey: "form.businessTypes.local-service" },
  { value: "online-business", labelKey: "form.businessTypes.online-business" },
  { value: "personal-brand", labelKey: "form.businessTypes.personal-brand" },
  { value: "small-company", labelKey: "form.businessTypes.small-company" },
];

const STYLE_OPTIONS: { value: StylePreference; labelKey: string }[] = [
  { value: "modern", labelKey: "form.styles.modern" },
  { value: "minimal", labelKey: "form.styles.minimal" },
  { value: "bold", labelKey: "form.styles.bold" },
  { value: "unsure", labelKey: "form.styles.unsure" },
];

const initialForm: LeadFormData = {
  name: "",
  email: "",
  businessName: "",
  businessType: "local-service",
  description: "",
  services: [],
  customers: "",
  stylePreference: "modern",
  phone: "",
  instagram: "",
  website: "",
};

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return <p className="text-red-400 text-xs mt-1">{message}</p>;
}

function FormMessage({ type, message }: { type: "error" | "success"; message: string }) {
  const bg = type === "error" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-green-500/10 border-green-500/30 text-green-400";
  return <div className={`px-4 py-3 rounded-xl border text-sm mb-6 ${bg}`}>{message}</div>;
}

export default function GetStartedPage() {
  const TOTAL_STEPS = 3;
  const router = useRouter();
  const t = useT();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [honeypot, setHoneypot] = useState("");

  const [attemptedStep, setAttemptedStep] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const step1Errors = {
    name: !form.name.trim(),
    email: !form.email.trim() || !isValidEmail(form.email),
    businessName: !form.businessName.trim(),
    businessType: !form.businessType,
  };

  const step2Errors = {
    description: !form.description.trim(),
  };

  const validateStep1 = () => !Object.values(step1Errors).some(Boolean);
  const validateStep2 = () => !step2Errors.description;

  const handleContinue = () => {
    setError("");
    setAttemptedStep(step);

    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }
  };

  const handleBack = () => {
    setError("");
    setAttemptedStep(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    setError("");

    const phoneDigits = (form.phone ?? "").replace(/\D/g, "");
    const isPhoneValid = phoneDigits.length === 0 || phoneDigits.length >= 8;

    // Safety validation even though UI gates the steps
    if (!validateStep1()) {
      setAttemptedStep(1);
      setStep(1);
      return;
    }
    if (!validateStep2()) {
      setAttemptedStep(2);
      setStep(2);
      return;
    }

    if (!isPhoneValid) {
      setAttemptedStep(3);
    }

    setIsSubmitting(true);
    try {
      const payloadPhone = isPhoneValid ? form.phone : undefined;
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: honeypot, phone: payloadPhone }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? t("form.errors.submitFailed"));
        return;
      }

      router.push("/get-started/thank-you");
    } catch {
      setError(t("form.errors.networkError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = `${(step / TOTAL_STEPS) * 100}%`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] text-white">
      <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <Link href="/" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">
          {t("common.brand")}
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className={`${FORM.btnSecondary} hidden sm:inline-flex`}>
            {t("common.home")}
          </Link>
          <LanguageSwitcher mode="inline" />
        </div>
      </div>

      <div className="max-w-xl mx-auto py-16 px-6">
        <div className="flex items-center gap-3 mb-8">
          <HiOutlineRocketLaunch className="text-[#7C5CFF] w-10 h-10 shrink-0" />
          <div>
            <h1 className="text-xl font-bold">{t("form.pageTitle")}</h1>
            <p className="text-[#7C5CFF] font-medium text-sm">
              {t("form.step")} {step} / {TOTAL_STEPS}
            </p>
          </div>
        </div>

        <div className="h-1.5 bg-[#222] rounded-full mb-10 overflow-hidden">
          <div className="h-full bg-[#7C5CFF] rounded-full transition-all duration-300" style={{ width: progressWidth }} />
        </div>

        {error && <FormMessage type="error" message={error} />}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{t("form.basicTitle")}</h2>

            <div>
              <label htmlFor="name" className={FORM.label}>
                {t("form.labels.name")} <span className="text-red-400 ml-1">{t("form.required")}</span>
              </label>
              <div className="relative">
                <HiOutlineUser className={FORM.icon} />
                <input
                  className={attemptedStep === 1 && step1Errors.name ? FORM.inputError : FORM.input}
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={t("form.placeholders.name")}
                  maxLength={100}
                />
              </div>
              <FieldError show={attemptedStep === 1 && step1Errors.name} message={t("form.errors.nameRequired")} />
            </div>

            <div>
              <label htmlFor="email" className={FORM.label}>
                {t("form.labels.email")} <span className="text-red-400 ml-1">{t("form.required")}</span>
              </label>
              <div className="relative">
                <HiOutlineMail className={FORM.icon} />
                <input
                  className={attemptedStep === 1 && step1Errors.email ? FORM.inputError : FORM.input}
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={t("form.placeholders.email")}
                  maxLength={200}
                  inputMode="email"
                  autoComplete="email"
                />
              </div>
              <FieldError
                show={attemptedStep === 1 && step1Errors.email}
                message={!form.email.trim() ? t("form.errors.emailRequired") : t("form.errors.emailInvalid")}
              />
            </div>

            <div>
              <label htmlFor="businessName" className={FORM.label}>
                {t("form.labels.businessName")} <span className="text-red-400 ml-1">{t("form.required")}</span>
              </label>
              <div className="relative">
                <HiOutlineOfficeBuilding className={FORM.icon} />
                <input
                  className={attemptedStep === 1 && step1Errors.businessName ? FORM.inputError : FORM.input}
                  id="businessName"
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder={t("form.placeholders.businessName")}
                  maxLength={150}
                  autoComplete="organization"
                />
              </div>
              <FieldError show={attemptedStep === 1 && step1Errors.businessName} message={t("form.errors.businessNameRequired")} />
            </div>

            <div>
              <label htmlFor="businessType" className={FORM.label}>
                <span className="inline-flex items-center gap-1.5">
                  <HiOutlineBriefcase className="text-[#444]" /> {t("form.labels.businessType")}
                  <span className="text-red-400 ml-1">{t("form.required")}</span>
                </span>
              </label>

              <div
                className={
                  attemptedStep === 1 && step1Errors.businessType
                    ? "rounded-xl border border-red-500/50 p-2"
                    : "rounded-xl border border-[#222] p-2"
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BUSINESS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("businessType", opt.value)}
                      className={FORM.optionBtn(form.businessType === opt.value)}
                    >
                      {t(opt.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
              <FieldError show={attemptedStep === 1 && step1Errors.businessType} message={t("form.errors.businessTypeRequired")} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{t("form.step2Title")}</h2>

            <div>
              <label htmlFor="description" className={FORM.label}>
                {t("form.labels.description")} <span className="text-red-400 ml-1">{t("form.required")}</span>
              </label>
              <div className="relative">
                <HiOutlineDocumentText className={FORM.textareaIcon} />
                <textarea
                  className={attemptedStep === 2 && step2Errors.description ? FORM.textareaError : FORM.textarea}
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder={t("form.placeholders.description")}
                  maxLength={500}
                />
              </div>
              <FieldError show={attemptedStep === 2 && step2Errors.description} message={t("form.errors.descriptionRequired")} />
              <p className="text-[#666] text-xs mt-2">
                {form.description.trim().length}/500
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{t("form.step3Title")}</h2>

            <div>
              <label htmlFor="services" className={FORM.label}>
                {t("form.labels.services")}
              </label>
              <div className="relative">
                <HiOutlineViewGrid className={FORM.textareaIcon} />
                <textarea
                  className={FORM.textarea}
                  id="services"
                  rows={3}
                  value={form.services?.join("\n") ?? ""}
                  onChange={(e) =>
                    update(
                      "services",
                      e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .slice(0, 20)
                    )
                  }
                  placeholder={t("form.placeholders.services")}
                  maxLength={500}
                />
              </div>
            </div>

            <div>
              <label htmlFor="customers" className={FORM.label}>
                {t("form.labels.customers")}
              </label>
              <div className="relative">
                <HiOutlineUserGroup className={FORM.textareaIcon} />
                <textarea
                  className={FORM.textarea}
                  id="customers"
                  rows={2}
                  value={form.customers ?? ""}
                  onChange={(e) => update("customers", e.target.value)}
                  placeholder={t("form.placeholders.customers")}
                  maxLength={500}
                />
              </div>
            </div>

            <div>
              <label htmlFor="stylePreference" className={FORM.label}>
                {t("form.labels.stylePreference")}
              </label>
              <div className={FORM.selectWrapper}>
                <select
                  id="stylePreference"
                  className={FORM.select}
                  value={form.stylePreference ?? "modern"}
                  onChange={(e) => update("stylePreference", e.target.value as StylePreference)}
                >
                  {STYLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={FORM.label}>
                {t("form.labels.phone")}
              </label>
              <PhoneField
                id="phone"
                value={form.phone}
                onChange={(next) => update("phone", next)}
                showError={attemptedStep === 3}
              />
            </div>

            <div>
              <label htmlFor="instagram" className={FORM.label}>
                {t("form.labels.instagram")}
              </label>
              <div className="relative">
                <HiOutlinePhotograph className={FORM.icon} />
                <input
                  className={FORM.input}
                  id="instagram"
                  value={form.instagram ?? ""}
                  onChange={(e) => update("instagram", e.target.value)}
                  placeholder={t("form.placeholders.instagram")}
                  maxLength={50}
                  inputMode="url"
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className={FORM.label}>
                {t("form.labels.website")}
              </label>
              <div className="relative">
                <HiOutlineGlobe className={FORM.icon} />
                <input
                  className={FORM.input}
                  id="website"
                  type="url"
                  value={form.website ?? ""}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder={t("form.placeholders.website")}
                  maxLength={300}
                  autoComplete="url"
                />
              </div>
            </div>
          </div>
        )}

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

        <div className="flex flex-wrap gap-3 mt-10 items-center">
          {step > 1 && (
            <button type="button" onClick={handleBack} className={FORM.btnSecondary}>
              {t("form.back")}
            </button>
          )}

          <div className="flex-1 min-w-[1rem]" />

          {step < 3 ? (
            <button type="button" onClick={handleContinue} className={FORM.btnPrimary}>
              {t("form.continue")}
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className={FORM.btnPrimary}>
              {isSubmitting ? t("form.submitting") : t("form.create")}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

