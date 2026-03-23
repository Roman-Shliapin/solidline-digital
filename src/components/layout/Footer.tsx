 "use client";

import { useT } from "@/hooks/useT";

const Footer = () => {
    const t = useT();
    return (
        <footer className="py-12 border-t border-[#222] bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <p className="text-sm text-[#888]">© {new Date().getFullYear()} {t("common.brand")}</p>
                <p className="text-sm text-[#888] mt-1">
                    {t("footer.contactLabel")}:{" "}
                    <a href={`mailto:${t("footer.email")}`} className="text-[#7C5CFF] hover:underline">
                      {t("footer.email")}
                    </a>
                </p>
            </div>
        </footer>
    )
};

export default Footer;