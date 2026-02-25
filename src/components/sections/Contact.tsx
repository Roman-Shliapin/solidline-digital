'use client';
import useInView from "@/hooks/useInView";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineChatAlt2, HiOutlineUser, HiOutlineMail, HiOutlinePencil } from "react-icons/hi";

const Contact = () => {
    const { ref, isInView } = useInView();
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);

        try {
            const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                project: formData.get("project"),
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success("message sent! we'll get back to you soon.");
                formRef.current?.reset();
            } else {
                toast.error("something went wrong. please try again.");
            }
        } catch {
            toast.error("network error. check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section ref={ref} id="contact" className={`py-24 bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="max-w-xl mx-auto px-6">
                    <HiOutlineChatAlt2 className="text-[#7C5CFF] text-4xl mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">let&apos;s talk about your project</h2>
                    <p className="text-[#888] mb-10">tell us a bit about your business and what you&apos;re looking to build. we&apos;ll get back to you within 24 hours.</p>
                    <p className="text-[#888] mb-10">no pressure. no complicated process. just a clear conversation about what makes sense for you.</p>
                    <form ref={formRef} className="flex flex-col gap-6" action={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm text-[#888] mb-1 block">your name</label>
                            <div className="relative">
                                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-lg" />
                                <input className="bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 placeholder:text-[#444]" type="text" id="name" name="name" placeholder="Daniel Carter" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm text-[#888] mb-1 block">your email</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-lg" />
                                <input className="bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 placeholder:text-[#444]" type="email" id="email" name="email" placeholder="danielcarter@gmail.com" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="project" className="text-sm text-[#888] mb-1 block">tell us about your project</label>
                            <div className="relative">
                                <HiOutlinePencil className="absolute left-3 top-4 text-[#444] text-lg" />
                                <textarea className="bg-[#141414] border border-[#222] pl-10 pr-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] focus:shadow-sm focus:shadow-[#7C5CFF]/10 transition-all duration-300 placeholder:text-[#444]" name="project" id="project" rows={5} placeholder="I need a website for my bakery..." required></textarea>
                            </div>
                        </div>
                        <button type="submit" className="bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#6B4FE0] hover:-translate-y-0.5 shadow-lg shadow-[#7C5CFF]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0" disabled={isLoading}>{isLoading ? "sending..." : "send message"}</button>
                    </form>
                </div>
            </section>
            <Toaster position="top-right" toastOptions={{
                style: {
                    background: "#111",
                    color: "#F5F5F5",
                    border: "1px solid #222",
                },
            }} />
        </>
    )
};

export default Contact;
