
import { memo } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Cpu, Database, ShieldCheck, Globe, 
  Zap, Lock, Activity, Layers, Code, HardDrive 
} from "lucide-react"; 

import { Badge } from "@/components/ui/badge";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import BlurText from "@/components/BlurText";
import Threads from "@/components/Threads";
import LetterGlitch from "@/components/LetterGlitch";
import ScrollVelocity from "@/components/ScrollVelocity";
import StarBorder from "@/components/StarBorder";

const MemoizedThreads = memo(Threads);
const MemoizedAnimatedContent = memo(AnimatedContent);

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#030712] flex flex-col font-outfit selection:bg-[#7034ff]/30 text-white overflow-x-hidden">
      
      {/* Background Layer: Network Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <MemoizedThreads amplitude={1} distance={0.5} enableMouseInteraction={true} />
      </div>
      <div className="fixed inset-0 z-1 pointer-events-none bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-32 pb-40">
        
        {/* Back Link */}
        <MemoizedAnimatedContent distance={-10} delay={0.1} className="mb-16">
          <Link to="/" className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group backdrop-blur-3xl">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-white">Return to Terminal</span>
          </Link>
        </MemoizedAnimatedContent>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 sm:mb-40">
           <div className="text-center lg:text-left">
              <MemoizedAnimatedContent distance={30} direction="horizontal" reverse={true}>
                <div className="mb-8 overflow-hidden">
                  <LetterGlitch 
                    glitchSpeed={50}
                    centerVignette={true}
                    className="text-5xl sm:text-7xl md:text-9xl font-black font-honoble text-[#7034ff] tracking-tighter"
                  />
                  <div className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter -mt-4 sm:-mt-8">PROTOCOL</div>
                </div>
                <BlurText 
                    text="Architecture & Consensus" 
                    className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter" 
                />
                <p className="mt-8 text-sm sm:text-xl text-slate-400 font-light leading-relaxed border-none lg:border-l-2 border-[#7034ff]/30 pl-0 lg:pl-8 max-w-2xl mx-auto lg:mx-0">
                  A high-integrity decentralized voting framework built on private-state cryptography and public-ledger transparency. This system solves the paradox of <span className="text-white font-medium italic underline underline-offset-4 decoration-[#7034ff]">anonymous but verifiable democratic action</span>.
                </p>
              </MemoizedAnimatedContent>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden">
                 <ScrollVelocity 
                    texts={["Blockchain", "Ethereum", "Node.js", "Vite", "React"]}
                    velocity={50}
                    className="text-slate-800 text-4xl sm:text-6xl font-black opacity-10"
                 />
              </div>
              <AnimatedContent distance={50} delay={0.4} direction="vertical" className="col-span-1">
                 <StarBorder speed="3s" color="#7034ff" className="rounded-2xl sm:rounded-3xl w-full">
                    <div className="bg-[#0A1128]/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-3xl">
                        <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-[#7034ff] mb-4" />
                        <h4 className="font-black text-white text-base sm:text-lg">Execution Node</h4>
                    </div>
                 </StarBorder>
              </AnimatedContent>
              <AnimatedContent distance={50} delay={0.6} direction="vertical" className="col-span-1">
                 <div className="bg-[#0A1128]/20 border border-white/5 p-4 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-3xl h-full">
                    <Database className="w-6 h-6 sm:w-8 sm:h-8 text-sky-400 mb-4" />
                    <h4 className="font-black text-slate-400 text-base sm:text-lg">Encrypted Data</h4>
                 </div>
              </AnimatedContent>
           </div>
        </div>

        {/* Detailed Tech Breakdown */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Smart Contract Layer", 
              icon: Layers, 
              desc: "Written in Solidity 0.8.20. Manages voter eligibility, candidate registry, and temper-proof vote counting entirely on the Ethereum JSON-RPC network.",
              tech: ["Solidity", "Hardhat", "Ethers.js"] 
            },
            { 
              title: "Backend Core", 
              icon: Code, 
              desc: "Node.js/Express orchestration. Handles identity hashing, audit logging, and links the local MongoDB voter registry with the on-chain whitelisting engine.",
              tech: ["Express", "MongoDB", "JWT"] 
            },
            { 
              title: "Interactive UI", 
              icon: Activity, 
              desc: "React 19 based portal providing a high-end SaaS experience. Includes GSAP animations, Tailwind CSS, and React Bits visual components.",
              tech: ["React", "Vite", "GSAP", "Tailwind"] 
            }
          ].map((item, id) => (
            <AnimatedContent key={id} distance={40} delay={0.2 * id}>
              <SpotlightCard className="h-full bg-[#0A1128]/20 border-white/5 backdrop-blur-3xl p-6 sm:p-10 rounded-[32px] sm:rounded-[48px]" spotlightColor="rgba(112, 52, 255, 0.1)">
                <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 border border-white/5">
                  <item.icon className="w-6 h-6 text-[#7034ff]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-honoble mb-4 tracking-tight uppercase sm:normal-case">{item.title}</h3>
                <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed mb-10">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                   {item.tech.map((t, idx) => (
                     <Badge key={idx} variant="outline" className="border-white/5 bg-white/5 text-[8px] sm:text-[9px] font-black tracking-widest text-slate-500 rounded-full px-3 sm:px-4">{t}</Badge>
                   ))}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        {/* The "A to Z" Process */}
        <div className="mt-24 sm:mt-40 space-y-12 sm:space-y-20">
           <AnimatedContent distance={20}>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-honoble text-center mb-10 uppercase">Lifecycle of a Vote</h2>
           </AnimatedContent>
           
           <div className="relative border-l border-white/5 ml-4 sm:ml-10 space-y-16 sm:space-y-24">
              {[
                { step: "01", title: "Identity Enrollment", desc: "Admin registers a name/ID in the system. A unique 'Protocol Key' is generated and hashed.", icon: Lock },
                { step: "02", title: "Citizen Sync", desc: "Voter connects their private wallet and enters their key to link their identity.", icon: Zap },
                { step: "03", title: "Whitelisting", desc: "Admin verifies the link and executes a 'Whitelisting' transaction on the blockchain.", icon: ShieldCheck },
                { step: "04", title: "Final Ledger Entry", desc: "Voter casts their ballot. The transaction is permanently stored and encrypted on-chain.", icon: Globe }
              ].map((item, id) => (
                <AnimatedContent key={id} distance={30} delay={0.1}>
                  <div className="relative pl-10 sm:pl-16">
                     <div className="absolute -left-8 sm:-left-12 top-0 w-16 h-16 sm:w-24 sm:h-24 bg-[#030712] border-2 border-[#7034ff]/30 rounded-full flex items-center justify-center font-black text-2xl sm:text-4xl text-[#7034ff] font-honoble shadow-[0_0_50px_rgba(112,52,255,0.2)]">
                        {item.step}
                     </div>
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4">
                        <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-sky-400" strokeWidth={2.5} />
                        <h3 className="text-2xl sm:text-4xl font-black text-white font-honoble tracking-tight underline decoration-[#7034ff]/30 underline-offset-8 decoration-2 uppercase">{item.title}</h3>
                     </div>
                     <p className="text-slate-400 text-base sm:text-lg font-light max-w-2xl leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedContent>
              ))}
           </div>
        </div>

        {/* Final Tech Credits Footer */}
        <div className="mt-40 sm:mt-60 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
           <div className="flex gap-6 sm:gap-10">
              <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-[#7034ff]" />
                    <span className="text-[10px] font-black tracking-widest text-[#7034ff]">INFRASTRUCTURE</span>
                  </div>
                  <ul className="text-[11px] font-black text-slate-500 space-y-1">
                    <li>LOCAL HARDHAT NODE</li>
                    <li>MONGO CLUSTER_v4</li>
                  </ul>
              </div>
              <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-sky-400" />
                    <span className="text-[10px] font-black tracking-widest text-sky-400">STATE</span>
                  </div>
                  <ul className="text-[11px] font-black text-slate-500 space-y-1">
                    <li>MAINNET_READY</li>
                    <li>AES-256_ENCRYPT</li>
                  </ul>
              </div>
           </div>
           <div className="text-center md:text-right">
              <div className="text-2xl font-black text-white font-honoble uppercase">Ahmed Mekled</div>
              <div className="text-[8px] font-black tracking-[0.3em] uppercase text-[#7034ff] mt-2">© {new Date().getFullYear()} DECENTRALIZED PROTOCOL CORE</div>
           </div>
        </div>

      </main>
    </div>
  );
}
