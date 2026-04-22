import { Metadata } from "next";
import { Building2, Mail, Phone, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contact | Cerprise",
    description: "Get in touch with enterprise growth consultants, recruiters, and software engineers.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl lg:mx-0 mb-20 md:mb-32">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Contact Us</p>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-none">
                        Let's build <br className="hidden sm:block" /> your backbone.
                    </h1>
                    <p className="text-lg md:text-xl text-[#86868B] leading-relaxed">
                        Reach out for product engineering, infrastructure migrations, brand identity, or talent acquisition. Our technical and operations leaders normally respond within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Contact Info (Side) */}
                    <div className="lg:col-span-5 flex flex-col gap-16">
                        {/* Direct Contacts */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-semibold tracking-tight text-white mb-6">Direct Inquiries</h3>
                            <dl className="space-y-6">
                                <div className="flex gap-x-4 items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                    <dt className="flex-none p-3 rounded-full bg-white/5 text-blue-400">
                                        <Mail className="h-5 w-5" />
                                    </dt>
                                    <dd className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-[#86868B] font-semibold mb-1">Email</span>
                                        <a className="text-white hover:text-blue-400 transition-colors" href="mailto:hello@cerprise.com">
                                            hello@cerprise.com
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4 items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                    <dt className="flex-none p-3 rounded-full bg-white/5 text-blue-400">
                                        <Phone className="h-5 w-5" />
                                    </dt>
                                    <dd className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-[#86868B] font-semibold mb-1">Telephone</span>
                                        <a className="text-white hover:text-blue-400 transition-colors" href="tel:+1(555)123-4567">
                                            +1 (555) 123-4567
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Offices */}
                        <div className="space-y-8 border-t border-white/10 pt-10">
                            <h3 className="text-xl font-semibold tracking-tight text-white">Global Offices</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                                <div className="pl-6 border-l-2 border-white/10 hover:border-blue-400 transition-colors">
                                    <h4 className="text-sm tracking-[0.1em] uppercase text-white/70 font-bold mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-[#86868B]" /> Headquarters
                                    </h4>
                                    <address className="not-italic text-[#86868B] leading-relaxed">
                                        404 Tech Innovation Park<br />
                                        Suite 200, Enterprise Avenue<br />
                                        San Francisco, CA 94107
                                    </address>
                                </div>
                                <div className="pl-6 border-l-2 border-white/10 hover:border-blue-400 transition-colors">
                                    <h4 className="text-sm tracking-[0.1em] uppercase text-white/70 font-bold mb-3 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-[#86868B]" /> EMEA Hub
                                    </h4>
                                    <address className="not-italic text-[#86868B] leading-relaxed">
                                        12 Digital Square<br />
                                        London<br />
                                        EC1A 1BB, UK
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Container (Main) */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 sm:p-12 relative overflow-hidden group h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
