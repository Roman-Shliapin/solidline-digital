'use client';
import { services } from "@/data/services";
import useInView from "@/hooks/useInView";

const Services = () => {
    const { ref, isInView } = useInView();
    return (
        <section ref={ref} id="services" className={`py-24 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">what we do</h2>
                <p className="text-[#888] max-w-xl mb-12">we focus on practical digital tools that help small businesses get and manage real client inquiries.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(service => (
                        <div key={service.title} className="bg-[#111] border border-[#222] p-6 rounded-2xl transition-all duration-300 hover:border-[#7C5CFF]/50">
                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-[#888]">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Services;