# API & Technical Reference

This document provides a reference for the system's API endpoints, test data, and technical configurations.

## 🔗 API Endpoints

### Admin Services
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Authenticate the administrator |
| `GET` | `/api/admin/voters` | Retrieve a list of all registered voters |
| `POST` | `/api/admin/voters` | Register a new eligible voter |
| `POST` | `/api/admin/voters/:id/issue-code` | Generate a new 6-digit access code |
| `POST` | `/api/admin/voters/:id/whitelist` | Trigger the on-chain whitelisting transaction |

### Voter Services
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/voter/link-wallet` | Link a MetaMask address using an access code |
| `GET` | `/api/voter/status/:address` | Check if a wallet is linked/whitelisted/voted |

### Public Data
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/results` | Fetch the current live election results |

---

## 🗳️ Candidates
By default, the system initializes with three candidates:
- **ID 0**: Alice
- **ID 1**: Bob
- **ID 2**: Charlie

---

## 🔑 Test Accounts (Hardhat)
When running the local node, the following accounts are pre-funded with **10,000 ETH**:

### Admin/Owner
- **Address**: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- **Role**: This account is the "Owner" of the smart contract and must be used for whitelisting.

### Voter 1
- **Address**: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- **Private Key**: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

---

## ⚠️ Troubleshooting
- **"Nonce too high"**: Your MetaMask nonces are out of sync with the local node. Clear your activity tab data.
- **"0 ETH in MetaMask"**: Ensure you are connected to the `Localhost 8545` network and have imported the correct account.
- **"Contract not found"**: Ensure `npm run reset` was fully completed and the terminal shows a contract address.
