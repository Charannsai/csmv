"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Shield, Zap, Globe, Lock, ChevronRight, CheckCircle2 } from "lucide-react";
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
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yHero3D = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const scaleHero3D = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#080808] text-white selection:bg-primary selection:text-white">
      {/* Absolute 3D Canvas Background for the Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08)_0%,rgba(8,8,8,1)_70%)]" />
      </div>

      <motion.div
        style={{ y: yHero3D, scale: scaleHero3D }}
        className="fixed top-20 bottom-0 right-0 left-0 lg:left-1/3 z-0 h-[80vh] w-full lg:w-2/3 pointer-events-auto"
      >
        {mounted && (
          <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
            <Scene />
          </Canvas>
        )}
      </motion.div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center z-10 pt-20">
        <div className="max-w-7xl mx-auto px-6 pt-20 w-full flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            style={{ y: yHeroText, opacity: opacityHeroText }}
            className="w-full lg:w-1/2 flex flex-col text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border text-primary w-max backdrop-blur-xl"
            >
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_10px_#38BDF8]" />
              <span className="text-xs font-semibold tracking-widest uppercase">One-Click Security</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
            >
              Absolute <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Privacy.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-slate-400 max-w-lg leading-relaxed font-light"
            >
              Experience the next evolution of internet freedom. Military-grade encryption wrapped in an impossibly beautiful, ultra-fast client.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="relative group overflow-hidden rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.8)]">
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                  Install ARGUS VPN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity z-0" />
              </button>
              <button className="px-8 py-4 rounded-xl font-medium text-white/80 border border-white/10 hover:bg-white/5 hover:text-white transition-all backdrop-blur-md">
                View Pricing
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID (Glassmorphism) --- */}
      <section className="relative z-20 py-32 bg-background/50 border-t border-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Built for the <span className="text-primary">Future.</span></h2>
            <p className="text-slate-400 max-w-2xl lg:mx-0 mx-auto">Not just a VPN. A complete paradigm shift in how you experience the internet. Zero logs. Zero compromises.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Quantum-Resistant",
                desc: "Next-generation cryptographic protocols designed to withstand attacks from future quantum computers.",
                color: "text-primary"
              },
              {
                icon: Zap,
                title: "Warp Speed Nodes",
                desc: "10Gbps dedicated servers strategically placed worldwide to guarantee lowest latency routing.",
                color: "text-accent"
              },
              {
                icon: Lock,
                title: "Zero-Knowledge",
                desc: "Our RAM-only infrastructure mathematically guarantees your data is wiped instantly.",
                color: "text-white"
              }
            ].map((Feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative overflow-hidden rounded-3xl bg-surface border border-surface-border p-8 hover:bg-white/[0.05] transition-colors"
                style={{ backdropFilter: "blur(20px)" }}
              >
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`mb-8 inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 ${Feature.color} shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                    <Feature.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{Feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{Feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GLOBAL CONNECTIVITY (Visual Scroll Section) --- */}
      <section className="relative z-20 py-40 overflow-hidden">
        {/* Procedural Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1 }}
            className="w-32 h-32 mb-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center relative shadow-[0_0_100px_rgba(99,102,241,0.4)]"
          >
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_4s_linear_infinite]" />
            <Globe className="w-12 h-12 text-primary" strokeWidth={1} />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 max-w-4xl tracking-tight">
            The world at your fingertips. <br />
            <span className="text-slate-600">Invisible to everyone else.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mb-12 font-light">
            Connect to 8,400+ hyper-fast servers across 124 countries. Bypass censorship and geo-restrictions instantly with intelligent routing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mt-10">
            {[
              { label: "Bandwidth", value: "Unlimited" },
              { label: "IP Addresses", value: "10,000+" },
              { label: "Uptime", value: "99.99%" },
              { label: "Audits", value: "Q3 2025 pass" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="flex flex-col items-center justify-center p-6 border-l border-white/5"
              >
                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="relative z-20 py-32 bg-surface backdrop-blur-3xl border-t border-white/5 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">Uncompromising Security, <br /> Priced Honestly.</h2>
            <p className="text-slate-400">30-day money-back guarantee. No questions asked.</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="w-full lg:w-1/3 bg-background border border-white/5 rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-bold text-slate-300 mb-2">Standard</h3>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl font-black">$6</span>
                <span className="text-slate-500 mb-1">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["AES-256 Encryption", "5 Devices", "Standard Nodes", "24/7 Support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-light">
                    <CheckCircle2 className="w-5 h-5 text-slate-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-semibold">
                Get Standard
              </button>
            </div>

            {/* Pro Plan */}
            <div className="w-full lg:w-1/3 relative bg-gradient-to-b from-[#110e26] to-[#0A0A0F] border border-primary/30 rounded-3xl p-8 flex flex-col transform lg:-translate-y-4 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Argus Pro</h3>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl font-black text-white">$12</span>
                <span className="text-slate-500 mb-1">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Quantum-Resistant Crypto", "Unlimited Devices", "10Gbps Multi-Hop Nodes", "Dedicated IP Address", "Ad/Malware Blocker"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-light">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark transition-colors font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
