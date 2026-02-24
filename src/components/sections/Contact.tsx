'use client';
import useInView from "@/hooks/useInView";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
    const { ref, isInView } = useInView();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            project: formData.get("project"),
        }

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        setIsLoading(false);
        if (res.ok) {
            toast.success("message sent! we'll get back to you soon.");
        } else {
            toast.error("something went wrong. please try again.");
        }
    };

    return (
        <>
            <section ref={ref} id="contact" className={`py-24 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                <div className="max-w-xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">let&apos;s talk about your project</h2>
                    <p className="text-[#888] mb-10">tell us a bit about your business and what you&apos;re looking to build. we&apos;ll get back to you within 24 hours.</p>
                    <p className="text-[#888] mb-10">no pressure. no complicated process. just a clear conversation about what makes sense for you.</p>
                    <form className="flex flex-col gap-6" action={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm text-[#888] mb-1 block">your name</label>
                            <input className="bg-[#111] border border-[#222] px-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] transition-colors duration-300 placeholder:text-[#444]" type="text" id="name" name="name" placeholder="Daniel Carter" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm text-[#888] mb-1 block">your email</label>
                            <input className="bg-[#111] border border-[#222] px-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] transition-colors duration-300 placeholder:text-[#444]" type="email" id="email" name="email" placeholder="danielcarter@gmail.com" required />
                        </div>
                        <div>
                            <label htmlFor="project" className="text-sm text-[#888] mb-1 block">tell us about your project</label>
                            <textarea className="bg-[#111] border border-[#222] px-4 py-3 rounded-xl w-full outline-none focus:border-[#7C5CFF] transition-colors duration-300 placeholder:text-[#444]" name="project" id="project" rows={5} placeholder="I need a website for my bakery..." required></textarea>
                        </div>
                        <button type="submit" className="bg-[#7C5CFF] px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#6B4FE0] shadow-lg shadow-[#7C5CFF]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>{isLoading ? "sending..." : "send message"}</button>
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
