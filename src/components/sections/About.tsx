'use client';
import useInView from "@/hooks/useInView";
import { useT } from "@/hooks/useT";

const About = () => {
    const t = useT();
    const { ref, isInView } = useInView();
    return (
        <section ref={ref} id="about" className={`py-24 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A] transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("sections.about.title")}</h2>
                <p className="text-[#999] text-lg mb-6 leading-relaxed">{t("sections.about.p1")}</p>
                <p className="text-[#999] text-lg mb-6 leading-relaxed">{t("sections.about.p2")}</p>
                <p className="text-[#F5F5F5] text-lg font-medium border-l-2 border-[#7C5CFF] pl-6">{t("sections.about.quote")}</p>
            </div>
        </section>
    )
};

export default About;
