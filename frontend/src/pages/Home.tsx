
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Globe, Fingerprint, 
  Activity, Box, Cpu, Lock, Zap, MousePointer2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Design Components
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import ClickSpark from "@/components/ClickSpark";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import Threads from "@/components/Threads";
import StarBorder from "@/components/StarBorder";
import TrueFocus from "@/components/TrueFocus";
import GradientText from "@/components/GradientText";

export default function Home() {
  return (
    <ClickSpark sparkColor='#7034ff' sparkSize={10} sparkRadius={15}>
      <div className="relative h-screen bg-[#030712] flex flex-col font-outfit selection:bg-[#7034ff]/30 text-white selection:text-white overflow-hidden">
        
        {/* Immersive Network Threads Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <Threads amplitude={2} distance={0.5} enableMouseInteraction={true} />
        </div>
        
        {/* Soft Vignette Overlay */}
        <div className="fixed inset-0 z-1 bg-gradient-to-tr from-[#030712] via-transparent to-[#030712]/50 pointer-events-none" />

        {/* Floating Top Navigation */}
        <nav className="absolute top-0 left-0 w-full z-50 p-10 flex justify-between items-start pointer-events-none">
            <AnimatedContent distance={-10} className="pointer-events-auto">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#7034ff] animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">E-Voting Terminal</span>
                    </div>
                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-5">Status: Node_Sync_Active</div>
                </div>
            </AnimatedContent>
            
            <AnimatedContent distance={-10} delay={0.2} className="pointer-events-auto">
                <Link to="/about" className="group flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#7034ff] group-hover:text-white transition-colors">Protocol.docs</span>
                    <div className="h-0.5 w-12 bg-[#7034ff] group-hover:w-20 transition-all" />
                </Link>
            </AnimatedContent>
        </nav>

        {/* MAIN LAYOUT REDESIGN - HORIZONTAL SPLIT */}
        <main className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-24 pb-12">
            
            {/* HERO CENTER */}
            <div className="flex flex-col items-center text-center w-full mb-16 px-10">
                <AnimatedContent distance={20} duration={1} className="mb-4">
                    <TrueFocus 
                        sentence="Decentralized Democracy"
                        manualMode={false}
                        blurAmount={12}
                        borderColor="#7034ff"
                        glowColor="rgba(112, 52, 255, 0.4)"
                        className="text-6xl md:text-[9rem] font-black text-white tracking-tighter font-honoble leading-[0.8]"
                    />
                </AnimatedContent>
                
                <AnimatedContent distance={10} delay={0.6}>
                    <GradientText 
                        colors={["#FFFFFF", "#7034ff", "#FFFFFF"]}
                        animationSpeed={3}
                        showBorder={false}
                        className="text-lg md:text-2xl font-light tracking-widest text-slate-400 max-w-3xl mb-8"
                    >
                        Establishing trustless state transitions on a globally distributed shard.
                    </GradientText>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20" />
                        <ShinyText text="AUTHORIZATION REQUIRED" speed={2} className="text-[8px] font-black tracking-[0.6em] text-slate-500 uppercase" />
                        <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20" />
                    </div>
                </AnimatedContent>
            </div>

            {/* ACTION CARDS - NEW COMPACT LAYOUT */}
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl px-10 items-stretch">
                
                {/* Voter Action */}
                <AnimatedContent distance={30} delay={0.8} direction="horizontal" reverse={true} className="flex-1">
                    <StarBorder speed="5s" color="#7034ff" className="rounded-[32px] h-full w-full">
                        <Link to="/voter" className="block h-full group">
                            <SpotlightCard className="bg-[#0A1128]/40 border-none backdrop-blur-3xl p-12 rounded-[32px] h-full flex flex-col items-center text-center hover:bg-[#7034ff]/10 transition-all duration-500" spotlightColor="rgba(112, 52, 255, 0.1)">
                                <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:border-[#7034ff]/40 transition-all">
                                    <Fingerprint className="w-8 h-8 text-sky-400" />
                                </div>
                                <h2 className="text-4xl font-black text-white font-honoble mb-4 tracking-tighter">Citizen Booth</h2>
                                <p className="text-slate-500 font-light text-sm leading-relaxed mb-10 max-w-[240px]">Link your private signature and join the on-chain consensus.</p>
                                <div className="mt-auto px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-xl w-full group-hover:bg-[#7034ff] group-hover:text-white transition-all shadow-xl">
                                    Enter Station
                                </div>
                            </SpotlightCard>
                        </Link>
                    </StarBorder>
                </AnimatedContent>

                {/* Admin Action */}
                <AnimatedContent distance={30} delay={1} direction="horizontal" className="flex-1">
                    <Link to="/admin" className="block h-full group">
                        <SpotlightCard className="bg-[#0A1128]/20 border border-white/5 backdrop-blur-3xl p-12 rounded-[32px] h-full flex flex-col items-center text-center hover:bg-sky-500/[0.03] transition-all duration-500" spotlightColor="rgba(56, 189, 248, 0.05)">
                            <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:border-sky-500/30 transition-all">
                                <Lock className="w-8 h-8 text-[#7034ff]" />
                            </div>
                            <h2 className="text-4xl font-black text-white font-honoble mb-4 tracking-tighter text-center">Governance</h2>
                            <p className="text-slate-500 font-light text-sm leading-relaxed mb-10 max-w-[240px]">Access the master shell to audit the global ledger registry.</p>
                            <div className="mt-auto px-10 py-5 border border-white/10 bg-white/5 text-white font-black text-sm uppercase tracking-widest rounded-xl w-full group-hover:bg-white/10 transition-all shadow-xl">
                                Open Console
                            </div>
                        </SpotlightCard>
                    </Link>
                </AnimatedContent>

            </div>

        </main>

        {/* MINIMAL CORNER FOOTER */}
        <footer className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-end opacity-20 pointer-events-none">
            <div className="flex gap-12">
                <div className="flex items-center gap-3">
                    <MousePointer2 className="w-3 h-3 text-[#7034ff]" />
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white">Interaction Node Live</span>
                </div>
                <div className="flex items-center gap-3">
                    <Zap className="w-3 h-3 text-sky-400" />
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white">Energy Consumption: Min</span>
                </div>
            </div>
            <div className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase">Ahmed Mekled — Decentralized Core 2026</div>
        </footer>

      </div>
    </ClickSpark>
  );
}
