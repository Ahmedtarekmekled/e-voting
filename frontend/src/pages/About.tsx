
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Cpu, Database, ShieldCheck, Globe, 
  Zap, Lock, Activity, Layers, Code, HardDrive 
} from "lucide-center"; // Fixed this to lucide-react if needed, wait it was lucide-react in previous view

import { Badge } from "@/components/ui/badge";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import BlurText from "@/components/BlurText";
import Threads from "@/components/Threads";
import LetterGlitch from "@/components/LetterGlitch";
import ScrollVelocity from "@/components/ScrollVelocity";
import StarBorder from "@/components/StarBorder";

// Note: Keeping the Lucide imports from lucide-react as originally intended
import * as LucideIcons from "lucide-react";

export default function About() {
  const { 
    ArrowLeft, Cpu, Database, ShieldCheck, Globe, 
    Zap, Lock, Activity, Layers, Code, HardDrive 
  } = LucideIcons;

  return (
    <div className="relative min-h-screen bg-[#030712] flex flex-col font-outfit selection:bg-[#7034ff]/30 text-white overflow-x-hidden">
      
      {/* Background Layer: Network Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <Threads amplitude={1} distance={0.5} enableMouseInteraction={true} />
      </div>
      <div className="fixed inset-0 z-1 pointer-events-none bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-32 pb-40">
        
        {/* Back Link */}
        <AnimatedContent distance={-10} delay={0.1} className="mb-16">
          <Link to="/" className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group backdrop-blur-3xl">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-white">Return to Terminal</span>
          </Link>
        </AnimatedContent>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
           <div>
              <AnimatedContent distance={30} direction="horizontal" reverse={true}>
                <LetterGlitch 
                   text="PROTOCOL"
                   glitchSpeed={50}
                   centerVignette={true}
                   className="text-7xl md:text-9xl font-black font-honoble text-[#7034ff] tracking-tighter mb-4"
                />
                <BlurText 
                    text="Architecture & Consensus" 
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter" 
                />
                <p className="mt-8 text-xl text-slate-400 font-light leading-relaxed border-l-2 border-[#7034ff]/30 pl-8">
                  A high-integrity decentralized voting framework built on private-state cryptography and public-ledger transparency. This system solves the paradox of <span className="text-white font-medium italic underline underline-offset-4 decoration-[#7034ff]">anonymous but verifiable democratic action</span>.
                </p>
              </AnimatedContent>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                 <ScrollVelocity 
                    texts={["Blockchain", "Ethereum", "Node.js", "Vite", "React", "GSAP"]}
                    velocity={50}
                    className="text-slate-800 text-6xl font-black opacity-10"
                 />
              </div>
              <AnimatedContent distance={50} delay={0.4} direction="vertical" className="col-span-1">
                 <StarBorder speed="3s" color="#7034ff" className="rounded-3xl w-full">
                    <div className="bg-[#0A1128]/50 p-8 rounded-3xl backdrop-blur-3xl">
                        <Cpu className="w-8 h-8 text-[#7034ff] mb-4" />
                        <h4 className="font-black text-white text-lg">Execution Node</h4>
                    </div>
                 </StarBorder>
              </AnimatedContent>
              <AnimatedContent distance={50} delay={0.6} direction="vertical" className="col-span-1">
                 <div className="bg-[#0A1128]/20 border border-white/5 p-8 rounded-3xl backdrop-blur-3xl h-full">
                    <Database className="w-8 h-8 text-sky-400 mb-4" />
                    <h4 className="font-black text-slate-400 text-lg">Encrypted Storage</h4>
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
              tech: ["Express", "MongoDB", "JWT", "Mongoose"] 
            },
            { 
              title: "Interactive UI", 
              icon: Activity, 
              desc: "React 19 based portal providing a high-end SaaS experience. Includes GSAP animations, Tailwind CSS, and React Bits visual components for UX excellence.",
              tech: ["React", "Vite", "GSAP", "Tailwind"] 
            }
          ].map((item, id) => (
            <AnimatedContent key={id} distance={40} delay={0.2 * id}>
              <SpotlightCard className="h-full bg-[#0A1128]/20 border-white/5 backdrop-blur-3xl p-10 rounded-[48px]" spotlightColor="rgba(112, 52, 255, 0.1)">
                <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 border border-white/5">
                  <item.icon className="w-6 h-6 text-[#7034ff]" />
                </div>
                <h3 className="text-3xl font-black text-white font-honoble mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-10">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                   {item.tech.map((t, idx) => (
                     <Badge key={idx} variant="outline" className="border-white/5 bg-white/5 text-[9px] font-black tracking-widest text-slate-500 rounded-full px-4">{t}</Badge>
                   ))}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        {/* The "A to Z" Process */}
        <div className="mt-40 space-y-20">
           <AnimatedContent distance={20}>
              <h2 className="text-5xl font-black text-white font-honoble text-center mb-10">Lifecycle of a Vote</h2>
           </AnimatedContent>
           
           <div className="relative border-l border-white/5 ml-10 space-y-24">
              {[
                { step: "01", title: "Identity Enrollment", desc: "Admin registers a name/ID in the system. A unique 'Protocol Key' is generated and hashed for security.", icon: Lock },
                { step: "02", title: "Citizen Synchronization", desc: "Voter connects their private wallet (MetaMask) and enters their key. This links their wallet address to their registered identity.", icon: Zap },
                { step: "03", title: "Consensus Whitelisting", desc: "Admin verifies the link and executes a 'Whitelisting' transaction, authorizing that specific wallet address to interact with the smart contract.", icon: ShieldCheck },
                { step: "04", title: "Immutable Ledger Entry", desc: "Voter casts their ballot. The transaction is permanently stored on the blockchain, encrypted and anonymous but fully auditable.", icon: Globe }
              ].map((item, id) => (
                <AnimatedContent key={id} distance={30} delay={0.1}>
                  <div className="relative pl-16">
                     <div className="absolute -left-12 top-0 w-24 h-24 bg-[#030712] border-2 border-[#7034ff]/30 rounded-full flex items-center justify-center font-black text-4xl text-[#7034ff] font-honoble shadow-[0_0_50px_rgba(112,52,255,0.2)]">
                        {item.step}
                     </div>
                     <div className="flex items-center gap-6 mb-4">
                        <item.icon className="w-8 h-8 text-sky-400" />
                        <h3 className="text-4xl font-black text-white font-honoble tracking-tight underline decoration-[#7034ff]/30 underline-offset-8 decoration-2">{item.title}</h3>
                     </div>
                     <p className="text-slate-400 text-xl font-light max-w-2xl leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedContent>
              ))}
           </div>
        </div>

        {/* Final Tech Credits Footer */}
        <div className="mt-60 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
           <div className="flex gap-10">
              <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-[#7034ff]" />
                    <span className="text-[10px] font-black tracking-widest text-[#7034ff]">INFRASTRUCTURE</span>
                  </div>
                  <ul className="text-[11px] font-black text-slate-500 space-y-1">
                    <li>AWS EC2 NODES (MANDATORY)</li>
                    <li>IPFS GATEWAYS (PLANNED)</li>
                    <li>MAINNET BRIDGE v2</li>
                  </ul>
              </div>
              <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-sky-400" />
                    <span className="text-[10px] font-black tracking-widest text-sky-400">MONITORING</span>
                  </div>
                  <ul className="text-[11px] font-black text-slate-500 space-y-1">
                    <li>DYNAMO DB AUDIT</li>
                    <li>SENTRY EXCEPTION MGT</li>
                    <li>PROMETHEUS ENGINE</li>
                  </ul>
              </div>
           </div>
           <div className="text-center md:text-right">
              <div className="text-2xl font-black text-white font-honoble">AHMED MEKLED</div>
              <div className="text-[8px] font-black tracking-[0.3em] uppercase text-[#7034ff] mt-2">© 2026 DECENTRALIZED PROTOCOL CORE</div>
           </div>
        </div>

      </main>
    </div>
  );
}
