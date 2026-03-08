'use client';

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222] z-50">
      <div className="flex items-center justify-between max-w-5xl mx-auto px-6 py-4">
        <a href="#hero" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">
          SolidLine Digital
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F5F5F5] text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 hover:bg-[#222]"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">services</a>
          <a href="#pricing" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">pricing</a>
          <a href="#portfolio" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">portfolio</a>
          <a href="#about" className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">about</a>
          <Link
            href="/get-started"
            className="bg-[#7C5CFF] px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#6B4FE0]"
          >
            get started
          </Link>
        </nav>
      </div>
      <nav
        className={`md:hidden overflow-hidden transition-all duration-300 absolute left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222] ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-b-0"}`}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          <a href="#services" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">services</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">pricing</a>
          <a href="#portfolio" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">portfolio</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="text-[#888] hover:text-[#F5F5F5] transition-colors duration-300">about</a>
          <Link
            href="/get-started"
            onClick={() => setIsOpen(false)}
            className="bg-[#7C5CFF] px-5 py-2 rounded-full text-sm font-semibold text-center transition-all duration-300 hover:bg-[#6B4FE0]"
          >
            get started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
