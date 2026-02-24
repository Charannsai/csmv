"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { href: "/", label: "Home" },
    {
        href: "/services",
        label: "Services",
        subItems: [
            {
                title: "We Design and Deliver Reliable Software Systems",
                description: "Product engineering, web applications, SaaS development",
                href: "/services/software-systems"
            },
            {
                title: "We Strengthen and Modernize Technology Infrastructure",
                description: "Architecture advisory, cloud strategy, audits, optimization",
                href: "/services/infrastructure"
            },
            {
                title: "We Extend Your Engineering Team with Proven Talent",
                description: "Vetted developers, embedded teams, flexible staffing",
                href: "/services/engineering-team"
            }
        ]
    },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    // Handle scroll state for navbar blur
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-black/90 backdrop-blur-md border-white/10"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-semibold tracking-tighter text-white group flex items-center gap-3">
                            <span>
                                CSMV.
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
                        {links.map((link) => (
                            <div key={link.href} className="relative group/navitem h-full py-6">
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-1.5 px-1 text-sm font-medium transition-colors hover:text-white",
                                        pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-white" : "text-[#86868B]"
                                    )}
                                >
                                    {link.label}
                                    {link.subItems && <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/navitem:rotate-180" />}
                                </Link>

                                {/* Dropdown menu */}
                                {link.subItems && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/navitem:opacity-100 group-hover/navitem:pointer-events-auto transition-all duration-300 w-[420px]">
                                        <div className="bg-black/95 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-md">
                                            {link.subItems.map((sub, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={sub.href}
                                                    className="block p-4 rounded-xl hover:bg-white/5 transition-all duration-200 group/item"
                                                >
                                                    <h4 className="text-white text-sm font-semibold mb-1.5 leading-snug group-hover/item:text-blue-400 transition-colors">{sub.title}</h4>
                                                    <p className="text-[#86868B] text-xs leading-relaxed">{sub.description}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center">
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center justify-center px-6 py-2 border border-white rounded-full text-sm font-medium text-white hover:bg-white hover:text-black focus:outline-none transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile nav (Animated) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg overflow-hidden"
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            {links.map((link) => (
                                <div key={link.href}>
                                    {link.subItems ? (
                                        <>
                                            <button
                                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-6 py-4 border-l-2 text-base font-medium transition-colors",
                                                    pathname.startsWith(link.href)
                                                        ? "border-white text-white"
                                                        : "border-transparent text-slate-400 hover:bg-white/5 hover:border-slate-700 hover:text-white"
                                                )}
                                            >
                                                <span>{link.label}</span>
                                                <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", mobileServicesOpen && "rotate-180")} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-white/[0.02]"
                                                    >
                                                        {link.subItems.map((sub, idx) => (
                                                            <Link
                                                                key={idx}
                                                                href={sub.href}
                                                                onClick={() => setIsOpen(false)}
                                                                className="block pl-10 pr-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                                                            >
                                                                <h4 className="text-white text-sm font-semibold mb-1 leading-snug">{sub.title}</h4>
                                                                <p className="text-[#86868B] text-xs leading-relaxed">{sub.description}</p>
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "block px-6 py-4 border-l-2 text-base font-medium transition-colors",
                                                pathname === link.href
                                                    ? "border-white text-white"
                                                    : "border-transparent text-slate-400 hover:bg-white/5 hover:border-slate-700 hover:text-white"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 pb-4 px-6">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-center px-4 py-3 rounded-full border border-white text-base font-medium text-black bg-white hover:bg-transparent hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
