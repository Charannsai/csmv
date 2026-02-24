"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
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
  { id: "01", title: "Systems Engineering", icon: Code, color: "text-blue-400", glow: "bg-blue-500/20", desc: "We architect scalable backend systems and high-throughput web applications that serve as the indestructible backbone of your digital business." },
  { id: "02", title: "Cloud Infrastructure", icon: Server, color: "text-purple-400", glow: "bg-purple-500/20", desc: "Tear down monolithic bottlenecks. We design, migrate, and deploy resilient, auto-scaling cloud microservices." },
  { id: "03", title: "Security & Audits", icon: Shield, color: "text-emerald-400", glow: "bg-emerald-500/20", desc: "Complete technological reviews. We identify vulnerabilities and optimize architectures for peak security." },
  { id: "04", title: "Dedicated Teams", icon: Users, color: "text-orange-400", glow: "bg-orange-500/20", desc: "Instantly scale your development velocity. Embed our fully-vetted, high-performing senior developers directly into your internal core teams." },
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
              <div className="max-w-4xl text-center md:text-left">
                <h1 className="text-[4rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-semibold tracking-tighter leading-[0.9] mb-6 md:mb-8 -ml-1">
                  <span className="text-white">Logic into</span><br />
                  <span className="text-[#86868B]">Legacy.</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-3xl text-[#86868B] font-medium max-w-2xl mx-auto md:mx-0">
                  Elite software engineering, robust infrastructure, and dedicated tech teams for ambitious enterprises.
                </p>
              </div>
            </motion.div>

            {/* SEC 2: FIRST STATEMENT */}
            <motion.div
              style={{ opacity: s1Opacity, y: s1Y }}
              className="absolute md:right-[10%] w-full md:w-1/3 flex flex-col text-center md:text-left px-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-[1.05]">
                Custom <br className="hidden md:block" /> Software.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#86868B] font-medium leading-snug">
                From high-performance SaaS platforms to complex enterprise applications, we build resilient systems designed to scale perfectly from day one.
              </p>
            </motion.div>

            {/* SEC 3: SECOND STATEMENT */}
            <motion.div
              style={{ opacity: s2Opacity, y: s2Y }}
              className="absolute md:left-[10%] w-full md:w-1/3 flex flex-col text-center md:text-left px-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-[1.05]">
                Cloud <br className="hidden md:block" /> Architecture.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-[#86868B] font-medium leading-snug">
                We audit, modernize, and fortify your cloud infrastructure—guaranteeing zero-trust security and flawless uptime under exponential load.
              </p>
            </motion.div>

          </div>

        </div>

        {/* --- SECTION 2: NATURAL SCROLL BENTO --- */}
        <div id="section-bento" className="relative z-20 w-full bg-transparent">
          <div className="w-full max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-start gap-12 lg:gap-24 relative">

            {/* Sticky Left Typography List */}
            <div className="lg:sticky lg:top-[30vh] flex-[1] flex flex-col justify-start w-full z-10 pt-20 relative lg:pt-0">
              {/* Move the title so it floats statically above the scrolling texts */}
              <div className="absolute top-0 lg:-top-20 left-0 opacity-60 mb-10 hidden lg:block">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white">End-to-End IT Solutions //</h2>
              </div>

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
            <div className="flex-[1.2] w-full flex flex-col gap-[20vh] pb-[20vh] md:pb-[40vh] mt-20 lg:mt-0 xl:gap-[30vh]">
              {servicesList.map((svc, idx) => {
                return (
                  <motion.div
                    key={idx}
                    onViewportEnter={() => setActiveService(idx)}
                    viewport={{ amount: 0.4, margin: "0px 0px -40% 0px" }}
                    className="relative w-full rounded-[2.5rem] md:rounded-[3rem] bg-[#0A0A0F] border border-white/5 overflow-hidden flex flex-col justify-between p-8 sm:p-10 md:p-14 shadow-2xl min-h-[400px] lg:min-h-[500px]"
                  >
                    {/* Deep noise texture inside the card */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay z-0 pointer-events-none"></div>

                    {/* Abstract sweeping gradient behind the card content */}
                    <div className={`absolute -top-1/4 -right-1/4 w-[150%] h-[150%] rounded-full blur-[100px] md:blur-[140px] ${svc.glow} opacity-[0.15] z-0 pointer-events-none`}></div>

                    <div className="relative z-10 flex items-center justify-between mb-16">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-2xl shadow-xl overflow-hidden group">
                        {/* Shimmer inside icon box */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                        {(() => {
                          const Icon = svc.icon;
                          const currentClassName = `w-10 h-10 md:w-14 md:h-14 relative z-10 ${svc.color} drop-shadow-[0_0_15px_currentColor]`;
                          return <Icon className={currentClassName} />
                        })()}
                      </div>

                      <div className={`text-right opacity-30 ${svc.color}`}>
                        <h4 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter">
                          {svc.id}
                        </h4>
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] text-[#D1D1D6] leading-[1.5] font-medium tracking-tight">
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
              <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Engineering Process</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-none">
                Absolute <br className="hidden md:block" /> Transparency.
              </h3>
              <p className="text-lg sm:text-xl text-[#86868B] font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                There are no black boxes in our delivery. We treat your infrastructure with total clarity—delivering fully documented, test-driven systems where every deployment, dependency, and architectural decision is openly accessible to your team.
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
                <Lock className="w-4 h-4" /> Zero-Trust Security
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-4 md:mb-6 leading-none">
                The <br className="hidden md:block" /> Vault.
              </h3>
              <p className="text-lg sm:text-xl text-[#86868B] font-medium leading-relaxed">
                Our infrastructure designs enforce military-grade security layers at the edge. We fortify your tech stack against vulnerabilities before a single packet drops payload internally, guaranteeing impenetrable digital assets for your enterprise.
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
            <MagneticButton className="px-12 py-5 border border-white/20 bg-white/10 backdrop-blur-xl text-white rounded-full font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
              Partner With Us
            </MagneticButton>
          </div>
        </section>

      </div>
    </ReactLenis>
  );
}
