import express from 'express';
import crypto from 'crypto';
import { EligibleVoter } from '../models/EligibleVoter';
import { AuditLog } from '../models/AuditLog';
import { contract } from '../utils/ethereum';

const router = express.Router();

const ADMIN_TOKEN = "local-demo-token";

// Middleware
const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' });
    return; // Returns void, correct for express handler
  }
  next();
};

// Login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ ok: true, token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Create Voter
router.post('/voters', isAdmin, async (req, res) => {
  try {
    const { name, universityIdOrEmail } = req.body;
    const voter = await EligibleVoter.create({ name, universityIdOrEmail });
    await AuditLog.create({ action: 'CREATE_VOTER', actor: 'admin', details: { voterId: voter._id, name } });
    res.json(voter);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// List Voters
router.get('/voters', isAdmin, async (req, res) => {
  const voters = await EligibleVoter.find().sort({ createdAt: -1 });
  res.json(voters);
});

// Issue Code
router.post('/voters/:id/issue-code', isAdmin, async (req, res) => {
  try {
    const voter = await EligibleVoter.findById(req.params.id);
    if (!voter) {
        res.status(404).json({ error: 'Voter not found' });
        return;
    }

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const hash = crypto.createHash('sha256').update(code).digest('hex');

    voter.codeHash = hash;
    voter.codeIssuedAt = new Date();
    await voter.save();

    await AuditLog.create({ action: 'ISSUE_CODE', actor: 'admin', details: { voterId: voter._id } });

    res.json({ code }); // Return plain code to admin to give to user
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Whitelist
router.post('/voters/:id/whitelist', isAdmin, async (req, res) => {
  try {
    const voter = await EligibleVoter.findById(req.params.id);
    if (!voter) {
        res.status(404).json({ error: 'Voter not found' });
        return;
    }
    if (!voter.walletAddress) {
        res.status(400).json({ error: 'No wallet linked' });
        return;
    }
    if (voter.whitelistedOnChain) {
        res.status(400).json({ error: 'Already whitelisted' });
        return;
    }

    // Call contract
    const tx = await contract.whitelistVoter(voter.walletAddress);
    await tx.wait();

    voter.whitelistedOnChain = true;
    voter.whitelistedAt = new Date();
    await voter.save();

    await AuditLog.create({ action: 'WHITELIST', actor: 'admin', details: { voterId: voter._id, wallet: voter.walletAddress } });

    res.json({ success: true, txHash: tx.hash });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
