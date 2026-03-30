const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 E-VOTING BLOCKCHAIN DATA VIEWER");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const EVoting = await ethers.getContractAt("EVoting", contractAddress);

  // Get all candidates
  console.log("🎯 ELECTION RESULTS:\n");
  const candidates = await EVoting.getCandidates();
  let totalVotes = 0;
  
  candidates.forEach((c, i) => {
    const votes = Number(c.voteCount);
    totalVotes += votes;
    console.log(`  ${i + 1}. ${c.name.padEnd(15)} ${votes} votes`);
  });
  
  console.log(`\n  Total Votes Cast: ${totalVotes}\n`);

  // Query all Voted events
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🗳️  DETAILED VOTING HISTORY:\n");

  const filter = EVoting.filters.Voted();
  const events = await EVoting.queryFilter(filter);

  if (events.length === 0) {
    console.log("  ⚠️  No votes have been cast yet.\n");
  } else {
    events.forEach((event, i) => {
      const voter = event.args.voter;
      const candidateId = Number(event.args.candidateId);
      const candidateName = candidates[candidateId].name;
      
      console.log(`  Vote #${i + 1}:`);
      console.log(`  ├─ Voter:        ${voter}`);
      console.log(`  ├─ Voted for:    ${candidateName} (ID: ${candidateId})`);
      console.log(`  ├─ Block:        #${event.blockNumber}`);
      console.log(`  └─ Transaction:  ${event.transactionHash}\n`);
    });
  }

  // Check voter whitelist status
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👥 VOTER STATUS CHECK:\n");
  
  const testAddresses = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Account #1
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // Account #2
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // Account #3
  ];

  for (const addr of testAddresses) {
    const hasVoted = await EVoting.hasVoted(addr);
    const isAllowed = await EVoting.allowedVoters(addr);
    
    console.log(`  Address: ${addr}`);
    console.log(`  ├─ Whitelisted:  ${isAllowed ? "✅ Yes" : "❌ No"}`);
    console.log(`  └─ Has Voted:    ${hasVoted ? "✅ Yes" : "❌ No"}\n`);
  }

  // Check whitelisted events
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔐 WHITELIST HISTORY:\n");

  const whitelistFilter = EVoting.filters.VoterWhitelisted();
  const whitelistEvents = await EVoting.queryFilter(whitelistFilter);

  if (whitelistEvents.length === 0) {
    console.log("  ⚠️  No voters have been whitelisted yet.\n");
  } else {
    whitelistEvents.forEach((event, i) => {
      console.log(`  Whitelist #${i + 1}:`);
      console.log(`  ├─ Voter:        ${event.args.voter}`);
      console.log(`  ├─ Block:        #${event.blockNumber}`);
      console.log(`  └─ Transaction:  ${event.transactionHash}\n`);
    });
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ DATA RETRIEVAL COMPLETE");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
