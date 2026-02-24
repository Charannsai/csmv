"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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

const featuresList = [
  { title: "Build Systems That Last", desc: "We focus on long-term architecture over quick fixes. Our engineering practices ensure that your platform remains robust, maintainable, and adaptable as your business evolves.", icon: Code, stat: "Sustainable Engineering" },
  { title: "Performance & Scale", desc: "Designed for high-load environments. We construct scalable cloud infrastructure and optimize codebases to efficiently handle exponential user growth.", icon: Server, stat: "Horizontal Scaling" },
  { title: "Accountable Delivery", desc: "We operate with complete transparency. As an extension of your internal teams, we share the responsibility for the outcomes of your technology investments.", icon: Shield, stat: "Transparent Partnerships" },
  { title: "Outcome-Driven Focus", desc: "We don't just write code; we build digital products that drive business value. Our solutions align directly with your organizational KPIs and market objectives.", icon: Globe2, stat: "Measurable Results" }
];

export default function Home() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // SCROLL CHOREOGRAPHY
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

        {/* --- SECTION 2: BENTO GRID --- */}
        <div id="section-bento" className="relative z-20 w-full bg-transparent min-h-[120vh] flex flex-col justify-center py-32 px-6 border-t border-white/5">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
                End-to-End <br /> <span className="text-[#86868B]">IT Solutions.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              <div className="md:col-span-2 rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors relative overflow-hidden group">
                <div className="relative z-10">
                  <Code className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">Systems Engineering</h3>
                  <p className="text-[#86868B] text-lg max-w-md leading-snug">
                    We don't just write code. We architect scalable backend systems and high-throughput web applications that serve as the indestructible backbone of your digital business.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors">
                <Server className="w-10 h-10 text-white mb-6" />
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Cloud Infrastructure</h3>
                  <p className="text-[#86868B] text-base leading-snug">
                    Tear down monolithic bottlenecks. We design, migrate, and deploy resilient, auto-scaling cloud microservices.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors">
                <Shield className="w-10 h-10 text-white mb-6" />
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Security & Audits</h3>
                  <p className="text-[#86868B] text-base leading-snug">
                    Complete technological reviews. We identify vulnerabilities and optimize architectures for peak security.
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors relative overflow-hidden group">
                <div className="relative z-10">
                  <Users className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">Dedicated Engineering Teams</h3>
                  <p className="text-[#86868B] text-lg max-w-md leading-snug">
                    Scale your development velocity instantly. Embed our fully-vetted, high-performing senior developers directly into your internal teams to execute complex technical roadmaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: THE HOLOGRAM CORE (Code/System view) --- */}
        <section id="section-hologram" className="relative w-full min-h-[120vh] bg-transparent flex items-center overflow-hidden border-t border-white/5">
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
        <section id="section-vault" className="relative w-full min-h-[120vh] bg-transparent flex items-center overflow-hidden border-t border-white/5">
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
        <section id="section-footer" className="relative z-20 min-h-screen bg-transparent overflow-hidden flex items-center justify-center border-t border-white/5">
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
