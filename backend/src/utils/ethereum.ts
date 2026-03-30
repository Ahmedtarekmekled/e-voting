import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const chainDataPath = path.join(__dirname, '../chain/EVoting.json');
const chainData = JSON.parse(fs.readFileSync(chainDataPath, 'utf-8'));

const provider = new ethers.JsonRpcProvider(process.env.HARDHAT_RPC_URL || 'http://127.0.0.1:8545');

// Signer for backend admin actions (Whitelisting)
const signer = new ethers.Wallet(process.env.BACKEND_SIGNER_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

const contract = new ethers.Contract(chainData.address, chainData.abi, signer);

export { provider, signer, contract };
