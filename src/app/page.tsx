"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Shield, ChevronRight, Server, Code, Layers, Cpu, Globe2, Activity, Fingerprint, Lock, Zap, Users } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/3d/Scene";
import { ReactLenis } from "lenis/react";

// --- CUSTOM INTERACTIVE GLOW CARD ---
function GlowCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group border border-white/10 bg-[#0A0A0F] rounded-[2rem] ${className}`}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        className="absolute pointer-events-none z-0 rounded-full blur-[100px] w-[600px] h-[600px] bg-primary/20"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// --- MAGNETIC BUTTON ---
function MagneticButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.button>
  );
}

const servicesList = [
  { id: "01", title: "Software & SaaS", icon: Code, color: "text-[#D4AF37]", glow: "bg-[#D4AF37]/20", desc: "Building internal software solutions, multi-tenant B2B SaaS, and custom web applications to natively automate your entire operational flow.", image: "/images/cards/systems_engineering.png" },
  { id: "02", title: "Cloud & Infrastructure", icon: Server, color: "text-[#D4AF37]", glow: "bg-[#D4AF37]/20", desc: "Tear down monolithic bottlenecks. We design, migrate, and deploy resilient, auto-scaling cloud architectures with zero-trust security.", image: "/images/cards/cloud_infrastructure.png" },
  { id: "03", title: "Talent & Staffing", icon: Users, color: "text-[#D4AF37]", glow: "bg-[#D4AF37]/20", desc: "Instantly scale your velocity. We outfit your business with high-performing manpower, vetted developers, and embedded recruitment pipelines.", image: "/images/cards/security_audits.png" },
  { id: "04", title: "Brand & Design", icon: Layers, color: "text-[#D4AF37]", glow: "bg-[#D4AF37]/20", desc: "Build massive visual authority from scratch. Comprehensive UX/UI, digital branding, and identity strategies mapped perfectly to your business goals.", image: "/images/cards/dedicated_teams.png" },
];

