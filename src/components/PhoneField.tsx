"use client";

import { useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useT } from "@/hooks/useT";

function digitsOnly(s: string): string {
  return (s ?? "").replace(/\D/g, "");
}

function toInternationalPlusDigits(raw: string): string {
  const digits = digitsOnly(raw);
  return digits ? `+${digits}` : "";
}

export default function PhoneField({
  id = "phone",
  value,
  onChange,
  showError,
}: {
  id?: string;
  value?: string;
  onChange: (next: string) => void;
  showError?: boolean;
}) {
  const t = useT();
  const [touched, setTouched] = useState(false);

  const digits = useMemo(() => digitsOnly(value ?? ""), [value]);
  const valid = digits.length === 0 || digits.length >= 8;

  const shouldShowError = Boolean(showError || touched) && !valid;
  const errorMessage = t("form.errors.phoneInvalid");

  return (
    <div>
      <PhoneInput
        country="pl"
        enableSearch
        preferredCountries={[]}
        value={value ?? ""}
        onChange={(raw) => onChange(toInternationalPlusDigits(raw))}
        inputProps={{
          id,
          name: id,
          autoComplete: "tel",
          inputMode: "tel",
        }}
        onBlur={() => setTouched(true)}
        countryCodeEditable={false}
        containerClass="sl-phone w-full"
        inputClass={`sl-phone-input${shouldShowError ? " sl-phone-input-error" : ""}`}
        buttonClass="sl-phone-button"
        dropdownClass="sl-phone-dropdown"
        searchClass="sl-phone-search"
      />

      {shouldShowError && <p className="text-red-400 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}

