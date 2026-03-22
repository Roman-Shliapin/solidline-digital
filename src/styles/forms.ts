/**
 * Shared form styles for get-started flow (preview + details).
 * One look across all steps.
 */
export const FORM = {
  label: "text-sm text-[#888] mb-1 block",
  input:
    "bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 placeholder:text-[#444]",
  inputError:
    "bg-[#141414] border border-red-500/50 pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-red-500 placeholder:text-[#444]",
  textarea:
    "bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 resize-none placeholder:text-[#444]",
  textareaError:
    "bg-[#141414] border border-red-500/50 pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-red-500 resize-none placeholder:text-[#444]",
  icon: "absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-lg pointer-events-none",
  textareaIcon: "absolute left-3 top-4 text-[#444] text-lg pointer-events-none",
  optionBtn: (active: boolean) =>
    `px-4 py-3 rounded-xl border text-left transition-all flex-1 min-w-0 ${active ? "border-[#7C5CFF] bg-[#7C5CFF]/10 text-[#7C5CFF]" : "border-[#222] bg-[#141414] text-[#888] hover:border-[#333] hover:text-[#ccc]"}`,
  btnPrimary:
    "bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all hover:bg-[#6B4FE0] disabled:opacity-50 disabled:cursor-not-allowed",
  btnSecondary:
    "px-6 py-3 rounded-full border border-[#222] text-[#888] hover:border-[#444] hover:text-white transition-all",
  messageError: "px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm",
  /** Select (dropdown): same as input + no default arrow, space for custom chevron */
  select:
    "bg-[#141414] border border-[#222] pl-10 pr-10 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 appearance-none cursor-pointer text-white",
  selectWrapper: "relative",
  selectChevron: "absolute right-3 top-1/2 -translate-y-1/2 text-[#666] pointer-events-none text-lg",
} as const;
