'use client';

import Link from "next/link";
import useInView from "@/hooks/useInView";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { useT } from "@/hooks/useT";

const Contact = () => {
  const t = useT();
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      id="contact"
      className={`py-24 bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="max-w-xl mx-auto px-6 text-center">
        <HiOutlineChatAlt2 className="text-[#7C5CFF] text-4xl mb-4 mx-auto" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("sections.contact.title")}</h2>
        <p className="text-[#888] mb-6">{t("sections.contact.p1")}</p>
        <p className="text-[#888] mb-10">{t("sections.contact.p2")}</p>
        <Link
          href="/get-started"
          className="inline-block bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#6B4FE0] hover:-translate-y-0.5 shadow-lg shadow-[#7C5CFF]/20"
        >
          {t("sections.contact.cta")}
        </Link>
      </div>
    </section>
  );
};

export default Contact;
