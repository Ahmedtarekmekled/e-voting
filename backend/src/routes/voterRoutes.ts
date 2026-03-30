import express from 'express';
import crypto from 'crypto';
import { EligibleVoter } from '../models/EligibleVoter';
import { AuditLog } from '../models/AuditLog';

const router = express.Router();

router.post('/link-wallet', async (req, res) => {
  try {
    const { code, walletAddress } = req.body;
    
    // Hash code
    const hash = crypto.createHash('sha256').update(code).digest('hex');

    const voter = await EligibleVoter.findOne({ codeHash: hash });
    if (!voter) {
        res.status(404).json({ error: 'Invalid code' });
        return;
    }
    if (voter.walletAddress) {
        res.status(400).json({ error: 'Code already used / Wallet already linked' });
        return;
    }

    // Check if wallet is used by another voter
    const existingWallet = await EligibleVoter.findOne({ walletAddress });
    if (existingWallet) {
        res.status(400).json({ error: 'Wallet address already linked to another voter' });
        return;
    }

    voter.walletAddress = walletAddress;
    voter.walletLinkedAt = new Date();
    voter.codeUsedAt = new Date();
    await voter.save();

    await AuditLog.create({ action: 'LINK_WALLET', actor: 'voter', details: { voterId: voter._id, wallet: walletAddress } });

    res.json({ success: true, voter });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/status/:address', async (req, res) => {
    const { address } = req.params;
    const voter = await EligibleVoter.findOne({ walletAddress: address });
    if (!voter) {
        res.json({ linked: false });
        return;
    }
    res.json({ linked: true, whitelisted: voter.whitelistedOnChain, voter });
});

export default router;
