'use client';
import { services } from "@/data/services";
import useInView from "@/hooks/useInView";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { useT } from "@/hooks/useT";

const Services = () => {
    const t = useT();
    const { ref, isInView } = useInView();
    return (
        <section ref={ref} id="services" className={`py-24 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("sections.services.title")}</h2>
                <p className="text-[#888] max-w-xl mb-12">{t("sections.services.subtitle")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(service => (
                        <div key={service.titleKey} className="bg-gradient-to-br from-[#141414] to-[#0E0E0E] border border-[#222] p-8 rounded-2xl transition-all duration-300 hover:border-[#7C5CFF]/50 hover:shadow-lg hover:shadow-[#7C5CFF]/5">
                            <ServiceIcon name={service.icon} className="text-[#7C5CFF] text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-3">{t(service.titleKey)}</h3>
                            <p className="text-[#888]">{t(service.descriptionKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Services;