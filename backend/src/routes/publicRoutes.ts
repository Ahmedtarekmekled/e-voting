import express from 'express';
import { contract } from '../utils/ethereum';

const router = express.Router();

router.get('/results', async (req, res) => {
  try {
    const count = await contract.getCandidatesCount(); // BigInt
    const candidates = [];
    
    // Iterate 0 to count
    // Note: BigInt needs conversion
    const countNum = Number(count);

    for (let i = 0; i < countNum; i++) {
        const c = await contract.getCandidate(i);
        // c is array/struct: [id, name, voteCount]
        candidates.push({
            id: c[0].toString(),
            name: c[1],
            voteCount: c[2].toString()
        });
    }

    res.json(candidates);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
