'use client';
import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222] z-50">
            <div className="flex items-center justify-between max-w-5xl mx-auto px-6 py-4">
                <a href="#hero" className="font-bold text-lg">SolidLine Digital</a>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#F5F5F5] hover:-translate-y-0.5">
                    {isOpen ? "✕" : "☰"}
                </button>
                <nav className="hidden md:block">
                    <ul className="flex gap-8 list-none">
                        <li><a href="#services" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">services</a></li>
                        <li><a href="#about" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">about</a></li>
                        <li><a href="#contact" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">contact</a></li>
                    </ul>
                </nav>
            </div>
            <nav className={`md:hidden overflow-hidden transition-all duration-300 absolute left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-md ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}>
                <ul className="flex flex-col gap-4 list-none px-6 py-4">
                    <li><a href="#services" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">services</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">about</a></li>
                    <li><a href="#contact" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">contact</a></li>
                </ul>
            </nav>

        </header>
    )
};

export default Header;