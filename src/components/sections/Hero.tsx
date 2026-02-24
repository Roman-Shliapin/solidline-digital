const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center text-center">
            <div className="max-w-2xl mx-auto px-6">
                <p className="text-sm text-[#888] tracking-widest uppercase mb-6">SolidLine Digital</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">simple websites that bring real clients</h1>
                <p className="text-lg text-[#888] mb-10">we build clean, fast websites for small businesses that want clarity, structure, and results — not unnecessary complexity.</p>
                <a href="#contact" className="inline-block bg-[#7C5CFF] px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#6B4FE0] shadow-lg shadow-[#7C5CFF]/20">see how it works</a>
            </div>
        </section>
    )
};

export default Hero;