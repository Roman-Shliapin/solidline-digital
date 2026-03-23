'use client';
import { useState } from "react";
import { pricingCategories, currencySymbol } from "@/data/pricingOptions";
import type { Currency } from "@/data/pricingOptions";
import useInView from "@/hooks/useInView";
import { useRouter } from "next/navigation";
import { HiOutlineCalculator, HiOutlineArrowRight } from "react-icons/hi";
import { useT } from "@/hooks/useT";

const PriceCalculator = () => {
    const t = useT();
    const router = useRouter();
    const { ref, isInView } = useInView();
    const [currency, setCurrency] = useState<Currency>("PLN");
    const [selected, setSelected] = useState<Record<string, string[]>>(() => {
        const initial: Record<string, string[]> = {};
        pricingCategories.forEach((cat) => {
            if (cat.type === "radio") {
                initial[cat.id] = [cat.options[0].id];
            } else if (cat.id === "features") {
                initial[cat.id] = ["contact-form"];
            } else {
                initial[cat.id] = [];
            }
        });
        return initial;
    });

    // Deterministic "starting from" estimate (default selections).
    const baseSelected = pricingCategories.reduce<Record<string, string[]>>((acc, cat) => {
        if (cat.type === "radio") {
            acc[cat.id] = [cat.options[0].id];
        } else if (cat.id === "features") {
            acc[cat.id] = ["contact-form"];
        } else {
            acc[cat.id] = [];
        }
        return acc;
    }, {});

    const handleRadio = (categoryId: string, optionId: string) => {
        setSelected((prev) => ({ ...prev, [categoryId]: [optionId] }));
    };

    const handleCheckbox = (categoryId: string, optionId: string) => {
        setSelected((prev) => {
            const current = prev[categoryId] || [];
            const updated = current.includes(optionId)
                ? current.filter((id) => id !== optionId)
                : [...current, optionId];
            return { ...prev, [categoryId]: updated };
        });
    };

    const total = pricingCategories.reduce((sum, cat) => {
        const selectedIds = selected[cat.id] || [];
        return (
            sum +
            cat.options
                .filter((opt) => selectedIds.includes(opt.id))
                .reduce((s, opt) => s + opt.price[currency], 0)
        );
    }, 0);

    const startingTotal = pricingCategories.reduce((sum, cat) => {
        const selectedIds = baseSelected[cat.id] || [];
        return (
            sum +
            cat.options
                .filter((opt) => selectedIds.includes(opt.id))
                .reduce((s, opt) => s + opt.price[currency], 0)
        );
    }, 0);

    const symbol = currencySymbol[currency];

    return (
        <section ref={ref} id="pricing" className={`py-24 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A] transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <HiOutlineCalculator className="text-[#7C5CFF] text-4xl" />
                    <div className="w-full sm:w-auto grid grid-cols-2 bg-[#141414] border border-[#222] rounded-full p-1">
                        <button
                            onClick={() => setCurrency("PLN")}
                            className={`w-full px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${currency === "PLN" ? "bg-[#7C5CFF] text-white" : "text-[#888] hover:text-[#F5F5F5]"}`}
                        >
                            PLN (zł)
                        </button>
                        <button
                            onClick={() => setCurrency("EUR")}
                            className={`w-full px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${currency === "EUR" ? "bg-[#7C5CFF] text-white" : "text-[#888] hover:text-[#F5F5F5]"}`}
                        >
                            EUR (€)
                        </button>
                    </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("sections.pricing.title")}</h2>
                <p className="text-[#888] max-w-xl mb-6">{t("sections.pricing.subtitle")}</p>

                <p className="text-[#888] text-sm max-w-xl mb-12">
                    {t("sections.pricing.microcopy")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {pricingCategories.map((cat) => (
                        <div key={cat.id} className="bg-gradient-to-br from-[#141414] to-[#0E0E0E] border border-[#222] p-6 rounded-2xl">
                            <h3 className="text-lg font-semibold mb-4">{t(cat.titleKey)}</h3>
                            <div className="flex flex-col gap-3">
                                {cat.options.map((opt) => {
                                    const isSelected = (selected[cat.id] || []).includes(opt.id);
                                    const price = opt.price[currency];
                                    const isMostPopular = cat.id === "website-type" && opt.id === "landing";
                                    return (
                                        <label
                                            key={opt.id}
                                            className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 border ${isSelected ? "border-[#7C5CFF]/50 bg-[#7C5CFF]/5" : "border-[#222] hover:border-[#333]"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type={cat.type}
                                                    name={cat.id}
                                                    checked={isSelected}
                                                    onChange={() => cat.type === "radio" ? handleRadio(cat.id, opt.id) : handleCheckbox(cat.id, opt.id)}
                                                    className="hidden"
                                                />
                                                <span className={`w-5 h-5 rounded-${cat.type === "radio" ? "full" : "md"} border-2 flex items-center justify-center transition-colors duration-300 ${isSelected ? "border-[#7C5CFF] bg-[#7C5CFF]" : "border-[#444]"}`}>
                                                    {isSelected && (
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#F5F5F5]">{t(opt.labelKey)}</span>
                                                    {isMostPopular && (
                                                        <span className="inline-flex items-center justify-center rounded-full bg-[#7C5CFF]/15 text-[#C4B5FD] border border-[#7C5CFF]/30 px-2 py-0.5 text-[10px] font-semibold">
                                                            Most popular
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {price > 0 && (
                                                <span className="text-[#888] text-sm">{price} {symbol}</span>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-[#141414] to-[#0E0E0E] border border-[#222] p-8 rounded-2xl">
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-[#888] text-sm mb-2">{t("sections.pricing.estimatedPriceLabel")}</p>
                            <p className="text-4xl sm:text-5xl font-bold text-[#7C5CFF] transition-all duration-300">
                                {total} {symbol}
                            </p>
                            <p className="text-[#888] text-sm mt-4 border-l-2 border-[#7C5CFF] pl-4">
                                {t("sections.pricing.estimatedPriceFrom")} {startingTotal} {symbol}. {t("sections.pricing.estimatedPriceDependsOn")}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => router.push("/get-started")}
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#6B4FE0] hover:-translate-y-0.5 shadow-lg shadow-[#7C5CFF]/20"
                            >
                                {t("sections.pricing.ctaStrong")} <HiOutlineArrowRight />
                            </button>
                            <p className="text-[#888] text-xs mt-1">
                                {t("sections.pricing.trustText")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceCalculator;
