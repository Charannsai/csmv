import { Metadata } from "next";
import { Cloud, Server, ShieldCheck, Database, FileCode, Search, Terminal } from "lucide-react";

export const metadata: Metadata = {
    title: "Services | Aura IT Consulting",
    description: "Comprehensive IT consulting, cloud solutions, and software engineering services.",
};

const services = [
    {
        name: "Cloud Architecture & Migration",
        description: "Design, deploy, and execute seamless migrations to AWS, Azure, and Google Cloud with optimized cost infrastructures.",
        icon: Cloud,
    },
    {
        name: "Enterprise Software Engineering",
        description: "End-to-end custom software development. We build scalable backend systems, CRMs, and highly interactive user interfaces.",
        icon: FileCode,
    },
    {
        name: "Cybersecurity & Risk Management",
        description: "Identify vulnerabilities before they happen. Pen testing, security audits, and SOC 2 / HIPAA compliance consulting.",
        icon: ShieldCheck,
    },
    {
        name: "Data Engineering & Analytics",
        description: "Transform raw data into strategic assets. Data pipelines, warehouse optimization, and AI model deployments.",
        icon: Database,
    },
    {
        name: "DevOps & Infrastructure",
        description: "Establish robust CI/CD pipelines, containerization with Kubernetes, and Infrastructure as Code using Terraform.",
        icon: Terminal,
    },
    {
        name: "System Audits & Optimization",
        description: "Consultative deep-dives into your current tech stack. Identifying bottlenecks and proposing high ROI architectural shifts.",
        icon: Search,
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-sm font-semibold tracking-wide uppercase text-primary">Capabilities</h1>
                    <p className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        Technical Expertise. <br /> Delivered at Scale.
                    </p>
                    <p className="mt-4 text-xl text-slate-500">
                        We operate at the intersection of business strategy and high-end software execution.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
                        {services.map((service) => (
                            <div key={service.name} className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                                <div className="absolute h-12 w-12 flex items-center justify-center rounded-xl bg-primary shadow-sm text-white">
                                    <service.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-16">
                                    <h3 className="text-xl font-semibold leading-7 text-slate-900">{service.name}</h3>
                                    <p className="mt-3 text-base leading-7 text-slate-600">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
