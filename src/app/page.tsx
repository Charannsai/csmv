"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, ChevronRight, CheckCircle2, Server, Code, Layers, Cpu } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/3d/Scene";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax calculations
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Fade out the 3D element quickly so it doesn't leak into other sections
  const yHero3D = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const scaleHero3D = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const opacityHero3D = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#080808] text-white selection:bg-primary selection:text-white">
      {/* Absolute 3D Canvas Background for the Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.06)_0%,rgba(8,8,8,1)_70%)]" />
      </div>

      <motion.div
        style={{ y: yHero3D, scale: scaleHero3D, opacity: opacityHero3D }}
        className="fixed top-0 bottom-0 right-0 left-0 lg:left-1/3 z-0 h-screen w-full lg:w-2/3 pointer-events-auto"
      >
        {mounted && (
          <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
            <Scene />
          </Canvas>
        )}
      </motion.div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            style={{ y: yHeroText, opacity: opacityHeroText }}
            className="w-full lg:w-1/2 flex flex-col text-left space-y-6 pt-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-surface-border text-primary w-max backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-200">Aura IT Enterprise</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
            >
              Architect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">The Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-slate-400 max-w-md leading-relaxed font-light"
            >
              Elite systems engineering and next-gen infrastructure. We build scalable, high-performance IT solutions for ambitious companies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="relative group overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-black shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02]">
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                  Explore Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 rounded-xl font-medium text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md">
                Contact Strategy
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES (Compact Bento Grid) --- */}
      <section className="relative z-20 py-24 bg-[#0A0A0F] border-t border-white/5 shadow-[0_-40px_100px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Core <span className="text-primary">Capabilities</span></h2>
              <p className="text-slate-400 max-w-lg font-light">Comprehensive IT engineering tailored to solve complex bottlenecks and scale operations.</p>
            </div>
            <Link href="/services" className="text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest">
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Bento Grid Layout - Congested and Organized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {/* Card 1: Large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 relative overflow-hidden rounded-3xl bg-surface border border-surface-border p-8 group hover:bg-white/[0.04] transition-colors flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-colors" />
              <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-primary w-fit backdrop-blur-md shadow-lg">
                <Server className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Cloud Infrastructure</h3>
                <p className="text-slate-400 font-light max-w-md">Horizontally scalable architectures engineered for zero-downtime and high availability on AWS and GCP.</p>
              </div>
            </motion.div>

            {/* Card 2: Small */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl bg-surface border border-surface-border p-8 group hover:bg-white/[0.04] transition-colors flex flex-col justify-between"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-accent w-fit backdrop-blur-md">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cybersecurity</h3>
                <p className="text-slate-400 font-light text-sm">Enterprise-grade network defense and compliance frameworks.</p>
              </div>
            </motion.div>

            {/* Card 3: Small */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-surface border border-surface-border p-8 group hover:bg-white/[0.04] transition-colors flex flex-col justify-between"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400 w-fit backdrop-blur-md">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Custom Software</h3>
                <p className="text-slate-400 font-light text-sm">Full-stack applications built explicitly for operational efficiency.</p>
              </div>
            </motion.div>

            {/* Card 4: Large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-background border border-surface-border p-8 group hover:border-primary/30 transition-colors flex flex-col justify-between"
            >
              <div className="absolute bottom-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_top_left,#000_10%,transparent_100%)] opacity-50" />
              <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 text-white w-fit backdrop-blur-md relative z-10">
                <Layers className="w-6 h-6" />
              </div>
              <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Systems Integration</h3>
                  <p className="text-slate-400 font-light max-w-sm">Seamlessly connecting legacy systems with modern API-driven architectures.</p>
                </div>
                <button className="px-6 py-2 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors w-max">Learn More</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATISTICS ARRAY (Clean, Minimalist Section) --- */}
      <section className="relative z-20 py-24 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
            {[
              { label: "Uptime Guaranteed", value: "99.99%" },
              { label: "Global Nodes", value: "150+" },
              { label: "Enterprise Clients", value: "300+" },
              { label: "Data Processed", value: "2.5 PBs" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0A0A0F] p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA / FOOTER PREP --- */}
      <section className="relative z-20 py-32 bg-gradient-to-b from-[#080808] to-[#0A0A0F] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Cpu className="w-16 h-16 text-primary mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Ready to Deploy?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light">
            Partner with Aura IT to transform your organization's technological capabilities. Superior engineering guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 rounded-xl font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              Start Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
