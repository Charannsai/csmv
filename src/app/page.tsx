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

        {/* --- HERO 3D SCENE --- */}
        <motion.div
          style={{ y: yHero3D, scale: scaleHero3D, opacity: opacityHero3D }}
          className="fixed top-0 bottom-0 right-0 left-0 lg:left-1/3 z-0 h-screen w-full lg:w-2/3 pointer-events-auto"
        >
          {mounted && isHeroInView && (
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
              <Scene />
            </Canvas>
          )}
        </motion.div>

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
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] text-white"
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
                className="text-lg text-slate-400 max-w-md leading-relaxed font-light"
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

        {/* --- DYNAMIC STICKY STACKING SECTIONS --- */}
        <section className="relative z-20 w-full min-h-[300vh] bg-[#050505]">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 w-full relative h-[600px] flex items-center justify-center">

              {/* Card 1 */}
              <motion.div
                style={{
                  scale: useTransform(smoothY, [0.1, 0.3], [1, 0.9]),
                  y: useTransform(smoothY, [0.1, 0.3], [0, -50]),
                  opacity: useTransform(smoothY, [0.25, 0.3], [1, 0]),
                }}
                className="absolute inset-x-0 w-full max-w-5xl mx-auto h-[500px] bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-white/10 rounded-[2rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <Server className="w-16 h-16 text-primary relative z-10" />
                <div className="relative z-10">
                  <h3 className="text-5xl font-black mb-4 tracking-tighter">Global Edge Cloud.</h3>
                  <p className="text-xl text-slate-400 font-light max-w-xl">Zero latency globally. We architect horizontally scalable servers that replicate in real-time instantly across multiple regions.</p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                style={{
                  scale: useTransform(smoothY, [0.3, 0.5], [0.8, 1]),
                  y: useTransform(smoothY, [0.3, 0.5], [200, 0]),
                  opacity: useTransform(smoothY, [0.3, 0.35], [0, 1]),
                }}
                className="absolute inset-x-0 w-full max-w-5xl mx-auto h-[500px] bg-gradient-to-br from-[#0F171A] to-[#0A0F12] border border-accent/20 rounded-[2rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
                <Globe2 className="w-16 h-16 text-accent relative z-10" />
                <div className="relative z-10">
                  <h3 className="text-5xl font-black mb-4 tracking-tighter">Geo-Redundant Matrix.</h3>
                  <p className="text-xl text-slate-400 font-light max-w-xl">Failovers are a thing of the past. Our multi-cloud architecture dynamically routes connections mathematically avoiding downtime.</p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                style={{
                  scale: useTransform(smoothY, [0.5, 0.7], [0.8, 1]),
                  y: useTransform(smoothY, [0.5, 0.7], [200, 0]),
                  opacity: useTransform(smoothY, [0.5, 0.55], [0, 1]),
                }}
                className="absolute inset-x-0 w-full max-w-5xl mx-auto h-[500px] bg-gradient-to-br from-[#1A0F1A] to-[#120A12] border border-purple-500/20 rounded-[2rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
                <Fingerprint className="w-16 h-16 text-purple-400 relative z-10" />
                <div className="relative z-10">
                  <h3 className="text-5xl font-black mb-4 tracking-tighter text-white">Cryptographic Mesh.</h3>
                  <p className="text-xl text-slate-400 font-light max-w-xl">End-to-end military-grade network encryption layered over internal zero-trust architecture. Bulletproof by design.</p>
                </div>
              </motion.div>

            </div>
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

              <GlowCard className="md:col-span-2 p-12 min-h-[350px] flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="w-full md:w-1/2">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4">Hyper-Fast Pipelines</h3>
                  <p className="text-slate-400 leading-relaxed font-light">CI/CD integrations pushing massive codebase updates across thousands of nodes in fractional milliseconds.</p>
                </div>
                {/* Decorative interactive graphic */}
                <div className="w-full md:w-1/2 h-full bg-black/40 border border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(99,102,241,0.2)_50%,transparent_100%)] w-[200%] animate-[slide_3s_linear_infinite]" />
                  <Code className="w-24 h-24 text-white/20 relative z-10" />
                  <style jsx>{`
                      @keyframes slide {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(50%); }
                      }
                    `}</style>
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
