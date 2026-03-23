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
        containerClass="w-full"
        inputStyle={{
          width: "100%",
          background: "#141414",
          border: "1px solid #222",
          borderRadius: "12px",
          color: "#F5F5F5",
          paddingTop: "12px",
          paddingBottom: "12px",
          paddingLeft: "52px",
          fontSize: "14px",
          outline: "none",
        }}
        buttonStyle={{
          background: "transparent",
          border: "1px solid #222",
          borderRight: "none",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        dropdownStyle={{
          background: "#0A0A0A",
          border: "1px solid #222",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        searchStyle={{
          background: "#141414",
          border: "1px solid #222",
          color: "#F5F5F5",
        }}
      />

      {shouldShowError && <p className="text-red-400 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}

