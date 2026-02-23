"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Shield, ChevronRight, Server, Code, Layers, Cpu } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/3d/Scene";
import { ReactLenis } from "lenis/react";

// --- ANIMATION VARIANTS FOR CLASSY AGENCY FEEL ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const fadeUpSpring = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 } // Very smooth, agency-like spring
  }
};

const lineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } // Custom bezier curve
  }
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px 500px 0px" }); // Kept true until 500px scrolled past

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

  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
      <div ref={containerRef} className="relative bg-[#080808] text-white selection:bg-primary selection:text-white pb-32 overflow-hidden">

        {/* Absolute 3D Canvas Background for the Hero */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.06)_0%,rgba(8,8,8,1)_70%)]" />
        </div>

        {/* 
            PERFORMANCE FIX: 
            We only render the heavy 3D Canvas if the Hero section is near/in the viewport. 
            This resolves extreme lag on subsequent sections by dropping R3F overhead entirely. 
        */}
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
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Classy slide 
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

          {/* Scroll Indicator */}
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

        {/* --- INFINITE MARQUEE (Agency Flex) --- */}
        <section className="relative z-20 py-10 border-y border-white/5 bg-[#050508] overflow-hidden flex items-center origin-left">
          <motion.div
            style={{ x: useTransform(smoothY, [0, 1], [0, -1000]) }}
            className="flex whitespace-nowrap opacity-40 mix-blend-screen"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/40 px-8">
                • Cloud Infrastructure • Zero-Trust Security • Mission Critical API • Elite Systems
              </div>
            ))}
          </motion.div>
        </section>

        {/* --- SERVICES (Staggered Bento Grid + Reveal Animations) --- */}
        <section className="relative z-20 py-32 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 flex flex-col items-start gap-4 relative"
            >
              {/* Aesthetic drawing line before text */}
              <motion.div variants={lineReveal} className="absolute -left-6 top-2 h-full w-[2px] bg-gradient-to-b from-primary to-transparent hidden md:block origin-top" />

              <h2 className="text-sm tracking-[0.2em] font-bold text-primary uppercase">Capabilities Overview</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight mt-2 text-white/90 leading-[1.1] max-w-2xl">
                Engineering <br className="hidden md:block" /> at the edge of possibility.
              </h3>
            </motion.div>

            {/* Aesthetic Staggered Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]"
            >
              {/* Card 1 */}
              <motion.div variants={fadeUpSpring} className="md:col-span-2 relative overflow-hidden rounded-3xl bg-[#0B0B10] border border-white/5 p-10 group hover:border-primary/30 transition-colors">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-all duration-700 ease-out" />

                <div className="flex flex-col h-full justify-between relative z-10">
                  <Server className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500 ease-out" />
                  <div>
                    <h3 className="text-3xl font-bold mb-3">Enterprise Cloud</h3>
                    <p className="text-slate-400 font-light max-w-md text-sm leading-relaxed">Horizontally scalable compute power across AWS & GCP. Built for instantaneous global deployments and mathematical zero-downtime.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={fadeUpSpring} className="relative overflow-hidden rounded-3xl bg-[#0B0B10] border border-white/5 p-10 group hover:border-accent/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col h-full justify-between relative z-10">
                  <Shield className="w-8 h-8 text-accent group-hover:-translate-y-1 transition-transform duration-500" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Zero-Trust</h3>
                    <p className="text-slate-400 font-light text-sm leading-relaxed">Military-grade infrastructural audits and impenetrable network architectures.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={fadeUpSpring} className="relative overflow-hidden rounded-3xl bg-[#0B0B10] border border-white/5 p-10 group hover:border-emerald-500/30 transition-colors">
                <div className="flex flex-col h-full justify-between relative z-10">
                  <Code className="w-8 h-8 text-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Custom Software</h3>
                    <p className="text-slate-400 font-light text-sm leading-relaxed">Bespoke full-stack operational tools and highly customized performance codebases.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={fadeUpSpring} className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101018] to-[#08080C] border border-white/5 p-10 group">
                {/* Cool dotted background effect inside the card */}
                <div className="absolute bottom-0 right-0 w-[80%] h-full bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_left,#000_10%,transparent_100%)] opacity-30 group-hover:scale-105 transition-transform duration-1000 ease-out origin-bottom-right" />

                <div className="flex flex-col h-full justify-between relative z-10">
                  <Layers className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-500" />
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-3">System Redux</h3>
                      <p className="text-slate-400 font-light max-w-sm text-sm">Replacing aging legacy ecosystems with hyper-fast, modern API microservices.</p>
                    </div>
                    <Link href="/services" className="inline-flex items-center gap-1 uppercase tracking-widest text-xs font-bold text-white/50 hover:text-white transition-colors group/link pb-1 border-b border-transparent hover:border-white w-max">
                      Case Studies <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- STATS OR TECHNICAL METRICS --- */}
        <section className="relative z-20 pb-32 pt-10 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full relative rounded-3xl overflow-hidden border border-white/5 bg-[#0A0A0E] flex flex-col md:flex-row items-center justify-between"
            >
              {/* Internal gradient line separator via flex */}
              {[
                { v: "0.2ms", l: "Average API Latency" },
                { v: "300+", l: "Enterprise Clients" },
                { v: "100%", l: "SLA Delivered" }
              ].map((s, idx) => (
                <div key={idx} className="flex-1 w-full p-12 text-center relative">
                  {idx !== 2 && <div className="absolute right-0 top-[20%] bottom-[20%] w-[1px] bg-white/5 hidden md:block" />}
                  {idx !== 2 && <div className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-white/5 block md:hidden" />}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                  >
                    <h4 className="text-5xl font-black mb-2 text-white drop-shadow-md">{s.v}</h4>
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">{s.l}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- BIG CTA --- */}
        <section className="relative z-20 py-32 bg-[#050508] border-t border-white/5 overflow-hidden flex justify-center items-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_50%)] mix-blend-screen" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 px-6 max-w-3xl"
          >
            <Cpu className="w-12 h-12 text-white/50 mx-auto mb-8 animate-pulse" />
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Let's build <span className="text-slate-500 italic">together</span>.</h2>
            <Link href="/contact" className="inline-flex mt-6 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 rounded-sm">
              Initiate Strategy Session
            </Link>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}
