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
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { margin: "0px 0px 500px 0px" });

  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03)_0%,rgba(5,5,5,1)_70%)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
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
                <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-slate-200">CSMV Solutions</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1] text-white"
              >
                Build systems <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 relative inline-block">
                  that last.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="text-lg text-slate-400 max-w-lg leading-relaxed font-light"
              >
                We specialize in product engineering, technology modernization, and dedicated engineering teams. Delivering reliable, scalable, and high-performance software systems for growing businesses.
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
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Core Services.</h2>
                <p className="text-slate-400 font-light mt-2">Delivering reliable, scalable, and high-performance software systems.</p>
              </div>
              <div className="hidden md:flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Global Technology Partner</span>
              </div>
            </div>

            {/* Horizontal Track */}
            <motion.div
              style={{ x: useTransform(smoothY, [0.1, 0.5], ["0%", "-66%"]) }}
              className="flex gap-8 w-max pl-6 pr-6 lg:pl-[calc(50vw-616px)] lg:pr-[50vw]"
            >
              {[
                { i: Layers, t: "Product Engineering", d: "From early-stage concepts to enterprise-grade platforms, we build intuitive and scalable digital products." },
                { i: Zap, t: "Tech Modernization", d: "We strengthen legacy infrastructure, optimizing for performance, security, and future horizontal scaling." },
                { i: Activity, t: "Dedicated Teams", d: "Working as a seamless extension of your organization, combining technical depth and long-term partnership." }
              ].map((item, idx) => (
                <div key={idx} className={`w-[80vw] lg:w-[800px] shrink-0 h-[450px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 rounded-[2rem] p-12 relative overflow-hidden group transition-colors duration-500`}>
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] group-hover:bg-white/[0.04] transition-colors duration-1000" />
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

        {/* --- INTERACTIVE ACCORDION SHOWCASE (Redesigned Section 3) --- */}
        <section className="relative z-20 py-40 bg-[#050505] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
              <div>
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-300 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-white/50" /> The CSMV Approach
                </h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-none">
                  Outcomes, <br /> Not Just Code.
                </h3>
              </div>
              <p className="text-slate-400 font-light text-lg max-w-sm">
                We combine technical depth with structured execution to build highly reliable platforms for ambitious organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">

              {/* Left Side: Massive Interactive Accordion / List */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {featuresList.map((step, idx) => {
                  const isActive = activeFeature === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveFeature(idx)}
                      className={`group relative overflow-hidden bg-[#0A0A0A] border rounded-[2rem] p-8 md:p-10 cursor-pointer transition-all duration-500
                      ${isActive ? 'border-white/20' : 'border-white/5 hover:border-white/10'}
                    `}
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b transition-colors duration-500
                       ${isActive ? 'from-transparent via-white/50 to-transparent' : 'from-transparent via-white/0 to-transparent group-hover:via-white/20'}
                    `} />

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-2xl bg-black/40 border flex items-center justify-center transition-colors shrink-0 backdrop-blur-md
                            ${isActive ? 'border-white/30' : 'border-white/5 group-hover:border-white/20'}
                         `}>
                            <step.icon className={`w-8 h-8 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                          </div>
                          <h4 className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {step.title}
                          </h4>
                        </div>

                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 md:ml-auto shrink-0 hidden md:flex
                         ${isActive ? 'bg-white text-black border-white' : 'border-white/10 text-white/50 group-hover:border-white/30 group-hover:text-white'}
                      `}>
                          <ChevronRight className={`w-5 h-5 transition-all ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right Side: The Diamond Dock (Massive Vertical Target) */}
              <div className="lg:col-span-5 relative w-full h-[600px] lg:h-auto rounded-[3rem] bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors duration-500 overflow-hidden flex flex-col justify-end p-10 md:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

                {/* Empty space at the top reserved for the scrolling 3D Diamond to land */}
                <div className="absolute top-0 right-0 w-full h-1/2 pointer-events-none" />

                <div className="relative z-10 w-full backdrop-blur-md bg-black/40 border border-white/5 p-8 rounded-3xl mt-auto shadow-xl transition-all duration-500">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white/50 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-white/80"></span></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{featuresList[activeFeature].stat}</span>
                  </div>

                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-3xl font-black mb-4 tracking-tighter leading-tight">{featuresList[activeFeature].title}</h4>
                    <p className="text-slate-400 font-light leading-relaxed mb-8">{featuresList[activeFeature].desc}</p>
                  </motion.div>

                  <MagneticButton className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform">
                    Start a Conversation
                  </MagneticButton>
                </div>
              </div>

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
            className="absolute w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-10 mix-blend-screen"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 text-center flex flex-col items-center"
          >
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white mix-blend-difference">
              Start <br /> Building.
            </h2>
            <MagneticButton className="px-16 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-colors duration-300">
              Partner With Us
            </MagneticButton>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
}
