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

  <ReactLenis root options={{ smoothWheel: true, lerp: 0.08 }}>
    <div className="relative bg-[#000000] text-white selection:bg-white selection:text-black">

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

      {/* --- SECTION 1: STICKY HERO (400vh) --- */}
      <div ref={stickyRef} className="h-[400vh] relative z-10">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">

          {/* SEC 1: HERO */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 lg:px-32 w-full"
          >
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-semibold tracking-tighter leading-[0.9] mb-8">
                <span className="text-white">CSMV.</span><br />
                <span className="text-[#86868B]">Built to last.</span>
              </h1>
              <p className="text-xl md:text-3xl text-[#86868B] font-medium max-w-2xl">
                Pro-grade software engineering. Uncompromising scale.
              </p>
            </div>
          </motion.div>

          {/* SEC 2: FIRST STATEMENT */}
          <motion.div
            style={{ opacity: s1Opacity, y: s1Y }}
            className="absolute right-[10%] w-full md:w-1/3 flex flex-col text-left px-6"
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
            className="absolute left-[10%] w-full md:w-1/3 flex flex-col text-left px-6"
          >
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-[1.05]">
              Boundless <br /> Scale.
            </h2>
            <p className="text-2xl text-[#86868B] font-medium leading-snug">
              Vertical and horizontal load balancing built to effortlessly absorb multi-million request spikes.
            </p>
          </motion.div>

        </div>

      </div>

      {/* --- SECTION 2: BENTO BOX GRID --- */}
      <div className="relative z-20 w-full bg-black py-32 px-6">
        <div className="w-full max-w-6xl mx-auto">
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
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: HORIZONTAL PANNING GALLERY --- */}
      <section ref={containerRef} className="relative z-20 w-full h-[300vh] bg-black">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Core Services.</h2>
              <p className="text-[#86868B] font-medium mt-2">Delivering reliable, scalable, and high-performance software systems.</p>
            </div>
          </div>

          <motion.div
            style={{ x: useTransform(useSpring(useScroll({ target: containerRef }).scrollYProgress, { stiffness: 40, damping: 20 }), [0.1, 0.5], ["0%", "-66%"]) }}
            className="flex gap-8 w-max pl-6 pr-6 lg:pl-[calc(50vw-616px)] lg:pr-[50vw]"
          >
            {[
              { i: Layers, t: "Product Engineering", d: "From early-stage concepts to enterprise-grade platforms, we build intuitive and scalable digital products." },
              { i: Zap, t: "Tech Modernization", d: "We strengthen legacy infrastructure, optimizing for performance, security, and future horizontal scaling." },
              { i: Activity, t: "Dedicated Teams", d: "Working as a seamless extension of your organization, combining technical depth and long-term partnership." }
            ].map((item, idx) => (
              <div key={idx} className={`w-[80vw] lg:w-[800px] shrink-0 h-[450px] bg-[#111111] border border-white/5 hover:border-white/10 rounded-[2rem] p-12 relative overflow-hidden group transition-colors duration-500`}>
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center backdrop-blur-md">
                      <item.i className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors">0{idx + 1}</h2>
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold mb-2">{item.t}</h3>
                    <p className="text-[#86868B] text-lg max-w-md leading-snug">{item.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: INTERACTIVE ACCORDION SHOWCASE --- */}
      <section className="relative z-20 py-40 bg-black overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-[#86868B] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-white/50" /> The CSMV Approach
              </h2>
              <h3 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-none">
                Outcomes, <br /> Not Just Code.
              </h3>
            </div>
            <p className="text-[#86868B] text-lg max-w-sm font-medium">
              We combine technical depth with structured execution to build highly reliable platforms for ambitious organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">
            {/* Left Side: Interactive List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {featuresList.map((step, idx) => {
                const isActive = activeFeature === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveFeature(idx)}
                    className={`group relative overflow-hidden bg-[#111111] border rounded-[2rem] p-8 md:p-10 cursor-pointer transition-all duration-500
                      ${isActive ? 'border-white/20 bg-[#161616]' : 'border-white/5 hover:border-white/10'}
                    `}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl bg-black border flex items-center justify-center transition-colors shrink-0
                            ${isActive ? 'border-white/30' : 'border-white/5'}
                         `}>
                          <step.icon className={`w-8 h-8 transition-colors ${isActive ? 'text-white' : 'text-[#86868B]'}`} />
                        </div>
                        <h4 className={`text-2xl md:text-3xl font-semibold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-[#86868B]'}`}>
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Side: The Focus Dock */}
            <div className="lg:col-span-5 relative w-full h-[600px] lg:h-auto rounded-[3rem] bg-[#111111] border border-white/5 flex flex-col justify-end p-10 md:p-12 overflow-hidden">
              <div className="relative z-10 w-full bg-black/80 border border-white/10 p-8 rounded-3xl mt-auto shadow-xl transition-all duration-500 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span></span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white">{featuresList[activeFeature].stat}</span>
                </div>

                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-3xl font-semibold mb-4 tracking-tighter leading-tight text-white">{featuresList[activeFeature].title}</h4>
                  <p className="text-[#86868B] leading-relaxed mb-8">{featuresList[activeFeature].desc}</p>
                </motion.div>

                <MagneticButton className="w-full py-4 bg-white text-black rounded-xl font-semibold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform">
                  Start a Conversation
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: FOOTER CTA --- */}
      <section className="relative z-20 h-screen bg-black overflow-hidden flex items-center justify-center border-t border-white/5">
        <div className="text-center flex flex-col items-center z-10">
          <h2 className="text-7xl md:text-9xl font-semibold tracking-tighter mb-8 leading-[0.9] text-white">
            Start <br /> Building.
          </h2>
          <MagneticButton className="px-16 py-6 border border-white text-white rounded-full font-semibold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors duration-300">
            Partner With Us
          </MagneticButton>
        </div>
      </section>

    </div>
  </ReactLenis>
  );
}
