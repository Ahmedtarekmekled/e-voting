import mongoose from 'mongoose';

const EligibleVoterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  universityIdOrEmail: { type: String, required: true, unique: true },
  codeHash: { type: String, default: null },
  codeIssuedAt: { type: Date, default: null },
  codeUsedAt: { type: Date, default: null },
  walletAddress: { type: String, default: null },
  walletLinkedAt: { type: Date, default: null },
  whitelistedOnChain: { type: Boolean, default: false },
  whitelistedAt: { type: Date, default: null }
}, { timestamps: true });

export const EligibleVoter = mongoose.model('EligibleVoter', EligibleVoterSchema);
