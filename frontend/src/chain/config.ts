
import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';
import EVotingArtifact from './EVoting.json';

// Extend window interface for Ethereum
declare global {
    interface Window {
        ethereum: any;
    }
}

export const CHAIN_ID = 1337;
export const CONTRACT_ADDRESS = EVotingArtifact.address;
export const CONTRACT_ABI = EVotingArtifact.abi;

export type Candidate = {
  id: number;
  name: string;
  voteCount: number;
};

export const getProvider = () => {
  if (window.ethereum) {
    return new BrowserProvider(window.ethereum);
  }
  return null;
};

export const getContract = async (signer: JsonRpcSigner) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
