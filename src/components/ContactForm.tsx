"use client";

import { useState } from 'react';
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
    const [result, setResult] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "8d575560-0d8d-40b6-acae-b06e198b622e");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setResult("Form Submitted Successfully");
                event.currentTarget.reset();
            } else {
                setResult(data.message || "Error submitting form.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setResult("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={onSubmit} className="relative z-10 flex flex-col justify-between h-full gap-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                    <label htmlFor="first-name" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-3">First name</label>
                    <input type="text" name="first-name" id="first-name" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#86868B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="John" />
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-3">Last name</label>
                    <input type="text" name="last-name" id="last-name" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#86868B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-3">Work Email</label>
                    <input type="email" name="email" id="email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#86868B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="john@enterprise.com" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-xs font-bold tracking-widest uppercase text-white/50 mb-3">Project Details</label>
                    <textarea name="message" id="message" rows={5} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#86868B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Tell us about your technical requirements..." />
                </div>
            </div>

            {result && (
                <div className={`mt-2 text-sm font-semibold tracking-wide ${result === "Form Submitted Successfully" ? "text-green-500" : result === "Sending...." ? "text-blue-500" : "text-red-500"}`}>
                    {result}
                </div>
            )}

            <div className="mt-4">
                <button type="submit" disabled={result === "Sending...."} className="group/btn flex items-center gap-3 w-full sm:w-auto justify-center bg-white text-black px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    {result === "Sending...." ? "Transmitting..." : "Send Transmission"}
                    {result !== "Sending...." && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                </button>
            </div>
        </form>
    );
}
