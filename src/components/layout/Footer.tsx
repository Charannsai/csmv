import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#030014] border-t border-white/5 text-slate-400 relative overflow-hidden">
            {/* Background glow for footer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 relative z-10">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                            </span>
                            <span>Aura <span className="text-slate-500 font-light">IT</span></span>
                        </Link>
                        <p className="text-sm leading-6 text-slate-500 max-w-xs">
                            Transforming businesses through next-generation cloud architectures and bespoke engineering solutions.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-slate-500 hover:text-primary transition-colors hover:scale-110">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors hover:scale-110">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-500 hover:text-primary transition-colors hover:scale-110">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white tracking-widest uppercase">Expertise</h3>
                                <ul className="mt-6 space-y-4 text-sm">
                                    <li><Link href="/services" className="hover:text-primary transition-colors">Cloud Matrix</Link></li>
                                    <li><Link href="/services" className="hover:text-primary transition-colors">Zero-Trust Sec</Link></li>
                                    <li><Link href="/services" className="hover:text-primary transition-colors">Data Pipelines</Link></li>
                                    <li><Link href="/services" className="hover:text-primary transition-colors">Architecture Audits</Link></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-white tracking-widest uppercase">Firm</h3>
                                <ul className="mt-6 space-y-4 text-sm">
                                    <li><Link href="/about" className="hover:text-primary transition-colors">Leadership</Link></li>
                                    <li><Link href="/contact" className="hover:text-primary transition-colors">Engineering Careers</Link></li>
                                    <li><Link href="/contact" className="hover:text-primary transition-colors">Global Offices</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white tracking-widest uppercase">Legal</h3>
                                <ul className="mt-6 space-y-4 text-sm">
                                    <li><Link href="#" className="hover:text-primary transition-colors">Privacy Paradigm</Link></li>
                                    <li><Link href="#" className="hover:text-primary transition-colors">Terms of Operations</Link></li>
                                    <li><Link href="#" className="hover:text-primary transition-colors">SOC2 Verification</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Aura IT Consulting. Systems Operational.
                    </p>
                    <div className="mt-4 md:mt-0 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-emerald-500 font-mono">All Systems Nominal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
