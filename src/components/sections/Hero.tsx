"use client";

import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useT } from "@/hooks/useT";

const Hero = () => {
    const t = useT();
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center text-center">
            <div className="max-w-2xl mx-auto px-6">
                <p className="text-sm text-[#888] tracking-widest uppercase mb-6" style={{ animation: "fade-up 0.8s ease-out forwards" }}>{t("hero.brand")}</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F5F5F5] to-[#7C5CFF] bg-clip-text text-transparent" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.2s forwards" }}>{t("hero.title")}</h1>
                <p className="text-lg text-[#888] mb-10" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.4s forwards" }}>{t("hero.subtitle")}</p>
                <Link href="/get-started" className="inline-flex items-center gap-2 bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#6B4FE0] hover:-translate-y-0.5 shadow-lg shadow-[#7C5CFF]/20" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.6s forwards" }}>{t("hero.cta")} <HiOutlineArrowRight /></Link>
            </div>
        </section>
    )
};

export default Hero;
