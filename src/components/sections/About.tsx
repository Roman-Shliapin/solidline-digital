'use client';
import useInView from "@/hooks/useInView";

const About = () => {
    const { ref, isInView } = useInView();
    return (
        <section ref={ref} id="about" className={`py-24 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0A0A0A] transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">about SolidLine Digital</h2>
                <p className="text-[#999] text-lg mb-6 leading-relaxed">solidline digital is a small, focused web studio built around a simple idea — most small businesses don&apos;t need complex systems. they need clarity, structure, and a website that actually works.</p>
                <p className="text-[#999] text-lg mb-6 leading-relaxed">we build clean, fast websites and set up simple automation so business owners can focus on their work instead of chasing messages or fixing technical problems.</p>
                <p className="text-[#F5F5F5] text-lg font-medium border-l-2 border-[#7C5CFF] pl-6">no inflated promises. no unnecessary features. just practical solutions that make sense.</p>
            </div>
        </section>
    )
};

export default About;
