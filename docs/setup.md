# Setup & Installation Guide

This guide provides step-by-step instructions for setting up the E-Voting System from scratch.

## 📋 Prerequisites
- **Node.js**: version 18 or higher.
- **MongoDB**: Community Server must be installed and running.
- **MetaMask**: A browser extension for interacting with the blockchain.

---

## 📥 Step 1: Install Dependencies

In the root of the project, you should run the following commands to install dependencies for each component:

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

---

## ⚙️ Step 2: Configure Environment

**Backend** (`backend/.env`):
Create a `.env` file in the `backend/` directory with the following contents:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/evoting
ADMIN_PASSWORD=admin
HARDHAT_RPC_URL=http://127.0.0.1:8545
BACKEND_SIGNER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

---

## 🏗️ Step 3: Start MongoDB

Make sure your MongoDB server is running. On Windows, you can start it by running:

```bash
# Windows
net start MongoDB
```

---

## 🚀 Step 4: Run Everything

There are two ways to start the entire system:

### Option 1: One command (from root)
This command stops everything, resets the database, and restarts all services.
```bash
npm run reset
```

### Option 2: Double-click
Simply double-click the `reset-and-start.bat` file in the project root.

---

## 🔄 Resetting the System

### Complete Reset (Database + Blockchain)
To fully reset both the database and the blockchain, use:
```bash
# Option 1: Command line
npm run reset

# Option 2: Double-click
reset-and-start.bat
```

### Clear Database Only
If you only need to clear the MongoDB records (voters, logs) without resetting the blockchain:
```bash
cd backend
node clear-db.js
```

### Stop All Services
To gracefully stop all running processes:
```bash
npm run stop
```

---

## 🎓 Success Checklist
Before presenting or demoing:
- [ ] All services are running (`npm run reset` was successful).
- [ ] MetaMask activity is cleared.
- [ ] MetaMask is connected to `Localhost 8545`.
- [ ] The test account is imported (10,000 ETH visible).
