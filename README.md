# 🗳️ E-Voting System

A secure, blockchain-based university e-voting system built with **Smart Contracts**, **Node.js**, and **React**.

## 🚀 Quick Start (One Command!)

Getting the system up and running takes less than 30 seconds.

### **Easiest way - Double Click:**
Run the `reset-and-start.bat` file in the project root.

### **From the terminal:**
```bash
npm run reset
```

---

## 🏗️ Project Overview

This project provides a robust solution for university-scale elections, ensuring:
- **One-Code-One-Wallet**: Voter codes are linked to unique MetaMask addresses.
- **On-Chain whitelisting**: Only verified voters can cast ballots.
- **Double-Vote prevention**: The smart contract rejects multiple attempts from the same address.
- **Auditability**: All votes and changes are recorded on the blockchain and in audit logs.

---

## 📚 Detailed Documentation

To make the system easier to understand and manage, the documentation has been organized into logical sections:

### 1. [⚙️ Setup & Installation](docs/setup.md)
Detailed instructions on prerequisites, environment variables, and starting the local nodes.

### 2. [🧪 Testing & User Flow](docs/testing.md)
A 5-minute step-by-step guide to testing the entire end-to-end voting process, including **MetaMask** setup.

### 3. [🏗️ System Architecture](docs/architecture.md)
In-depth diagrams and descriptions of the data flows, security layers, and database schemas.

### 4. [🔗 API & Technical Reference](docs/api.md)
Complete list of API endpoints, default candidate IDs, and test account private keys.

---

## ⚡ Quick CLI Commands

| Command | Action |
| :--- | :--- |
| `npm run reset` | Stops all services, resets DB and blockchain, then restarts. |
| `npm run stop` | Gracefully stops all running services. |
| `npm run clean-db` | Permanently deletes all MongoDB records (voters/logs). |
| `npm run check-votes` | Displays current results and voting history on-chain. |

---

*Built with ❤️ for secure and transparent elections.*
