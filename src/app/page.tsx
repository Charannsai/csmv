"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Shield, ChevronRight, Server, Code, Layers, Cpu, Globe2, Activity, Fingerprint, Lock, Zap } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });

  // SCROLL CHOREOGRAPHY (Apple-like sticky fades)
  // Hero (0% -> 15%)
  const heroOpacity = useTransform(smoothY, [0, 0.1, 0.15], [1, 1, 0]);
  const heroScale = useTransform(smoothY, [0, 0.15], [1, 0.95]);

  // Statement 1 (18% -> 35%)
  const s1Opacity = useTransform(smoothY, [0.15, 0.22, 0.3, 0.35], [0, 1, 1, 0]);
  const s1Y = useTransform(smoothY, [0.15, 0.35], [50, -50]);

  // Statement 2 (38% -> 55%)
  const s2Opacity = useTransform(smoothY, [0.35, 0.42, 0.5, 0.55], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothY, [0.35, 0.55], [50, -50]);

  // Bento Box Entrance (60% -> 100%)
  const bentoOpacity = useTransform(smoothY, [0.6, 0.7], [0, 1]);
  const bentoY = useTransform(smoothY, [0.6, 0.7], [100, 0]);

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
      <div ref={containerRef} className="relative bg-[#000000] text-white selection:bg-white selection:text-black min-h-[400vh]">

        {/* Apple-style pure black background with ultra-subtle grain */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
        </div>

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

        {/* STICKY CONTENT WRAPPER */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 pointer-events-none">

          {/* SEC 1: HERO */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute top-[15vh] w-full flex flex-col items-center justify-center text-center px-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-none mb-6">
              <span className="text-white">CSMV.</span><br />
              <span className="text-[#86868B]">Systems that last.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#86868B] font-medium max-w-2xl mt-4">
              Pro-grade software engineering. Uncompromising scale.
            </p>
          </motion.div>

          {/* SEC 2: FIRST STATEMENT */}
          <motion.div
            style={{ opacity: s1Opacity, y: s1Y }}
            className="absolute left-[10%] w-full md:w-1/3 flex flex-col text-left px-6"
          >
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-[1.05]">
              Flawless <br /> Architecture.
            </h2>
            <p className="text-2xl text-[#86868B] font-medium leading-snug">
              Every interface, database, and edge node meticulously designed for absolute resilience.
            </p>
          </motion.div>

          {/* SEC 3: SECOND STATEMENT */}
          <motion.div
            style={{ opacity: s2Opacity, y: s2Y }}
            className="absolute right-[10%] w-full md:w-1/3 flex flex-col text-left px-6"
          >
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-[1.05]">
              Boundless <br /> Scale.
            </h2>
            <p className="text-2xl text-[#86868B] font-medium leading-snug">
              Vertical and horizontal load balancing built to effortlessly absorb multi-million request spikes.
            </p>
          </motion.div>

        </div>

        {/* BENTO BOX GRID (Triggers at bottom of scroll, blocks scrolling normally) */}
        <div className="absolute bottom-0 w-full min-h-screen bg-black z-20 flex flex-col items-center justify-center pb-32 pt-20 px-6 pointer-events-auto">
          <motion.div
            style={{ opacity: bentoOpacity, y: bentoY }}
            className="w-full max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
                Everything you need. <br /> <span className="text-[#86868B]">Nothing you don't.</span>
              </h2>
            </div>

            {/* THE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

              {/* Large feature 1 */}
              <div className="md:col-span-2 rounded-[2rem] bg-[#111111] border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors relative overflow-hidden group">
                <div className="relative z-10">
                  <Code className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">Product Engineering</h3>
                  <p className="text-[#86868B] text-lg max-w-md leading-snug">
                    We don't just build software. We craft digital products from zero to one, ensuring market-fit usability intertwined with enterprise-level stability.
                  </p>
                </div>
                {/* Subtle glow effect on hover */}
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/[0.03] blur-[80px] rounded-full group-hover:bg-white/[0.05] transition-all duration-700" />
              </div>

              {/* Square feature */}
              <div className="rounded-[2rem] bg-[#111111] border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors">
                <Server className="w-10 h-10 text-white mb-6" />
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Tech Modernization</h3>
                  <p className="text-[#86868B] text-base leading-snug">
                    Tear down monolithic legacy code. Rebuild on unshakeable microservice foundations.
                  </p>
                </div>
              </div>

              {/* Square feature */}
              <div className="rounded-[2rem] bg-[#111111] border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors">
                <Shield className="w-10 h-10 text-white mb-6" />
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">Accountability</h3>
                  <p className="text-[#86868B] text-base leading-snug">
                    We operate transparently. Your outcomes are our direct responsibility.
                  </p>
                </div>
              </div>

              {/* Large feature 2 */}
              <div className="md:col-span-2 rounded-[2rem] bg-[#111111] border border-white/5 p-10 flex flex-col justify-between hover:bg-[#161616] transition-colors relative overflow-hidden group">
                <div className="relative z-10">
                  <Activity className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">Dedicated Teams</h3>
                  <p className="text-[#86868B] text-lg max-w-md leading-snug">
                    Embed elite engineers directly into your current processes. We scale alongside you, instantly adapting to your technical roadmap.
                  </p>
                </div>
                {/* Subtle glow effect on hover */}
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/[0.03] blur-[80px] rounded-full group-hover:bg-white/[0.05] transition-all duration-700" />
              </div>

            </div>

            <div className="mt-20 flex justify-center">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-full text-lg hover:scale-105 transition-transform duration-300">
                Partner With CSMV
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </ReactLenis>
  );
}
