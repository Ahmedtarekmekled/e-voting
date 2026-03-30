# E-Voting System - Complete Guide

## 📋 Table of Contents
1. [Quick Start](#-quick-start-one-command)
2. [Project Overview](#-project-overview)
3. [Technology Stack](#-technology-stack)
4. [Setup & Installation](#-setup--installation)
5. [Testing the System](#-testing-the-system)
6. [MetaMask Setup](#-metamask-setup)
7. [Viewing Voting Records](#-viewing-voting-records)
8. [Troubleshooting](#-troubleshooting)
9. [System Architecture](#-system-architecture)

---

## 🚀 Quick Start (One Command!)

### **Easiest Way - Double Click:**
```
reset-and-start.bat
```
Just double-click this file! It resets everything and starts all services automatically.

### **Command Line:**
```bash
npm run reset
```

**What it does:**
- Stops all running services
- Clears database
- Starts Hardhat blockchain
- Deploys smart contract
- Starts backend server
- Starts frontend server

**Time:** 15 seconds  
**Result:** Fresh system ready to test!

---

## 📊 Project Overview

A **blockchain-based e-voting system** for university elections with:
- ✅ Smart contract for immutable vote storage
- ✅ One-time code system for voter verification
- ✅ Wallet linking to prevent fraud
- ✅ On-chain whitelisting
- ✅ Admin dashboard for voter management
- ✅ Voter portal for casting votes

**Security Features:**
- One-time codes (SHA-256 hashed)
- Wallet linking (one code = one wallet)
- Blockchain whitelist (admin only)
- Double-vote prevention (smart contract)
- Complete audit trail

---

## 🛠️ Technology Stack

**Smart Contract:**
- Solidity 0.8.27
- Hardhat 2.22.5
- ethers v6

**Backend:**
- Node.js + TypeScript
- Express 5.2.1
- MongoDB + Mongoose
- ethers v6

**Frontend:**
- React 19
- Vite 5.4.11
- TailwindCSS 3.4.17
- shadcn/ui components
- ethers v6

---

## 📥 Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Community Server
- MetaMask browser extension

### Step 1: Install Dependencies
```bash
# Contract
cd contract
npm install

# Backend
cd ../backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure Environment

**Backend** (`backend/.env`):
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/evoting
ADMIN_PASSWORD=admin
HARDHAT_RPC_URL=http://127.0.0.1:8545
BACKEND_SIGNER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Step 3: Start MongoDB
```bash
# Windows
net start MongoDB
```

### Step 4: Run Everything
```bash
# Option 1: One command (from root)
npm run reset

# Option 2: Double-click
reset-and-start.bat
```

---

## 🧪 Testing the System

### Quick Test Flow (5 minutes)

**1. Access Admin Dashboard**
- URL: http://localhost:5173/admin
- Password: `admin`

**2. Create Voter**
- Click "+ Add Voter"
- Name: `Test Voter`
- ID: `12345`
- Click "Create"

**3. Issue Code**
- Click "Issue Code" button
- Copy the 6-digit code (e.g., `589234`)

**4. Voter Connects Wallet**
- URL: http://localhost:5173/voter
- Click "Connect MetaMask"
- Switch to "Localhost 8545" network
- Enter the code
- Click "Link Wallet"

**5. Admin Whitelists Voter**
- Back to admin page
- Click "Whitelist" button
- Confirm in MetaMask

**6. Voter Casts Vote**
- Back to voter page
- See candidates: Alice, Bob, Charlie
- Click "Vote" on any candidate
- Confirm in MetaMask

**7. Check Results**
- Admin dashboard shows updated vote count!

---

## 🦊 MetaMask Setup

### Add Local Network
1. Open MetaMask
2. Network dropdown → "Add Network"
3. Fill in:
   - **Network Name:** `Localhost 8545`
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `1337`
   - **Currency:** `ETH`
4. Save

### Import Test Account
1. MetaMask → "Import account"
2. Paste private key:
   ```
   0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```
3. Click "Import"
4. You should see **10,000 ETH**

### Clear MetaMask (After Each Reset)
1. MetaMask → Settings → Advanced
2. "Clear activity tab data" → Clear
3. **Important:** Do this every time you reset the blockchain!

---

## 🔍 Viewing Voting Records

### Method 1: Run Script
```bash
cd contract
npx hardhat run scripts/check-votes.js --network localhost
```

**Shows:**
- Election results (vote counts)
- Detailed voting history (who voted for whom)
- Voter status (whitelisted/voted)
- Whitelist history

### Method 2: Watch Hardhat Console
Just look at Terminal 1 (Hardhat node) - it shows every transaction in real-time.

### Method 3: Check Admin Dashboard
- Login to admin page
- "Election Results" section shows current votes
- Voter table shows all registered voters

---

## 🔄 Resetting the System

### Complete Reset (Database + Blockchain)
```bash
# Option 1: One command
npm run reset

# Option 2: Double-click
reset-and-start.bat
```

### Clear Database Only
```bash
cd backend
node clear-db.js
```

### Stop All Services
```bash
npm run stop
```

**After Reset:**
1. ✅ Clear MetaMask activity
2. ✅ Switch to Localhost 8545
3. ✅ Ready to test again!

---

## 🐛 Troubleshooting

### "MetaMask connection failed"
**Problem:** Not on Localhost 8545 network  
**Solution:** Switch to Localhost 8545 in network dropdown

### "Nonce too high" error
**Problem:** MetaMask has stale transaction data  
**Solution:** Settings → Advanced → Clear activity tab data

### "0 ETH" showing in MetaMask
**Problem:** Wrong network selected  
**Solution:** Switch to Localhost 8545 network

### "MongoDB connection failed"
**Problem:** MongoDB service not running  
**Solution:** `net start MongoDB`

### Contract not found
**Problem:** Contract not deployed  
**Solution:** Run `npm run reset` again

### Old voters still in admin page
**Problem:** Database not cleared  
**Solution:** Run `cd backend && node clear-db.js`

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     E-VOTING SYSTEM                             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   FRONTEND   │────────▶│   BACKEND    │────────▶│  BLOCKCHAIN  │
│              │         │              │         │              │
│  React App   │◀────────│  Express API │◀────────│   Hardhat    │
│  Port 5173   │         │  Port 4000   │         │   Port 8545  │
└──────┬───────┘         └──────┬───────┘         └──────┬───────┘
       │                        │                        │
       │ MetaMask               │                        │
       │ (Web3)                 │ MongoDB                │ Smart
       │                        │                        │ Contract
       ▼                        ▼                        ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser    │         │   Database   │         │ EVoting.sol  │
│   Wallet     │         │   evoting    │         │  Candidates  │
│   Provider   │         │   Port 27017 │         │  Voting Logic│
└──────────────┘         └──────────────┘         └──────────────┘
```

### Complete Data Flow Diagram

```
┌─────────── ADMIN FLOW ───────────┐
│                                  │
│  1. Login                        │
│     │                            │
│     ▼                            │
│  2. Create Voter                 │
│     │                            │
│     ├──► MongoDB                 │
│     │    (Store: name, ID)       │
│     │                            │
│     ▼                            │
│  3. Issue Code                   │
│     │                            │
│     ├──► Generate 6-digit code   │
│     ├──► Hash: SHA-256           │
│     └──► Store hash in MongoDB   │
│     │                            │
│     ▼                            │
│  4. Give code to voter           │
│                                  │
└──────────────────────────────────┘

         ⬇ Code shared ⬇

┌─────────── VOTER FLOW ───────────┐
│                                  │
│  1. Connect MetaMask             │
│     │                            │
│     ├──► Localhost 8545          │
│     └──► Get wallet address      │
│     │                            │
│     ▼                            │
│  2. Enter Code                   │
│     │                            │
│     ├──► Backend verifies hash   │
│     ├──► Link wallet to voter    │
│     └──► Update MongoDB          │
│     │                            │
│     ▼                            │
│  3. Wait for whitelist           │
│                                  │
└──────────────────────────────────┘

         ⬇ Admin action ⬇

┌─────────── WHITELIST ────────────┐
│                                  │
│  Admin clicks "Whitelist"        │
│     │                            │
│     ▼                            │
│  Backend calls Contract          │
│     │                            │
│     ├──► whitelistVoter(address) │
│     ├──► Transaction sent        │
│     └──► Event: VoterWhitelisted │
│     │                            │
│     ▼                            │
│  Voter can now vote!             │
│                                  │
└──────────────────────────────────┘

         ⬇ Voter action ⬇

┌─────────── VOTING ───────────────┐
│                                  │
│  Voter clicks "Vote"             │
│     │                            │
│     ▼                            │
│  MetaMask signs transaction      │
│     │                            │
│     ▼                            │
│  Smart Contract checks:          │
│     ├──► Is whitelisted?  ✓     │
│     ├──► Has voted?       ✗     │
│     └──► Valid candidate? ✓     │
│     │                            │
│     ▼                            │
│  Vote recorded on blockchain     │
│     │                            │
│     ├──► Increment vote count    │
│     ├──► Mark as voted           │
│     └──► Event: Voted            │
│     │                            │
│     ▼                            │
│  Results updated!                │
│                                  │
└──────────────────────────────────┘
```

### Database Schema (MongoDB)

```
┌─────────────────────────────────────────────────────────────┐
│  Collection: eligiblevoters                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    _id:                ObjectId                             │
│    name:               String        (e.g. "John Doe")      │
│    universityIdOrEmail: String       (unique, "12345")      │
│    codeHash:           String | null (SHA-256 hash)         │
│    codeIssuedAt:       Date | null                          │
│    codeUsedAt:         Date | null                          │
│    walletAddress:      String | null (0x7099...)           │
│    walletLinkedAt:     Date | null                          │
│    whitelistedOnChain: Boolean       (default: false)       │
│    whitelistedAt:      Date | null                          │
│    createdAt:          Date                                 │
│    updatedAt:          Date                                 │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Collection: auditlogs                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                          │
│    _id:        ObjectId                                     │
│    action:     String  ("CREATE_VOTER", "ISSUE_CODE", etc) │
│    actor:      String  ("admin" | "voter")                  │
│    details:    Object  { voterId, wallet, etc. }            │
│    createdAt:  Date                                         │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Smart Contract Structure

```
┌─────────────────────────────────────────────────────────────┐
│  EVoting.sol - Smart Contract                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  STATE VARIABLES:                                           │
│  ├─ owner: address                                          │
│  ├─ candidates: Candidate[]                                 │
│  ├─ allowedVoters: mapping(address => bool)                 │
│  └─ hasVoted: mapping(address => bool)                      │
│                                                             │
│  STRUCTS:                                                   │
│  └─ Candidate {                                             │
│       uint id                                               │
│       string name                                           │
│       uint voteCount                                        │
│     }                                                       │
│                                                             │
│  FUNCTIONS:                                                 │
│  ├─ whitelistVoter(address) [onlyOwner]                    │
│  ├─ vote(uint candidateId)                                  │
│  ├─ getCandidate(uint) → Candidate                          │
│  ├─ getCandidates() → Candidate[]                           │
│  └─ getCandidatesCount() → uint                             │
│                                                             │
│  EVENTS:                                                    │
│  ├─ VoterWhitelisted(address voter)                        │
│  └─ Voted(address voter, uint candidateId)                  │
│                                                             │
│  MODIFIERS:                                                 │
│  └─ onlyOwner                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

INITIAL STATE (deployed):
┌──────────────────────────┐
│ Candidates:              │
├──────────────────────────┤
│ [0] Alice    - 0 votes   │
│ [1] Bob      - 0 votes   │
│ [2] Charlie  - 0 votes   │
└──────────────────────────┘
```

### Security Architecture (Multiple Layers)

```
┌─────────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────┘

Layer 1: DATABASE SECURITY
═══════════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────────────┐
│ • One-time codes (6-digit, hashed with SHA-256)             │
│ • Code can link to ONE wallet only                          │
│ • universityIdOrEmail is UNIQUE                             │
│ • Timestamps prevent code reuse                             │
│ • Audit log for all actions                                 │
└─────────────────────────────────────────────────────────────┘
                            ⬇
Layer 2: BACKEND VALIDATION
═══════════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────────────┐
│ • Admin password verification                               │
│ • Code hash verification before linking                     │
│ • Check wallet not already linked                           │
│ • Only linked wallets can be whitelisted                    │
│ • API rate limiting (recommended for production)            │
└─────────────────────────────────────────────────────────────┘
                            ⬇
Layer 3: SMART CONTRACT (IMMUTABLE)
═══════════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────────────┐
│ • Only owner can whitelist voters                           │
│ • require(allowedVoters[msg.sender])                       │
│ • require(!hasVoted[msg.sender])                           │
│ • require(candidateId < candidates.length)                  │
│ • All votes stored on blockchain (tamper-proof)             │
│ • Events emitted for audit trail                            │
└─────────────────────────────────────────────────────────────┘

FRAUD PREVENTION:
═══════════════════════════════════════════════════════════════
❌ Vote twice with same wallet?
   → Prevented by hasVoted mapping (Layer 3)

❌ Use multiple codes?
   → Prevented by UNIQUE universityId (Layer 1)

❌ Link multiple wallets to one code?
   → Prevented by code usage timestamp (Layer 1)

❌ Vote without whitelisting?
   → Prevented by allowedVoters check (Layer 3)

❌ Modify votes after casting?
   → Impossible, blockchain is immutable (Layer 3)
```

### Network Topology

```
┌─────────────────────────────────────────────────────────────┐
│  LOCAL DEVELOPMENT NETWORK (Localhost)                      │
└─────────────────────────────────────────────────────────────┘

    User's Browser
         │
         │ HTTP/HTTPS
         ▼
    ┌──────────────┐
    │   Frontend   │
    │ localhost:5173│
    └──────┬───────┘
           │
           │ REST API (axios)
           │ http://localhost:4000/api
           ▼
    ┌──────────────┐
    │   Backend    │
    │ localhost:4000│
    └───┬──────┬───┘
        │      │
        │      └──────► MongoDB
        │              localhost:27017
        │              Database: evoting
        │
        │ ethers.js (RPC)
        │ http://127.0.0.1:8545
        ▼
    ┌──────────────┐
    │   Hardhat    │
    │ Chain ID:1337│
    │   20 Accounts│
    └──────┬───────┘
           │
           │ Deployed Contract
           ▼
    ┌──────────────┐
    │ EVoting.sol  │
    │ 0x5FbDB2...  │
    └──────────────┘

    User's MetaMask
         │
         │ Web3 Provider (window.ethereum)
         │ Network: Localhost 8545
         ▼
    Direct connection to Hardhat node
    (for signing & sending vote transactions)
```

### Candidates
The system has 3 hard-coded candidates:
- **Alice** (ID: 0)
- **Bob** (ID: 1)
- **Charlie** (ID: 2)

---

## 📁 Project Structure

```
e-voting/
├── contract/              # Smart contract
│   ├── contracts/
│   │   └── EVoting.sol
│   ├── scripts/
│   │   ├── deploy.js
│   │   └── check-votes.js
│   └── hardhat.config.js
│
├── backend/               # API server
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   ├── clear-db.js
│   └── .env
│
├── frontend/              # React UI
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── chain/
│   └── package.json
│
├── reset-and-start.bat    # One-click reset
├── package.json           # Root scripts
└── README.md             # This file
```

---

## ⚡ Quick Commands

```bash
# Reset everything
npm run reset

# Stop all services
npm run stop

# Clear database
npm run clean-db

# Check votes
npm run check-votes

# Start individual services
cd contract && npx hardhat node
cd backend && npm run dev
cd frontend && npm run dev
```

---

## 🎓 Important Notes

### Default Credentials
- **Admin Password:** `admin`
- **Contract Address:** `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Hardhat RPC:** http://127.0.0.1:8545
- **Backend API:** http://localhost:4000
- **Frontend:** http://localhost:5173

### Test Accounts (Hardhat)
All accounts have 10,000 ETH:
- Account #0: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (Owner)
- Account #1: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` (Voter 1)
- Account #2: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` (Voter 2)

**Private Key for Voter 1:**
```
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

### Security Warning
⚠️ **NEVER use these accounts on mainnet!** These are PUBLIC test keys. Any real ETH sent to these addresses will be lost!

---

## 📚 Additional Resources

### API Endpoints

**Admin Routes:**
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/voters` - Create voter
- `GET /api/admin/voters` - List voters
- `POST /api/admin/voters/:id/issue-code` - Generate code
- `POST /api/admin/voters/:id/whitelist` - Whitelist on-chain

**Voter Routes:**
- `POST /api/voter/link-wallet` - Link wallet to code
- `GET /api/voter/status/:address` - Get voter status

**Public Routes:**
- `GET /api/results` - Fetch election results

---

## ✅ Success Checklist

Before presenting/demoing:
- [ ] All services running (`npm run reset`)
- [ ] MetaMask activity cleared
- [ ] MetaMask on Localhost 8545
- [ ] Test account imported (10,000 ETH visible)
- [ ] Can create voter in admin panel
- [ ] Can issue code
- [ ] Can link wallet as voter
- [ ] Can whitelist voter
- [ ] Can cast vote
- [ ] Results update correctly
- [ ] Double voting prevented

---

## 🎉 You're Ready!

Your e-voting system is now complete and ready to demonstrate!

**Quick Start:**
1. Run: `npm run reset` (or double-click `reset-and-start.bat`)
2. Clear MetaMask
3. Open: http://localhost:5173
4. Test the voting flow!

**For help:** Check the Troubleshooting section above.

**System Status:** ✅ MVP Complete - Ready for Demonstration!

---

*Built with ❤️ for blockchain-based secure voting*
