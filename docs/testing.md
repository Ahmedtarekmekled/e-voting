# Testing & User Flow Guide

This guide details how to test the E-Voting system and the end-to-end flow from Admin to Voter.

## 🧪 Quick Test Flow (5 minutes)

Follow this sequence to perform a full system test:

1. **Access Admin Dashboard**
   - URL: [http://localhost:5173/admin](http://localhost:5173/admin)
   - Password: `admin`

2. **Create a Voter**
   - Click **"+ Add Voter"**
   - Enter Name (e.g., `Test Voter`) and ID (e.g., `12345`)
   - Click **"Create"**

3. **Issue a Code**
   - Click the **"Issue Code"** button for the voter you just created.
   - Copy the generated 6-digit code.

4. **Voter Connects Wallet**
   - URL: [http://localhost:5173/voter](http://localhost:5173/voter)
   - Click **"Connect MetaMask"**
   - **Important:** Switch to "Localhost 8545" and select an account with ETH.
   - Enter the copied code and click **"Link Wallet"**.

5. **Admin Whitelists Voter**
   - Return to the Admin page.
   - Click the **"Whitelist"** button for the voter.
   - Confirm the transaction in MetaMask.

6. **Voter Casts Vote**
   - Return to the Voter page.
   - You should now see the list of candidates.
   - Click **"Vote"** on a candidate and confirm in MetaMask.

7. **Check Results**
   - The Admin dashboard will update the "Election Results" in real-time.

---

## 🦊 MetaMask Setup

To interact with the local blockchain, you must configure MetaMask correctly.

### 1. Add Local Network
1. Open **MetaMask** and click the network dropdown.
2. Click **"Add Network"** → **"Add a network manually"**.
3. Fill in the following:
   - **Network Name:** `Localhost 8545`
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `1337`
   - **Currency Symbol:** `ETH`
4. Click **Save**.

### 2. Import Test Account
1. Open MetaMask, click the account icon, and select **"Import account"**.
2. Paste this private key:
   ```
   0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```
3. You should now see an account with **10,000 ETH**.

### 3. Clear MetaMask Activity (Crucial)
Every time you run `npm run reset`, the blockchain resets but MetaMask remembers the old transaction counts (nonces), causing errors.
1. Go to MetaMask **Settings** → **Advanced**.
2. Click **"Clear activity tab data"** and confirm.

---

## 🔍 Viewing Voting Records

### Method 1: CLI Script
You can view the raw data directly from the blockchain:
```bash
cd contract
npx hardhat run scripts/check-votes.js --network localhost
```

### Method 2: Technical Console
Watch the terminal where Hardhat is running; it logs every transaction as it happens.

### Method 3: Dashboard
The **Admin Dashboard** provides a visual representation of all voters and their current statuses.
