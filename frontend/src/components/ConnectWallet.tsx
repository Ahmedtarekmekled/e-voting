
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getProvider, CHAIN_ID } from '@/chain/config';
import { toast } from 'sonner';
import { JsonRpcSigner } from 'ethers';

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
      toast.success("Wallet connected!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to connect wallet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attempt auto-connect? (Optional)
  }, []);

  if (address) {
    return (
      <Card className="mb-6 bg-green-50 dark:bg-green-900/10 border-green-200">
        <CardContent className="pt-6 flex items-center justify-between">
            <div className='flex flex-col'>
                <span className="text-sm text-muted-foreground font-medium">Connected Wallet</span>
                <span className="font-mono text-sm md:text-base font-bold text-green-700 dark:text-green-400 break-all">{address}</span>
            </div>
             <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Disconnect</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Link your MetaMask wallet to vote.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={connect} disabled={loading} className="w-full">
          {loading ? 'Connecting...' : 'Connect MetaMask'}
        </Button>
      </CardContent>
    </Card>
  );
}
