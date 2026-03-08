"use client";

import { useState } from "react";
import useInView from "@/hooks/useInView";
import { portfolio } from "@/data/portfolio";
import Image from "next/image";

function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-[#1a1a1a] animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

const Portfolio = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="portfolio"
      className={`py-24 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">our work</h2>
        <p className="text-[#888] max-w-xl mb-12">
          clean, fast websites for small businesses — no fluff, just results.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="group block bg-gradient-to-br from-[#141414] to-[#0E0E0E] border border-[#222] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#7C5CFF]/50 hover:shadow-lg hover:shadow-[#7C5CFF]/5"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <ImageWithSkeleton src={item.image} alt={item.title} />
                <span className="absolute top-3 left-3 bg-[#0A0A0A]/90 px-2 py-1 rounded text-xs text-[#7C5CFF] font-medium">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-2 group-hover:text-[#7C5CFF] transition-colors">{item.title}</h3>
                <p className="text-sm text-[#888]">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
