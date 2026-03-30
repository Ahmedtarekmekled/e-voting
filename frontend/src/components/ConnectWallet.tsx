
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getProvider, CHAIN_ID } from '@/chain/config';
import { toast } from 'sonner';
import { JsonRpcSigner } from 'ethers';
import { Wallet, LogOut, ShieldCheck, Cpu } from 'lucide-react';
import ShinyText from './ShinyText';

interface ConnectWalletProps {
  onConnect: (signer: JsonRpcSigner, address: string) => void;
}

export function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    const provider = getProvider();
    if (!provider) {
      toast.error("MetaMask not found. Please install it.");
      return;
    }

    try {
      setLoading(true);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();

      // Check Chain ID
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== CHAIN_ID) {
        toast.error(`Wrong Network. Please switch to Localhost 8545 (Chain ID ${CHAIN_ID})`);
        
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + CHAIN_ID.toString(16) }],
            });
        } catch (switchError) {
             console.error(switchError);
        }
        setLoading(false);
        return;
      }

      setAddress(addr);
      onConnect(signer, addr);
      toast.success("Identity Link Established");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to connect: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (address) {
    return (
      <div className="group relative w-full max-w-2xl bg-[#0A1128]/40 border border-white/5 backdrop-blur-3xl rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-[#7034ff]/20 transition-all duration-500 overflow-hidden">
        {/* Animated accent lights */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7034ff]/5 blur-[60px] group-hover:bg-[#7034ff]/10 transition-all" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className='flex items-center gap-6'>
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center shadow-inner">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 mb-1">Authenticated Ledger ADR</span>
                    <div className="flex items-center gap-3">
                         <span className="font-mono text-sm md:text-lg font-black text-white tracking-widest break-all">
                            {address.substring(0, 10)}<span className="opacity-30">...</span>{address.substring(address.length - 10)}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                    </div>
                </div>
            </div>
            
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="h-12 px-6 bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 rounded-xl text-slate-400 transition-all active:scale-95 group/btn"
            >
                <LogOut className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                <span className="font-black text-[10px] uppercase tracking-widest">Terminate</span>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-[#0A1128]/60 border border-white/10 backdrop-blur-3xl rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
      {/* Background glow effects */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7034ff]/10 blur-[80px] group-hover:bg-[#7034ff]/20 transition-all duration-700" />
      
      <div className="relative z-10 text-center mb-10">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:border-[#7034ff]/30 transition-all">
            <Cpu className="w-10 h-10 text-[#7034ff] animate-pulse" />
        </div>
        <h3 className="text-3xl font-black text-white font-honoble mb-2">Connect Node</h3>
        <ShinyText text="SIGNATURE REQUIRED FOR ACCESS" speed={3} className="text-[10px] tracking-[0.2em] font-black text-slate-500" />
      </div>

      <Button 
        onClick={connect} 
        disabled={loading} 
        className="w-full h-16 bg-white text-black hover:bg-slate-200 font-black text-lg rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] relative z-10 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Wallet className="w-5 h-5" />}
            {loading ? 'SYNCHRONIZING...' : 'INITIALIZE LINK'}
        </span>
      </Button>
      
      <p className="mt-8 text-[10px] uppercase tracking-[0.15em] text-slate-600 font-bold text-center">Standard MetaMask Protocol v3.0</p>
    </div>
  );
}

function Loader2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}
