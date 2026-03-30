
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConnectWallet } from '@/components/ConnectWallet';
import { JsonRpcSigner } from 'ethers';
import { getContract } from '@/chain/config';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2, Lock } from 'lucide-react';

const API_URL = 'http://localhost:4000/api';

export default function Voter() {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  
  // Status
  const [status, setStatus] = useState({ linked: false, whitelisted: false, voted: false });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Contract Data
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    if (signer && address) {
        checkStatus();
        fetchCandidates();
    }
  }, [signer, address]);

  const checkStatus = async () => {
      try {
          // Backend check for linking
          const res = await axios.get(`${API_URL}/voter/status/${address}`);
          const backendStatus = res.data;

          // Contract check for whitelist and voted
          const contract = await getContract(signer!);
          const isAllowed = await contract.allowedVoters(address);
          const hasVoted = await contract.hasVoted(address);

          setStatus({
              linked: backendStatus.linked,
              whitelisted: isAllowed,
              voted: hasVoted
          });

      } catch (err) {
          console.error(err);
      }
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
      } catch (err) {
          console.error("Error fetching candidates", err);
      }
  };

  const linkWallet = async () => {
      if(!code || !address) return;
      setLoading(true);
      try {
          await axios.post(`${API_URL}/voter/link-wallet`, { code, walletAddress: address });
          toast.success("Wallet linked successfully! Waiting for admin to whitelist you.");
          checkStatus();
      } catch (err: any) {
          toast.error(err.response?.data?.error || "Failed to link");
      } finally {
          setLoading(false);
      }
  };

  const castVote = async (id: number) => {
      if (!status.whitelisted) {
          toast.error("You are not whitelisted yet.");
          return;
      }
      try {
          const contract = await getContract(signer!);
          const tx = await contract.vote(id);
          const toastId = toast.loading("Casting vote... Waiting for confirmation");
          await tx.wait();
          toast.dismiss(toastId);
          toast.success("Vote Cast Successfully!");
          checkStatus();
          fetchCandidates();
      } catch (err: any) {
          console.error(err);
           // Ethers errors are often nested
           const msg = err.reason || err.message;
           toast.error("Vote failed: " + msg);
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Voter Booth</h1>
        
        <ConnectWallet onConnect={(s, a) => { setSigner(s); setAddress(a); }} />

        {signer && (
            <div className="space-y-6">
                
                {/* Status Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span>Wallet Linked</span>
                            {status.linked ? <Badge className="bg-green-600">Yes</Badge> : <Badge variant="secondary">No</Badge>}
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Whitelisted On-Chain</span>
                            {status.whitelisted ? <Badge className="bg-green-600">Yes</Badge> : <Badge variant="secondary">Pending Admin</Badge>}
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Vote Cast</span>
                            {status.voted ? <Badge className="bg-blue-600">Yes</Badge> : <Badge variant="outline">Not yet</Badge>}
                        </div>
                    </CardContent>
                </Card>

                {/* Link Wallet Step */}
                {!status.linked && (
                    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10">
                         <CardHeader>
                            <CardTitle>Step 1: Verify Identity</CardTitle>
                            <CardDescription>Enter the one-time code provided by the administrator.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input 
                                placeholder="Enter 6-digit code" 
                                className="text-center text-lg tracking-widest" 
                                maxLength={6}
                                value={code}
                                onChange={(e: any) => setCode(e.target.value)}
                            />
                            <Button className="w-full" onClick={linkWallet} disabled={loading || code.length < 6}>
                                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                                Link Wallet
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Voting Area */}
                {status.linked && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Candidates</CardTitle>
                             {!status.whitelisted && <CardDescription className="text-yellow-600">You must be whitelisted by an admin before voting.</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {candidates.map(c => (
                                <div key={c.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-lg">{c.name}</h3>
                                        <p className="text-sm text-muted-foreground">{c.voteCount} votes</p>
                                    </div>
                                    {status.voted ? (
                                        <Button disabled variant="secondary">Voted</Button>
                                    ) : (
                                        <Button 
                                            onClick={() => castVote(c.id)} 
                                            disabled={!status.whitelisted}
                                        >
                                            Vote
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
