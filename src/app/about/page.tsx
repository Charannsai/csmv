import { Metadata } from "next";
import { Shield, Zap, Globe, Cpu } from "lucide-react";
import SceneBackground from "@/components/3d/SceneBackground";

export const metadata: Metadata = {
    title: "About Us | CSMV",
    description: "Learn more about CSMV's mission, standard, and expertise.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
            <SceneBackground />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl lg:mx-0 mb-24">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Who we are</p>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-none">
                        Built for <br className="hidden sm:block" /> the Future.
                    </h1>
                    <p className="text-lg md:text-xl text-[#86868B] leading-relaxed">
                        CSMV is a premier technology engineering firm specializing in architecting modern tech stacks, implementing high-grade protocols, and building robust digital products.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
                    <div>
                        <div className="mb-16">
                            <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Our Mission</h3>
                            <p className="text-base md:text-lg leading-relaxed text-[#86868B]">
                                To simplify complex enterprise technology. We believe in building resilient infrastructure that allows businesses to scale rapidly without worrying about technical debt, security breaches, or system downtimes. Our approach integrates closely with your leadership teams to guarantee outcomes, not just deliverables.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">The Engineering Standard</h3>
                            <p className="text-base md:text-lg leading-relaxed text-[#86868B]">
                                CSMV prides itself on meticulous code quality, cloud-native operational standards, and an unyielding commitment to security. Every engineer in our firm operates with an enterprise-level maturity to ensure that mission-critical systems run flawlessly around the clock.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="w-5 h-5 text-blue-400" />
                                <dt className="text-sm font-medium tracking-wide text-white/50 uppercase">Global Reach</dt>
                            </div>
                            <dd className="text-4xl font-semibold tracking-tight text-white">12<span className="text-2xl text-white/40 ml-1">Countries</span></dd>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Cpu className="w-5 h-5 text-blue-400" />
                                <dt className="text-sm font-medium tracking-wide text-white/50 uppercase">Enterprise Clients</dt>
                            </div>
                            <dd className="text-4xl font-semibold tracking-tight text-white">150<span className="text-2xl text-white/40 ml-1">+</span></dd>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="w-5 h-5 text-blue-400" />
                                <dt className="text-sm font-medium tracking-wide text-white/50 uppercase">Uptime Record</dt>
                            </div>
                            <dd className="text-4xl font-semibold tracking-tight text-white">99.9<span className="text-2xl text-white/40 ml-1">%</span></dd>
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-blue-400" />
                                <dt className="text-sm font-medium tracking-wide text-white/50 uppercase">Security Breaches</dt>
                            </div>
                            <dd className="text-4xl font-semibold tracking-tight text-white">0</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
