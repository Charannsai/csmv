import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-transparent border-t border-white/10 text-[#86868B] relative overflow-hidden">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/cerpriselogo.png" alt="Cerprise Logo" width={280} height={80} className="w-auto h-12 lg:h-14 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                        </Link>
                        <p className="text-sm leading-6 max-w-xs">
                            Product engineering, brand identity, technology architecture, and dedicated elite teams.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white tracking-tight">Services</h3>
                                <ul className="mt-6 space-y-4 text-sm">
                                    <li><Link href="/services/software-saas" className="hover:text-white transition-colors">Software & SaaS</Link></li>
                                    <li><Link href="/services/infrastructure" className="hover:text-white transition-colors">Cloud & Infrastructure</Link></li>
                                    <li><Link href="/services/talent-staffing" className="hover:text-white transition-colors">Talent & Staffing</Link></li>
                                    <li><Link href="/services/brand-identity" className="hover:text-white transition-colors">Brand & Digital Identity</Link></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-white tracking-tight">Company</h3>
                                <ul className="mt-6 space-y-4 text-sm">
                                    <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                    <li><Link href="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                                    <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white tracking-tight">Legal</h3>
                                <ul className="mt-6 space-y-4 text-sm">
                                    <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Cerprise Ecosystem. All rights reserved.
                    </p>
                </div>
                <div className="w-full flex justify-center items-end mt-16 select-none pointer-events-none overflow-hidden">
                    <h1 className="text-[14vw] font-black tracking-tighter leading-none text-transparent bg-clip-text opacity-[0.15] md:opacity-[0.25] pt-4" style={{ backgroundImage: "linear-gradient(180deg, #D4AF37 0%, #A38426 40%, transparent 100%)" }}>
                        CERPRISE
                    </h1>
                </div>
            </div>
        </footer>
    );
}
