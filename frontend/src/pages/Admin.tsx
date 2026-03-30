
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import axios from 'axios';
import { 
  Plus, RefreshCw, LayoutDashboard, UserPlus, LogOut, 
  ShieldCheck, ListOrdered, UserCheck, Key, Zap, 
  Activity, Globe, Fingerprint, Lock, ShieldAlert 
} from 'lucide-react';

import Threads from "@/components/Threads";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";
import DecryptedText from "@/components/DecryptedText";
import StarBorder from "@/components/StarBorder";
import SplitText from "@/components/SplitText";

const API_URL = 'http://localhost:4000/api';

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [voters, setVoters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Create Voter State
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (token) {
        fetchVoters();
        fetchResults();
    }
  }, [token]);

  const login = async () => {
    try {
        const res = await axios.post(`${API_URL}/admin/login`, { password });
        if (res.data.ok) {
            localStorage.setItem('adminToken', res.data.token);
            setToken(res.data.token);
            toast.success("Security authorization confirmed.");
        }
    } catch (err) {
        toast.error("Invalid decryption key provided.");
    }
  };

  const logout = () => {
      localStorage.removeItem('adminToken');
      setToken(null);
  };

  const fetchVoters = async () => {
      setLoading(true);
      try {
          const res = await axios.get(`${API_URL}/admin/voters`, { headers: { 'x-admin-token': token }});
          setVoters(res.data);
      } catch (err) {
          toast.error("Failed to retrieve registry.");
      } finally {
          setLoading(false);
      }
  };

  const fetchResults = async () => {
    try {
        const res = await axios.get(`${API_URL}/results`);
        setResults(res.data);
    } catch (err) {
        console.error(err);
    }
  };

  const createVoter = async () => {
      if(!newName || !newId) return;
      try {
          await axios.post(`${API_URL}/admin/voters`, { name: newName, universityIdOrEmail: newId }, { headers: { 'x-admin-token': token }});
          toast.success("Identity profile established.");
          setCreateOpen(false);
          setNewName('');
          setNewId('');
          fetchVoters();
      } catch (err) {
          toast.error("Protocol registration error.");
      }
  };

  const issueCode = async (id: string, name: string) => {
      try {
          const res = await axios.post(`${API_URL}/admin/voters/${id}/issue-code`, {}, { headers: { 'x-admin-token': token }});
          alert(`PRIVATE AUTH KEY FOR ${name}: ${res.data.code}\n\nDeliver this hash securely to the participant.`);
          fetchVoters();
      } catch (err) {
          toast.error("Key generation failed.");
      }
  };

  const whitelistVoter = async (id: string) => {
      try {
          const toastId = toast.loading("Executing ledger write...");
          await axios.post(`${API_URL}/admin/voters/${id}/whitelist`, {}, { headers: { 'x-admin-token': token }});
          toast.dismiss(toastId);
          toast.success("Ledger updated: Identity whitelisted.");
          fetchVoters();
      } catch (err: any) {
          toast.dismiss();
          toast.error(err.response?.data?.error || "On-chain write failed.");
      }
  };

  if (!token) {
    return (
        <div className="relative flex items-center justify-center h-screen bg-[#030712] overflow-hidden font-outfit">
             <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <Threads amplitude={1} distance={0.4} />
            </div>
            
            <AnimatedContent distance={30} direction="vertical" className="relative z-10 w-full max-w-md px-6">
                <StarBorder speed="5s" color="#7034ff" className="rounded-[40px] w-full">
                    <SpotlightCard className="bg-[#030712]/90 border-none backdrop-blur-3xl p-12 rounded-[400px]" spotlightColor="rgba(112, 52, 255, 0.1)">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-[#7034ff]/10 border border-[#7034ff]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShieldAlert className="w-8 h-8 text-[#7034ff]" />
                            </div>
                            <h2 className="text-4xl font-black text-white font-honoble mb-2">Admin Terminal</h2>
                            <ShinyText text="SECURE CONSOLE ACCESS" speed={3} className="text-[10px] tracking-[0.2em] font-black text-slate-500" />
                        </div>
                        <div className="space-y-6">
                            <Input 
                                type="password" 
                                placeholder="CONSOLE KEY" 
                                className="h-16 bg-black border-white/10 text-white rounded-2xl focus:ring-[#7034ff]/30 text-center font-mono tracking-widest text-lg" 
                                value={password} 
                                onChange={(e: any) => setPassword(e.target.value)} 
                            />
                            <Button className="w-full h-16 bg-white text-black hover:bg-slate-200 font-black rounded-2xl transition-all shadow-2xl active:scale-95" onClick={login}>
                                AUTHORIZE ENTRY
                            </Button>
                        </div>
                    </SpotlightCard>
                </StarBorder>
            </AnimatedContent>
        </div>
    );
  }

  return (
    <div className="relative h-screen bg-[#030712] flex flex-col font-outfit selection:bg-[#7034ff]/30 text-white overflow-hidden">
        {/* Threads Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <Threads amplitude={1} distance={0.5} enableMouseInteraction={true} />
        </div>

        {/* Global Terminal Header */}
        <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
            <AnimatedContent distance={-20} className="pointer-events-auto">
                <div className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-3xl flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 shadow-2xl">
                    <Activity className="w-3.5 h-3.5 text-[#7034ff] animate-pulse" />
                    <span>Governance Hub Terminal v4.0</span>
                    <div className="w-px h-3 bg-white/10 mx-1" />
                    <span className="text-emerald-500">Node Synchronized</span>
                </div>
            </AnimatedContent>
            
            <AnimatedContent distance={-20} className="pointer-events-auto">
                <Button variant="ghost" size="sm" className="h-10 px-6 border-white/5 text-slate-500 hover:text-red-400 bg-white/[0.03] rounded-full text-[9px] tracking-widest font-black uppercase transition-all" onClick={logout}>
                    <LogOut className="w-3.5 h-3.5 mr-2" /> TerminateSession
                </Button>
            </AnimatedContent>
        </nav>

        <main className="relative z-10 w-full h-full max-w-[1700px] mx-auto px-10 pt-32 pb-10 flex flex-col items-center">
            
            <div className="flex flex-col lg:flex-row gap-10 w-full h-full items-start overflow-hidden">
                
                {/* Left Section: Dashboard Summaries (30%) */}
                <div className="lg:w-[30%] h-full flex flex-col gap-8">
                    <AnimatedContent distance={20} delay={0.1} direction="horizontal" reverse={true}>
                        <div className="mb-4">
                            <SplitText 
                                text="Governance" 
                                className="text-5xl font-black text-white tracking-tighter" 
                                delay={30}
                                animationStepDuration={0.3}
                            />
                            <p className="text-slate-500 text-sm font-light leading-relaxed mt-2 uppercase tracking-widest">Global Consensus Registry</p>
                        </div>

                        {/* Vote Count Stats Card */}
                        <SpotlightCard className="bg-[#0A1128]/30 border-white/5 backdrop-blur-3xl p-8 rounded-[40px]" spotlightColor="rgba(56, 189, 248, 0.1)">
                            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                                <ListOrdered className="w-5 h-5 text-sky-400" />
                                <h2 className="text-xl font-black text-white font-honoble uppercase tracking-tight">Active Ballot Count</h2>
                            </div>
                            <div className="space-y-4">
                                {results.map((c: any) => (
                                    <div key={c.id} className="flex justify-between items-center p-5 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-sky-500/30 transition-all">
                                        <span className="font-bold text-slate-300 group-hover:text-white uppercase text-xs tracking-tighter">{c.name}</span>
                                        <Badge className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-lg px-4 py-1.5 font-black">{c.voteCount}</Badge>
                                    </div>
                                ))}
                                {results.length === 0 && <p className="text-slate-600 text-[10px] text-center py-10 uppercase font-black">Syncing ledger results...</p>}
                                <Button variant="ghost" size="sm" className="w-full mt-2 text-[#7034ff] hover:bg-[#7034ff]/5 font-black text-[9px] tracking-widest" onClick={fetchResults}>
                                    <RefreshCw className="w-3 h-3 mr-2" /> RE-SCAN BLOCKCHAIN
                                </Button>
                            </div>
                        </SpotlightCard>
                    </AnimatedContent>
                </div>

                {/* Right Section: Registry Management (70%) */}
                <div className="lg:w-[70%] h-full flex flex-col overflow-hidden">
                    <AnimatedContent distance={30} delay={0.3} className="h-full flex flex-col">
                        <SpotlightCard className="bg-[#0A1128]/20 border border-white/5 backdrop-blur-3xl p-0 h-full flex flex-col rounded-[48px] overflow-hidden" spotlightColor="rgba(112, 52, 255, 0.1)">
                            <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-10 border-b border-white/5">
                                <div>
                                    <h2 className="text-4xl font-black text-white font-honoble tracking-tight">Participant Registry</h2>
                                    <div className="flex items-center gap-3 mt-2">
                                        <Fingerprint className="w-4 h-4 text-[#7034ff]" />
                                        <ShinyText text="ENCRYPTED IDENTITY DATABASE" className="text-[10px] tracking-[0.3em] font-black text-slate-600 uppercase" />
                                    </div>
                                </div>
                                <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-[#7034ff] hover:bg-[#834fff] text-white font-black px-10 h-16 rounded-[24px] shadow-[0_20px_50px_rgba(112,52,255,0.2)] transition-all active:scale-95 text-lg">
                                            <UserPlus className="w-6 h-6 mr-3" /> ENROLL IDENTITY
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-[#030712]/95 border-white/10 backdrop-blur-3xl rounded-[40px] p-12 max-w-md">
                                        <DialogHeader className="mb-10">
                                            <DialogTitle className="text-4xl font-black text-white font-honoble text-center">New Enrollment</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-4">Full Identity Name</label>
                                                <Input placeholder="Citizen Name" className="h-16 bg-white/5 border-white/10 text-white rounded-2xl px-6" value={newName} onChange={(e: any) => setNewName(e.target.value)} />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-4">Registry ID / Reference</label>
                                                <Input placeholder="UN-X-000000" className="h-16 bg-white/5 border-white/10 text-white rounded-2xl px-6 font-mono" value={newId} onChange={(e: any) => setNewId(e.target.value)} />
                                            </div>
                                            <Button onClick={createVoter} className="w-full h-16 bg-[#7034ff] hover:bg-[#834fff] text-white font-black text-xl rounded-3xl mt-6 shadow-2xl">
                                                ENCRYPT & STORE
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            
                            {/* Scrollable Registry Table Container */}
                            <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
                                <Table>
                                    <TableHeader className="bg-white/[0.03] sticky top-0 z-20">
                                        <TableRow className="border-white/5 hover:bg-transparent">
                                            <TableHead className="text-slate-500 font-black tracking-widest py-8 px-10 text-[10px]">IDENTITY HASH</TableHead>
                                            <TableHead className="text-slate-500 font-black tracking-widest py-8 text-[10px]">REFERENCE</TableHead>
                                            <TableHead className="text-slate-500 font-black tracking-widest py-8 text-[10px]">KEY STATE</TableHead>
                                            <TableHead className="text-slate-500 font-black tracking-widest py-8 text-[10px]">LEDGER ADR</TableHead>
                                            <TableHead className="text-slate-500 font-black tracking-widest py-8 text-[10px]">PROTOCOL STATE</TableHead>
                                            <TableHead className="text-right py-8 px-10"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {voters.map((v) => (
                                            <TableRow key={v._id} className="border-white/5 hover:bg-white/[0.03] group transition-colors">
                                                <TableCell className="font-bold text-white py-8 px-10 text-lg">
                                                    <DecryptedText text={v.name} animateOn="view" revealDuration={0.8} />
                                                </TableCell>
                                                <TableCell className="text-slate-500 font-mono text-xs">{v.universityIdOrEmail}</TableCell>
                                                <TableCell>
                                                    {v.codeHash ? 
                                                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-4 rounded-full text-[9px] tracking-widest">KEYED</Badge> : 
                                                        <Badge variant="outline" className="border-slate-800 text-slate-700 font-black px-4 rounded-full text-[9px] tracking-widest opacity-40">PENDING</Badge>
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {v.walletAddress ? 
                                                        <span className="font-mono text-xs text-sky-400 group-hover:text-emerald-400" title={v.walletAddress}>{v.walletAddress.substring(0,8)}...{v.walletAddress.substring(38)}</span> 
                                                        : <span className="text-slate-800 opacity-20">-</span>
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {v.whitelistedOnChain ? 
                                                        <Badge className="bg-[#7034ff]/10 text-[#7034ff] border border-[#7034ff]/20 font-black px-4 py-1.5 rounded-full text-[9px]">ON-CHAIN</Badge> : 
                                                        <Badge variant="secondary" className="bg-slate-900 text-slate-700 font-black px-4 py-1.5 rounded-full text-[9px]">IDLE</Badge>
                                                    }
                                                </TableCell>
                                                <TableCell className="text-right py-8 px-10 space-x-3">
                                                    {!v.codeHash && (
                                                        <Button size="sm" variant="outline" className="bg-white/5 border-white/5 hover:text-white hover:border-[#7034ff]/50 rounded-xl px-4 h-10" onClick={() => issueCode(v._id, v.name)}>
                                                           <Key className="w-3.5 h-3.5 mr-2" /> ISSUE KEY
                                                        </Button>
                                                    )}
                                                    {v.walletAddress && !v.whitelistedOnChain && (
                                                        <Button size="sm" className="bg-sky-600 hover:bg-[#7034ff] text-white font-black rounded-xl px-6 h-10 shadow-lg" onClick={() => whitelistVoter(v._id)}>
                                                            <UserCheck className="w-3.5 h-3.5 mr-2" /> AUTHORIZE
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {voters.length === 0 && !loading && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-40">
                                                    <Globe className="w-16 h-16 text-slate-900 mx-auto mb-6" />
                                                    <p className="text-slate-700 font-black uppercase text-xs tracking-[0.3em] italic underline underline-offset-8">Awaiting Initial Peer Entry</p>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </SpotlightCard>
                    </AnimatedContent>
                </div>
            </div>
        </main>

        {/* Dynamic Footer for Admin */}
        <div className="absolute bottom-6 left-0 w-full px-10 flex justify-between items-end opacity-20 pointer-events-none">
            <div className="flex gap-10">
                <div>
                   <div className="text-xs font-black text-white font-honoble">MASTER_NODE_v1</div>
                   <div className="text-[6px] uppercase tracking-widest font-black text-slate-500">System Priority</div>
                </div>
                <div>
                   <div className="text-xs font-black text-white font-honoble">AES-512_LINK</div>
                   <div className="text-[6px] uppercase tracking-widest font-black text-slate-500">Security Grade</div>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-xs font-black text-white font-honoble">@{new Date().getFullYear()} Ahmed Mekled</div>
                <div className="text-[6px] uppercase tracking-widest font-black text-slate-500">Governance Protocol Core</div>
            </div>
        </div>
    </div>
  );
}