export default function Home() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // Tracking for the new natural scroll layout
  // Hero (0% -> 30%)
  const heroOpacity = useTransform(smoothY, [0, 0.2, 0.3], [1, 1, 0]);
  const heroScale = useTransform(smoothY, [0, 0.3], [1, 0.95]);

  // Statement 1 (30% -> 60%)
  const s1Opacity = useTransform(smoothY, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const s1Y = useTransform(smoothY, [0.2, 0.6], [50, -50]);

  // Statement 2 (60% -> 100%)
  const s2Opacity = useTransform(smoothY, [0.5, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothY, [0.5, 1], [50, -50]);
  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
      <div className="relative bg-transparent text-white selection:bg-white selection:text-black">


        {/* 3D SCENE: Sticky & Background */}
        <div className="fixed top-0 bottom-0 right-0 left-0 z-[1] pointer-events-none">
          {mounted && (
            <div className="w-full h-full">
              <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <Scene />
              </Canvas>
            </div>
          )}
        </div>

        {/* --- SECTION 1: STICKY HERO (250vh removes the gap) --- */}
        <div id="section-hero" ref={stickyRef} className="h-[250vh] relative z-10">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">

            {/* SEC 1: HERO */}
            <motion.div
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="absolute inset-0 flex flex-col justify-end md:justify-center pb-28 md:pb-0 px-6 md:px-20 lg:px-32 w-full"
            >
              {/* Massive 'C' Watermark Aesthetic */}
              <div className="absolute left-[5%] top-[10%] md:top-[12%] text-[40rem] md:text-[65rem] font-black pointer-events-none opacity-[0.10] bg-clip-text text-transparent" 
                   style={{ 
                     backgroundImage: "linear-gradient(45deg, #0B0D10 0%, #D4AF37 30%, #A38426 50%, #0B0D10 100%)"
                   }}>
                C
              </div>

              <div className="max-w-4xl text-center md:text-left relative z-10">
                <h1 className="text-[4rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-semibold tracking-tighter leading-[0.9] mb-6 md:mb-8 -ml-1">
                  <span className="text-white">The Only</span><br />
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#D4AF37,#FFF5C3,#D4AF37)]" style={{ backgroundSize: '200% auto', animation: 'shine 4s linear infinite' }}>Partner.</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-3xl text-[#86868B] font-medium max-w-2xl mx-auto md:mx-0">
                  From foundational branding and elite staffing to scalable cloud architectures and custom SaaS. We engineer every facet of your growth.
                </p>
              </div>
            </motion.div>

            {/* SEC 2: FIRST STATEMENT */}
            <motion.div
              style={{ opacity: s1Opacity, y: s1Y }}
              className="absolute md:right-[10%] w-full md:w-1/3 flex flex-col text-center md:text-left px-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-[1.05]">
                End-To-End <br className="hidden md:block" /> Ecosystem.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#86868B] font-medium leading-snug">
                Stop managing multiple vendors. We provide a singular, unified platform for your growth—handling everything from brand incubation to full-scale SaaS.
              </p>
            </motion.div>

            {/* SEC 3: SECOND STATEMENT */}
            <motion.div
              style={{ opacity: s2Opacity, y: s2Y }}
              className="absolute md:left-[10%] w-full md:w-1/3 flex flex-col text-center md:text-left px-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-[1.05]">
                Absolute <br className="hidden md:block" /> Alignment.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#86868B] font-medium leading-snug">
                Whether you are a startup needing a brand prototype, or an enterprise requiring 100 new developers and a cloud migration, our solutions map to your business goals perfectly.
              </p>
            </motion.div>

          </div>

        </div>

        {/* --- SECTION 2: NATURAL SCROLL BENTO --- */}
        <div id="section-bento" className="relative z-20 w-full bg-transparent">
          <div className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-start gap-12 lg:gap-24 relative">

            {/* Mobile Header */}
            <div className="lg:hidden w-full flex flex-col mb-4 z-10">
              <h2 className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-3">End-to-End IT Solutions //</h2>
              <h3 className="text-4xl sm:text-5xl font-semibold tracking-tighter text-white mb-2">Our Services.</h3>
            </div>

            {/* Sticky Left Typography List (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:sticky lg:top-[30vh] flex-[1] flex-col justify-start w-full z-10 relative">
              {/* Move the title so it floats statically above the scrolling texts */}
              <motion.div
                animate={{ opacity: activeService === 0 ? 0.6 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 lg:-top-20 left-0 mb-10 hidden lg:block pointer-events-none"
              >
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white">End-to-End IT Solutions //</h2>
              </motion.div>

              {/* The container translates upwards perfectly so the active item is always at the top line of sight! */}
              <div className="relative w-full">
                <motion.div
                  initial={false}
                  animate={{ y: `-${activeService * 25}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col w-full"
                >
                  {servicesList.map((svc, idx) => {
                    const isActive = activeService === idx;
                    return (
                      <div
                        key={idx}
                        className="relative flex flex-col justify-center h-[120px] sm:h-[140px] md:h-[180px]"
                      >
                        <motion.div
                          animate={{
                            opacity: isActive ? 1 : 0.2,
                            scale: isActive ? 1 : 0.8,
                            x: isActive ? 0 : -10,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="origin-left flex flex-col"
                        >
                          <AnimatePresence>
                            {isActive && (
                              <motion.span
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`text-sm md:text-xl font-mono mb-2 block tracking-widest ${svc.color}`}
                              >
                                [{svc.id}]
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tighter leading-none">
                            {svc.title}
                          </h3>
                        </motion.div>
                      </div>
                    )
                  })}
                </motion.div>
              </div>
            </div>

            {/* Actually Scrolling Right Content Cards */}
            <div className="flex-[1.2] w-full flex flex-col gap-12 lg:gap-[30vh] pb-10 lg:pb-[40vh]">
              {servicesList.map((svc, idx) => {
                return (
                  <motion.div
                    key={idx}
                    onViewportEnter={() => setActiveService(idx)}
                    viewport={{ amount: 0.4, margin: "0px 0px -40% 0px" }}
                    className="relative w-full rounded-[2rem] md:rounded-[3rem] bg-[#0B0D10] border border-[#D4AF37]/10 overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 min-h-[350px] lg:min-h-[500px] group cursor-default shadow-2xl hover:border-[#D4AF37]/40 hover:shadow-[0_0_60px_rgba(212,175,55,0.15)] transition-all duration-700"
                  >
                    {/* Deep noise texture over everything */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none z-0"></div>

                    {/* Animated Sweeping Glare */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(212,175,55,0.05)_50%,transparent_75%)] bg-[length:250%_250%] bg-[-150%_0] pointer-events-none z-0 opacity-0 group-hover:opacity-100 group-hover:bg-[150%_0] transition-all duration-1000"></div>

                    {/* Animated Geometric Background Grid */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" style={{ transformOrigin: "center" }}></div>
                    </div>

                    {/* Dynamic Moving Glowing Orbs inside the card */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                      <div className={`absolute -top-[20%] -right-[10%] w-[60%] h-[60%] ${svc.glow} rounded-full blur-[100px] opacity-20 group-hover:opacity-50 transition-all duration-1000 group-hover:-translate-x-10 group-hover:translate-y-10`}></div>
                      <div className={`absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] ${svc.glow} rounded-full blur-[100px] opacity-10 group-hover:opacity-40 transition-all duration-1000 group-hover:translate-x-10 group-hover:-translate-y-10`}></div>
                    </div>

                    {/* Top Header Section */}
                    <div className="relative z-10 flex items-center justify-between mb-16">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-[#0B0D10] border border-[#D4AF37]/20 flex items-center justify-center backdrop-blur-2xl shadow-xl overflow-hidden group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-500 ease-out group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                        {/* Shimmer inside icon box */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                        {(() => {
                          const Icon = svc.icon;
                          const currentClassName = `w-10 h-10 md:w-14 md:h-14 relative z-10 ${svc.color} drop-shadow-[0_0_15px_currentColor] group-hover:scale-110 transition-transform duration-500`;
                          return <Icon className={currentClassName} />
                        })()}
                      </div>

                      <div className={`text-right opacity-30 ${svc.color} group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-500 ease-out`}>
                        <h4 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter">
                          {svc.id}
                        </h4>
                      </div>
                    </div>

                    {/* Bottom Text Section */}
                    <div className="relative z-10 mt-auto flex flex-col justify-end transform lg:group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="overflow-hidden mb-3 lg:mb-2 lg:h-0 lg:group-hover:h-auto transition-all duration-500">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white lg:opacity-0 lg:translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">{svc.title}</h3>
                      </div>
                      <p className="text-base sm:text-xl md:text-2xl lg:text-[1.75rem] text-[#86868B] group-hover:text-[#D1D1D6] transition-colors duration-500 leading-[1.5] font-medium tracking-tight">
                        {svc.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

          </div>
        </div>

        {/* --- SECTION 3: THE HOLOGRAM CORE (Code/System view) --- */}
        <section id="section-hologram" className="relative w-full min-h-[120vh] bg-transparent flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent"></div>

          <div className="w-full max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 pt-[60vh] md:pt-0">
            <div className="flex flex-col justify-center text-center md:text-left">
              <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Unified Ecosystem</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-none">
                One <br className="hidden md:block" /> Solution.
              </h3>
              <p className="text-lg sm:text-xl text-[#86868B] font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                You don't need a third party for every roadblock. By streamlining development, staffing, design, and architecture into a single uncompromising roof, Cerprise guarantees productive outcomes for any sector.
              </p>
            </div>
            {/* The right side is intentionally implicitly empty to allow the 3D Hologram Diamond to shine here */}
          </div>
        </section>

        {/* --- SECTION 4: THE VAULT (Security/Robustness view) --- */}
        <section id="section-vault" className="relative w-full min-h-[120vh] bg-transparent flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay"></div>

          <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center md:items-end text-center md:text-right pt-[60vh] md:pt-0">
            <div className="max-w-md">
              <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 flex items-center justify-center md:justify-end gap-2">
                <Lock className="w-4 h-4" /> Infinite Scalability
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-none">
                The <br className="hidden md:block" /> Foundation.
              </h3>
              <p className="text-lg sm:text-xl text-[#86868B] font-medium leading-relaxed">
                We fortify your operational stack. From structuring airtight technical architecture to infusing your business with rigorous manpower, we ensure you have the resilience to rapidly scale your revenue untouched by friction.
              </p>
            </div>
            {/* The left side is open for the dark monolith diamond */}
          </div>
        </section>

        {/* --- SECTION 5: FOOTER CTA --- */}
        <section id="section-footer" className="relative z-20 min-h-screen bg-transparent overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Creates a subtle glow behind the massive footer diamond */}
            <div className="w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white/5 rounded-full blur-[80px] md:blur-[120px]"></div>
          </div>
          <div className="text-center flex flex-col items-center z-10 mix-blend-difference px-6">
            <h2 className="text-[4rem] sm:text-[6rem] md:text-[10rem] font-semibold tracking-tighter mb-8 leading-[0.8] text-white">
              Start.
            </h2>
            <MagneticButton className="relative overflow-hidden group px-12 py-5 border border-[#D4AF37] bg-[#D4AF37]/10 backdrop-blur-xl text-[#FFDF73] rounded-full font-semibold uppercase tracking-[0.2em] transition-all duration-300">
              <span className="relative z-10 group-hover:text-[#0B0D10] transition-colors duration-300">Partner With Us</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
            </MagneticButton>
          </div>
        </section>

      </div>
    </ReactLenis>
  );
}
