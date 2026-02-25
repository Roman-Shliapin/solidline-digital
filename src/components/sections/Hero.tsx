import { HiOutlineArrowRight } from "react-icons/hi";

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center text-center">
            <div className="max-w-2xl mx-auto px-6">
                <p className="text-sm text-[#888] tracking-widest uppercase mb-6" style={{ animation: "fade-up 0.8s ease-out forwards" }}>SolidLine Digital</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F5F5F5] to-[#7C5CFF] bg-clip-text text-transparent" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.2s forwards" }}>Simple Websites That Bring Real Clients</h1>
                <p className="text-lg text-[#888] mb-10" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.4s forwards" }}>we build clean, fast websites for small businesses that want clarity, structure, and results — not unnecessary complexity.</p>
                <a href="#contact" className="inline-flex items-center gap-2 bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#6B4FE0] hover:-translate-y-0.5 shadow-lg shadow-[#7C5CFF]/20" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.6s forwards" }}>see how it works <HiOutlineArrowRight /></a>
            </div>
        </section>
    )
};

export default Hero;
