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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px 500px 0px" });

  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax calculations
  const yHeroText = useTransform(smoothY, [0, 0.2], [0, -100]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const yHero3D = useTransform(smoothY, [0, 0.3], [0, 150]);
  const scaleHero3D = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const opacityHero3D = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
      <div ref={containerRef} className="relative bg-[#050505] text-white selection:bg-primary selection:text-white">

        {/* --- GLOBAL BACKDROP GLOW --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.06)_0%,rgba(5,5,5,1)_70%)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* --- HERO 3D SCENE (Persists across the entire scroll) --- */}
        <div className="fixed top-0 bottom-0 right-0 left-0 z-[1] pointer-events-none">
          {mounted && (
            <div className="w-full h-full">
              <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <Scene />
              </Canvas>
            </div>
          )}
        </div>

        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative h-screen flex items-center z-10">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              style={{ y: yHeroText, opacity: opacityHeroText }}
              className="w-full lg:w-1/2 flex flex-col text-left space-y-8 pt-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl w-max"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#38BDF8]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-200">Aura IT Systems</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1] text-white"
              >
                Architect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
                  The Future.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="text-base text-slate-400 max-w-sm leading-relaxed font-light"
              >
                Elite systems engineering and next-gen infrastructure. We build highly scalable, interactive architectures for ambitious enterprises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <MagneticButton className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-shadow">
                  Explore Solutions <ChevronRight className="w-4 h-4 ml-2" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- HORIZONTAL PANNING GALLERY (Redesigned Section 2) --- */}
        <section className="relative z-20 w-full h-[300vh] bg-[#050505]">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Core Infrastructure.</h2>
                <p className="text-slate-400 font-light mt-2">Engineered for absolute resilience.</p>
              </div>
              <div className="hidden md:flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-primary font-bold">System Nominal</span>
              </div>
            </div>

            {/* Horizontal Track */}
            <motion.div
              style={{ x: useTransform(smoothY, [0.1, 0.5], ["0%", "-66%"]) }}
              className="flex gap-8 w-max pl-6 pr-6 lg:pl-[calc(50vw-616px)] lg:pr-[50vw]"
            >
              {[
                { i: Server, t: "Global Edge Cloud", d: "Zero latency globally. We architect horizontally scalable servers that replicate in real-time instantly.", c: "from-[#12121A] to-[#0A0A0F]", b: "border-white/10" },
                { i: Globe2, t: "Geo-Redundant Matrix", d: "Failovers are a thing of the past. Our multi-cloud architecture dynamically routes connections mathematically.", c: "from-[#0F171A] to-[#0A0F12]", b: "border-accent/20" },
                { i: Fingerprint, t: "Cryptographic Mesh", d: "End-to-end military-grade network encryption layered over internal zero-trust architecture.", c: "from-[#1A0F1A] to-[#120A12]", b: "border-purple-500/20" }
              ].map((item, idx) => (
                <div key={idx} className={`w-[80vw] lg:w-[800px] shrink-0 h-[450px] bg-gradient-to-br ${item.c} border ${item.b} rounded-[2rem] p-12 relative overflow-hidden group`}>
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                  <div className="flex flex-col justify-between h-full relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center backdrop-blur-md">
                        <item.i className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors">0{idx + 1}</h2>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold mb-4">{item.t}</h3>
                      <p className="text-slate-400 font-light text-xl max-w-md">{item.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- INTERACTIVE GLOW CARDS (High Engagement) --- */}
        <section className="relative z-20 py-40 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24 text-center">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30">
                Interactive Systems.
              </h2>
              <p className="text-slate-400 font-light text-xl">Hover over the modules to see the underlying architecture respond.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group/grid">
              <GlowCard className="p-12 min-h-[400px] flex flex-col justify-between">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Neural Resource Allocation</h3>
                  <p className="text-slate-400 leading-relaxed font-light">AI-driven auto-scaling instantly provisions compute parameters based on unpredictable traffic spikes.</p>
                </div>
                {/* Decorative UI element inside card */}
                <div className="absolute top-12 right-12 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Online</div>
                </div>
              </GlowCard>

              <GlowCard className="p-12 min-h-[400px] flex flex-col justify-between">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Quantum-Resistant Vaults</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Data rest encryption using algorithms designed to withstand attacks from future quantum computing arrays.</p>
                </div>
                <div className="absolute top-12 right-12 flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div key={i} animate={{ h: ["8px", "24px", "8px"] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} className="w-1 bg-accent/50 rounded-full" />
                  ))}
                </div>
              </GlowCard>

              {/* THE 3RD GLOW CARD (DIAMOND DESTINATION) */}
              <GlowCard className="md:col-span-2 p-12 min-h-[550px] flex justify-end items-center relative overflow-visible border-primary/20 bg-gradient-to-br from-[#0A0A0F] to-[#141226]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(99,102,241,0.1)_0%,transparent_60%)]" />

                {/* EMPTY LEFT SIDE FOR THE 3D DIAMOND TO LAND */}
                <div className="w-1/2 h-full absolute top-0 left-0 hidden md:block"></div>

                {/* TEXT CONTENT ON THE RIGHT */}
                <div className="w-full md:w-1/2 relative z-10 flex flex-col justify-center bg-[#050505]/50 backdrop-blur-xl border border-white/5 p-12 rounded-3xl shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">Core Rendering &<br /> Hyper-Pipelines.</h3>
                  <p className="text-slate-400 leading-relaxed font-light text-lg mb-8">We construct completely isolated render environments and deploy continuous integration pipelines capable of updating millions of nodes globally instantly.</p>

                  <MagneticButton className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black font-semibold transition-all w-max shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    Examine Infrastructure
                  </MagneticButton>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* --- EXTRAORDINARY RADIAL FOOTER (Expanding Circle) --- */}
        <section className="relative z-20 h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
          <motion.div
            style={{
              scale: useTransform(smoothY, [0.8, 1], [0.1, 3]),
              opacity: useTransform(smoothY, [0.8, 0.9], [0, 1])
            }}
            className="absolute w-[800px] h-[800px] bg-primary rounded-full blur-[100px] opacity-30 mix-blend-screen"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 text-center flex flex-col items-center"
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white mix-blend-difference">
              Initiate <br /> SEQUENCE.
            </h2>
            <MagneticButton className="px-16 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-colors duration-300">
              Deploy Now
            </MagneticButton>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}
