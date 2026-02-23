"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Shield, ChevronRight, Server, Code, Layers, Cpu, Compass, Globe2, Activity } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/3d/Scene";
import { ReactLenis } from "lenis/react";
import Marquee from "react-fast-marquee";

// --- ANIMATION VARIANTS FOR CLASSY AGENCY FEEL ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeUpSpring = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 }
  }
};

const lineReveal = {
  hidden: { scaleY: 0, opacity: 0 },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px 500px 0px" });

  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Adding spring damping to scroll triggers for ultra-smooth aesthetic feeling
  const smoothY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax calculations
  const yHeroText = useTransform(smoothY, [0, 0.2], [0, -100]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // 3D Parallax mappings
  const yHero3D = useTransform(smoothY, [0, 0.3], [0, 150]);
  const scaleHero3D = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const opacityHero3D = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Custom workflow transforms based on overall scroll
  const xWorkflow = useTransform(smoothY, [0.4, 0.7], [100, -100]);

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
      <div ref={containerRef} className="relative bg-[#080808] text-white selection:bg-primary selection:text-white overflow-hidden">

        {/* --- GLOBAL BACKDROP GLOW --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.06)_0%,rgba(8,8,8,1)_70%)]" />
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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-surface-border w-max backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-300">Aura IT Systems</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-white"
              >
                Architect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
                  The Future.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute -bottom-2 left-0 w-full h-[6px] bg-accent origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="text-lg text-slate-400 max-w-md leading-relaxed font-light mt-4"
              >
                Elite systems engineering and next-gen infrastructure. We build scalable, high-performance architectures for ambitious enterprises.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <button className="relative group overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-black shadow-lg transition-all hover:scale-[1.03]">
                  <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide uppercase text-sm">
                    Explore Solutions <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="absolute bottom-10 left-6 sm:left-10 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-30 origin-top overflow-hidden">
              <motion.div
                animate={{ y: [0, 80, 80] }}
                transition={{ repeat: Infinity, duration: 2, times: [0, 0.5, 1], ease: "easeInOut" }}
                className="w-full h-10 bg-white"
              />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 origin-center -rotate-90 lg:rotate-0 mt-4 lg:mt-0">Scroll</span>
          </motion.div>
        </section>

        {/* --- FAST MARQUEE (Ultra-Premium Banner) --- */}
        <section className="relative z-20 py-8 bg-primary/5 border-y border-white/5 overflow-hidden">
          <Marquee speed={40} gradient={false} className="overflow-hidden mix-blend-screen opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center text-5xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/30 to-white/10 px-8">
                • Zero-Trust Architecture • Mission Critical API • Real-Time Systems • Edge Compute
              </div>
            ))}
          </Marquee>
        </section>

        {/* --- BENTO GRID OVERHAUL (Aesthetic Reveals) --- */}
        <section className="relative z-20 py-32 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-24 flex flex-col items-start gap-4"
            >
              <h2 className="text-sm tracking-[0.2em] font-bold text-primary uppercase flex items-center gap-3">
                <div className="w-8 h-[1px] bg-primary"></div> Engineering Dynamics
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mt-2 text-white/90 leading-[1.1] max-w-2xl">
                Unprecedented <br className="hidden md:block" /> Performance Matrix.
              </h3>
            </motion.div>

            {/* Unique Interactive Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Massive Feature Tile (Spans 8 cols) */}
              <motion.div variants={fadeUpSpring} className="md:col-span-8 relative rounded-[2rem] bg-[#0A0A0F] border border-white/5 p-12 group hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-end min-h-[400px]">
                {/* Background Video/Animation Mock via gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute right-0 top-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

                <div className="relative z-10 max-w-md">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-2xl">
                    <Server className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 tracking-tight">Global Edge Cloud</h3>
                  <p className="text-slate-400 leading-relaxed font-light text-lg">Horizontally scalable compute power. Built for instantaneous global deployments with mathematical zero-downtime protocols.</p>
                </div>
              </motion.div>

              {/* Tall side tile (Spans 4 cols) */}
              <motion.div variants={fadeUpSpring} className="md:col-span-4 relative rounded-[2rem] bg-gradient-to-b from-[#11111A] to-[#0A0A0F] border border-white/5 p-10 group overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10">
                  <div className="relative w-32 h-32 mx-auto mb-8 border border-white/10 rounded-full flex items-center justify-center bg-black/50 overflow-hidden group-hover:border-primary/50 transition-colors duration-700">
                    <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-out" />
                    <Shield className="w-12 h-12 text-white relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Absolute Zero-Trust</h3>
                  <p className="text-slate-400 font-light text-sm">Military-grade cryptographic network defenses.</p>
                </div>
              </motion.div>

              {/* Lower Row: 3 equal tiles */}
              {[
                { i: Code, t: "Bespoke Architectures", d: "Algorithmically optimized custom software stacks." },
                { i: Layers, t: "System Redux", d: "Merging legacy core into hyper-fast modern APIs." },
                { i: Globe2, t: "Geo-Redundant", d: "Multi-region fallback routing across all clouds." },
              ].map((card, idx) => (
                <motion.div key={idx} variants={fadeUpSpring} className="md:col-span-4 rounded-[2rem] bg-[#0A0A0F] border border-white/5 p-10 group hover:bg-[#0E0E14] transition-colors relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 translate-x-4 translate-y-4">
                    <card.i className="w-32 h-32 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 relative z-10">{card.t}</h4>
                  <p className="text-slate-400 font-light text-sm leading-relaxed relative z-10">{card.d}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- HORIZONTAL WORKFLOW SECTION (Unique Scroll Sync) --- */}
        <section ref={workflowRef} className="relative z-20 py-40 bg-[#000000] border-y border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-24">
            <div className="flex items-center gap-4 mb-2">
              <Compass className="w-6 h-6 text-accent animate-[spin_10s_linear_infinite]" />
              <h2 className="text-sm tracking-[0.2em] font-bold text-accent uppercase">Strategic Implementation</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white">How we execute precision.</h3>
          </div>

          {/* Drifting horizontal cards hooked to scroll */}
          <motion.div
            style={{ x: xWorkflow }}
            className="flex gap-8 px-6 w-max"
          >
            {[
              { step: "01", title: "Infrastructural Audit", desc: "Deep analytical mapping of existing bottlenecks and vulnerabilities." },
              { step: "02", title: "Architectural Design", desc: "Blueprinting highly concurrent, horizontally scalable network maps." },
              { step: "03", title: "Stealth Deployment", desc: "Zero-downtime migration protocols executed in isolated environments." },
              { step: "04", title: "Continuous Ops", desc: "24/7 AI-monitored load balancing and active threat mitigation." }
            ].map((flow, idx) => (
              <div key={idx} className="w-[400px] sm:w-[500px] h-[350px] bg-[#0A0A0F] border border-white/10 rounded-3xl p-12 flex flex-col justify-between shrink-0 relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
                <div className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors absolute top-8 right-8">{flow.step}</div>
                <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-black font-black text-xl mb-6 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {flow.step}
                </div>
                <div>
                  <h4 className="text-3xl font-bold mb-4">{flow.title}</h4>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">{flow.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* --- DYNAMIC STATS (Massive Typography Reveal) --- */}
        <section className="relative z-20 py-40 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
            >
              <div>
                <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Proof in</span> <br />
                  <span className="text-primary italic">Numbers.</span>
                </h2>
                <p className="text-xl text-slate-400 font-light max-w-sm">We don't deal in hypotheticals. Aura IT guarantees metric-driven results.</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { v: "0.2", m: "ms", l: "Average API Latency" },
                  { v: "100", m: "%", l: "SLA Delivered" },
                  { v: "300", m: "+", l: "Enterprise Clients" },
                  { v: "2.5", m: "PB", l: "Data Processed" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col border-l-2 border-primary/20 pl-6">
                    <div className="flex items-end gap-1 mb-2">
                      <span className="text-5xl font-black">{stat.v}</span>
                      <span className="text-xl font-bold text-primary mb-1">{stat.m}</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- RADICAL GRADIENT FOOTER CTA --- */}
        <section className="relative z-20 py-40 bg-[#050508] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(99,102,241,0.2)_0%,transparent_60%)]" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50, damping: 20 }}
            className="max-w-4xl mx-auto px-6 text-center relative z-10"
          >
            <Activity className="w-16 h-16 text-white/50 mx-auto mb-10" />
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              It's time to <br /> <span className="text-slate-500 italic font-medium">evolve.</span>
            </h2>
            <Link href="/contact" className="inline-flex mt-8 px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
              Initiate Deployment
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}
