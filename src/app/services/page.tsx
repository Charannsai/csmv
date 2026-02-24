import { Metadata } from "next";
import { Code2, Network, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Services | CSMV",
    description: "Pro-grade software engineering, infrastructure modernization, and elite team extension.",
};

const services = [
    {
        title: "We Design and Deliver Reliable Software Systems",
        category: "Software Engineering",
        description: "From product engineering to massive web applications and full-scale SaaS development, we build uncompromising, high-performance systems designed to scale perfectly.",
        icon: Code2,
        href: "/services/software-systems",
        tags: ["Product Engineering", "Web Applications", "SaaS Development"]
    },
    {
        title: "We Strengthen and Modernize Technology Infrastructure",
        category: "Infrastructure & Architecture",
        description: "We audit, optimize, and fortify your tech stack. Through deep architecture advisory and precise cloud strategy, we ensure zero-trust security and flawless resilience.",
        icon: Network,
        href: "/services/infrastructure",
        tags: ["Architecture Advisory", "Cloud Strategy", "Audits & Optimization"]
    },
    {
        title: "We Extend Your Engineering Team with Proven Talent",
        category: "Team Extension",
        description: "Scale your engineering velocity instantly. We provide elite, fully-vetted developers and flexible embedded teams that integrate seamlessly with your internal operations.",
        icon: Users,
        href: "/services/engineering-team",
        tags: ["Vetted Developers", "Embedded Teams", "Flexible Staffing"]
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-none">
                        Uncompromising <br className="hidden md:block" /> Expertise.
                    </h1>
                    <p className="text-lg md:text-xl text-[#86868B] font-medium leading-relaxed">
                        We operate at the absolute highest standard of software execution, delivering elite systems and teams for ambitious enterprises.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <Link
                            href={service.href}
                            key={index}
                            className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover glow effect target */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-[#111111] border border-white/10 flex items-center justify-center text-white relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                                <service.icon className="w-10 h-10 md:w-12 md:h-12 opacity-80" />
                            </div>

                            <div className="flex-1 relative z-10 text-center md:text-left w-full">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-3">{service.category}</p>
                                <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-4 leading-snug group-hover:text-blue-400 transition-colors duration-300">
                                    {service.title}
                                </h2>
                                <p className="text-base md:text-lg text-[#86868B] leading-relaxed mb-6 max-w-2xl mx-auto md:mx-0">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    {service.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 font-medium whitespace-nowrap">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
