
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConnectWallet } from '@/components/ConnectWallet';
import { JsonRpcSigner } from 'ethers';
import { getContract } from '@/chain/config';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2, Lock, CheckCircle2, AlertCircle, Fingerprint, Activity, Box, ShieldCheck, Zap, Globe, Share2, UserCheck } from 'lucide-react';

// Design Components
import SpotlightCard from "@/components/SpotlightCard";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";
import ClickSpark from "@/components/ClickSpark";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import Threads from "@/components/Threads";
import StarBorder from "@/components/StarBorder";

const API_URL = 'http://localhost:4000/api';

export default function Voter() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [status, setStatus] = useState({ linked: false, whitelisted: false, voted: false });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    if (signer && address) {
        checkStatus();
        fetchCandidates();
    }
  }, [signer, address]);

  const checkStatus = async () => {
      try {
          const res = await axios.get(`${API_URL}/voter/status/${address}`);
          const backendStatus = res.data;
          const contract = await getContract(signer!);
          const isAllowed = await contract.allowedVoters(address);
          const hasVoted = await contract.hasVoted(address);
          setStatus({ linked: backendStatus.linked, whitelisted: isAllowed, voted: hasVoted });
      } catch (err) { console.error(err); }
  };

  const fetchCandidates = async () => {
      try {
          const contract = await getContract(signer!);
          const count = await contract.getCandidatesCount();
          const list = [];
          for(let i=0; i < Number(count); i++) {
              const c = await contract.getCandidate(i);
              list.push({ id: Number(c.id), name: c.name, voteCount: Number(c.voteCount) });
          }
          setCandidates(list);
      } catch (err) { console.error("Error fetching candidates", err); }
  };

  const linkWallet = async () => {
      if(!code || !address) return;
      setLoading(true);
      try {
          await axios.post(`${API_URL}/voter/link-wallet`, { code, walletAddress: address });
          toast.success("Identity Cryptography Established");
          checkStatus();
      } catch (err: any) {
          toast.error(err.response?.data?.error || "Failed to link");
      } finally { setLoading(false); }
  };

  const castVote = async (id: number) => {
      if (!status.whitelisted) { toast.error("Verification Required"); return; }
      try {
          const contract = await getContract(signer!);
          const tx = await contract.vote(id);
          const toastId = toast.loading("Broadcasting to network...");
          tx.wait().then(() => {
              toast.dismiss(toastId);
              toast.success("Vote Immutableized On-Chain");
              checkStatus();
              fetchCandidates();
          });
      } catch (err: any) {
          console.error(err);
          toast.error("Network Error: " + (err.reason || err.message));
      }
  };

  return (
    <ClickSpark sparkColor='#7034ff' sparkSize={15} sparkRadius={20}>
      <div className="relative h-screen bg-[#030712] flex flex-col font-outfit selection:bg-[#7034ff]/30 text-white overflow-hidden">
        
        {/* Advanced Network Threads Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Threads amplitude={1} distance={0.4} enableMouseInteraction={true} />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#060A14] via-transparent to-[#0A1128] pointer-events-none" />

        {/* Floating Top Navigation */}
        <nav className="absolute top-0 left-0 w-full z-50 p-4 flex justify-center pointer-events-none">
            <AnimatedContent distance={-10} duration={1} className="pointer-events-auto">
                <div className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-3xl flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 shadow-2xl">
                    <Activity className="w-3.5 h-3.5 text-[#7034ff] animate-pulse" />
                    <span>Secure Voting Terminal v4.0</span>
                    <div className="w-px h-3 bg-white/10 mx-1" />
                    <span className="text-emerald-500">Live Connection</span>
                </div>
            </AnimatedContent>
        </nav>

        <main className="relative z-10 w-full h-full max-w-[1500px] mx-auto px-8 flex items-center overflow-hidden">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center w-full h-[85%] max-h-[800px]">
            
            {/* Left Section: Compact Dashboard */}
            <div className="lg:w-[35%] h-full flex flex-col justify-center">
                <AnimatedContent distance={20} delay={0.1} direction="horizontal" reverse={true}>
                    <div className="mb-8">
                        <SplitText 
                            text="Citizen Booth" 
                            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2" 
                            delay={30}
                            animationStepDuration={0.3}
                        />
                        <p className="text-slate-400 text-sm font-light leading-relaxed border-l-2 border-[#7034ff]/30 pl-6 max-w-sm">
                            Verify your signature and cast your immutable block to the global ledger.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <ConnectWallet onConnect={(s, a) => { setSigner(s); setAddress(a); }} />
                        
                        {address && (
                            <SpotlightCard className="bg-[#0A1128]/30 border-white/5 backdrop-blur-3xl p-6 rounded-[32px]" spotlightColor="rgba(112, 52, 255, 0.1)">
                                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                    <Globe className="w-4 h-4 text-sky-400" />
                                    <h2 className="text-sm font-black text-white font-honoble uppercase tracking-tighter">Protocol Status</h2>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: "LINKED", state: status.linked, icon: Zap },
                                        { label: "AUTH", state: status.whitelisted, icon: UserCheck },
                                        { label: "VOTED", state: status.voted, icon: Fingerprint }
                                    ].map((item, id) => (
                                        <div key={id} className="flex flex-col items-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl transition-all">
                                            <item.icon className={`w-4 h-4 ${item.state ? 'text-[#7034ff]' : 'text-slate-800'}`} />
                                            <span className={`text-[7px] font-black tracking-widest ${item.state ? 'text-white' : 'text-slate-800'}`}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </SpotlightCard>
                        )}
                    </div>
                </AnimatedContent>
            </div>

            {/* Right Section: Scrollable Action Area with hidden scrollbar */}
            <div className="lg:w-[65%] w-full h-full flex flex-col items-center justify-center relative">
                {signer ? (
                    <div className="w-full h-full overflow-y-auto no-scrollbar py-8 flex flex-col items-center">
                        {!status.linked ? (
                             <AnimatedContent distance={30} delay={0.4} className="w-full max-w-xl">
                                <StarBorder speed="4s" color="#7034ff" className="rounded-[40px] w-full">
                                    <SpotlightCard className="bg-[#030712]/90 border-none backdrop-blur-3xl p-12 rounded-[40px] shadow-[0_0_100px_rgba(112,52,255,0.15)] flex flex-col justify-center min-h-[450px]" spotlightColor="rgba(56, 189, 248, 0.15)">
                                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[28px] flex items-center justify-center mb-8 mx-auto">
                                            <Lock className="w-8 h-8 text-sky-400" />
                                        </div>
                                        <h3 className="text-4xl font-black text-white font-honoble mb-4 tracking-tighter text-center">Identity Sync</h3>
                                        <p className="text-slate-500 font-light text-sm mb-10 text-center max-w-xs mx-auto leading-relaxed">Enter your private 6-digit encryption code to link your identity.</p>
                                        <div className="space-y-8">
                                            <Input 
                                                placeholder="0 0 0 0 0 0" 
                                                className="h-24 text-center text-5xl tracking-[0.4em] font-black bg-black border-white/10 text-sky-400 rounded-[28px] focus-visible:ring-[#7034ff]/40 shadow-2xl transition-all font-mono" 
                                                maxLength={6}
                                                value={code}
                                                onChange={(e: any) => setCode(e.target.value)}
                                            />
                                            <Button 
                                                onClick={linkWallet} 
                                                disabled={loading || code.length < 6}
                                                className="w-full h-20 bg-white text-black hover:bg-slate-200 font-black text-xl rounded-[28px] shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="animate-spin w-6 h-6 mr-3" /> : <ShieldCheck className="w-6 h-6 mr-3" />}
                                                {loading ? 'SYNCING...' : 'ESTABLISH LINK'}
                                            </Button>
                                        </div>
                                    </SpotlightCard>
                                </StarBorder>
                             </AnimatedContent>
                        ) : (
                            <AnimatedContent distance={30} delay={0.6} className="w-full max-w-4xl pb-10">
                                <SpotlightCard className="bg-[#030712]/40 backdrop-blur-3xl border border-white/5 p-12 rounded-[40px] overflow-hidden" spotlightColor="rgba(112, 52, 255, 0.1)">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-white/10 pb-10">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 bg-[#7034ff]/10 border border-[#7034ff]/20 rounded-[28px] text-[#7034ff]">
                                                <Share2 className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-4xl font-black text-white font-honoble tracking-tighter">On-Chain Ballot</h2>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${status.whitelisted ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-amber-500'}`} />
                                                    <ShinyText text={status.whitelisted ? "LEDGER READ-WRITE ACTIVE" : "AWAITING ADMIN AUTHORIZATION"} className="text-[8px] tracking-[0.2em] font-black text-slate-500 uppercase" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6">
                                        {candidates.map((c, i) => (
                                            <div key={c.id} className="group relative overflow-hidden flex items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-[#7034ff]/40 hover:bg-[#7034ff]/5 transition-all duration-500">
                                                <div className="flex items-center gap-8 z-10">
                                                    <div className="w-16 h-16 rounded-[20px] bg-white/5 border border-white/10 flex items-center justify-center font-black text-slate-500 group-hover:text-[#7034ff] group-hover:border-[#7034ff]/30 transition-all font-honoble text-3xl">{i+1}</div>
                                                    <div>
                                                        <h3 className="font-black text-3xl text-white tracking-tighter mb-1">{c.name}</h3>
                                                        <div className="flex items-center gap-3">
                                                           <Badge variant="outline" className="bg-white/5 border-white/5 text-[9px] font-black tracking-widest text-[#7034ff] px-3 rounded-full">BLOCK {400 + i}</Badge>
                                                           {status.voted && <span className="text-[8px] text-emerald-400 font-bold tracking-widest">VERIFIED</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="z-10">
                                                    {status.voted ? (
                                                        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            <span className="font-black uppercase text-[10px] tracking-widest">Recorded</span>
                                                        </div>
                                                    ) : (
                                                        <Button 
                                                            onClick={() => castVote(c.id)} 
                                                            disabled={!status.whitelisted}
                                                            className="h-16 px-10 bg-white text-black hover:bg-[#7034ff] hover:text-white font-black text-lg rounded-[22px] shadow-xl transition-all active:scale-95 disabled:opacity-30 border-none group-hover:translate-x-1"
                                                        >
                                                            VOTE
                                                        </Button>
                                                    )}
                                                </div>
                                                
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#7034ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            </AnimatedContent>
                        )}
                    </div>
                ) : (
                    <AnimatedContent distance={30} delay={0.4} className="flex items-center justify-center text-center">
                        <div>
                            <div className="w-24 h-24 bg-white/5 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                <WalletIcon className="w-12 h-12 text-slate-700" />
                            </div>
                            <h2 className="text-4xl font-black text-white font-honoble mb-3 tracking-tighter uppercase">Awaiting Link</h2>
                            <p className="text-slate-600 text-sm font-light">Bridge your signature to the voting node.</p>
                        </div>
                    </AnimatedContent>
                )}
            </div>

          </div>

          {/* Fixed Footer Stats */}
          <div className="absolute bottom-6 left-0 w-full px-8 flex justify-between items-end opacity-40 pointer-events-none">
              <div className="space-y-4">
                  {[
                      { label: "Blockchain Latency", val: "1.2ms" },
                      { label: "Consensus Proof", val: "ERC-721/POW" }
                  ].map((stat, i) => (
                      <div key={i} className="space-y-0">
                          <div className="text-lg font-black text-white font-honoble">{stat.val}</div>
                          <div className="text-[7px] uppercase tracking-[0.3em] font-black text-slate-600">{stat.label}</div>
                      </div>
                  ))}
              </div>
              <div className="space-y-4 text-right">
                  {[
                      { label: "Encryption Grade", val: "SHA-256" },
                      { label: "Network State", val: "Mainnet Beta" }
                  ].map((stat, i) => (
                      <div key={i} className="space-y-0">
                          <div className="text-lg font-black text-white font-honoble">{stat.val}</div>
                          <div className="text-[7px] uppercase tracking-[0.3em] font-black text-slate-600">{stat.label}</div>
                      </div>
                  ))}
              </div>
          </div>

        </main>
      </div>
    </ClickSpark>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
